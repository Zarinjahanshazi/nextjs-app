# ---- deps ----
FROM node:20-slim AS deps
WORKDIR /app
COPY package.json ./
RUN npm install

# ---- build ----
FROM node:20-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* vars get baked into the client bundle at build time,
# not read at container runtime — so pass the backend URL here.
# Defaults to localhost:5007, which is fine for local Docker testing
# since the browser (not the container) makes the fetch call.
ARG NEXT_PUBLIC_BACKEND_URL=http://localhost:5007
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

RUN npm run build

# ---- runtime ----
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# node:20-slim already ships a built-in "node" user with UID/GID 1000 —
# reuse it instead of creating a new one (avoids "UID 1000 is not unique").

COPY --from=builder /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000

# .next/cache is the only path this needs to write to at runtime —
# mount it as the writable volume in k8s (see deployment.yaml)
CMD ["node", "server.js"]
