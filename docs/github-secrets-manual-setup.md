# GitHub Secrets Setup for Azure Deployment

Follow these steps to set up the GitHub secrets needed for Azure deployment without using the Azure CLI:

## Option 1: Individual Credential Secrets

If you want to keep using individual credential components in your workflow file:

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Add the following secrets:

   - `AZUREAPPSERVICE_CLIENTID_0E34F16A228049FF9705C560D4A33114`
   - `AZUREAPPSERVICE_TENANTID_240EAE7DABEF43D283AF62B6D890AEC5`
   - `AZUREAPPSERVICE_SUBSCRIPTIONID_C2C89BC5E1694A0985A457228426AD8E`
   - `AZUREAPPSERVICE_CLIENTSECRET_YOURVALUE` (this is the missing secret causing the authentication failure)

4. Modify the workflow file to use these individual credentials:

```yaml
- name: Login to Azure
  uses: azure/login@v2
  with:
    client-id: ${{ secrets.AZUREAPPSERVICE_CLIENTID_0E34F16A228049FF9705C560D4A33114 }}
    tenant-id: ${{ secrets.AZUREAPPSERVICE_TENANTID_240EAE7DABEF43D283AF62B6D890AEC5 }}
    subscription-id: ${{ secrets.AZUREAPPSERVICE_SUBSCRIPTIONID_C2C89BC5E1694A0985A457228426AD8E }}
    client-secret: ${{ secrets.AZUREAPPSERVICE_CLIENTSECRET_YOURVALUE }}
```

## Option 2: Use AZURE_CREDENTIALS (Recommended)

If you want to use the AZURE_CREDENTIALS approach (recommended):

1. Create a JSON file named `azure_credentials.json` with this structure:

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

2. Fill in the values:
   - `YOUR_CLIENT_ID`: Same as AZUREAPPSERVICE_CLIENTID_0E34F16A228049FF9705C560D4A33114
   - `YOUR_TENANT_ID`: Same as AZUREAPPSERVICE_TENANTID_240EAE7DABEF43D283AF62B6D890AEC5
   - `YOUR_SUBSCRIPTION_ID`: Same as AZUREAPPSERVICE_SUBSCRIPTIONID_C2C89BC5E1694A0985A457228426AD8E
   - `YOUR_CLIENT_SECRET`: The client secret value you should have (this is likely the missing piece)

3. Go to your GitHub repository
4. Navigate to Settings > Secrets and variables > Actions
5. Add a new secret named `AZURE_CREDENTIALS`
6. Copy the entire content of your JSON file into this secret

## Additional Required Secrets

Also make sure you have these secrets for your application:

- `DATABASE_URL`: Your database connection string
- `NEXT_PUBLIC_API_URL`: Set to `https://PRYYSM-2.azurewebsites.net/api`

## Where to Get These Values

If you don't have these values, you can find them:

1. In the Azure Portal under App Service > PRYYSM-2 > Deployment Center
2. In your Azure AD App Registrations section
3. By contacting your Azure administrator

## Testing the Workflow

After setting up these secrets:

1. Go to the "Actions" tab in your GitHub repository
2. Click on the workflow
3. Click "Run workflow" and select the branch to run it on
4. Monitor the workflow run to see if it succeeds