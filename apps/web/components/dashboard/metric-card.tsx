"use client"

import Link from "next/link"
import { ReactNode } from "react"

interface MetricCardProps {
    label: string
    value: string | number
    icon?: ReactNode
    description?: string
    variant?: "default" | "highlight" | "warning"
    href?: string
}

const variantStyles = {
    default: "bg-card border-border/70",
    highlight: "bg-blue-50/50 border-blue-200/50 dark:bg-blue-950/20 dark:border-blue-900/50",
    warning: "bg-amber-50/50 border-amber-200/50 dark:bg-amber-950/20 dark:border-amber-900/50",
}

const hoverClass = "transition hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"

export function MetricCard({ label, value, icon, description, variant = "default", href }: MetricCardProps) {
    const content = (
        <article className={`rounded-2xl border ${variantStyles[variant]} p-4 shadow-sm ${href ? hoverClass : ""}`}>
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

    if (href) {
        return <Link href={href}>{content}</Link>
    }

    return content
}
