#!/usr/bin/env node

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 8080;

process.env.NEXT_TELEMETRY_DISABLED = '1';
process.env.NODE_ENV = 'production';

console.log(`[${Date.now()}] Starting...`);

let server;

// Try to load from standalone first, fallback to regular build
const isStandalone = fs.existsSync(path.join(__dirname, '.next', 'package.json'));
console.log(`[${Date.now()}] Standalone: ${isStandalone}`);

// Import server directly  - skips app.prepare()
const next = require('next');
const app = next({ dev: false, conf: { isExperimentalCompile: true } });
const handle = app.getRequestHandler();

// This is the key - we DON'T call app.prepare() beforehand
// Just start responding to requests immediately
server = http.createServer(async (req, res) => {
  const { pathname } = url.parse(req.url);
  
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
  console.log(`[${Date.now()}] ✓ Server ready on port ${port}`);
});



