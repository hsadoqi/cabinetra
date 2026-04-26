"use client"

import { AlertCircle, CheckCircle2, FileText, Upload } from "lucide-react"
import type { ClientRecord } from "@cabinetra/domain-clients"

export function DocumentsPanel({ client }: { client: ClientRecord }) {
    const docs = client.compliance.documentRequirements
    const progress = Math.round((docs.submitted / docs.totalRequired) * 100)
    const hasExpiring = docs.expiringSoon > 0
    const isComplete = docs.submitted === docs.totalRequired

    return (
        <div className={`rounded-lg border p-4 ${
            hasExpiring
                ? "border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/20"
                : isComplete
                  ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20"
                  : "border-border bg-card"
        }`}>
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    <h3 className="text-sm font-semibold text-foreground">Documents</h3>
                </div>
                {isComplete ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                ) : hasExpiring ? (
                    <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                ) : null}
            </div>

            <div className="mb-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Submission Progress</span>
                    <span className="font-semibold text-foreground">
                        {docs.submitted} / {docs.totalRequired}
                    </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-border">
                    <div
                        className={`h-full rounded-full transition-all ${
                            isComplete
                                ? "bg-emerald-600 dark:bg-emerald-500"
                                : "bg-blue-600 dark:bg-blue-500"
                        }`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="rounded border border-border/50 bg-background/40 p-2">
                    <p className="text-xs text-muted-foreground">Pending</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{docs.pending}</p>
                </div>
                <div className={`rounded border p-2 ${
                    hasExpiring
                        ? "border-amber-200 bg-amber-50/30 dark:border-amber-900/50 dark:bg-amber-950/10"
                        : "border-border/50 bg-background/40"
                }`}>
                    <p className={`text-xs ${hasExpiring ? "text-amber-700 dark:text-amber-300" : "text-muted-foreground"}`}>
                        Expiring Soon
                    </p>
                    <p className={`mt-1 text-sm font-semibold ${hasExpiring ? "text-amber-700 dark:text-amber-300" : "text-foreground"}`}>
                        {docs.expiringSoon}
                    </p>
                </div>
            </div>

            <button className="mt-4 w-full flex items-center justify-center gap-2 rounded border border-border bg-background/50 px-3 py-2 text-xs font-medium text-foreground hover:bg-background/80 transition-colors">
                <Upload className="h-4 w-4" />
                Manage Documents
            </button>
        </div>
    )
}
