# 📖 COMPLETE VISUAL GUIDE - ADD ENVIRONMENT VARIABLES

**Objective**: Add 4 environment variables to Azure App Service  
**Time**: 5 minutes  
**Difficulty**: Easy

---

## 🎬 VIDEO WALKTHROUGH (Text Version)

### PART 1: Open Azure Portal and Navigate to App Service

#### Step 1.1: Go to Azure Portal
```
1. Open browser
2. Go to: https://portal.azure.com
3. Sign in with your Azure account
4. Wait for dashboard to load
```

#### Step 1.2: Search for pryysm-v2
```
1. At the TOP of Azure Portal, find the search bar
2. In the search box, type: pryysm-v2
3. Press Enter
4. You should see search results
5. Look for "App Services" section
6. Click on "pryysm-v2" (the one with icon: ▤)
```

#### Step 1.3: You're Now on the App Service Page
```
You should see:
  • App name: pryysm-v2
  • Left sidebar with options like:
    - Overview
    - Activity log
    - Access control (IAM)
    - Tags
    - Settings (folder icon)
      └─ Configuration ← THIS IS WHAT WE NEED
      └─ Application settings
      └─ Connection strings
```

---

### PART 2: Navigate to Configuration

#### Step 2.1: Click on Configuration
```
LEFT SIDEBAR:
1. Find the "Settings" section
2. Click on "Configuration"
3. Wait for the page to load

You should now see:
  • Application settings tab (should be selected)
  • Connection strings tab
  • A list of existing settings (if any)
  • A button that says "+ New application setting"
```

---

### PART 3: Add the 4 Environment Variables

#### NOW YOU'LL ADD EACH SETTING ONE BY ONE

---

## 🔧 ADD SETTING #1: DATABASE_URL

### Step 3.1: Click "New application setting"
```
Button Location: Top right of the settings list
Look for: "+ New application setting" button
Action: Click it
```

### Step 3.2: A Form Will Appear
```
You should see two input fields:
  ☐ Name
  ☐ Value
```

### Step 3.3: Enter DATABASE_URL Information

**In the "Name" field**, type exactly:
```
DATABASE_URL
```

**In the "Value" field**, paste your Azure SQL connection string:
```
Server=tcp:pryysm.database.windows.net,1433;Initial Catalog=pryysm;Persist Security Info=False;User ID=YOUR_USERNAME;Password=YOUR_PASSWORD;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
```

⚠️ **IMPORTANT**: Replace these with YOUR actual credentials:
- `YOUR_USERNAME` - Your Azure SQL admin username (e.g., `sqladmin`)
- `YOUR_PASSWORD` - Your Azure SQL admin password

### Step 3.4: Click OK Button
```
Bottom right of the form:
  Look for "OK" button
  Click it
```

### Step 3.5: First Setting Added ✅
```
You should see DATABASE_URL appear in the list above
Status: ✅ Added
Next: Add setting #2
```

---

## 🔧 ADD SETTING #2: NEXTAUTH_SECRET

### Step 4.1: Click "New application setting" Again
```
Same button as before: "+ New application setting"
Click it
```

### Step 4.2: Form Appears Again

**In the "Name" field**, type exactly:
```
NEXTAUTH_SECRET
```

**In the "Value" field**, paste a random 32-character secret:
```
GENERATE ONE HERE: https://generate-secret.vercel.app/32
```

**Or paste this example** (you can use this for now):
```
abcd1234EFGH5678ijkl9012MNOP3456
```

⚠️ **BEST PRACTICE**: Use the random generator link above to create your own secret

### Step 4.3: Click OK
```
Bottom right: Click "OK" button
```

### Step 4.4: Second Setting Added ✅
```
You should see NEXTAUTH_SECRET in the list
Status: ✅ Added
Next: Add setting #3
```

---

## 🔧 ADD SETTING #3: NEXTAUTH_URL

### Step 5.1: Click "New application setting" Again

### Step 5.2: Form Appears

**In the "Name" field**, type exactly:
```
NEXTAUTH_URL
```

**In the "Value" field**, type exactly:
```
https://pryysm.app
```

### Step 5.3: Click OK
```
Bottom right: Click "OK" button
```

### Step 5.4: Third Setting Added ✅
```
You should see NEXTAUTH_URL in the list
Status: ✅ Added
Next: Add setting #4 (last one!)
```

---

## 🔧 ADD SETTING #4: NODE_ENV

### Step 6.1: Click "New application setting" Last Time

### Step 6.2: Form Appears

**In the "Name" field**, type exactly:
```
NODE_ENV
```

**In the "Value" field**, type exactly:
```
production
```

### Step 6.3: Click OK
```
Bottom right: Click "OK" button
```

### Step 6.4: Fourth Setting Added ✅
```
You should see NODE_ENV in the list
Status: ✅ All 4 settings added!
```

---

## 💾 SAVE ALL SETTINGS

### Step 7.1: Look at Top of Configuration Page
```
At the VERY TOP of the page, find:
  [Save] button (usually blue/highlighted)
```

### Step 7.2: Click Save
```
Click the "Save" button
```

### Step 7.3: Confirmation Dialog Appears
```
A dialog will appear asking to confirm:
  "Are you sure you want to save changes?"
  
Buttons:
  [Continue] ← Click this
  [Cancel]
```

### Step 7.4: Click Continue
```
Click "Continue" button
Wait for the save to complete
You should see a notification: "Successfully updated application settings"
```

### Step 7.5: Settings Saved ✅
```
Status: ✅ All 4 settings saved
Next: Restart the app
```

---

## 🔄 RESTART THE APP SERVICE

### Step 8.1: Click Restart Button
```
Look at the TOP of the page
Find: [Restart] button (usually red or prominent color)
Click it
```

### Step 8.2: Confirm Restart
```
Dialog appears: "Are you sure you want to restart?"
Click: [Yes] or [Restart]
```

### Step 8.3: App Restarting
```
You'll see status changing:
  "Restarting..."
  
Wait 2-3 minutes
The app will restart with the new environment variables
```

### Step 8.4: Restart Complete ✅
```
Status changes back to "Running"
Your app should now be working!
```

---

## 🧪 TEST THE APPLICATION

### Step 9.1: Test URL
```
Open browser
Go to: https://pryysm.app

Expected result:
  ✅ Page loads (no error)
  ✅ Home page visible
  ✅ No "Application Error" message
  ✅ Status: 200 OK
```

### Step 9.2: If You Get "Application Error"
```
❌ Error still showing?
Try these:
  1. Refresh browser (Ctrl+F5)
  2. Clear browser cache
  3. Open in private/incognito window
  4. Wait another 2 minutes (app might still be starting)
  5. If still failing, see troubleshooting section below
```

### Step 9.3: If It Works! ✅
```
✅ Congratulations!
✅ App is now running
✅ Ready for testing
Next steps:
  • Test login page: https://pryysm.app/login
  • Test signup page: https://pryysm.app/signup
  • Create test account
```

---

## 🆘 TROUBLESHOOTING

### Issue: Can't find "Configuration" in left sidebar

**Solution**:
```
1. Make sure you're on the pryysm-v2 App Service page
2. Look for "Settings" section in left sidebar
3. Click "Settings" to expand it
4. You should see "Configuration" below it
5. Click "Configuration"
```

### Issue: Don't have SQL credentials (DATABASE_URL)

**Solution**:
```
Option A: Find your credentials
  1. Azure Portal → SQL Databases
  2. Find "pryysm" database
  3. Click on it
  4. Look for "Connection strings" button
  5. Copy the ADO.NET (SQL Server) connection string
  6. Note your username and password

Option B: Reset SQL password
  1. Azure Portal → SQL Server (pryysm.database.windows.net)
  2. Left sidebar → "Reset password"
  3. Choose admin user
  4. Set new password
  5. Use this in DATABASE_URL

Option C: Check GitHub Secrets
  1. Go to GitHub → pryysm-v2 repository
  2. Settings → Secrets and variables → Actions
  3. Look for SECRET_DATABASE_URL
  4. Copy the value
```

### Issue: Getting error "Invalid connection string"

**Solution**:
```
Check DATABASE_URL format:
  ✅ Correct: Server=tcp:pryysm.database.windows.net,1433;...
  ❌ Wrong: Server pryysm (missing tcp: and port)
  
Make sure:
  • Replace YOUR_USERNAME with actual username
  • Replace YOUR_PASSWORD with actual password
  • Connection string has no spaces at start/end
  • All special characters are included
```

### Issue: Still getting "Application Error" after adding variables

**Solution**:
```
1. Check all 4 variables are there:
   • DATABASE_URL ✓
   • NEXTAUTH_SECRET ✓
   • NEXTAUTH_URL ✓
   • NODE_ENV ✓

2. Check they were saved:
   • They should appear in the list
   • Source should show "AppSetting"

3. Check app restarted:
   • Click Overview in left sidebar
   • Status should show "Running"
   • Check restart happened ~5 min ago

4. View logs for details:
   • Left sidebar → "Log stream"
   • Look for error messages
   • Screenshot the error
```

---

## 📋 VERIFICATION CHECKLIST

After completing all steps:

- [ ] Opened Azure Portal (portal.azure.com)
- [ ] Searched for and found "pryysm-v2" App Service
- [ ] Navigated to Configuration
- [ ] Added DATABASE_URL (with SQL credentials)
- [ ] Added NEXTAUTH_SECRET (32-char random string)
- [ ] Added NEXTAUTH_URL (https://pryysm.app)
- [ ] Added NODE_ENV (production)
- [ ] Clicked "Save" at top
- [ ] Clicked "Continue" to confirm
- [ ] Clicked "Restart" button
- [ ] Waited 2-3 minutes for restart
- [ ] Tested https://pryysm.app
- [ ] App loads successfully (200 OK, no error)

---

## ✅ SUCCESS CRITERIA

**You've successfully added the environment variables when:**

```
✅ All 4 settings appear in Configuration list
✅ Settings show correct values (Database URL, secrets, etc.)
✅ App Service shows "Running" status
✅ https://pryysm.app returns 200 OK
✅ Home page loads without error
✅ No "Application Error" message
✅ Can navigate to /login and /signup pages
```

---

## 📊 EXPECTED RESULTS AFTER FIX

| What | Before | After |
|-----|--------|-------|
| **Status** | 503 Service Unavailable | 200 OK |
| **Page** | Application Error | Home page |
| **Database** | Can't connect | Connected ✅ |
| **Auth** | Not working | Ready ✅ |
| **Time** | N/A | < 5 min to fix |

---

## 🎉 YOU DID IT!

If you've followed all these steps and the app is now running:

```
✅ Build: SUCCESSFUL
✅ Deployment: SUCCESSFUL  
✅ Configuration: SUCCESSFUL
✅ App: RUNNING

Next: Test login/signup functionality
```

---

**Questions?** Check the troubleshooting section above or see:
- CRITICAL_APPLICATION_ERROR.md
- APP_SERVICE_CONFIGURATION_FIX.md
- APPLICATION_ERROR_TROUBLESHOOTING.md

**Last Updated**: October 29, 2025
