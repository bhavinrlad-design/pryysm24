#!/usr/bin/env node

/**
 * MINIMAL health-check server for Azure App Service
 * Starts immediately while Next.js loads in the background
 */

const http = require('http');
const port = parseInt(process.env.PORT || '8080', 10);

let appReady = false;
let nextApp = null;

// Create immediate health-check server
const server = http.createServer((req, res) => {
  // Health checks should always respond
  if (req.url === '/_health' || req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', ready: appReady }));
    return;
  }

  // If app isn't ready, return 503
  if (!appReady) {
    res.writeHead(503, { 'Content-Type': 'text/plain' });
    res.end('Service Starting...');
    return;
  }

  // Otherwise proxy to Next.js
  if (nextApp && nextApp.handle) {
    nextApp.handle(req, res);
  } else {
    res.writeHead(500);
    res.end('Internal Error');
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`[Server] Listening on port ${port}`);
  
  // Load Next.js in background
  setTimeout(() => initializeNextApp(), 100);
});

async function initializeNextApp() {
  try {
    console.log('[Next.js] Initializing...');
    const next = require('next');
    const { parse } = require('url');
    
    const app = next({ dev: false });
    await app.prepare();
    
    nextApp = {
      handle: async (req, res) => {
        try {
          const parsedUrl = parse(req.url, true);
          return await app.getRequestHandler()(req, res, parsedUrl);
        } catch (err) {
          console.error('[Error]', err);
          res.statusCode = 500;
          res.end('Error');
        }
      }
    };
    
    appReady = true;
    console.log('[Next.js] Ready!');
  } catch (err) {
    console.error('[Next.js Error]', err.message);
    // Keep server running even if Next.js fails
    setTimeout(initializeNextApp, 5000);
  }
}



