#!/usr/bin/env node

/**
 * CRITICAL FIX: Azure App Service startup handler
 * 1. Start server immediately to respond to Azure health checks
 * 2. Initialize Next.js asynchronously
 * 3. Disable Prisma to prevent connection issues at startup
 */

const http = require('http');
const path = require('path');

const port = parseInt(process.env.PORT || '8080', 10);
const startTime = Date.now();

console.log(`[STARTUP] Beginning server initialization at ${new Date().toISOString()}`);
console.log(`[STARTUP] Port: ${port}`);
console.log(`[STARTUP] Node env: ${process.env.NODE_ENV || 'not set'}`);

let nextApp = null;
let appReady = false;

// MUST respond immediately to Azure health checks
const server = http.createServer((req, res) => {
  const uptime = Math.round((Date.now() - startTime) / 1000);
  
  // Health check endpoints
  if (req.url === '/' || req.url === '/_health' || req.url === '/health' || req.url === '/healthz') {
    res.writeHead(200, { 
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    res.end(JSON.stringify({
      status: 'running',
      ready: appReady,
      uptime_seconds: uptime,
      timestamp: new Date().toISOString()
    }));
    console.log(`[HEALTH] Check responded - ready: ${appReady}, uptime: ${uptime}s`);
    return;
  }

  // Service starting response for non-health endpoints
  if (!appReady) {
    res.writeHead(503, { 'Content-Type': 'text/plain' });
    res.end('Service initializing...');
    return;
  }

  // Proxy to Next.js app
  if (nextApp) {
    try {
      return nextApp.handle(req, res);
    } catch (err) {
      console.error('[ERROR] Request handler:', err.message);
      res.writeHead(500);
      res.end('Internal Server Error');
    }
  }

  res.writeHead(500);
  res.end('App not ready');
});

// Start listening IMMEDIATELY
server.listen(port, '0.0.0.0', () => {
  const elapsed = Math.round(Date.now() - startTime);
  console.log(`[SUCCESS] HTTP server listening on port ${port} (${elapsed}ms)`);
});

server.on('error', (err) => {
  console.error('[FATAL] Server error:', err);
  process.exit(1);
});

// Load Next.js app asynchronously
(async () => {
  try {
    console.log(`[INIT] Loading Next.js application...`);
    const initStart = Date.now();
    
    // Force environment
    process.env.NODE_ENV = 'production';
    
    // Disable Prisma schema validation to prevent connection errors at startup
    process.env.SKIP_ENV_VALIDATION = 'true';
    
    const next = require('next');
    const app = next({ 
      dev: false,
      dir: __dirname,
      customServer: true
    });
    
    console.log(`[INIT] Preparing Next.js...`);
    await app.prepare();
    
    nextApp = app;
    appReady = true;
    
    const initElapsed = Math.round(Date.now() - initStart);
    const totalElapsed = Math.round(Date.now() - startTime);
    console.log(`[SUCCESS] Next.js ready in ${initElapsed}ms (total: ${totalElapsed}ms)`);
    
  } catch (err) {
    console.error('[FATAL] Next.js initialization failed:', err.message);
    console.error(err.stack);
    // Exit after logging
    setTimeout(() => process.exit(1), 1000);
  }
})();



