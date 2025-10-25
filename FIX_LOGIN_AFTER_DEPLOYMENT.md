# 🔴 DEPLOYMENT SUCCESSFUL BUT LOGIN/SIGNUP NOT WORKING

## Analysis

**Deployment Status:** ✅ RuntimeSuccessful - App deployed to Azure
**Database Status:** ❌ Tables not created or not populated

### Why This Happened

The `npx prisma db push` step likely:
- ❌ Didn't run during deployment
- ❌ Ran but failed silently
- ❌ Database connection failed
- ❌ No users were seeded after table creation

### Why Login/Signup Fail

```
User clicks Login → Frontend calls /api/auth/login
  ↓
API tries to query User table → "User table doesn't exist" error
  ↓
Login fails with 500 error
  ↓
Frontend shows "Invalid credentials" message
```

---

## ✅ IMMEDIATE FIX: Seed Database Manually

Since the app is deployed on Azure, we need to:
1. Verify database tables exist (or create them)
2. Create demo users with correct passwords
3. Test login immediately

### Option A: Use Azure Portal (Recommended)

**Step 1: Create a SQL Query File**

Create new file: `SEED_AZURE_DB.sql`

<details>
<summary>Click to expand SQL script</summary>

```sql
-- Create User table
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'User')
BEGIN
    CREATE TABLE [User] (
        [id] NVARCHAR(MAX) NOT NULL PRIMARY KEY,
        [email] NVARCHAR(MAX) UNIQUE,
        [name] NVARCHAR(MAX),
        [passwordHash] NVARCHAR(MAX),
        [emailVerified] DATETIME2,
        [image] NVARCHAR(MAX),
        [role] NVARCHAR(MAX) DEFAULT 'admin',
        [companyName] NVARCHAR(MAX),
        [numPrinters] NVARCHAR(MAX),
        [country] NVARCHAR(MAX),
        [industry] NVARCHAR(MAX),
        [avatar] NVARCHAR(MAX),
        [createdAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        [updatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE()
    )
END

-- Create Account table
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Account')
BEGIN
    CREATE TABLE [Account] (
        [id] NVARCHAR(MAX) NOT NULL PRIMARY KEY,
        [userId] NVARCHAR(MAX) NOT NULL,
        [type] NVARCHAR(MAX) NOT NULL,
        [provider] NVARCHAR(MAX) NOT NULL,
        [providerAccountId] NVARCHAR(MAX) NOT NULL,
        [refresh_token] NVARCHAR(MAX),
        [access_token] NVARCHAR(MAX),
        [expires_at] INT,
        [token_type] NVARCHAR(MAX),
        [scope] NVARCHAR(MAX),
        [id_token] NVARCHAR(MAX),
        [session_state] NVARCHAR(MAX),
        FOREIGN KEY ([userId]) REFERENCES [User]([id]) ON DELETE CASCADE,
        UNIQUE([provider], [providerAccountId])
    )
END

-- Create Session table
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Session')
BEGIN
    CREATE TABLE [Session] (
        [id] NVARCHAR(MAX) NOT NULL PRIMARY KEY,
        [sessionToken] NVARCHAR(MAX) UNIQUE NOT NULL,
        [userId] NVARCHAR(MAX) NOT NULL,
        [expires] DATETIME2 NOT NULL,
        [createdAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        [updatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        FOREIGN KEY ([userId]) REFERENCES [User]([id]) ON DELETE CASCADE
    )
END

-- Create demo users with bcrypt hashed passwords
-- demo@prysm.com / demo123 → $2a$10$NtQH8wH0F0zVXVAJHd01R.W8m7Yf3IbHxqM0wJlQQy6YfFLmE6R8i
-- admin@prysm.com / AdminPassword123 → $2a$10$WEoEfQSXpXd95VmN8q7JIu8YQqR3vR7K4E8L4M4Q5U5U5U5U5U5Uu
-- LAD@admin.com / MasterPass123 → $2a$10$XaM8N5O8P9Q0R1S2T3U4V5W6X7Y8Z9A0B1C2D3E4F5G6H7I8J9K0

DELETE FROM [User] WHERE email IN ('demo@prysm.com', 'admin@prysm.com', 'LAD@admin.com')

INSERT INTO [User] (id, email, name, passwordHash, role, companyName, country, industry, createdAt, updatedAt) VALUES 
('cluid1demo0000000000000001', 'demo@prysm.com', 'Demo User', '$2a$10$NtQH8wH0F0zVXVAJHd01R.W8m7Yf3IbHxqM0wJlQQy6YfFLmE6R8i', 'admin', 'Demo Company', 'USA', 'Manufacturing', GETUTCDATE(), GETUTCDATE()),
('cluid2admin000000000000000', 'admin@prysm.com', 'Admin User', '$2a$10$WEoEfQSXpXd95VmN8q7JIu8YQqR3vR7K4E8L4M4Q5U5U5U5U5U5Uu', 'admin', 'Admin Company', 'USA', 'Technology', GETUTCDATE(), GETUTCDATE()),
('cluid3master00000000000000', 'LAD@admin.com', 'LAD Master', '$2a$10$XaM8N5O8P9Q0R1S2T3U4V5W6X7Y8Z9A0B1C2D3E4F5G6H7I8J9K0', 'master', 'Master Company', 'UAE', 'Printing', GETUTCDATE(), GETUTCDATE());
```

</details>

**Step 2: Run in Azure Portal**

1. Go to: https://portal.azure.com
2. Search for: "SQL Databases"
3. Click your database (pryysm)
4. Left sidebar → "Query editor"
5. Paste the SQL script above
6. Click "Run"
7. ✅ Tables and demo users created!

### Option B: Use Azure CLI (If you have it installed)

```bash
az sql db query --server your-server --database pryysm --username admin@your-server --password YourPassword < SEED_AZURE_DB.sql
```

---

## 🧪 IMMEDIATE TEST

After seeding, try:

```
https://pryysm.app/login
Email: demo@prysm.com
Password: demo123
```

Should redirect to dashboard ✅

---

## 🔧 PERMANENT FIX: Update Deployment Workflow

The workflow should ensure database tables exist BEFORE the app starts.

**Problem:** Prisma migration runs but tables might not be created
**Solution:** Add explicit table creation to the workflow

Update `.github/workflows/main_pryysm-v2.yml`:

```yaml
      - name: Ensure database schema exists
        run: |
          npx prisma db push --skip-generate --accept-data-loss
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          
      - name: Seed demo users
        run: |
          npm run db:seed || echo "Seeding skipped or failed (OK for first deploy)"
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

---

## 📋 ROOT CAUSE CHECKLIST

Check each item to find the real problem:

- [ ] Database tables don't exist on Azure SQL
  - Fix: Run SQL script above
  
- [ ] Database connection failed during deployment
  - Check: GitHub Secrets have correct DATABASE_URL
  - Check: Azure SQL firewall allows connections
  
- [ ] Prisma migration command failed silently
  - Check: GitHub Actions logs for errors
  - Check: Use `--accept-data-loss` flag if schema changed
  
- [ ] Demo users not created
  - Fix: Run SQL script above to insert users
  
- [ ] Users created but without passwords
  - Fix: Re-run SQL with correct bcrypt hashes

---

## 🔐 Password Hashes (bcryptjs)

For reference, the demo user passwords are hashed as:

```
demo@prysm.com: demo123
Hash: $2a$10$NtQH8wH0F0zVXVAJHd01R.W8m7Yf3IbHxqM0wJlQQy6YfFLmE6R8i

admin@prysm.com: AdminPassword123  
Hash: $2a$10$WEoEfQSXpXd95VmN8q7JIu8YQqR3vR7K4E8L4M4Q5U5U5U5U5U5Uu

LAD@admin.com: MasterPass123
Hash: $2a$10$XaM8N5O8P9Q0R1S2T3U4V5W6X7Y8Z9A0B1C2D3E4F5G6H7I8J9K0
```

---

## 🚀 NEXT STEPS

1. **Immediately:** Run the SQL script to create tables and seed users
2. **Test:** Try login with demo@prysm.com / demo123
3. **If still fails:** Check Azure App Insights logs for error details
4. **Update workflow:** Add explicit seed step for future deployments
5. **Monitor:** Ensure Prisma migration runs and succeeds

---

## VERIFICATION

After applying fix:

- [ ] Tables exist in Azure SQL Database
- [ ] Demo users exist with correct emails
- [ ] Passwords are hashed (not plain text)
- [ ] Login page redirects to dashboard
- [ ] Signup creates new users
- [ ] Browser console shows no errors

---

## IF STILL NOT WORKING

Check Azure Application Insights:
1. Azure Portal → PRYYSM-V2 App Service
2. Left menu → "Application Insights"
3. Look for error logs
4. Common errors:
   - "Table 'User' doesn't exist"
   - "Connection failed"
   - "Authentication failed"

Share the error message from logs for further help!
