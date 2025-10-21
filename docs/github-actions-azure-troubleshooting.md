# GitHub Actions + Azure Deployment Troubleshooting Guide

This guide addresses common issues encountered when deploying to Azure Web Apps using GitHub Actions workflows.

## Authentication Issues

### Issue: Using Individual Azure Credentials Instead of AZURE_CREDENTIALS

If your workflow is using separate credential components like:

```yaml
- name: Login to Azure
  uses: azure/login@v2
  with:
    client-id: ${{ secrets.AZUREAPPSERVICE_CLIENTID_XXXX }}
    tenant-id: ${{ secrets.AZUREAPPSERVICE_TENANTID_XXXX }}
    subscription-id: ${{ secrets.AZUREAPPSERVICE_SUBSCRIPTIONID_XXXX }}
```

#### Solution 1: Switch to AZURE_CREDENTIALS (Recommended)

1. Create a service principal and save the JSON output:
   ```powershell
   az ad sp create-for-rbac --name "github-deploy-PRYYSM-2" `
     --role contributor `
     --scopes /subscriptions/<your-subscription-id>/resourceGroups/<your-resource-group>/providers/Microsoft.Web/sites/PRYYSM-2 `
     --sdk-auth > azure_credentials.json
   ```

2. Open the JSON file and copy its entire contents
3. Add the contents as a GitHub secret named `AZURE_CREDENTIALS`
4. Update your workflow:

```yaml
- name: Login to Azure
  uses: azure/login@v2
  with:
    creds: ${{ secrets.AZURE_CREDENTIALS }}
```

#### Solution 2: Complete the Individual Credentials

If you must use individual credentials, you need to add the missing `client-secret`:

```yaml
- name: Login to Azure
  uses: azure/login@v2
  with:
    client-id: ${{ secrets.AZUREAPPSERVICE_CLIENTID_XXXX }}
    tenant-id: ${{ secrets.AZUREAPPSERVICE_TENANTID_XXXX }}
    subscription-id: ${{ secrets.AZUREAPPSERVICE_SUBSCRIPTIONID_XXXX }}
    client-secret: ${{ secrets.AZUREAPPSERVICE_CLIENTSECRET_XXXX }}
```

### Issue: JSON Format Errors in AZURE_CREDENTIALS

**Error**: "Error: Not all values are present in creds JSON object"

**Solution**:
1. Regenerate your service principal without modifying the JSON:
   ```powershell
   az ad sp create-for-rbac --name "github-deploy-myapp" `
     --role contributor `
     --scopes /subscriptions/<subscription-id>/resourceGroups/<resource-group>/providers/Microsoft.Web/sites/<app-name> `
     --sdk-auth > azure_credentials.json
   ```
2. Copy the **exact** contents (do not reformat, modify, or escape characters)
3. Add as GitHub secret named `AZURE_CREDENTIALS`

## Build & Deployment Issues

### Issue: Missing Next.js Build Steps

If your workflow deploys raw files without building:

**Solution**: Add proper build steps before deployment:

```yaml
- name: Set up Node.js
  uses: actions/setup-node@v3
  with:
    node-version: '18.x'

- name: Install dependencies
  run: npm ci
    
- name: Build application
  run: npm run build

# For Next.js Azure deployments
- name: Prepare for Azure deployment
  run: |
    # Copy required files
    mkdir -p .next/standalone
    cp -r .next/standalone/* .next/static .next/standalone/
    cp server.js .next/standalone/
```

### Issue: Environment Variables Not Configured

**Solution**: Add environment variable setup:

```yaml
- name: Create production env file
  run: |
    cat > .env.production << EOL
    DATABASE_URL=${{ secrets.DATABASE_URL }}
    NODE_ENV=production
    # Add other environment variables
    EOL
```

## Permissions Issues

### Issue: Service Principal Lacks Required Permissions

**Solution**: 
1. Create a new service principal with the correct scope:
   ```powershell
   az ad sp create-for-rbac --name "github-deploy-myapp" `
     --role contributor `
     --scopes /subscriptions/<subscription-id>/resourceGroups/<resource-group>/providers/Microsoft.Web/sites/<app-name> `
     --sdk-auth > azure_credentials.json
   ```

2. Verify the service principal has sufficient permissions:
   ```powershell
   az role assignment list --assignee <client-id-or-app-id>
   ```

## Complete Example Workflow

Below is a properly configured workflow for deploying a Next.js app to Azure Web App:

```yaml
name: Build and deploy Node.js app to Azure Web App

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18.x'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Create production env file
        run: |
          cat > .env.production << EOL
          DATABASE_URL=${{ secrets.DATABASE_URL }}
          NODE_ENV=production
          # Add other environment variables
          EOL
      
      - name: Build for production
        run: npm run build
        
      - name: Prepare for Azure deployment
        run: |
          # For Next.js standalone output
          cp server.js .next/standalone/
          # Copy static assets
          mkdir -p .next/standalone/.next
          cp -r .next/static .next/standalone/.next/
          # Copy public folder
          cp -r public .next/standalone/
      
      - name: Login to Azure
        uses: azure/login@v2
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}
          
      - name: Deploy to Azure Web App
        uses: azure/webapps-deploy@v2
        with:
          app-name: 'your-app-name'
          slot-name: 'production'
          package: .next/standalone
```

## Additional Resources

- [Official Azure Login Action Documentation](https://github.com/marketplace/actions/azure-login)
- [Official Azure WebApp Deploy Action Documentation](https://github.com/marketplace/actions/azure-webapp)
- [Setting up Next.js for Azure Deployment](https://learn.microsoft.com/en-us/azure/app-service/configure-language-nodejs?pivots=platform-linux#next.js)