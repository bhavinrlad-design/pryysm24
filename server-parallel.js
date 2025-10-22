#!/usr/bin/env node

/**
 * Parallel server:
 * 1. Start HTTP server immediately
 * 2. Load Next.js in BACKGROUND while server is listening
 * 3. Route requests appropriately
 */

const http = require('http');
const url = require('url');

const port = parseInt(process.env.PORT, 10) || 8080;
const now = () => new Date().toISOString();

console.log(`[${now()}] Starting parallel-load server on port ${port}`);

let nextHandler = null;
let nextReadyPromise = null;
let startTime = Date.now();

// Create HTTP server FIRST
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

  // If Next.js loaded, proxy to it immediately
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

  // Next.js still loading - wait for it (with timeout)
  if (nextReadyPromise) {
    nextReadyPromise.then(() => {
      // Now handle the request
      if (nextHandler) {
        try {
          nextHandler(req, res);
        } catch (err) {
          console.error(`[${now()}] Error after load:`, err.message);
          if (!res.headersSent) {
            res.writeHead(500);
            res.end('Error');
          }
        }
      } else {
        if (!res.headersSent) {
          res.writeHead(503);
          res.end('Service Unavailable');
        }
      }
    }).catch(() => {
      if (!res.headersSent) {
        res.writeHead(503);
        res.end('Service Unavailable - Init Failed');
      }
    });
    return;
  }

  // Fallback
  res.writeHead(503);
  res.end('Service Unavailable');
});

// Listen immediately (THIS HAPPENS BEFORE NEXT.JS LOADS)
server.listen(port, '0.0.0.0', () => {
  const elapsed = Math.floor((Date.now() - startTime));
  console.log(`[${now()}] ✓ Server listening on ${port} (startup: ${elapsed}ms)`);
  console.log(`[${now()}] Starting Next.js initialization in background...`);
  
  // NOW load Next.js in background
  nextReadyPromise = (async () => {
    try {
      const loadStart = Date.now();
      console.log(`[${now()}] [BACKGROUND] Loading Next.js module...`);
      const next = require('next');
      
      const loadTime = Math.floor((Date.now() - loadStart) / 1000);
      console.log(`[${now()}] [BACKGROUND] Next.js module loaded (${loadTime}s)`);
      
      const app = next({ dev: false });
      const loadTime2 = Math.floor((Date.now() - loadStart) / 1000);
      console.log(`[${now()}] [BACKGROUND] Next.js app initialized (${loadTime2}s total)`);
      
      nextHandler = app.getRequestHandler();
      console.log(`[${now()}] ✓ [BACKGROUND] Next.js ready! Ready to handle requests.`);
    } catch (err) {
      console.error(`[${now()}] ❌ [BACKGROUND] Failed to load Next.js:`, err.message);
      console.error(err.stack);
    }
  })();
});

server.on('error', (err) => {
  console.error(`[${now()}] FATAL:`, err.message);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error(`[${now()}] Uncaught Exception:`, err.message);
  console.error(err.stack);
});

console.log(`[${now()}] Server initialized, waiting for connections...`);
