# 🔍 Login Issue Troubleshooting Guide

## Problem Description
✅ Signup works successfully  
❌ Login with the same credentials hangs/doesn't navigate

## Root Cause Analysis

The issue is likely one of these:

### 1. **Database Schema Mismatch** (MOST LIKELY)
**Problem**: Prisma schema provider doesn't match production database type
- Local dev: SQLite (file:./prisma/dev.db)
- Production: Azure SQL Server (sqlserver://...)
- **Prisma schema was set to SQLite** but production uses SQL Server!

**Solution**: Changed schema.prisma to use `provider = "sqlserver"` for both environments

---

### 2. **Production DATABASE_URL Not Set Correctly**
**Problem**: GitHub Secret `DATABASE_URL` may not have been injected during build

**Check**:
```bash
# On Azure, check Application Insights → Logs
# Look for connection string errors in logs
```

**Fix**: 
- Go to GitHub Repository → Settings → Secrets and Variables → Actions
- Verify `DATABASE_URL` secret exists
- Make sure it's a valid Azure SQL connection string:
```
sqlserver://server.database.windows.net:1433;database=pryysm;user=admin@server;password=PASSWORD;encrypt=true;trustServerCertificate=false;connection timeout=30;
```

---

### 3. **Prisma Client Not Generated for Production Database**
**Problem**: Next.js build didn't regenerate Prisma client for SQL Server

**Solution**:
```bash
# Delete cache
rm -r node_modules/.prisma

# Regenerate Prisma client
npx prisma generate

# Test connection
npx prisma db push

# Rebuild and deploy
npm run build
git add .
git commit -m "Fix: Regenerate Prisma for SQL Server"
git push
```

---

### 4. **Database Tables Not Created**
**Problem**: Azure SQL database exists but tables not created

**Solution**:
```bash
# Connect to Azure SQL and run migrations
npx prisma migrate deploy

# Or push schema
npx prisma db push

# Verify tables exist
# Use Azure SQL Query Editor or SSMS to check
```

---

### 5. **API Response Error Not Shown in UI**
**Problem**: Login fails silently, no error message

**Solution**: Check browser console for errors:

1. Open https://your-domain.com/login
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Try logging in again
5. Look for red errors like:
   - "Failed to fetch"
   - "User not found"
   - "Invalid password"
   - "Internal server error"

**If you see "Invalid password":**
- Passwords were hashed during signup with bcryptjs
- Make sure signup user exists in database
- Try demo account if available

---

## 🔧 Immediate Actions to Take

### Step 1: Verify Database Connection
```bash
# Check if DATABASE_URL is being used in production
# Look at Azure App Service → Configuration → Application settings
# DATABASE_URL should be listed there
```

### Step 2: Check Production Logs
```
Azure Portal → Your App Service → Monitor → Log Stream
Watch for any errors when you try to login
```

### Step 3: Test Database Directly
```bash
# From local machine, test Azure SQL connection
sqlcmd -S server.database.windows.net -U admin -P password -d pryysm

# Run query
SELECT COUNT(*) FROM [User]

# If 0 users, signup didn't work
```

### Step 4: Verify Prisma Schema
```bash
# Make sure schema.prisma has:
datasource db {
  provider = "sqlserver"
  url      = env("DATABASE_URL")
}

# Check: /prisma/schema.prisma line 7
cat prisma/schema.prisma | head -10
```

---

## 📊 What Should Happen (Login Flow)

```
1. User enters email@example.com and password
   ↓
2. Frontend calls POST /api/auth/login
   ↓
3. API connects to database
   ↓
4. Queries: SELECT * FROM User WHERE email = 'email@example.com'
   ↓
5. Compares password with bcrypt hash
   ↓
6. If match: Returns user data (200 OK)
   If no match: Returns error (401 Unauthorized)
   ↓
7. Frontend receives response
   ↓
8. If success: Stores in localStorage + sets state
   ↓
9. After 150ms delay: router.push('/dashboard')
```

---

## 🚨 Common Error Messages & Solutions

### "User not found"
- Signup didn't save to database
- **Fix**: Try signing up again, check console for errors

### "Invalid password"
- Password mismatch (wrong hash verification)
- **Fix**: Make sure bcryptjs is working correctly

### "Failed to fetch"
- API endpoint not responding
- **Possible causes**:
  - Server error (500)
  - CORS issue
  - Network timeout
- **Fix**: Check Azure logs for errors

### "Internal server error"
- Unhandled exception in login endpoint
- **Fix**: 
  1. Check Azure Application Insights logs
  2. Look for database connection errors
  3. Check if bcryptjs is installed

---

## 🔨 Complete Fix Procedure

### If Nothing Works - Full Database Reset

**On Production (Azure):**

```bash
# 1. Connect to Azure SQL
# 2. Delete tables and recreate

# Via Azure Portal Query Editor:
DROP TABLE [Session];
DROP TABLE [User];

# 3. Redeploy from GitHub (triggers migration)
# 4. Re-seed with test data OR manually create test user
```

**Locally:**

```bash
# 1. Remove old database
rm prisma/dev.db

# 2. Create fresh database
npx prisma migrate dev --name init

# 3. Seed with test data
npm run db:seed

# 4. Test locally
npm run dev
# Visit http://localhost:3000/login
# Try: demo@prysm.com / demo123
```

---

## ✅ Verification Checklist

- [ ] Prisma schema provider is `sqlserver` (not `sqlite`)
- [ ] DATABASE_URL is set in GitHub Secrets
- [ ] .env.production has correct SQL Server connection string
- [ ] Database tables exist in Azure SQL
- [ ] User record exists in User table (from signup)
- [ ] bcryptjs password hash is in passwordHash column
- [ ] Browser console shows API response (not error)
- [ ] /api/auth/login returns 200 with user data
- [ ] localStorage has user data after login
- [ ] ProtectedRoute sees isAuthenticated = true

---

## 📞 Debugging Commands

### Check if database works:
```bash
npx prisma studio
# Opens GUI to view database
# Should see User table with your signup record
```

### Check if API endpoint works:
```bash
# Curl test (from terminal)
curl -X POST https://your-domain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Check production logs:
```bash
# Azure CLI
az webapp log tail --resource-group mygroup --name myapp

# Or Azure Portal → Log Stream
```

---

## 🚀 Next Steps After Fixing

1. Test login with browser console open (F12)
2. Verify user data appears in localStorage
3. Check that dashboard loads
4. Verify user info displays correctly
5. Test logout

---

## Still Stuck?

Check these files:
1. `/app/api/auth/login/route.ts` - API endpoint
2. `/src/lib/auth-service.ts` - Authentication logic
3. `/src/hooks/use-auth.tsx` - Frontend state management
4. `/prisma/schema.prisma` - Database schema
5. Azure Portal → Application Insights → Logs

