# -----------------------------
# Build stage
# -----------------------------
    FROM node:20 AS build

    WORKDIR /app
    
    COPY package.json yarn.lock tsconfig.base.json ./
    COPY packages/common/package.json ./packages/common/
    COPY packages/client/package.json ./packages/client/
    
    RUN yarn install
    
    COPY packages/common ./packages/common
    COPY packages/client ./packages/client
    
    RUN yarn workspace @vicios-mtg/common build
    RUN yarn workspace @vicios-mtg/client build
    
    # -----------------------------
    # Runtime stage
    # -----------------------------
    FROM node:20-slim
    
    WORKDIR /app
    
    # Instalar "serve" globalmente
    RUN npm install -g serve
    
    # Copiar el build
    COPY --from=build /app/packages/client/dist ./dist
    
    EXPOSE 3000
    
    CMD ["serve", "-s", "dist", "-l", "3000"]
    