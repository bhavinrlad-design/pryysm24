# 🐛 LOGIN & SIGNUP TROUBLESHOOTING GUIDE

## ✅ Status: DEV SERVER IS RUNNING!

Your development server is now running at: **http://localhost:3000/login**

---

## 🔍 What I Found & Fixed

### ✅ Database Seeding - CONFIRMED WORKING
```
✅ Demo users created successfully:
   - demo@prysm.com / demo123 (admin)
   - admin@prysm.com / AdminPassword123 (admin)
   - LAD@admin.com / MasterPass123 (master)

✅ Database passwords hashed with bcryptjs
✅ All test data seeded (printers, materials, jobs)
```

### ✅ Dev Server - NOW RUNNING
```
✅ Next.js 14.2.33 started
✅ Running at: http://localhost:3000
✅ Environment files loaded: .env.local, .env
✅ Ready in 3.8s
```

---

## 🧪 TEST NOW

### Step 1: Open Login Page
```
URL: http://localhost:3000/login
```

### Step 2: Enter Demo Credentials
```
Email:    demo@prysm.com
Password: demo123
```

### Step 3: Click Sign In
```
Expected: Dashboard loads ✅
```

---

## ❌ IF LOGIN STILL DOESN'T WORK

### Check #1: Browser Console for Errors
```
1. Open: http://localhost:3000/login
2. Press: F12 (open DevTools)
3. Go to: Console tab
4. Look for: Red error messages
5. Screenshot and share the error
```

### Check #2: Network Tab
```
1. Open DevTools → Network tab
2. Try to login
3. Look for: /api/auth/login request
4. Check: Response status (should be 200 OK)
5. Check: Response body (should show user data)
```

### Check #3: Clear Cache
```
1. Close browser completely
2. Delete .next folder:
   rm -r .next
3. Restart dev server:
   npx next dev
4. Hard refresh: Ctrl+Shift+Delete
5. Try login again
```

### Check #4: Check .env.local
```
File: .env.local

Should contain:
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"
AZURE_AD_CLIENT_ID="your-id"
AZURE_AD_TENANT_ID="your-tenant"
AZURE_AD_CLIENT_SECRET="your-secret"

If missing anything, add it!
```

---

## 🔧 COMMON ISSUES & FIXES

### Issue: "Invalid credentials"
```
Problem: Email or password incorrect
Fix: Use exactly: demo@prysm.com / demo123
     (Case-sensitive!)
```

### Issue: "Page keeps spinning"
```
Problem: API call hanging
Fix: 
1. Check browser console (F12)
2. Look for network errors
3. Restart dev server
4. Hard refresh browser
```

### Issue: "Can't connect to localhost:3000"
```
Problem: Dev server not running
Fix:
1. Check terminal is running: npx next dev
2. Should show: "✓ Ready in 3.8s"
3. If not, restart it
```

### Issue: "Database error"
```
Problem: Database not connected
Fix:
1. Run: npm run db:seed
   (This reseeds everything)
2. Then restart dev server
3. Try login again
```

### Issue: "User table missing columns"
```
Problem: Schema not synced
Fix:
1. Run: npx prisma generate
2. Run: npx prisma db push
3. Run: npm run db:seed
4. Restart dev server
```

---

## 🚀 NEXT ACTIONS

### Immediate (Next 5 Minutes)
```
1. ✅ Dev server running at http://localhost:3000
2. ✅ Database seeded with demo users
3. ✅ Test demo login: demo@prysm.com / demo123
4. ✅ Try creating new account at /signup
5. ✅ Share any errors you see
```

### If Still Having Issues
```
1. ✅ Open browser console (F12)
2. ✅ Try login again
3. ✅ Take screenshot of any error messages
4. ✅ Share exact error message
5. ✅ I'll debug further
```

---

## 📋 VERIFICATION CHECKLIST

- [ ] Dev server started: `npx next dev`
- [ ] Terminal shows "Ready in 3.8s"
- [ ] Can access: http://localhost:3000/login
- [ ] Login page displays
- [ ] Form fields visible
- [ ] "Sign In" button clickable
- [ ] Try demo login: demo@prysm.com
- [ ] Enter password: demo123
- [ ] Click: Sign In
- [ ] Either: See dashboard OR see error (let me know what!)

---

## 📞 DEBUGGING HELP

If you see an error:

**Tell me:**
1. Exact error message (from browser console)
2. What page it happens on (/login or /signup)
3. Whether you entered demo credentials or new ones
4. Screenshot of the error

**I'll:**
1. Check API responses
2. Debug the backend
3. Fix the issue
4. Get you back online

---

## ✅ QUICK COMMANDS

```bash
# Restart dev server
npx next dev

# Reseed database
npm run db:seed

# Regenerate Prisma
npx prisma generate

# Sync schema
npx prisma db push

# View database
npx prisma studio

# Build for production
npm run build
```

---

## 🎯 EXPECTED BEHAVIOR

### Login with Demo Account
```
1. Open /login
2. Enter: demo@prysm.com / demo123  
3. Click: Sign In
4. ✅ See dashboard
5. ✅ Can logout
6. ✅ Can login again
```

### Create New Account
```
1. Open: /signup
2. Fill form with your email
3. Enter password (6+ chars)
4. Click: Create Account
5. ✅ Auto-login to dashboard
6. ✅ Can logout
7. ✅ Can login with new credentials
```

---

## 🔒 Security

Your demo credentials are:
- **Email:** demo@prysm.com
- **Password:** demo123
- **Role:** admin

Do NOT share these publicly!

---

## 📱 Browser Testing

Test on:
- ✅ Chrome/Chromium (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

---

**Status: ✅ DEV SERVER RUNNING & READY!**

**Next Step: Try logging in at http://localhost:3000/login**

Let me know what happens! 🚀
