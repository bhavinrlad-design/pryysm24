#!/usr/bin/env node

/**
 * Minimal static file server + Next.js fallback
 * Serves .next/standalone files directly without requiring 'next' module
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const zlib = require('zlib');

const port = parseInt(process.env.PORT, 10) || 8080;
const now = () => new Date().toISOString();
const standaloneDir = path.join(__dirname, '.next', 'standalone');

console.log(`[${now()}] STATIC: Starting static file server on port ${port}`);
console.log(`[${now()}] STATIC: Standalone dir: ${standaloneDir}`);

let nextHandler = null;
let loadingNextJs = false;

// Load Next.js in background
function startBackgroundLoad() {
  if (loadingNextJs || nextHandler) return;
  loadingNextJs = true;
  
  console.log(`[${now()}] STATIC: Starting background Next.js load...`);
  setImmediate(async () => {
    try {
      console.log(`[${now()}] STATIC: Requiring next module...`);
      const next = require('next');
      
      console.log(`[${now()}] STATIC: Creating Next.js app...`);
      const app = next({ dev: false });
      
      console.log(`[${now()}] STATIC: Getting handler...`);
      nextHandler = app.getRequestHandler();
      
      console.log(`[${now()}] STATIC: ✓ Next.js ready!`);
    } catch (err) {
      console.error(`[${now()}] STATIC: Error loading Next.js:`, err.message);
      loadingNextJs = false;
    }
  });
}

// Read file with caching
const fileCache = {};
function readFileSync(filePath) {
  if (fileCache[filePath]) {
    return fileCache[filePath];
  }
  const content = fs.readFileSync(filePath);
  fileCache[filePath] = content;
  return content;
}

// Try to serve static file
function tryServeStatic(req, res, reqPath) {
  try {
    // Remove leading slash and query string
    let filePath = reqPath.split('?')[0];
    if (filePath === '/') {
      filePath = '/index.html';
    }
    
    const fullPath = path.join(standaloneDir, 'public', filePath);
    
    // Security: ensure path is within public directory
    if (!fullPath.startsWith(standaloneDir)) {
      return false;
    }
    
    if (fs.existsSync(fullPath)) {
      const content = readFileSync(fullPath);
      
      // Determine content type
      const ext = path.extname(filePath).toLowerCase();
      const contentTypes = {
        '.html': 'text/html; charset=utf-8',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
      };
      
      const contentType = contentTypes[ext] || 'application/octet-stream';
      
      // Gzip if it's text
      if (req.headers['accept-encoding'] && req.headers['accept-encoding'].includes('gzip') && 
          (ext === '.html' || ext === '.css' || ext === '.js')) {
        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Encoding': 'gzip'
        });
        res.end(zlib.gzipSync(content));
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
      
      return true;
    }
  } catch (err) {
    console.error(`[${now()}] STATIC: Error serving ${reqPath}:`, err.message);
  }
  
  return false;
}

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  
  // Health checks
  if (pathname === '/health' || pathname === '/_health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }
  
  // Try to serve static file first
  if (tryServeStatic(req, res, pathname)) {
    return;
  }
  
  // If Next.js loaded, use it
  if (nextHandler) {
    try {
      nextHandler(req, res);
    } catch (err) {
      console.error(`[${now()}] STATIC: Error:`, err.message);
      res.writeHead(500);
      res.end('Error');
    }
    return;
  }
  
  // Otherwise return loading page
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<!DOCTYPE html>
<html>
<head>
  <title>Loading</title>
  <meta http-equiv="refresh" content="2">
</head>
<body style="font-family: sans-serif; text-align: center; padding: 100px;">
  <h1>⏳ Initializing</h1>
  <p>Application is starting up...</p>
  <p><small>Refresh in 2 seconds</small></p>
</body>
</html>`);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`[${now()}] STATIC: ✓ Server listening on port ${port}`);
  startBackgroundLoad();
});

server.on('error', (err) => {
  console.error(`[${now()}] STATIC: FATAL:`, err.message);
  process.exit(1);
});
