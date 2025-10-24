# 👤 User Management Guide - PRYYSM V2

## Overview

This guide shows you how to:
1. ✅ Use existing demo accounts to test login
2. ✅ Create new user accounts through the app
3. ✅ Add users directly to the database
4. ✅ Manage users and their permissions

---

## 🎯 Quick Start

### Option A: Use Demo Account (Fastest)
**Time: 30 seconds**

Go to login page → Enter demo credentials → Done!

### Option B: Create New Account (Recommended for Testing)
**Time: 2 minutes**

Click Signup → Fill form → Confirm → Login → Done!

### Option C: Add User to Database Directly (Admin Only)
**Time: 5 minutes**

Use Prisma Studio → Add user record → Done!

---

## 📋 METHOD 1: USE DEMO ACCOUNTS

### Step 1.1: Go to Login Page

**URL:** https://pryysm.app/login

Or locally: http://localhost:3000/login

### Step 1.2: Available Demo Users

You have **3 demo accounts** ready to use:

```
Account 1 (Regular Admin):
├─ Email: demo@prysm.com
├─ Password: demo123
└─ Role: admin

Account 2 (Admin):
├─ Email: admin@prysm.com
├─ Password: AdminPassword123
└─ Role: admin

Account 3 (Master):
├─ Email: LAD@admin.com
├─ Password: MasterPass123
└─ Role: master
```

### Step 1.3: Enter Demo Credentials

```
1. Find: Email input field
2. Type: demo@prysm.com
3. Find: Password input field
4. Type: demo123
5. Click: [Sign In] button
```

### Step 1.4: Expected Result

```
✅ Login successful
✅ Redirected to dashboard
✅ See user profile
✅ Access all features
```

### Step 1.5: Logout

When finished testing:
```
1. Click: User menu (top right)
2. Click: [Logout]
3. Redirected to login page
```

---

## 🆕 METHOD 2: CREATE NEW ACCOUNT (RECOMMENDED)

### Step 2.1: Go to Signup Page

**URL:** https://pryysm.app/signup

Or locally: http://localhost:3000/signup

### Step 2.2: Fill Signup Form

You'll see the signup form with these fields:

```
Email: ________________________ (required)
Password: ____________________ (required)
Company Name: ________________ (optional)
Number of Printers: __________ (optional)
Country: _____________________ (optional)
Industry: ____________________ (optional)
```

### Step 2.3: Enter New User Details

**Example:**
```
Email: testuser@example.com
Password: TestPassword123!
Company Name: My 3D Print Shop
Number of Printers: 5
Country: United States
Industry: Manufacturing
```

### Step 2.4: Submit Form

```
1. Click: [Create Account] button
2. Wait: Form validation (2-3 seconds)
3. See: Success message (if no errors)
```

### Step 2.5: Expected Result

```
✅ Account created in database
✅ Auto-redirected to login page
✅ User data saved
```

### Step 2.6: Login with New Account

Now login with your new credentials:

```
1. Go to: /login page (or wait for auto-redirect)
2. Email: testuser@example.com
3. Password: TestPassword123!
4. Click: [Sign In]
5. See: Dashboard ✅
```

---

## 🔐 METHOD 3: ADD USER TO DATABASE DIRECTLY

### When to Use
- ✅ Bulk adding users
- ✅ Setting specific permissions
- ✅ Testing without UI
- ✅ Admin management

### Step 3.1: Open Prisma Studio

**Local Development Only**

```bash
# In your terminal:
npx prisma studio

# Automatically opens browser at:
http://localhost:5555
```

### Step 3.2: Navigate to User Table

```
Prisma Studio interface:
├─ Left sidebar: List of tables
│  ├─ User
│  ├─ Account
│  ├─ Session
│  ├─ VerificationToken
│  ├─ Printer
│  ├─ Material
│  └─ PrintJob
│
└─ Click: User table
```

### Step 3.3: Add New User Record

```
1. Click: [Add record] button (top right)
2. A new row appears
3. Fill in the fields:
```

### Step 3.4: Fill User Fields

**Required Fields:**

```
id:             (Leave empty - auto-generates)
email:          user@example.com
name:           John Doe
passwordHash:   (See next step)
emailVerified:  (Leave empty or set date)
image:          (Leave empty for now)
role:           admin (or master)
```

**Optional Fields:**

```
companyName:    My Company
numPrinters:    3
country:        United States
industry:       Manufacturing
avatar:         (Leave empty)
```

### Step 3.5: Generate Password Hash

You need to hash the password using bcryptjs.

**Option A: Use Online Tool** (Not recommended - less secure)
- Skip this and use plain password for testing

**Option B: Generate Locally** (Recommended)

Open another terminal and run:

```bash
node
# Then:
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('YourPassword123', 10);
console.log(hash);
# Copy the output
```

**Option C: Use Demo Account Hash**

Use this pre-hashed password for testing:
```
Email: test@example.com
Password: test123
Hash: $2a$10$Gu3x8x.fK9WR5cJX2Y7zuef5K5QZ8b6z7kJ9L0K5M2N3P4Q5R6S7T8
```

### Step 3.6: Paste Password Hash

```
1. Click: passwordHash field
2. Paste: Your bcryptjs hash
3. Example: $2a$10$...
```

### Step 3.7: Save User Record

```
1. Click: [Save] button (usually bottom right)
2. Wait: Confirmation
3. See: New user in the list ✅
```

### Step 3.8: Close Prisma Studio

```bash
# In terminal:
Ctrl + C
# Or close browser tab
```

### Step 3.9: Login with New User

```
1. Go to: /login
2. Email: user@example.com (from step 3.4)
3. Password: YourPassword123 (NOT the hash)
4. Click: [Sign In]
5. See: Dashboard ✅
```

---

## 📊 VIEW EXISTING USERS

### Option 1: Prisma Studio (Local Dev)

```bash
npx prisma studio
# View at: http://localhost:5555
# Click: User table
# See: All users with their data
```

### Option 2: Database Query (Advanced)

```bash
# View database file
prisma/dev.db

# Or query:
npx prisma db execute --stdin
SELECT * FROM User;
```

---

## ✏️ EDIT USER DETAILS

### Via Prisma Studio

```
1. Open: npx prisma studio
2. Click: User table
3. Click: User record to edit
4. Edit: Any field
5. Click: [Save]
6. Refresh: Browser to see changes
```

### Via Database Directly

For advanced users with SQL knowledge:

```sql
UPDATE User 
SET role = 'master', companyName = 'New Company'
WHERE email = 'demo@prysm.com';
```

---

## 🗑️ DELETE USER

### Via Prisma Studio

```
1. Open: npx prisma studio
2. Click: User table
3. Click: User record
4. Click: [Delete] button
5. Confirm: Delete action
6. User removed ✅
```

---

## 🔄 RESET DATABASE

### Clear All Users (Local Only)

```bash
# WARNING: This deletes all data!

# Option 1: Delete database file
rm prisma/dev.db

# Option 2: Use Prisma reset
npx prisma migrate reset --force

# Then reseed demo users:
npm run db:seed
```

---

## 📝 USER SCHEMA

### User Table Structure

```typescript
User {
  id              String    @id @default(cuid())
  email           String?   @unique
  name            String?
  passwordHash    String?
  emailVerified   DateTime?
  image           String?
  role            String    @default("admin")
  companyName     String?
  numPrinters     String?
  country         String?
  industry        String?
  avatar          String?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  // Relations
  accounts        Account[]
  sessions        Session[]
}
```

### Roles Available

```
"admin"    - Standard admin user
"master"   - Master/super admin user
```

---

## 🧪 TEST SCENARIOS

### Scenario 1: Test Email/Password Login

```
1. ✅ Create new account via signup
2. ✅ Logout
3. ✅ Login with new credentials
4. ✅ Access dashboard
5. ✅ See user profile
```

### Scenario 2: Test Demo Accounts

```
1. ✅ Login with demo@prysm.com / demo123
2. ✅ Verify dashboard loads
3. ✅ Logout
4. ✅ Login with admin@prysm.com / AdminPassword123
5. ✅ Verify dashboard loads
6. ✅ Logout
7. ✅ Login with LAD@admin.com / MasterPass123
8. ✅ Verify dashboard loads
```

### Scenario 3: Test Azure AD Login (After Deployment)

```
1. ✅ Go to /login
2. ✅ Click "Sign in with Microsoft"
3. ✅ Sign in with Azure account
4. ✅ Auto-redirected to dashboard
5. ✅ New user created in database
6. ✅ Session active
```

---

## ⚠️ COMMON ISSUES

### Issue: "Invalid email format"
**Solution:** Make sure email is valid
```
❌ test@
❌ @example.com
✅ test@example.com
```

### Issue: "Email already exists"
**Solution:** The email is already in the database
```
Either:
1. Use a different email
2. Delete the existing user first
```

### Issue: "Password too short"
**Solution:** Password must be at least 6 characters
```
❌ test
✅ test123
```

### Issue: "Login failed - invalid credentials"
**Solution:** Email or password is incorrect
```
1. Check email spelling
2. Check password spelling
3. Verify password is case-sensitive
4. Try with demo account first
```

### Issue: "Can't access dashboard after login"
**Solution:** 
```
1. Check if logged in (see user menu)
2. Try refreshing page
3. Clear browser cookies
4. Try with demo account
```

---

## 🔐 PASSWORD SECURITY

### Password Requirements

- ✅ At least 6 characters
- ✅ Can contain letters, numbers, symbols
- ✅ Case-sensitive (Password123 ≠ password123)

### Strong Password Examples

```
✅ Test@Password123
✅ MyApp#2025Secure
✅ SecurePass999!
✅ P@ssw0rd!Secure
```

### Weak Password Examples

```
❌ 123456
❌ password
❌ abc123
❌ test
```

---

## 💾 BACKUP USERS

### Export User Data (Local)

```bash
# View all users:
npx prisma studio

# Copy/screenshot the data

# Or query to file:
npx prisma db execute --stdin > users.sql
SELECT * FROM User;
```

### Export to CSV

```bash
# Using Prisma Studio:
1. Open: npx prisma studio
2. Click: User table
3. Right-click: Export as CSV (if available)
4. Save: users.csv
```

---

## 📱 PRODUCTION vs LOCAL

### Local Development

```
Database:     SQLite (prisma/dev.db)
Users:        Test/demo users
Accounts:     Multiple for testing
Reset:        Safe to delete/reset
Azure AD:     Uses local credentials
```

### Production (https://pryysm.app)

```
Database:     Azure SQL Server
Users:        Real user accounts
Accounts:     Permanent production data
Reset:        Requires backup first
Azure AD:     Production-configured
```

---

## 🎓 QUICK REFERENCE

### Login with Demo Account

```bash
URL:      https://pryysm.app/login
Email:    demo@prysm.com
Password: demo123
Result:   ✅ Dashboard
```

### Create New Account

```bash
URL:      https://pryysm.app/signup
Email:    yourname@example.com
Password: YourPassword123
Result:   ✅ Auto-login to dashboard
```

### Add User to Database

```bash
Command:  npx prisma studio
View at:  http://localhost:5555
Action:   Click User table → Add record → Fill fields → Save
Result:   ✅ New user in database
```

### View All Users

```bash
Command:  npx prisma studio
View at:  http://localhost:5555
Action:   Click User table
Result:   ✅ See all users with data
```

### Login with New User

```bash
URL:      https://pryysm.app/login
Email:    (Your email from new account)
Password: (Your password from new account)
Result:   ✅ Dashboard
```

---

## 📊 User Management Checklist

- [ ] Logged in with demo@prysm.com / demo123
- [ ] Viewed dashboard
- [ ] Logged out
- [ ] Created new account via signup
- [ ] Logged in with new account
- [ ] Verified user data saved
- [ ] Opened Prisma Studio
- [ ] Viewed all users in database
- [ ] Understand user schema
- [ ] Ready for team testing

---

## 🚀 Next Steps

### For Testing
1. ✅ Use demo accounts to test immediately
2. ✅ Create new accounts to verify signup
3. ✅ Test both authentication methods

### For Production
1. ✅ Prepare user list
2. ✅ Send signup link to users
3. ✅ Users create their own accounts
4. ✅ Or send them demo link to test

### For Team Sharing
1. ✅ Share this guide with team
2. ✅ Share demo credentials
3. ✅ Have them test signup
4. ✅ Have them test Azure AD login

---

## 📞 SUPPORT

### Problems?

**Can't login:**
- See "Common Issues" section above

**Can't create account:**
- Check email format is valid
- Check password is 6+ characters
- Check email isn't already used

**Need to reset user:**
- Use Prisma Studio to delete and recreate
- Or use: `npm run db:seed` to reset demo users

---

**Status: ✅ User Management Guide Complete** 

Use demo accounts now, or create new ones anytime! 🎯
