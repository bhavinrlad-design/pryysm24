#!/usr/bin/env node

/**
 * Production server for Azure App Service
 * Handles Next.js with graceful error handling
 */

const http = require('http');
const url = require('url');

const port = parseInt(process.env.PORT, 10) || 8080;
const now = () => new Date().toISOString();

console.log(`[${now()}] 🚀 Starting Production Server...`);
const startTime = Date.now();

let nextHandler = null;
let serverReady = false;

// Load Next.js asynchronously
const loadNextJs = async () => {
  try {
    console.log(`[${now()}] 📦 Loading Next.js...`);
    const loadStart = Date.now();
    
    const next = require('next');
    const app = next({ dev: false });
    
    nextHandler = app.getRequestHandler();
    serverReady = true;
    
    const elapsed = Math.floor((Date.now() - loadStart) / 1000);
    console.log(`[${now()}] ✅ Next.js loaded successfully (${elapsed}s)`);
    return true;
  } catch (err) {
    console.error(`[${now()}] ❌ Failed to load Next.js:`, err.message);
    console.error(err.stack);
    return false;
  }
};

// Create HTTP server
const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  
  // Health check endpoint
  if (pathname === '/health' || pathname === '/_health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: serverReady ? 'ready' : 'loading',
      uptime: Math.floor((Date.now() - startTime) / 1000),
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // If Next.js not loaded yet, return loading message
  if (!serverReady) {
    res.writeHead(503, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'loading',
      message: 'Application is starting, please wait...'
    }));
    return;
  }

  // Route to Next.js
  try {
    nextHandler(req, res);
  } catch (err) {
    console.error(`[${now()}] 🔴 Error handling request for ${pathname}:`, err.message);
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  }
});

// Start server first
server.listen(port, '0.0.0.0', () => {
  console.log(`[${now()}] 🌐 Server listening on port ${port}`);
  
  // Then load Next.js in background
  loadNextJs().catch(err => {
    console.error(`[${now()}] Fatal error:`, err);
    process.exit(1);
  });
});

server.on('error', (err) => {
  console.error(`[${now()}] 🔴 Server error:`, err.message);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error(`[${now()}] 🔴 Uncaught exception:`, err.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(`[${now()}] 🔴 Unhandled rejection at ${promise}:`, reason);
});
