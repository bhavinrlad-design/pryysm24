#!/usr/bin/env node

/**
 * Hybrid approach: single process but defers Next.js loading using async/await patterns
 * Server listens immediately, Next.js loads on demand
 */

const http = require('http');
const url = require('url');

const port = parseInt(process.env.PORT, 10) || 8080;
const now = () => new Date().toISOString();

let nextHandler = null;
let nextLoading = false;

console.log(`[${now()}] Starting hybrid server on port ${port}`);

// Create the server immediately - this doesn't require Next.js
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  // Health check - always respond instantly
  if (parsedUrl.pathname === '/health' || parsedUrl.pathname === '/_health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }
  
  // If Next.js not loaded, start loading
  if (!nextHandler && !nextLoading) {
    nextLoading = true;
    console.log(`[${now()}] First request - loading Next.js...`);
    
    // Start loading asynchronously, but don't wait for it here
    (async () => {
      try {
        // This is the expensive part - done on first request, not at startup
        const next = require('next');
        const app = next({ dev: false });
        nextHandler = app.getRequestHandler();
        console.log(`[${now()}] ✓ Next.js loaded successfully`);
      } catch (err) {
        console.error(`[${now()}] ❌ Error loading Next.js:`, err.message);
        console.error(err.stack);
        nextLoading = false;
      }
    })();
  }
  
  // If Next.js not ready, show loading page (don't block)
  if (!nextHandler) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<!DOCTYPE html>
<html>
<head>
  <title>Starting</title>
  <meta http-equiv="refresh" content="2">
</head>
<body style="font-family: sans-serif; text-align: center; padding: 100px;">
  <h1>⏳ Initializing Application</h1>
  <p>Loading Next.js... This may take up to 2 minutes on first request.</p>
  <p><small>Auto-refresh in 2 seconds</small></p>
</body>
</html>`);
    return;
  }
  
  // Next.js is ready, handle the request
  try {
    nextHandler(req, res);
  } catch (err) {
    console.error(`[${now()}] Error handling request:`, err.message);
    if (!res.headersSent) {
      res.writeHead(500);
      res.end('Error');
    }
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`[${now()}] ✓ Hybrid server listening on port ${port}`);
  console.log(`[${now()}] Health check: http://localhost:${port}/health`);
  console.log(`[${now()}] App URL: http://localhost:${port}/`);
});

server.on('error', (err) => {
  console.error(`[${now()}] FATAL ERROR:`, err.message);
  process.exit(1);
});
