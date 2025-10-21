#!/usr/bin/env node

/**
 * Azure App Service Entry Point
 * Respond immediately, load Next.js async in background
 */

const http = require('http');
const port = process.env.PORT || 8080;

console.log('[START] Initializing...');

let ready = false;
let nextApp = null;

// Create server that responds immediately
const server = http.createServer((req, res) => {
  if (!ready) {
    // Not ready yet - return 503
    res.writeHead(503, { 'Content-Type': 'text/plain' });
    res.end('Service Starting');
    return;
  }

  // Ready - proxy to Next.js
  try {
    nextApp(req, res);
  } catch (e) {
    console.error('[ERROR]', e.message);
    res.writeHead(500);
    res.end('Error');
  }
});

server.on('error', (err) => {
  console.error('[FATAL]', err.message);
  process.exit(1);
});

// Start listening IMMEDIATELY
server.listen(port, '0.0.0.0', () => {
  console.log(`[LISTENING] Port ${port}`);
});

// Load Next.js in background - does NOT block
setImmediate(async () => {
  try {
    console.log('[NEXT] Loading...');
    const next = require('next');
    
    const app = next({ dev: false });
    const handle = app.getRequestHandler();
    
    console.log('[NEXT] Preparing...');
    await app.prepare();
    
    console.log('[NEXT] Ready!');
    nextApp = handle;
    ready = true;
    
  } catch (err) {
    console.error('[NEXT_ERROR]', err.message);
    console.error(err);
    process.exit(1);
  }
});



