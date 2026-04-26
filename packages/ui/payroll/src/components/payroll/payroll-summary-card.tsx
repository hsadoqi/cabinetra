"use client"

import type { PayrollRun } from "@cabinetra/domain-payroll"
import { PAYROLL_RUN_STATUS_CONFIG } from "@cabinetra/domain-payroll"
import { DollarSign, Users } from "lucide-react"

export function PayrollSummaryCard({ run, onClick }: { run: PayrollRun; onClick?: () => void }) {
    const statusConfig = PAYROLL_RUN_STATUS_CONFIG[run.status]
    const StatusIcon = statusConfig.icon

    const periodStart = new Date(run.payPeriodStart).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    })
    const periodEnd = new Date(run.payPeriodEnd).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    })

    return (
        <div
            className={`rounded-lg border p-4 ${statusConfig.bgColor} cursor-pointer transition-all hover:shadow-md ${
                onClick ? "hover:border-primary" : ""
            }`}
            onClick={onClick}
        >
            <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                    <h3 className="text-sm font-semibold text-foreground">
                        {periodStart} - {periodEnd}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">Payroll Run</p>
                </div>
                <div className="flex items-center gap-1">
                    <StatusIcon className={`h-4 w-4 ${statusConfig.color}`} />
                    <span className={`text-xs font-medium ${statusConfig.color}`}>{statusConfig.label}</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
                <div className="rounded border border-border/50 bg-background/40 p-2">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Users className="h-3 w-3" /> Employees
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{run.employeeCount}</p>
                </div>

                <div className="rounded border border-border/50 bg-background/40 p-2">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <DollarSign className="h-3 w-3" /> Gross
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                        {Math.round(run.totalGrossSalaries / 1000)}K MAD
                    </p>
                </div>

                <div className="rounded border border-border/50 bg-background/40 p-2">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <DollarSign className="h-3 w-3" /> Net
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                        {Math.round(run.totalNetSalaries / 1000)}K MAD
                    </p>
                </div>
            </div>
        </div>
    )
}
