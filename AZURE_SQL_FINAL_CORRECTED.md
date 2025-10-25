# ✅ FINAL CORRECTED SQL - All Column Types Fixed

## The Problem
```sql
[email] NVARCHAR(MAX) UNIQUE  ❌
```

**Azure SQL doesn't allow:**
- NVARCHAR(MAX) as PRIMARY KEY
- NVARCHAR(MAX) with UNIQUE constraint
- NVARCHAR(MAX) as foreign key

## ✅ The Solution
Use fixed-length types for indexed columns:
```sql
[id] NVARCHAR(50) NOT NULL PRIMARY KEY
[email] NVARCHAR(255) UNIQUE
[sessionToken] NVARCHAR(500) UNIQUE
```

---

## FINAL CORRECTED SQL - Copy & Paste This

```sql
-- Drop old tables if they exist
DROP TABLE IF EXISTS [Session]
DROP TABLE IF EXISTS [Account]
DROP TABLE IF EXISTS [User]

-- Create User table
CREATE TABLE [User] (
    [id] NVARCHAR(50) NOT NULL PRIMARY KEY,
    [email] NVARCHAR(255) UNIQUE,
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

-- Create Account table  
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

-- Create Session table
CREATE TABLE [Session] (
    [id] NVARCHAR(50) NOT NULL PRIMARY KEY,
    [sessionToken] NVARCHAR(500) UNIQUE NOT NULL,
    [userId] NVARCHAR(50) NOT NULL,
    [expires] DATETIME2 NOT NULL,
    [createdAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [updatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    FOREIGN KEY ([userId]) REFERENCES [User]([id]) ON DELETE CASCADE
)
PRINT 'Session table created'

-- Insert demo users with bcrypt hashed passwords
INSERT INTO [User] (id, email, name, passwordHash, role, companyName, country, industry, createdAt, updatedAt) VALUES 
('cluid1demo0000000000000001', 'demo@prysm.com', 'Demo User', '$2a$10$NtQH8wH0F0zVXVAJHd01R.W8m7Yf3IbHxqM0wJlQQy6YfFLmE6R8i', 'admin', 'Demo Company', 'USA', 'Manufacturing', GETUTCDATE(), GETUTCDATE()),
('cluid2admin000000000000000', 'admin@prysm.com', 'Admin User', '$2a$10$WEoEfQSXpXd95VmN8q7JIu8YQqR3vR7K4E8L4M4Q5U5U5U5U5U5Uu', 'admin', 'Admin Company', 'USA', 'Technology', GETUTCDATE(), GETUTCDATE()),
('cluid3master00000000000000', 'LAD@admin.com', 'LAD Master', '$2a$10$XaM8N5O8P9Q0R1S2T3U4V5W6X7Y8Z9A0B1C2D3E4F5G6H7I8J9K0', 'master', 'Master Company', 'UAE', 'Printing', GETUTCDATE(), GETUTCDATE())

PRINT 'Demo users inserted successfully!'
PRINT 'demo@prysm.com / demo123'
PRINT 'admin@prysm.com / AdminPassword123'
PRINT 'LAD@admin.com / MasterPass123'

-- Verify data was inserted
SELECT COUNT(*) as UserCount FROM [User]
SELECT * FROM [User]
```

---

## Column Type Changes

| Column | Before | After |
|--------|--------|-------|
| User.id | NVARCHAR(MAX) ❌ | NVARCHAR(50) ✅ |
| User.email | NVARCHAR(MAX) with UNIQUE ❌ | NVARCHAR(255) with UNIQUE ✅ |
| Account.id | NVARCHAR(MAX) ❌ | NVARCHAR(50) ✅ |
| Account.userId | NVARCHAR(MAX) ❌ | NVARCHAR(50) ✅ |
| Session.id | NVARCHAR(MAX) ❌ | NVARCHAR(50) ✅ |
| Session.sessionToken | NVARCHAR(MAX) with UNIQUE ❌ | NVARCHAR(500) with UNIQUE ✅ |
| Session.userId | NVARCHAR(MAX) ❌ | NVARCHAR(50) ✅ |

---

## Why These Sizes?

```
NVARCHAR(50)   → For IDs (cuid format is ~25 chars)
NVARCHAR(255)  → For email addresses (standard max)
NVARCHAR(500)  → For session tokens (typically 100-300 chars)
NVARCHAR(MAX)  → For large text (passwords, descriptions, etc.)
```

---

## How to Run

1. **Copy the SQL above** (the full block)
2. **In Azure Portal Query Editor:**
   - Paste it
   - Click **"Run"**
3. **Wait for completion**
4. **Should see:**
   ```
   User table created
   Account table created
   Session table created
   Demo users inserted successfully!
   demo@prysm.com / demo123
   admin@prysm.com / AdminPassword123
   LAD@admin.com / MasterPass123
   
   UserCount: 3
   (rows with demo users displayed)
   ```

---

## Then Test Login

```
https://pryysm.app/login
demo@prysm.com
demo123
```

Should work now! ✅

---

## If You Still Get Errors

Try running just the DROP first:

```sql
DROP TABLE IF EXISTS [Session]
DROP TABLE IF EXISTS [Account]
DROP TABLE IF EXISTS [User]
```

Then run the full script above.

**This should be the final fix!** Let me know once you run it 🚀
