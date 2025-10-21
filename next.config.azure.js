/**
 * @file next.config.azure.js
 * @description Next.js configuration specific for Azure deployment
 * 
 * This file extends the base Next.js configuration with Azure-specific settings.
 * It's used when deploying to Azure App Service.
 */

// Import the base Next.js config
const baseConfig = require('./next.config.js');

// Azure-specific configuration
const azureConfig = {
  // Extend the base config
  ...baseConfig,
  
  // Azure App Service uses port 8080 by default
  // This setting is handled in server.js, but we're adding it here for clarity
  serverRuntimeConfig: {
    ...baseConfig.serverRuntimeConfig,
    PORT: process.env.PORT || 8080,
  },
  
  // Public runtime config (available in browser)
  publicRuntimeConfig: {
    ...baseConfig.publicRuntimeConfig,
    // Add any Azure-specific public config here
    isAzureDeployment: true,
  },
  
  // Set output to 'standalone' for better Azure compatibility
  output: 'standalone',
  
  // Experimental features for Azure optimization
  experimental: {
    ...baseConfig.experimental,
    // Enable optimizations for serverless environments (if your Azure plan supports it)
    // serverComponents: true, // Uncomment if using React Server Components
  },
  
  // Add headers for Azure App Service
  async headers() {
    const baseHeaders = baseConfig.headers ? await baseConfig.headers() : [];
    return [
      ...baseHeaders,
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Azure-Deployment',
            value: 'true',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options', 
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

module.exports = azureConfig;