import Link from "next/link"
import { cn } from "@cabinetra/ui-components/lib/utils"
import type { ReactNode } from "react"

export type NavItemConfig = {
    key: string
    label: string
    icon: React.ComponentType<{ className?: string }>
    href: string
    shortcut?: string
    badge?: string
    disabled?: boolean
}

type NavItemProps = {
    item: NavItemConfig
    isActive?: boolean
    onNavigate?: (item: NavItemConfig) => void
}

export function NavItem({ item, isActive = false, onNavigate }: NavItemProps) {
    const Icon = item.icon
    const disabled = item.disabled ?? false

    if (disabled) {
        return (
            <li>
                <div
                    className="group flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-muted-foreground/60 cursor-not-allowed"
                >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.shortcut && (
                        <kbd className="hidden group-hover:inline-flex items-center rounded border border-border bg-background px-1 py-0.5 font-mono text-[9px] text-muted-foreground shrink-0">
                            {item.shortcut}
                        </kbd>
                    )}
                </div>
            </li>
        )
    }

    return (
        <li>
            <Link
                href={item.href}
                onClick={(e) => {
                    onNavigate?.(item)
                }}
                className={cn(
                    "group flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm font-medium transition-colors",
                    isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-accent",
                )}
            >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge && (
                    <span className="inline-flex items-center gap-1 ml-auto shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-semibold text-primary">
                        {item.badge}
                    </span>
                )}
                {item.shortcut && (
                    <kbd className="hidden group-hover:inline-flex items-center rounded border border-border bg-background px-1 py-0.5 font-mono text-[9px] text-muted-foreground shrink-0">
                        {item.shortcut}
                    </kbd>
                )}
            </Link>
        </li>
    )
}
