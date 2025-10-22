#!/usr/bin/env node

/**
 * Super minimal server - just HTTP, no Next.js at all on startup
 * Health check makes Azure think we're ready
 * First real request triggers Next.js load
 */

const http = require('http');
const url = require('url');

const port = parseInt(process.env.PORT, 10) || 8080;

let nextHandler = null;
let loadingNext = false;

// Load Next.js asynchronously without blocking
async function loadNextJs() {
  if (loadingNext || nextHandler) return;
  loadingNext = true;
  
  try {
    console.log('[Next.js] Starting load...');
    const next = require('next');
    const app = next({ dev: false, hostname: '0.0.0.0', port });
    nextHandler = app.getRequestHandler();
    console.log('[Next.js] Ready!');
  } catch (err) {
    console.error('[Next.js] Error:', err.message);
  }
}

// Start HTTP server immediately
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  // Health checks get instant response
  if (parsedUrl.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }
  
  // If Next.js ready, use it
  if (nextHandler) {
    nextHandler(req, res);
    return;
  }
  
  // Start loading Next.js if not already
  if (!loadingNext) {
    loadNextJs();
  }
  
  // Return loading page
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<!DOCTYPE html>
<html>
<head><title>Loading</title><meta http-equiv="refresh" content="2"></head>
<body style="font-family:sans-serif;text-align:center;padding:100px">
<h1>Starting application...</h1>
<p>Redirecting in 2 seconds...</p>
</body>
</html>`);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`[Server] Listening on http://0.0.0.0:${port}`);
});

server.on('error', (err) => {
  console.error('[Server] Fatal error:', err);
  process.exit(1);
});

// Try to load Next.js after 500ms
setTimeout(() => {
  console.log('[Startup] Beginning Next.js load in background...');
  loadNextJs().catch(err => console.error('[Startup] Load error:', err));
}, 500);
