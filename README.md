# Turborepo starter

This Turborepo starter is maintained by the Turborepo core team.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@cabinetra/ui-components`: a stub React component library shared by both `web` and `docs` applications
- `@cabinetra/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@cabinetra/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo build
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo build
pnpm dlx turbo build
pnpm exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo build --filter=docs
```

Without global `turbo`:

```sh
npx turbo build --filter=docs
pnpm exec turbo build --filter=docs
pnpm exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo dev
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo dev
pnpm exec turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo dev --filter=web
```

Without global `turbo`:

```sh
npx turbo dev --filter=web
pnpm exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo login
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo login
pnpm exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo link
```

Without global `turbo`:

```sh
npx turbo link
pnpm exec turbo link
pnpm exec turbo link
```

## Backend Setup

The monorepo includes a NestJS backend API and supporting infrastructure packages:

- `api`: A [NestJS](https://nestjs.com/) API backend running on port 5000
- `@cabinetra/infrastructure-types`: Shared TypeScript types for API communication
- `@cabinetra/infrastructure-api-client`: HTTP client for frontend-backend communication

### Prerequisites

- **Node.js** >= 18
- **Docker** and **Docker Compose** (for PostgreSQL database)

### Running the Backend

#### 1. Start the Database

```sh
docker-compose up -d
```

This starts a PostgreSQL container on port 5432. To verify the connection works:

```sh
pnpm dev --filter=api
```

#### 2. Run Both Frontend and Backend

Start both the Next.js web app (port 8080) and NestJS API (port 5000) concurrently:

```sh
pnpm dev
```

Or run them individually:

```sh
# Frontend (web app)
pnpm dev --filter=web

# Backend (API)
pnpm dev --filter=api
```

#### 3. Access the Applications

- **Web App**: http://localhost:8080
- **API Health Check**: http://localhost:5000/health
- **Database**: postgresql://localhost:5432/cabinetra (credentials in `.env` files)

### Environment Configuration

#### Backend Environment Variables

Create `apps/api/.env.local` (copy from `.env.example`):

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/cabinetra
NODE_ENV=development
PORT=5000
```

#### Frontend Environment Variables

Create `apps/web/.env.local` (copy from `.env.example`):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### API Client Usage

Import the API client and types in your frontend components:

```typescript
import { apiClient, type HealthResponse } from '@cabinetra/infrastructure-api-client'
import type { HealthResponse } from '@cabinetra/infrastructure-types'

// Make a typed API request
const health = await apiClient.get<HealthResponse>('/health')
console.log(health.status) // 'ok'
```

Or use the provided health check hook:

```typescript
import { useHealthCheck } from '@/lib/hooks/use-health-check'

export function MyComponent() {
  const { health, isLoading, error } = useHealthCheck()
  
  if (isLoading) return <p>Checking API...</p>
  if (error) return <p>API Error: {error.message}</p>
  
  return <p>API Status: {health?.status}</p>
}
```

### Building the Project

Build all apps and packages:

```sh
pnpm build
```

Build only the backend:

```sh
turbo build --filter=api
```

Build only the frontend:

```sh
turbo build --filter=web
```

### Type Safety

The infrastructure packages maintain type safety across the monorepo:

- **`@cabinetra/infrastructure-types`**: Define API request/response shapes
- **`@cabinetra/infrastructure-api-client`**: Typed fetch wrapper that uses the types

When adding new API endpoints:
1. Add types to `packages/infrastructure/types/src/index.ts`
2. Import types in the backend and frontend
3. Use `apiClient` with the typed endpoints

## Useful Links


Learn more about the power of Turborepo:

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.dev/docs/reference/configuration)
- [CLI Usage](https://turborepo.dev/docs/reference/command-line-reference)
# cabinetra
