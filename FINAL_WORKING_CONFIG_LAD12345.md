# ✅ COMPLETE WORKING CONFIGURATION - COPY PASTE READY

**New SQL Password**: `Lad12345`

---

## 🚀 YOUR 4 ENVIRONMENT VARIABLES (Ready to Copy-Paste)

Copy each value EXACTLY as shown below.

### 1️⃣ DATABASE_URL
**Name**: `DATABASE_URL`

**Value** (COPY ENTIRE LINE):
```
Server=tcp:pryysm.database.windows.net,1433;Initial Catalog=pryysm;Persist Security Info=False;User ID=bhavin;Password=Lad12345;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
```

---

### 2️⃣ NEXTAUTH_SECRET
**Name**: `NEXTAUTH_SECRET`

**Value**:
```
873110d5-58fcf1130967f9ec80cf13f
```

---

### 3️⃣ NEXTAUTH_URL
**Name**: `NEXTAUTH_URL`

**Value**:
```
https://pryysm.app
```

---

### 4️⃣ NODE_ENV
**Name**: `NODE_ENV`

**Value**:
```
production
```

---

## 📋 STEP-BY-STEP SETUP (10 minutes)

### **STEP 1: Delete Old Settings (2 minutes)**

1. Open Azure Portal: https://portal.azure.com
2. Search: **"pryysm"**
3. Click: **App Services → pryysm**
4. Left Menu: Click **"Configuration"**
5. Find these settings and **DELETE each one**:
   - ❌ Delete `DATABASE_URL` (click the trash icon)
   - ❌ Delete `NEXTAUTH_SECRET`
   - ❌ Delete `NEXTAUTH_URL`
   - ❌ Delete `NODE_ENV`

**After deleting, click SAVE (top right button)**

---

### **STEP 2: Add New Settings (3 minutes)**

1. Click **"New application setting"** button (blue button at top)
2. Fill in the form:
   - **Name**: `DATABASE_URL`
   - **Value**: Paste from above ⬆️
   - Click **OK**

3. Click **"New application setting"** again
   - **Name**: `NEXTAUTH_SECRET`
   - **Value**: `873110d5-58fcf1130967f9ec80cf13f`
   - Click **OK**

4. Click **"New application setting"** again
   - **Name**: `NEXTAUTH_URL`
   - **Value**: `https://pryysm.app`
   - Click **OK**

5. Click **"New application setting"** again
   - **Name**: `NODE_ENV`
   - **Value**: `production`
   - Click **OK**

---

### **STEP 3: Save & Restart (3 minutes)**

1. Click **SAVE** button (top right) ← IMPORTANT!
2. Click **CONTINUE** (in the confirmation dialog)
3. Wait for "Successfully updated" message
4. Click **RESTART** button (top right)
5. Wait 2-3 minutes for app to restart

**Status will show "Restarting..." then "Running"**

---

### **STEP 4: Test (2 minutes)**

1. Open: https://pryysm.app
2. You should see: **Home page loads, NO ERROR**
3. Click on Login/Signup links to verify they work

---

## ✅ VERIFICATION CHECKLIST

After restart:
- [ ] App loads at https://pryysm.app (no "Application Error")
- [ ] Home page is visible
- [ ] Login page accessible
- [ ] Signup page accessible
- [ ] No console errors

---

## 🆘 IF STILL NOT WORKING

If you still see "Application Error", please:

1. Go to **Azure Portal** → **App Services** → **pryysm**
2. Left Menu: Click **"Log stream"**
3. **Copy the error message** you see
4. **Share it with me**

The logs will show exactly what's wrong!

---

## 📝 SUMMARY

- ✅ New password: `Lad12345`
- ✅ 4 environment variables ready
- ✅ Step-by-step instructions provided
- ✅ Expected time: 10 minutes
- ✅ Result: App will be WORKING ✅

**Start with STEP 1 now!** 🚀
