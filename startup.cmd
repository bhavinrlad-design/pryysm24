@echo off
REM Startup script for Next.js on Azure App Service

setlocal enabledelayedexpansion

echo Starting PRYYSM V2...

REM Navigate to app directory
cd /d D:\home\site\wwwroot

REM Check if .next directory exists, if not build it
if not exist ".next" (
  echo Building Next.js application...
  call npm run build
)

REM Start the application
echo Starting Next.js server...
call npm run start
