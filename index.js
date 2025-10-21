#!/usr/bin/env node

/**
 * Minimal Next.js server for Azure App Service
 * This avoids any database initialization on startup
 */

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT || '8080', 10);
const hostname = '0.0.0.0';

console.log(`[STARTUP] Initializing Next.js server (${dev ? 'dev' : 'prod'})`);

const app = next({ dev, conf: {} });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    createServer((req, res) => {
      // Health check endpoint
      if (req.url === '/_health' || req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'healthy', timestamp: new Date().toISOString() }));
        return;
      }

      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl).catch(err => {
        console.error('[ERROR]', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
      });
    }).listen(port, hostname, (err) => {
      if (err) {
        console.error('[ERROR] Failed to start server:', err);
        process.exit(1);
      }
      console.log(`[SUCCESS] Server listening on ${hostname}:${port}`);
    });
  })
  .catch(err => {
    console.error('[ERROR] Failed to prepare app:', err);
    process.exit(1);
  });


