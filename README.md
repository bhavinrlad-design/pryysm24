# Pryysm v2 - 3D Print Management

A starter Next.js app scaffold for managing 3D prints, printers, and materials.

## Azure Deployment

This application is configured for deployment to Microsoft Azure App Service.

### Azure Credentials Setup with Service Principal

For GitHub Actions to deploy to Azure using a service principal, follow these steps:

1. **Create Service Principal and Get Credentials**:

   ```bash
   # Login to Azure (do this once)
   az login
   
   # Set your subscription if you have multiple
   az account set --subscription "Your-Subscription-Name-Or-ID"
   
   # Create a service principal with contributor rights to your resource group
   # AND format the output for GitHub Actions
   az ad sp create-for-rbac --name "GitHub-Actions-Deploy" \
     --role contributor \
     --scopes /subscriptions/{YOUR-SUBSCRIPTION-ID}/resourceGroups/{YOUR-RESOURCE-GROUP} \
     --sdk-auth
   ```

   This command will output a JSON object in the correct format for GitHub Actions:
   ```json
   {
     "clientId": "YOUR_CLIENT_ID",
     "clientSecret": "YOUR_CLIENT_SECRET",
     "subscriptionId": "YOUR_SUBSCRIPTION_ID",
     "tenantId": "YOUR_TENANT_ID",
     "activeDirectoryEndpointUrl": "https://login.microsoftonline.com",
     "resourceManagerEndpointUrl": "https://management.azure.com/",
     "activeDirectoryGraphResourceId": "https://graph.windows.net/",
     "sqlManagementEndpointUrl": "https://management.core.windows.net:8443/",
     "galleryEndpointUrl": "https://gallery.azure.com/",
     "managementEndpointUrl": "https://management.core.windows.net/"
   }
   ```

2. **Add GitHub Secrets**:
   - `AZURE_CREDENTIALS`: The **ENTIRE JSON OUTPUT** from the command above (copy and paste the whole thing)
   - `AZURE_APP_NAME`: Your Azure App Service name
   - `DATABASE_URL`: Your database connection string
   - `NEXT_PUBLIC_API_URL`: Your app's public API endpoint

> **IMPORTANT**: Copy the entire JSON output exactly as shown, preserving all formatting. Any changes to the JSON structure will cause authentication to fail.

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

1. **Service Principal Authentication Errors**:
   - Make sure you used the `--sdk-auth` parameter when creating the service principal
   - Ensure the `AZURE_CREDENTIALS` secret contains the **ENTIRE JSON** output from the `az ad sp create-for-rbac` command
   - If you get "Invalid client secret" errors, try recreating the service principal
   - Verify the JSON format is preserved exactly without any modifications

2. **Deployment Failures**:
   - Check GitHub Actions logs for specific error messages
   - Verify that `AZURE_APP_NAME` exactly matches your Azure App Service name
   - Make sure your Azure subscription is active and has sufficient resources

3. **Build Errors**:
   - Review the build logs for TypeScript errors or missing dependencies
   - Ensure all required environment variables are properly set
   - Try running the build process locally to identify issues

4. **If OIDC Authentication Doesn't Work**:
   - You can try using a publish profile as an alternative:
     1. In Azure Portal, go to your App Service
     2. Download the publish profile (Get Publish Profile button)
     3. Add the content as a GitHub secret named `AZURE_PUBLISH_PROFILE`
     4. Update the workflow file to use publish profile instead of OIDC

For detailed step-by-step instructions, troubleshooting tips, and advanced configuration options, see our [Complete Azure Deployment Guide](./docs/azure-deployment-guide.md).
