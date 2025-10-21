# Pryysm v2 - 3D Print Management

A starter Next.js app scaffold for managing 3D prints, printers, and materials.

## Azure Deployment

This application is configured for deployment to Microsoft Azure App Service.

### Azure Credentials Setup with OIDC (Recommended)

For GitHub Actions to deploy to Azure securely using OpenID Connect (OIDC), follow these steps:

1. **Set up Azure App Registration and Federated Credentials**:

   ```bash
   # Login to Azure (do this once)
   az login
   
   # Set your subscription if you have multiple
   az account set --subscription "Your-Subscription-Name-Or-ID"
   
   # Create an App Registration for GitHub Actions
   az ad app create --display-name "GitHub-Actions-OIDC"
   
   # Get the Application (client) ID
   clientId=$(az ad app list --display-name "GitHub-Actions-OIDC" --query "[0].appId" -o tsv)
   echo "Client ID: $clientId"
   
   # Create a service principal for the application
   az ad sp create --id $clientId
   
   # Get your subscription ID
   subscriptionId=$(az account show --query id -o tsv)
   echo "Subscription ID: $subscriptionId"
   
   # Get your tenant ID
   tenantId=$(az account show --query tenantId -o tsv)
   echo "Tenant ID: $tenantId"
   
   # Assign contributor role to the service principal for your resource group
   az role assignment create \
     --role contributor \
     --assignee $clientId \
     --scope /subscriptions/$subscriptionId/resourceGroups/{YOUR-RESOURCE-GROUP}
   ```

2. **Configure Federated Credentials**:

   * Go to the Azure Portal → Azure Active Directory → App Registrations
   * Find and select your "GitHub-Actions-OIDC" app
   * Go to "Certificates & secrets" → "Federated credentials"
   * Create a new federated credential with these settings:
     - Federated credential scenario: GitHub Actions deploying Azure resources
     - Organization: `lad-pryysm`
     - Repository: `pryysm-v2`
     - Entity type: `Branch`
     - GitHub branch: `new-main`
     - Name: `github-actions-oidc`

3. **Add Required GitHub Secrets**:
   - `AZURE_CLIENT_ID`: The Application (client) ID you got from above
   - `AZURE_TENANT_ID`: Your Azure AD tenant ID from above
   - `AZURE_SUBSCRIPTION_ID`: Your Azure subscription ID from above
   - `AZURE_APP_NAME`: Your Azure App Service name
   - `DATABASE_URL`: Your database connection string
   - `NEXT_PUBLIC_API_URL`: Your app's public API endpoint

This OIDC approach is more secure because it doesn't require storing any secrets in GitHub.

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

1. **OIDC Authentication Errors**:
   - Verify the federated credential is configured correctly in Azure AD
   - Ensure GitHub repository name, branch name, and organization are exact matches
   - Check that `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_SUBSCRIPTION_ID` are correctly set
   - Make sure the service principal has contributor access to your resource group

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
