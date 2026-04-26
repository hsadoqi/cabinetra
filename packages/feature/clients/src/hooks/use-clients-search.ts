"use client"

import type { ClientRecord, RegimeFilter, StatusFilter } from "@cabinetra/domain-clients"
import { useCallback, useEffect, useRef, useState } from "react"

import type { SortBy } from "./use-client-filtering"

export interface ClientsPaginationParams {
    page: number
    pageSize: number
    total: number
    totalPages: number
}

export interface ClientsSearchResponse {
    success: boolean
    data: ClientRecord[]
    pagination: ClientsPaginationParams
    error?: string
}

export interface UseClientsSearchParams {
    query: string
    status: StatusFilter
    regime: RegimeFilter
    sortBy: SortBy
    sortDirection: "asc" | "desc"
    pageSize?: number
}

/**
 * Hook for server-side search and pagination of clients
 * 
 * @param params Search and filter parameters
 * @returns Object with results, loading state, error, and pagination info
 */
export function useClientsSearch({
    query,
    status,
    regime,
    sortBy,
    sortDirection,
    pageSize = 20,
}: UseClientsSearchParams) {
    const [data, setData] = useState<ClientRecord[]>([])
    const [pagination, setPagination] = useState<ClientsPaginationParams>({
        page: 1,
        pageSize,
        total: 0,
        totalPages: 0,
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    // Use ref to track if we're searching to avoid race conditions
    const searchIdRef = useRef(0)

    const fetchClients = useCallback(
        async (page: number) => {
            const currentSearchId = ++searchIdRef.current

            try {
                setIsLoading(true)
                setError(null)

                const params = new URLSearchParams()
                params.set("page", page.toString())
                params.set("pageSize", pageSize.toString())
                if (query) params.set("q", query)
                if (status) params.set("status", status as string)
                if (regime) params.set("regime", regime as string)
                params.set("sortBy", sortBy)
                params.set("sortDirection", sortDirection)

                const response = await fetch(`/api/clients/search?${params.toString()}`)

                // Only process response if this is still the latest search request
                if (currentSearchId !== searchIdRef.current) {
                    return
                }

                if (!response.ok) {
                    throw new Error(`Failed to fetch clients: ${response.statusText}`)
                }

                const result: ClientsSearchResponse = await response.json()

                if (!result.success) {
                    throw new Error(result.error || "Search failed")
                }

                setData(result.data)
                setPagination(result.pagination)
            } catch (err) {
                if (currentSearchId === searchIdRef.current) {
                    setError(err instanceof Error ? err : new Error("Unknown error"))
                }
            } finally {
                if (currentSearchId === searchIdRef.current) {
                    setIsLoading(false)
                }
            }
        },
        [query, status, regime, sortBy, sortDirection, pageSize]
    )

    // Fetch on mount and when dependencies change
    useEffect(() => {
        fetchClients(1)
    }, [fetchClients])

    const goToPage = useCallback(
        (page: number) => {
            if (page >= 1 && page <= pagination.totalPages) {
                fetchClients(page)
            }
        },
        [fetchClients, pagination.totalPages]
    )

    return {
        data,
        isLoading,
        error,
        pagination,
        goToPage,
        refetch: () => fetchClients(pagination.page),
    }
}
