// Agentforce Roadmap v2 — router (mounted at /v2).
// Postgres-backed dashboard API + static v2 frontend. Purely additive:
// the existing app at "/" is untouched. Auth is applied by the parent
// (server.js mounts this AFTER requireAuth), so every /v2 route is gated.

const express = require('express');
const path = require('path');
const crypto = require('crypto');
const epics = require('../services/epics-service');

const router = express.Router();
const V2_DIR = path.join(__dirname, '..', 'public', 'v2');

// Small JSON helper: ETag from the payload so the browser can 304.
function sendJson(req, res, payload, maxAge = 60) {
    const body = JSON.stringify(payload);
    const etag = '"' + crypto.createHash('sha1').update(body).digest('base64') + '"';
    res.set('Cache-Control', `private, max-age=${maxAge}`);
    res.set('ETag', etag);
    if (req.headers['if-none-match'] === etag) return res.status(304).end();
    res.type('application/json').send(body);
}

function wrap(fn) {
    return async (req, res) => {
        try { await fn(req, res); }
        catch (err) {
            const status = err.status || 500;
            if (status >= 500) console.error('v2 route error:', err);
            res.status(status).json({ error: err.message || 'internal_error' });
        }
    };
}

router.get('/api/roadmap', wrap(async (req, res) => {
    const product = String(req.query.product || 'gus');
    const items = await epics.getRoadmap(product);
    sendJson(req, res, { product, count: items.length, items });
}));

router.get('/api/filters', wrap(async (req, res) => {
    const product = String(req.query.product || 'gus');
    sendJson(req, res, { product, filters: await epics.getFilters(product) });
}));

router.get('/api/stats', wrap(async (req, res) => {
    const product = String(req.query.product || 'gus');
    sendJson(req, res, { product, stats: await epics.getStats(product) });
}));

router.get('/api/sync/status', wrap(async (req, res) => {
    sendJson(req, res, { sync: await epics.getSyncStatus() }, 30);
}));

// Static v2 frontend (index + assets) and SPA fallback to its index.
router.use(express.static(V2_DIR));
router.get('/', (_req, res) => res.sendFile(path.join(V2_DIR, 'index.html')));

module.exports = router;
