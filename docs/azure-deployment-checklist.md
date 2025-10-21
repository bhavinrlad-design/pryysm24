# Azure Deployment Checklist

Use this checklist to ensure your Next.js application is ready for deployment to Azure App Service.

## Pre-Deployment Checklist

### Application Configuration

- [ ] **Next.js Configuration**
  - [ ] Verified `next.config.azure.js` exists with proper settings
  - [ ] Set `output: 'standalone'` in configuration
  - [ ] Configured proper image domains if using Next.js Image component

- [ ] **Custom Server**
  - [ ] Confirmed `server.js` exists with proper Azure detection
  - [ ] Server listens on `process.env.PORT || 8080`
  - [ ] Handles all routes correctly including API routes
  
- [ ] **Web Config**
  - [ ] Verified `web.config` exists with proper URL rewrite rules
  - [ ] Configured to handle static assets correctly

### Environment Setup

- [ ] **Environment Variables**
  - [ ] Created `.env.production` file with production values
  - [ ] All required variables are defined (DATABASE_URL, etc.)
  - [ ] All client-side variables are prefixed with `NEXT_PUBLIC_`

- [ ] **Production Dependencies**
  - [ ] All required packages are in dependencies (not devDependencies)
  - [ ] No development-only code in production build

### Azure Resources

- [ ] **App Service**
  - [ ] Created with Node.js 20 LTS or 22 LTS
  - [ ] App Service Plan with at least B1 tier for production
  - [ ] "Always On" setting enabled for production

- [ ] **Database**
  - [ ] Database created and initialized
  - [ ] Connection strings securely stored
  - [ ] Network security properly configured

- [ ] **Monitoring**
  - [ ] Application Insights resource created (optional but recommended)
  - [ ] Logging configuration set up

### Authentication Setup

- [ ] **Azure Authentication for GitHub Actions**
  - [ ] Created service principal with appropriate permissions
  - [ ] Basic authentication no longer used (has been disabled by Azure)
  - [ ] Service principal credentials securely stored in GitHub secrets as `AZURE_CREDENTIALS`
  - [ ] Resource group name stored in GitHub secrets as `AZURE_RESOURCE_GROUP`

## Deployment Process Checklist

### Local Testing

- [ ] **Build Verification**
  - [ ] Run `npm run build:azure` locally - builds successfully
  - [ ] Test locally with `npm run start:azure` - works as expected
  - [ ] All features work in production mode

### CI/CD Setup

- [ ] **GitHub Repository**
  - [ ] Code pushed to repository
  - [ ] GitHub Actions workflow file exists (`.github/workflows/azure-deploy.yml`)

- [ ] **GitHub Secrets**
  - [ ] `AZURE_APP_NAME` set correctly
  - [ ] `AZURE_PUBLISH_PROFILE` downloaded and added as secret
  - [ ] Other required secrets configured (DATABASE_URL, etc.)

### Post-Deployment Verification

- [ ] **Application Health**
  - [ ] Application loads correctly at Azure URL
  - [ ] No 500 errors or JavaScript console errors
  - [ ] Static assets load properly (CSS, images, etc.)
  
- [ ] **Features Testing**
  - [ ] Authentication works (if applicable)
  - [ ] API routes function correctly
  - [ ] Database operations succeed
  - [ ] Forms and interactive features work

- [ ] **Performance**
  - [ ] Page load times are acceptable
  - [ ] No memory leaks or resource issues
  - [ ] Monitoring dashboard shows expected metrics

## Security Checklist

- [ ] **HTTPS**
  - [ ] HTTPS is enforced (HTTPS Only enabled in Azure)
  - [ ] Valid SSL certificate is in place

- [ ] **Secrets Management**
  - [ ] No secrets in code or public repositories
  - [ ] All sensitive values stored as environment variables or in Key Vault

- [ ] **Access Control**
  - [ ] App Service authentication set up if required
  - [ ] Database access restricted to application

## Maintenance Plan

- [ ] **Monitoring Strategy**
  - [ ] Alert rules configured for critical errors
  - [ ] Uptime monitoring set up

- [ ] **Backup Strategy**
  - [ ] Database backup plan in place
  - [ ] CI/CD pipeline ensures code is safely stored

- [ ] **Update Strategy**
  - [ ] Plan for Node.js runtime updates
  - [ ] Plan for dependency updates
  - [ ] Schedule for security patches

## Final Approval

- [ ] **Stakeholder Sign-Off**
  - [ ] Application owner approval
  - [ ] Security team approval (if applicable)
  - [ ] Final go-live decision

Date: ________________

Approved By: ________________

Notes: ________________