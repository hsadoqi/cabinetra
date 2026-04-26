/**
 * API Error handling utilities
 * Provides consistent error handling across the application
 */

export class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
        public details?: {
            field?: string
            code?: string
            [key: string]: unknown
        }
    ) {
        super(message)
        this.name = "ApiError"
    }

    static isApiError(error: unknown): error is ApiError {
        return error instanceof ApiError
    }

    static fromResponse(status: number, message: string, details?: unknown): ApiError {
        return new ApiError(status, message, details as never)
    }
}

/**
 * Get user-friendly error message from error
 */
export function getErrorMessage(error: unknown): string {
    if (error instanceof ApiError) {
        return error.message
    }

    if (error instanceof Error) {
        return error.message
    }

    if (typeof error === "string") {
        return error
    }

    return "An unexpected error occurred"
}

/**
 * Retry logic with exponential backoff
 */
export async function withRetry<T>(
    fn: () => Promise<T>,
    options: {
        maxRetries?: number
        backoffMs?: number
        backoffMultiplier?: number
    } = {}
): Promise<T> {
    const { maxRetries = 3, backoffMs = 1000, backoffMultiplier = 2 } = options

    let lastError: unknown
    let delayMs = backoffMs

    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn()
        } catch (error) {
            lastError = error

            // Don't retry on non-retriable errors
            if (error instanceof ApiError) {
                if (error.status >= 400 && error.status < 500) {
                    throw error // Client error, don't retry
                }
            }

            // Wait before retrying (except on last attempt)
            if (i < maxRetries - 1) {
                await new Promise((resolve) => setTimeout(resolve, delayMs))
                delayMs *= backoffMultiplier
            }
        }
    }

    throw lastError
}

/**
 * Type-safe API response handler
 */
export function handleApiResponse<T>(
    response: Record<string, unknown>
): { success: boolean; data?: T; error?: string } {
    if (!response.success) {
        const errorMessage = typeof response.error === "string" ? response.error : "Operation failed"
        return {
            success: false,
            error: errorMessage,
        }
    }

    return {
        success: true,
        data: response.data as T,
    }
}
