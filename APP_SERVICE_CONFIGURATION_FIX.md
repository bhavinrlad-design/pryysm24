# 🔧 APP SERVICE CONFIGURATION FIX
**Priority**: 🔴 CRITICAL  
**Issue**: Application Error - Likely missing environment variables  
**Solution**: Manually configure App Service settings

---

## 🚨 Root Cause

The GitHub Actions workflow uses secrets, but **Azure App Service needs environment variables to be explicitly set in the App Service Configuration**, not just passed during GitHub Actions build.

**Deployment does**: ✅ Build with secrets (correct)  
**Deployment misses**: ❌ Setting environment variables in App Service (causes runtime error)

---

## ✅ IMMEDIATE FIX (Follow These Steps Exactly)

### Step 1: Access Azure Portal

1. Go to https://portal.azure.com
2. Sign in to your Azure account
3. Search for "**pryysm-v2**" in the search bar
4. Click on the App Service "pryysm-v2"

### Step 2: Navigate to Configuration

1. In the left sidebar, find **"Settings"** section
2. Click on **"Configuration"**
3. You should see "Application settings" tab

### Step 3: Add Missing Environment Variables

You need to add these application settings (exact names important):

#### Setting 1: DATABASE_URL
- **Name**: `DATABASE_URL`
- **Value**: Get from Azure SQL connection string
  - Go to Azure SQL Database "pryysm" → Connection strings → ADO.NET
  - Should look like: `Server=tcp:pryysm.database.windows.net,1433;Initial Catalog=pryysm;Persist Security Info=False;User ID=<username>;Password=<password>;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;`
  - Replace `<username>` and `<password>` with your SQL credentials
- Click **"OK"**

#### Setting 2: NEXTAUTH_SECRET
- **Name**: `NEXTAUTH_SECRET`
- **Value**: Generate a random secret (or use from GitHub Secrets)
  - Option: Use: `$(date +%s | sha256sum | base64 | head -c 32)` to generate random
  - Or generate here: https://generate-secret.vercel.app/32
  - Paste the generated secret value
- Click **"OK"**

#### Setting 3: NEXTAUTH_URL
- **Name**: `NEXTAUTH_URL`
- **Value**: `https://pryysm.app`
- Click **"OK"**

#### Setting 4: NODE_ENV
- **Name**: `NODE_ENV`
- **Value**: `production`
- Click **"OK"**

#### Setting 5: PRISMA_LOG_LEVEL (Optional, for debugging)
- **Name**: `PRISMA_LOG_LEVEL`
- **Value**: `debug` (helps see Prisma startup issues)
- Click **"OK"**

### Step 4: Save Configuration

1. At the **top of the Configuration page**, click **"Save"**
2. A dialog will appear asking to confirm changes
3. Click **"Continue"**
4. Wait for the save to complete (usually 30 seconds)

### Step 5: Restart the App Service

1. Click **"Restart"** button at the top
2. Confirm when prompted
3. Wait 2-3 minutes for restart to complete

### Step 6: Test the Application

```
Go to: https://pryysm.app
Expected: 200 OK + home page loads
If still error: Check logs in "Log stream"
```

---

## 🔍 Verify Settings Are Saved

After saving:
1. In Configuration page, you should see your new settings listed
2. Each setting shows: Name | Value (partially hidden) | Source
3. All 4-5 settings should show "AppSetting" as source

---

## 📋 Checklist

- [ ] Opened Azure Portal
- [ ] Searched for "pryysm-v2"
- [ ] Clicked on App Service
- [ ] Went to Configuration
- [ ] Added DATABASE_URL (with correct credentials)
- [ ] Added NEXTAUTH_SECRET (random 32-char secret)
- [ ] Added NEXTAUTH_URL (`https://pryysm.app`)
- [ ] Added NODE_ENV (`production`)
- [ ] Added PRISMA_LOG_LEVEL (`debug`) - optional
- [ ] Clicked "Save" at top
- [ ] Confirmed the changes
- [ ] Clicked "Restart"
- [ ] Waited 2-3 minutes
- [ ] Tested https://pryysm.app

---

## 🆘 If You Still Get Application Error

### Option A: Check Application Insights Logs

1. Azure Portal → pryysm-v2 → Application Insights
2. Click on Application Insights resource
3. Left sidebar → "Failures"
4. Look at the detailed error message
5. Note the error and we can fix it specifically

### Option B: Check Log Stream

1. Azure Portal → pryysm-v2
2. Left sidebar → "Log stream"
3. Watch for error messages in real-time
4. Screenshot any errors
5. Share errors with us

### Option C: Use Kudu Console

1. Go to: https://pryysm-v2.scm.azurewebsites.net
2. Top menu → "Debug console" → "PowerShell"
3. Navigate: `cd site/wwwroot`
4. Check if `.next` folder exists: `ls .next`
5. If missing, run: `npm install && npm run build`

---

## 🔐 Getting Database Credentials

If you need to find your SQL credentials:

1. Azure Portal → SQL Server (not the database, the server)
2. Server name format: `pryysm.database.windows.net`
3. Go to "Access control (IAM)" or "Logins"
4. Find your admin login username
5. If you forgot password, you can reset it:
   - Azure Portal → SQL Server → "Reset password"
   - Or contact your Azure admin

---

## 📊 Expected Result

After configuring and restarting:

```
✅ App Service Status: Running
✅ Response: 200 OK
✅ Home page: Loads successfully
✅ No error message
✅ Database: Connected
✅ Authentication: Ready for login
```

---

## 🎯 Quick Summary

**What went wrong**: Environment variables not in App Service configuration  
**Why it matters**: Azure App Service needs these at runtime  
**How to fix**: Add 4-5 configuration settings in Azure Portal  
**Time to fix**: 5 minutes  
**Expected result**: App should work after restart

---

**Status**: 🔧 FIXABLE - Follow steps above  
**Difficulty**: Easy  
**Time Required**: 5-10 minutes
