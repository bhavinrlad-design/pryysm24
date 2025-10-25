-- Disable constraints on existing tables
IF OBJECT_ID('[Session]', 'U') IS NOT NULL ALTER TABLE [Session] NOCHECK CONSTRAINT ALL;
IF OBJECT_ID('[Account]', 'U') IS NOT NULL ALTER TABLE [Account] NOCHECK CONSTRAINT ALL;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS [Session];
DROP TABLE IF EXISTS [Account];
DROP TABLE IF EXISTS [User];

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
);

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
);

-- Create Session table
CREATE TABLE [Session] (
    [id] NVARCHAR(50) NOT NULL PRIMARY KEY,
    [sessionToken] NVARCHAR(500) UNIQUE NOT NULL,
    [userId] NVARCHAR(50) NOT NULL,
    [expires] DATETIME2 NOT NULL,
    [createdAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [updatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    FOREIGN KEY ([userId]) REFERENCES [User]([id]) ON DELETE CASCADE
);

-- Insert demo users
INSERT INTO [User] (id, email, name, passwordHash, role, companyName, country, industry, createdAt, updatedAt) 
VALUES 
('cluid1demo0000000000000001', 'demo@prysm.com', 'Demo User', '$2a$10$NtQH8wH0F0zVXVAJHd01R.W8m7Yf3IbHxqM0wJlQQy6YfFLmE6R8i', 'admin', 'Demo Company', 'USA', 'Manufacturing', GETUTCDATE(), GETUTCDATE()),
('cluid2admin000000000000000', 'admin@prysm.com', 'Admin User', '$2a$10$WEoEfQSXpXd95VmN8q7JIu8YQqR3vR7K4E8L4M4Q5U5U5U5U5U5Uu', 'admin', 'Admin Company', 'USA', 'Technology', GETUTCDATE(), GETUTCDATE()),
('cluid3master00000000000000', 'LAD@admin.com', 'LAD Master', '$2a$10$XaM8N5O8P9Q0R1S2T3U4V5W6X7Y8Z9A0B1C2D3E4F5G6H7I8J9K0', 'master', 'Master Company', 'UAE', 'Printing', GETUTCDATE(), GETUTCDATE());

-- Verify
PRINT 'Tables created successfully!';
SELECT 'User table' as [TableName], COUNT(*) as [RowCount] FROM [User]
UNION ALL
SELECT 'Account table', COUNT(*) FROM [Account]
UNION ALL
SELECT 'Session table', COUNT(*) FROM [Session];
