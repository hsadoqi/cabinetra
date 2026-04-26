import { FileQuestion, Home } from 'lucide-react'

import Link from 'next/link'

export default function ClientsNotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gradient-to-br from-background via-background to-muted/20 p-4">
            {/* Icon */}
            <div className="mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100/20 dark:bg-amber-900/20">
                    <FileQuestion className="w-7 h-7 text-amber-600 dark:text-amber-400" />
                </div>
            </div>

            {/* Message */}
            <div className="max-w-sm w-full space-y-3 text-center">
                <div>
                    <h1 className="text-xl font-bold text-foreground mb-1">
                        No Clients Found
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        The page you&apos;re looking for doesn&apos;t exist.
                    </p>
                </div>

                {/* Action */}
                <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
                >
                    <Home className="w-4 h-4" />
                    Return Home
                </Link>
            </div>
        </div>
    )
}
