"use client"

import {
    BookOpen,
    CircleDot,
    FileBarChart,
    FileText,
    HelpCircle,
    LayoutDashboard,
    Library,
    Receipt,
    Settings,
    UserCheck,
    Users,
    Wallet,
} from "lucide-react"

import { ClientSidebarPicker } from "./client-sidebar-picker"
import type { ClientStatus } from "@cabinetra/domain-clients"
import Link from "next/link"
import type { ReactNode } from "react"
import { cn } from "@cabinetra/ui-components/lib/utils"
import { useI18n } from "@cabinetra/platform-i18n"
import { usePathname } from "next/navigation"

type NavItem = {
    key: string
    labelKey: string
    icon: React.ComponentType<{ className?: string }>
    href: string
    shortcut?: string
    badge?: string
    clientScoped?: boolean
}

const firmNav: NavItem[] = [
    { key: "dashboard", labelKey: "nav.dashboard", icon: LayoutDashboard, href: "/", shortcut: "G D" },
    { key: "clients", labelKey: "nav.clients", icon: Users, href: "/", shortcut: "G C", badge: "24" },
    { key: "payroll-dashboard", labelKey: "nav.payroll", icon: Wallet, href: "/payroll-dashboard", shortcut: "G P" },
]

const clientNav: NavItem[] = [
    { key: "journal", labelKey: "nav.accounting", icon: BookOpen, href: "/journal", shortcut: "G A", clientScoped: true },
    { key: "ledger", labelKey: "nav.ledger", icon: Library, href: "/ledger", clientScoped: true },
    { key: "vat", labelKey: "nav.vat", icon: Receipt, href: "/vat", shortcut: "G V", clientScoped: true },
    { key: "reports", labelKey: "nav.reports", icon: FileBarChart, href: "/reports", shortcut: "G R", clientScoped: true },
    { key: "employees", labelKey: "nav.employees", icon: UserCheck, href: "/employees", shortcut: "G E", clientScoped: true },
    { key: "payroll-runs", labelKey: "nav.payrollRuns", icon: FileText, href: "/payroll", clientScoped: true },
    { key: "payslips", labelKey: "nav.payslips", icon: FileText, href: "/payslip-preview", clientScoped: true },
]

const systemNav: NavItem[] = [
    { key: "settings", labelKey: "nav.settings", icon: Settings, href: "#" },
    { key: "help", labelKey: "nav.help", icon: HelpCircle, href: "#" },
]

export type { ClientStatus }

export type SidebarClient = {
    id: string
    name: string
    legalForm: string
    ice: string
    regime: string
    status: ClientStatus
}

type ClientSidebarProps = {
    currentClient?: SidebarClient | null
    onClearClient?: () => void
    onOpenClientSwitcher?: () => void
    clientSwitcher?: ReactNode
}

export function ClientSidebar({
    currentClient = null,
    onClearClient,
    onOpenClientSwitcher,
    clientSwitcher,
}: ClientSidebarProps) {
    const { t } = useI18n()
    const pathname = usePathname()
    const tr = (key: string) => t(key as never)

    const hasClient = currentClient !== null
    if (!hasClient) return null

    return (
        <>
            <aside
                className="hidden md:flex w-[248px] shrink-0 flex-col border-e border-sidebar-border bg-sidebar text-sidebar-foreground overflow-hidden"
                aria-label={tr("nav.mainAria")}
            >
                <ClientSidebarPicker
                    currentClient={currentClient!}
                    onOpenClientSwitcher={onOpenClientSwitcher ?? (() => { })}
                    onClearClient={onClearClient ?? (() => { })}
                    tr={tr}

                />
                {/* Primary nav */}
                <nav className="flex-1 overflow-y-auto py-2">
                    {/* Firm-wide section */}
                    <div className="px-2 pb-1">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2 py-1">
                            {tr("nav.global")}
                        </p>
                        <ul className="flex flex-col gap-px">
                            {firmNav.map((item) => (
                                <NavRow key={item.key} item={item} pathname={pathname} hasClient={hasClient} />
                            ))}
                        </ul>
                    </div>

                    {/* Client-scoped section */}
                    <div className="mt-3 px-2 pb-1">
                        <div className="flex items-center justify-between px-2 py-1">
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                {tr("nav.clientScoped")}
                            </p>
                            {hasClient && (
                                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                                    <CircleDot className="h-2 w-2" />
                                    {currentClient.id}
                                </span>
                            )}
                        </div>
                        <ul className={cn("flex flex-col gap-px", !hasClient && "opacity-50")}>
                            {clientNav.map((item) => (
                                <NavRow
                                    key={item.key}
                                    item={item}
                                    pathname={pathname}
                                    hasClient={hasClient}
                                    disabled={!hasClient}
                                />
                            ))}
                        </ul>
                    </div>

                    {/* System */}
                    <div className="mt-3 px-2 pb-1">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2 py-1">
                            {tr("nav.system")}
                        </p>
                        <ul className="flex flex-col gap-px">
                            {systemNav.map((item) => (
                                <NavRow key={item.key} item={item} pathname={pathname} hasClient={hasClient} />
                            ))}
                        </ul>
                    </div>
                </nav>

                {/* Fiscal year indicator */}
                <div className="border-t border-sidebar-border p-2">
                    <div className="rounded-sm border border-sidebar-border bg-background px-2.5 py-1.5">
                        <div className="flex items-center justify-between">
                            <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                                {tr("nav.fiscalYear")}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[9px] font-medium text-success">
                                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                                {tr("nav.open")}
                            </span>
                        </div>
                        <div className="flex items-baseline justify-between">
                            <span className="font-mono text-[13px] font-semibold text-foreground">2025</span>
                            <span className="text-xs text-muted-foreground">{t("nav.yearRange" as never, undefined, { from: 2025, to: 2026 })}</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Shared switcher modal */}
            {clientSwitcher}
        </>
    )
}

function NavRow({
    item,
    pathname,
    hasClient,
    disabled,
}: {
    item: NavItem
    pathname: string
    hasClient: boolean
    disabled?: boolean
}) {
    const { t } = useI18n()
    const tr = (key: string) => t(key as never)
    const Icon = item.icon
    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

    if (disabled) {
        return (
            <li>
                <div
                    className="group flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-muted-foreground/60 cursor-not-allowed"
                >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1 truncate">{tr(item.labelKey)}</span>
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
                className={cn(
                    "group flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm font-medium transition-colors",
                    isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-accent",
                )}
            >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="flex-1 truncate">{tr(item.labelKey)}</span>
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
