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
    const errMsg = cancelled ? '<div class="err">Sign-in cancelled. Try again.</div>' : '';

    res.send(layout('Sign in', `
        <h1 id="title">Sign in</h1>
        <p id="subtitle" class="note">Use your <code>@salesforce.com</code> email.</p>
        ${errMsg}
        <div id="status" style="display:none"></div>

        <!-- SSO redirect button (always offered for PRIMARY_BUTTON: both) -->
        <button class="sso-btn" id="sso-btn" type="button" onclick="startSsoLogin()">
            <img src="${VW.adminUrl}/static/sign-in-button-light.svg"
                 alt="Sign in with vibewareauth" width="260" height="44">
        </button>
        <p class="note" style="text-align:center">Requires Salesforce VPN or corp network</p>

        <div class="divider">or</div>

        <!-- MODE A: fresh email -->
        <div id="mode-fresh" style="display:none">
            <form id="form-email">
                <label>Salesforce email</label>
                <input id="email-fresh" name="email" type="email" autocomplete="email" required placeholder="you@salesforce.com">
                <button type="submit">Continue</button>
            </form>
            <p class="note">Have a passkey or authenticator? You'll see those options on the next step.</p>
        </div>

        <!-- MODE B: welcome-back -->
        <div id="mode-known" style="display:none">
            <p>Welcome back, <strong><span id="known-email"></span></strong></p>
            <div id="factor-buttons"></div>
            <hr>
            <p class="note"><a href="#" id="forget-email">Use a different email</a></p>
        </div>

        <!-- MODE C: email-OTP code entry -->
        <div id="mode-code" style="display:none">
            <p>A 6-digit code was sent to <code id="code-email"></code>. Expires in 10 minutes.</p>
            <p style="background:#fff3cd;border:1px solid #ffc107;padding:10px 12px;border-radius:6px;font-size:13px;color:#664d03">
                <strong>Don't see the email?</strong> Salesforce mail flows through
                <strong>Proofpoint</strong> before Gmail, and new senders are quarantined.
                Open <a href="https://00177002.pphosted.com:10020/euweb/login" target="_blank">your Proofpoint quarantine</a>,
                find the message from <code>login@vibewareauth.com</code>, tick it,
                and click <strong>Release and Allow Sender</strong>. Future codes will arrive directly.
            </p>
            <form id="form-code" method="POST" action="/login/verify">
                <input type="hidden" id="code-request-id" name="request_id">
                <input type="hidden" id="code-email-h" name="email">
                <label>Code</label>
                <input id="code" name="code" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" required
                       autocomplete="one-time-code"
                       style="font-size:18px;letter-spacing:6px;text-align:center">
                <button type="submit">Sign in</button>
                <p class="note"><a href="#" id="back-from-code">cancel</a></p>
            </form>
        </div>

        <details style="margin-top:18px;color:#888">
            <summary style="cursor:pointer;font-size:13px">Trouble with passkey or security-key prompts?</summary>
            <p class="note">Browser-extension password managers (1Password, Bitwarden, etc.) sometimes hijack the WebAuthn dialog. Press <strong>Esc</strong> to dismiss it, then click the factor button again — the native dialog appears next.</p>
        </details>

        <script>
            const LS_EMAIL = 'vw_app_last_email';
            const LS_METHODS = 'vw_app_last_methods';
            const ADMIN_URL = ${JSON.stringify(VW.adminUrl)};

            const $ = (id) => document.getElementById(id);
            const setBusy = (msg) => {
                const el = $('busy');
                if (!msg) { el.classList.remove('on'); return; }
                el.querySelector('div:last-child').textContent = msg;
                el.classList.add('on');
            };
            const setStatus = (msg, cls = '') => {
                const el = $('status');
                if (!msg) { el.style.display = 'none'; el.textContent = ''; return; }
                el.style.display = 'block'; el.className = cls; el.textContent = msg;
            };
            const showMode = (m) => {
                for (const id of ['mode-fresh','mode-known','mode-code']) {
                    $(id).style.display = (id === 'mode-' + m) ? 'block' : 'none';
                }
            };

            function rememberEmail(email, methods) {
                localStorage.setItem(LS_EMAIL, email);
                localStorage.setItem(LS_METHODS, JSON.stringify(methods));
            }

            async function fetchMethods(email) {
                try {
                    const r = await fetch('/login/methods', {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({ email }),
                    });
                    if (!r.ok) {
                        const j = await r.json().catch(() => ({}));
                        setStatus(j.error || 'Unable to look up account.', 'err');
                        return null;
                    }
                    const j = await r.json();
                    return j.methods || ['email'];
                } catch (err) {
                    setStatus('Network error: ' + err.message, 'err');
                    return null;
                }
            }

            function renderFactorButtons(email, methods) {
                const container = $('factor-buttons');
                container.innerHTML = '';
                const has = (k) => methods.includes(k);
                if (has('totp')) {
                    const wrap = document.createElement('div');
                    wrap.style.marginTop = '8px';
                    wrap.innerHTML = '<label>Authenticator code</label>' +
                        '<input id="totp-code" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" placeholder="6-digit code" autocomplete="one-time-code" style="font-size:18px;letter-spacing:6px;text-align:center">';
                    container.appendChild(wrap);
                    $('totp-code').addEventListener('input', (e) => {
                        const v = e.target.value.replace(/\\D/g,'').slice(0,6);
                        e.target.value = v;
                        if (v.length === 6) doTotp(email);
                    });
                    $('totp-code').addEventListener('keydown', (e) => { if (e.key === 'Enter') doTotp(email); });
                }
                const emailBtn = document.createElement('button');
                emailBtn.type = 'button';
                emailBtn.className = has('totp') ? 'subtle' : '';
                emailBtn.textContent = 'Email me a sign-in code';
                emailBtn.style.marginTop = '8px';
                emailBtn.addEventListener('click', () => doEmailRequest(email));
                container.appendChild(emailBtn);
            }

            function showWelcomeBack(email, methods) {
                $('known-email').textContent = email;
                renderFactorButtons(email, methods);
                showMode('known');
            }

            $('form-email').addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = $('email-fresh').value.trim().toLowerCase();
                if (!email) return;
                setBusy('Looking up your account…');
                const methods = await fetchMethods(email);
                setBusy('');
                if (!methods) return;
                rememberEmail(email, methods);
                showWelcomeBack(email, methods);
            });

            let totpInFlight = false;
            function doTotp(email) {
                if (totpInFlight) return;
                const code = ($('totp-code')?.value || '').trim();
                if (!/^\\d{6}$/.test(code)) { setStatus('Enter the 6-digit code from your authenticator.', 'err'); return; }
                totpInFlight = true;
                setBusy('Authenticating…');
                const f = document.createElement('form');
                f.method = 'POST'; f.action = '/login/totp'; f.style.display = 'none';
                f.innerHTML = '<input name="email" value="' + email.replace(/"/g,'&quot;') + '"><input name="code" value="' + code.replace(/"/g,'&quot;') + '">';
                document.body.appendChild(f); f.submit();
            }

            async function doEmailRequest(email) {
                setBusy('Sending code…');
                const r = await fetch('/login/email/request', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ email }),
                });
                setBusy('');
                if (!r.ok) {
                    const j = await r.json().catch(() => ({}));
                    const msg = j.error === 'too_soon'
                        ? 'Code already sent recently. Wait 60 seconds, then try again.'
                        : (j.error || ('HTTP ' + r.status));
                    setStatus(msg, 'err');
                    return;
                }
                const j = await r.json();
                $('code-email').textContent = email;
                $('code-email-h').value = email;
                $('code-request-id').value = j.request_id;
                showMode('code');
                setStatus('');
                setTimeout(() => $('code').focus(), 0);
            }

            $('form-code').addEventListener('submit', () => setBusy('Authenticating…'));
            $('code').addEventListener('input', (e) => {
                const v = e.target.value.replace(/\\D/g,'').slice(0,6);
                e.target.value = v;
                if (v.length === 6) $('form-code').requestSubmit();
            });

            $('back-from-code').addEventListener('click', (e) => {
                e.preventDefault();
                const remembered = localStorage.getItem(LS_EMAIL);
                const cached = JSON.parse(localStorage.getItem(LS_METHODS) || '["email"]');
                if (remembered) showWelcomeBack(remembered, cached);
                else showMode('fresh');
            });
            $('forget-email').addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem(LS_EMAIL);
                localStorage.removeItem(LS_METHODS);
                showMode('fresh');
                setTimeout(() => $('email-fresh').focus(), 0);
            });

            // Private-space: skip the VPN reachability check (network already proves it)
            window.startSsoLogin = function() {
                setBusy('Redirecting to vibewareauth…');
                window.location.href = '/login/vibewareauth';
            };

            (function init() {
                const remembered = localStorage.getItem(LS_EMAIL);
                if (remembered) {
                    const cached = JSON.parse(localStorage.getItem(LS_METHODS) || '["email"]');
                    showWelcomeBack(remembered, cached);
                    fetchMethods(remembered).then(fresh => {
                        if (fresh && JSON.stringify(fresh) !== JSON.stringify(cached)) {
                            rememberEmail(remembered, fresh);
                            showWelcomeBack(remembered, fresh);
                        }
                    });
                } else {
                    showMode('fresh');
                    $('email-fresh').focus();
                }
            })();
        </script>
    `));
});

// /login/methods — proxy
app.post('/login/methods', async (req, res) => {
    const email = String(req.body.email || '').trim().toLowerCase();
    if (!email) return res.status(400).json({ error: 'invalid_request' });
    const r = await vwCall('/v1/auth/methods', { email });
    res.status(r.status).json(r.json);
});

// /login/email/request — proxy
app.post('/login/email/request', async (req, res) => {
    const email = String(req.body.email || '').trim().toLowerCase();
    if (!email) return res.status(400).json({ error: 'invalid_request' });
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
    setSessionCookie(res, r.json.session_token);
    res.redirect('/');
});

// /login/totp — finish TOTP
app.post('/login/totp', async (req, res) => {
    const email = String(req.body.email || '').trim().toLowerCase();
    const code = String(req.body.code || '').trim();
    if (!email || !code) return res.redirect('/login');
    const r = await vwCall('/v1/auth/totp/verify', { email, code });
    if (r.status !== 200 || !r.json?.session_token) {
        return res.status(401).send(layout('Sign-in failed', `
            <div class="err">${(r.json && r.json.error) || 'invalid code'}</div>
            <p><a href="/login">Try again</a></p>`));
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
    if (!expectedState || req.query.state !== expectedState) return res.status(400).send('state mismatch');
    const code = String(req.query.code || '');
    if (!code) return res.status(400).send('missing code');
    const r = await vwCall('/v1/auth/exchange', {
        code,
        redirect_uri: REDIRECT_URI,
        ...(verifier ? { code_verifier: verifier } : {}),
    });
    if (r.status !== 200 || !r.json?.session_token) {
        return res.status(401).send(layout('Sign-in failed', `
            <div class="err">sign-in failed: ${(r.json && r.json.error) || r.status}</div>
            <p><a href="/login">Try again</a></p>`));
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
