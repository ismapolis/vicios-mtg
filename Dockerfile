FROM node:18.17.1-slim

WORKDIR /app

# Copy build files
COPY ["package.json", "tsconfig.base.json", "yarn.lock", "./"]

# Copy package.json & tsconfig.json of each workspace
ARG PACKAGE="common"
COPY ["packages/${PACKAGE}/*.json", "./packages/${PACKAGE}/"]
ARG PACKAGE="client"
COPY ["packages/${PACKAGE}/*.json", "./packages/${PACKAGE}/"]
ARG PACKAGE="server"
COPY ["packages/${PACKAGE}/*.json", "./packages/${PACKAGE}/"]

# Install dependencies
RUN yarn install

# Copy code files
COPY . .

# Build all workspaces
RUN ["yarn", "common", "build"]
RUN ["yarn", "client", "build"]
RUN ["yarn", "server", "build"]

# Start server
CMD ["yarn", "server", "start"]