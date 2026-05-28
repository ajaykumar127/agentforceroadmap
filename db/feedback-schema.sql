-- Agentforce Roadmap — feedback / sentiment tables
-- Backs the "💬 Feedback" feature: per-feature votes + comments
--
-- feature_key format: "<version>:<originalId>"  e.g. "v4:7", "v3:21", "gus:42"
-- We denormalize feature_title to keep historic comments readable even if
-- the source dataset evolves.

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
    priority      TEXT,                    -- low | medium | high | critical
    customer      TEXT,                    -- optional customer name
    pfr_link      TEXT,                    -- optional PFR / Slack / GUS link
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS feature_comments_feature_key_idx ON feature_comments (feature_key);
CREATE INDEX IF NOT EXISTS feature_comments_created_at_idx  ON feature_comments (created_at DESC);
