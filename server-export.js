#!/usr/bin/env node

/**
 * Pure static file server for exported Next.js app
 * NO Next.js server required - just serves static HTML/JS/CSS
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const zlib = require('zlib');

const port = parseInt(process.env.PORT, 10) || 8080;
const now = () => new Date().toISOString();

console.log(`[${now()}] STATIC: Starting pure static server on port ${port}`);

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  
  // Health checks
  if (pathname === '/health' || pathname === '/_health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', time: new Date().toISOString() }));
    return;
  }

  // Serve static files
  let filePath = path.join(__dirname, 'out', pathname);
  
  // If path is directory, try index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }
  
  // If no extension, try .html
  if (!path.extname(filePath)) {
    if (fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    } else {
      filePath = path.join(filePath, 'index.html');
    }
  }

  // Security check
  const realPath = fs.realpathSync(path.join(__dirname, 'out'));
  const requestPath = fs.realpathSync.native(filePath);
  
  if (!requestPath.startsWith(realPath)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end('Not Found');
    return;
  }

  // Serve the file
  try {
    const content = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    
    const contentTypes = {
      '.html': 'text/html; charset=utf-8',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon',
      '.woff': 'font/woff',
      '.woff2': 'font/woff2',
      '.ttf': 'font/ttf',
    };
    
    const contentType = contentTypes[ext] || 'application/octet-stream';
    
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000'
    });
    res.end(content);
  } catch (err) {
    console.error(`[${now()}] Error serving ${pathname}:`, err.message);
    res.writeHead(500);
    res.end('Error');
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`[${now()}] ✓ Static server listening on port ${port}`);
  console.log(`[${now()}] Serving files from: ${path.join(__dirname, 'out')}`);
});

server.on('error', (err) => {
  console.error(`[${now()}] FATAL:`, err.message);
  process.exit(1);
});
