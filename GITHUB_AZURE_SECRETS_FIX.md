# 🔧 GitHub Actions Azure Login Fix

## The Problem

```
Error: Login failed with Error: Using auth-type: SERVICE_PRINCIPAL. 
Not all values are present. Ensure 'client-id' and 'tenant-id' are supplied.
```

**Cause:** GitHub Actions workflow is trying to authenticate with Azure using secrets that don't exist in your GitHub repository.

---

## What You Need to Do

### Step 1: Get Azure Credentials

1. Go to **Azure Portal** → **Azure Active Directory**
2. Click **App registrations** → **New registration**
3. Name it: `pryysm-v2-github-actions`
4. Click **Register**

You'll need these 3 values:

```
1. Application (client) ID     → Will be AZUREAPPSERVICE_CLIENTID
2. Directory (tenant) ID       → Will be AZUREAPPSERVICE_TENANTID  
3. Subscription ID             → Will be AZUREAPPSERVICE_SUBSCRIPTIONID
```

### Step 2: Get Subscription ID

1. Go to **Azure Portal** → **Subscriptions**
2. Copy your **Subscription ID**

### Step 3: Create Client Secret

1. In your app registration (from Step 1)
2. Click **Certificates & secrets** → **New client secret**
3. Set expiration to 24 months
4. Copy the **Value** (this is your client secret)

### Step 4: Add GitHub Repository Secrets

1. Go to **GitHub** → Your repository **pryysm-v2**
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add these 4:

```
Name: AZUREAPPSERVICE_CLIENTID_E4770AE16B2441F5868CA061B4D8D689
Value: [Application (client) ID from Step 1]

Name: AZUREAPPSERVICE_TENANTID_8D7DB62EBB904F2BB2CE8DA8F0479EB8
Value: [Directory (tenant) ID from Step 1]

Name: AZUREAPPSERVICE_SUBSCRIPTIONID_DBBEC2F91325438DBB9DAB05E8F0CF0B
Value: [Subscription ID from Step 2]

Name: AZUREAPPSERVICE_CLIENT_SECRET_E4770AE16B2441F5868CA061B4D8D689
Value: [Client secret Value from Step 3]
```

### Step 5: Grant App Permissions

1. Go to **Azure Portal** → **Subscriptions**
2. Click **Access control (IAM)**
3. Click **+ Add** → **Add role assignment**
4. Role: **Contributor**
5. Assign to: Your app (from Step 1)
6. Click **Review + assign**

---

## Quick Reference: What Goes Where

| GitHub Secret Name | Source | Azure Location |
|---|---|---|
| `AZUREAPPSERVICE_CLIENTID_...` | Application (client) ID | Azure AD → App registrations → Your app → Overview |
| `AZUREAPPSERVICE_TENANTID_...` | Directory (tenant) ID | Azure AD → App registrations → Your app → Overview |
| `AZUREAPPSERVICE_SUBSCRIPTIONID_...` | Subscription ID | Azure → Subscriptions |
| `AZUREAPPSERVICE_CLIENT_SECRET_...` | Client Secret Value | Azure AD → App registrations → Your app → Certificates & secrets |

---

## After Adding Secrets

The GitHub Actions workflow will automatically use these on the next push to `main` branch.

Test it:
1. Make a small change to a file
2. Commit and push to main
3. Go to **GitHub** → **Actions** → Watch the workflow run
4. If successful, deployment completes to Azure

---

## Troubleshooting

**Still getting "Not all values are present"?**
- ✅ Double-check secret names match exactly (including the UUID at the end)
- ✅ Verify all 4 secrets are added
- ✅ Make sure you didn't accidentally add spaces before/after values

**App still not deploying?**
- ✅ Check that app service "PRYYSM-V2" exists in Azure
- ✅ Verify your app registration has "Contributor" role on subscription
- ✅ Check workflow logs in GitHub Actions for detailed error

---

## Current Workflow Using

**File:** `.github/workflows/main_pryysm-v2.yml`

```yaml
- name: Login to Azure
  uses: azure/login@v2
  with:
    client-id: ${{ secrets.AZUREAPPSERVICE_CLIENTID_E4770AE16B2441F5868CA061B4D8D689 }}
    tenant-id: ${{ secrets.AZUREAPPSERVICE_TENANTID_8D7DB62EBB904F2BB2CE8DA8F0479EB8 }}
    subscription-id: ${{ secrets.AZUREAPPSERVICE_SUBSCRIPTIONID_DBBEC2F91325438DBB9DAB05E8F0CF0B }}
```

These secret names are very specific (with UUID suffixes). They must match exactly.

---

Once you add all 4 secrets to GitHub, the deployment should work! 🚀
