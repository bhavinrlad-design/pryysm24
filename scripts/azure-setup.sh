# Azure Resource Creation Script
# This script helps create Azure resources needed for Pryysm V2 deployment

# Prerequisites:
# - Azure CLI installed (https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
# - Logged in to Azure CLI (az login)

# Variables - customize these
RESOURCE_GROUP="pryysm-resources"
LOCATION="eastus"
APP_NAME="pryysm-app"
APP_SERVICE_PLAN="pryysm-plan"
DB_SERVER="pryysm-db-server"
DB_NAME="pryysm-db"
DB_ADMIN="pryysmadmin"
DB_PASSWORD="YourStrongPassword123!"  # Change this!

# Create Resource Group
echo "Creating Resource Group..."
az group create --name $RESOURCE_GROUP --location $LOCATION

# Create App Service Plan
echo "Creating App Service Plan..."
az appservice plan create --name $APP_SERVICE_PLAN --resource-group $RESOURCE_GROUP --sku B1 --is-linux

# Create Web App
echo "Creating Web App..."
az webapp create --name $APP_NAME --resource-group $RESOURCE_GROUP --plan $APP_SERVICE_PLAN --runtime "NODE|18-lts"

# Create PostgreSQL Database Server
echo "Creating PostgreSQL Database Server..."
az postgres server create \
    --name $DB_SERVER \
    --resource-group $RESOURCE_GROUP \
    --location $LOCATION \
    --admin-user $DB_ADMIN \
    --admin-password $DB_PASSWORD \
    --sku-name B_Gen5_1 \
    --version 12

# Create Database
echo "Creating Database..."
az postgres db create --name $DB_NAME --server-name $DB_SERVER --resource-group $RESOURCE_GROUP

# Allow Web App to access PostgreSQL
echo "Configuring Firewall Rules..."
az postgres server firewall-rule create \
    --name AllowAllAzureIPs \
    --server-name $DB_SERVER \
    --resource-group $RESOURCE_GROUP \
    --start-ip-address 0.0.0.0 \
    --end-ip-address 255.255.255.255

# Set environment variables in Web App
echo "Setting Environment Variables..."
CONNECTION_STRING="postgres://$DB_ADMIN:$DB_PASSWORD@$DB_SERVER.postgres.database.azure.com:5432/$DB_NAME?sslmode=require"
az webapp config appsettings set \
    --name $APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --settings \
        DATABASE_URL="$CONNECTION_STRING" \
        NODE_ENV=production \
        NEXT_PUBLIC_API_URL="https://$APP_NAME.azurewebsites.net/api" \
        PORT=8080

echo "Azure resources created successfully!"
echo "Your Web App URL: https://$APP_NAME.azurewebsites.net"
echo ""
echo "Next Steps:"
echo "1. Download your publish profile for GitHub Actions:"
echo "   az webapp deployment list-publishing-profiles --name $APP_NAME --resource-group $RESOURCE_GROUP --xml"
echo "2. Add secrets to your GitHub repository"
echo "3. Push your code to trigger deployment"