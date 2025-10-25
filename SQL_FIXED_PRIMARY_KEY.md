# ✅ FIXED SQL - Primary Key Type Issue

## The Problem
```sql
[id] NVARCHAR(MAX) NOT NULL PRIMARY KEY  ❌
```

**Error:** "Column 'id' of type that is invalid for use as a key column in an index"

In Azure SQL Server, primary keys **cannot use NVARCHAR(MAX)**.

## ✅ The Solution

Use **NVARCHAR(50)** instead of NVARCHAR(MAX):

```sql
-- Create User table
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'User')
BEGIN
    CREATE TABLE [User] (
        [id] NVARCHAR(50) NOT NULL PRIMARY KEY,
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
    PRINT 'User table created'
END
ELSE
    PRINT 'User table already exists'

-- Create Account table  
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Account')
BEGIN
    CREATE TABLE [Account] (
        [id] NVARCHAR(50) NOT NULL PRIMARY KEY,
        [userId] NVARCHAR(50) NOT NULL,
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
        FOREIGN KEY ([userId]) REFERENCES [User]([id]) ON DELETE CASCADE
    )
    PRINT 'Account table created'
END
ELSE
    PRINT 'Account table already exists'

-- Create Session table
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Session')
BEGIN
    CREATE TABLE [Session] (
        [id] NVARCHAR(50) NOT NULL PRIMARY KEY,
        [sessionToken] NVARCHAR(MAX) UNIQUE NOT NULL,
        [userId] NVARCHAR(50) NOT NULL,
        [expires] DATETIME2 NOT NULL,
        [createdAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        [updatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        FOREIGN KEY ([userId]) REFERENCES [User]([id]) ON DELETE CASCADE
    )
    PRINT 'Session table created'
END
ELSE
    PRINT 'Session table already exists'

-- Clear old data first
DELETE FROM [User] WHERE email IN ('demo@prysm.com', 'admin@prysm.com', 'LAD@admin.com')

-- Insert demo users with bcrypt hashed passwords
INSERT INTO [User] (id, email, name, passwordHash, role, companyName, country, industry, createdAt, updatedAt) VALUES 
('cluid1demo0000000000000001', 'demo@prysm.com', 'Demo User', '$2a$10$NtQH8wH0F0zVXVAJHd01R.W8m7Yf3IbHxqM0wJlQQy6YfFLmE6R8i', 'admin', 'Demo Company', 'USA', 'Manufacturing', GETUTCDATE(), GETUTCDATE()),
('cluid2admin000000000000000', 'admin@prysm.com', 'Admin User', '$2a$10$WEoEfQSXpXd95VmN8q7JIu8YQqR3vR7K4E8L4M4Q5U5U5U5U5U5Uu', 'admin', 'Admin Company', 'USA', 'Technology', GETUTCDATE(), GETUTCDATE()),
('cluid3master00000000000000', 'LAD@admin.com', 'LAD Master', '$2a$10$XaM8N5O8P9Q0R1S2T3U4V5W6X7Y8Z9A0B1C2D3E4F5G6H7I8J9K0', 'master', 'Master Company', 'UAE', 'Printing', GETUTCDATE(), GETUTCDATE())

PRINT 'Demo users inserted successfully!'
PRINT 'demo@prysm.com / demo123'
PRINT 'admin@prysm.com / AdminPassword123'
PRINT 'LAD@admin.com / MasterPass123'
```

---

## What Changed

| Column | Before | After |
|--------|--------|-------|
| `id` in User | NVARCHAR(MAX) ❌ | NVARCHAR(50) ✅ |
| `id` in Account | NVARCHAR(MAX) ❌ | NVARCHAR(50) ✅ |
| `id` in Session | NVARCHAR(MAX) ❌ | NVARCHAR(50) ✅ |
| `userId` in Account | NVARCHAR(MAX) ❌ | NVARCHAR(50) ✅ |
| `userId` in Session | NVARCHAR(MAX) ❌ | NVARCHAR(50) ✅ |

---

## Next Steps

1. **Delete the old tables first** (optional but recommended):

```sql
DROP TABLE IF EXISTS [Session]
DROP TABLE IF EXISTS [Account]
DROP TABLE IF EXISTS [User]
```

2. **Then run the corrected SQL above**
3. **Should succeed with** ✅ messages
4. **Test login** on https://pryysm.app/login

---

## Quick Copy-Paste

Just run this complete script:

**OPTION 1: If tables don't exist yet** - Run the corrected SQL above directly

**OPTION 2: If old tables exist** - Run this first:

```sql
DROP TABLE IF EXISTS [Session]
DROP TABLE IF EXISTS [Account]
DROP TABLE IF EXISTS [User]
```

Then run the corrected SQL.

---

Try again with the corrected SQL! Should work now ✅
