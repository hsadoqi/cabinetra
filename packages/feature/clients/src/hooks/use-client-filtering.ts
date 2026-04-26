"use client"

import type { ClientStatus, RegimeFilter, StatusFilter } from "@cabinetra/domain-clients"
import { useCallback, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export type { StatusFilter, RegimeFilter }
export type SortBy = "name" | "revenue" | "status" | "updated"

/**
 * useClientFiltering
 * 
 * Hook for managing client list filtering and sorting state.
 * Synchronizes filter state with URL parameters for bookmarkability and sharing.
 */
export function useClientFiltering() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const searchQuery = useMemo(() => searchParams.get("q") || "", [searchParams])
    const statusFilter = useMemo(() => (searchParams.get("status") || "") as StatusFilter, [searchParams])
    const regimeFilter = useMemo(() => (searchParams.get("regime") || "") as RegimeFilter, [searchParams])
    const sortBy = useMemo(() => (searchParams.get("sort") || "name") as SortBy, [searchParams])
    const sortDirection = useMemo(() => (searchParams.get("dir") === "desc" ? "desc" : "asc"), [searchParams])

    const updateUrl = useCallback(
        (updates: {
            q?: string
            status?: StatusFilter
            regime?: RegimeFilter
            sort?: SortBy
            dir?: "asc" | "desc"
        }) => {
            const params = new URLSearchParams(searchParams.toString())

            // Update search query
            if (updates.q !== undefined) {
                if (updates.q) {
                    params.set("q", updates.q)
                } else {
                    params.delete("q")
                }
            }

            // Update status filter
            if (updates.status !== undefined) {
                if (updates.status) {
                    params.set("status", updates.status)
                } else {
                    params.delete("status")
                }
            }

            // Update regime filter
            if (updates.regime !== undefined) {
                if (updates.regime) {
                    params.set("regime", updates.regime)
                } else {
                    params.delete("regime")
                }
            }

            // Update sort
            if (updates.sort !== undefined) {
                if (updates.sort !== "name") {
                    params.set("sort", updates.sort)
                } else {
                    params.delete("sort")
                }
            }

            // Update sort direction
            if (updates.dir !== undefined) {
                if (updates.dir === "desc") {
                    params.set("dir", "desc")
                } else {
                    params.delete("dir")
                }
            }

            router.push(`/clients?${params.toString()}`)
        },
        [router, searchParams]
    )

    const onQueryChange = useCallback(
        (query: string) => {
            updateUrl({ q: query })
        },
        [updateUrl]
    )

    const onStatusChange = useCallback(
        (status: StatusFilter) => {
            updateUrl({ status })
        },
        [updateUrl]
    )

    const onRegimeChange = useCallback(
        (regime: RegimeFilter) => {
            updateUrl({ regime })
        },
        [updateUrl]
    )

    const onSortChangeWithDirection = useCallback(
        (sort: SortBy, direction: "asc" | "desc") => {
            updateUrl({ sort, dir: direction })
        },
        [updateUrl]
    )

    const onClearFilters = useCallback(() => {
        router.push("/clients")
    }, [router])

    return {
        query: searchQuery,
        statusFilter,
        regimeFilter,
        sortBy,
        sortDirection,
        onQueryChange,
        onStatusChange,
        onRegimeChange,
        onSortChangeWithDirection,
        onClearFilters,
    }
}
