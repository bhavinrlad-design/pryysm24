// Simple diagnostic server for Azure App Service
const http = require('http');

// Immediate logging
console.log('\n========================================');
console.log('[STARTUP] Diagnostic server initializing');
console.log('[STARTUP] Timestamp:', new Date().toISOString());
console.log('[STARTUP] Node.js version:', process.version);
console.log('[STARTUP] Working directory:', process.cwd());
console.log('[STARTUP] Process ID:', process.pid);
console.log('========================================\n');

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

console.log('\n[LISTEN] Attempting to bind to port:', port);
console.log('[LISTEN] Creating HTTP server...\n');

server.listen(port, () => {
  console.log('========================================');
  console.log('[SUCCESS] Server is now running!');
  console.log('[SUCCESS] Listening on port:', port);
  console.log('[SUCCESS] Process ID:', process.pid);
  console.log('[SUCCESS] Started at:', new Date().toISOString());
  console.log('========================================');
  console.log('[READY] Server ready to accept connections\n');
});

server.on('error', (error) => {
  console.error('\n========================================');
  console.error('[ERROR] Server error occurred:');
  console.error(error);
  console.error('========================================\n');
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('\n========================================');
  console.error('[FATAL] Uncaught exception:');
  console.error(error);
  console.error('========================================\n');
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('\n========================================');
  console.error('[FATAL] Unhandled rejection:');
  console.error(reason);
  console.error('========================================\n');
  process.exit(1);
});

console.log('[INIT] Event handlers registered');