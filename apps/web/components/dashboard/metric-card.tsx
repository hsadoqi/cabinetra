"use client"

import { ReactNode } from "react"

interface MetricCardProps {
    label: string
    value: string | number
    icon?: ReactNode
    description?: string
    variant?: "default" | "highlight" | "warning"
}

const variantStyles = {
    default: "bg-card border-border/70",
    highlight: "bg-blue-50/50 border-blue-200/50 dark:bg-blue-950/20 dark:border-blue-900/50",
    warning: "bg-amber-50/50 border-amber-200/50 dark:bg-amber-950/20 dark:border-amber-900/50",
}

export function MetricCard({ label, value, icon, description, variant = "default" }: MetricCardProps) {
    return (
        <article className={`rounded-2xl border ${variantStyles[variant]} p-4 shadow-sm`}>
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
                    <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
                    {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
                </div>
                {icon && <div className="text-muted-foreground opacity-40">{icon}</div>}
            </div>
        </article>
    )
}
