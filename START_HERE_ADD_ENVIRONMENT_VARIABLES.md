# 🎓 COMPLETE SOLUTION - ADD ENVIRONMENT VARIABLES

**Problem**: Application Error when visiting https://pryysm.app  
**Root Cause**: Missing environment variables in Azure App Service  
**Solution**: Add 4 configuration settings  
**Time Required**: 5 minutes  
**Difficulty**: Easy

---

## 📚 GUIDES AVAILABLE

### Guide #1: HOW_TO_ADD_ENVIRONMENT_VARIABLES.md ⭐ RECOMMENDED
- **Best for**: Complete understanding
- **Length**: Comprehensive with all details
- **Includes**: Step-by-step, troubleshooting, verification
- **Read time**: 15-30 minutes (but easy to follow)

### Guide #2: VISUAL_GUIDE_ADD_ENVIRONMENT_VARIABLES.md
- **Best for**: Visual learners
- **Length**: Very detailed with screen-by-screen descriptions
- **Includes**: What each page should look like
- **Read time**: 20-30 minutes

### Guide #3: QUICK_FIX_5_MINUTES.md
- **Best for**: Quick reference
- **Length**: Minimal, just the essentials
- **Includes**: 4 settings to copy-paste
- **Read time**: 2-3 minutes

---

## ⚡ QUICK START (For Experienced Users)

If you've done this before, here's the 5-minute version:

### 1. Open Azure Portal
```
https://portal.azure.com
```

### 2. Find pryysm-v2 App Service
```
Search → pryysm-v2 → Click App Service
```

### 3. Go to Configuration
```
Left sidebar → Settings → Configuration
```

### 4. Add 4 Application Settings

**Setting 1:**
```
Name: DATABASE_URL
Value: Server=tcp:pryysm.database.windows.net,1433;Initial Catalog=pryysm;Persist Security Info=False;User ID=YOUR_USERNAME;Password=YOUR_PASSWORD;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
```
*(Replace YOUR_USERNAME and YOUR_PASSWORD)*

**Setting 2:**
```
Name: NEXTAUTH_SECRET
Value: abcd1234EFGH5678ijkl9012MNOP3456
```
*(Or generate at: https://generate-secret.vercel.app/32)*

**Setting 3:**
```
Name: NEXTAUTH_URL
Value: https://pryysm.app
```

**Setting 4:**
```
Name: NODE_ENV
Value: production
```

### 5. Save & Restart
```
Click: Save (at top)
Click: Continue
Click: Restart (at top)
Wait: 2-3 minutes
Test: https://pryysm.app
```

---

## 🔍 WHERE TO GET SQL CREDENTIALS

### Method 1: Find Existing Credentials
1. Azure Portal → SQL Database "pryysm"
2. Click "Connection strings"
3. Copy ADO.NET (SQL Server) connection string
4. Username and password are in that string

### Method 2: Reset SQL Password
1. Azure Portal → SQL Server (pryysm.database.windows.net)
2. Left sidebar → "Reset password"
3. Choose "sqladmin" user
4. Enter and confirm new password
5. Click "Reset password"
6. Use username: `sqladmin` and new password in DATABASE_URL

### Method 3: Check GitHub Secrets
1. GitHub → pryysm-v2 repository
2. Settings → Secrets and variables → Actions
3. Look for `DATABASE_URL` secret
4. Copy the value (it's already in correct format)

---

## 🎯 NEXT STEPS

### After You Add the Variables:

1. ✅ **Save** settings (click Save button)
2. ✅ **Restart** app (click Restart button)
3. ✅ **Wait** 2-3 minutes
4. ✅ **Test** https://pryysm.app

### When App is Working:

1. ✅ Visit https://pryysm.app/login
2. ✅ Visit https://pryysm.app/signup
3. ✅ Create test account
4. ✅ Test login functionality
5. ✅ Monitor logs for errors

---

## ✅ VERIFICATION

**You're done when:**

- [ ] All 4 settings added to Configuration
- [ ] Settings saved successfully
- [ ] App Service restarted
- [ ] https://pryysm.app returns 200 OK
- [ ] Home page loads without error
- [ ] No "Application Error" message
- [ ] Can navigate to /login and /signup

---

## 🆘 IF SOMETHING GOES WRONG

### Error: "Application Error" still showing
1. **Refresh** browser (Ctrl+F5)
2. **Clear** browser cache
3. **Wait** another 2-3 minutes
4. **Check** Azure Portal → Log stream for errors

### Error: "Connection timeout"
1. **Check** DATABASE_URL format is correct
2. **Verify** Azure SQL firewall allows Azure services
   - Azure Portal → SQL Server → Firewalls → Allow Azure services → ON
3. **Confirm** SQL username/password are correct
4. **Restart** app

### Error: "Invalid connection string"
1. **Check** DATABASE_URL starts with `Server=tcp:`
2. **Ensure** it includes port `1433`
3. **Verify** it has `User ID=` and `Password=`
4. **Make** sure no spaces at start/end

---

## 📊 CONFIGURATION CHECK

After saving, verify all 4 appear in list:

```
✓ DATABASE_URL           | [value partially shown] | AppSetting
✓ NEXTAUTH_SECRET       | [value partially shown] | AppSetting
✓ NEXTAUTH_URL          | [value partially shown] | AppSetting
✓ NODE_ENV              | [value partially shown] | AppSetting
```

All 4 should show:
- Value is partially hidden (✓ = correct)
- Source shows "AppSetting" (✓ = correct)
- Status shows as saved (✓ = correct)

---

## 📞 QUICK REFERENCE

| Setting | Value | Where to Get |
|---------|-------|--------------|
| **DATABASE_URL** | Azure SQL connection string | Azure Portal → SQL DB → Connection strings |
| **NEXTAUTH_SECRET** | Random 32-char secret | https://generate-secret.vercel.app/32 |
| **NEXTAUTH_URL** | https://pryysm.app | Given (your app URL) |
| **NODE_ENV** | production | Use exactly: `production` |

---

## 🎓 LEARNING PATH

**Not sure what to do?** Read in this order:

1. **Start Here**: This file (you're reading it!)
2. **More Details**: HOW_TO_ADD_ENVIRONMENT_VARIABLES.md
3. **Visual Steps**: VISUAL_GUIDE_ADD_ENVIRONMENT_VARIABLES.md
4. **Quick Ref**: QUICK_FIX_5_MINUTES.md
5. **Troubleshooting**: APPLICATION_ERROR_TROUBLESHOOTING.md

---

## ✨ SUMMARY

**Problem**: App shows "Application Error"  
**Solution**: Add 4 environment variables to Azure App Service  
**Location**: Azure Portal → pryysm-v2 → Configuration  
**Time**: 5 minutes  
**Result**: App will be working!

---

**Ready to start?**

Choose your guide:
- 🌟 **Recommended**: HOW_TO_ADD_ENVIRONMENT_VARIABLES.md
- 📊 **Visual**: VISUAL_GUIDE_ADD_ENVIRONMENT_VARIABLES.md
- ⚡ **Quick**: QUICK_FIX_5_MINUTES.md

Then follow the step-by-step instructions and your app will be fixed in 5 minutes!

---

**Last Updated**: October 29, 2025  
**Status**: Solution Ready ✅  
**Next Action**: Choose a guide above and start fixing the app
