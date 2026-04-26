"use client"

import { AlertCircle, CheckCircle2, Clock } from "lucide-react"
import type { ClientRecord } from "@cabinetra/domain-clients"
import { COMPLIANCE_STATUS_CONFIG, RISK_LEVEL_CONFIG } from "@cabinetra/domain-clients"

export function ComplianceSummaryPanel({ client }: { client: ClientRecord }) {
    const compliance = client.compliance
    const statusConfig = COMPLIANCE_STATUS_CONFIG[compliance.overallStatus]
    const riskConfig = RISK_LEVEL_CONFIG[compliance.riskLevel]
    const RiskIcon = riskConfig.icon
    const StatusIcon = statusConfig.icon

    const lastCheckDate = compliance.lastComplianceCheckAt
        ? new Date(compliance.lastComplianceCheckAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
          })
        : "Never"

    return (
        <div className={`rounded-lg border p-4 ${statusConfig.bgColor}`}>
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <StatusIcon className={`h-5 w-5 ${statusConfig.color}`} />
                    <div>
                        <h3 className="text-sm font-semibold text-foreground">Compliance Status</h3>
                        <p className={`text-xs font-medium ${statusConfig.color}`}>{statusConfig.label}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <RiskIcon className={`h-5 w-5 ${riskConfig.color}`} />
                    <span className={`text-xs font-medium ${riskConfig.color}`}>{riskConfig.label}</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
                <div className="rounded border border-border/50 bg-background/40 p-2">
                    <p className="text-xs text-muted-foreground">Last Check</p>
                    <p className="mt-1 text-xs font-medium text-foreground">{lastCheckDate}</p>
                </div>
                <div className="rounded border border-border/50 bg-background/40 p-2">
                    <p className="text-xs text-muted-foreground">Flagged Items</p>
                    <div className="mt-1 flex items-center gap-1">
                        <span className="text-sm font-semibold text-foreground">{compliance.flaggedItems.count}</span>
                        {compliance.flaggedItems.urgentCount > 0 && (
                            <span className="text-xs font-medium text-red-600 dark:text-red-400">
                                ({compliance.flaggedItems.urgentCount} urgent)
                            </span>
                        )}
                    </div>
                </div>
                <div className="rounded border border-border/50 bg-background/40 p-2">
                    <p className="text-xs text-muted-foreground">Documents</p>
                    <div className="mt-1 flex items-center gap-1">
                        <span className="text-sm font-semibold text-foreground">{compliance.documentRequirements.submitted}</span>
                        <span className="text-xs text-muted-foreground">/ {compliance.documentRequirements.totalRequired}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
