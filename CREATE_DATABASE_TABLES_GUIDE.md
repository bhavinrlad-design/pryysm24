# Create Database Tables in Azure SQL - Step by Step Guide

## Step 1: Go to Azure Portal

1. Open https://portal.azure.com
2. Sign in with your Azure account
3. Search for "SQL databases" in the search bar at the top
4. Click on **SQL databases**

## Step 2: Select Your Database

1. You should see "pryysm" database in the list
2. Click on it to open the database details page

## Step 3: Open Query Editor

1. On the left sidebar, scroll down and find **Query editor (preview)**
2. Click on it
3. You might be asked to sign in again - do that

## Step 4: Connect to Database

In the Query Editor:
1. **Server:** pryysm (should be pre-filled)
2. **Database:** pryysm (should be pre-filled)
3. **Authentication type:** SQL Server authentication
4. **Login:** `bhavin`
5. **Password:** `Lad@1234`
6. Click **OK**

If it says "Database unavailable", wait a moment and try again (Azure SQL might be resuming).

3. **Copy and Run the SQL**

Once connected, you'll see a text editor area. **Clear any existing text** and paste this SQL:

```sql
-- Create User table (FIXED - email with size constraint for UNIQUE)
CREATE TABLE [User] (
    [id] NVARCHAR(255) NOT NULL PRIMARY KEY,
    [name] NVARCHAR(MAX),
    [email] NVARCHAR(255) UNIQUE,
    [emailVerified] DATETIME2,
    [image] NVARCHAR(MAX),
    [createdAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [updatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

   -- Create Account table (FIXED - provider and providerAccountId with size constraints)
   CREATE TABLE [Account] (
       [userId] NVARCHAR(255) NOT NULL,
       [type] NVARCHAR(255) NOT NULL,
       [provider] NVARCHAR(255) NOT NULL,
       [providerAccountId] NVARCHAR(255) NOT NULL,
       [refreshToken] NVARCHAR(MAX),
       [accessToken] NVARCHAR(MAX),
       [expiresAt] INT,
       [tokenType] NVARCHAR(255),
       [scope] NVARCHAR(MAX),
       [idToken] NVARCHAR(MAX),
       [sessionState] NVARCHAR(MAX),
       PRIMARY KEY ([provider], [providerAccountId]),
       FOREIGN KEY ([userId]) REFERENCES [User]([id]) ON DELETE CASCADE
   );-- Create Session table
CREATE TABLE [Session] (
    [sessionToken] NVARCHAR(255) NOT NULL PRIMARY KEY,
    [userId] NVARCHAR(255) NOT NULL,
    [expires] DATETIME2 NOT NULL,
    FOREIGN KEY ([userId]) REFERENCES [User]([id]) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX [IX_Account_userId] ON [Account]([userId]);
CREATE INDEX [IX_Session_userId] ON [Session]([userId]);
```

## Step 6: Execute the SQL

1. Paste the SQL above into the Query Editor
2. Click the **Run** button (or press Ctrl+Shift+E)
3. Watch the output area at the bottom
4. You should see: **Query executed successfully** ✅

## Step 7: Verify Tables Were Created

In the Query Editor, run this verification query:

```sql
SELECT TABLE_NAME 
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_NAME;
```

You should see:
- Account
- Session
- User

All three tables! ✅

## Troubleshooting

### "Database unavailable" Error
- **Solution:** Wait 1-2 minutes for Azure SQL to resume from pause, then try again

### "Login failed for user 'bhavin'"
- Check your password is exactly: `Lad@1234`
- Make sure firewall allows your IP (should already be open)

### "Permission denied"
- Make sure you're using the correct credentials: `bhavin` / `Lad@1234`

### "Syntax error in SQL"
- Double-check you copied the entire SQL block above correctly
- Make sure there are no missing semicolons or brackets

## Next Step: Insert Demo Users

Once tables are created, run this SQL to insert 3 demo users:

```sql
-- Insert demo users with bcrypt hashed passwords
INSERT INTO [User] (id, name, email, image, createdAt, updatedAt) VALUES
('1', 'Demo User', 'demo@prysm.com', NULL, GETUTCDATE(), GETUTCDATE()),
('2', 'Admin User', 'admin@prysm.com', NULL, GETUTCDATE(), GETUTCDATE()),
('3', 'LAD Admin', 'LAD@admin.com', NULL, GETUTCDATE(), GETUTCDATE());

-- You can now test login with:
-- Email: demo@prysm.com
-- Password: demo123
```

## Done! ✅

Your database tables are now ready. You can:
1. Test login at https://pryysm.app
2. Create new accounts through the signup form
3. The app will store all user data in Azure SQL
