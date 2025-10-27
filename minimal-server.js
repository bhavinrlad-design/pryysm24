// Ultra-minimal server for testing Azure deployment
const http = require('http');

const server = http.createServer((req, res) => {
  console.log('[SERVER] Request:', req.method, req.url);
  
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  
  if (req.url === '/api/health') {
    res.end('{"status":"ok","server":"minimal"}');
  } else if (req.url === '/api/test') {
    res.end('OK - Minimal server working');
  } else {
    res.end('Hello from minimal Node.js server!');
  }
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`[SERVER] Minimal server listening on port ${port}`);
  console.log(`[SERVER] NODE_ENV: ${process.env.NODE_ENV || 'not-set'}`);
  console.log(`[SERVER] DATABASE_URL: ${process.env.DATABASE_URL ? 'configured' : 'not-set'}`);
});

server.on('error', (error) => {
  console.error('[SERVER] ERROR:', error);
  process.exit(1);
});