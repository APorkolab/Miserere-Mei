# Multi-stage build for production-ready backend
FROM node:20-alpine AS base

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
FROM base AS deps
RUN npm ci --only=production && npm cache clean --force

# Development stage
FROM base AS dev
RUN npm ci
COPY . .
CMD ["dumb-init", "npm", "run", "dev"]

# Build stage
FROM base AS build
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM base AS production

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001

# Copy node_modules from deps stage
COPY --from=deps --chown=nodeuser:nodejs /usr/src/app/node_modules ./node_modules

# Copy built application
COPY --from=build --chown=nodeuser:nodejs /usr/src/app/dist ./dist
COPY --from=build --chown=nodeuser:nodejs /usr/src/app/package*.json ./
COPY --from=build --chown=nodeuser:nodejs /usr/src/app/src ./src

# Switch to non-root user
USER nodeuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node healthcheck.js || exit 1

# Expose port
EXPOSE 3000

# Start the application
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]