import { NavItem, type NavItemConfig } from "./nav-item"
import { usePathname } from "next/navigation"
import { cn } from "@cabinetra/ui-components/lib/utils"
import type { ReactNode } from "react"

export type SidebarNavSectionConfig = {
    key: string
    title: string
    items: NavItemConfig[]
    subtitle?: string | ReactNode
}

type SidebarNavProps = {
    sections: SidebarNavSectionConfig[]
    onNavigate?: (item: NavItemConfig) => void
    className?: string
}

export function SidebarNav({ sections, onNavigate, className }: SidebarNavProps) {
    const pathname = usePathname()

    return (
        <nav className={cn("flex-1 overflow-y-auto py-2", className)}>
            {sections.map((section) => (
                <div key={section.key} className="px-2 pb-1">
                    <div className="flex items-center justify-between px-2 py-1">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {section.title}
                        </p>
                        {section.subtitle && (
                            <div className="text-xs text-muted-foreground">
                                {section.subtitle}
                            </div>
                        )}
                    </div>
                    <ul className="flex flex-col gap-px">
                        {section.items.map((item) => {
                            const isActive =
                                pathname === item.href ||
                                (item.href !== "/" && pathname.startsWith(item.href))
                            return (
                                <NavItem
                                    key={item.key}
                                    item={item}
                                    isActive={isActive}
                                    onNavigate={onNavigate}
                                />
                            )
                        })}
                    </ul>
                </div>
            ))}
        </nav>
    )
}
