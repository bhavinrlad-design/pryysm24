# 🔧 Sign Up & Demo Login Troubleshooting

## Common Issues & Solutions

### Issue 1: "User not found" or "Authentication failed" on signup

**Possible Causes:**
1. ❌ Prisma client not generated for SQL Server
2. ❌ Database connection string incorrect
3. ❌ User table doesn't exist in database
4. ❌ Bcryptjs not installed correctly

**Solutions:**

```bash
# Step 1: Regenerate Prisma client
npx prisma generate

# Step 2: Verify database connection
npx prisma db push

# Step 3: Check if User table exists
npx prisma studio
# Look for User table - if missing, run migrations
```

---

### Issue 2: Demo login button not working

**Possible Causes:**
1. ❌ Demo user not seeded in database
2. ❌ Password hash mismatch
3. ❌ Frontend state not syncing
4. ❌ Router navigation timing issue

**Solutions:**

```bash
# Seed demo user with correct bcryptjs hash
npm run db:seed

# If seed script doesn't work, manually create via Prisma Studio
npx prisma studio
# Add new User record:
# email: demo@prysm.com
# password: demo123 (will be hashed)
# name: Demo User
# role: admin
```

---

### Issue 3: "Failed to fetch" on login/signup

**Possible Causes:**
1. ❌ API endpoint not working
2. ❌ CORS issue
3. ❌ Server error (500)
4. ❌ Database connection timeout

**Solutions:**

```bash
# 1. Check API endpoint exists
curl https://pryysm.app/api/auth/login -X OPTIONS

# 2. Check server logs
# Azure Portal → App Service → Log Stream

# 3. Test database connection directly
# From local machine to Azure SQL:
sqlcmd -S server.database.windows.net \
  -U admin@server \
  -P password \
  -d pryysm \
  -Q "SELECT COUNT(*) FROM [User]"
```

---

### Issue 4: Password hashing fails

**Possible Causes:**
1. ❌ bcryptjs not installed
2. ❌ bcryptjs version mismatch
3. ❌ Incorrect salt rounds

**Solutions:**

```bash
# Reinstall bcryptjs
npm uninstall bcryptjs
npm install bcryptjs@2.4.3

# Verify installation
npm list bcryptjs
# Should show: bcryptjs@2.4.3

# Test hashing locally
node -e "
const bcrypt = require('bcryptjs');
bcrypt.hash('demo123', 10).then(hash => {
  console.log('Hash:', hash);
  bcrypt.compare('demo123', hash).then(result => {
    console.log('Matches:', result);
  });
});
"
```

---

## 🚨 Complete Fix Procedure

### Step 1: Fix Prisma Configuration

```bash
# Go to your project
cd d:\Pryysm-v2\pryysm-v2-3dprint

# Regenerate Prisma
npx prisma generate

# Verify schema is correct
cat prisma/schema.prisma | grep "provider ="
# Should output: provider = "sqlserver"
```

### Step 2: Ensure Database Tables Exist

```bash
# Push schema to database (creates tables if missing)
npx prisma db push --force-reset

# Or run migrations
npx prisma migrate deploy
```

### Step 3: Seed Demo User

```bash
# Run seed script with bcryptjs hashing
npm run db:seed

# If error, check seed.ts file
cat prisma/seed.ts
```

### Step 4: Test Authentication Locally

```bash
# Start development server
npm run dev

# Test signup at http://localhost:3000/signup
# Test login at http://localhost:3000/login
# Try demo@prysm.com / demo123
```

### Step 5: Deploy to Production

```bash
# Commit changes
git add .
git commit -m "Fix authentication and database setup"

# Push to trigger deployment
git push origin new-main

# GitHub Actions will:
# 1. Build application
# 2. Run migrations
# 3. Deploy to Azure
# 4. Database ready with tables
```

---

## 📋 Debugging Checklist

- [ ] Prisma client generated (`npx prisma generate`)
- [ ] Database connection string correct (check GitHub Secret)
- [ ] User table exists (`npx prisma db push`)
- [ ] Demo user seeded (`npm run db:seed`)
- [ ] bcryptjs installed (`npm list bcryptjs`)
- [ ] API endpoints responding (check /api/auth/login)
- [ ] Browser console shows no errors (F12)
- [ ] Network tab shows successful API response

---

## 🔍 Check Production Logs

```
Azure Portal
  → App Services
    → pryysm (your app)
      → Monitor
        → Log Stream
```

Look for errors like:
- "Cannot find module '@prisma/client'"
- "User table not found"
- "ECONNREFUSED" (database connection failed)
- "Authentication error"

---

## 📞 If Still Not Working

1. **Open browser console** (F12)
2. **Go to /login** or **/signup**
3. **Try signup/login**
4. **Copy any red error messages**
5. **Check Azure logs** for backend errors
6. **Tell me:**
   - Exact error message
   - Browser console errors
   - Azure log errors

---

## ✅ What Working Authentication Looks Like

### Sign Up Flow:
```
1. User fills form
2. POST /api/auth/signup
3. Creates User in database
4. Bcryptjs hashes password (100ms)
5. Returns user data (201)
6. Frontend stores in localStorage
7. Redirects to /dashboard
```

### Login Flow:
```
1. User enters credentials
2. POST /api/auth/login
3. Queries database for user
4. Verifies password hash
5. Returns user data (200)
6. Frontend stores in localStorage
7. 150ms delay for state sync
8. router.push('/dashboard')
```

### Demo Login:
```
1. Click "Demo Login" button
2. API finds demo@prysm.com user
3. Password "demo123" verified
4. Redirects to /dashboard
5. Shows demo data
```

---

## 🎯 Most Common Fix

**99% of signup/login issues are caused by:**

1. **Prisma not regenerated** for SQL Server
   ```bash
   npx prisma generate
   ```

2. **User table doesn't exist**
   ```bash
   npx prisma db push
   ```

3. **Demo user not seeded**
   ```bash
   npm run db:seed
   ```

Try these 3 commands and test again!

