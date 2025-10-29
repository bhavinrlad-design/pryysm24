# 🚨 APPLICATION ERROR - TROUBLESHOOTING GUIDE
**Date**: October 29, 2025  
**Status**: Application Error on startup  
**URL**: https://pryysm.app (showing Application Error page)  
**Also**: https://pryysm-v2-dyfqbdd3g4gycnee.uaenorth-01.azurewebsites.net (503)

---

## 🔍 Problem Analysis

### Current Status
```
App Response: Application Error ❌
HTTP Status: 503 Service Unavailable
Time Elapsed: ~15 minutes since deployment
Expected: 200 OK + app running
Actual: Generic error page (suggests startup crash)
```

### Possible Causes
1. 🔴 **Database Connection Failure** (Most Likely)
   - DATABASE_URL environment variable missing/incorrect
   - Azure SQL Server firewall blocking connection
   - Connection timeout

2. 🔴 **Prisma Client Error**
   - Prisma client initialization failure
   - Schema mismatch with database
   - Migration incomplete

3. 🔴 **Next.js Build Issue**
   - Build artifact corrupted
   - Missing dependencies after deployment
   - Configuration error

4. 🔴 **Environment Variables Missing**
   - NextAuth secret missing
   - Database URL missing
   - API keys missing

---

## ✅ Immediate Actions to Take

### Step 1: Check Azure Portal App Service Logs

1. Go to https://portal.azure.com
2. Search for "pryysm-v2"
3. Click on the App Service
4. Left sidebar: Click **"Log stream"** or **"Deployment center"**
5. Look for error messages

### Step 2: Check Environment Variables

1. In Azure Portal, go to pryysm-v2 App Service
2. Click **"Configuration"** in left sidebar
3. Verify these are set:
   - `DATABASE_URL` (should have value)
   - `NEXTAUTH_SECRET` (should have value)
   - `NODE_ENV` = production

### Step 3: Restart App Service

1. Azure Portal → pryysm-v2
2. Top menu: Click **"Restart"**
3. Wait 2-3 minutes for restart to complete
4. Check if error clears

### Step 4: Check Deployment Status

1. Azure Portal → pryysm-v2
2. Click **"Deployment center"**
3. Check if latest deployment (ID: a3b11129-d0a9-48a4-8934-54556ec4bd94) shows as "Successful"

---

## 🔧 Common Fixes

### If DATABASE_URL is Missing

**Fix**: Add DATABASE_URL to App Service configuration

```
1. Azure Portal → pryysm-v2 → Configuration
2. New application setting:
   Name: DATABASE_URL
   Value: Server=tcp:pryysm.database.windows.net,1433;
          Initial Catalog=pryysm;
          Persist Security Info=False;
          User ID=<username>;
          Password=<password>;
          MultipleActiveResultSets=False;
          Encrypt=True;
          TrustServerCertificate=False;
          Connection Timeout=30;
3. Click "Save"
4. Restart app
```

### If Firewall is Blocking

**Fix**: Allow Azure Services in Azure SQL Firewall

```
1. Azure Portal → SQL Database "pryysm"
2. Click "Server name" link
3. Left sidebar: "Firewalls and virtual networks"
4. Toggle: "Allow Azure services and resources to access this server" → ON
5. Click "Save"
6. Restart app
```

### If Node Dependencies Missing

**Fix**: Redeploy or run npm install in kudu console

```
1. Go to: https://pryysm-v2.scm.azurewebsites.net
2. Top menu: "Debug console" → "PowerShell"
3. Navigate: cd site/wwwroot
4. Run: npm install
5. Wait for completion
6. Restart app
```

---

## 📋 Diagnostic Checklist

- [ ] Database connection working (test with Azure Data Studio)
- [ ] DATABASE_URL environment variable set
- [ ] NEXTAUTH_SECRET environment variable set
- [ ] Azure SQL Firewall allows Azure services
- [ ] App Service "Always On" enabled (prevents cold starts)
- [ ] Deployment logs show no errors
- [ ] Previous deployment (if exists) was also failing
- [ ] Check Node.js version (should be 18 LTS)

---

## 🆘 If Issue Persists

### Option 1: Redeploy from GitHub
```
1. Push a small change to GitHub (e.g., update README)
2. GitHub Actions will trigger new deployment
3. Wait for deployment to complete
4. Check if error clears
```

### Option 2: Enable Application Insights
```
1. Azure Portal → pryysm-v2 → Application Insights
2. Click "Create new"
3. Wait for creation
4. Check Application Insights for error details
5. Go to Application Insights → Failures → See detailed error
```

### Option 3: Check Startup Command
```
1. Azure Portal → pryysm-v2 → Configuration
2. Section: "General settings"
3. Check "Startup Command" (should be empty for Node.js auto-detection)
4. If set incorrectly, clear it
5. Restart app
```

---

## 🔗 Helpful Links

- **Azure Portal**: https://portal.azure.com
- **SCM (Kudu) Console**: https://pryysm-v2.scm.azurewebsites.net
- **Deployment Logs**: https://pryysm-v2-dyfqbdd3g4gycnee.scm.uaenorth-01.azurewebsites.net/api/deployments/a3b11129-d0a9-48a4-8934-54556ec4bd94/log
- **App Service Logs**: In Azure Portal, search "pryysm-v2" → Log stream

---

## 📞 Next Steps

1. **Check Azure Portal immediately** for error details
2. **Review Configuration settings** - especially DATABASE_URL
3. **Restart app** from Azure Portal
4. **Check logs** for specific error messages
5. **Report findings** so we can fix the issue

**Most Likely Issue**: Missing or incorrect DATABASE_URL environment variable

---

**Status**: 🚨 NEEDS INVESTIGATION & FIXES  
**Priority**: HIGH  
**Action Required**: YES
