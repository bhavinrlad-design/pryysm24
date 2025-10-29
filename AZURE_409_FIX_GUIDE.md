# Azure App Service 409 Conflict Resolution Guide

## Problem
The deployment is failing with "Conflict (CODE: 409)" from the OneDeploy service.

## Root Causes
1. **Artifact too large** - Uploading entire repo with node_modules
2. **Previous deployment still processing** - Azure state mismatch
3. **Runtime stack issues** - Node.js version or configuration mismatch
4. **Missing .next build output** - Application not built on GitHub Actions

## Solutions Applied

### 1. ✅ Optimized GitHub Actions Artifact
- **File**: `.github/workflows/main_pryysm-v2.yml`
- **Change**: Upload only production files (`.next`, `public`, `package.json`, etc.)
- **Benefit**: Reduces artifact from 500MB+ to ~20MB

### 2. ✅ Added .npmrc Configuration
- **File**: `.npmrc`
- **Settings**: `legacy-peer-deps=true`, `production=true`
- **Benefit**: Ensures consistent npm behavior across environments

### 3. ✅ Updated .deployment Script
- **File**: `.deployment`
- **Command**: Includes full build sequence on Azure
- **Benefit**: Azure will rebuild if needed, not rely on pre-built artifacts

### 4. ✅ Enhanced index.js Error Handling
- **File**: `index.js`
- **Changes**: Better error logging, environment validation
- **Benefit**: Easier troubleshooting if startup fails

## Manual Fix Steps (If Automated Deployment Still Fails)

### Step 1: Clear Azure App Service Cache
1. Go to Azure Portal → App Services → PRYYSM-V2
2. Click **"Advanced Tools"** → **"Go"** (Opens Kudu)
3. Go to **Debug Console** → **PowerShell**
4. Run: `cd D:\home\site\repository && ls -la`
5. Run: `Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue`
6. Run: `Remove-Item package-lock.json -ErrorAction SilentlyContinue`

### Step 2: Restart App Service
1. Azure Portal → App Services → PRYYSM-V2
2. Click **"Restart"** button (top of page)
3. Wait 2-3 minutes for restart to complete

### Step 3: Trigger Fresh Deployment
1. Go to GitHub → Actions
2. Find the latest failed workflow run
3. Click **"Re-run failed jobs"** OR
4. Make a new commit to trigger workflow

### Step 4: Monitor Deployment
1. Azure Portal → **Deployment Center**
2. Watch for deployment status to change
3. Check **App Service logs** for errors

## Expected Timeline
- Fresh GitHub Actions build: 5-10 minutes
- Azure deployment: 10-15 minutes  
- Application startup: 2-3 minutes
- **Total: 20-30 minutes**

## Success Indicators
✅ GitHub Actions workflow shows all green checkmarks
✅ Azure deployment shows "Successful" status
✅ Application loading at https://pryysm.app
✅ No errors in Azure App Service logs

## Additional Troubleshooting

### If Still Getting 409 Conflict:
1. Check Azure subscription limits (deploy slots, storage)
2. Verify AZURE_CREDENTIALS secret is still valid
3. Consider using **Zip Deploy** instead of OneDeploy

### If App Crashes on Startup:
1. Check environment variables are set in Azure Portal
2. Verify DATABASE_URL connection string is correct
3. Check App Service logs in Azure Portal

### If Database Connection Fails:
1. Verify DATABASE_URL in Azure Portal
2. Check SQL Server firewall rules allow Azure traffic
3. Test connection manually from Kudu console

---
**Last Updated**: October 29, 2025
**Status**: Deployment optimizations applied, monitoring for success
