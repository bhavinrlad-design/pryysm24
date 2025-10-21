@echo off
echo ========================================
echo Testing Azure Production Build Locally
echo ========================================
echo.
echo This script will:
echo 1. Build the app in production/Azure mode
echo 2. Start the server locally in production mode
echo.

echo [Step 1] Building application for Azure...
call npm run build:azure
if %ERRORLEVEL% neq 0 (
    echo Error: Build failed
    exit /b %ERRORLEVEL%
)

echo.
echo [Step 2] Starting server in production mode...
echo Application will be available at http://localhost:8080
echo Press Ctrl+C to stop the server
echo.
call npm run start:azure