"use client"

import { DollarSign, FileText, TrendingUp, Users } from "lucide-react"

import type { ClientRecord } from "@cabinetra/domain-clients"

export function ClientKpiStrip({ client }: { client: ClientRecord }) {
    const kpis = [
        { label: "Annual Revenue", value: `${(client.monthlyRevenueMad * 12).toLocaleString()} MAD`, icon: DollarSign },
        { label: "Monthly Avg", value: `${Math.round(client.monthlyRevenueMad).toLocaleString()} MAD`, icon: TrendingUp },
        { label: "Employees", value: "–", icon: Users },
        { label: "Declarations", value: "–", icon: FileText },
    ]

    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {kpis.map((kpi) => {
                const Icon = kpi.icon
                return (
                    <div key={kpi.label} className="rounded-lg border border-border bg-card p-3">
                        <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs font-medium text-muted-foreground">{kpi.label}</span>
                        </div>
                        <p className="mt-2 text-lg font-semibold text-foreground">{kpi.value}</p>
                    </div>
                )
            })}
        </div>
    )
}