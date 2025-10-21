# Azure Deployment Guide

This document provides detailed instructions for deploying the Pryysm V2 application to Microsoft Azure App Service.

## Prerequisites

- Azure account with an active subscription
- GitHub account (for CI/CD deployment)
- Node.js version 20 LTS or higher installed locally
- Azure CLI installed (for manual deployment option)

## Azure Runtime Requirements

This application requires Node.js 20 LTS or 22 LTS on Azure App Service. These versions provide the necessary performance, security updates, and features required by the application:

- **Node.js 20 LTS**: Recommended for most deployments, offering a good balance of stability and modern features
- **Node.js 22 LTS**: Provides the latest features and performance improvements

> **Important**: The application has been optimized and tested with these Node.js versions. Using older versions (such as Node.js 18 LTS or earlier) may result in compatibility issues or reduced performance.

## Deployment Methods

This guide covers three deployment methods:

1. **GitHub Actions** (CI/CD): Recommended for production environments and team workflows
2. **VS Code Azure Extension**: Convenient for developers and testing deployments
3. **Manual Deployment**: For custom deployment scenarios or when automation isn't available

Choose the method that best fits your workflow and requirements.

### Understanding Automatic Deployments

**How updates flow to Azure with each method:**

| Deployment Method | When you push to GitHub | When you make local changes |
|------------------|------------------------|----------------------------|
| **GitHub Actions** | ✅ **Automatic** - Changes automatically deploy to Azure when pushed to the configured branch | ❌ **Manual** - Local changes must be pushed to GitHub first |
| **VS Code Extension** | ❌ **Manual** - Must manually deploy from VS Code after pulling latest changes | ✅ **Manual but Direct** - Can deploy directly from VS Code without pushing to GitHub |
| **Manual Deployment** | ❌ **Manual** - No automatic deployment | ❌ **Manual** - Must manually build and deploy using CLI commands |

> **Note:** If you want automatic updates when you push to GitHub, use the GitHub Actions method. The VS Code extension method requires manual deployment each time, even after pulling the latest changes from GitHub.

**Deployment Flow Comparison:**

```
GitHub Actions Method:
Local Code → GitHub Repository → GitHub Actions → Azure App Service
                                      ↑
                             Automatic on push to main

VS Code Extension Method:
Local Code → Manual VS Code Deploy → Azure App Service
       ↑
   Pull from GitHub
   (separate step)

Manual CLI Method:
Local Code → Manual Build → Manual Azure CLI Deploy → Azure App Service
       ↑
   Pull from GitHub
   (separate step)
```

### Method 1: Continuous Deployment via GitHub Actions (Recommended)

#### Step 1: Set up Azure App Service

1. Log into the [Azure Portal](https://portal.azure.com/)
2. Create a new App Service:
   - Click "Create a resource" > "Web App"
   - Choose your subscription and resource group (create a new one if needed)
   - Enter a name for your web app (this will be part of the URL)
   - Choose "Node 20 LTS" or "Node 22 LTS" for Runtime stack
   - Select Windows or Linux plan (Windows recommended for this setup)
   - Choose an App Service Plan (at least Basic tier recommended for production)
   - Click "Review + create" then "Create"

#### Step 2: Configure Azure Database

1. Create an Azure Database (PostgreSQL or SQL Server):
   - Click "Create a resource" > "Databases" > Choose database type
   - Configure server settings, admin credentials, and networking
   - Note down the connection string

2. Update your database connection string:
   - In the Azure Portal, go to your App Service
   - Navigate to "Settings" > "Configuration" 
   - Add an application setting:
     - Name: `DATABASE_URL` 
     - Value: Your database connection string

#### Step 3: Configure Authentication for GitHub Actions

> **Important Note**: Basic authentication for publish profiles has been disabled in Azure for enhanced security. You'll need to use service principal authentication instead.

1. Create an Azure service principal with contributor access to your App Service:

   ```powershell
   # PowerShell
   $subscriptionId = "<your-subscription-id>"
   $appName = "<your-app-service-name>"
   $resourceGroup = "<your-resource-group>"
   
   # Login to Azure (if not already logged in)
   az login
   
   # Set the subscription context
   az account set --subscription $subscriptionId
   
   # Create a service principal with Contributor role on the App Service and save directly to a file
   # IMPORTANT: Do NOT use ConvertFrom-Json here as it alters the JSON structure
   az ad sp create-for-rbac --name "github-deploy-$appName" `
     --role contributor `
     --scopes /subscriptions/$subscriptionId/resourceGroups/$resourceGroup/providers/Microsoft.Web/sites/$appName `
     --sdk-auth > azure_credentials.json
   
   # View the file content (for verification only - do not share this content)
   Get-Content azure_credentials.json
   ```

   ```bash
   # Bash
   SUBSCRIPTION_ID="<your-subscription-id>"
   APP_NAME="<your-app-service-name>"
   RESOURCE_GROUP="<your-resource-group>"
   
   # Login to Azure (if not already logged in)
   az login
   
   # Set the subscription context
   az account set --subscription $SUBSCRIPTION_ID
   

   # Create a service principal with Contributor role on the App Service and save directly to a file
   az ad sp create-for-rbac --name "github-deploy-$APP_NAME" \
     --role contributor \
     --scopes /subscriptions/$SUBSCRIPTION_ID/resourceGroups/$RESOURCE_GROUP/providers/Microsoft.Web/sites/$APP_NAME \
     --sdk-auth > azure_credentials.json
     
   # View the file content (for verification only - do not share this content)
   cat azure_credentials.json
   ```

2. In your GitHub repository, go to "Settings" > "Secrets and variables" > "Actions"

3. Add the following secrets:
   - `AZURE_CREDENTIALS`: Copy the **ENTIRE** JSON content from azure_credentials.json file
     - **CRITICAL**: The JSON must include all fields (clientId, clientSecret, tenantId, etc.) and maintain the exact format
     - Do not modify, reformat, or pretty-print the JSON as this can break the authentication
   - `AZURE_APP_NAME`: The name of your Azure App Service
   - `AZURE_RESOURCE_GROUP`: Your resource group name
   - `DATABASE_URL`: Your database connection string
   - `NEXT_PUBLIC_API_URL`: Set to `https://<your-app-name>.azurewebsites.net/api`
   - `ADDITIONAL_ENV_VARS`: Any additional environment variables your app needs (optional)
   
4. After setting up the secrets, delete the local credentials file for security:
   ```powershell
   # PowerShell
   Remove-Item azure_credentials.json
   ```
   ```bash
   # Bash
   rm azure_credentials.json
   ```

#### Step 4: Push to Trigger Deployment

1. Push changes to your main branch
2. Go to GitHub Actions tab to monitor the deployment
3. Once completed, visit your app at `https://<your-app-name>.azurewebsites.net`

> **Automatic Deployment:** With this method, GitHub Actions creates a persistent connection between your GitHub repository and Azure. Any pushes to your main branch will automatically trigger a new build and deployment without any manual intervention.

### Method 2: Deployment using VS Code Azure Extension

The VS Code Azure extension provides a convenient and user-friendly way to deploy your application directly from your development environment.

> **Important**: Unlike GitHub Actions, deploying with VS Code is a manual process. When you push changes to GitHub, you'll need to manually deploy again using VS Code. This method doesn't create an automatic connection between your GitHub repository and Azure.

#### Step 1: Install Azure Tools Extension

1. Open VS Code
2. Go to the Extensions view (Ctrl+Shift+X)
3. Search for "Azure Tools" or "Azure App Service"
4. Install the "Azure Tools" extension pack (or the individual "Azure App Service" extension)
5. Reload VS Code when prompted

#### Step 2: Sign in to Azure

1. Click on the Azure icon in the VS Code activity bar (left sidebar)
2. Click "Sign in to Azure..."
3. Follow the authentication prompts to complete the sign-in process
4. Verify your subscription appears in the Azure view

#### Step 3: Build the Application for Production

1. Create a production environment file:
   ```bash
   cp .env.production.example .env.production
   ```
   
2. Edit `.env.production` with your actual values

3. Build the application for Azure:
   ```bash
   npm run build:azure
   ```

#### Step 4: Deploy to Azure App Service

1. Right-click on the `.next/standalone` folder in the VS Code Explorer
2. Select "Deploy to Web App..."
3. Select your Azure subscription if prompted
4. Choose an existing App Service or create a new one:
   - To create a new one, click "+ Create new Web App"
   - Enter a globally unique name
   - Select Node 20 LTS or 22 LTS as the runtime
   - Choose your desired region
   - Select an appropriate App Service Plan
   
5. Wait for the deployment to complete
6. When prompted, click "Browse Website" to view your deployed application

#### Step 5: Configure Environment Variables

1. In the VS Code Azure view, expand your subscription and find your App Service
2. Right-click on it and select "Application Settings"
3. Add all required environment variables:
   - DATABASE_URL
   - NODE_ENV (set to "production")
   - PORT (set to "8080")
   - Any other required variables
4. Click "OK" to save the settings
5. Restart your App Service when prompted

#### When to Use This Method vs. GitHub Actions

**Use VS Code deployment when:**
- You're developing and want to quickly test changes in Azure
- You need to make a one-time deployment without setting up CI/CD
- You're working on a feature branch that isn't connected to CI/CD
- You need to deploy an urgent fix without waiting for the CI/CD pipeline

**Use GitHub Actions instead when:**
- You want changes to automatically deploy when pushed to GitHub
- You're working with a team that needs consistent deployment processes
- You need the build and deployment logs for audit purposes
- You want to run tests and other checks before deploying

### Method 3: Manual Deployment

#### Step 1: Build the Application

1. Create a production environment file:
   ```bash
   cp .env.production.example .env.production
   ```

2. Edit `.env.production` with your actual values

3. Build for production:
   ```bash
   npm run build:azure
   ```

#### Step 2: Deploy to Azure

Using Azure CLI:

```bash
# Log in to Azure
az login

# Deploy the application
az webapp up --name <app-name> --resource-group <resource-group> --runtime "NODE|20-lts" --sku B1

# Or using a zip file
zip -r app.zip .next/standalone
az webapp deployment source config-zip --resource-group <resource-group> --name <app-name> --src app.zip
```

## Environment Variables

### Required Variables

- `DATABASE_URL`: Connection string to your Azure database
- `NODE_ENV`: Set to `production`
- `NEXT_PUBLIC_API_URL`: The public API URL (https://<your-app-name>.azurewebsites.net/api)
- `PORT`: Set to `8080` (Azure default)

### Optional Variables

Add any other environment variables your application needs.

## Troubleshooting

### Common Issues

1. **Database connection errors**
   - Verify your database connection string is correct
   - Ensure your App Service has network access to your database

2. **GitHub Actions Authentication Failures**
   - **Error**: "Login failed with Error: Using auth-type: SERVICE_PRINCIPAL. Not all values are present."
     - Solution: Ensure the AZURE_CREDENTIALS secret contains the complete JSON output without any modifications
     - Common mistake: Converting or reformatting the JSON which breaks the structure needed by Azure login
   
   - **Fix for credential issues**:
     1. Delete your current AZURE_CREDENTIALS secret
     2. Regenerate service principal without converting from JSON:
        ```powershell
        az ad sp create-for-rbac --name "github-deploy-$appName" `
          --role contributor `
          --scopes /subscriptions/$subscriptionId/resourceGroups/$resourceGroup/providers/Microsoft.Web/sites/$appName `
          --sdk-auth > azure_credentials.json
        ```
     3. Copy the **exact** contents of the file (do not modify it)
     4. Add as GitHub secret named AZURE_CREDENTIALS
   
   - **Workflow using individual credential components instead of AZURE_CREDENTIALS**:
     If your workflow is using separate credential components like this:
     ```yaml
     - name: Login to Azure
       uses: azure/login@v2
       with:
         client-id: ${{ secrets.AZUREAPPSERVICE_CLIENTID_XXXX }}
         tenant-id: ${{ secrets.AZUREAPPSERVICE_TENANTID_XXXX }}
         subscription-id: ${{ secrets.AZUREAPPSERVICE_SUBSCRIPTIONID_XXXX }}
     ```
     You have two options:
     1. **Option 1 (Recommended)**: Change to using the consolidated AZURE_CREDENTIALS approach:
        ```yaml
        - name: Login to Azure
          uses: azure/login@v2 
          with:
            creds: ${{ secrets.AZURE_CREDENTIALS }}
        ```
     2. **Option 2**: If you must use the individual credential components, ensure all three secrets exist and contain the correct values (client-id, tenant-id, and subscription-id) from your service principal.
     
   - **Verify service principal permissions**:
     ```powershell
     $spObjectId = (az ad sp list --display-name "github-deploy-$appName" --query "[0].id" -o tsv)
     az role assignment list --assignee $spObjectId --all
     ```

3. **Other Deployment failures**
   - Check GitHub Actions logs for specific error messages
   - Verify all required secrets are properly configured

3. **Blank page or 500 errors**
   - Check App Service logs in Azure Portal > App Service > "Logs" > "Log stream"
   - Look for specific error messages in the log stream

4. **VS Code Azure Extension Issues**
   - **Authentication errors**: 
     - Try signing out and signing in again to the Azure extension
     - Check your Azure CLI authentication with `az account show`
     - Verify you have the appropriate permissions in Azure
   
   - **Deployment failures**:
     - Ensure you're deploying the `.next/standalone` folder (not the entire project)
     - Check the "Output" panel in VS Code for detailed deployment logs
     - Verify your App Service is configured for Node.js 20 LTS or higher
   
   - **Application settings not applying**:
     - Try restarting the App Service after changing settings
     - Verify settings through the Azure Portal to confirm they were saved
     - Check for naming conflicts in application settings

5. **Static assets not loading**
   - Make sure public files are correctly copied to the `.next/standalone/public` directory

## Monitoring and Scaling

### Application Insights

For better monitoring, add Azure Application Insights:

1. Create an Application Insights resource in Azure
2. Add the connection string to your environment variables
3. Update your code to use the Application Insights SDK

### Scaling Options

To handle increased traffic:

1. Go to your App Service in the Azure Portal
2. Navigate to "Scale up (App Service plan)"
3. Select a higher pricing tier
4. Or use "Scale out" to add more instances

## Security Considerations

1. Enable HTTPS only
2. Set up authentication if required
3. Ensure database connection strings and other secrets are stored as environment variables
4. Consider using Azure Key Vault for sensitive information

## Related Documentation

For more detailed information specific to Next.js on Azure, please refer to:

- [Next.js on Azure - Advanced Configuration](./nextjs-azure-advanced.md)
- [Next.js on Azure - Troubleshooting Guide](./nextjs-azure-troubleshooting.md)
- [Azure Deployment Quick Reference](./azure-quick-reference.md)
- [Azure Deployment Checklist](./azure-deployment-checklist.md)

## Additional Resources

- [Azure App Service Documentation](https://docs.microsoft.com/en-us/azure/app-service/)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Managing Environment Variables in Azure](https://docs.microsoft.com/en-us/azure/app-service/configure-common)
- [Azure Monitor and Application Insights](https://docs.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview)