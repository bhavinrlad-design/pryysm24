// Environment diagnostic server
const http = require('http');

const server = http.createServer((req, res) => {
  console.log(`[DIAG] Request: ${req.method} ${req.url}`);
  
  res.writeHead(200, { 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  
  const diagnostics = {
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    uptime: process.uptime(),
    pid: process.pid,
    cwd: process.cwd(),
    environment: {
      NODE_ENV: process.env.NODE_ENV || 'NOT_SET',
      PORT: process.env.PORT || 'NOT_SET',
      DATABASE_URL: process.env.DATABASE_URL ? 'CONFIGURED (length: ' + process.env.DATABASE_URL.length + ')' : 'NOT_SET',
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'NOT_SET',
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'CONFIGURED (length: ' + process.env.NEXTAUTH_SECRET.length + ')' : 'NOT_SET',
      WEBSITE_HOSTNAME: process.env.WEBSITE_HOSTNAME || 'NOT_SET',
      AZURE_CLIENT_ID: process.env.AZURE_CLIENT_ID || 'NOT_SET'
    },
    memory: process.memoryUsage(),
    requestDetails: {
      method: req.method,
      url: req.url,
      headers: req.headers
    }
  };
  
  res.end(JSON.stringify(diagnostics, null, 2));
});

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`[DIAG] Environment diagnostic server listening on port ${port}`);
  console.log(`[DIAG] Process ID: ${process.pid}`);
  console.log(`[DIAG] Node version: ${process.version}`);
  console.log(`[DIAG] Working directory: ${process.cwd()}`);
  console.log(`[DIAG] Environment variables count: ${Object.keys(process.env).length}`);
  
  // Log critical env vars
  console.log(`[DIAG] NODE_ENV: ${process.env.NODE_ENV || 'NOT_SET'}`);
  console.log(`[DIAG] DATABASE_URL: ${process.env.DATABASE_URL ? 'CONFIGURED' : 'NOT_SET'}`);
  console.log(`[DIAG] NEXTAUTH_URL: ${process.env.NEXTAUTH_URL || 'NOT_SET'}`);
  console.log(`[DIAG] NEXTAUTH_SECRET: ${process.env.NEXTAUTH_SECRET ? 'CONFIGURED' : 'NOT_SET'}`);
  console.log(`[DIAG] PORT: ${process.env.PORT || 'NOT_SET'}`);
});

server.on('error', (error) => {
  console.error('[DIAG] Server error:', error);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('[DIAG] Uncaught exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('[DIAG] Unhandled rejection at:', promise, 'reason:', reason);
  process.exit(1);
});