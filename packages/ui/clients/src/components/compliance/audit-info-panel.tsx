"use client"

import { CheckCircle2, Clock, FileText, AlertTriangle } from "lucide-react"
import type { ClientRecord } from "@cabinetra/domain-clients"

export function AuditInfoPanel({ client }: { client: ClientRecord }) {
    const audit = client.compliance.auditInfo

    const lastAuditDate = audit.lastAuditDate
        ? new Date(audit.lastAuditDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
          })
        : "No audit history"

    const nextAuditDate = audit.nextScheduledDate
        ? new Date(audit.nextScheduledDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
          })
        : "Not scheduled"

    const statusColor =
        audit.status === "completed"
            ? "text-emerald-600 dark:text-emerald-400"
            : audit.status === "in_progress"
              ? "text-amber-600 dark:text-amber-400"
              : audit.status === "scheduled"
                ? "text-blue-600 dark:text-blue-400"
                : "text-muted-foreground"

    const StatusIcon =
        audit.status === "completed"
            ? CheckCircle2
            : audit.status === "in_progress"
              ? AlertTriangle
              : audit.status === "scheduled"
                ? Clock
                : FileText

    const showFindings = audit.findings && (audit.findings.count > 0 || audit.findings.pending > 0)

    return (
        <div className={`rounded-lg border p-4 ${
            audit.status === "in_progress"
                ? "border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/20"
                : "border-border bg-card"
        }`}>
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    <h3 className="text-sm font-semibold text-foreground">Audit Info</h3>
                </div>
                <div className="flex items-center gap-1">
                    <StatusIcon className={`h-4 w-4 ${statusColor}`} />
                    <span className="text-xs font-medium capitalize text-foreground">{audit.status.replace("_", " ")}</span>
                </div>
            </div>

            <div className="space-y-3">
                <div className="rounded border border-border/50 bg-background/40 p-3">
                    <p className="text-xs text-muted-foreground">Last Audit</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{lastAuditDate}</p>
                </div>

                <div className="rounded border border-border/50 bg-background/40 p-3">
                    <p className="text-xs text-muted-foreground">Next Scheduled</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{nextAuditDate}</p>
                </div>

                {showFindings && (
                    <div className={`rounded border p-3 ${
                        audit.findings!.pending > 0
                            ? "border-amber-200 bg-amber-50/30 dark:border-amber-900/50 dark:bg-amber-950/10"
                            : "border-emerald-200 bg-emerald-50/30 dark:border-emerald-900/50 dark:bg-emerald-950/10"
                    }`}>
                        <p className="text-xs font-medium text-foreground">Findings</p>
                        <div className="mt-2 flex flex-col gap-1">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Total:</span>
                                <span className="font-semibold text-foreground">{audit.findings!.count}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Resolved:</span>
                                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{audit.findings!.resolved}</span>
                            </div>
                            {audit.findings!.pending > 0 && (
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">Pending:</span>
                                    <span className="font-semibold text-amber-600 dark:text-amber-400">{audit.findings!.pending}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
