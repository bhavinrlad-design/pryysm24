#!/usr/bin/env node

/**
 * Child process that runs Next.js
 * Parent process will proxy requests to this
 */

const http = require('http');
const url = require('url');

const port = parseInt(process.env.PORT, 10) || 9000;
const now = () => new Date().toISOString();

console.log(`[${now()}] CHILD: Loading Next.js...`);

let nextHandler = null;

// Start by loading Next.js - this is what takes time
(async () => {
  try {
    console.log(`[${now()}] CHILD: Requiring 'next' module...`);
    const next = require('next');
    
    console.log(`[${now()}] CHILD: Creating Next.js app...`);
    const app = next({ dev: false, hostname: '0.0.0.0', port });
    
    console.log(`[${now()}] CHILD: Getting request handler...`);
    nextHandler = app.getRequestHandler();
    
    console.log(`[${now()}] CHILD: ✓ Next.js ready!`);
  } catch (err) {
    console.error(`[${now()}] CHILD: FATAL error loading Next.js:`, err.message);
    console.error(err.stack);
    process.exit(1);
  }
})();

// Create minimal HTTP server for child
const server = http.createServer((req, res) => {
  if (!nextHandler) {
    res.writeHead(503);
    res.end('Next.js loading');
    return;
  }

  try {
    nextHandler(req, res);
  } catch (err) {
    console.error(`[${now()}] CHILD: Error handling request:`, err.message);
    res.writeHead(500);
    res.end('Error');
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`[${now()}] CHILD: ✓ Server listening on port ${port}`);
});

server.on('error', (err) => {
  console.error(`[${now()}] CHILD: Server error:`, err.message);
  process.exit(1);
});
