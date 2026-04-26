"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { ReactNode } from "react"

interface QuickAccessCardProps {
    href: string
    title: string
    description: string
    icon?: ReactNode
    badge?: string
    badgeVariant?: "default" | "success" | "warning" | "danger"
}

const badgeVariants = {
    default: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    danger: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
}

export function QuickAccessCard({
    href,
    title,
    description,
    icon,
    badge,
    badgeVariant = "default",
}: QuickAccessCardProps) {
    return (
        <Link
            href={href}
            className="group rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md"
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        {icon && <div className="text-primary opacity-70">{icon}</div>}
                        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{description}</p>
                    {badge && (
                        <div className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${badgeVariants[badgeVariant]}`}>
                            {badge}
                        </div>
                    )}
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>
        </Link>
    )
}
