'use client'

import { useEffect } from 'react'

interface ErrorBoundaryProps {
    error: Error & { digest?: string }
    reset: () => void
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
    useEffect(() => {
        console.error('Root layout error:', error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
            <div className="max-w-md space-y-4 text-center">
                <h1 className="text-2xl font-bold text-foreground">
                    Something went wrong
                </h1>
                <p className="text-sm text-muted-foreground">
                    An unexpected error occurred. Please try again or contact support if the problem persists.
                </p>
                {error.digest && (
                    <p className="text-xs text-muted-foreground/50">
                        Error ID: {error.digest}
                    </p>
                )}
                <button
                    onClick={() => reset()}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                    Try again
                </button>
            </div>
        </div>
    )
}
