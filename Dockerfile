# Use Node.js official image as base
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install system dependencies for better compatibility
RUN apk add --no-cache \
    git \
    bash \
    curl

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy source code
COPY . .

# Compile TypeScript
RUN npx tsc

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001 -G nodejs

# Change ownership of the app directory
RUN chown -R nodeuser:nodejs /app

# Switch to non-root user
USER nodeuser

# Expose port (if needed for future web features)
EXPOSE 3000

# Default command to run tests
CMD ["npm", "test"]
