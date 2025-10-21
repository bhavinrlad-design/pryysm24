#!/usr/bin/env node

/**
 * Simple Next.js standalone server starter for Azure
 * This is used instead of the complex server.js to ensure compatibility
 */

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Configuration
const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT || '8080', 10);
const hostname = '0.0.0.0';

console.log(`[${new Date().toISOString()}] Starting Next.js server`);
console.log(`[${new Date().toISOString()}] Mode: ${dev ? 'development' : 'production'}`);
console.log(`[${new Date().toISOString()}] Port: ${port}`);

// Create Next.js app
const app = next({ dev });
const handle = app.getRequestHandler();

// Prepare the app - this might take time on first startup
console.log(`[${new Date().toISOString()}] Preparing Next.js app...`);

app.prepare()
  .then(() => {
    createServer((req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
      } catch (err) {
        console.error('[ERROR] Request handler error:', err);
        res.statusCode = 500;
        res.end('Internal server error');
      }
    }).listen(port, hostname, (err) => {
      if (err) {
        console.error('[ERROR] Server startup error:', err);
        process.exit(1);
      }
      console.log(`[${new Date().toISOString()}] ✓ Server ready on http://${hostname}:${port}`);
    });
  })
  .catch((err) => {
    console.error('[ERROR] App preparation failed:', err);
    process.exit(1);
  });

