"use server"

import { apiArchiveClient, apiDeleteClient } from "@cabinetra/feature-clients"
import { exportClient } from "@cabinetra/domain-clients"

/**
 * Server actions for client mutations
 * These are Next.js server actions that handle client CRUD operations
 */

/**
 * Delete a client (server action)
 */
export async function deleteClientAction(clientId: string) {
    try {
        // In production, add authentication/authorization check here
        // if (!await isAuthorized(userId)) {
        //     return { success: false, error: "Unauthorized" }
        // }

        const result = await apiDeleteClient(clientId)

        if (result.success) {
            console.log(`Client ${clientId} deleted`)
            // In production, invalidate cache here
            // revalidatePath("/clients")
        }

        return result
    } catch (error) {
        console.error("Error deleting client:", error)
        return {
            success: false,
            error: "Failed to delete client. Please try again.",
        }
    }
}

/**
 * Archive a client (server action)
 */
export async function archiveClientAction(clientId: string) {
    try {
        // In production, add authentication/authorization check here
        const result = await apiArchiveClient(clientId)

        if (result.success) {
            console.log(`Client ${clientId} archived`)
            // In production, invalidate cache here
            // revalidatePath("/clients")
        }

        return result
    } catch (error) {
        console.error("Error archiving client:", error)
        return {
            success: false,
            error: "Failed to archive client. Please try again.",
        }
    }
}

/**
 * Export a client's data (server action)
 * Calls domain function directly - no HTTP request needed
 */
export async function exportClientAction(clientId: string) {
    try {
        // Call domain function directly for robust server-side export
        const result = exportClient(clientId)

        if (result.success) {
            console.log(`Client ${clientId} exported`)
        }

        return result
    } catch (error) {
        console.error("Error exporting client:", error)
        return {
            success: false,
            error: "Failed to export client. Please try again.",
        }
    }
}
