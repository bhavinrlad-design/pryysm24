#!/usr/bin/env node

/**
 * Simple sync server: Load Next.js synchronously, then start listening.
 * Trades slow startup for guaranteed reliability.
 */

const http = require('http');
const url = require('url');

const port = parseInt(process.env.PORT, 10) || 8080;
const now = () => new Date().toISOString();

console.log(`[${now()}] Starting SYNC server...`);
const startTime = Date.now();

// Load Next.js synchronously (will block for ~100 seconds)
let nextHandler = null;
try {
  console.log(`[${now()}] Loading Next.js (synchronous, will block)...`);
  const loadStart = Date.now();
  
  const next = require('next');
  console.log(`[${now()}] require('next') done: ${Math.floor((Date.now() - loadStart) / 1000)}s`);
  
  const app = next({ dev: false });
  console.log(`[${now()}] next() done: ${Math.floor((Date.now() - loadStart) / 1000)}s`);
  
  nextHandler = app.getRequestHandler();
  console.log(`[${now()}] ✓ Next.js ready: ${Math.floor((Date.now() - loadStart) / 1000)}s total`);
} catch (err) {
  console.error(`[${now()}] ❌ Failed to load Next.js:`, err.message);
  console.error(err.stack);
  process.exit(1);
}

// NOW create and start HTTP server
const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  
  // Health endpoint
  if (pathname === '/health' || pathname === '/_health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', uptime_seconds: Math.floor((Date.now() - startTime) / 1000) }));
    return;
  }

  // All other requests go to Next.js
  try {
    nextHandler(req, res);
  } catch (err) {
    console.error(`[${now()}] Error handling request:`, err.message);
    if (!res.headersSent) {
      res.writeHead(500);
      res.end('Internal Server Error');
    }
  }
});

server.listen(port, '0.0.0.0', () => {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  console.log(`[${now()}] ✓ Server listening on port ${port}`);
  console.log(`[${now()}] Total startup time: ${elapsed}s`);
});

server.on('error', (err) => {
  console.error(`[${now()}] Server error:`, err.message);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error(`[${now()}] Uncaught exception:`, err.message);
  process.exit(1);
});
