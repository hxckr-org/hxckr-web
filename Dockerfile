FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
RUN apk add --no-cache git
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Clone courses repository directly
RUN rm -rf public/courses && \
    git clone https://github.com/hxckr-org/hxckr-courses.git public/courses

# Debug: List contents and ensure directories exist
RUN echo "=== Initial directory contents ===" && \
    ls -la && \
    echo "=== Courses directory contents ===" && \
    ls -la public/courses

# Create contentlayer directory
RUN mkdir -p .contentlayer && \
    chmod 755 .contentlayer && \
    chmod -R 755 public/courses

# Add environment variables for build time
ARG NEXT_PUBLIC_APP_CORE_BASE_URL
ARG NEXT_PUBLIC_APP_WEBSOCKET_URL
ENV NEXT_PUBLIC_APP_CORE_BASE_URL=$NEXT_PUBLIC_APP_CORE_BASE_URL
ENV NEXT_PUBLIC_APP_WEBSOCKET_URL=$NEXT_PUBLIC_APP_WEBSOCKET_URL

# Build with logging
RUN echo "=== Starting build process ===" && \
    if [ -f yarn.lock ]; then \
      yarn run build; \
    elif [ -f package-lock.json ]; then \
      npm run build; \
    elif [ -f pnpm-lock.yaml ]; then \
      corepack enable pnpm && pnpm run build; \
    fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    mkdir -p .contentlayer public/courses && \
    chown -R nextjs:nodejs .

# Copy necessary files
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.contentlayer ./.contentlayer
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]