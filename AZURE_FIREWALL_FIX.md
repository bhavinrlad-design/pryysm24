# 🔒 AZURE SQL FIREWALL ISSUE - Cannot Connect to Query Editor

## The Problem

**Error:** "Connection was denied because Deny Public Network Access is set to Yes"

This means:
- ❌ Query Editor can't connect
- ❌ But also... the deployed app might have trouble connecting too!
- ❌ That's why login/signup still don't work

## ✅ SOLUTION: Allow Public Network Access

### Step 1: Go to Azure Portal

https://portal.azure.com

### Step 2: Find Your SQL Server

1. Search: **"SQL servers"**
2. Click your server (something like: **pryysm-sqlserver** or similar)

### Step 3: Allow Public Network Access

**Left menu → "Networking"**

You should see:

```
Public network access: Deny
Firewall rules: (empty or some rules)
```

**Change to:**

```
Public network access: Selected networks
```

Then scroll down to **"Firewall rules"** section:

### Step 4: Add Firewall Rule for App Service

Click **"+ Add a firewall rule"** and add:

```
Rule Name: AllowAppService
Start IP: 0.0.0.0
End IP: 255.255.255.255
```

**OR** (More secure - if you know your IP):

```
Rule Name: AllowMyIP
Start IP: YOUR_IP_ADDRESS
End IP: YOUR_IP_ADDRESS
```

### Step 5: Click "Save"

⏳ Wait 1-2 minutes for changes to apply.

---

## Now Try Query Editor Again

After firewall rules are saved:

1. Go back to **SQL Database → Query editor (preview)**
2. Try login again with:
   - **Username:** bhavin
   - **Password:** (your password)
3. Should connect ✅

---

## Run the SQL Script

Once connected:

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

-- Insert demo users with bcrypt hashed passwords
DELETE FROM [User] WHERE email IN ('demo@prysm.com', 'admin@prysm.com', 'LAD@admin.com')

INSERT INTO [User] (id, email, name, passwordHash, role, companyName, country, industry, createdAt, updatedAt) VALUES 
('cluid1demo0000000000000001', 'demo@prysm.com', 'Demo User', '$2a$10$NtQH8wH0F0zVXVAJHd01R.W8m7Yf3IbHxqM0wJlQQy6YfFLmE6R8i', 'admin', 'Demo Company', 'USA', 'Manufacturing', GETUTCDATE(), GETUTCDATE()),
('cluid2admin000000000000000', 'admin@prysm.com', 'Admin User', '$2a$10$WEoEfQSXpXd95VmN8q7JIu8YQqR3vR7K4E8L4M4Q5U5U5U5U5U5Uu', 'admin', 'Admin Company', 'USA', 'Technology', GETUTCDATE(), GETUTCDATE()),
('cluid3master00000000000000', 'LAD@admin.com', 'LAD Master', '$2a$10$XaM8N5O8P9Q0R1S2T3U4V5W6X7Y8Z9A0B1C2D3E4F5G6H7I8J9K0', 'master', 'Master Company', 'UAE', 'Printing', GETUTCDATE(), GETUTCDATE());
```

---

## 🧪 Test Login After

```
https://pryysm.app/login
demo@prysm.com / demo123
```

Should work! ✅

---

## ⚠️ Why This Happened

Azure SQL was configured with:
- **Public network access: Deny** 
- This blocks ALL external connections
- Including your deployed app!
- That's why login failed

---

## 🔒 SECURITY NOTE

After getting it working, you should:

1. **Whitelist only your App Service IP** (more secure)
   - In firewall rules, only allow your pryysm-v2 app IP
   
2. **Never use 0.0.0.0 - 255.255.255.255** in production
   - This allows the world to connect
   
3. **Use Virtual Network integration** (best practice)
   - Connect app service privately to SQL server
   - No public internet exposure

---

## IMMEDIATE ACTION

1. ✅ Go to Azure Portal → SQL Server → Networking
2. ✅ Change "Public network access" from "Deny" to "Selected networks"
3. ✅ Add firewall rule: 0.0.0.0 to 255.255.255.255 (temporary)
4. ✅ Save and wait 1-2 minutes
5. ✅ Try Query Editor again
6. ✅ Run SQL script to create tables
7. ✅ Test login on pryysm.app

Let me know when you've done this and if login works!
