#!/usr/bin/env node

/**
 * Respond to root immediately, load Next.js in background
 */

const { createServer } = require('http');
const url = require('url');

const port = parseInt(process.env.PORT, 10) || 8080;
const now = () => new Date().toISOString();

console.log(`[${now()}] STARTUP: Starting server on port ${port}`);

let handle;
let nextReady = false;

// Load Next.js in background
setTimeout(async () => {
  try {
    console.log(`[${now()}] BACKGROUND: Loading Next.js...`);
    const next = require('next');
    const app = next({ dev: false });
    handle = app.getRequestHandler();
    nextReady = true;
    console.log(`[${now()}] BACKGROUND: Next.js ready!`);
  } catch (err) {
    console.error(`[${now()}] ERROR:`, err.message);
  }
}, 100);

const server = createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  try {
    // HEALTH CHECKS: Always respond immediately
    if (parsedUrl.pathname === '/health' || parsedUrl.pathname === '/_health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok' }));
      return;
    }
    
    // ROOT: If Next.js not ready, return 503 or a loading page
    if (!nextReady && parsedUrl.pathname === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`<!DOCTYPE html>
<html>
<head><title>Loading...</title></head>
<body style="font-family: sans-serif; text-align: center; padding: 50px;">
  <h1>Application Starting...</h1>
  <p>Please refresh in a moment.</p>
  <script>setTimeout(() => location.reload(), 2000);</script>
</body>
</html>`);
      return;
    }
    
    // If Next.js not ready for other paths, wait a bit
    if (!nextReady && !handle) {
      res.writeHead(503);
      res.end('Service Starting');
      return;
    }
    
    // Proxy to Next.js
    if (handle) {
      handle(req, res);
    } else {
      res.writeHead(500);
      res.end('Error');
    }
  } catch (err) {
    console.error(`[${now()}] ERROR:`, err.message);
    if (!res.headersSent) {
      res.writeHead(500);
      res.end('Error');
    }
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`[${now()}] READY: Listening on port ${port}`);
});

server.on('error', (err) => {
  console.error(`[${now()}] FATAL:`, err.message);
  process.exit(1);
});
