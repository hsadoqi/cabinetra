# Infrastructure API Client

Type-safe HTTP client for frontend-backend communication. Wraps native `fetch` with error handling and type safety using shared types from `@cabinetra/infrastructure-types`.

## Usage

### Basic Requests

```typescript
import { apiClient } from '@cabinetra/infrastructure-api-client'
import type { HealthResponse } from '@cabinetra/infrastructure-types'

// GET request with typing
const health = await apiClient.get<HealthResponse>('/health')
console.log(health.status) // 'ok'

// POST request
const result = await apiClient.post<MyResponse>('/endpoint', {
  data: 'payload'
})

// PUT request
const updated = await apiClient.put<MyResponse>('/endpoint/1', {
  data: 'updated'
})

// DELETE request
const deleted = await apiClient.delete<MyResponse>('/endpoint/1')
```

### Error Handling

```typescript
import { apiClient, type ApiError } from '@cabinetra/infrastructure-api-client'

try {
  const data = await apiClient.get('/endpoint')
} catch (error) {
  console.error('API Error:', error.message)
  // Handle error
}
```

### In React Components

```typescript
import { useEffect, useState } from 'react'
import { apiClient } from '@cabinetra/infrastructure-api-client'
import type { MyResponse } from '@cabinetra/infrastructure-types'

export function MyComponent() {
  const [data, setData] = useState<MyResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    apiClient
      .get<MyResponse>('/endpoint')
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  
  return <div>{data?.someField}</div>
}
```

### With Custom Hooks

Use the provided `useHealthCheck` hook:

```typescript
import { useHealthCheck } from '@/lib/hooks/use-health-check'

export function ApiStatus() {
  const { health, isLoading, error } = useHealthCheck()

  return (
    <div>
      {isLoading && 'Checking...'}
      {error && `Error: ${error.message}`}
      {health && `API Status: ${health.status}`}
    </div>
  )
}
```

## Configuration

The client defaults to the `NEXT_PUBLIC_API_URL` environment variable or `http://localhost:5000`.

```typescript
// In your Next.js .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## API Methods

### `get<T>(endpoint: string): Promise<T>`

Make a GET request and return typed response.

```typescript
const data = await apiClient.get<MyType>('/endpoint')
```

### `post<T>(endpoint: string, body: unknown): Promise<T>`

Make a POST request with a request body.

```typescript
const data = await apiClient.post<MyType>('/endpoint', { name: 'value' })
```

### `put<T>(endpoint: string, body: unknown): Promise<T>`

Make a PUT request with a request body.

```typescript
const data = await apiClient.put<MyType>('/endpoint/1', { name: 'updated' })
```

### `delete<T>(endpoint: string): Promise<T>`

Make a DELETE request.

```typescript
const data = await apiClient.delete<MyType>('/endpoint/1')
```

## Features

- ✅ Type-safe with TypeScript generics
- ✅ Error handling with `ApiError` type
- ✅ JSON serialization/deserialization
- ✅ Default headers (Content-Type: application/json)
- ✅ Logging for debugging
- ✅ No external runtime dependencies (uses native `fetch`)

## Best Practices

1. **Always type responses**: Use generics with `apiClient.get<MyType>()`
2. **Handle errors**: Wrap calls in try-catch or `.catch()` chains
3. **Define types first**: Add types to `@cabinetra/infrastructure-types` before using them
4. **Reuse hooks**: Create custom hooks for common API patterns
5. **Test API calls**: Mock `fetch` in tests or use a test server

## Adding New Endpoints

1. Add types to `packages/infrastructure/types/src/index.ts`
2. Use in backend API endpoint
3. Import types in frontend components
4. Call with `apiClient.get<YourType>('/endpoint')`

## Dependencies

- `@cabinetra/infrastructure-types`: Shared type definitions

## Notes

- Uses browser native `fetch` API (no polyfill needed for modern browsers)
- In Next.js, this is safe to use in both client and server components (with proper `use client` directives)
- For advanced use cases (interceptors, request/response middleware), extend the `ApiClient` class
