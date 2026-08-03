# Railway (client testing) — runs the Vite + Miniflare server that provides
# the Cloudflare D1/R2 bindings in-process. Not production-grade; data resets
# on redeploy. For a real deploy use Cloudflare Workers or OpenAI Sites.
FROM node:22-bookworm

WORKDIR /app

# Install dependencies (Linux node_modules, incl. workerd for Miniflare)
COPY package.json package-lock.json ./
RUN npm install --no-audit --no-fund

# App source (node_modules excluded via .dockerignore)
COPY . .

ENV NODE_ENV=development
ENV WRANGLER_LOG_PATH=/tmp/wrangler.log
ENV MINIFLARE_REGISTRY_PATH=/tmp/mf-registry

# Railway injects PORT; bind Vite to it.
CMD ["sh", "-c", "npx vite --host 0.0.0.0 --port ${PORT:-8080}"]
