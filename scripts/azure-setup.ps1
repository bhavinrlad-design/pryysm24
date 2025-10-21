# Azure Resource Creation Script (PowerShell)
# This script helps create Azure resources needed for Pryysm V2 deployment

# Prerequisites:
# - Azure CLI installed (https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
# - Logged in to Azure CLI (az login)
# - PowerShell environment

# Variables - customize these
$RESOURCE_GROUP = "pryysm-resources"
$LOCATION = "eastus"
$APP_NAME = "pryysm-app"
$APP_SERVICE_PLAN = "pryysm-plan"
$DB_SERVER = "pryysm-db-server"
$DB_NAME = "pryysm-db"
$DB_ADMIN = "pryysmadmin"
$DB_PASSWORD = "YourStrongPassword123!"  # Change this!

# Create Resource Group
Write-Host "Creating Resource Group..." -ForegroundColor Green
az group create --name $RESOURCE_GROUP --location $LOCATION

# Create App Service Plan
Write-Host "Creating App Service Plan..." -ForegroundColor Green
az appservice plan create --name $APP_SERVICE_PLAN --resource-group $RESOURCE_GROUP --sku B1

# Create Web App
Write-Host "Creating Web App..." -ForegroundColor Green
az webapp create --name $APP_NAME --resource-group $RESOURCE_GROUP --plan $APP_SERVICE_PLAN --runtime "NODE|18-lts"

# Create PostgreSQL Database Server
Write-Host "Creating PostgreSQL Database Server..." -ForegroundColor Green
az postgres server create `
    --name $DB_SERVER `
    --resource-group $RESOURCE_GROUP `
    --location $LOCATION `
    --admin-user $DB_ADMIN `
    --admin-password $DB_PASSWORD `
    --sku-name B_Gen5_1 `
    --version 12

# Create Database
Write-Host "Creating Database..." -ForegroundColor Green
az postgres db create --name $DB_NAME --server-name $DB_SERVER --resource-group $RESOURCE_GROUP

# Allow Web App to access PostgreSQL
Write-Host "Configuring Firewall Rules..." -ForegroundColor Green
az postgres server firewall-rule create `
    --name AllowAllAzureIPs `
    --server-name $DB_SERVER `
    --resource-group $RESOURCE_GROUP `
    --start-ip-address 0.0.0.0 `
    --end-ip-address 255.255.255.255

# Set environment variables in Web App
Write-Host "Setting Environment Variables..." -ForegroundColor Green
$CONNECTION_STRING = "postgres://$DB_ADMIN:$DB_PASSWORD@$DB_SERVER.postgres.database.azure.com:5432/$DB_NAME?sslmode=require"
az webapp config appsettings set `
    --name $APP_NAME `
    --resource-group $RESOURCE_GROUP `
    --settings `
        DATABASE_URL="$CONNECTION_STRING" `
        NODE_ENV=production `
        NEXT_PUBLIC_API_URL="https://$APP_NAME.azurewebsites.net/api" `
        PORT=8080

Write-Host "Azure resources created successfully!" -ForegroundColor Green
Write-Host "Your Web App URL: https://$APP_NAME.azurewebsites.net"
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Download your publish profile for GitHub Actions:" -ForegroundColor Yellow
Write-Host "   az webapp deployment list-publishing-profiles --name $APP_NAME --resource-group $RESOURCE_GROUP --xml" -ForegroundColor Gray
Write-Host "2. Add secrets to your GitHub repository" -ForegroundColor Yellow
Write-Host "3. Push your code to trigger deployment" -ForegroundColor Yellow