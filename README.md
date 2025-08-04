# Vicios MTG

Monorepo project to track Magic: The Gathering Commander matches.

## Project Structure

- `packages/client`: React web app (match recording).
- `packages/server`: Express server with API and PostgreSQL database connection using Prisma.
- `packages/common`: Shared code and constants used by both client and server.

## Requirements

- Node.js v18+
- Yarn v1 (Workspaces)
- PostgreSQL running on localhost:5432 (configurable via `.env`)

## Installation

```bash
yarn install
```

## Database

Make sure PostgreSQL is running and configured in your .env file.
To start PostgreSQL locally using Docker Compose:

```bash
docker-compose up -d postgres
```

To initialize the database with Prisma migrations:

```bash
cd packages/server
yarn server prisma migrate dev --name init
```

To generate Prisma client after schema changes:

```bash
yarn server prisma generate
```

## Useful Scripts

- `yarn common build` - Builds the common package.
- `yarn client dev` - Starts the React client in development mode.
- `yarn server dev` - Starts the Express server in development mode.
