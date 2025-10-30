# Next.js Deployment Fix for Azure App Service

## Issue Identified
The deployment is failing because the `next` command is not found when trying to start the application. This indicates that Next.js dependencies are not properly installed in the production environment.

## Required Changes

1. Update package.json scripts to ensure proper installation and startup:
```json
{
  "scripts": {
    "build": "next build",
    "start": "next start -p $PORT",
    "azure-postbuild": "npm install && npm run build"
  }
}
```

2. Add or update .npmrc file to ensure dependencies are installed:
```
unsafe-perm=true
```

3. Update the deployment configuration in Azure App Service:
   - Set NODE_ENV=production
   - Set PORT=8080 (or your desired port)
   - Enable "SCM_DO_BUILD_DURING_DEPLOYMENT=true"

4. Ensure next.js is explicitly added as a dependency:
```json
{
  "dependencies": {
    "next": "^14.0.0"  // Update to your desired version
  }
}
```

## Implementation Steps

1. Add a .npmrc file to the root of your project
2. Update the package.json scripts
3. Push changes to GitHub
4. Update Azure App Service configuration
5. Redeploy the application

## Additional Notes
- Make sure node_modules are not included in .gitignore
- Verify that the build output directory (.next) is being properly created
- Check Azure App Service logs for any build-time errors