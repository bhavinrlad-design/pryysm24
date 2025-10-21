# Next.js on Azure App Service - Advanced Configuration

This document provides additional configuration options and best practices for deploying Next.js applications to Azure App Service.

## Optimizing Next.js for Azure

### Output Configuration

The `next.config.azure.js` file is configured with `output: 'standalone'` which creates a standalone build that includes all dependencies. This is ideal for Azure App Service deployment.

```javascript
// Example from next.config.azure.js
module.exports = {
  ...baseConfig,
  output: 'standalone',
  // Other Azure-specific settings
}
```

### Custom Server Implementation

Our `server.js` file is specifically configured for Azure App Service:

1. It detects if it's running on Azure using environment variables
2. Uses the correct configuration file (next.config.azure.js vs next.config.js)
3. Listens on the port provided by Azure (process.env.PORT)
4. Properly handles HTTP requests and forwards them to Next.js

## Performance Optimization

### Azure CDN Integration

For improved performance, consider using Azure CDN with your Next.js application:

1. Create an Azure CDN profile in the Azure Portal
2. Add a new endpoint pointing to your App Service URL
3. Configure your custom domain on the CDN endpoint
4. Update your Next.js config to be aware of the CDN:

```javascript
// In next.config.js or next.config.azure.js
module.exports = {
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://your-cdn-endpoint.azureedge.net' : '',
  // other config
}
```

### Image Optimization

Next.js Image Optimization can be resource-intensive. Consider these options:

1. Use Azure Blob Storage with a CDN for image storage and delivery
2. Configure Next.js to use the CDN for images:

```javascript
// In next.config.js or next.config.azure.js
module.exports = {
  images: {
    domains: ['your-cdn-endpoint.azureedge.net', 'your-blob-storage.blob.core.windows.net'],
    // other image config
  }
}
```

## Advanced Azure Monitoring

### Application Insights Integration

For detailed monitoring with Application Insights:

1. Install the SDK:

```bash
npm install @microsoft/applicationinsights-web --save
```

2. Initialize it in your application:

```javascript
// In a file like lib/appInsights.js
import { ApplicationInsights } from '@microsoft/applicationinsights-web'

export const initAppInsights = () => {
  if (process.env.NEXT_PUBLIC_APPINSIGHTS_INSTRUMENTATIONKEY) {
    const appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: process.env.NEXT_PUBLIC_APPINSIGHTS_INSTRUMENTATIONKEY,
        enableAutoRouteTracking: true
      }
    });
    appInsights.loadAppInsights();
    appInsights.trackPageView();
    return appInsights;
  }
  return null;
}
```

3. Add it to your `_app.js` or `layout.tsx`:

```javascript
// In pages/_app.js or app/layout.tsx
import { useEffect } from 'react';
import { initAppInsights } from '../lib/appInsights';

// In your component:
useEffect(() => {
  initAppInsights();
}, []);
```

### Custom Logging

Implement a custom logging solution that works well with Azure:

```javascript
// In lib/logger.js
export const logger = {
  info: (message, properties = {}) => {
    console.log(JSON.stringify({
      level: 'info',
      message,
      ...properties,
      timestamp: new Date().toISOString()
    }));
  },
  error: (message, error = null, properties = {}) => {
    console.error(JSON.stringify({
      level: 'error',
      message,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : null,
      ...properties,
      timestamp: new Date().toISOString()
    }));
  }
};
```

## CI/CD Pipeline Enhancements

### Adding Testing to CI/CD

Enhance your GitHub Actions workflow to include testing:

```yaml
# In .github/workflows/azure-deploy.yml
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      # Checkout and setup steps...
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linting
        run: npm run lint
      
      - name: Run tests
        run: npm run test
      
      # Build and deploy steps...
```

### Deployment Slots

For zero-downtime deployments, use Azure App Service deployment slots:

1. Create a staging slot in the Azure Portal
2. Deploy to the staging slot first
3. Swap slots after validation

```bash
# Deploy to staging slot
az webapp deployment source config-zip --resource-group <resource-group> --name <app-name> --slot staging --src app.zip

# Swap staging to production
az webapp deployment slot swap --resource-group <resource-group> --name <app-name> --slot staging --target-slot production
```

## Troubleshooting Next.js Specific Issues

### SSR/SSG Pages Not Working

If server-rendered or statically generated pages aren't working:

1. Ensure the server.js file correctly forwards all requests to Next.js
2. Check that build output is properly copied to the standalone directory
3. Verify the web.config has correct rewrite rules

### API Routes Not Working

If API routes are failing:

1. Check the route patterns in server.js to ensure they're correctly forwarding to Next.js
2. Verify environment variables needed by API routes are set in Azure Configuration
3. Inspect Azure logs for specific errors

## Advanced Security Configuration

### Web Application Firewall (WAF)

Consider adding Azure Front Door with WAF:

1. Create an Azure Front Door instance
2. Configure WAF policies
3. Point it to your App Service
4. Update environment variables to be aware of the proxy

### Managed Identities for Service Connections

Use managed identities for secure connections to other Azure services:

1. Enable managed identity for your App Service
2. Grant permissions to the identity for the target resources (e.g., Blob Storage, SQL)
3. Use the Azure SDK with DefaultAzureCredential for authentication