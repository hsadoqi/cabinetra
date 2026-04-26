'use client'

import { AlertTriangle, Home, Mail } from 'lucide-react'

import Link from 'next/link'
import { LogoIcon } from '@cabinetra/ui-components/brand'
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4">
            {/* Branded Header */}
            <div className="mb-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-destructive/10 mb-4">
                    <AlertTriangle className="w-8 h-8 text-destructive" />
                </div>
            </div>

            {/* Main Error Container */}
            <div className="max-w-2xl w-full space-y-6 text-center">
                {/* Logo */}
                <div className="flex justify-center mb-2">
                    <LogoIcon size="sm" />
                </div>

                {/* Error Title */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold text-foreground">
                        Oops! Something went wrong
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        {"We encountered an unexpected error. Don't worry, our team has been notified."}
                    </p>
                </div>

                {/* Error Details */}
                <div className="bg-muted/40 border border-border rounded-lg p-4 text-left max-h-32 overflow-y-auto">
                    <p className="text-xs font-mono text-muted-foreground break-words">
                        {error.message || 'Unknown error'}
                    </p>
                    {error.digest && (
                        <p className="text-xs text-muted-foreground/60 mt-2">
                            Error ID: <code className="bg-muted px-1 py-0.5 rounded">{error.digest}</code>
                        </p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <button
                        onClick={() => reset()}
                        className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium"
                    >
                        <Home className="w-4 h-4" />
                        Go Home
                    </Link>
                </div>

                {/* Support Link */}
                <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-3">
                        {"Still having issues? We're here to help."}
                    </p>
                    <a
                        href="mailto:support@cabinetra.com"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                    >
                        <Mail className="w-4 h-4" />
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    )
}
