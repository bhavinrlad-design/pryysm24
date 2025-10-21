# Azure Service Principal Creator for GitHub Actions
# This script helps create a service principal for GitHub Actions and formats the output correctly

# Define your variables here (Replace these with your actual values)
$appName = "PRYYSM-2"
$resourceGroup = "<your-resource-group>"
$subscriptionId = "<your-subscription-id>"

# Check if Azure CLI is installed
try {
    $azVersion = az --version
    Write-Host "Azure CLI is installed. Version: $azVersion" -ForegroundColor Green
} catch {
    Write-Host "Azure CLI is not installed. Please install it first: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli" -ForegroundColor Red
    exit
}

# Check if logged in to Azure
Write-Host "Checking if you're logged in to Azure..." -ForegroundColor Cyan
az account show 2>$null
if (-not $?) {
    Write-Host "You are not logged in to Azure. Please log in." -ForegroundColor Yellow
    az login
}

# List subscriptions for user to select
Write-Host "Available subscriptions:" -ForegroundColor Cyan
az account list --query "[].{Name:name, SubscriptionId:id, IsDefault:isDefault}" -o table

# If subscription ID is not set, prompt user
if ($subscriptionId -eq "<your-subscription-id>") {
    $subscriptionId = Read-Host "Enter your subscription ID"
}

# Set the subscription
Write-Host "Setting subscription to: $subscriptionId" -ForegroundColor Cyan
az account set --subscription $subscriptionId

# List resource groups if needed
if ($resourceGroup -eq "<your-resource-group>") {
    Write-Host "Available resource groups:" -ForegroundColor Cyan
    az group list --query "[].name" -o table
    $resourceGroup = Read-Host "Enter your resource group name"
}

# Check if the App Service exists
Write-Host "Checking if the App Service exists: $appName" -ForegroundColor Cyan
az webapp show --name $appName --resource-group $resourceGroup 2>$null
if (-not $?) {
    Write-Host "App Service $appName not found in resource group $resourceGroup" -ForegroundColor Red
    $appName = Read-Host "Enter the correct App Service name"
}

# Create the service principal
Write-Host "Creating service principal for GitHub Actions..." -ForegroundColor Cyan
$scope = "/subscriptions/$subscriptionId/resourceGroups/$resourceGroup/providers/Microsoft.Web/sites/$appName"
Write-Host "Using scope: $scope" -ForegroundColor Cyan

# Creating service principal and saving output to file
$outputFile = "azure_credentials.json"
az ad sp create-for-rbac --name "github-deploy-$appName" `
  --role contributor `
  --scopes $scope `
  --sdk-auth > $outputFile

if ($?) {
    Write-Host "Service principal created successfully!" -ForegroundColor Green
    Write-Host "Credentials saved to $outputFile" -ForegroundColor Green
    Write-Host "`nIMPORTANT: Add this entire file content as a GitHub Secret named 'AZURE_CREDENTIALS'" -ForegroundColor Yellow
    Write-Host "1. Go to your GitHub repository"
    Write-Host "2. Go to Settings > Secrets > Actions"
    Write-Host "3. Click on 'New repository secret'"
    Write-Host "4. Name: AZURE_CREDENTIALS"
    Write-Host "5. Value: Copy the ENTIRE contents of the $outputFile file"
    Write-Host "6. Click 'Add secret'"
    
    # Display the beginning of the file to verify (without showing sensitive data)
    Write-Host "`nPreview of credentials file (first few characters only):" -ForegroundColor Cyan
    Get-Content $outputFile -TotalCount 10
    Write-Host "... (content trimmed for security)" -ForegroundColor DarkGray
} else {
    Write-Host "Failed to create service principal" -ForegroundColor Red
}