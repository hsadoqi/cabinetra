"use client"

import { Edit, Download, Trash2, Archive } from "lucide-react"

interface ClientActionsProps {
    clientName: string
}

export function ClientActions({ clientName }: ClientActionsProps) {
    return (
        <div className="flex flex-wrap gap-2">
            <button
                className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-card px-3 py-2 text-sm font-medium text-foreground transition hover:border-primary/50 hover:bg-primary/5"
                disabled
                title="Edit functionality coming soon"
            >
                <Edit className="h-4 w-4" />
                Edit
            </button>
            <button
                className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-card px-3 py-2 text-sm font-medium text-foreground transition hover:border-primary/50 hover:bg-primary/5"
                disabled
                title="Export functionality coming soon"
            >
                <Download className="h-4 w-4" />
                Export
            </button>
            <button
                className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-card px-3 py-2 text-sm font-medium text-foreground transition hover:border-amber-500/50 hover:bg-amber-50/5 dark:hover:bg-amber-950/10"
                disabled
                title="Archive functionality coming soon"
            >
                <Archive className="h-4 w-4" />
                Archive
            </button>
            <button
                className="inline-flex items-center gap-2 rounded-lg border border-red-200/50 bg-red-50/5 px-3 py-2 text-sm font-medium text-red-600 transition hover:border-red-300/50 hover:bg-red-50/10 dark:border-red-900/50 dark:bg-red-950/10 dark:text-red-400 dark:hover:bg-red-950/20"
                disabled
                title="Delete functionality coming soon"
            >
                <Trash2 className="h-4 w-4" />
                Delete
            </button>
        </div>
    )
}
