#!/usr/bin/env node

/**
 * Ultimate server: 
 * 1. Start HTTP server immediately (responds to health checks)
 * 2. Load Next.js in background
 * 3. Route requests appropriately
 */

const http = require('http');
const url = require('url');
const net = require('net');

const port = parseInt(process.env.PORT, 10) || 8080;
const now = () => new Date().toISOString();

console.log(`[${now()}] Starting ultra-minimal server on port ${port}`);

let nextHandler = null;
let nextLoading = false;
let startTime = Date.now();

// Create HTTP server FIRST - before ANY require() calls
const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  
  // Health checks: respond IMMEDIATELY
  if (pathname === '/health' || pathname === '/_health') {
    const uptime = Math.floor((Date.now() - startTime) / 1000);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'ok', 
      uptime_seconds: uptime,
      next_ready: !!nextHandler 
    }));
    return;
  }

  // If Next.js loaded, proxy to it
  if (nextHandler) {
    try {
      nextHandler(req, res);
    } catch (err) {
      console.error(`[${now()}] Error:`, err.message);
      if (!res.headersSent) {
        res.writeHead(500);
        res.end('Error');
      }
    }
    return;
  }

  // First real request (not health check) - load Next.js
  if (!nextLoading) {
    console.log(`[${now()}] First request at ${pathname} - loading Next.js...`);
    nextLoading = true;
    
    (async () => {
      try {
        const loadStart = Date.now();
        console.log(`[${now()}] Loading Next.js module...`);
        const next = require('next');
        
        const loadTime = Math.floor((Date.now() - loadStart) / 1000);
        console.log(`[${now()}] Next.js module loaded (${loadTime}s)`);
        
        const app = next({ dev: false });
        nextHandler = app.getRequestHandler();
        console.log(`[${now()}] ✓ Next.js ready!`);
      } catch (err) {
        console.error(`[${now()}] ❌ Failed to load Next.js:`, err.message);
        nextLoading = false;
      }
    })();
  }

  // Send immediate loading response
  res.writeHead(200, { 
    'Content-Type': 'text/html; charset=utf-8',
    'Refresh': '2'  // Browser auto-refresh every 2 seconds
  });
  res.end(`<!DOCTYPE html>
<html>
<head><title>Starting</title></head>
<body style="font-family:sans-serif;text-align:center;padding:100px;background:#f0f0f0">
<h1>⏳ Loading Application</h1>
<p>Initializing Next.js server...</p>
<p><small>Page will refresh automatically</small></p>
</body>
</html>`);
});

// Listen immediately
server.listen(port, '0.0.0.0', () => {
  const elapsed = Math.floor((Date.now() - startTime));
  console.log(`[${now()}] ✓ Server listening on ${port} (startup: ${elapsed}ms)`);
});

server.on('error', (err) => {
  console.error(`[${now()}] FATAL:`, err.message);
  process.exit(1);
});

// NOW load Next.js asynchronously in background
// This will take 60-100+ seconds but won't block the server
console.log(`[${now()}] Ready for requests. Next.js will load on first request.`);

// DON'T load Next.js immediately - wait for first real request
// This keeps startup time minimal
