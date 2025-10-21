# Pryysm v2 - 3D Print Management

A starter Next.js app scaffold for managing 3D prints, printers, and materials.

## Azure Deployment

This application is configured for deployment to Microsoft Azure App Service.

### Azure Credentials Setup (Important)

For GitHub Actions to deploy to Azure, you need to set up the following secrets in your GitHub repository:

1. Go to your GitHub repository settings: https://github.com/lad-pryysm/pryysm-v2/settings/secrets/actions

2. Add the following individual secrets:

   - `AZURE_CLIENT_ID`: Your Azure AD application/service principal client ID
   - `AZURE_TENANT_ID`: Your Azure AD tenant ID
   - `AZURE_SUBSCRIPTION_ID`: Your Azure subscription ID
   - `AZURE_CLIENT_SECRET`: Your Azure AD application/service principal client secret (NOT the secret ID)
   - `AZURE_APP_NAME`: Your Azure App Service name
   - `AZURE_RESOURCE_GROUP`: Your Azure Resource Group name
   - `DATABASE_URL`: Your database connection string
   - `NEXT_PUBLIC_API_URL`: Your app's public API endpoint

3. To create a service principal with the correct credentials, run the following Azure CLI command:

```bash
az ad sp create-for-rbac --name "pryysm-deploy" --role contributor \
  --scopes /subscriptions/{subscription-id}/resourceGroups/{resource-group}
```

This command will output JSON similar to:

```json
{
  "appId": "YOUR_CLIENT_ID",
  "displayName": "pryysm-deploy",
  "password": "YOUR_CLIENT_SECRET",
  "tenant": "YOUR_TENANT_ID"
}
```

Use these individual values to create the GitHub secrets listed above. You'll also need your Azure subscription ID.

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
