// Agentforce Roadmap — feedback (votes + comments) service
// Backed by Postgres (DATABASE_URL). Tables: feature_votes, feature_comments.

const { pool, query } = require('../db/connection');

const PRIORITIES = new Set(['low', 'medium', 'high', 'critical']);
const MAX_BODY_LEN = 2000;

function clean(v, max = 500) {
    if (v == null) return null;
    const s = String(v).trim();
    if (!s) return null;
    return s.slice(0, max);
}

async function ensureTables() {
    // Idempotent — runs once at boot
    await pool.query(`
        CREATE TABLE IF NOT EXISTS feature_votes (
            id            SERIAL       PRIMARY KEY,
            feature_key   TEXT         NOT NULL,
            feature_title TEXT,
            user_email    TEXT         NOT NULL,
            user_id       TEXT,
            created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
            UNIQUE (feature_key, user_email)
        );
        CREATE INDEX IF NOT EXISTS feature_votes_feature_key_idx ON feature_votes (feature_key);
        CREATE INDEX IF NOT EXISTS feature_votes_user_email_idx  ON feature_votes (user_email);
        CREATE TABLE IF NOT EXISTS feature_comments (
            id            SERIAL       PRIMARY KEY,
            feature_key   TEXT         NOT NULL,
            feature_title TEXT,
            user_email    TEXT         NOT NULL,
            user_id       TEXT,
            body          TEXT         NOT NULL,
            priority      TEXT,
            customer      TEXT,
            pfr_link      TEXT,
            created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
        );
        CREATE INDEX IF NOT EXISTS feature_comments_feature_key_idx ON feature_comments (feature_key);
        CREATE INDEX IF NOT EXISTS feature_comments_created_at_idx  ON feature_comments (created_at DESC);
    `);
}

// --- Votes ----------------------------------------------------------

async function toggleVote({ featureKey, featureTitle, userEmail, userId }) {
    if (!featureKey || !userEmail) throw new Error('missing_fields');
    // Try delete first; if nothing deleted, insert.
    const del = await query(
        'DELETE FROM feature_votes WHERE feature_key = $1 AND user_email = $2 RETURNING id',
        [featureKey, userEmail]
    );
    if (del.rowCount > 0) return { voted: false };
    await query(
        'INSERT INTO feature_votes (feature_key, feature_title, user_email, user_id) VALUES ($1, $2, $3, $4)',
        [featureKey, clean(featureTitle, 500), userEmail, userId || null]
    );
    return { voted: true };
}

// --- Comments -------------------------------------------------------

async function addComment({ featureKey, featureTitle, userEmail, userId, body, priority, customer, pfrLink }) {
    if (!featureKey || !userEmail) throw new Error('missing_fields');
    const cleanBody = clean(body, MAX_BODY_LEN);
    if (!cleanBody) throw new Error('empty_body');
    const cleanPriority = priority && PRIORITIES.has(priority) ? priority : null;
    const r = await query(
        `INSERT INTO feature_comments
            (feature_key, feature_title, user_email, user_id, body, priority, customer, pfr_link)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING id, created_at`,
        [
            featureKey,
            clean(featureTitle, 500),
            userEmail,
            userId || null,
            cleanBody,
            cleanPriority,
            clean(customer, 200),
            clean(pfrLink, 500),
        ]
    );
    return { id: r.rows[0].id, created_at: r.rows[0].created_at };
}

async function deleteComment({ id, userEmail }) {
    if (!id || !userEmail) throw new Error('missing_fields');
    const r = await query(
        'DELETE FROM feature_comments WHERE id = $1 AND user_email = $2 RETURNING id',
        [id, userEmail]
    );
    return { deleted: r.rowCount > 0 };
}

// Updates only if the row's user_email matches — authorship enforced in SQL.
async function updateComment({ id, userEmail, body, priority, customer, pfrLink }) {
    if (!id || !userEmail) throw new Error('missing_fields');
    const cleanBody = clean(body, MAX_BODY_LEN);
    if (!cleanBody) throw new Error('empty_body');
    const cleanPriority = priority && PRIORITIES.has(priority) ? priority : null;
    const r = await query(
        `UPDATE feature_comments
            SET body = $1, priority = $2, customer = $3, pfr_link = $4
          WHERE id = $5 AND user_email = $6
          RETURNING id, body, priority, customer, pfr_link, created_at`,
        [cleanBody, cleanPriority, clean(customer, 200), clean(pfrLink, 500), id, userEmail]
    );
    if (r.rowCount === 0) return { updated: false };
    return { updated: true, comment: r.rows[0] };
}

// Global feed — every comment, newest-first, paginated.
async function getAllComments({ limit = 100, offset = 0, userEmail }) {
    const r = await query(
        `SELECT id, feature_key, feature_title, user_email, body, priority,
                customer, pfr_link, created_at
           FROM feature_comments
          ORDER BY created_at DESC
          LIMIT $1 OFFSET $2`,
        [Math.min(limit, 500), Math.max(offset, 0)]
    );
    return r.rows.map(c => ({
        id: c.id,
        feature_key: c.feature_key,
        feature_title: c.feature_title,
        user_email: c.user_email,
        body: c.body,
        priority: c.priority,
        customer: c.customer,
        pfr_link: c.pfr_link,
        created_at: c.created_at,
        mine: c.user_email === userEmail,
    }));
}

// --- Reads ----------------------------------------------------------

async function getFeatureFeedback({ featureKey, userEmail }) {
    const [voteCount, userVoted, comments] = await Promise.all([
        query('SELECT COUNT(*)::int AS n FROM feature_votes WHERE feature_key = $1', [featureKey]),
        query('SELECT 1 FROM feature_votes WHERE feature_key = $1 AND user_email = $2 LIMIT 1', [featureKey, userEmail]),
        query(
            `SELECT id, user_email, body, priority, customer, pfr_link, created_at
               FROM feature_comments
              WHERE feature_key = $1
              ORDER BY created_at DESC
              LIMIT 200`,
            [featureKey]
        ),
    ]);
    return {
        votes: voteCount.rows[0].n || 0,
        userVoted: userVoted.rowCount > 0,
        comments: comments.rows.map(c => ({
            id: c.id,
            user_email: c.user_email,
            body: c.body,
            priority: c.priority,
            customer: c.customer,
            pfr_link: c.pfr_link,
            created_at: c.created_at,
            mine: c.user_email === userEmail,
        })),
    };
}

async function getFeedbackSummary({ userEmail }) {
    // Aggregate counts per feature_key + indicate which the current user has voted on
    const [votes, comments, my] = await Promise.all([
        query('SELECT feature_key, COUNT(*)::int AS n FROM feature_votes GROUP BY feature_key'),
        query('SELECT feature_key, COUNT(*)::int AS n FROM feature_comments GROUP BY feature_key'),
        query('SELECT feature_key FROM feature_votes WHERE user_email = $1', [userEmail]),
    ]);
    const summary = {};
    votes.rows.forEach(r => { summary[r.feature_key] = { ...(summary[r.feature_key] || {}), votes: r.n, comments: 0 }; });
    comments.rows.forEach(r => {
        summary[r.feature_key] = summary[r.feature_key] || { votes: 0, comments: 0 };
        summary[r.feature_key].comments = r.n;
    });
    const myVotes = new Set(my.rows.map(r => r.feature_key));
    Object.keys(summary).forEach(k => { summary[k].userVoted = myVotes.has(k); });
    return summary;
}

async function getTopRequested({ limit = 50 }) {
    const r = await query(
        `SELECT v.feature_key,
                MAX(v.feature_title) AS feature_title,
                COUNT(*)::int        AS votes,
                COALESCE((SELECT COUNT(*)::int FROM feature_comments c WHERE c.feature_key = v.feature_key), 0) AS comments
           FROM feature_votes v
          GROUP BY v.feature_key
          ORDER BY votes DESC, comments DESC
          LIMIT $1`,
        [limit]
    );
    return r.rows;
}

module.exports = {
    ensureTables,
    toggleVote,
    addComment,
    updateComment,
    deleteComment,
    getFeatureFeedback,
    getFeedbackSummary,
    getTopRequested,
    getAllComments,
};
