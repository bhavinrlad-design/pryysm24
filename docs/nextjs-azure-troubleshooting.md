# Next.js on Azure Troubleshooting Guide

This guide provides solutions to common issues when deploying Next.js applications to Azure App Service.

## Deployment Issues

### Deployment Fails in GitHub Actions

**Problem:** GitHub Actions CI/CD pipeline fails during build or deployment.

**Solution:**
1. Check if Node.js version matches in:
   - GitHub Actions workflow file
   - Azure App Service configuration
   - package.json engines field (if specified)

2. Verify GitHub secrets are correctly set:
   ```
   AZURE_CREDENTIALS
   AZURE_APP_NAME
   AZURE_RESOURCE_GROUP
   ```

3. Ensure your Next.js application builds successfully locally:
   ```bash
   npm run build:azure
   ```

### Authentication Issues with GitHub Actions

**Problem:** Deployment fails with error "Basic authentication is disabled" when trying to use publish profiles.

**Solution:**
1. Azure has disabled basic authentication for publish profiles to enhance security. Instead, use service principal authentication:

   ```powershell
   # PowerShell script to create an Azure service principal for GitHub Actions
   # Replace placeholder values with your actual Azure subscription, resource group, and app name
   $subscriptionId = "<your-subscription-id>"
   $appName = "<your-app-service-name>"
   $resourceGroup = "<your-resource-group>"

   # Login to Azure (if not already logged in)
   Write-Host "Logging into Azure..." -ForegroundColor Cyan
   try {
       az account show | Out-Null
       Write-Host "Already logged in to Azure." -ForegroundColor Green
   } catch {
       Write-Host "Not logged in. Initiating login..." -ForegroundColor Yellow
       az login
   }

   # Set the subscription context
   Write-Host "Setting subscription context to: $subscriptionId" -ForegroundColor Cyan
   az account set --subscription $subscriptionId

   # Verify subscription was set correctly
   $currentSub = (az account show --query id -o tsv)
   if ($currentSub -ne $subscriptionId) {
       Write-Host "Error: Could not set subscription context. Please check subscription ID." -ForegroundColor Red
       exit 1
   }
   Write-Host "Subscription set successfully." -ForegroundColor Green

   # Create a service principal with Contributor role on the App Service
   Write-Host "Creating service principal for GitHub Actions deployment..." -ForegroundColor Cyan
   try {
       $spJson = az ad sp create-for-rbac --name "github-deploy-$appName" `
         --role contributor `
         --scopes /subscriptions/$subscriptionId/resourceGroups/$resourceGroup/providers/Microsoft.Web/sites/$appName `
         --sdk-auth

       $sp = $spJson | ConvertFrom-Json
       
       Write-Host "Service principal created successfully!" -ForegroundColor Green
       
       # Display the service principal credentials in the format needed for GitHub Actions
       Write-Host "`nAdd the following JSON as a GitHub repository secret named 'AZURE_CREDENTIALS':" -ForegroundColor Yellow
       Write-Host "--------------------------------------------------------------------------------" -ForegroundColor DarkGray
       Write-Host $spJson -ForegroundColor White
       Write-Host "--------------------------------------------------------------------------------" -ForegroundColor DarkGray
   } catch {
       Write-Host "Error creating service principal: $_" -ForegroundColor Red
       exit 1
   }
   ```

2. Store the JSON output as a GitHub repository secret:
   - Navigate to your GitHub repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `AZURE_CREDENTIALS`
   - Value: Paste the JSON output from the script
   - Click "Add secret"

3. Update your GitHub Actions workflow to use the service principal credentials:

   ```yaml
   # .github/workflows/azure-deploy.yml
   name: Deploy to Azure

   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       
       steps:
       - uses: actions/checkout@v3
       
       - name: Set up Node.js
         uses: actions/setup-node@v3
         with:
           node-version: '20'  # Use Node.js 20 LTS or 22 LTS
       
       - name: Install dependencies
         run: npm ci
       
       - name: Build
         run: npm run build:azure
       
       - name: Login to Azure with service principal
         uses: azure/login@v1
         with:
           creds: ${{ secrets.AZURE_CREDENTIALS }}
       
       - name: Deploy to Azure
         uses: azure/webapps-deploy@v2
         with:
           app-name: ${{ secrets.AZURE_APP_NAME }}
           # No need for publish-profile when using service principal authentication
           package: ./.next
   ```

4. Ensure your repository has the following GitHub secrets set:
   - `AZURE_CREDENTIALS` - The full JSON output from the service principal creation
   - `AZURE_APP_NAME` - The name of your Azure App Service
   - `AZURE_RESOURCE_GROUP` - The name of your Azure resource group

5. If you run into any permission issues, verify:
   - The service principal has Contributor role on the App Service
   - The secrets in GitHub are correctly set with the exact JSON format
   - Your Azure subscription is active and in good standing

6. Common service principal authentication errors and solutions:

   | Error | Solution |
   |-------|----------|
   | `Could not get access token for Azure...` | The AZURE_CREDENTIALS JSON is malformed or incomplete. Regenerate the service principal. |
   | `Error: The specified service principal name already exists...` | A service principal with that name already exists. Use a different name or delete the existing one. |
   | `Error: Insufficient privileges to complete the operation.` | Your Azure account doesn't have rights to create service principals. Contact your Azure administrator. |
   | `Failed to deploy web package to App Service.` | Verify the service principal has Contributor access to the App Service resource. |

7. To verify the service principal has the correct permissions:
   ```powershell
   # List role assignments for the service principal
   $spObjectId = (az ad sp list --display-name "github-deploy-$appName" --query "[0].id" -o tsv)
   az role assignment list --assignee $spObjectId --all
   ```

For more detailed information on setting up Azure deployments including continuous integration/deployment with GitHub Actions, refer to the [Azure Deployment Guide](./azure-deployment-guide.md).
   
   - name: Deploy to Azure App Service
     uses: azure/webapps-deploy@v2
     with:
       app-name: ${{ secrets.AZURE_APP_NAME }}
       resource-group-name: ${{ secrets.AZURE_RESOURCE_GROUP }}
       package: .next/standalone
   ```

### Files Missing After Deployment

**Problem:** Some files are missing after deployment (e.g., static assets).

**Solution:**
1. Make sure the `azure-deploy.yml` workflow correctly copies all necessary files:
   ```yaml
   - name: Azure Post-Build Tasks
     run: |
       # Copy public assets
       cp -r public .next/standalone/
       # Copy next static folder
       mkdir -p .next/standalone/.next
       cp -r .next/static .next/standalone/.next/
   ```

2. Verify the package with correct structure is being deployed to Azure.

## Runtime Issues

### 'You do not have permission to view this directory or page'

**Problem:** Browser shows IIS error page with permission message.

**Solution:**
1. Ensure `web.config` file is properly set up with correct rewrite rules
2. Verify the `server.js` file exists in the correct location 
3. Check Azure App Service logs for detailed error information
4. Make sure application starts correctly by checking for startup errors

### API Routes Return 404

**Problem:** Next.js API routes return 404 errors when deployed to Azure.

**Solution:**
1. Check that the custom server properly forwards API requests:
   ```javascript
   // In server.js
   const parsedUrl = parse(req.url, true);
   const { pathname } = parsedUrl;
   
   if (pathname.startsWith('/api/')) {
     // Make sure API routes are handled by Next.js
     handle(req, res, parsedUrl);
     return;
   }
   ```

2. Verify API routes are included in the build

### Static Assets Not Loading

**Problem:** CSS, JavaScript, or images are not loading.

**Solution:**
1. Check browser console for specific errors
2. Ensure assets are correctly copied to the standalone directory
3. Verify web.config has proper rewrite rules for static assets
4. Make sure your Next.js configuration uses the correct `assetPrefix` if using a CDN

### Environment Variables Not Working

**Problem:** Environment variables are undefined in the application.

**Solution:**
1. For server-side variables:
   - Check they are correctly set in Azure App Service Configuration
   - Verify they are being accessed correctly in code

2. For client-side variables:
   - Ensure they are prefixed with `NEXT_PUBLIC_`
   - Check they are included in the build

3. Check the format of connection strings and URLs for proper escaping

## Performance Issues

### Slow Initial Page Load

**Problem:** First page load is slow after deployment.

**Solution:**
1. Check if App Service is on a cold start (scale up or set "Always On" to true)
2. Enable Application Insights to identify bottlenecks
3. Consider using Azure CDN for static assets
4. Optimize your Next.js application:
   - Use proper caching strategies
   - Implement code splitting
   - Optimize images

### High Memory Usage

**Problem:** Application uses too much memory and becomes unresponsive.

**Solution:**
1. Scale up App Service plan to a higher tier
2. Look for memory leaks in your application code
3. Optimize API responses and data fetching
4. Consider serverless options like Azure Static Web Apps with API integration

## Database Connection Issues

### Cannot Connect to Azure Database

**Problem:** Application cannot connect to Azure Database.

**Solution:**
1. Verify connection string is correctly formatted
2. Check network security rules allow connections from App Service
3. For Azure SQL/PostgreSQL:
   - Enable "Allow Azure Services" option
   - Configure firewall rules properly
4. Verify database credentials are correct

## Advanced Debugging

### Accessing Production Logs

To access detailed logs in Azure:

```bash
# Stream logs in real-time
az webapp log tail --name <app-name> --resource-group <resource-group>

# Download logs
az webapp log download --name <app-name> --resource-group <resource-group> --log-file app-logs.zip
```

### Debugging Server-Side Code

1. In Azure Portal:
   - Go to App Service > Configuration
   - Add app setting: `NODE_ENV=development`
   - Add app setting: `NODE_OPTIONS=--inspect`
   
2. Set up SSH access to your App Service:
   - Go to App Service > SSH
   - Connect via browser or SSH client

3. Use the Kudu console (available at `https://<your-app>.scm.azurewebsites.net/DebugConsole`) to:
   - Browse the file system
   - Run commands
   - View process details

## Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Azure App Service Node.js Guide](https://docs.microsoft.com/en-us/azure/app-service/configure-language-nodejs)
- [Microsoft Learn: Deploy Node.js Web App to Azure](https://docs.microsoft.com/en-us/learn/modules/host-node-app-service/)
- [Azure Friday: Deploying Next.js to Azure](https://azure.microsoft.com/en-us/resources/videos/)