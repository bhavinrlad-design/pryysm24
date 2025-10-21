# Script to test the production build locally for Windows

# Ensure we're in the project root
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "🔍 Testing production build for Azure deployment..." -ForegroundColor Cyan

# Clean any previous builds
Write-Host "🧹 Cleaning previous builds..." -ForegroundColor Cyan
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
npm ci

# Run Prisma generate
Write-Host "🔄 Generating Prisma client..." -ForegroundColor Cyan
npx prisma generate

# Build for production
Write-Host "🔨 Building for production..." -ForegroundColor Cyan
npm run build

# Test the server
Write-Host "🚀 Starting the production server..." -ForegroundColor Cyan
Write-Host "📝 Press Ctrl+C to stop the server when done testing." -ForegroundColor Yellow
$env:NODE_ENV = "production"
npm start