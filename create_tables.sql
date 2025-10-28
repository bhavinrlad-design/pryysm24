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
);

-- Create Session table
CREATE TABLE [Session] (
    [sessionToken] NVARCHAR(255) NOT NULL PRIMARY KEY,
    [userId] NVARCHAR(255) NOT NULL,
    [expires] DATETIME2 NOT NULL,
    FOREIGN KEY ([userId]) REFERENCES [User]([id]) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX [IX_Account_userId] ON [Account]([userId]);
CREATE INDEX [IX_Session_userId] ON [Session]([userId]);
