"use client"

import { AlertCircle } from "lucide-react"
import { useEffect } from "react"

interface ErrorBoundaryProps {
    error: Error & { digest?: string }
    reset: () => void
    title?: string
    description?: string
}

export function ClientErrorBoundary({ error, reset, title, description }: ErrorBoundaryProps) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Client error:", error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/20">
            <div className="flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                <div>
                    <h2 className="text-lg font-semibold text-red-900 dark:text-red-100">
                        {title || "Something went wrong"}
                    </h2>
                    <p className="text-sm text-red-800 dark:text-red-200">
                        {description || error.message || "An unexpected error occurred"}
                    </p>
                </div>
            </div>
            <button
                onClick={() => reset()}
                className="mt-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
            >
                Try again
            </button>
        </div>
    )
}
