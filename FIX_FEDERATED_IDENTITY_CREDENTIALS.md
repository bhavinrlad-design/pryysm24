# 🔧 Fix Azure Login - Add Federated Identity Credentials

## The Problem

```
Error: The client 'PRYYSM-V2' has no configured federated identity credentials.
```

**Cause:** GitHub Actions is trying to use OIDC (OpenID Connect) to authenticate with Azure, but your app registration doesn't have federated credentials configured.

---

## Solution: Add Federated Identity Credential

### Step 1: Go to Your App Registration

1. **Azure Portal** → https://portal.azure.com
2. Search for **"Azure Active Directory"**
3. Click **"App registrations"**
4. Find your app: **PRYYSM-V2**

### Step 2: Add Federated Credential

1. In your app, click **"Certificates & secrets"** (left menu)
2. Click on **"Federated credentials"** tab
3. Click **"+ Add credential"**

### Step 3: Configure Federated Credential

Fill in these values:

```
Scenario: GitHub Actions deploying Azure resources

Issuer: https://token.actions.githubusercontent.com
Subject identifier: repo:lad-pryysm/pryysm-v2:ref:refs/heads/main
Name: github-actions-pryysm-v2 (or any name)
```

**Details:**
- **Issuer:** `https://token.actions.githubusercontent.com`
- **Subject identifier:** `repo:lad-pryysm/pryysm-v2:ref:refs/heads/main`
  - Replace `lad-pryysm/pryysm-v2` with your repo path if different
- **Name:** Anything descriptive (e.g., `github-actions-main`)

### Step 4: Click "Add"

Done! ✅

---

## Alternative: Use Client Secret Instead

If federated credentials don't work, we can use **client secret** authentication instead:

### Change workflow to use secrets:

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

Then create a new GitHub secret:
```
Name: AZURE_CREDENTIALS
Value: {
  "clientId": "your-client-id",
  "clientSecret": "your-client-secret",
  "subscriptionId": "your-subscription-id",
  "tenantId": "your-tenant-id",
  "activeDirectoryEndpointUrl": "https://login.microsoftonline.com",
  "resourceManagerEndpointUrl": "https://management.azure.com/",
  "activeDirectoryGraphResourceId": "https://graph.microsoft.com/",
  "sqlManagementEndpointUrl": "https://management.core.windows.net:8443/",
  "galleryEndpointUrl": "https://gallery.azure.com/",
  "managementEndpointUrl": "https://management.core.windows.net/"
}
```

---

## Recommended: Use Federated Credentials (Option 1)

✅ **More secure** (no storing secrets)
✅ **Recommended** by Microsoft
✅ **Cleaner** workflow

**Steps:**
1. Go to Azure Portal → Azure AD → App registrations → PRYYSM-V2
2. Click **"Certificates & secrets"** → **"Federated credentials"**
3. Click **"+ Add credential"**
4. Select **"GitHub Actions deploying Azure resources"**
5. Fill in:
   - Issuer: `https://token.actions.githubusercontent.com`
   - Subject: `repo:lad-pryysm/pryysm-v2:ref:refs/heads/main`
   - Name: `github-actions-main`
6. Click **"Add"**

Then trigger deployment again!

---

## Visual Summary

```
Azure Portal
    ↓
Azure Active Directory
    ↓
App registrations
    ↓
PRYYSM-V2
    ↓
Certificates & secrets
    ↓
Federated credentials (Tab)
    ↓
+ Add credential
    ↓
Fill issuer & subject
    ↓
Click Add
```

After adding, your next GitHub Actions deployment will work! 🚀

---

## Why This Is Needed

GitHub Actions uses OIDC (OpenID Connect) to securely authenticate with Azure without storing secrets. The federated credential tells Azure to trust tokens from your GitHub repo's main branch.

The error message shows GitHub tried to authenticate:
```
issuer: https://token.actions.githubusercontent.com
subject: repo:lad-pryysm/pryysm-v2:ref:refs/heads/main
```

But Azure didn't have this configured, so it failed.
