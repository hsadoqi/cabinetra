import type {
    ClientRecord,
    CreateClientInput,
    RegimeFilter,
    StatusFilter,
    UpdateClientInput,
} from "@cabinetra/domain-clients"

import { withRetry } from "./errors"

/**
 * API response wrapper type
 */
export interface ApiResponse<T> {
    success: boolean
    data?: T
    error?: string
    errors?: Array<{ field: string; message: string }>
}

/**
 * Helper to extract user-friendly error messages from responses
 */
function getErrorMessage(error: unknown, context: string): string {
    if (error instanceof TypeError && error.message.includes("fetch")) {
        return `Network error: Unable to ${context}. Please check your connection and try again.`
    }
    if (error instanceof Error) {
        return error.message
    }
    return `Failed to ${context}`
}

/**
 * Fetch all clients with optional filtering
 */
export async function fetchClients(params?: {
    status?: StatusFilter
    regime?: RegimeFilter
    q?: string
}): Promise<ApiResponse<ClientRecord[]>> {
    return withRetry(
        async () => {
            const searchParams = new URLSearchParams()
            if (params?.status) searchParams.append("status", params.status)
            if (params?.regime) searchParams.append("regime", params.regime)
            if (params?.q) searchParams.append("q", params.q)

            const response = await fetch(`/api/clients?${searchParams.toString()}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(
                    errorData.error ||
                    `HTTP error! status: ${response.status}. Failed to fetch clients.`
                )
            }

            return await response.json()
        },
        { maxRetries: 2, backoffMs: 500 }
    ).catch((error) => {
        const message = getErrorMessage(error, "load clients")
        console.error("Error fetching clients:", error)
        return {
            success: false,
            error: message,
        } as ApiResponse<ClientRecord[]>
    })
}

/**
 * Fetch a single client by ID
 */
export async function fetchClient(id: string): Promise<ApiResponse<ClientRecord>> {
    return withRetry(
        async () => {
            const response = await fetch(`/api/clients/${encodeURIComponent(id)}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })

            if (!response.ok) {
                if (response.status === 404) {
                    return {
                        success: false,
                        error: `Client "${id}" not found. It may have been deleted.`,
                    } as ApiResponse<ClientRecord>
                }
                const errorData = await response.json().catch(() => ({}))
                throw new Error(
                    errorData.error ||
                    `HTTP error! status: ${response.status}. Failed to load client.`
                )
            }

            return await response.json()
        },
        { maxRetries: 2, backoffMs: 500 }
    ).catch((error) => {
        const message = getErrorMessage(error, `load client "${id}"`)
        console.error("Error fetching client:", error)
        return {
            success: false,
            error: message,
        } as ApiResponse<ClientRecord>
    })
}

/**
 * Create a new client
 */
export async function apiCreateClient(input: CreateClientInput): Promise<ApiResponse<ClientRecord>> {
    try {
        const response = await fetch("/api/clients", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input),
        })

        const data = await response.json()

        if (!response.ok) {
            return {
                success: false,
                error: data.error || "Failed to create client. Please check your input.",
                errors: data.errors,
            }
        }

        return data
    } catch (error) {
        const message = getErrorMessage(error, "create client")
        console.error("Error creating client:", error)
        return {
            success: false,
            error: message,
        }
    }
}

/**
 * Update an existing client
 */
export async function apiUpdateClient(
    id: string,
    input: UpdateClientInput
): Promise<ApiResponse<ClientRecord>> {
    try {
        const response = await fetch(`/api/clients/${encodeURIComponent(id)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input),
        })

        const data = await response.json()

        if (!response.ok) {
            return {
                success: false,
                error: data.error || "Failed to update client. Please try again.",
                errors: data.errors,
            }
        }

        return data
    } catch (error) {
        const message = getErrorMessage(error, `update client "${id}"`)
        console.error("Error updating client:", error)
        return {
            success: false,
            error: message,
        }
    }
}

/**
 * Delete a client
 */
export async function apiDeleteClient(id: string): Promise<ApiResponse<void>> {
    try {
        const response = await fetch(`/api/clients/${encodeURIComponent(id)}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })

        if (!response.ok) {
            if (response.status === 404) {
                return {
                    success: false,
                    error: `Client "${id}" not found. It may have already been deleted.`,
                }
            }
            const errorData = await response.json().catch(() => ({}))
            throw new Error(
                errorData.error ||
                `HTTP error! status: ${response.status}. Failed to delete client.`
            )
        }

        return {
            success: true,
        }
    } catch (error) {
        const message = getErrorMessage(error, `delete client "${id}"`)
        console.error("Error deleting client:", error)
        return {
            success: false,
            error: message,
        }
    }
}

/**
 * Archive a client via API
 * In a real app, this would be a separate endpoint
 * For now, we use a PUT with a special flag
 */
export async function apiArchiveClient(id: string): Promise<ApiResponse<ClientRecord>> {
    try {
        const response = await fetch(`/api/clients/${encodeURIComponent(id)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ archived: true }),
        })

        const data = await response.json()

        if (!response.ok) {
            return {
                success: false,
                error: data.error || "Failed to archive client. Please try again.",
            }
        }

        return data
    } catch (error) {
        const message = getErrorMessage(error, `archive client "${id}"`)
        console.error("Error archiving client:", error)
        return {
            success: false,
            error: message,
        }
    }
}
