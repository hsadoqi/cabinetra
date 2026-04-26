"use client"

import {
    BookOpen,
    Building2,
    ChevronDown,
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
    X,
} from "lucide-react"

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

type ClientStatus = "active" | "pending_vat" | "review" | "overdue"

const statusDot: Record<ClientStatus, string> = {
    active: "bg-success",
    pending_vat: "bg-info",
    review: "bg-warning",
    overdue: "bg-destructive",
}

const statusLabelKey: Record<ClientStatus, string> = {
    active: "switcher.status.active",
    pending_vat: "switcher.status.pending",
    review: "switcher.status.review",
    overdue: "switcher.status.overdue",
}

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

    return (
        <>
            <aside
                className="hidden md:flex w-[248px] shrink-0 flex-col border-e border-sidebar-border bg-sidebar text-sidebar-foreground"
                aria-label={tr("nav.mainAria")}
            >
                {/* Client Picker */}
                <div className="px-2 pt-2 pb-1">
                    {hasClient ? (
                        <div className="rounded-sm border border-sidebar-border bg-background overflow-hidden">
                            {/* Client row */}
                            <button
                                onClick={onOpenClientSwitcher}
                                className="w-full flex items-center gap-2 px-2 py-2 hover:bg-accent/60 text-start"
                                aria-label={tr("nav.client.change")}
                            >
                                <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-secondary text-foreground text-[10px] font-bold shrink-0">
                                    {currentClient.name
                                        .split(" ")
                                        .slice(0, 2)
                                        .map((w: string) => w[0])
                                        .join("")}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                        <span
                                            className={cn("h-1.5 w-1.5 rounded-full shrink-0", statusDot[currentClient.status])}
                                            title={tr(statusLabelKey[currentClient.status])}
                                            aria-hidden="true"
                                        />
                                        <span className="text-[12px] font-semibold text-foreground truncate">
                                            {currentClient.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-0.5 text-[10px] text-muted-foreground font-mono">
                                        <span>{currentClient.id}</span>
                                        <span className="text-border">·</span>
                                        <span>{currentClient.legalForm}</span>
                                    </div>
                                </div>
                                <ChevronDown className="h-3 w-3 text-muted-foreground shrink-0" />
                            </button>

                            {/* Meta */}
                            <div className="grid grid-cols-2 border-t border-sidebar-border bg-secondary/20 text-[10px]">
                                <div className="px-2 py-1.5 border-e border-sidebar-border">
                                    <div className="text-muted-foreground">ICE</div>
                                    <div className="font-mono text-foreground truncate">
                                        {currentClient.ice.slice(0, 10)}…
                                    </div>
                                </div>
                                <div className="px-2 py-1.5">
                                    <div className="text-muted-foreground">{tr("nav.regime")}</div>
                                    <div className="font-medium text-foreground truncate capitalize">
                                        {currentClient.regime}
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center border-t border-sidebar-border divide-x divide-sidebar-border rtl:divide-x-reverse">
                                <Link
                                    href={`/clients/${currentClient.id}`}
                                    className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-[10px] font-medium text-foreground hover:bg-accent/60"
                                >
                                    <Building2 className="h-3 w-3" />
                                    {tr("nav.client.viewDossier")}
                                </Link>
                                <button
                                    onClick={onClearClient}
                                    className="flex items-center justify-center gap-1 px-2 py-1.5 text-[10px] font-medium text-muted-foreground hover:bg-accent/60 hover:text-destructive"
                                    aria-label={tr("nav.client.clear")}
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={onOpenClientSwitcher}
                            className="w-full flex items-center gap-2 rounded-sm border border-dashed border-sidebar-border bg-background/50 px-2 py-2.5 hover:bg-accent/40 hover:border-primary/40 text-start group"
                        >
                            <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-muted text-muted-foreground shrink-0 group-hover:bg-primary/10 group-hover:text-primary">
                                <Building2 className="h-3.5 w-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[12px] font-medium text-foreground truncate">
                                    {tr("nav.client.select")}
                                </div>
                                <div className="text-[10px] text-muted-foreground truncate">
                                    {tr("nav.client.none")}
                                </div>
                            </div>
                            <kbd className="hidden group-hover:inline-flex items-center rounded border border-border bg-background px-1 py-0.5 font-mono text-[9px] text-muted-foreground shrink-0">
                                ⌘K
                            </kbd>
                        </button>
                    )}
                </div>

                {/* Primary nav */}
                <nav className="flex-1 overflow-y-auto py-2">
                    {/* Firm-wide section */}
                    <div className="px-2 pb-1">
                        <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground px-2 py-1">
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
                            <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                                {tr("nav.clientScoped")}
                            </p>
                            {hasClient && (
                                <span className="inline-flex items-center gap-1 text-[9px] font-medium text-primary">
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
                        <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground px-2 py-1">
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
                            <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">
                                {tr("nav.fiscalYear")}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[9px] font-medium text-success">
                                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                                {tr("nav.open")}
                            </span>
                        </div>
                        <div className="flex items-baseline justify-between">
                            <span className="font-mono text-[13px] font-semibold text-foreground">2025</span>
                            <span className="text-[10px] text-muted-foreground">{tr("nav.yearRange")}</span>
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
                    className="group flex items-center gap-2 rounded-sm px-2 py-1.5 text-[12px] text-muted-foreground/60 cursor-not-allowed"
                    aria-disabled="true"
                    title={tr("nav.client.select")}
                >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="flex-1 truncate">{tr(item.labelKey)}</span>
                </div>
            </li>
        )
    }

    return (
        <li>
            <Link
                href={item.href}
                className={cn(
                    "group flex items-center gap-2 rounded-sm px-2 py-1.5 text-[12px] transition-colors",
                    isActive
                        ? "bg-primary/10 text-foreground font-semibold"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/60",
                )}
            >
                <Icon
                    className={cn(
                        "h-3.5 w-3.5 shrink-0",
                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                    )}
                />
                <span className="flex-1 truncate">{tr(item.labelKey)}</span>
                {item.badge && (
                    <span className="rounded-sm bg-background border border-border px-1.5 text-[9px] font-mono text-muted-foreground tabular-nums">
                        {item.badge}
                    </span>
                )}
                {item.shortcut && !item.badge && (
                    <span className="hidden group-hover:inline font-mono text-[9px] text-muted-foreground">
                        {item.shortcut}
                    </span>
                )}
                {item.clientScoped && hasClient && !item.badge && !item.shortcut && (
                    <CircleDot className="h-2 w-2 text-primary opacity-0 group-hover:opacity-100" />
                )}
            </Link>
        </li>
    )
}
