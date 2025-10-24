# Production Database Fix - Complete Solution

## Problem Identified

Login/signup was working **locally** but **NOT on production** (pryysm.app). The root cause was that the GitHub Actions deployment workflow was not running database migrations.

### Why Local Worked But Production Didn't

- **Local (SQLite)**: Database was manually created with `npx prisma db push` and seeded with `npm run db:seed`
- **Production (Azure SQL)**: The GitHub Actions workflow ran but **never created the database schema/tables**

This meant production had an empty Azure SQL database with no tables, so authentication queries failed.

## Solution Implemented

### 1. Updated GitHub Actions Workflow
**File**: `.github/workflows/main_pryysm-v2.yml`

Added a critical database migration step between build and deployment:

```yaml
- name: Run Prisma migrations
  run: |
    npx prisma db push --skip-generate --skip-seed
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

This ensures that whenever the app is deployed to production, the database schema is created/updated automatically.

### 2. Added Database Initialization Module
**File**: `lib/db-init.js`

Created a module that:
- Initializes database connection on server startup
- Tests the connection
- Verifies the User table exists
- Logs helpful diagnostics if there are issues

### 3. Updated Server Startup Script
**File**: `server-sync.js`

Modified to:
- Call database initialization before loading Next.js
- Log any database connection warnings (non-fatal)
- Continue server startup even if database check fails (allows graceful degradation)

## How It Works Now

### Deployment Flow
1. **GitHub Action Triggered** - On push to `main` branch
2. **Build Step** - Installs dependencies and builds the Next.js app
3. **Database Migration Step** - **NEW!** Runs `prisma db push` to create/update schema on Azure SQL
4. **Upload Artifact** - Packages the built app
5. **Deploy Step** - Deploys to Azure App Service
6. **Server Starts** - Initializes database connection, then starts HTTP server

### Runtime Flow
1. **Server Starts** - `server-sync.js` runs
2. **Database Init** - Attempts to connect and verify tables
3. **Next.js Load** - Loads the app (if DB init succeeds or fails gracefully)
4. **HTTP Server** - Ready to accept requests

## What Gets Created on Azure SQL

When `prisma db push` runs, it creates:
- `User` table (email, password, role, etc.)
- `Account` table (for OAuth integration)
- `Session` table (for NextAuth sessions)
- `Printer` table (printer inventory)
- `Material` table (printing materials)
- `PrintJob` table (printing history)

## Verification Steps

To verify the fix worked:

1. **Check GitHub Actions**: Go to your GitHub repo → Actions → Check the latest workflow run
   - Should show "Run Prisma migrations" step succeeded
   - Should say "Datasource 'db': SQL Server database 'pryysm' ..."

2. **Test Production Login**: 
   - Visit https://pryysm.app/login
   - Try logging in with a seeded account
   - Should now work (previously showed "invalid email or password")

3. **Check Azure SQL Database**: 
   - In Azure Portal → SQL databases → pryysm
   - Query editor should show the 6 tables exist
   - No more empty database

## GitHub Secrets Required

Make sure these are set in your GitHub repository secrets:
- `DATABASE_URL` - Azure SQL connection string (sqlserver://...)
- `NEXTAUTH_SECRET` - Session encryption key
- `NEXTAUTH_URL` - https://pryysm.app
- `AZUREAPPSERVICE_CLIENTID_...` - Azure AD credentials

## Future Deployments

Going forward, whenever you push to `main`:
1. The workflow will automatically run the migration
2. Any schema changes defined in `prisma/schema.prisma` will be applied
3. No manual database setup needed

## Local Development (No Changes)

Your local development setup remains unchanged:
- Use `npm run dev` to start locally
- Database automatically syncs with `.env` configuration
- Demo users available after `npm run db:seed`

## Files Modified

1. `.github/workflows/main_pryysm-v2.yml` - Added migration step
2. `lib/db-init.js` - New database initialization module
3. `server-sync.js` - Added database init on startup

## Commit Hash

All changes committed: `f247cc3`

## Next Steps if Still Not Working

If login/signup still don't work on pryysm.app:

1. Check GitHub Actions logs for any Prisma errors
2. Verify Azure SQL database connection string in Secrets is correct
3. Check Azure SQL firewall rules allow connection from App Service
4. View App Service logs in Azure Portal → Diagnose and solve problems
5. Check server logs: `npx az webapp log tail --name PRYYSM-V2 --resource-group ...`

## Local Testing Commands

```bash
# Test local deployment process
npm run build
npm start

# Manually run migrations
npx prisma db push

# Check database
npx prisma studio

# Seed demo data
npm run db:seed
```
