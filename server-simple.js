#!/usr/bin/env node

const { createServer } = require('http');
const { parse } = require('url');
const fs = require('fs');
const path = require('path');

const port = parseInt(process.env.PORT, 10) || 8080;
const isDev = process.env.NODE_ENV !== 'production';

const now = () => new Date().toISOString();

console.log(`[${now()}] STARTUP: Starting Next.js server on port ${port}`);
console.log(`[${now()}] STARTUP: Node version: ${process.version}`);
console.log(`[${now()}] STARTUP: CWD: ${process.cwd()}`);
console.log(`[${now()}] STARTUP: .next exists: ${fs.existsSync('.next')}`);

let nextApp;
let handle;
let ready = false;

const prepareNext = async () => {
  try {
    console.log(`[${now()}] PREPARE: Starting app.prepare()`);
    const prepareStart = Date.now();
    
    process.env.NODE_ENV = 'production';
    const next = require('next');
    
    console.log(`[${now()}] PREPARE: Creating next app`);
    nextApp = next({ dev: false });
    
    console.log(`[${now()}] PREPARE: Calling app.prepare()...`);
    const result = await nextApp.prepare();
    
    const prepareTime = Date.now() - prepareStart;
    console.log(`[${now()}] PREPARE: Completed in ${prepareTime}ms, result: ${result}`);
    
    handle = nextApp.getRequestHandler();
    ready = true;
    
    console.log(`[${now()}] READY: App is ready!`);
  } catch (err) {
    console.error(`[${now()}] ERROR: Failed to prepare:`, err.message);
    console.error(err.stack);
    process.exit(1);
  }
};

const server = createServer((req, res) => {
  const parsedUrl = parse(req.url, true);
  const method = req.method;
  const url = req.url;
  
  console.log(`[${now()}] REQUEST: ${method} ${url} - ready: ${ready}`);
  
  if (!ready) {
    res.writeHead(503, { 'Content-Type': 'text/plain' });
    res.end('Service Starting');
    return;
  }
  
  try {
    handle(req, res);
  } catch (err) {
    console.error(`[${now()}] ERROR handling request:`, err.message);
    if (!res.headersSent) {
      res.writeHead(500);
      res.end('Internal Error');
    }
  }
});

server.on('error', (err) => {
  console.error(`[${now()}] SERVER ERROR:`, err.message);
  process.exit(1);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`[${now()}] LISTEN: Server listening on port ${port}`);
});

// Start preparing app immediately
console.log(`[${now()}] SETUP: Scheduling app.prepare()`);
setImmediate(prepareNext);
