"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface ClientBreadcrumbProps {
    clientName: string
    clientId: string
}

export function ClientBreadcrumb({ clientName, clientId }: ClientBreadcrumbProps) {
    return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="inline-flex items-center gap-1 hover:text-foreground transition">
                <Home className="h-4 w-4" />
                Dashboard
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/clients" className="hover:text-foreground transition">
                Clients
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{clientName}</span>
        </div>
    )
}
