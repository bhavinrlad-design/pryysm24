#!/usr/bin/env node

const http = require('http');
const url = require('url');
const port = process.env.PORT || 8080;

process.env.NEXT_TELEMETRY_DISABLED = '1';
process.env.NODE_ENV = 'production';

console.log(`[${Date.now()}] Starting...`);

let ready = false;
let handle = null;

// Create HTTP server that responds immediately
const server = http.createServer(async (req, res) => {
  if (!ready) {
    res.writeHead(503);
    res.end('Service Starting');
    return;
  }
  
  try {
    await handle(req, res);
  } catch (err) {
    console.error('Error:', err.message);
    if (!res.headersSent) {
      res.writeHead(500);
      res.end('Error');
    }
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`[${Date.now()}] ✓ Listening on port ${port}`);
});

// Initialize Next.js in background - CRITICAL
setImmediate(async () => {
  try {
    console.log(`[${Date.now()}] Initializing Next.js...`);
    const next = require('next');
    const app = next({ dev: false });
    
    console.log(`[${Date.now()}] Preparing...`);
    await app.prepare();
    
    handle = app.getRequestHandler();
    ready = true;
    console.log(`[${Date.now()}] ✓ READY`);
  } catch (err) {
    console.error(`[${Date.now()}] ERROR:`, err.message);
    console.error(err);
    process.exit(1);
  }
});



