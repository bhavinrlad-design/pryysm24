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

  // Still loading - return holding page
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<!DOCTYPE html>
<html>
<head><title>Starting</title><meta http-equiv="refresh" content="3"></head>
<body style="font-family:sans-serif;text-align:center;padding:100px">
<h1>⏳ Application Initializing</h1>
<p>Next.js is loading in the background...</p>
<p><small>Auto-refresh in 3 seconds</small></p>
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
console.log(`[${now()}] Starting async Next.js load...`);

setImmediate(async () => {
  try {
    const loadStart = Date.now();
    console.log(`[${now()}] Loading Next.js module...`);
    
    // This is the slow part - but it happens in background
    const next = require('next');
    
    const loadTime = Math.floor((Date.now() - loadStart) / 1000);
    console.log(`[${now()}] Next.js module loaded (${loadTime}s)`);
    
    console.log(`[${now()}] Creating Next.js app...`);
    const app = next({ dev: false });
    
    nextHandler = app.getRequestHandler();
    console.log(`[${now()}] ✓ Next.js ready!`);
    console.log(`[${now()}] Total startup time: ${Math.floor((Date.now() - startTime) / 1000)}s`);
  } catch (err) {
    console.error(`[${now()}] ❌ Failed to load Next.js:`, err.message);
    console.error(err.stack);
    nextLoading = false;
  }
});
