"use client"

import { useRouter, useSearchParams } from "next/navigation"

import type { ClientRecord } from "@cabinetra/domain-clients"
import { useCallback } from "react"

/**
 * useClientDetails
 * 
 * Hook for managing client detail view state and navigation.
 * Handles tab changes and URL synchronization.
 */
export function useClientDetails(client: ClientRecord) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const activeTab = searchParams.get("tab") || "overview"

    const handleTabChange = useCallback(
        (tab: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set("tab", tab)
            router.push(`/clients/${client.id}?${params.toString()}`)
        },
        [client.id, router, searchParams]
    )

    return {
        activeTab,
        handleTabChange,
        client,
    }
}
