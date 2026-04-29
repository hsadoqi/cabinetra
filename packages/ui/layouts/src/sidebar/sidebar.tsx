"use client"

import { SidebarNav, type SidebarNavSectionConfig } from "./sidebar-nav"
import type { ReactNode } from "react"
import { cn } from "@cabinetra/ui-components/lib/utils"
import type { NavItemConfig } from "./nav-item"

export type SidebarProps = {
    sections: SidebarNavSectionConfig[]
    header?: ReactNode
    footer?: ReactNode
    onNavigate?: (item: NavItemConfig) => void
    className?: string
    children?: ReactNode
}

/**
 * Reusable sidebar component for navigation
 *
 * @example
 * ```tsx
 * <Sidebar
 *   sections={[
 *     {
 *       key: "main",
 *       title: "Main",
 *       items: [
 *         { key: "home", label: "Home", icon: Home, href: "/" },
 *       ],
 *     },
 *   ]}
 *   header={<SidebarHeader />}
 *   footer={<SidebarFooter />}
 * />
 * ```
 */
export function Sidebar({
    sections,
    header,
    footer,
    onNavigate,
    className,
    children,
}: SidebarProps) {
    return (
        <aside
            className={cn(
                "hidden md:flex w-[248px] shrink-0 flex-col border-e border-sidebar-border bg-sidebar text-sidebar-foreground overflow-hidden",
                className,
            )}
            role="navigation"
        >
            {header}

            <SidebarNav sections={sections} onNavigate={onNavigate} />

            {footer}

            {children}
        </aside>
    )
}

export { SidebarNav, type SidebarNavSectionConfig } from "./sidebar-nav"
export { NavItem, type NavItemConfig } from "./nav-item"
