# Quick Testing Guide - October 24, 2025

## ✅ Current Status
- **Dev Server**: Running on `http://localhost:3000`
- **Database**: SQLite with demo users seeded
- **Status**: Ready for testing

## Test Login & Signup

### Demo Account (Pre-seeded)
Click the "Demo Login" button on the login page or use:
- **Email**: demo@prysm.com
- **Password**: demo123
- **Expected**: Should navigate to dashboard

### New Account Registration
1. Go to http://localhost:3000/signup
2. Fill in the registration form with:
   - Email: (your test email, e.g., test@example.com)
   - Password: (at least 8 characters)
   - Name: (any name)
   - Optional: Company info
3. Submit
4. **Expected**: Should auto-login and navigate to dashboard

### Admin Account
- **Email**: admin@prysm.com
- **Password**: AdminPassword123
- **Role**: Admin

### Master Account
- **Email**: LAD@admin.com
- **Password**: MasterPass123
- **Role**: Master (should redirect to `/master-admin`)

## Dashboard Verification
After login, verify:
- ✓ Dashboard loads without errors
- ✓ WorkspaceContext provides data
- ✓ Navigation menu appears
- ✓ Orders tab shows order list
- ✓ Other tabs accessible

## Database Location
- **File**: `prisma/prisma/dev.db`
- **Size**: ~86 KB
- **Type**: SQLite3

## If Something Breaks
```bash
# Reset database
npx prisma db push --skip-generate --force-reset

# Reseed with demo data
npm run db:seed

# Restart dev server
npx next dev
```

## Production Build Test
```bash
npm run build
npm start
```

---
**Last Updated**: October 24, 2025  
**Commit**: 29833ec
