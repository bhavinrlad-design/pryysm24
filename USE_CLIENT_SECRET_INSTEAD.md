# ✅ Alternative: Use Client Secret Instead of Federated Credential

The federated credential is causing issues. Let's use the simpler **Client Secret** method instead.

## Why Switch?

- ✅ More reliable (no subject mismatch issues)
- ✅ Simpler setup
- ✅ Still secure (secret only used in GitHub Actions)
- ✅ Works immediately

---

## Step 1: Get Your Client Secret

1. **Azure Portal** → **Azure Active Directory** → **App registrations** → **PRYYSM-V2**
2. Click **"Certificates & secrets"**
3. Click **"Client secrets"** tab
4. Do you have a secret listed? 
   - If **YES**: Copy the **Value** (not the ID)
   - If **NO**: Click **"+ New client secret"**
     - Description: `github-actions`
     - Expires: `24 months`
     - Click **"Add"**
     - **Copy the Value immediately** (you can't see it again!)

**You need:**
- Client ID (Application ID)
- Client Secret Value
- Tenant ID
- Subscription ID

---

## Step 2: Create GitHub Secret

Go to: **GitHub** → **Repository settings** → **Secrets and variables** → **Actions**

Create NEW secret:

```
Name: AZURE_CREDENTIALS
Value: (copy the JSON below and fill in your values)
```

**JSON Format:**
```json
{
  "clientId": "YOUR_APPLICATION_ID",
  "clientSecret": "YOUR_CLIENT_SECRET_VALUE",
  "subscriptionId": "YOUR_SUBSCRIPTION_ID",
  "tenantId": "YOUR_TENANT_ID",
  "activeDirectoryEndpointUrl": "https://login.microsoftonline.com",
  "resourceManagerEndpointUrl": "https://management.azure.com/",
  "activeDirectoryGraphResourceId": "https://graph.microsoft.com/",
  "sqlManagementEndpointUrl": "https://management.core.windows.net:8443/",
  "galleryEndpointUrl": "https://gallery.azure.com/",
  "managementEndpointUrl": "https://management.core.windows.net/"
}
```

**Example (with fake values):**
```json
{
  "clientId": "550e8400-e29b-41d4-a716-446655440000",
  "clientSecret": "ABC123~def456ghi789-_jklmnop",
  "subscriptionId": "550e8400-e29b-41d4-a716-446655440222",
  "tenantId": "550e8400-e29b-41d4-a716-446655440111",
  "activeDirectoryEndpointUrl": "https://login.microsoftonline.com",
  "resourceManagerEndpointUrl": "https://management.azure.com/",
  "activeDirectoryGraphResourceId": "https://graph.microsoft.com/",
  "sqlManagementEndpointUrl": "https://management.core.windows.net:8443/",
  "galleryEndpointUrl": "https://gallery.azure.com/",
  "managementEndpointUrl": "https://management.core.windows.net/"
}
```

---

## Step 3: Update GitHub Actions Workflow

Change the workflow file from OIDC to Client Secret:

**File:** `.github/workflows/main_pryysm-v2.yml`

Change this:
```yaml
- name: Login to Azure
  uses: azure/login@v2
  with:
    client-id: ${{ secrets.AZUREAPPSERVICE_CLIENTID_E4770AE16B2441F5868CA061B4D8D689 }}
    tenant-id: ${{ secrets.AZUREAPPSERVICE_TENANTID_8D7DB62EBB904F2BB2CE8DA8F0479EB8 }}
    subscription-id: ${{ secrets.AZUREAPPSERVICE_SUBSCRIPTIONID_DBBEC2F91325438DBB9DAB05E8F0CF0B }}
```

To this:
```yaml
- name: Login to Azure
  uses: azure/login@v2
  with:
    creds: ${{ secrets.AZURE_CREDENTIALS }}
```

---

## Step 4: Commit and Push

```bash
cd d:\Pryysm-v2\pryysm-v2-3dprint
git add .github/workflows/main_pryysm-v2.yml
git commit -m "Switch to client secret authentication for Azure login"
git push origin main
```

---

## What This Does

1. Removes OIDC/federated credential dependency
2. Uses Client Secret for authentication (simpler, more reliable)
3. GitHub Actions will now authenticate successfully

---

## Security Note

✅ Safe because:
- Secret is only stored in GitHub Actions
- Never exposed in logs
- Only used during deployment
- Can be rotated anytime in Azure

---

## Then Trigger Deployment

```bash
git commit --allow-empty -m "Trigger deployment with client secret auth"
git push origin main
```

Watch: **GitHub → Actions**

Should deploy successfully! 🚀
