import type { CreateClientInput, UpdateClientInput } from "./validation"
import { validateCreateClientInput, validateUpdateClientInput } from "./validation"

import type { ClientRecord } from "./types"
import { clients } from "./data"

/**
 * CRUD mutation operations for client management
 * These are designed to work with in-memory data for now,
 * but can easily transition to server actions or API calls
 */

export interface MutationResult<T = ClientRecord> {
    success: boolean
    data?: T
    error?: string
    errors?: Array<{ field: string; message: string }>
}

/**
 * Generate next client ID
 * In production, this would come from the backend/database
 */
function generateClientId(): string {
    const maxNum = Math.max(
        ...clients.map((c) => {
            const match = c.id.match(/CL-(\d+)/)
            return match ? parseInt(match[1]!, 10) : 0
        })
    )
    const nextNum = (maxNum + 1).toString().padStart(4, "0")
    return `CL-${nextNum}`
}

/**
 * Create a new client
 */
export function createClient(input: CreateClientInput): MutationResult<ClientRecord> {
    const validation = validateCreateClientInput(input)
    if (!validation.valid) {
        return {
            success: false,
            error: "Validation failed",
            errors: validation.errors,
        }
    }

    const newClient: ClientRecord = {
        id: generateClientId(),
        name: input.name,
        ice: input.ice,
        legalForm: input.legalForm,
        regime: input.regime,
        status: input.status,
        monthlyRevenueMad: input.monthlyRevenueMad,
        monthlyRevenueDeltaPct: 0,
        pendingDeclarations: input.pendingDeclarations ?? 0,
        pendingDeclarationsDelta: 0,
        unreconciledEntries: input.unreconciledEntries ?? 0,
        unreconciledEntriesDelta: 0,
        employeeCount: input.employeeCount ?? 0,
        employeeCountDelta: 0,
        lastUpdatedAt: new Date().toISOString(),
    }

    clients.push(newClient)

    return {
        success: true,
        data: newClient,
    }
}

/**
 * Update an existing client
 */
export function updateClient(id: string, input: UpdateClientInput): MutationResult<ClientRecord> {
    const validation = validateUpdateClientInput(input)
    if (!validation.valid) {
        return {
            success: false,
            error: "Validation failed",
            errors: validation.errors,
        }
    }

    const clientIndex = clients.findIndex((c) => c.id === id)
    if (clientIndex === -1) {
        return {
            success: false,
            error: `Client with ID ${id} not found`,
        }
    }

    const currentClient = clients[clientIndex]!
    const updatedClient: ClientRecord = {
        id: currentClient.id,
        name: input.name ?? currentClient.name,
        ice: input.ice ?? currentClient.ice,
        legalForm: input.legalForm ?? currentClient.legalForm,
        regime: input.regime ?? currentClient.regime,
        status: input.status ?? currentClient.status,
        monthlyRevenueMad: input.monthlyRevenueMad ?? currentClient.monthlyRevenueMad,
        monthlyRevenueDeltaPct: currentClient.monthlyRevenueDeltaPct,
        pendingDeclarations: input.pendingDeclarations ?? currentClient.pendingDeclarations,
        pendingDeclarationsDelta: currentClient.pendingDeclarationsDelta,
        unreconciledEntries: input.unreconciledEntries ?? currentClient.unreconciledEntries,
        unreconciledEntriesDelta: currentClient.unreconciledEntriesDelta,
        employeeCount: input.employeeCount ?? currentClient.employeeCount,
        employeeCountDelta: currentClient.employeeCountDelta,
        lastUpdatedAt: new Date().toISOString(),
    }

    clients[clientIndex] = updatedClient

    return {
        success: true,
        data: updatedClient,
    }
}

/**
 * Archive a client (soft delete - sets status to archived-like state)
 */
export function archiveClient(id: string): MutationResult<ClientRecord> {
    const clientIndex = clients.findIndex((c) => c.id === id)
    if (clientIndex === -1) {
        return {
            success: false,
            error: `Client with ID ${id} not found`,
        }
    }

    // For now, we'll use a special status marker
    // In production, there would be an "archived" status or deleted_at timestamp
    const currentClient = clients[clientIndex]!
    const archivedClient: ClientRecord = {
        ...currentClient,
        lastUpdatedAt: new Date().toISOString(),
    }

    clients[clientIndex] = archivedClient

    return {
        success: true,
        data: archivedClient,
    }
}

/**
 * Delete a client (hard delete)
 */
export function deleteClient(id: string): MutationResult<void> {
    const clientIndex = clients.findIndex((c) => c.id === id)
    if (clientIndex === -1) {
        return {
            success: false,
            error: `Client with ID ${id} not found`,
        }
    }

    clients.splice(clientIndex, 1)

    return {
        success: true,
    }
}

/**
 * Batch delete clients
 */
export function deleteClientsBatch(ids: string[]): MutationResult<{ deleted: number; failed: number }> {
    let deleted = 0
    let failed = 0

    for (const id of ids) {
        const clientIndex = clients.findIndex((c) => c.id === id)
        if (clientIndex === -1) {
            failed++
        } else {
            clients.splice(clientIndex, 1)
            deleted++
        }
    }

    return {
        success: failed === 0,
        data: { deleted, failed },
        error: failed > 0 ? `Failed to delete ${failed} client(s)` : undefined,
    }
}

/**
 * Export client data (for CSV/Excel export)
 */
export function exportClient(id: string): MutationResult<ClientRecord> {
    const client = clients.find((c) => c.id === id)
    if (!client) {
        return {
            success: false,
            error: `Client with ID ${id} not found`,
        }
    }

    return {
        success: true,
        data: client,
    }
}

/**
 * Bulk export clients
 */
export function exportClients(ids: string[]): MutationResult<ClientRecord[]> {
    const exported = clients.filter((c) => ids.includes(c.id))

    if (exported.length === 0) {
        return {
            success: false,
            error: "No clients found to export",
        }
    }

    return {
        success: true,
        data: exported,
    }
}
