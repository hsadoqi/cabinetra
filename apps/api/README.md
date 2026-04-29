# NestJS API Backend

A [NestJS](https://nestjs.com/) REST API backend running on port 5000 with TypeORM and PostgreSQL support.

## Project Structure

```
apps/api/
├── src/
│   ├── main.ts                 # Application bootstrap
│   ├── app.module.ts           # Root application module
│   └── health/
│       ├── health.controller.ts # Health check endpoint
│       ├── health.service.ts    # Health check service
│       └── health.module.ts     # Health feature module
├── package.json
├── tsconfig.json
├── nest-cli.json
└── .env.example               # Environment template
```

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL (via Docker Compose)

### Development

1. **Start PostgreSQL**
   ```bash
   docker-compose up -d
   ```

2. **Install dependencies** (from project root)
   ```bash
   pnpm install
   ```

3. **Run API in development mode**
   ```bash
   pnpm dev --filter=api
   ```
   
   The API will start on http://localhost:5000

4. **Verify Health Check**
   ```bash
   curl http://localhost:5000/health
   ```
   
   Expected response:
   ```json
   {
     "status": "ok",
     "timestamp": "2024-04-29T..."
   }
   ```

### Build

```bash
pnpm build --filter=api
```

Output is in `dist/` directory.

### Run Compiled Application

```bash
node dist/main.js
```

## API Documentation

### Health Check Endpoint

- **URL**: `GET /health`
- **Response**: 
  ```typescript
  {
    status: 'ok' | string,
    timestamp: string (ISO 8601)
  }
  ```

## Environment Variables

Create `.env.local` in this directory (see `.env.example`):

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/cabinetra

# Server
NODE_ENV=development
PORT=5000
```

## Adding New Endpoints

### 1. Define Types

Add to `packages/infrastructure/types/src/index.ts`:

```typescript
export interface MyEndpointResponse {
  data: string
  status: 'success'
}
```

### 2. Create Module

```bash
nest generate module features/my-feature
nest generate controller features/my-feature
nest generate service features/my-feature
```

### 3. Implement Service & Controller

```typescript
// my-feature.service.ts
import { Injectable } from '@nestjs/common'

@Injectable()
export class MyFeatureService {
  getData(): string {
    return 'Hello World'
  }
}

// my-feature.controller.ts
import { Controller, Get } from '@nestjs/common'
import { MyFeatureService } from './my-feature.service'
import type { MyEndpointResponse } from '@cabinetra/infrastructure-types'

@Controller('my-endpoint')
export class MyFeatureController {
  constructor(private readonly service: MyFeatureService) {}

  @Get()
  getEndpoint(): MyEndpointResponse {
    return {
      data: this.service.getData(),
      status: 'success'
    }
  }
}
```

### 4. Register in AppModule

```typescript
// app.module.ts
import { MyFeatureModule } from './features/my-feature/my-feature.module'

@Module({
  imports: [HealthModule, MyFeatureModule],
})
export class AppModule {}
```

### 5. Use in Frontend

```typescript
import { apiClient } from '@cabinetra/infrastructure-api-client'
import type { MyEndpointResponse } from '@cabinetra/infrastructure-types'

const response = await apiClient.get<MyEndpointResponse>('/my-endpoint')
```

## Testing

```bash
pnpm test --filter=api
```

## Linting

```bash
pnpm lint --filter=api
```

## Type Checking

```bash
pnpm check-types --filter=api
```

## Debugging

### Enable Debug Logging

Set `NODE_ENV=development` in `.env.local`. The logger will output startup messages and request details.

### Debug with VS Code

1. Set breakpoints in `src/**/*.ts`
2. Run in debug mode:
   ```bash
   node --inspect-brk node_modules/.bin/nest start
   ```
3. Open `chrome://inspect` in Chrome

## Database

The API uses TypeORM for database management.

### Current Setup

- **Provider**: PostgreSQL 16
- **Connection**: Configured in `app.module.ts`
- **Location**: localhost:5432

### Running Migrations (Future)

When you add entities, create migrations:

```bash
# Generate migration from entities
npm run typeorm migration:generate -- -n MyMigration

# Run migrations
npm run typeorm migration:run
```

## CORS Configuration

By default, CORS is enabled for local development:

- Allowed origins: `http://localhost:8080`, `http://localhost:3000`
- Credentials: `true`

For production, configure `apps/api/src/main.ts` or use environment variables.

## Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
