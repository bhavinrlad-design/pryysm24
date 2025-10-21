// This file is used by Azure App Service to serve the Next.js application
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');
const fs = require('fs');

// Check if running in development or production mode
const dev = process.env.NODE_ENV !== 'production';

// Determine if running on Azure by checking for specific environment variables
const isAzure = process.env.WEBSITE_SITE_NAME !== undefined;

// Use Azure-specific configuration when running on Azure
const configPath = isAzure && fs.existsSync(path.join(__dirname, 'next.config.azure.js')) 
  ? './next.config.azure.js' 
  : './next.config.js';

// Load the configuration file
const nextConfig = require(configPath);

const app = next({ 
  dev,
  conf: nextConfig
});
const handle = app.getRequestHandler();

// Get port from environment variable or default to 8080
const port = process.env.PORT || 8080;

app.prepare().then(() => {
  createServer((req, res) => {
    // Parse the URL
    const parsedUrl = parse(req.url, true);
    
    // Let Next.js handle the request
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});