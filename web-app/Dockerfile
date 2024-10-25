FROM node:18-alpine

WORKDIR /app

# Copy source code
COPY . .

# Install dependencies
RUN npm ci

# Create non-root user and set ownership
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Run in development mode
CMD ["npm", "run", "dev"]
