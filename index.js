#!/usr/bin/env node

/**
 * Simple Next.js standalone server starter for Azure
 * This is used instead of the complex server.js to ensure compatibility
 */

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');

// Configuration
const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT || '8080', 10);
const hostname = '0.0.0.0';

console.log(`Starting Next.js server in ${dev ? 'development' : 'production'} mode`);
console.log(`Port: ${port}, Hostname: ${hostname}`);

// Create and prepare Next.js app
const app = next({ dev });
const handle = app.getRequestHandler();

// Prepare the app and start the server
app.prepare()
  .then(() => {
    createServer((req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
      } catch (err) {
        console.error('Request handler error:', err);
        res.statusCode = 500;
        res.end('Internal server error');
      }
    }).listen(port, hostname, (err) => {
      if (err) {
        console.error('Server startup error:', err);
        process.exit(1);
      }
      console.log(`✓ Server started on http://${hostname}:${port}`);
    });
  })
  .catch((err) => {
    console.error('App preparation error:', err);
    process.exit(1);
  });
