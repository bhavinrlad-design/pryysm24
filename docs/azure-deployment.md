# Azure Deployment Configuration

## Environment Variables in Azure App Service

When deploying to Azure App Service, you need to configure environment variables through the Azure Portal or Azure CLI. Here's how:

### Using Azure Portal

1. Go to the Azure Portal (portal.azure.com)
2. Navigate to your App Service resource
3. Go to "Settings" > "Configuration"
4. Under the "Application settings" tab, click "New application setting"
5. Add each environment variable from your `.env.production` file:

Required environment variables:
- `DATABASE_URL`: Your Azure database connection string
- `NODE_ENV`: Set to "production"
- Other environment variables specific to your application

### Using Azure CLI

You can also set environment variables using the Azure CLI:

```bash
az webapp config appsettings set --name YOUR_APP_NAME --resource-group YOUR_RESOURCE_GROUP --settings DATABASE_URL="your-connection-string" NODE_ENV="production"
```

## Connection Strings

For database connections, it's recommended to use Azure SQL Database or Azure Cosmos DB and set the connection string in the Azure Portal.

## Deployment Slots

For zero-downtime deployments, consider using Azure App Service Deployment Slots:

1. In the Azure Portal, go to your App Service
2. Go to "Deployment slots"
3. Click "Add Slot" and name it (e.g., "staging")
4. Deploy to the staging slot first
5. Test the staging environment
6. Swap slots when ready for production

## Scaling

Configure scaling options in the Azure Portal:
- Go to your App Service
- Navigate to "Scale up (App Service plan)" to change VM size
- Navigate to "Scale out (App Service plan)" to configure auto-scaling rules

## Monitoring

Enable Application Insights for monitoring:
1. Go to your App Service
2. Navigate to "Application Insights"
3. Click "Turn on Application Insights"
4. Follow the setup instructions