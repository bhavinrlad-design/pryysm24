# 🔴 DIAGNOSE APPLICATION ERROR - STEP BY STEP

Your app restarted but still shows "Application Error". Let's fix this systematically.

---

## STEP 1: Check Azure Logs (CRITICAL)

This will show you the EXACT error message:

1. Go to **Azure Portal** → https://portal.azure.com
2. Search for **"pryysm"** → Click on **App Service "pryysm"**
3. In the left menu, click **"Logs"** (or "Log stream")
4. **IMPORTANT**: Look at the terminal output and COPY the error message
5. Share the error message so we can fix it

⚠️ **THIS IS THE MOST IMPORTANT STEP** - The logs will tell us exactly what's wrong!

---

## STEP 2: Verify Environment Variables Were SAVED

The variables must be **SAVED**, not just added:

1. Go to **App Services** → **pryysm**
2. In left menu: **Configuration**
3. Under **"Application settings"**, verify these 4 exist:
   - ✅ DATABASE_URL
   - ✅ NEXTAUTH_SECRET
   - ✅ NEXTAUTH_URL
   - ✅ NODE_ENV

**If any are MISSING**, add them again using this EXACT format:

### DATABASE_URL (COPY EXACTLY):
```
Server=tcp:pryysm.database.windows.net,1433;Initial Catalog=pryysm;Persist Security Info=False;User ID=bhavin;Password=Lad@1234;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
```

### NEXTAUTH_SECRET:
```
873110d5-58fcf1130967f9ec80cf13f
```

### NEXTAUTH_URL:
```
https://pryysm.app
```

### NODE_ENV:
```
production
```

4. Click **SAVE** (top button)
5. Click **CONTINUE** (in dialog)
6. Click **RESTART** (top button)
7. Wait 2-3 minutes

---

## STEP 3: Check if DATABASE_URL Has a Typo

The DATABASE_URL must have CORRECT format. If you see any of these errors:

- ❌ "invalid connection string"
- ❌ "connection string missing"
- ❌ "database connection error"

**The problem is the DATABASE_URL value.**

Use this EXACT format (copy the whole thing):
```
Server=tcp:pryysm.database.windows.net,1433;Initial Catalog=pryysm;Persist Security Info=False;User ID=bhavin;Password=Lad@1234;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
```

---

## STEP 4: Quick Health Check

After restart completes, test this URL directly:
```
https://pryysm.app
```

You should see:
- ✅ Page loads (no error)
- ✅ Home page content visible
- ✅ Login/Signup links work

---

## MOST COMMON FIXES

### If you see "connection string" error:
- DATABASE_URL is incomplete or has typo
- Use the exact format from STEP 2 above

### If you see "Cannot find module" error:
- Node dependencies not installed
- Contact support - may need to rebuild

### If you see "Prisma" error:
- Database schema missing
- Need to run migrations

### If you see "NEXTAUTH" error:
- NEXTAUTH_SECRET is wrong
- Use exactly: `873110d5-58fcf1130967f9ec80cf13f`

---

## 🆘 WHAT TO DO NOW

1. **Go to Azure Portal Logs** and copy the error message
2. **Share the error message** with me
3. I'll tell you the exact fix

**The logs are your best friend** - they tell us exactly what's broken!

---

## ✅ VERIFICATION CHECKLIST

After all changes:

- [ ] Went to Azure Logs and found error message
- [ ] Verified all 4 environment variables exist in Configuration
- [ ] DATABASE_URL has correct format with credentials
- [ ] Clicked Save → Continue → Restart
- [ ] Waited 2-3 minutes for restart
- [ ] Tested https://pryysm.app

Once you share the error message from logs, we can fix this quickly! 🚀
