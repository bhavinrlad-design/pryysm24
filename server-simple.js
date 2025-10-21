#!/usr/bin/env node

const { createServer } = require('http');
const { parse } = require('url');
const fs = require('fs');
const path = require('path');

const port = parseInt(process.env.PORT, 10) || 8080;
const isDev = process.env.NODE_ENV !== 'production';

console.log(`[${new Date().toISOString()}] Starting Next.js server on port ${port}`);

let nextApp;
let handle;
let ready = false;

const prepareNext = async () => {
  try {
    console.log(`[${new Date().toISOString()}] Loading Next.js...`);
    
    // Import next after ensuring we're in production mode
    process.env.NODE_ENV = 'production';
    const next = require('next');
    
    nextApp = next({ dev: false });
    
    console.log(`[${new Date().toISOString()}] Calling prepare()...`);
    await nextApp.prepare();
    
    handle = nextApp.getRequestHandler();
    ready = true;
    
    console.log(`[${new Date().toISOString()}] Ready!`);
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Error preparing app:`, err);
    process.exit(1);
  }
};

const server = createServer((req, res) => {
  const parsedUrl = parse(req.url, true);
  
  if (!ready) {
    // Service starting response
    res.writeHead(503, { 'Content-Type': 'text/plain' });
    res.end('Service Starting');
    return;
  }
  
  try {
    handle(req, res);
  } catch (err) {
    console.error(`Error handling request:`, err);
    res.writeHead(500);
    res.end('Internal Error');
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`[${new Date().toISOString()}] Server listening on port ${port}`);
});

// Start preparing app in the background
setImmediate(prepareNext);
