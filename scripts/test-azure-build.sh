#!/bin/bash
# Azure Production Build Test Script
# This script tests the Azure production build locally before deployment

# Colors for formatting
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}Testing Azure Production Build Locally${NC}"
echo -e "${BLUE}======================================${NC}"
echo ""

echo -e "This script will:"
echo -e "1. Build the app in production/Azure mode"
echo -e "2. Start the server locally in production mode"
echo ""

# Check if .env.production exists
if [ ! -f .env.production ]; then
  echo -e "${YELLOW}Warning: .env.production not found${NC}"
  echo -e "Creating .env.production from example..."
  
  if [ -f .env.production.example ]; then
    cp .env.production.example .env.production
    echo -e "${GREEN}Created .env.production from example${NC}"
    echo -e "${YELLOW}Please edit .env.production with your actual values before proceeding${NC}"
    read -p "Press Enter to continue after editing, or Ctrl+C to cancel..."
  else
    echo -e "${RED}Error: .env.production.example not found${NC}"
    echo -e "Please create a .env.production file manually with your production environment variables"
    exit 1
  fi
fi

echo -e "${GREEN}[Step 1] Building application for Azure...${NC}"
npm run build:azure

if [ $? -ne 0 ]; then
  echo -e "${RED}Error: Build failed${NC}"
  exit 1
fi

echo ""
echo -e "${GREEN}[Step 2] Starting server in production mode...${NC}"
echo -e "Application will be available at http://localhost:8080"
echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
echo ""

npm run start:azure