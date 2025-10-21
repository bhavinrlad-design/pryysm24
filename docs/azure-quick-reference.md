# Azure Deployment Quick Reference

## Azure Resources

| Resource | Purpose | Recommended Tier |
|----------|---------|------------------|
| **App Service** | Hosts the Next.js application | Basic B1 (minimum) |
| **PostgreSQL Server** | Database server | Basic Gen 5, 1 vCore |
| **Application Insights** | Monitoring (optional) | - |
| **Azure CDN** | Content delivery (optional) | Standard |

## GitHub Repository Secrets

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `AZURE_APP_NAME` | App Service name | `pryysm-app` |
| `AZURE_PUBLISH_PROFILE` | Downloaded from Azure Portal | *[XML content]* |
| `DATABASE_URL` | Database connection string | `postgresql://user:pw@host:5432/dbname` |
| `NEXT_PUBLIC_API_URL` | App's API URL | `https://pryysm-app.azurewebsites.net/api` |

## Environment Variables in Azure

| Name | Purpose | Value |
|------|---------|-------|
| `NODE_ENV` | Runtime environment | `production` |
| `DATABASE_URL` | Database connection | Connection string |
| `PORT` | Server port | `8080` |
| `NEXT_PUBLIC_API_URL` | Public API URL | Your app's URL + `/api` |

## Key Files

| File | Purpose |
|------|---------|
| `server.js` | Custom server for Azure |
| `next.config.azure.js` | Azure-specific Next.js config |
| `web.config` | IIS configuration file |
| `.github/workflows/azure-deploy.yml` | GitHub Actions workflow |
| `.env.production` | Production environment variables |

## Deployment Commands

| Command | Purpose |
|---------|---------|
| `npm run build:azure` | Build for Azure (using standalone output) |
| `npm run start:azure` | Run production server locally |
| `npm run deploy:azure` | Build and start Azure version |

## Azure CLI Commands

```bash
# Create web app
az webapp create --name <app-name> --resource-group <group> --plan <plan> --runtime "NODE|18-lts"

# Set environment variables
az webapp config appsettings set --name <app-name> --resource-group <group> --settings KEY=VALUE

# Get publish profile
az webapp deployment list-publishing-profiles --name <app-name> --resource-group <group> --xml

# View logs
az webapp log tail --name <app-name> --resource-group <group>
```