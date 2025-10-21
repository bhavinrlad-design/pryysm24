# Pryysm v2 - 3D Print Management

A starter Next.js app scaffold for managing 3D prints, printers, and materials.

## Azure Deployment

This application is configured for deployment to Microsoft Azure App Service.

### Azure Credentials Setup (Important)

For GitHub Actions to deploy to Azure, you need to set up the following secrets in your GitHub repository:

1. Go to your GitHub repository settings: https://github.com/lad-pryysm/pryysm-v2/settings/secrets/actions

2. Get your Azure Publish Profile:
   - Go to the Azure Portal: https://portal.azure.com
   - Navigate to your App Service
   - Click on "Get publish profile" in the Overview page
   - This will download a file with XML content

3. Create the following GitHub repository secrets:
   - `AZURE_PUBLISH_PROFILE`: The entire XML content from the downloaded publish profile file
   - `AZURE_APP_NAME`: Your Azure App Service name
   - `DATABASE_URL`: Your database connection string
   - `NEXT_PUBLIC_API_URL`: Your app's public API endpoint

This approach uses the publish profile for authentication, which is simpler and more reliable than service principal authentication.

### Quick Start

1. **Set up Azure resources:**
   - Create an Azure App Service (Node.js 20 LTS or 22 LTS)
   - Set up an Azure Database (PostgreSQL recommended)

2. **Configure GitHub Actions:**
   - Add required secrets to your GitHub repository (see above)

3. **Deploy:**
   - Push to main branch to trigger automatic deployment
   - Monitor deployment in GitHub Actions tab
   - Visit your app at https://<your-app-name>.azurewebsites.net

### Local Testing Before Deployment

```bash
# Install dependencies
npm install

# Test production build locally
npm run build:azure
npm run start:azure
```

### Manual Deployment Option

You can also deploy manually using Azure CLI:

```bash
# Build the application
npm run build:azure

# Deploy to Azure (requires Azure CLI)
az webapp up --name <app-name> --resource-group <resource-group> --runtime "NODE|18-lts"
```

### Environment Variables

Key environment variables for Azure deployment:
- `DATABASE_URL`: Connection string to your Azure database
- `NODE_ENV`: Set to `production`
- `NEXT_PUBLIC_API_URL`: Your app's public API endpoint

For detailed step-by-step instructions, troubleshooting tips, and advanced configuration options, see our [Complete Azure Deployment Guide](./docs/azure-deployment-guide.md).
