# -----------------------------
# Build stage
# -----------------------------
    FROM node:20 AS build

    WORKDIR /app
    
    # Copiar package.json y lockfile
    COPY package.json yarn.lock tsconfig.base.json ./
    COPY packages/server/package.json ./packages/server/
    COPY packages/common/package.json ./packages/common/
    
    # Instalar dependencias
    RUN yarn install
    
    # Copiar código
    COPY packages/server ./packages/server
    COPY packages/common ./packages/common
    
    # Generar Prisma Client dentro del contenedor
    WORKDIR /app/packages/server
    RUN yarn prisma generate
    RUN yarn build
    
    # -----------------------------
    # Runtime stage
    # -----------------------------
    FROM node:20-slim
    
    WORKDIR /app
    
    # Instalar openssl
    RUN apt-get update && apt-get install -y openssl
    
    # Copiar node_modules y build
    COPY --from=build /app/packages/server ./packages/server
    COPY --from=build /app/node_modules ./node_modules
    COPY --from=build /app/packages/common ./packages/common
    
    EXPOSE 4000
    
    CMD ["node", "packages/server/build/index.js"]
    