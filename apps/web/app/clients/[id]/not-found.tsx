import Link from 'next/link'
import { FileQuestion, Home } from 'lucide-react'

export default function ClientNotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4">
            {/* Icon */}
            <div className="mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-100/20 dark:bg-amber-900/20">
                    <FileQuestion className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                </div>
            </div>

            {/* Message */}
            <div className="max-w-md w-full space-y-4 text-center">
                <div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">
                        Client Not Found
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        The client you&apos;re looking for doesn&apos;t exist or has been removed.
                    </p>
                </div>

                {/* Helpful Info */}
                <div className="bg-muted/40 border border-border rounded p-3">
                    <p className="text-xs text-muted-foreground">
                        Try browsing the clients list to find the one you need.
                    </p>
                </div>

                {/* Action Button */}
                <Link
                    href="/clients"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm w-full"
                >
                    <Home className="w-4 h-4" />
                    Back to Clients
                </Link>
            </div>
        </div>
    )
}
