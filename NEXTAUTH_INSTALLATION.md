# 📦 Install NextAuth.js Dependencies

## Installation Commands

```bash
# Install NextAuth.js and Azure AD provider
npm install next-auth@beta

# Install Prisma adapter for NextAuth
npm install @auth/prisma-adapter

# Install necessary types
npm install --save-dev @types/next-auth
```

## After Installation

Run these commands to verify:

```bash
# Check installation
npm list next-auth
npm list @auth/prisma-adapter

# Verify build
npm run build
```

## Update Prisma Schema

Add these models to `prisma/schema.prisma`:

```prisma
model Account {
  id                 String  @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String?  @db.Text
  access_token       String?  @db.Text
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String?  @db.Text
  session_state      String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

## Run Migrations

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# View changes
npx prisma studio
```

## Environment Variables

Create or update `.env.local`:

```bash
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret-here"

AZURE_AD_CLIENT_ID="your-client-id"
AZURE_AD_TENANT_ID="your-tenant-id"
AZURE_AD_CLIENT_SECRET="your-client-secret"
```

## Next Steps

1. Run npm install commands above
2. Update prisma/schema.prisma
3. Run migrations
4. Set environment variables
5. Restart development server: `npm run dev`

