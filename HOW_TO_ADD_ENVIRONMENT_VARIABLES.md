# 📖 COMPLETE GUIDE - HOW TO ADD ENVIRONMENT VARIABLES

**Your Issue**: Application Error  
**Root Cause**: Missing environment variables in Azure App Service  
**Solution**: Add 4 settings to Configuration  
**Time to Fix**: 5 minutes

---

## 📍 WHERE TO ADD THEM

```
Azure Portal
   ↓
Search: pryysm-v2
   ↓
Click App Service
   ↓
Left Sidebar: Settings → Configuration
   ↓
Click: "+ New application setting" (4 times)
   ↓
Add the 4 settings below
```

---

## 🔧 THE 4 SETTINGS TO ADD

### Setting #1: DATABASE_URL

**Purpose**: Connect app to Azure SQL database

**Name**: `DATABASE_URL`

**Value** (copy exactly, replace username/password):
```
Server=tcp:pryysm.database.windows.net,1433;Initial Catalog=pryysm;Persist Security Info=False;User ID=YOUR_SQL_USERNAME;Password=YOUR_SQL_PASSWORD;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
```

**How to get SQL credentials**:
- Option A: Find them in your Azure SQL database documentation/emails
- Option B: Go to Azure Portal → SQL Database "pryysm" → Connection strings
- Option C: Reset password → SQL Server → Reset password → Set new password

**Format Check**:
- ✅ Has `Server=tcp:pryysm.database.windows.net,1433`
- ✅ Has `Initial Catalog=pryysm`
- ✅ Has valid username (replace `YOUR_SQL_USERNAME`)
- ✅ Has valid password (replace `YOUR_SQL_PASSWORD`)
- ✅ No spaces at beginning or end

---

### Setting #2: NEXTAUTH_SECRET

**Purpose**: Secure authentication token encryption

**Name**: `NEXTAUTH_SECRET`

**Value** (choose one):
```
Option A (Use this): abcd1234EFGH5678ijkl9012MNOP3456

Option B (Generate your own): 
https://generate-secret.vercel.app/32
(Visit this URL, copy the generated secret)
```

**Requirements**:
- ✅ At least 32 characters long
- ✅ Mix of uppercase, lowercase, numbers
- ✅ Can include special characters

---

### Setting #3: NEXTAUTH_URL

**Purpose**: Tell NextAuth where your app is hosted

**Name**: `NEXTAUTH_URL`

**Value** (exactly):
```
https://pryysm.app
```

**Notes**:
- ✅ Must include `https://`
- ✅ Must include `pryysm.app`
- ✅ No trailing slash

---

### Setting #4: NODE_ENV

**Purpose**: Tell app it's running in production

**Name**: `NODE_ENV`

**Value** (exactly):
```
production
```

**Notes**:
- ✅ Lowercase
- ✅ No spaces
- ✅ Exactly: `production`

---

## 🎬 STEP-BY-STEP INSTRUCTIONS

### STEP 1: Open Azure Portal
```
1. Open web browser
2. Go to: https://portal.azure.com
3. Sign in
4. You should see Azure Portal dashboard
```

### STEP 2: Find pryysm-v2 App Service
```
1. Look for search bar at TOP of page
2. Type: pryysm-v2
3. Press Enter
4. Look for "App Services" in results
5. Click on "pryysm-v2" (icon: ▤)
6. Wait for page to load
```

### STEP 3: Go to Configuration
```
1. You're now on the App Service page
2. LEFT SIDEBAR, find "Settings" section
3. Click on "Settings" (if collapsed)
4. You should see "Configuration" option
5. Click on "Configuration"
6. Wait for page to load
```

### STEP 4: View Application Settings
```
You should see:
  • "Application settings" tab (should be selected)
  • "Connection strings" tab
  • List of existing settings (if any)
  • Button: "+ New application setting"
```

### STEP 5: Add Setting #1 (DATABASE_URL)
```
1. Click: "+ New application setting"
2. Form appears with Name and Value fields
3. In "Name": Type "DATABASE_URL"
4. In "Value": Paste the connection string (see above)
5. Click: "OK"
6. DATABASE_URL should appear in list above
```

### STEP 6: Add Setting #2 (NEXTAUTH_SECRET)
```
1. Click: "+ New application setting"
2. In "Name": Type "NEXTAUTH_SECRET"
3. In "Value": Type "abcd1234EFGH5678ijkl9012MNOP3456" 
               (or generate your own)
4. Click: "OK"
5. NEXTAUTH_SECRET should appear in list
```

### STEP 7: Add Setting #3 (NEXTAUTH_URL)
```
1. Click: "+ New application setting"
2. In "Name": Type "NEXTAUTH_URL"
3. In "Value": Type "https://pryysm.app"
4. Click: "OK"
5. NEXTAUTH_URL should appear in list
```

### STEP 8: Add Setting #4 (NODE_ENV)
```
1. Click: "+ New application setting"
2. In "Name": Type "NODE_ENV"
3. In "Value": Type "production"
4. Click: "OK"
5. NODE_ENV should appear in list
```

### STEP 9: Save All Settings
```
1. At TOP of page, find: [Save] button
2. Click: [Save]
3. Dialog appears asking to confirm
4. Click: [Continue]
5. Wait for confirmation message
6. Status bar shows: "Successfully updated application settings"
```

### STEP 10: Restart App Service
```
1. At TOP of page, find: [Restart] button
2. Click: [Restart]
3. Dialog asks to confirm restart
4. Click: [Yes] or [Restart] button
5. Status changes to "Restarting..."
6. Wait 2-3 minutes for restart to complete
7. Status changes back to "Running"
```

### STEP 11: Test Application
```
1. Open new browser window/tab
2. Go to: https://pryysm.app
3. Wait for page to load
4. Expected: Home page loads, no error
5. If error: Check troubleshooting section below
```

---

## ✅ VERIFICATION CHECKLIST

As you complete each step, check it off:

- [ ] Opened https://portal.azure.com
- [ ] Signed in to Azure account
- [ ] Searched for pryysm-v2
- [ ] Clicked on App Service "pryysm-v2"
- [ ] Went to Configuration (Settings → Configuration)
- [ ] Added DATABASE_URL (with SQL credentials)
- [ ] Added NEXTAUTH_SECRET (32-char secret)
- [ ] Added NEXTAUTH_URL (https://pryysm.app)
- [ ] Added NODE_ENV (production)
- [ ] All 4 settings appear in the list
- [ ] Clicked "Save" button
- [ ] Clicked "Continue" to confirm
- [ ] Clicked "Restart" button
- [ ] Waited 2-3 minutes for restart
- [ ] App Service status shows "Running"
- [ ] Tested https://pryysm.app
- [ ] Page loads with no error (200 OK)

---

## 🆘 TROUBLESHOOTING

### Issue #1: Can't find "Configuration"
**Solution**:
```
Left sidebar should show:
  Settings (folder icon)
    ├─ Configuration ← Click here
    ├─ Connection strings
    ├─ General settings
    └─ ...

If not showing, click "Settings" to expand
```

### Issue #2: Don't have SQL username/password
**Solution**:
```
Option A: Find existing credentials
  1. Go to Azure SQL Database "pryysm"
  2. Click "Connection strings"
  3. Copy ADO.NET connection string
  4. Username and password are in that string

Option B: Reset SQL password
  1. Go to SQL Server (pryysm.database.windows.net)
  2. Click "Reset password"
  3. Choose admin user
  4. Enter and confirm new password
  5. Use this new password in DATABASE_URL

Option C: Check GitHub
  1. Go to GitHub → pryysm-v2 repository
  2. Settings → Secrets and variables
  3. Look for DATABASE_URL secret
  4. Copy the value
```

### Issue #3: Getting error "Invalid connection string"
**Solution**:
```
Check DATABASE_URL format:
  ✅ Correct starts with: Server=tcp:pryysm.database.windows.net
  ❌ Wrong: Missing tcp:, port, or credentials
  
Make sure:
  • Starts with: Server=tcp:pryysm.database.windows.net,1433;
  • Has: User ID=username
  • Has: Password=password
  • No trailing spaces
  • All semicolons are there
```

### Issue #4: Still getting "Application Error" after restart
**Solution**:
```
1. Refresh browser (Ctrl+F5 to clear cache)
2. Try private/incognito window
3. Wait another 2 minutes (app might still starting)
4. Check logs:
   - Azure Portal → pryysm-v2 → Log stream
   - Look for error messages
   - Screenshot the error
5. Verify all 4 settings were saved:
   - Go back to Configuration
   - Check all 4 appear in list
   - Check they have correct values
6. Check app restarted:
   - Go to Overview
   - Status should show "Running"
   - Check restart time was recent
```

### Issue #5: Connection timeout errors
**Solution**:
```
This usually means database firewall is blocking:
  1. Go to Azure Portal
  2. Find SQL Server (pryysm.database.windows.net)
  3. Click "Firewalls and virtual networks"
  4. Look for toggle: "Allow Azure services and resources..."
  5. Make sure it's: ON (enabled)
  6. Click "Save"
  7. Try app again
```

---

## 🎯 EXPECTED RESULTS

### Before Fix:
```
https://pryysm.app → 503 Service Unavailable
                  → "Application Error"
                  → Database not connected
```

### After Fix:
```
https://pryysm.app → 200 OK
                  → Home page loads
                  → Database connected ✅
                  → Ready for login/signup
```

---

## 📞 NEXT STEPS

After app is working:

1. ✅ Test home page
2. ✅ Go to /login page
3. ✅ Go to /signup page
4. ✅ Try creating test account
5. ✅ Try logging in
6. ✅ Monitor logs for errors

---

## 📚 RELATED GUIDES

- **VISUAL_GUIDE_ADD_ENVIRONMENT_VARIABLES.md** - Detailed visual walkthrough
- **QUICK_FIX_5_MINUTES.md** - Quick reference card
- **CRITICAL_APPLICATION_ERROR.md** - Full troubleshooting
- **APP_SERVICE_CONFIGURATION_FIX.md** - Alternative instructions

---

## ⏱️ TIME ESTIMATE

- Adding 4 settings: 2 minutes
- Saving and restarting: 3 minutes  
- Total: **5 minutes**

---

## ✨ SUMMARY

1. Go to Azure Portal → pryysm-v2 → Configuration
2. Add 4 environment variables (listed above)
3. Save and restart
4. Test app in 2-3 minutes
5. Everything should work! ✅

---

**Good luck! Your app will be working in 5 minutes.**

Questions? Check the troubleshooting section or see related guides above.
