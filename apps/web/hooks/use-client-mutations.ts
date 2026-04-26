/**
 * Client mutations hook
 * Manages loading states and error handling for client CRUD operations
 * This hook uses server actions from the app layer
 */

"use client"

import { archiveClientAction, deleteClientAction, exportClientAction } from "@/app/actions/clients"
import { useCallback, useState } from "react"

import type { MutationResult } from "@cabinetra/domain-clients"

export interface ClientMutationState {
    isLoading: boolean
    error: string | null
}

export interface UseClientMutationsReturn {
    delete: {
        state: ClientMutationState
        action: (clientId: string) => Promise<void>
    }
    archive: {
        state: ClientMutationState
        action: (clientId: string) => Promise<void>
    }
    export: {
        state: ClientMutationState
        action: (clientId: string) => Promise<void>
    }
}

/**
 * Hook for client mutation operations
 * Manages loading states and error handling for CRUD operations
 * 
 * Note: This hook is app-specific and depends on server actions.
 * It stays in the app layer rather than the feature layer for this reason.
 */
export function useClientMutations(): UseClientMutationsReturn {
    const [deleteState, setDeleteState] = useState<ClientMutationState>({ isLoading: false, error: null })
    const [archiveState, setArchiveState] = useState<ClientMutationState>({ isLoading: false, error: null })
    const [exportState, setExportState] = useState<ClientMutationState>({ isLoading: false, error: null })

    const handleDelete = useCallback(async (clientId: string) => {
        setDeleteState({ isLoading: true, error: null })
        try {
            const result: MutationResult<void> = await deleteClientAction(clientId)
            if (!result.success) {
                setDeleteState({ isLoading: false, error: result.error || "Failed to delete client" })
            } else {
                setDeleteState({ isLoading: false, error: null })
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to delete client"
            setDeleteState({ isLoading: false, error: message })
        }
    }, [])

    const handleArchive = useCallback(async (clientId: string) => {
        setArchiveState({ isLoading: true, error: null })
        try {
            const result: MutationResult = await archiveClientAction(clientId)
            if (!result.success) {
                setArchiveState({ isLoading: false, error: result.error || "Failed to archive client" })
            } else {
                setArchiveState({ isLoading: false, error: null })
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to archive client"
            setArchiveState({ isLoading: false, error: message })
        }
    }, [])

    const handleExport = useCallback(async (clientId: string) => {
        setExportState({ isLoading: true, error: null })
        try {
            const result: MutationResult = await exportClientAction(clientId)
            if (!result.success) {
                setExportState({ isLoading: false, error: result.error || "Failed to export client" })
            } else {
                setExportState({ isLoading: false, error: null })
                // In production, would trigger download here
                console.log("Client exported successfully")
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to export client"
            setExportState({ isLoading: false, error: message })
        }
    }, [])

    return {
        delete: { state: deleteState, action: handleDelete },
        archive: { state: archiveState, action: handleArchive },
        export: { state: exportState, action: handleExport },
    }
}
