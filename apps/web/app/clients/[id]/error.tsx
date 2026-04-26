'use client'

import { AlertTriangle, Home, RotateCw, Wifi } from 'lucide-react'
import { useEffect, useState } from 'react'

import Link from 'next/link'

interface ClientErrorProps {
    error: Error & { digest?: string }
    reset: () => void
}

/**
 * Determines error type based on error message/properties
 */
function getErrorType(error: Error): 'network' | 'notfound' | 'validation' | 'unknown' {
    const message = error.message.toLowerCase()

    if (message.includes('network') || message.includes('fetch') || message.includes('connection')) {
        return 'network'
    }
    if (message.includes('not found') || message.includes('404')) {
        return 'notfound'
    }
    if (message.includes('validation') || message.includes('invalid')) {
        return 'validation'
    }
    return 'unknown'
}

/**
 * Get user-friendly error message based on error type
 */
function getErrorMessage(errorType: string): { title: string; description: string } {
    const messages = {
        network: {
            title: 'Connection Error',
            description: 'Unable to load client details. Please check your internet connection and try again.',
        },
        notfound: {
            title: 'Client Not Found',
            description: 'The client you&apos;re looking for doesn&apos;t exist or may have been deleted.',
        },
        validation: {
            title: 'Invalid Request',
            description: 'The client ID is invalid. Please check the URL and try again.',
        },
        unknown: {
            title: 'Unable to Load Client',
            description: 'We encountered an unexpected issue loading this client&apos;s details. Please try again.',
        },
    }

    return messages[errorType as keyof typeof messages] || messages.unknown
}

export default function ClientError({ error, reset }: ClientErrorProps) {
    const [isOnline, setIsOnline] = useState(true)
    const errorType = getErrorType(error)
    const { title, description } = getErrorMessage(errorType)

    useEffect(() => {
        console.error('Client detail page error:', error)

        // Monitor online status
        const handleOnline = () => setIsOnline(true)
        const handleOffline = () => setIsOnline(false)

        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        // Check initial online status
        setIsOnline(navigator.onLine)

        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4">
            {/* Icon */}
            <div className="mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-destructive/10">
                    {errorType === 'network' && !isOnline ? (
                        <Wifi className="w-8 h-8 text-destructive" />
                    ) : errorType === 'notfound' ? (
                        <AlertTriangle className="w-8 h-8 text-destructive" />
                    ) : (
                        <AlertTriangle className="w-8 h-8 text-destructive" />
                    )}
                </div>
            </div>

            {/* Error Message */}
            <div className="max-w-md w-full space-y-4 text-center">
                <div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">
                        {title}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                </div>

                {/* Online Status Indicator */}
                {!isOnline && (
                    <div className="bg-amber-50 border border-amber-200 rounded p-3 text-left dark:bg-amber-950/20 dark:border-amber-900">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-amber-600 rounded-full dark:bg-amber-400" />
                            <p className="text-xs text-amber-800 dark:text-amber-200">
                                You appear to be offline. Reconnect and try again.
                            </p>
                        </div>
                    </div>
                )}

                {/* Error Details */}
                {process.env.NODE_ENV === 'development' && error.message && (
                    <details className="group">
                        <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground transition-colors">
                            Error Details (Development Only)
                        </summary>
                        <div className="mt-2 bg-muted/40 border border-border rounded p-3 text-left">
                            <p className="text-xs font-mono text-muted-foreground break-words">
                                {error.message}
                            </p>
                            {error.digest && (
                                <p className="text-xs font-mono text-muted-foreground break-words mt-2">
                                    Error ID: {error.digest}
                                </p>
                            )}
                        </div>
                    </details>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 pt-2">
                    <button
                        onClick={() => reset()}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
                    >
                        <RotateCw className="w-4 h-4" />
                        Try Again
                    </button>
                    <Link
                        href="/clients"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium text-sm"
                    >
                        <Home className="w-4 h-4" />
                        Back to Clients
                    </Link>
                </div>
            </div>
        </div>
    )
}
