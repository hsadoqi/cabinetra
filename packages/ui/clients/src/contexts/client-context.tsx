"use client"

import React, { createContext, useCallback, useContext, useEffect, useState } from "react"

import type { ClientRecord } from "@cabinetra/domain-clients"

/**
 * CLIENT CONTEXT (UI Layer)
 * 
 * Purpose: Manages the currently selected client and client navigation history
 * 
 * Responsibilities:
 * - Tracks the active/selected client across the application
 * - Maintains a history of recently accessed clients (up to 8)
 * - Persists recent client history to localStorage
 * 
 * This is distinct from ClientSwitcherModalContext which manages the UI state
 * of the client switcher modal (open/close). This context manages DATA state.
 * 
 * Usage:
 * - Use when you need to access or update the currently selected client
 * - Use to navigate between clients
 * - Use to access client history
 * 
 * @example
 * const { currentClient, setCurrentClient, recentClientIds } = useClientContext()
 */

interface ClientContextType {
    currentClient: ClientRecord | null
    setCurrentClient: (client: ClientRecord) => void
    recentClientIds: string[]
    addRecentClient: (clientId: string) => void
}

const ClientContext = createContext<ClientContextType | undefined>(undefined)

export function ClientProvider({ children }: { children: React.ReactNode }) {
    const [currentClient, setCurrentClientState] = useState<ClientRecord | null>(null)
    const [recentClientIds, setRecentClientIds] = useState<string[]>([])

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("recentClients")
        if (stored) {
            try {
                setRecentClientIds(JSON.parse(stored))
            } catch {
                // Ignore parse errors
            }
        }
    }, [])

    const setCurrentClient = useCallback((client: ClientRecord) => {
        setCurrentClientState(client)
        addRecentClient(client.id)
    }, [])

    const addRecentClient = useCallback((clientId: string) => {
        setRecentClientIds((prev) => {
            const updated = [clientId, ...prev.filter((id) => id !== clientId)].slice(0, 8)
            localStorage.setItem("recentClients", JSON.stringify(updated))
            return updated
        })
    }, [])

    return (
        <ClientContext.Provider
            value={{
                currentClient,
                setCurrentClient,
                recentClientIds,
                addRecentClient,
            }}
        >
            {children}
        </ClientContext.Provider>
    )
}

export function useClientContext() {
    const context = useContext(ClientContext)
    if (!context) {
        throw new Error("useClientContext must be used within ClientProvider")
    }
    return context
}

/**
 * CONTEXT ARCHITECTURE CLARITY
 * 
 * The application uses TWO separate contexts to maintain clean separation of concerns:
 * 
 * 1. ClientContext (this file - UI layer)
 *    - Location: packages/ui/clients/src/contexts/client-context.tsx
 *    - Purpose: Manages CLIENT DATA STATE
 *    - Manages: currently selected client, recent client history
 *    - Persistence: localStorage (saves history)
 *    - Layer: Reusable UI package layer
 * 
 * 2. ClientSwitcherModalContext (app layer)
 *    - Location: apps/web/lib/client-switcher-context.tsx
 *    - Purpose: Manages MODAL UI STATE ONLY
 *    - Manages: whether the switcher modal is open/closed
 *    - Persistence: none (ephemeral UI state)
 *    - Layer: App-specific web layer
 * 
 * WHEN TO USE WHICH:
 * - Need to access/change the selected client? → useClientContext()
 * - Need to show/hide the client switcher modal? → useClientSwitcher()
 * - Both together? Use both! They complement each other.
 */
