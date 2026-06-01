// =====================================================================
// Agentforce Roadmap — Express server
// Auth: vibewareauth (email OTP + TOTP + SSO redirect with PKCE)
// + emergency break-glass + Helmet CSP tuned for inline handlers
// =====================================================================

const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const crypto = require('node:crypto');
const { timingSafeEqual } = require('node:crypto');
require('dotenv').config();

const { generateAnswer, getChatHistory, searchSimilarContent } = require('./services/rag-service');
const feedback = require('./services/feedback-service');

const app = express();
const PORT = process.env.PORT || 3000;
app.set('trust proxy', 1); // Heroku terminates TLS

// ---------------------------------------------------------------------
// vibewareauth configuration
// ---------------------------------------------------------------------
const VW = {
    base: process.env.VIBEWAREAUTH_API_BASE || 'https://api.vibewareauth.com',
    appId: process.env.VIBEWAREAUTH_APP_ID,
    appSecret: process.env.VIBEWAREAUTH_APP_SECRET,
    adminUrl: process.env.VIBEWAREAUTH_ADMIN_URL || 'https://vibewareauth-admin-64156d094d72.herokuapp.com',
};
const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL || `http://localhost:${PORT}`;
const REDIRECT_URI = `${PUBLIC_BASE_URL}/login/vibewareauth/callback`;

// 30 days for private-space hosting (per user decision)
const SESSION_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

if (!VW.appId || !VW.appSecret) {
    console.warn('⚠️  VIBEWAREAUTH_APP_ID / VIBEWAREAUTH_APP_SECRET not set — login will fail until configured');
}

// Restrict access to Salesforce employees only.
// Defense-in-depth: enforced at the email-entry proxies, after every
// session mint, and on every protected request via requireAuth.
const ALLOWED_EMAIL_DOMAIN = 'salesforce.com';
function isAllowedEmail(email) {
    if (!email) return false;
    return String(email).trim().toLowerCase().endsWith('@' + ALLOWED_EMAIL_DOMAIN);
}

async function vwCall(routePath, body) {
    const r = await fetch(`${VW.base}${routePath}`, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${VW.appSecret || ''}`,
            'x-app-id': VW.appId || '',
            'content-type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    return { status: r.status, json: await r.json().catch(() => null) };
}

function setSessionCookie(res, token) {
    res.cookie('session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: SESSION_MAX_AGE_MS,
    });
}

function s256(buf) {
    return crypto.createHash('sha256').update(buf).digest('base64url');
}

// ---------------------------------------------------------------------
// Security headers (Helmet) — CSP tuned for inline event handlers
// ---------------------------------------------------------------------
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            scriptSrcAttr: ["'unsafe-inline'"], // CRITICAL for inline onclick/oninput
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: [
                "'self'",
                "https://api.vibewareauth.com",
                "https://vibewareauth-admin-64156d094d72.herokuapp.com",
            ],
            frameAncestors: ["'none'"],
            formAction: ["'self'", "https://vibewareauth-admin-64156d094d72.herokuapp.com"],
        },
    },
    crossOriginEmbedderPolicy: false,
}));

// ---------------------------------------------------------------------
// Common middleware
// ---------------------------------------------------------------------
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '100kb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100kb' }));

// ---------------------------------------------------------------------
// Public routes (no auth)
// ---------------------------------------------------------------------
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ---------------------------------------------------------------------
// /login — unified page (welcome-back, fresh email, code entry, SSO)
// ---------------------------------------------------------------------
const STYLE = `<style>
*{box-sizing:border-box}
body{font:15px/1.5 -apple-system,'Inter',system-ui,sans-serif;max-width:480px;margin:48px auto;padding:0 24px;color:#181818;background:#f4f6f9;min-height:100vh}
.card{background:#fff;border-radius:14px;padding:32px;box-shadow:0 8px 24px rgba(0,0,0,0.06);border:1px solid #ecebea}
h1{font-size:1.75rem;margin:0 0 8px;letter-spacing:-0.02em}
input,button,select{padding:10px 12px;border-radius:8px;border:1px solid #d8dde6;font:inherit;width:100%;margin-top:8px;box-sizing:border-box;background:#fff;color:inherit}
input:focus,button:focus{outline:none;border-color:#0070d2;box-shadow:0 0 0 3px rgba(0,112,210,0.18)}
button{background:#0070d2;color:#fff;border:0;cursor:pointer;font-weight:600;transition:filter .12s ease,transform .04s ease}
button:hover{filter:brightness(1.05)}
button:not(:disabled):active{transform:scale(0.98);filter:brightness(0.92)}
button.subtle{background:#f4f6f9;color:#181818;border:1px solid #d8dde6}
.err{background:#fee;color:#c00;padding:10px 12px;border-radius:8px;margin:10px 0;font-size:14px}
.note{color:#706e6b;font-size:13px;margin-top:8px}
.muted{color:#959492}
hr{border:0;border-top:1px solid #ecebea;margin:18px 0}
.sso-btn{padding:0;background:transparent;border:0;display:inline-flex;justify-content:center;width:100%;margin-top:0}
.sso-btn img{max-width:100%;height:auto;border-radius:6px}
.divider{display:flex;align-items:center;gap:12px;margin:18px 0;color:#959492;font-size:12px;text-transform:uppercase;letter-spacing:0.08em}
.divider::before,.divider::after{content:"";flex:1;border-top:1px solid #ecebea}
#busy{display:none;position:fixed;inset:0;background:rgba(255,255,255,0.85);align-items:center;justify-content:center;z-index:50;flex-direction:column;backdrop-filter:blur(4px)}
#busy.on{display:flex}
.ring{width:40px;height:40px;border:3px solid #ddd;border-top-color:#0070d2;border-radius:50%;animation:spin 0.8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
button{position:relative}
button.vw-flash::after{content:'';position:absolute;inset:0;border-radius:inherit;background:rgba(255,255,255,0.35);pointer-events:none;animation:vwFlashOut .35s ease-out forwards}
@keyframes vwFlashOut{from{opacity:1}to{opacity:0}}
button[data-busy="1"]{cursor:wait;pointer-events:none}
button[data-busy="1"] .vw-spinner{display:inline-block;width:12px;height:12px;border:2px solid currentColor;border-top-color:transparent;border-radius:50%;animation:spin .7s linear infinite;vertical-align:-2px;margin-right:6px}
body.vw-form-submitting::before{content:'';position:fixed;inset:0;background:rgba(0,0,0,0.15);z-index:80;pointer-events:none}
.brand{text-align:center;margin-bottom:18px}
.brand h2{font-size:1rem;color:#0070d2;margin:0;letter-spacing:0.02em;font-weight:700}
.brand p{font-size:11px;color:#959492;text-transform:uppercase;letter-spacing:0.1em;margin:4px 0 0}
</style>`;

const layout = (title, body) => `<!doctype html><html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} · Agentforce Roadmap</title>${STYLE}
</head><body>
<div class="brand"><h2>Agentforce Roadmap</h2><p>Internal · Confidential</p></div>
<div class="card">${body}</div>
<div id="busy"><div class="ring"></div><div style="margin-top:12px">Authenticating…</div></div>
<script>
(function(){
  document.addEventListener('click', function(e){
    const t = e.target.closest('button');
    if (!t || t.disabled || t.getAttribute('data-busy') === '1') return;
    t.classList.remove('vw-flash'); void t.offsetWidth;
    t.classList.add('vw-flash');
    setTimeout(function(){ t.classList.remove('vw-flash'); }, 400);
  }, true);
  document.addEventListener('submit', function(e){
    const form = e.target;
    if (!form || form.tagName !== 'FORM') return;
    if (form.dataset.vwNoAutoBusy === 'true' || e.defaultPrevented) return;
    document.body.classList.add('vw-form-submitting');
    const btn = form.querySelector('button[type="submit"], button:not([type])');
    if (btn && !btn.disabled) {
      btn.dataset.vwOriginal = btn.innerHTML;
      btn.dataset.busy = '1';
      btn.innerHTML = '<span class="vw-spinner"></span>' + (btn.dataset.busyText || 'Working…');
    }
  }, true);
})();
</script>
</body></html>`;

app.get('/login', (req, res) => {
    const cancelled = req.query.cancelled === '1';
    const blocked = req.query.domain === 'blocked';
    let errMsg = '';
    if (cancelled) errMsg = '<div class="err">Sign-in cancelled. Try again.</div>';
    if (blocked) errMsg = `<div class="err">Only <code>@${ALLOWED_EMAIL_DOMAIN}</code> emails can access this app.</div>`;

    res.send(layout('Sign in', `
        <h1 id="title">Sign in</h1>
        <p id="subtitle" class="note">Salesforce employees only — sign in with your <strong><code>@${ALLOWED_EMAIL_DOMAIN}</code></strong> email. Other domains are not permitted.</p>
        ${errMsg}
        <div id="status" style="display:none"></div>

        <!-- SSO redirect button (always offered for PRIMARY_BUTTON: both) -->
        <button class="sso-btn" id="sso-btn" type="button" onclick="startSsoLogin()">
            <img src="${VW.adminUrl}/static/sign-in-button-light.svg"
                 alt="Sign in with vibewareauth" width="260" height="44">
        </button>
        <p class="note" style="text-align:center">Requires Salesforce VPN or corp network</p>

        <script>
            const $ = (id) => document.getElementById(id);
            const setBusy = (msg) => {
                const el = $('busy');
                if (!el) return;
                if (!msg) { el.classList.remove('on'); return; }
                el.querySelector('div:last-child').textContent = msg;
                el.classList.add('on');
            };
            // Private-space: skip the VPN reachability check (network already proves it)
            window.startSsoLogin = function() {
                setBusy('Redirecting to vibewareauth…');
                window.location.href = '/login/vibewareauth';
            };
        </script>
    `));
});

// Verify the email tied to a freshly minted session token; reject non-SF.
async function verifyAndCheckDomain(sessionToken) {
    const verify = await vwCall('/v1/sessions/verify', { session_token: sessionToken });
    if (verify.status !== 200 || !verify.json?.email) return { ok: false };
    if (!isAllowedEmail(verify.json.email)) {
        return { ok: false, badDomain: true, email: verify.json.email };
    }
    return { ok: true };
}
function domainBlockPage() {
    return layout('Sign-in blocked', `
        <div class="err">Only <code>@${ALLOWED_EMAIL_DOMAIN}</code> emails can access this app.</div>
        <p><a href="/login">Try again</a></p>`);
}

// /login/methods — proxy. Reject non-SF emails before hitting the API.
app.post('/login/methods', async (req, res) => {
    const email = String(req.body.email || '').trim().toLowerCase();
    if (!email) return res.status(400).json({ error: 'invalid_request' });
    if (!isAllowedEmail(email)) return res.status(403).json({ error: 'domain_not_allowed' });
    const r = await vwCall('/v1/auth/methods', { email });
    res.status(r.status).json(r.json);
});

// /login/email/request — proxy
app.post('/login/email/request', async (req, res) => {
    const email = String(req.body.email || '').trim().toLowerCase();
    if (!email) return res.status(400).json({ error: 'invalid_request' });
    if (!isAllowedEmail(email)) return res.status(403).json({ error: 'domain_not_allowed' });
    const r = await vwCall('/v1/auth/email/request', { email });
    res.status(r.status).json(r.json);
});

// /login/verify — finish email OTP
app.post('/login/verify', async (req, res) => {
    const r = await vwCall('/v1/auth/email/verify', {
        request_id: req.body.request_id,
        code: req.body.code,
    });
    if (r.status !== 200 || !r.json?.session_token) {
        return res.status(401).send(layout('Sign-in failed', `
            <div class="err">${(r.json && r.json.error) || 'failed'}</div>
            <p><a href="/login">Try again</a></p>`));
    }
    const check = await verifyAndCheckDomain(r.json.session_token);
    if (!check.ok) {
        await vwCall('/v1/sessions/revoke', { session_token: r.json.session_token }).catch(() => {});
        return res.status(403).send(domainBlockPage());
    }
    setSessionCookie(res, r.json.session_token);
    res.redirect('/');
});

// /login/totp — finish TOTP
app.post('/login/totp', async (req, res) => {
    const email = String(req.body.email || '').trim().toLowerCase();
    const code = String(req.body.code || '').trim();
    if (!email || !code) return res.redirect('/login');
    if (!isAllowedEmail(email)) return res.status(403).send(domainBlockPage());
    const r = await vwCall('/v1/auth/totp/verify', { email, code });
    if (r.status !== 200 || !r.json?.session_token) {
        return res.status(401).send(layout('Sign-in failed', `
            <div class="err">${(r.json && r.json.error) || 'invalid code'}</div>
            <p><a href="/login">Try again</a></p>`));
    }
    const check = await verifyAndCheckDomain(r.json.session_token);
    if (!check.ok) {
        await vwCall('/v1/sessions/revoke', { session_token: r.json.session_token }).catch(() => {});
        return res.status(403).send(domainBlockPage());
    }
    setSessionCookie(res, r.json.session_token);
    res.redirect('/');
});

// /login/vibewareauth — start SSO redirect (PKCE)
app.get('/login/vibewareauth', (_req, res) => {
    const state = crypto.randomBytes(16).toString('base64url');
    const verifier = crypto.randomBytes(48).toString('base64url');
    const challenge = s256(verifier);
    const cookieOpts = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 5 * 60 * 1000,
    };
    res.cookie('vw_state', state, cookieOpts);
    res.cookie('vw_pkce', verifier, cookieOpts);
    const u = new URL(`${VW.adminUrl}/auth/authorize`);
    u.searchParams.set('app_id', VW.appId);
    u.searchParams.set('redirect_uri', REDIRECT_URI);
    u.searchParams.set('state', state);
    u.searchParams.set('code_challenge', challenge);
    u.searchParams.set('code_challenge_method', 'S256');
    res.redirect(u.toString());
});

// /login/vibewareauth/callback — exchange code → session
app.get('/login/vibewareauth/callback', async (req, res) => {
    const expectedState = req.cookies.vw_state;
    const verifier = req.cookies.vw_pkce;
    res.clearCookie('vw_state');
    res.clearCookie('vw_pkce');
    if (req.query.error === 'access_denied') return res.redirect('/login?cancelled=1');

    // IdP-initiated login from the vibewareauth App Catalogue: no PKCE was
    // generated locally, and there's no state cookie to compare against.
    // The admin app is the trusted initiator. Code is still single-use,
    // 60s TTL, and bound to this app_id + redirect_uri at the API.
    const idpInitiated = req.query.state === 'vibewareauth_idp_initiated';
    if (!idpInitiated) {
        if (!expectedState || req.query.state !== expectedState) return res.status(400).send('state mismatch');
    }
    const code = String(req.query.code || '');
    if (!code) return res.status(400).send('missing code');
    const r = await vwCall('/v1/auth/exchange', {
        code,
        redirect_uri: REDIRECT_URI,
        ...(idpInitiated ? {} : (verifier ? { code_verifier: verifier } : {})),
    });
    if (r.status !== 200 || !r.json?.session_token) {
        return res.status(401).send(layout('Sign-in failed', `
            <div class="err">sign-in failed: ${(r.json && r.json.error) || r.status}</div>
            <p><a href="/login">Try again</a></p>`));
    }
    const check = await verifyAndCheckDomain(r.json.session_token);
    if (!check.ok) {
        await vwCall('/v1/sessions/revoke', { session_token: r.json.session_token }).catch(() => {});
        return res.status(403).send(domainBlockPage());
    }
    setSessionCookie(res, r.json.session_token);
    res.redirect('/');
});

// ---------------------------------------------------------------------
// Break-glass middleware (BEFORE requireAuth)
// ---------------------------------------------------------------------
const BREAK_GLASS_TOKEN = process.env.BREAK_GLASS_TOKEN;
const breakGlassAttempts = new Map();

function checkBreakGlass(req, _res, next) {
    const token = req.headers['x-break-glass'];
    if (!token) return next();
    const ip = req.ip;
    const now = Date.now();
    const record = breakGlassAttempts.get(ip) || { count: 0, resetAt: now + 15 * 60_000 };
    if (now > record.resetAt) { record.count = 0; record.resetAt = now + 15 * 60_000; }
    record.count++;
    breakGlassAttempts.set(ip, record);
    if (record.count > 3) {
        const err = new Error('too_many_attempts');
        err.status = 429;
        return next(err);
    }
    if (!BREAK_GLASS_TOKEN) return next();
    const a = Buffer.from(token);
    const b = Buffer.from(BREAK_GLASS_TOKEN);
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
        console.error(JSON.stringify({ event: 'break_glass_failed', ip, ts: new Date().toISOString() }));
        const err = new Error('invalid_break_glass_token');
        err.status = 401;
        return next(err);
    }
    console.error(JSON.stringify({ level: 'warn', event: 'break_glass_granted', ip, ts: new Date().toISOString() }));
    req.user = { user_id: 'break-glass', email: 'break-glass@emergency', is_break_glass: true };
    if (process.env.BREAK_GLASS_ALERT_WEBHOOK) {
        fetch(process.env.BREAK_GLASS_ALERT_WEBHOOK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: `🚨 Break-glass ACCESS GRANTED to Agentforce Roadmap from ${ip}` }),
        }).catch(() => {});
    }
    next();
}

// ---------------------------------------------------------------------
// requireAuth middleware
// ---------------------------------------------------------------------
async function requireAuth(req, res, next) {
    if (req.user) return next(); // break-glass already authenticated
    const token = req.cookies.session;
    if (!token) {
        if (req.accepts('html')) return res.redirect('/login');
        return res.status(401).json({ error: 'unauthenticated' });
    }
    const r = await vwCall('/v1/sessions/verify', { session_token: token });
    if (r.status !== 200) {
        res.clearCookie('session');
        if (req.accepts('html')) return res.redirect('/login');
        return res.status(401).json({ error: 'session_expired' });
    }
    // Defense-in-depth: refuse every protected request whose verified email
    // isn't on the allowed domain — even if the API issues a token for one.
    if (!isAllowedEmail(r.json.email)) {
        await vwCall('/v1/sessions/revoke', { session_token: token }).catch(() => {});
        res.clearCookie('session');
        if (req.accepts('html')) return res.redirect('/login?domain=blocked');
        return res.status(403).json({ error: 'domain_not_allowed' });
    }
    req.user = r.json;
    next();
}

// ---------------------------------------------------------------------
// Logout
// ---------------------------------------------------------------------
app.post('/logout', async (req, res) => {
    const token = req.cookies.session;
    if (token) await vwCall('/v1/sessions/revoke', { session_token: token }).catch(() => {});
    res.clearCookie('session').redirect('/login');
});

// ---------------------------------------------------------------------
// Auth gate for everything below
// ---------------------------------------------------------------------
app.use(checkBreakGlass);
app.use(requireAuth);

// Expose current user info to client (for greeting + manage-signin link)
app.get('/api/me', (req, res) => {
    res.json({
        email: req.user.email,
        user_id: req.user.user_id,
        is_break_glass: !!req.user.is_break_glass,
        admin_url: VW.adminUrl,
    });
});

// --- Feedback API (requires auth, set above) ------------------------
app.post('/api/feedback/vote', async (req, res) => {
    try {
        const { feature_key, feature_title } = req.body || {};
        if (!feature_key) return res.status(400).json({ error: 'feature_key_required' });
        const r = await feedback.toggleVote({
            featureKey: feature_key,
            featureTitle: feature_title,
            userEmail: req.user.email,
            userId: req.user.user_id,
        });
        res.json(r);
    } catch (err) {
        console.error('vote error', err);
        res.status(500).json({ error: err.message || 'vote_failed' });
    }
});

app.post('/api/feedback/comments', async (req, res) => {
    try {
        const { feature_key, feature_title, body, priority, customer, pfr_link } = req.body || {};
        const r = await feedback.addComment({
            featureKey: feature_key,
            featureTitle: feature_title,
            userEmail: req.user.email,
            userId: req.user.user_id,
            body,
            priority,
            customer,
            pfrLink: pfr_link,
        });
        res.json(r);
    } catch (err) {
        console.error('comment error', err);
        const status = (err.message === 'empty_body' || err.message === 'missing_fields') ? 400 : 500;
        res.status(status).json({ error: err.message || 'comment_failed' });
    }
});

app.delete('/api/feedback/comments/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (!id) return res.status(400).json({ error: 'invalid_id' });
        const r = await feedback.deleteComment({ id, userEmail: req.user.email });
        if (!r.deleted) return res.status(404).json({ error: 'not_found_or_not_yours' });
        res.json(r);
    } catch (err) {
        console.error('delete comment error', err);
        res.status(500).json({ error: 'delete_failed' });
    }
});

// Author-only edit. SQL guards on user_email so even a forged id fails.
app.patch('/api/feedback/comments/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (!id) return res.status(400).json({ error: 'invalid_id' });
        const { body, priority, customer, pfr_link } = req.body || {};
        const r = await feedback.updateComment({
            id,
            userEmail: req.user.email,
            body,
            priority,
            customer,
            pfrLink: pfr_link,
        });
        if (!r.updated) return res.status(403).json({ error: 'not_yours_or_not_found' });
        res.json(r);
    } catch (err) {
        const status = (err.message === 'empty_body' || err.message === 'missing_fields') ? 400 : 500;
        res.status(status).json({ error: err.message || 'update_failed' });
    }
});

// Global public feed — every comment across every feature.
app.get('/api/feedback/all', async (req, res) => {
    try {
        const limit  = Math.min(parseInt(req.query.limit, 10)  || 100, 500);
        const offset = Math.max(parseInt(req.query.offset, 10) || 0,   0);
        const items = await feedback.getAllComments({ limit, offset, userEmail: req.user.email });
        res.json({ items });
    } catch (err) {
        console.error('all comments error', err);
        res.status(500).json({ error: 'fetch_failed' });
    }
});

app.get('/api/feedback/feature/:key', async (req, res) => {
    try {
        const r = await feedback.getFeatureFeedback({
            featureKey: req.params.key,
            userEmail: req.user.email,
        });
        res.json(r);
    } catch (err) {
        console.error('feature feedback error', err);
        res.status(500).json({ error: 'fetch_failed' });
    }
});

app.get('/api/feedback/summary', async (req, res) => {
    try {
        const r = await feedback.getFeedbackSummary({ userEmail: req.user.email });
        res.json(r);
    } catch (err) {
        console.error('summary error', err);
        res.status(500).json({ error: 'summary_failed' });
    }
});

app.get('/api/feedback/top', async (req, res) => {
    try {
        const limit = Math.min(parseInt(req.query.limit, 10) || 50, 200);
        const rows = await feedback.getTopRequested({ limit });
        res.json({ items: rows });
    } catch (err) {
        console.error('top error', err);
        res.status(500).json({ error: 'top_failed' });
    }
});

// ---------------------------------------------------------------------
// Protected app routes
// ---------------------------------------------------------------------
app.post('/api/chat', async (req, res) => {
    try {
        const { message, sessionId } = req.body;
        if (!message) return res.status(400).json({ error: 'Message is required' });
        if (!process.env.OPENAI_API_KEY) {
            return res.status(503).json({
                error: 'Chat service not configured',
                message: 'OpenAI API key is not set. Please configure OPENAI_API_KEY environment variable to enable chat functionality.',
            });
        }
        const session = sessionId || `session-${Date.now()}`;
        console.log(`💬 Chat request: "${message}" (session: ${session}, user: ${req.user.email})`);
        const result = await generateAnswer(message, session);
        res.json({
            answer: result.answer,
            sources: result.sources,
            context: result.context,
            sessionId: session,
        });
    } catch (error) {
        console.error('Error in chat endpoint:', error);
        res.status(500).json({ error: 'Failed to generate response', message: error.message });
    }
});

app.get('/api/chat/history/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const limit = parseInt(req.query.limit) || 10;
        const history = await getChatHistory(sessionId, limit);
        res.json({ history });
    } catch (error) {
        console.error('Error getting chat history:', error);
        res.status(500).json({ error: 'Failed to retrieve chat history', message: error.message });
    }
});

app.post('/api/search', async (req, res) => {
    try {
        const { query, limit } = req.body;
        if (!query) return res.status(400).json({ error: 'Query is required' });
        const results = await searchSimilarContent(query, limit || 5);
        res.json({ results });
    } catch (error) {
        console.error('Error in search endpoint:', error);
        res.status(500).json({ error: 'Search failed', message: error.message });
    }
});

// Static assets (data.js, app.js, styles.css, etc.) — protected
app.use(express.static(__dirname));

// Index page (covers '/' and any unmatched HTML route)
app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handler
app.use((err, _req, res, _next) => {
    if (err && err.status) return res.status(err.status).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error: 'internal_error' });
});

// ---------------------------------------------------------------------
app.listen(PORT, async () => {
    console.log(`🚀 Agentforce Roadmap server running on port ${PORT}`);
    console.log(`📍 Access at: http://localhost:${PORT}`);
    console.log(`🔐 Auth: vibewareauth (app=${VW.appId ? VW.appId.slice(0,12) + '…' : 'NOT SET'})`);
    console.log(`💬 Chat API: http://localhost:${PORT}/api/chat`);
    console.log(`🔍 Search API: http://localhost:${PORT}/api/search`);
    if (process.env.DATABASE_URL) {
        try {
            await feedback.ensureTables();
            console.log('💬 Feedback tables ready');
        } catch (e) {
            console.warn('⚠️  Could not ensure feedback tables:', e.message);
        }
    } else {
        console.warn('⚠️  DATABASE_URL not set — feedback API will fail at runtime');
    }
});
