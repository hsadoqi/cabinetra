"use client"

import type { ClientRecord } from "@cabinetra/domain-clients"
import { FileText } from "lucide-react"

export function ClientVatCard({ client }: { client: ClientRecord }) {
    const isOverdue = client.status === "overdue"
    const isPending = client.status === "pending_vat"

    return (
        <div className={`rounded-lg border p-4 ${isOverdue
            ? "border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20"
            : isPending
                ? "border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/20"
                : "border-border bg-card"
            }`}>
            <div className="flex items-center gap-2 mb-3">
                <FileText className="h-4 w-4" />
                <h3 className="text-sm font-semibold">VAT Status</h3>
            </div>
            {isOverdue ? (
                <p className="text-xs text-red-700 dark:text-red-300">Overdue VAT declarations</p>
            ) : isPending ? (
                <p className="text-xs text-amber-700 dark:text-amber-300">Pending VAT declarations</p>
            ) : (
                <p className="text-xs text-muted-foreground">All VAT declarations current</p>
            )}
        </div>
    )
}