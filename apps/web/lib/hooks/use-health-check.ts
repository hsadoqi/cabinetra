'use client'

import { useEffect, useState } from 'react'

import type { HealthResponse } from '@cabinetra/infrastructure-types'
import { apiClient } from '@cabinetra/infrastructure-api-client'

export function useHealthCheck() {
    const [health, setHealth] = useState<HealthResponse | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        let isMounted = true

        const checkHealth = async () => {
            try {
                const response = await apiClient.get<HealthResponse>('/health')
                if (isMounted) {
                    setHealth(response)
                    setError(null)
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err : new Error('Failed to check API health'))
                    setHealth(null)
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        checkHealth()

        return () => {
            isMounted = false
        }
    }, [])

    return { health, isLoading, error }
}
