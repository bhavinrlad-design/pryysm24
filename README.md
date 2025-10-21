# Pryysm v2 - 3D Print Management

A starter Next.js app scaffold for managing 3D prints, printers, and materials.

## Azure Deployment

This application is configured for deployment to Microsoft Azure App Service using **OpenID Connect (OIDC)** - Microsoft's recommended authentication method.

### ⚠️ Current Status: Secrets Not Yet Configured

The workflow is failing because the required GitHub secrets are not set up. You have **two options**:

#### Option 1: OpenID Connect (OIDC) - Recommended ✨
More secure, uses the workflow: `.github/workflows/azure-deploy-alternative.yml`

#### Option 2: Service Principal (Legacy) - Quick Setup 🔧
Easier to set up initially, uses the workflow: `.github/workflows/azure-deploy-service-principal.yml`

---

### Option 1: Azure Setup with OpenID Connect (OIDC) - RECOMMENDED

**This method uses OpenID Connect for secure, token-based authentication without storing long-lived credentials.**

#### 1. Create Microsoft Entra Application and Service Principal

Run these commands in Azure CLI:

```bash
# Login to Azure
az login

# Set your subscription if you have multiple
az account set --subscription "Your-Subscription-Name-Or-ID"

# 1. Create the Microsoft Entra application
az ad app create --display-name "GitHub-Actions-Pryysm"
# Copy the 'appId' from the output - you'll use this as AZURE_CLIENT_ID

# 2. Create a service principal (replace $appId with your appId from step 1)
az ad sp create --id $appId
# Copy the 'appOwnerTenantId' from output - you'll use this as AZURE_TENANT_ID

# 3. Get your subscription ID
az account show --query id -o tsv
# Copy this - you'll use it as AZURE_SUBSCRIPTION_ID

# 4. Create role assignment (replace with your actual values)
az role assignment create \
  --role contributor \
  --subscription {YOUR-SUBSCRIPTION-ID} \
  --assignee-object-id {ASSIGNEE-OBJECT-ID-FROM-STEP-2} \
  --scope /subscriptions/{YOUR-SUBSCRIPTION-ID}/resourceGroups/{YOUR-RESOURCE-GROUP}/providers/Microsoft.Web/sites/{YOUR-WEBAPP-NAME} \
  --assignee-principal-type ServicePrincipal

# 5. Create federated credential
# First, create a file called credential.json with this content:
cat > credential.json << EOF
{
    "name": "GitHubActionsCredential",
    "issuer": "https://token.actions.githubusercontent.com",
    "subject": "repo:lad-pryysm/pryysm-v2:ref:refs/heads/new-main",
    "description": "GitHub Actions OIDC for pryysm-v2",
    "audiences": [
        "api://AzureADTokenExchange"
    ]
}
EOF

# Then create the federated credential (replace with your app's object ID)
az ad app federated-credential create --id {APP-OBJECT-ID} --parameters credential.json
```

#### 2. Add GitHub Secrets

Go to your GitHub repository settings: https://github.com/lad-pryysm/pryysm-v2/settings/secrets/actions

Create the following secrets:

| Secret Name | Description | Where to Find |
|------------|-------------|---------------|
| `AZURE_CLIENT_ID` | Application (client) ID | Output from step 1 (appId) |
| `AZURE_TENANT_ID` | Directory (tenant) ID | Output from step 2 (appOwnerTenantId) |
| `AZURE_SUBSCRIPTION_ID` | Your Azure subscription ID | Output from step 3 |
| `AZURE_APP_NAME` | Your Azure App Service name | Your Azure portal |
| `DATABASE_URL` | PostgreSQL connection string | Your database settings |
| `NEXT_PUBLIC_API_URL` | Public API URL | `https://{AZURE_APP_NAME}.azurewebsites.net` |

#### 3. Deploy

- Push to the `new-main` branch to trigger automatic deployment
- Monitor the deployment in the GitHub Actions tab
- The workflow file used is `.github/workflows/azure-deploy-alternative.yml`

### Why OpenID Connect (OIDC)?

✅ **More Secure**: Uses short-lived tokens instead of long-lived credentials  
✅ **Microsoft Recommended**: Official best practice for GitHub Actions + Azure  
✅ **No Secret Rotation**: Federated credentials don't expire  
✅ **Better Compliance**: Meets modern security standards  
✅ **Works with Basic Auth Disabled**: Compatible with secure Azure configurations  

### Troubleshooting

- **Permissions Error**: Verify the service principal has Contributor role on your App Service
- **Authentication Failed**: Check that federated credential subject matches: `repo:lad-pryysm/pryysm-v2:ref:refs/heads/new-main`
- **Deployment Fails**: Ensure all GitHub secrets are correctly set
- **Build Issues**: Check GitHub Actions logs for specific error messages

---

### Option 2: Service Principal Method (Simpler Setup)

**If OIDC setup is complex, use this simpler method with the legacy service principal.**

#### 1. Create Service Principal

```bash
# Login to Azure
az login

# Set your subscription
az account set --subscription "Your-Subscription-Name-Or-ID"

# Create service principal with credentials formatted for GitHub
az ad sp create-for-rbac \
  --name "GitHub-Actions-Pryysm" \
  --role contributor \
  --scopes /subscriptions/{YOUR-SUBSCRIPTION-ID}/resourceGroups/{YOUR-RESOURCE-GROUP} \
  --sdk-auth
```

Copy the **ENTIRE JSON OUTPUT** from this command.

#### 2. Add GitHub Secrets

Go to: https://github.com/lad-pryysm/pryysm-v2/settings/secrets/actions

| Secret Name | Description |
|------------|-------------|
| `AZURE_CREDENTIALS` | The entire JSON output from step 1 |
| `AZURE_APP_NAME` | Your Azure App Service name |
| `AZURE_RESOURCE_GROUP` | Your Azure Resource Group name |
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXT_PUBLIC_API_URL` | `https://{AZURE_APP_NAME}.azurewebsites.net` |

#### 3. Enable the Workflow

The service principal workflow is at `.github/workflows/azure-deploy-service-principal.yml` and is set to manual trigger only. To use it:

1. Go to GitHub Actions tab
2. Select "Deploy to Azure (Service Principal - Legacy)"
3. Click "Run workflow"

Or change the workflow to auto-deploy on push by changing:
```yaml
on:
  workflow_dispatch:  # Only manual trigger
```
to:
```yaml
on:
  push:
    branches:
      - new-main
  workflow_dispatch:
```

---

### Alternative: Service Principal Method (Advanced)

If you need to use service principal authentication for advanced scenarios: Azure Credentials Setup with Service Principal

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
