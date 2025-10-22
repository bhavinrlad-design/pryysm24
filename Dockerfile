FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies - this happens at build time, not runtime
RUN npm ci --omit=dev

# Copy application files
COPY .next/standalone ./
COPY public ./public

# Health check
HEALTHCHECK --interval=10s --timeout=5s --start-period=60s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8080/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Expose port
EXPOSE 8080

# Start the app - Node will start immediately since node_modules already exist
CMD ["node", "index.js"]
