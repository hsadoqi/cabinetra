"use client"

import { Calendar } from "lucide-react"
import type { ClientRecord } from "@cabinetra/domain-clients"

export function ClientDeadlines({ client }: { client: ClientRecord }) {
    return (
        <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-2 mb-3">
                <Calendar className="h-4 w-4" />
                <h3 className="text-sm font-semibold">Deadlines</h3>
            </div>
            <div className="flex items-center justify-center py-8 text-muted-foreground">
                <p className="text-xs">No upcoming deadlines</p>
            </div>
        </div>
    )
}