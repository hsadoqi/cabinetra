"use client"

import { fetchClient, fetchClients } from "@cabinetra/feature-clients"
import { isValidRegimeFilter, isValidStatusFilter } from "@cabinetra/domain-clients"
import { useCallback, useEffect, useState } from "react"

import type { ClientRecord } from "@cabinetra/domain-clients"

export interface UseClientsResult {
    data: ClientRecord[]
    isLoading: boolean
    error: string | null
    refetch: () => Promise<void>
}

export interface UseClientResult {
    data: ClientRecord | null
    isLoading: boolean
    error: string | null
    refetch: () => Promise<void>
}

/**
 * Hook to fetch all clients
 * Handles network errors, validation errors, and retry logic
 */
export function useClients(params?: { status?: string; regime?: string; q?: string }): UseClientsResult {
    const [data, setData] = useState<ClientRecord[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const refetch = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetchClients({
                status: isValidStatusFilter(params?.status) ? params?.status : undefined,
                regime: isValidRegimeFilter(params?.regime) ? params?.regime : undefined,
                q: params?.q,
            })
            if (response.success && response.data) {
                setData(response.data)
            } else {
                setError(response.error || "Failed to fetch clients")
                setData([])
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error occurred while fetching clients"
            setError(message)
            setData([])
            console.error("useClients error:", err)
        } finally {
            setIsLoading(false)
        }
    }, [params])

    useEffect(() => {
        refetch()
    }, [refetch])

    return { data, isLoading, error, refetch }
}

/**
 * Hook to fetch a single client
 * Handles network errors, validation errors, and retry logic
 */
export function useClient(id: string | null): UseClientResult {
    const [data, setData] = useState<ClientRecord | null>(null)
    const [isLoading, setIsLoading] = useState(!id)
    const [error, setError] = useState<string | null>(null)

    const refetch = useCallback(async () => {
        if (!id) {
            setData(null)
            setIsLoading(false)
            return
        }

        setIsLoading(true)
        setError(null)
        try {
            const response = await fetchClient(id)
            if (response.success && response.data) {
                setData(response.data)
                setError(null)
            } else {
                setError(response.error || "Failed to fetch client")
                setData(null)
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error occurred while fetching client"
            setError(message)
            setData(null)
            console.error("useClient error:", err)
        } finally {
            setIsLoading(false)
        }
    }, [id])

    useEffect(() => {
        refetch()
    }, [refetch])

    return { data, isLoading, error, refetch }
}
