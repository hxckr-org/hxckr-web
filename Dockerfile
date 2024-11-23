FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
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
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Add environment variables for build time
ARG NEXT_PUBLIC_APP_CORE_BASE_URL
ARG NEXT_PUBLIC_APP_WEBSOCKET_URL
ENV NEXT_PUBLIC_APP_CORE_BASE_URL=$NEXT_PUBLIC_APP_CORE_BASE_URL
ENV NEXT_PUBLIC_APP_WEBSOCKET_URL=$NEXT_PUBLIC_APP_WEBSOCKET_URL

# Create the contentlayer directory
RUN mkdir -p .contentlayer

# Next.js collects completely anonymous telemetry data about general usage.
ENV NEXT_TELEMETRY_DISABLED=1

# Modified build command to ensure contentlayer is generated
RUN \
  if [ -f yarn.lock ]; then yarn run delete:contentlayer && yarn run build; \
  elif [ -f package-lock.json ]; then npm run delete:contentlayer && npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run delete:contentlayer && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Add these lines to ensure the env vars are available during build
ARG NEXT_PUBLIC_APP_CORE_BASE_URL
ARG NEXT_PUBLIC_APP_WEBSOCKET_URL
ENV NEXT_PUBLIC_APP_CORE_BASE_URL=$NEXT_PUBLIC_APP_CORE_BASE_URL
ENV NEXT_PUBLIC_APP_WEBSOCKET_URL=$NEXT_PUBLIC_APP_WEBSOCKET_URL

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]