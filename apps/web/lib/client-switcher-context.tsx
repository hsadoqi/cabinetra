"use client"

import { ReactNode, createContext, useContext, useState } from "react"

/**
 * CLIENT SWITCHER MODAL CONTEXT (App Layer)
 * 
 * Purpose: Manages the UI state of the client switcher modal (open/close)
 * 
 * Responsibilities:
 * - Controls whether the client switcher modal is visible/hidden
 * - Provides methods to open and close the modal
 * 
 * This is distinct from ClientContext which manages client DATA state
 * (currently selected client, history, etc.). This context only manages
 * the UI presentation state of the switcher modal.
 * 
 * Architecture:
 * - App layer context (specific to web app)
 * - Complements ClientContext from UI layer
 * - Localized to modal visibility, no data persistence
 * 
 * Usage:
 * - Use when you need to show/hide the client switcher modal
 * - Use to trigger the client selection flow
 * - Do NOT use for accessing client data (use ClientContext instead)
 * 
 * @example
 * const { isOpen, open, close } = useClientSwitcher()
 */

interface ClientSwitcherContextType {
    isOpen: boolean
    open: () => void
    close: () => void
}

const ClientSwitcherModalContext = createContext<ClientSwitcherContextType | undefined>(undefined)

export function ClientSwitcherModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)

    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    return (
        <ClientSwitcherModalContext.Provider value={{ isOpen, open, close }}>
            {children}
        </ClientSwitcherModalContext.Provider>
    )
}

/**
 * Hook to use the ClientSwitcher context
 * Throws an error if used outside of ClientSwitcherModalProvider
 * @throws Error if not within ClientSwitcherModalProvider
 */
export function useClientSwitcher() {
    const context = useContext(ClientSwitcherModalContext)
    if (!context) {
        throw new Error(
            "useClientSwitcher must be used within ClientSwitcherModalProvider. " +
            "Ensure the provider is wrapping your component in the app layout."
        )
    }
    return context
}

/**
 * Safe version of useClientSwitcher that returns null instead of throwing
 * Useful for components that might be used outside the provider
 */
export function useClientSwitcherSafe(): ClientSwitcherContextType | null {
    return useContext(ClientSwitcherModalContext) ?? null
}
