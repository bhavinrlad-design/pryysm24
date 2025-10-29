# 📋 HOW TO CHECK AZURE LOGS - VISUAL GUIDE

## The FASTEST Way to Diagnose Your App

---

## METHOD 1: Direct Log Stream (EASIEST)

### Step 1: Open Azure Portal
- Go to: https://portal.azure.com
- Search box: type **"pryysm"**
- Click: **App Service "pryysm"**

### Step 2: Find Logs
In the LEFT MENU, look for:
- 📊 **"Log stream"** OR
- 📊 **"Logs"** 

Click it.

### Step 3: Read the Errors
You'll see real-time output. Look for:
- 🔴 Red text = ERROR
- 🟡 Yellow text = WARNING
- 🟢 Green text = OK

**COPY the error message** and share it with me.

---

## METHOD 2: App Service Logs (MORE DETAILED)

### Step 1: Open App Service
- Azure Portal → Search "pryysm"
- Click **App Service "pryysm"**

### Step 2: Enable Logging
Left menu:
- Click **"App Service logs"**
- Turn ON:
  - ✅ Application Logging (Windows)
  - ✅ Detailed error messages
  - ✅ Failed request tracing
- Click **SAVE**

### Step 3: View Logs
Left menu:
- Click **"Log stream"**
- Watch for errors as the app starts

---

## METHOD 3: Kudu Console (ADVANCED)

If other methods don't show errors:

### Step 1: Open Kudu
- Go to: https://pryysm.scm.azurewebsites.net
- Click: **Debug console** (top menu)
- Choose: **PowerShell**

### Step 2: Navigate to Logs
```
cd D:\home\LogFiles
dir
```

Look for files like:
- `Application_*.log`
- `DetailedErrors\*.html`

### Step 3: Read Errors
```
type Application_*.log
```

---

## WHAT ERRORS MEAN

### ❌ "Cannot find module 'next'"
→ Node modules not installed  
→ **Fix**: Rebuild app from GitHub Actions

### ❌ "ECONNREFUSED" or "Connection refused"
→ Database not reachable  
→ **Fix**: Check DATABASE_URL connection string

### ❌ "Invalid connection string"
→ DATABASE_URL has syntax error  
→ **Fix**: Use exact format provided

### ❌ "NEXTAUTH_SECRET is required"
→ NEXTAUTH_SECRET not set  
→ **Fix**: Add to Configuration, save, restart

### ❌ "Prisma schema not found"
→ Prisma files missing  
→ **Fix**: Check if deployment was complete

### ❌ "Cannot connect to database"
→ SQL credentials wrong  
→ **Fix**: Verify DATABASE_URL has correct password

---

## 🎯 NEXT STEPS

1. **Open Azure Portal** and go to logs
2. **Wait 30 seconds** and watch for errors
3. **Copy any error message** you see
4. **Share the error** in your next message
5. I'll give you the exact fix!

The logs will tell us EXACTLY what's wrong. This is the fastest path to fixing your app! ⚡
