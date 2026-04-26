"use client"

import { AlertCircle, CheckCircle2, Clock, FileText } from "lucide-react"
import type { ClientRecord } from "@cabinetra/domain-clients"

export function VatFilingPanel({ client }: { client: ClientRecord }) {
    const vat = client.compliance.vatHistory
    const isOverdue = new Date(vat.filingDeadline) < new Date()
    const isPending = vat.status === "pending"

    const deadlineDate = new Date(vat.filingDeadline).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    })

    const lastFiledDate = vat.lastFiledAt
        ? new Date(vat.lastFiledAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
          })
        : "Never filed"

    const StatusIcon =
        vat.status === "audited" ? CheckCircle2 : vat.status === "filed" ? CheckCircle2 : AlertCircle

    const statusColor =
        vat.status === "audited"
            ? "text-emerald-600 dark:text-emerald-400"
            : vat.status === "filed"
              ? "text-blue-600 dark:text-blue-400"
              : "text-amber-600 dark:text-amber-400"

    return (
        <div className={`rounded-lg border p-4 ${
            isOverdue
                ? "border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20"
                : isPending
                  ? "border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/20"
                  : "border-border bg-card"
        }`}>
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    <h3 className="text-sm font-semibold text-foreground">VAT Filing</h3>
                </div>
                <div className="flex items-center gap-1">
                    <StatusIcon className={`h-4 w-4 ${statusColor}`} />
                    <span className="text-xs font-medium capitalize text-foreground">{vat.status}</span>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between rounded border border-border/50 bg-background/40 p-3">
                    <div>
                        <p className="text-xs text-muted-foreground">Filing Deadline</p>
                        <p className={`mt-1 text-sm font-semibold ${isOverdue ? "text-red-600 dark:text-red-400" : "text-foreground"}`}>
                            {deadlineDate}
                        </p>
                    </div>
                    {isOverdue && <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />}
                </div>

                <div className="rounded border border-border/50 bg-background/40 p-3">
                    <p className="text-xs text-muted-foreground">Last Filed</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{lastFiledDate}</p>
                </div>

                <div className="rounded border border-border/50 bg-background/40 p-3">
                    <p className="text-xs text-muted-foreground">Next Due</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                        {new Date(vat.nextDueAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </p>
                </div>
            </div>
        </div>
    )
}
