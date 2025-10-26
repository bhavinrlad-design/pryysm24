# Create AZURE_CREDENTIALS Secret for GitHub Actions

The workflow now uses Client Secret authentication instead of federated credentials. Follow these steps to create the `AZURE_CREDENTIALS` secret:

## Step 1: Create a Service Principal in Azure

Open Azure CLI or Cloud Shell and run:

```bash
az ad sp create-for-rbac --name "github-actions-pryysm" --role Contributor --scopes /subscriptions/DBBEC2F91325438DBB9DAB05E8F0CF0B
```

**Replace** `DBBEC2F91325438DBB9DAB05E8F0CF0B` with your actual subscription ID.

### Expected Output:
```json
{
  "appId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "displayName": "github-actions-pryysm",
  "password": "your-password-here",
  "tenant": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

**IMPORTANT:** Copy this entire JSON output. You'll need it for the next step.

## Step 2: Add Secret to GitHub

1. Go to your GitHub repository: https://github.com/yourusername/pryysm-v2
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `AZURE_CREDENTIALS`
5. Value: Paste the JSON output from Step 1 (the entire JSON block)
6. Click **Add secret**

### Example Secret Value Format:
```json
{
  "clientId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "clientSecret": "your-password-here",
  "subscriptionId": "DBBEC2F91325438DBB9DAB05E8F0CF0B",
  "tenantId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

## Step 3: Verify Other Secrets

Make sure these secrets are also set in GitHub (Settings → Secrets and variables → Actions):

- ✅ `DATABASE_URL` - Connection string to Azure SQL
- ✅ `NEXTAUTH_URL` - Should be `https://pryysm.app`
- ✅ `NEXTAUTH_SECRET` - Random string for NextAuth.js
- ✅ `AZURE_CREDENTIALS` - Service principal credentials (NEW)

## Step 4: Trigger Deployment

1. Make a small change to `main` branch (e.g., add a comment in a file)
2. Push to GitHub: `git push origin main`
3. GitHub Actions will automatically trigger
4. Monitor the workflow: Go to **Actions** tab to see deployment progress
5. Watch for the "Login to Azure" step - it should now succeed ✅

## Troubleshooting

### If login still fails:
- Verify the JSON format is valid (no extra quotes or formatting issues)
- Check that the service principal has Contributor role on your subscription
- Try re-creating the service principal

### If app doesn't deploy:
- Check the workflow logs for specific errors
- Verify `PRYYSM-V2` app name is correct in workflow
- Ensure Azure App Service is in Production slot

## Alternative: Using Existing Service Principal

If you already have a service principal, get its credentials:

```bash
az ad sp show --id YOUR_CLIENT_ID --query "{clientId:appId, tenantId:appOwnerTenantId}" -o tsv
```

Then manually create the JSON with: `clientId`, `clientSecret`, `subscriptionId`, and `tenantId`.

## Next Steps After Deployment

Once GitHub Actions successfully deploys:
1. ✅ Create database tables in Azure SQL (run `azure_create_tables.sql`)
2. ✅ Insert demo users
3. ✅ Test login at https://pryysm.app
