# @cabinetra/feature-clients

Composed feature layer for client management workflows. Orchestrates UI components and business logic into reusable patterns for web, desktop, and admin applications.

## Architecture

- **Components**: Orchestrated panels that compose multiple UI components
  - `ClientDetailsPanel` - Client detail view with tabs and content
  - `ClientListPanel` - Client list with filtering and search

- **Hooks**: Stateful logic for common workflows
  - `useClientDetails` - Manage client detail view state
  - `useClientFiltering` - Manage client list filtering and sorting with URL synchronization
  
- **Types**: Exported for use throughout the application
  - `StatusFilter` - Client status filter type ("active" | "pending_vat" | "review" | "overdue" | "")
  - `RegimeFilter` - Client regime filter type ("normal" | "simplified" | "")
  - `SortBy` - Sort field type ("name" | "revenue" | "status" | "updated")

## Usage

### Components

```tsx
import { ClientDetailsPanel } from "@cabinetra/feature-clients"
import { getClientById } from "@cabinetra/domain-clients"

export async function ClientPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const client = getClientById(id)
    
    return (
        <ClientDetailsPanel
            client={client}
            breadcrumb={<ClientBreadcrumb clientName={client.name} clientId={client.id} />}
            actions={<ClientActions clientName={client.name} />}
        />
    )
}
```

### Hooks

#### useClientFiltering

Manages client list filtering with URL synchronization:

```tsx
"use client"

import { useClientFiltering } from "@cabinetra/feature-clients"
import type { StatusFilter, RegimeFilter, SortBy } from "@cabinetra/feature-clients"

export function MyClientsPage() {
    const {
        query,                      // Current search query
        statusFilter,               // Current status filter
        regimeFilter,               // Current regime filter
        sortBy,                     // Current sort field
        sortDirection,              // "asc" | "desc"
        onQueryChange,              // Update search query
        onStatusChange,             // Update status filter
        onRegimeChange,             // Update regime filter
        onSortChangeWithDirection,  // Update sort field and direction
        onClearFilters,             // Clear all filters
    } = useClientFiltering()

    return (
        <>
            <input 
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search clients..."
            />
            <button onClick={() => onStatusChange("active")}>
                Filter by Active
            </button>
        </>
    )
}
```

#### useClientDetails

Fetches and manages state for a single client:

```tsx
import { useClientDetails } from "@cabinetra/feature-clients"

export function ClientDetails({ clientId }: { clientId: string }) {
    const { client, isLoading, error } = useClientDetails(clientId)

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!client) return <div>Not found</div>

    return <div>{client.name}</div>
}
```

## Dependencies

- `@cabinetra/domain-clients` - Client types and data
- `@cabinetra/ui-clients` - Client UI components
- `@cabinetra/ui-layouts` - Layout containers
- `@cabinetra/platform-i18n` - Internationalization
