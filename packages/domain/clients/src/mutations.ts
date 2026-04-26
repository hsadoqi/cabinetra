import type { CreateClientInput, UpdateClientInput } from "./validation"
import { validateCreateClientInput, validateUpdateClientInput } from "./validation"

import type { ClientRecord } from "./types"
import { getClientRepository } from "./repository"

/**
 * CRUD mutation operations for client management
 * All mutations use the repository abstraction for persistence
 */

export interface MutationResult<T = ClientRecord> {
    success: boolean
    data?: T
    error?: string
    errors?: Array<{ field: string; message: string }>
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

    try {
        const repo = getClientRepository()
        const id = repo.getNextClientId()

        const newClient = repo.create({
            id,
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
            archivedAt: undefined,
        })

        return {
            success: true,
            data: newClient,
        }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to create client",
        }
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

    try {
        const repo = getClientRepository()
        const currentClient = repo.findById(id)

        if (!currentClient) {
            return {
                success: false,
                error: `Client with ID ${id} not found`,
            }
        }

        const updates: Partial<ClientRecord> = {
            name: input.name ?? currentClient.name,
            ice: input.ice ?? currentClient.ice,
            legalForm: input.legalForm ?? currentClient.legalForm,
            regime: input.regime ?? currentClient.regime,
            status: input.status ?? currentClient.status,
            monthlyRevenueMad: input.monthlyRevenueMad ?? currentClient.monthlyRevenueMad,
            pendingDeclarations: input.pendingDeclarations ?? currentClient.pendingDeclarations,
            unreconciledEntries: input.unreconciledEntries ?? currentClient.unreconciledEntries,
            employeeCount: input.employeeCount ?? currentClient.employeeCount,
            // Handle archivedAt field: explicit null unarchives, undefined keeps current state, string sets it
            archivedAt: input.archivedAt !== undefined ? input.archivedAt ?? undefined : currentClient.archivedAt,
        }

        const updated = repo.update(id, updates, currentClient._version)

        return {
            success: true,
            data: updated,
        }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to update client",
        }
    }
}

/**
 * Archive a client (soft delete - sets status to archived-like state)
 */
export function archiveClient(id: string): MutationResult<ClientRecord> {
    try {
        const repo = getClientRepository()
        const currentClient = repo.findById(id)

        if (!currentClient) {
            return {
                success: false,
                error: `Client with ID ${id} not found`,
            }
        }

        // If already archived, return error
        if (currentClient.archivedAt) {
            return {
                success: false,
                error: `Client ${id} is already archived`,
            }
        }

        const now = new Date().toISOString()
        const archived = repo.update(
            id,
            {
                archivedAt: now,
            },
            currentClient._version
        )

        return {
            success: true,
            data: archived,
        }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to archive client",
        }
    }
}

/**
 * Delete a client (hard delete)
 */
export function deleteClient(id: string): MutationResult<void> {
    try {
        const repo = getClientRepository()
        repo.delete(id)
        return {
            success: true,
        }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to delete client",
        }
    }
}

/**
 * Batch delete clients
 */
export function deleteClientsBatch(ids: string[]): MutationResult<{ deleted: number; failed: number }> {
    try {
        const repo = getClientRepository()
        const result = repo.deleteBatch(ids)
        return {
            success: result.failed === 0,
            data: result,
            error: result.failed > 0 ? `Failed to delete ${result.failed} client(s)` : undefined,
        }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to delete clients",
        }
    }
}

/**
 * Export client data (for CSV/Excel export)
 */
export function exportClient(id: string): MutationResult<ClientRecord> {
    try {
        const repo = getClientRepository()
        const client = repo.findById(id)

        if (!client) {
            return {
                success: false,
                error: `Client with ID ${id} not found`,
            }
        }

        // Remove version info from exported data
        const { _version, ...exported } = client
        return {
            success: true,
            data: exported,
        }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to export client",
        }
    }
}

/**
 * Bulk export clients
 */
export function exportClients(ids: string[]): MutationResult<ClientRecord[]> {
    try {
        const repo = getClientRepository()
        const allClients = repo.findAll()
        const exported = allClients
            .filter((c) => ids.includes(c.id))
            .map(({ _version, ...c }) => c)

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
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to export clients",
        }
    }
}
