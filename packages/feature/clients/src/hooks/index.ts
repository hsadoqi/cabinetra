/**
 * @cabinetra/feature-clients hooks
 *
 * Feature-layer hooks for client management orchestration.
 * These hooks provide URL-driven state management and are safe to use throughout the app.
 *
 * @example
 * ```tsx
 * // Use filtering with URL synchronization
 * const { query, statusFilter, onQueryChange } = useClientFiltering()
 *
 * // Fetch individual client details
 * const { client, isLoading } = useClientDetails(clientId)
 * ```
 */

/**
 * useClientDetails - Fetch details for a specific client
 *
 * @example
 * const { client, isLoading, error } = useClientDetails('CL-0001')
 */
export { useClientDetails } from "./use-client-details"

/**
 * useClientFiltering - Manage client filtering with URL synchronization
 *
 * Provides state management for:
 * - Search query
 * - Status filtering
 * - Regime filtering
 * - Sorting (field + direction)
 *
 * All state is synchronized with URL search parameters for bookmarkable URLs.
 *
 * Types exported:
 * - StatusFilter: "active" | "pending_vat" | "review" | "overdue" | ""
 * - RegimeFilter: "normal" | "simplified" | ""
 * - SortBy: "name" | "revenue" | "status" | "updated"
 *
 * @example
 * const {
 *   query,
 *   statusFilter,
 *   regimeFilter,
 *   sortBy,
 *   sortDirection,
 *   onQueryChange,
 *   onStatusChange,
 *   onRegimeChange,
 *   onSortChangeWithDirection,
 *   onClearFilters,
 * } = useClientFiltering()
 */
export { useClientFiltering, type StatusFilter, type RegimeFilter, type SortBy } from "./use-client-filtering"

