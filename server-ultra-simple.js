#!/usr/bin/env node

/**
 * Ultra-simple production server
 * Minimal dependencies, maximum reliability
 */

const http = require('http');
const url = require('url');

const port = process.env.PORT || 8080;
const now = () => new Date().toISOString();

let app = null;
let appReady = false;

console.log(`[${now()}] 🚀 Starting server on port ${port}...`);

// Create server FIRST
const server = http.createServer(async (req, res) => {
  const { pathname } = url.parse(req.url);

  // Health check
  if (pathname === '/health' || pathname === '/_health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', uptime: Math.floor(process.uptime()) }));
    return;
  }

  // If Next.js loaded, use it
  if (appReady && app) {
    try {
      app(req, res);
    } catch (err) {
      console.error(`[${now()}] Error:`, err.message);
      if (!res.headersSent) {
        res.writeHead(500);
        res.end('Internal Server Error');
      }
    }
    return;
  }

  // While loading
  res.writeHead(503, { 'Content-Type': 'text/plain' });
  res.end('Service loading...');
});

// Start listening IMMEDIATELY
server.listen(port, '0.0.0.0', () => {
  console.log(`[${now()}] ✅ Server listening on port ${port}`);
});

// Load Next.js in background (don't block)
setImmediate(async () => {
  try {
    console.log(`[${now()}] 📦 Loading Next.js...`);
    const next = require('next');
    const nextApp = next({ dev: false });
    app = nextApp.getRequestHandler();
    appReady = true;
    console.log(`[${now()}] ✅ Next.js ready`);
  } catch (err) {
    console.error(`[${now()}] ❌ Failed to load Next.js:`, err.message);
    console.error(err.stack);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log(`[${now()}] SIGTERM: Shutting down gracefully...`);
  server.close(() => {
    console.log(`[${now()}] Server closed`);
    process.exit(0);
  });
});
