#!/usr/bin/env node

/**
 * ABSOLUTE MINIMAL: NO app.prepare() - use standalone .next directly
 */

const { createServer } = require('http');
const { parse } = require('url');

const port = parseInt(process.env.PORT, 10) || 8080;
const now = () => new Date().toISOString();

console.log(`[${now()}] STARTUP: Port ${port}`);

let handle;

// Load Next.js WITHOUT calling prepare()
try {
  console.log(`[${now()}] LOAD: Requiring next...`);
  const next = require('next');
  const app = next({ dev: false });
  
  console.log(`[${now()}] LOAD: Getting handler...`);
  handle = app.getRequestHandler();
  
  console.log(`[${now()}] LOAD: SUCCESS - Handler ready`);
} catch (err) {
  console.error(`[${now()}] ERROR: Failed to load:`, err.message);
  process.exit(1);
}

// Create and start server IMMEDIATELY
const server = createServer((req, res) => {
  try {
    handle(req, res);
  } catch (err) {
    console.error(`[${now()}] ERR:`, err.message);
    if (!res.headersSent) {
      res.writeHead(500);
      res.end('Error');
    }
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`[${now()}] READY: Listening on ${port}`);
});

server.on('error', (err) => {
  console.error(`[${now()}] FATAL:`, err.message);
  process.exit(1);
});
