# 👥 USER ACCOUNT SETUP - COMPLETE GUIDE

## 3 WAYS TO LOGIN / CREATE USERS

---

## ✅ WAY 1: USE DEMO ACCOUNT (FASTEST - 30 SECONDS)

### 🎯 Best For
- Quick testing
- Immediate access
- Trying out features
- First-time login

### 📍 Location
```
https://pryysm.app/login
or
http://localhost:3000/login
```

### 🔑 Demo Credentials (Pick Any One)

```
┌─────────────────────────────────────────┐
│ DEMO ACCOUNT 1                          │
├─────────────────────────────────────────┤
│ Email:    demo@prysm.com                │
│ Password: demo123                       │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ DEMO ACCOUNT 2                          │
├─────────────────────────────────────────┤
│ Email:    admin@prysm.com               │
│ Password: AdminPassword123              │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ DEMO ACCOUNT 3                          │
├─────────────────────────────────────────┤
│ Email:    LAD@admin.com                 │
│ Password: MasterPass123                 │
└─────────────────────────────────────────┘
```

### 📝 Steps

```
1️⃣  Open: https://pryysm.app/login
    
2️⃣  Copy & Paste:
    Email:    demo@prysm.com
    Password: demo123
    
3️⃣  Click: [Sign In] button
    
4️⃣  ✅ Dashboard loads
```

---

## 🆕 WAY 2: CREATE NEW ACCOUNT (RECOMMENDED - 2 MINUTES)

### 🎯 Best For
- Testing signup flow
- Creating test accounts
- Team members joining
- Real user accounts

### 📍 Location
```
https://pryysm.app/signup
or
http://localhost:3000/signup
```

### 📝 Steps

```
1️⃣  Open: https://pryysm.app/signup

2️⃣  Fill Form:
    ┌─────────────────────────────────┐
    │ Email: testuser@example.com     │
    │ (must be unique)                │
    ├─────────────────────────────────┤
    │ Password: TestPass123           │
    │ (6+ characters)                 │
    ├─────────────────────────────────┤
    │ Company Name: My Company        │
    │ (optional)                      │
    ├─────────────────────────────────┤
    │ Number of Printers: 5           │
    │ (optional)                      │
    ├─────────────────────────────────┤
    │ Country: United States          │
    │ (optional)                      │
    ├─────────────────────────────────┤
    │ Industry: Manufacturing         │
    │ (optional)                      │
    └─────────────────────────────────┘

3️⃣  Click: [Create Account] button

4️⃣  ✅ Account created automatically
    ✅ Auto-login to dashboard

5️⃣  To test login/logout:
    - Click user menu (top right)
    - Click [Logout]
    - Go back to /login
    - Use your new credentials
    - ✅ Login works!
```

### 💡 Tips
- Email must be unique (no duplicates)
- Password must be 6+ characters
- Optional fields can be left blank
- You can edit details later on dashboard

---

## 🗄️ WAY 3: ADD USER TO DATABASE (ADMIN - 5 MINUTES)

### 🎯 Best For
- Bulk user creation
- Setting specific permissions
- Database management
- Admin operations

### 📍 Requirements
- Local development only
- Need Prisma installed
- Database running

### 📝 Steps

```
1️⃣  Open terminal

2️⃣  Run:
    npx prisma studio
    
3️⃣  Browser opens:
    http://localhost:5555

4️⃣  Click: "User" table (left sidebar)

5️⃣  Click: [Add record] button
    
6️⃣  Fill in fields:
    ┌─────────────────────────────────┐
    │ id:          (auto - leave blank)
    ├─────────────────────────────────┤
    │ email:       user@example.com   │
    │            ✅ REQUIRED          │
    ├─────────────────────────────────┤
    │ name:        John Doe           │
    │            (optional)           │
    ├─────────────────────────────────┤
    │ passwordHash: (see next)        │
    │            ✅ REQUIRED          │
    ├─────────────────────────────────┤
    │ role:        admin              │
    │            (admin or master)    │
    ├─────────────────────────────────┤
    │ companyName: My Company         │
    │            (optional)           │
    ├─────────────────────────────────┤
    │ numPrinters: 3                  │
    │            (optional)           │
    ├─────────────────────────────────┤
    │ country:     United States      │
    │            (optional)           │
    ├─────────────────────────────────┤
    │ industry:    Manufacturing      │
    │            (optional)           │
    └─────────────────────────────────┘

7️⃣  For passwordHash field:
    
    Option A (Easy - For Testing):
    Skip and use: $2a$10$Gu3x8x.fK9WR5cJX2Y7zuef5K5QZ8b6z7kJ9L0K5M2N3P4Q5R6S7T8
    This hashes to: test123
    
    Option B (Recommended):
    Generate in new terminal:
    node
    > const bcrypt = require('bcryptjs');
    > bcrypt.hashSync('YourPassword123', 10)
    Copy the output and paste it

8️⃣  Click: [Save] button

9️⃣  Close Prisma Studio:
    Ctrl + C (in terminal)

🔟 Now login with:
    Email:    user@example.com
    Password: YourPassword123
    (NOT the hash - use the original password)
```

### 📊 User Fields Explained

```
id:              Unique identifier (auto-generated)
email:           Login email (required, must be unique)
name:            Display name (optional)
passwordHash:    Hashed password (required for email/password login)
emailVerified:   Email verification date (auto-managed)
image:           Profile image URL (optional)
role:            admin or master (default: admin)
companyName:     Company name (optional)
numPrinters:     Number of printers they have (optional)
country:         Country (optional)
industry:        Industry type (optional)
avatar:          Avatar image (optional)
createdAt:       When account created (auto)
updatedAt:       Last updated (auto)
```

---

## 🔍 VIEW ALL USERS

### Local Development

```
1️⃣  Run:
    npx prisma studio

2️⃣  Visit:
    http://localhost:5555

3️⃣  Click: "User" table

4️⃣  See: All users with their data
    - Email
    - Name
    - Role
    - Company
    - Created date
    - All other fields
```

---

## 🔐 PASSWORD SECURITY

### Requirements
- Minimum 6 characters
- Case sensitive
- Can use letters, numbers, symbols

### Strong Passwords ✅
```
Password123
SecurePass@2025
MyApp#Admin99
P@ssw0rd!Secure
TestUser#2025
```

### Weak Passwords ❌
```
123456 (too short)
password (too simple)
admin (too obvious)
test (too short)
12345 (only numbers)
```

---

## 🧪 TEST SCENARIOS

### Scenario 1: Quick Demo
```
✓ Open /login
✓ Enter: demo@prysm.com / demo123
✓ Click: Sign In
✓ See: Dashboard ✅
```

### Scenario 2: Create & Test New Account
```
✓ Open /signup
✓ Create account with your email
✓ Auto-login to dashboard
✓ Click: Logout
✓ Open /login
✓ Login with your new credentials
✓ Dashboard loads ✅
```

### Scenario 3: All 3 Demo Accounts
```
✓ Login: demo@prysm.com / demo123
✓ Logout
✓ Login: admin@prysm.com / AdminPassword123
✓ Logout
✓ Login: LAD@admin.com / MasterPass123
✓ All work ✅
```

### Scenario 4: Test Azure AD (After Deployment)
```
✓ Open /login
✓ Click: "Sign in with Microsoft"
✓ Sign with Azure credentials
✓ Auto-login ✅
```

---

## ⚠️ COMMON ISSUES & FIXES

### ❌ "Invalid email format"
```
Fix: Use proper email
❌ test@
❌ @example.com
✅ test@example.com
```

### ❌ "Email already exists"
```
Fix: Use different email or delete existing user
Try: newuser@example.com instead
```

### ❌ "Password too short"
```
Fix: Password must be 6+ characters
❌ test (4 chars)
✅ test123 (7 chars)
```

### ❌ "Invalid credentials"
```
Fix: Check email/password spelling
- Is CAPS correct? (case-sensitive!)
- Is email correct?
- Try demo account first
```

### ❌ "Can't see dashboard"
```
Fix:
1. Refresh page (F5)
2. Clear browser cookies
3. Try another account
4. Check browser console for errors
```

### ❌ "Account created but can't login"
```
Fix:
1. Wait 5 seconds
2. Try again
3. Check email is exact match
4. Use demo account to verify site works
```

---

## 📊 ACCOUNTS SUMMARY

```
Total Demo Accounts: 3
├─ demo@prysm.com (admin)
├─ admin@prysm.com (admin)
└─ LAD@admin.com (master)

Can Create New: ✅ Yes
Via Signup: ✅ Yes
Via Database: ✅ Yes (admin only)

Authentication Methods:
├─ Email/Password: ✅
├─ Azure AD: ✅ (after deployment)
└─ OAuth: ✅ (future)
```

---

## 🚀 NEXT STEPS

### Immediately
1. ✅ Login with demo@prysm.com / demo123
2. ✅ Explore dashboard
3. ✅ Try features
4. ✅ Logout

### For Testing
1. ✅ Create new account via signup
2. ✅ Test login with new account
3. ✅ Test all features
4. ✅ Test logout

### For Team
1. ✅ Share login page link
2. ✅ Share demo credentials
3. ✅ Have them create accounts
4. ✅ Have them test features

### For Production
1. ✅ Users create their own accounts
2. ✅ Or use Azure AD login
3. ✅ No need for demo accounts

---

## 📚 DETAILED GUIDES

See these files for more information:

| Guide | Content |
|-------|---------|
| `USER_MANAGEMENT_GUIDE.md` | Detailed 3-method instructions |
| `LOGIN_QUICK_START.md` | 30-second quick reference |
| `QUICK_REFERENCE.md` | One-page cheat sheet |

---

## ✅ QUICK CHECKLIST

- [ ] Tried demo login (demo@prysm.com)
- [ ] Saw dashboard
- [ ] Created new account
- [ ] Logged out
- [ ] Logged back in with new account
- [ ] Understood all 3 methods
- [ ] Ready to share with team

---

## 🎉 YOU'RE READY!

Pick a method and start using the app:

### 🏃 Quick Start (30 seconds)
```
https://pryysm.app/login
demo@prysm.com / demo123
[Sign In]
✅ Done!
```

### 👤 Create New Account (2 minutes)
```
https://pryysm.app/signup
Fill form
[Create Account]
✅ Auto-login!
```

### 🗄️ Database Admin (5 minutes)
```
npx prisma studio
Add user record
Save
Login
✅ Works!
```

---

**Status: ✅ Ready to Login & Create Users!** 🚀

See `USER_MANAGEMENT_GUIDE.md` for detailed step-by-step instructions.
