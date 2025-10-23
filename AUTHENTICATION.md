# Database-Backed Authentication System

## 🔐 Overview

The Pryysm v2 application now includes a complete database-backed authentication system with secure password hashing, user management, and role-based access control.

## 📋 Architecture

### Components

1. **Prisma Models** (`prisma/schema.prisma`)
   - `User`: Stores user credentials and profile information
   - `Session`: Manages user sessions (for future implementation)

2. **Auth Service** (`src/lib/auth-service.ts`)
   - Password hashing with bcryptjs
   - User validation and authentication
   - User creation and updates
   - Database operations

3. **API Routes**
   - `POST /api/auth/login`: Authenticates users with email/password
   - `POST /api/auth/signup`: Creates new user accounts
   - `POST /api/auth/logout`: Cleans up sessions (if needed)

4. **Auth Context** (`src/hooks/use-auth.tsx`)
   - Manages global authentication state
   - Handles login/signup/logout flows
   - Protects routes via `ProtectedRoute` component

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id            String     @id @default(cuid())
  email         String     @unique
  name          String
  passwordHash  String
  role          String     @default("admin") // admin or master
  companyName   String?
  numPrinters   String?
  country       String?
  industry      String?
  avatar        String?
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  sessions      Session[]
}
```

### Session Model
```prisma
model Session {
  id            String     @id @default(cuid())
  sessionToken  String     @unique
  userId        String
  user          User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  expires       DateTime
  createdAt     DateTime   @default(now())
}
```

## 🔑 Security Features

### Password Security
- **Bcryptjs Hashing**: Passwords hashed with salt (10 rounds)
- **Never Stored**: Original passwords never stored in database
- **Verified**: Compared using `bcrypt.compare()` for authentication

### Validation
- **Email Format**: Validated on signup
- **Password Strength**: Minimum 8 characters
- **Unique Email**: Ensures no duplicate accounts
- **Password Verification**: Secure comparison with hash

### API Security
- Type-safe TypeScript implementation
- Input validation on all endpoints
- Error handling without exposing sensitive info
- HTTP status codes follow REST conventions

## 🚀 Usage

### Frontend - Login

```typescript
import { useAuth } from '@/hooks/use-auth';

export function LoginComponent() {
  const { loginWithEmail } = useAuth();
  
  const handleLogin = async (email: string, password: string) => {
    const success = await loginWithEmail(email, password);
    if (success) {
      // User is authenticated and redirected
    }
  };
  
  return (
    // Your login form
  );
}
```

### Frontend - Signup

```typescript
import { useAuth } from '@/hooks/use-auth';

export function SignupComponent() {
  const { signupWithEmail } = useAuth();
  
  const handleSignup = async (userData: SignupData) => {
    const success = await signupWithEmail({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      companyName: userData.companyName,
      country: userData.country,
      industry: userData.industry,
    });
    if (success) {
      // User is created and authenticated
    }
  };
  
  return (
    // Your signup form
  );
}
```

## 🔌 API Endpoints

### POST /api/auth/login

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "cuid123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "admin",
    "companyName": "Company Inc",
    "country": "USA",
    "industry": "Manufacturing"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "error": "Invalid password"
}
```

### POST /api/auth/signup

**Request:**
```json
{
  "email": "newuser@example.com",
  "password": "securePassword123",
  "name": "Jane Doe",
  "companyName": "New Company",
  "country": "USA",
  "industry": "Technology"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "user": {
    "id": "cuid456",
    "email": "newuser@example.com",
    "name": "Jane Doe",
    "role": "admin",
    "companyName": "New Company"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "User already exists"
}
```

## 🧪 Testing Authentication

### Local Development

1. **Run Prisma Migrations:**
```bash
npx prisma migrate dev --name init
```

2. **Seed Database (Optional):**
```bash
npm run db:seed
```

3. **Test Login:**
- Visit http://localhost:3000/login
- Enter user credentials
- Click "Sign In"

4. **Test Signup:**
- Visit http://localhost:3000/signup
- Fill in registration form
- Click "Create Account"

### Manual API Testing

Using curl or Postman:

```bash
# Test Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'

# Test Signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "SecurePass123",
    "name": "Test User",
    "country": "USA"
  }'
```

## 📊 User Flow

1. **User visits login page** (`/login`)
2. **Enters credentials** (email + password)
3. **Form submits** → `loginWithEmail()` called
4. **Frontend calls** `POST /api/auth/login`
5. **Backend authenticates:**
   - Find user by email
   - Verify password hash
   - Return user data
6. **Frontend stores user** in state + localStorage
7. **Navigation delay** (150ms for state sync)
8. **User redirected** to `/dashboard`
9. **ProtectedRoute** checks `isAuthenticated`
10. **Dashboard loads** with user data

## 🛡️ Protected Routes

Pages automatically protected with `<ProtectedRoute>`:

- `/dashboard` - Main admin dashboard
- `/master-admin` - Master admin panel
- All other app pages except:
  - `/` - Landing page
  - `/login` - Login page
  - `/signup` - Signup page

If unauthenticated users try to access protected routes, they're redirected to `/login`.

## ⚙️ Configuration

### Environment Variables

Set in GitHub Secrets or `.env.production`:

```bash
DATABASE_URL="sqlserver://server.database.windows.net:1433;database=pryysm;user=admin;password=pwd;..."
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-app.azurewebsites.net/api
```

### Password Hashing

Current configuration in `auth-service.ts`:
- **Algorithm**: bcryptjs
- **Salt Rounds**: 10
- **Time Complexity**: ~100ms per hash

To adjust: Update `bcrypt.genSalt(10)` to desired rounds.

## 📱 Frontend Components

### Login Page (`app/login/page.tsx`)
- Email/password form
- Show/hide password toggle
- Demo login button (for testing)
- Sign up link
- Styled with inline CSS

### Signup Page (`app/signup/page.tsx`)
- Full registration form
- Country/industry dropdowns
- Password validation feedback
- Success screen with redirect

## 🔄 State Management

### Auth Context Flow

```
User logs in
    ↓
loginWithEmail() → API call → Database check
    ↓
handleUser() → setUser() (React state + localStorage)
    ↓
navigateAfterLogin() → 150ms delay → router.push()
    ↓
ProtectedRoute checks isAuthenticated
    ↓
Dashboard loads with user data
```

## 🐛 Troubleshooting

### "User not found"
- Verify email is correct
- Check if user exists in database
- Create user via signup if needed

### "Invalid password"
- Verify password is correct
- Check password is not exceeding length limits
- Ensure no extra spaces

### "User already exists"
- Email already registered
- Try login instead
- Use password reset if available

### Database Connection Error
- Verify `DATABASE_URL` is set correctly
- Check firewall rules allow connection
- Ensure Azure SQL database is running

### API Returns 500 Error
- Check server logs
- Verify Prisma client is initialized
- Ensure migrations are applied

## 📚 Files Structure

```
src/
├── lib/
│   └── auth-service.ts          # Password hashing, DB operations
├── hooks/
│   └── use-auth.tsx              # Auth context and state
├── components/
│   └── auth/
│       └── protected-route.tsx   # Route protection
app/
├── api/
│   └── auth/
│       ├── login/route.ts        # Login endpoint
│       └── signup/route.ts       # Signup endpoint
├── login/page.tsx                # Login page UI
├── signup/page.tsx               # Signup page UI
└── dashboard/page.tsx            # Protected dashboard
prisma/
└── schema.prisma                 # Database schema
```

## ✅ Security Checklist

- [ ] Database URL environment variable set
- [ ] Firewall allows connection from Azure App Service
- [ ] Passwords hashed before storage
- [ ] API validates input (email, password strength)
- [ ] HTTPS enforced in production
- [ ] Session tokens stored securely
- [ ] User data not logged in console (production)
- [ ] Rate limiting configured (if needed)
- [ ] CORS policies configured (if needed)

## 🚀 Next Steps

1. **Deploy to Azure**
   - Push to GitHub
   - GitHub Actions will deploy

2. **Test in Production**
   - Create test user
   - Test login flow
   - Verify dashboard access

3. **Monitor & Debug**
   - Check Azure Application Insights
   - Review error logs
   - Monitor performance

4. **Future Enhancements**
   - Email verification
   - Password reset flow
   - Two-factor authentication
   - OAuth/social login
   - Session management
   - Audit logging

## 📞 Support

For issues or questions:
1. Check error messages in console logs
2. Review this documentation
3. Check GitHub Issues
4. Contact development team
