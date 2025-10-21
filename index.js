#!/usr/bin/env node

const http = require('http');
const url = require('url');
const port = process.env.PORT || 8080;

// Disable Next.js telemetry
process.env.NEXT_TELEMETRY_DISABLED = '1';
process.env.NODE_ENV = 'production';

console.log(`[${Date.now()}] Server starting on port ${port}`);

let ready = false;
let handle = null;

// HTTP server - responds IMMEDIATELY
const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  
  // Health check - ALWAYS respond, even during init
  if (pathname === '/' || pathname === '/health' || pathname === '/_health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: ready ? 'ok' : 'starting' }));
    return;
  }
  
  // Other requests need app to be ready
  if (!ready) {
    res.writeHead(503);
    res.end('Starting');
    return;
  }
  
  try {
    handle(req, res).catch(() => {
      res.writeHead(500).end('Error');
    });
  } catch (e) {
    res.writeHead(500).end('Error');
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`[${Date.now()}] ✓ Listening on port ${port}`);
});

// Load Next.js asynchronously - CRITICAL for immediate response
process.nextTick(async () => {
  try {
    const start = Date.now();
    console.log(`[${Date.now()}] Loading Next.js...`);
    
    const next = require('next');
    const app = next({ dev: false });
    
    console.log(`[${Date.now()}] Preparing...`);
    await app.prepare();
    
    handle = app.getRequestHandler();
    ready = true;
    
    const elapsed = Date.now() - start;
    console.log(`[${Date.now()}] ✓ READY (${elapsed}ms)`);
  } catch (err) {
    console.error(`[${Date.now()}] ✗ FAILED:`, err.message);
    console.error(err.stack);
    process.exit(1);
  }
});



