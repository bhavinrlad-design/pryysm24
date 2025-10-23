# How to Add Users to Pryysm v2

## 📝 Overview

There are multiple ways to add users to the Pryysm application:

1. **Via Web UI** (Signup Form) - Users self-register
2. **Via Web UI** (Admin Panel) - Admin creates users
3. **Via Database** (Direct SQL) - Direct database insertion
4. **Via Seed Script** (Automation) - Bulk user creation
5. **Via API** (Programmatic) - External applications

## 🌐 Method 1: Self-Registration (Web UI)

### For End Users

**Steps:**
1. Visit `https://your-app.azurewebsites.net/signup`
2. Fill in the registration form:
   - **Name**: Full name
   - **Email**: Valid email address
   - **Password**: Minimum 8 characters
   - **Company Name** (optional): Company name
   - **Country**: Select from dropdown
   - **Industry**: Select from dropdown
   - **Number of Printers** (optional): How many 3D printers
3. Click "Create Account"
4. Account created and automatically logged in
5. Redirected to dashboard

**Requirements:**
- Valid email address
- Password ≥ 8 characters
- Unique email (not already registered)

---

## 👨‍💼 Method 2: Admin Creates Users (Future Feature)

### For Administrators

This feature is planned but not yet implemented. It will allow admins to:
- Add users from admin dashboard
- Set user roles (admin, master)
- Pre-set passwords
- Bulk import users

**Coming Soon!**

---

## 🗄️ Method 3: Direct Database Insertion

### For Database Administrators

#### Using SQL Query

```sql
-- Add a new user directly to database
INSERT INTO "User" (id, email, name, "passwordHash", role, "companyName", country, industry, "createdAt", "updatedAt")
VALUES (
  'clpxxxxxxxxxx',  -- CUID format, you can use NEWID() for GUID
  'john@example.com',
  'John Doe',
  'hashed_password_here',  -- Need bcrypt hash!
  'admin',  -- or 'master' for master admin
  'Acme Corp',
  'USA',
  'Manufacturing',
  GETUTCDATE(),
  GETUTCDATE()
);
```

#### Using Prisma CLI

```bash
# Open Prisma Studio (interactive GUI)
npx prisma studio

# Then in the browser UI:
# 1. Click "User" table
# 2. Click "Add record" button
# 3. Fill in the form:
#    - id: Leave blank (auto-generated)
#    - email: user@example.com
#    - name: User Name
#    - passwordHash: (see next section)
#    - role: admin or master
#    - companyName: Optional
#    - country: Optional
#    - industry: Optional
# 4. Click "Save" button
```

### Getting Hashed Password

You need to generate a bcrypt hash for the password. Here's how:

#### Option A: Using Node.js REPL

```bash
# Open Node REPL
node

# Then type:
const bcrypt = require('bcryptjs');
const password = 'YourPassword123';
bcrypt.hash(password, 10).then(hash => console.log(hash));
```

#### Option B: Using Online Tool

Visit https://bcrypt-generator.com/
1. Enter your password
2. Copy the generated hash
3. Use in database insert

#### Option C: Using Auth API

```bash
# Signup a test user via API
curl -X POST https://your-app.azurewebsites.net/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "TestPassword123",
    "name": "Test User",
    "country": "USA"
  }'

# The password is automatically hashed by the API
```

---

## 🌱 Method 4: Seed Script (Bulk Users)

### Create Multiple Users at Once

#### Step 1: Create Seed File

Edit `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function main() {
  console.log('🌱 Seeding database with users...');

  // Users to create
  const usersToCreate = [
    {
      email: 'demo@prysm.com',
      name: 'Demo User',
      password: 'demo123',
      role: 'admin',
      companyName: 'Demo Company',
      country: 'USA',
      industry: 'Manufacturing',
    },
    {
      email: 'admin@prysm.com',
      name: 'Admin User',
      password: 'AdminPassword123',
      role: 'admin',
      companyName: 'Pryysm Inc',
      country: 'UAE',
      industry: 'Technology',
    },
    {
      email: 'master@prysm.com',
      name: 'Master Admin',
      password: 'MasterPass123',
      role: 'master',
      companyName: 'Pryysm Global',
      country: 'UAE',
      industry: 'Management',
    },
  ];

  // Create each user
  for (const userData of usersToCreate) {
    try {
      // Check if user already exists
      const existing = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (existing) {
        console.log(`✓ User ${userData.email} already exists, skipping...`);
        continue;
      }

      // Hash password
      const passwordHash = await hashPassword(userData.password);

      // Create user
      const user = await prisma.user.create({
        data: {
          email: userData.email,
          name: userData.name,
          passwordHash,
          role: userData.role,
          companyName: userData.companyName,
          country: userData.country,
          industry: userData.industry,
        },
      });

      console.log(`✓ Created user: ${user.email} (${user.role})`);
    } catch (error) {
      console.error(`✗ Error creating user ${userData.email}:`, error);
    }
  }

  console.log('✅ Seeding complete!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

#### Step 2: Run Seed Script

```bash
npm run db:seed
```

#### Expected Output:
```
🌱 Seeding database with users...
✓ Created user: demo@prysm.com (admin)
✓ Created user: admin@prysm.com (admin)
✓ Created user: master@prysm.com (master)
✅ Seeding complete!
```

---

## 🔌 Method 5: API Programmatically

### Create Users via API Calls

#### Using JavaScript/TypeScript

```typescript
// Function to create user via API
async function createUser(userData: {
  email: string;
  password: string;
  name: string;
  companyName?: string;
  country?: string;
  industry?: string;
}) {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (data.success) {
      console.log('✓ User created:', data.user);
      return data.user;
    } else {
      console.error('✗ Error:', data.error);
      return null;
    }
  } catch (error) {
    console.error('✗ API Error:', error);
    return null;
  }
}

// Create multiple users
async function createMultipleUsers() {
  const users = [
    {
      email: 'john@company.com',
      password: 'JohnPassword123',
      name: 'John Smith',
      companyName: 'Company A',
      country: 'USA',
    },
    {
      email: 'jane@company.com',
      password: 'JanePassword123',
      name: 'Jane Doe',
      companyName: 'Company A',
      country: 'USA',
    },
  ];

  for (const user of users) {
    const result = await createUser(user);
    if (result) {
      console.log(`✓ ${result.name} created successfully`);
    }
  }
}

// Run
createMultipleUsers();
```

#### Using cURL

```bash
# Single user creation
curl -X POST https://your-app.azurewebsites.net/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "NewUserPassword123",
    "name": "New User",
    "companyName": "New Company",
    "country": "UAE",
    "industry": "Manufacturing"
  }'

# Response on success (201):
# {
#   "success": true,
#   "user": {
#     "id": "clpxxxxxxxxxx",
#     "email": "newuser@example.com",
#     "name": "New User",
#     "role": "admin",
#     "companyName": "New Company",
#     "country": "UAE"
#   }
# }
```

#### Using Python

```python
import requests
import json

def create_user(email, password, name, company=None, country=None, industry=None):
    url = "https://your-app.azurewebsites.net/api/auth/signup"
    
    payload = {
        "email": email,
        "password": password,
        "name": name,
        "companyName": company,
        "country": country,
        "industry": industry
    }
    
    headers = {"Content-Type": "application/json"}
    
    response = requests.post(url, json=payload, headers=headers)
    data = response.json()
    
    if data['success']:
        print(f"✓ User created: {data['user']['email']}")
        return data['user']
    else:
        print(f"✗ Error: {data['error']}")
        return None

# Create a user
user = create_user(
    email="python@example.com",
    password="PythonPassword123",
    name="Python User",
    company="Python Corp",
    country="USA"
)
```

---

## 👥 User Roles

### Admin Role
- Access to dashboard
- View their own data
- Limited access to app features

### Master Role
- Access to master-admin panel
- View all company data
- Manage other admins
- Full access to all features

### Setting Roles

```sql
-- Make user a master admin
UPDATE "User" 
SET role = 'master' 
WHERE email = 'user@example.com';

-- Make user regular admin
UPDATE "User" 
SET role = 'admin' 
WHERE email = 'user@example.com';
```

---

## ✅ Verification Checklist

After adding a user, verify:

- [ ] User can login with email/password
- [ ] User is redirected to dashboard
- [ ] User profile shows correct info
- [ ] User's company/country data is saved
- [ ] User can logout and login again
- [ ] User data persists in database

---

## 🔍 View All Users

### Via Database

```sql
-- View all users
SELECT 
  id,
  email,
  name,
  role,
  "companyName",
  country,
  "createdAt"
FROM "User"
ORDER BY "createdAt" DESC;

-- Count total users
SELECT COUNT(*) as total_users FROM "User";

-- Find specific user
SELECT * FROM "User" WHERE email = 'user@example.com';
```

### Via Prisma Studio

```bash
npx prisma studio
# Then navigate to User table in browser UI
```

---

## 🗑️ Delete/Update Users

### Delete User

```sql
-- Delete a user (cascade deletes sessions)
DELETE FROM "User" 
WHERE email = 'user@example.com';
```

### Update User Info

```sql
-- Update user profile
UPDATE "User"
SET 
  name = 'New Name',
  "companyName" = 'New Company',
  country = 'New Country'
WHERE email = 'user@example.com';
```

### Change Password

```typescript
// Need to generate new hash
import bcrypt from 'bcryptjs';

const newPassword = 'NewPassword123';
const hash = await bcrypt.hash(newPassword, 10);

// Update in database
UPDATE "User"
SET "passwordHash" = '${hash}'
WHERE email = 'user@example.com';
```

---

## 🐛 Troubleshooting

### "User already exists" Error
- Email is already registered
- Try different email
- Or delete existing user first

### "Invalid email format" Error
- Email must include @ symbol
- Email must have domain (.com, .org, etc.)
- Example: user@company.com ✓

### "Password must be at least 8 characters" Error
- Minimum password length is 8
- Include uppercase, numbers, special chars
- Example: MyPass123 ✓

### Database Connection Error
- Verify DATABASE_URL is set
- Check Azure SQL firewall rules
- Ensure app has database access

### User Can't Login After Creation
- Verify email and password are correct
- Check user role is 'admin' or 'master'
- Verify user exists in database
- Check password hash was created correctly

---

## 📋 User Data Fields

When creating a user, you can set:

| Field | Required | Format | Example |
|-------|----------|--------|---------|
| email | ✓ | Valid email | user@company.com |
| password | ✓ | Min 8 chars | MyPassword123 |
| name | ✓ | Any string | John Doe |
| role | ✗ | 'admin' \| 'master' | admin |
| companyName | ✗ | Any string | Acme Corp |
| country | ✗ | Any string | USA |
| industry | ✗ | Any string | Manufacturing |
| avatar | ✗ | URL | https://example.com/avatar.jpg |

---

## 🚀 Best Practices

1. **Use Strong Passwords**
   - Minimum 8 characters
   - Mix of uppercase, lowercase, numbers
   - Avoid common passwords

2. **Use Real Email Addresses**
   - Enables password reset (future feature)
   - Allows account recovery
   - Professional appearance

3. **Consistent Company Data**
   - Standardize country names
   - Use consistent industry terms
   - Helps with reporting

4. **Regular Backups**
   - Backup database regularly
   - Test backup restoration
   - Document backup process

5. **Monitor User Access**
   - Track login activity
   - Review audit logs (when available)
   - Remove inactive users

---

## 📚 Related Documentation

- [AUTHENTICATION.md](./AUTHENTICATION.md) - Auth system details
- [DATABASE_SETUP.md](./DATABASE_SETUP.md) - Database configuration
- [prisma/schema.prisma](./prisma/schema.prisma) - Database schema

---

## 💡 Quick Commands

```bash
# Open database GUI
npx prisma studio

# Run seed script
npm run db:seed

# Generate new Prisma client
npx prisma generate

# View database migrations
npx prisma migrate status

# Create new migration
npx prisma migrate dev --name add_users
```

---

## 📞 Need Help?

1. Check this guide
2. Review error messages
3. Check authentication logs
4. Verify database connection
5. Contact support team
