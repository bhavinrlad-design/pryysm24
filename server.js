// Simple diagnostic server for Azure App Service
const http = require('http');

console.log('[SERVER] Starting diagnostic server...');
console.log('[SERVER] Node.js version:', process.version);
console.log('[SERVER] Working directory:', process.cwd());
console.log('[SERVER] Environment variables:');
console.log('[SERVER] NODE_ENV:', process.env.NODE_ENV);
console.log('[SERVER] PORT:', process.env.PORT);
console.log('[SERVER] DATABASE_URL configured:', !!process.env.DATABASE_URL);
console.log('[SERVER] NEXTAUTH_URL:', process.env.NEXTAUTH_URL);

const server = http.createServer((req, res) => {
  console.log(`[REQUEST] ${req.method} ${req.url}`);
  
  res.writeHead(200, { 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  
  const diagnostics = {
    status: 'Server is running',
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
      DATABASE_URL: process.env.DATABASE_URL ? 'CONFIGURED' : 'NOT_SET',
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'NOT_SET',
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'CONFIGURED' : 'NOT_SET',
      WEBSITE_HOSTNAME: process.env.WEBSITE_HOSTNAME || 'NOT_SET'
    },
    memory: process.memoryUsage(),
    request: {
      method: req.method,
      url: req.url,
      headers: req.headers
    }
  };
  
  res.end(JSON.stringify(diagnostics, null, 2));
});

// Get port from environment variable or default to 8080
const port = process.env.PORT || 8080;

server.listen(port, (err) => {
  if (err) {
    console.error('[SERVER] Error starting server:', err);
    process.exit(1);
  }
  
  console.log(`[SERVER] Diagnostic server listening on port ${port}`);
  console.log(`[SERVER] Process ID: ${process.pid}`);
  console.log(`[SERVER] Server started successfully at ${new Date().toISOString()}`);
});

server.on('error', (error) => {
  console.error('[SERVER] Server error:', error);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('[SERVER] Uncaught exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('[SERVER] Unhandled rejection:', reason);
  process.exit(1);
});

console.log('[SERVER] Event handlers registered, server setup complete');