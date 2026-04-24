FROM node:20-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM deps AS dev
ENV NODE_ENV=development
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0", "--port", "3000"]

FROM base AS builder
ARG NEXT_PUBLIC_GATEWAY_BASE_URL=https://api.myeditor.n-e.kr
ARG NEXT_PUBLIC_SSO_BASE_URL=https://api.myeditor.n-e.kr
ARG NEXT_PUBLIC_GATEWAY_AUTH_LOGIN_PAGE=explain
ARG NEXT_PUBLIC_START_FRONTEND_URL=https://editor.myeditor.n-e.kr
ARG NEXT_PUBLIC_SSO_CONSUMER_CALLBACK_URL=https://myeditor.n-e.kr/auth/callback
ARG NEXT_PUBLIC_TITLE=Frontend UI
ARG NEXT_PUBLIC_DESCRIPTION=Frontend UI service
ARG NEXT_PUBLIC_COPY=© 2026 Frontend UI

ENV NEXT_PUBLIC_GATEWAY_BASE_URL=${NEXT_PUBLIC_GATEWAY_BASE_URL} \
    NEXT_PUBLIC_SSO_BASE_URL=${NEXT_PUBLIC_SSO_BASE_URL} \
    NEXT_PUBLIC_GATEWAY_AUTH_LOGIN_PAGE=${NEXT_PUBLIC_GATEWAY_AUTH_LOGIN_PAGE} \
    NEXT_PUBLIC_START_FRONTEND_URL=${NEXT_PUBLIC_START_FRONTEND_URL} \
    NEXT_PUBLIC_SSO_CONSUMER_CALLBACK_URL=${NEXT_PUBLIC_SSO_CONSUMER_CALLBACK_URL} \
    NEXT_PUBLIC_TITLE=${NEXT_PUBLIC_TITLE} \
    NEXT_PUBLIC_DESCRIPTION=${NEXT_PUBLIC_DESCRIPTION} \
    NEXT_PUBLIC_COPY=${NEXT_PUBLIC_COPY}

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
