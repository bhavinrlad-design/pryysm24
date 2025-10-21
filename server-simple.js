#!/usr/bin/env node

/**
 * Lazy-load Next.js: Start server immediately, load Next.js on first request
 */

const { createServer } = require('http');

const port = parseInt(process.env.PORT, 10) || 8080;
const now = () => new Date().toISOString();

console.log(`[${now()}] STARTUP: Starting server on port ${port}`);

let handle;
let loadingPromise = null;

// Lazy load Next.js on first request
const loadNext = () => {
  if (loadingPromise) return loadingPromise;
  
  console.log(`[${now()}] LOAD: Starting Next.js load...`);
  loadingPromise = (async () => {
    try {
      console.log(`[${now()}] LOAD: Requiring next module...`);
      const next = require('next');
      
      console.log(`[${now()}] LOAD: Creating app...`);
      const app = next({ dev: false });
      
      console.log(`[${now()}] LOAD: Getting handler...`);
      handle = app.getRequestHandler();
      
      console.log(`[${now()}] LOAD: Complete`);
      return true;
    } catch (err) {
      console.error(`[${now()}] ERROR loading Next.js:`, err.message);
      throw err;
    }
  })();
  
  return loadingPromise;
};

const server = createServer(async (req, res) => {
  try {
    // Load Next.js if not already loaded
    if (!handle) {
      await loadNext();
    }
    
    // Handle the request
    if (handle) {
      handle(req, res);
    } else {
      res.writeHead(500);
      res.end('Not ready');
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
