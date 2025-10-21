# Pryysm v2 - 3D Print Management

A starter Next.js app scaffold for managing 3D prints, printers, and materials.

## Azure Deployment

This application is configured for deployment to Microsoft Azure App Service.

### Azure Credentials Setup (Important)

For GitHub Actions to deploy to Azure, you need to set up the following secrets in your GitHub repository:

1. Go to your GitHub repository settings: https://github.com/lad-pryysm/pryysm-v2/settings/secrets/actions

2. Create Service Principal for Azure Authentication:

   ```bash
   # Login to Azure (do this once)
   az login
   
   # Set your subscription if you have multiple
   az account set --subscription "Your-Subscription-Name-Or-ID"
   
   # Create the service principal with contributor rights to your resource group
   az ad sp create-for-rbac --name "pryysm-deploy" \
     --role contributor \
     --scopes /subscriptions/{subscription-id}/resourceGroups/{resource-group} \
     --sdk-auth
   ```

   Replace `{subscription-id}` with your Azure Subscription ID and `{resource-group}` with your Azure Resource Group name.

3. This command will output a JSON object. Copy the **entire JSON output** and save it as a GitHub secret named `AZURE_CREDENTIALS`.

4. Create these additional GitHub repository secrets:
   - `AZURE_APP_NAME`: Your Azure App Service name (e.g., "pryysm-web-app")
   - `DATABASE_URL`: Your database connection string
   - `NEXT_PUBLIC_API_URL`: Your app's public API endpoint

> **IMPORTANT**: Make sure the JSON format is preserved exactly when creating the `AZURE_CREDENTIALS` secret. Any extra spaces, line breaks, or formatting changes may cause authentication to fail.

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

### Troubleshooting Azure Deployment

#### Common Issues:

1. **Authentication Errors**:
   - Ensure the `AZURE_CREDENTIALS` secret contains the **exact** JSON output from the `az ad sp create-for-rbac` command
   - Verify there are no extra spaces, line breaks or formatting issues
   - Make sure the service principal has contributor access to your resource group

2. **Deployment Failures**:
   - Check GitHub Actions logs for specific error messages
   - Verify that `AZURE_APP_NAME` exactly matches your Azure App Service name
   - Make sure your Azure subscription is active and has sufficient resources

3. **Build Errors**:
   - Review the build logs for TypeScript errors or missing dependencies
   - Ensure all required environment variables are properly set
   - Try running the build process locally to identify issues

For detailed step-by-step instructions, troubleshooting tips, and advanced configuration options, see our [Complete Azure Deployment Guide](./docs/azure-deployment-guide.md).
