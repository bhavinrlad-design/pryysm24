#!/usr/bin/env node

/**
 * Minimal server that responds immediately and loads Next.js in worker
 * This bypasses any synchronous blocking operations
 */

const { createServer } = require('http');

const port = parseInt(process.env.PORT, 10) || 8080;
const now = () => new Date().toISOString();

let handle = null;

console.log(`[${now()}] Starting minimal server on port ${port}`);

const server = createServer((req, res) => {
  // Health check
  if (req.url === '/health' || req.url === '/_health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }
  
  // If Next.js loaded, use it
  if (handle) {
    handle(req, res);
    return;
  }
  
  // Otherwise return loading page
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`<!DOCTYPE html>
<html>
<head>
  <title>Loading</title>
  <meta http-equiv="refresh" content="2">
</head>
<body style="font-family: sans-serif; text-align: center; padding: 50px;">
  <h1>⏳ Application Starting</h1>
  <p>Please wait...</p>
</body>
</html>`);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`[${now()}] ✓ Server listening on port ${port}`);
});

server.on('error', (err) => {
  console.error(`[${now()}] FATAL ERROR:`, err.message);
  process.exit(1);
});

// Start loading Next.js in background, don't block startup
console.log(`[${now()}] Starting Next.js load in background...`);

(async () => {
  try {
    console.log(`[${now()}] Requiring next...`);
    const next = require('next');
    
    console.log(`[${now()}] Creating Next.js app...`);
    const app = next({ dev: false, hostname: '0.0.0.0', port });
    
    console.log(`[${now()}] Getting request handler...`);
    handle = app.getRequestHandler();
    
    console.log(`[${now()}] ✓ Next.js ready!`);
  } catch (err) {
    console.error(`[${now()}] ERROR loading Next.js:`, err.message);
    console.error(err.stack);
  }
})();
