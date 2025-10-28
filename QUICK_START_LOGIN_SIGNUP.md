# 🚀 QUICK START: LOGIN/SIGNUP TESTING & DEPLOYMENT

**Time to Get Working**: 30 minutes  
**Difficulty**: Easy ✅

---

## ⚡ FASTEST PATH TO WORKING LOGIN/SIGNUP

### **5-Minute Local Test**

```bash
# 1. Ensure Prisma v6 installed (should already be)
npm list prisma
# Should show: prisma@6.18.0

# 2. Start dev server
npm run dev
# Should say: "ready on ..." (don't close this)

# 3. Open new terminal and test endpoints
# TEST SIGNUP (new user)
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123","name":"Test User"}'

# TEST LOGIN (with that user)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123"}'

# 4. Both should return JSON with user data
# Signup: Status 201
# Login: Status 200
```

**✅ SUCCESS**: You see user data JSON  
❌ **FAIL**: You see error message

---

### **Failure? Run These Checks** (10 minutes)

```bash
# Check 1: Is DATABASE_URL set?
Write-Host $env:DATABASE_URL
# Should show: sqlserver://... or file:../dev.db

# Check 2: Can Prisma connect?
npx prisma db push
# Should show: ✓ Pushed to database successfully

# Check 3: Does dev.db exist?
ls dev.db
# If not, Prisma will create it on next query

# If dev.db doesn't exist, just run the server:
npm run dev
# Prisma auto-creates it
```

---

### **Deploy to Azure** (15 minutes)

```bash
# 1. Verify GitHub Secret
# Go to: GitHub > Settings > Secrets > DATABASE_URL
# Should exist with value: sqlserver://pryysm...

# 2. Verify App Service has DATABASE_URL
az webapp config appsettings list \
  --resource-group pryysm-rg \
  --name pryysm-v2 | grep DATABASE_URL
# Should show the connection string

# 3. Deploy (push code to GitHub)
git add -A
git commit -m "Login/signup ready with Prisma v6"
git push origin main

# 4. Watch deployment
gh run list --repo <your-github-username>/pryysm-v2
# Should show green checkmark ✅

# 5. Test in production
# Navigate to: https://pryysm-v2.azurewebsites.net
# Try signup/login through UI

# 6. Check logs if any issues
az webapp log tail --resource-group pryysm-rg --name pryysm-v2
```

---

## 🔍 COMMON ISSUES & ONE-LINE FIXES

```bash
# "Database connection failed" → Check DATABASE_URL
Write-Host $env:DATABASE_URL

# Can't connect to server → Verify firewall
az sql server firewall-rule list --resource-group pryysm-rg --server pryysm

# App won't start → Restart it
az webapp restart --resource-group pryysm-rg --name pryysm-v2

# Deployment failed → Check GitHub Actions
gh run view <run-id>

# "User already exists" → Normal! Use different email

# Timeout errors → Increase connectionTimeout=60 in DATABASE_URL
```

---

## ✅ DEPLOYMENT READINESS CHECKLIST

Copy/paste these commands to verify everything is ready:

```bash
# 1. Prisma installed?
npm list | grep "prisma@6"
# Expected: Yes (should show 6.18.0)

# 2. Database reachable?
npx prisma db push
# Expected: ✓ Pushed to database successfully

# 3. Build passes?
npm run build
# Expected: Exit Code 0, no errors

# 4. GitHub Secrets set?
gh secret list
# Expected: DATABASE_URL listed

# 5. App Service running?
az webapp show --resource-group pryysm-rg --name pryysm-v2 --query "state"
# Expected: Running

# 6. Firewall allows Azure services?
az sql server firewall-rule list --resource-group pryysm-rg --server pryysm | grep AllowAzureServices
# Expected: Rule exists (0.0.0.0 - 0.0.0.0)

# If all ✅, you're ready to deploy!
```

---

## 📝 TEST CASES

### **Test Case 1: User Signup** ✅
- URL: POST /api/auth/signup
- Payload: Valid email, password 8+ chars, name
- Expected: Status 201, user object returned
- Command:
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"newuser@test.com","password":"MyPassword123","name":"John Doe"}'
```

### **Test Case 2: User Login** ✅
- URL: POST /api/auth/login
- Payload: Email from signup, correct password
- Expected: Status 200, user object returned
- Command:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"newuser@test.com","password":"MyPassword123"}'
```

### **Test Case 3: Invalid Password** ✅
- URL: POST /api/auth/login
- Payload: Email from signup, WRONG password
- Expected: Status 401, error message
- Command:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"newuser@test.com","password":"WrongPassword"}'
```

### **Test Case 4: Duplicate Email** ✅
- URL: POST /api/auth/signup
- Payload: Email that already exists
- Expected: Status 400, "User already exists"
- Command:
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"newuser@test.com","password":"AnotherPassword123","name":"Jane Doe"}'
```

### **Test Case 5: Invalid Email** ✅
- URL: POST /api/auth/signup
- Payload: Email without @domain
- Expected: Status 400, "Invalid email format"
- Command:
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"notanemail","password":"Password123","name":"Test"}'
```

### **Test Case 6: Password Too Short** ✅
- URL: POST /api/auth/signup
- Payload: Password less than 8 characters
- Expected: Status 400, "Password must be at least 8 characters"
- Command:
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Short1","name":"Test"}'
```

---

## 🎯 SUCCESS CRITERIA

✅ **Your login/signup works when:**
1. Signup with new email returns 201 with user data
2. Login with correct credentials returns 200 with user data
3. Login with wrong password returns 401
4. Duplicate signup returns 400
5. Invalid email returns 400
6. Short password returns 400
7. Database connection verified
8. No TypeScript errors in build
9. GitHub Actions passes (green checkmark)
10. Production URL responsive

---

## 📚 MORE DETAILS

**If you need more info, see:**
- `LOGIN_SIGNUP_ERROR_DIAGNOSIS.md` - Complete troubleshooting guide
- `COMPLETE_AZURE_SQL_APP_SERVICE_GUIDE.md` - Full Azure setup and monitoring
- `PRISMA_UPGRADE_FINAL_CHECKLIST.md` - Prisma upgrade details
- `NEXTJS_UPGRADE_ANALYSIS.md` - Next.js version info

---

## 🎉 YOU'RE ALL SET!

**Status**: ✅ READY TO DEPLOY  
**Prisma**: 6.18.0 ✅  
**Build**: PASSING ✅  
**Database**: CONNECTED ✅  
**Firewall**: NEEDS VERIFICATION ⚠️ (See guide if issues)  

**Next Action**: 
```bash
git push origin main
# Watch GitHub Actions turn green ✅
# Test at production URL
# Enjoy working login/signup! 🚀
```

---

**Questions?** See the detailed guides linked above. You've got this! 💪
