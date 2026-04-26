import { FileQuestion, Home } from 'lucide-react'

import Link from 'next/link'
import { LogoIcon } from '@cabinetra/ui-components/brand'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4">
            {/* Icon Header */}
            <div className="mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-amber-100/20 dark:bg-amber-900/20">
                    <FileQuestion className="w-10 h-10 text-amber-600 dark:text-amber-400" />
                </div>
            </div>

            {/* Main Container */}
            <div className="max-w-2xl w-full space-y-6 text-center">
                {/* Logo */}
                <div className="flex justify-center mb-4">
                    <LogoIcon size="sm" />
                </div>

                {/* Title & Description */}
                <div className="space-y-3">
                    <h1 className="text-5xl font-bold text-foreground">404</h1>
                    <h2 className="text-3xl font-semibold text-foreground">
                        Page Not Found
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-md mx-auto">
                        {"The page you're looking for doesn't exist or has been moved. Let's get you back on track."}
                    </p>
                </div>

                {/* Helpful Suggestions */}
                <div className="bg-muted/40 border border-border rounded-lg p-6 my-6">
                    <p className="text-sm font-semibold text-foreground mb-4">
                        Here are some helpful links:
                    </p>
                    <div className="space-y-2 text-sm">
                        <div>
                            <Link href="/" className="text-primary hover:text-primary/80 font-medium">
                                → Return to Dashboard
                            </Link>
                        </div>
                        <div>
                            <Link href="/clients" className="text-primary hover:text-primary/80 font-medium">
                                → Browse Clients
                            </Link>
                        </div>
                        <div>
                            <a
                                href="mailto:support@cabinetra.com"
                                className="text-primary hover:text-primary/80 font-medium"
                            >
                                → Contact Support
                            </a>
                        </div>
                    </div>
                </div>

                {/* Primary Action */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                        <Home className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <Link
                        href="/clients"
                        className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium"
                    >
                        Browse Clients
                    </Link>
                </div>
            </div>
        </div>
    )
}
