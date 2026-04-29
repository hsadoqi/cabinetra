# Infrastructure Types

Shared TypeScript type definitions for API communication between the frontend and backend.

## Usage

```typescript
import type { HealthResponse, ApiResponse } from '@cabinetra/infrastructure-types'

// Use in your backend
const response: HealthResponse = {
  status: 'ok',
  timestamp: new Date().toISOString()
}

// Use in your frontend
const data: ApiResponse<HealthResponse> = {
  data: response,
  status: 'success',
  timestamp: new Date().toISOString()
}
```

## Available Types

### Core Response Types

- `ApiResponse<T>`: Generic API response wrapper
  ```typescript
  interface ApiResponse<T = unknown> {
    data: T
    status: 'success' | 'error'
    timestamp: string
  }
  ```

- `ApiError`: Error response structure
  ```typescript
  interface ApiError {
    message: string
    code?: string
    details?: Record<string, unknown>
  }
  ```

### Feature Types

- `HealthResponse`: Health check endpoint response

## Adding New Types

1. Define the type in `src/index.ts`:
   ```typescript
   export interface MyNewResponse {
     id: string
     name: string
   }
   ```

2. Import and use in both backend and frontend:
   ```typescript
   // Backend
   import type { MyNewResponse } from '@cabinetra/infrastructure-types'
   
   // Frontend
   import type { MyNewResponse } from '@cabinetra/infrastructure-types'
   ```

## Best Practices

- Keep types DRY (Don't Repeat Yourself)
- Define request/response shapes for all endpoints
- Export both interfaces and types that might be used as const assertions
- Use `readonly` for response types that shouldn't be mutated
- Document complex types with JSDoc comments

## Dependencies

This package has no runtime dependencies, only TypeScript for development.
