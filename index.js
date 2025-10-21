#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const port = process.env.PORT || 8080;

const logfile = '/tmp/startup.log';
function log(msg) {
  const line = `[${Date.now()}] ${msg}\n`;
  console.log(line);
  try { fs.appendFileSync(logfile, line); } catch(e) {}
}

log('Starting server...');

let ready = false;
let handler = null;

const server = http.createServer((req, res) => {
  log(`Request: ${req.method} ${req.url} - ready: ${ready}`);
  
  if (!ready) {
    res.writeHead(503);
    res.end('Starting');
    return;
  }
  
  if (!handler) {
    res.writeHead(500);
    res.end('No handler');
    return;
  }
  
  try {
    handler(req, res).catch(err => {
      log(`Handler error: ${err.message}`);
      res.writeHead(500);
      res.end('Error');
    });
  } catch (err) {
    log(`Exception: ${err.message}`);
    res.writeHead(500);
    res.end('Exception');
  }
});

server.listen(port, '0.0.0.0', () => {
  log(`LISTENING on port ${port}`);
});

server.on('error', (err) => {
  log(`Server error: ${err.message}`);
  process.exit(1);
});

log('Starting Next.js initialization...');
const start = Date.now();

setImmediate(async () => {
  try {
    log('Loading next module...');
    const next = require('next');
    
    log('Creating next app...');
    const app = next({ dev: false });
    
    log('Preparing next app...');
    await app.prepare();
    
    log(`Next.js ready in ${Date.now() - start}ms`);
    
    handler = app.getRequestHandler();
    ready = true;
    
    log('READY!');
  } catch (err) {
    log(`ERROR: ${err.message}`);
    log(`Stack: ${err.stack}`);
    process.exit(1);
  }
});



