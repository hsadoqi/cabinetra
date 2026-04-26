"use client"

import { useMemo, useState } from "react"

import Link from "next/link"
import { Search, ArrowUpDown } from "lucide-react"
import { clients } from "@/lib/clients-data"
import { useI18n } from "@cabinetra/platform-i18n"
import { ClientsFilters, type StatusFilter, type RegimeFilter } from "@/components/clients/clients-filters"

const statusStyles: Record<string, string> = {
    active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    pending_vat: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    review: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    overdue: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
}

type SortBy = "name" | "revenue" | "status" | "updated"

export const ClientsPage = () => {
    const { t, locale } = useI18n()
    const [query, setQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
    const [regimeFilter, setRegimeFilter] = useState<RegimeFilter>("all")
    const [sortBy, setSortBy] = useState<SortBy>("name")

    const formatMad = (value: number) =>
        new Intl.NumberFormat(locale === "ar" ? "ar-MA" : locale === "en" ? "en-MA" : "fr-MA", {
            style: "currency",
            currency: "MAD",
            maximumFractionDigits: 0,
        }).format(value)

    const filteredAndSortedClients = useMemo(() => {
        let result = clients.filter((client) => {
            const trimmed = query.trim().toLowerCase()
            const matchesSearch =
                !trimmed ||
                [client.name, client.id, client.legalForm, client.ice, client.regime]
                    .join(" ")
                    .toLowerCase()
                    .includes(trimmed)

            const matchesStatus = statusFilter === "all" || client.status === statusFilter
            const matchesRegime = regimeFilter === "all" || client.regime === regimeFilter

            return matchesSearch && matchesStatus && matchesRegime
        })

        // Sort
        result.sort((a, b) => {
            if (sortBy === "name") return a.name.localeCompare(b.name)
            if (sortBy === "revenue") return b.monthlyRevenueMad - a.monthlyRevenueMad
            if (sortBy === "status") return a.status.localeCompare(b.status)
            if (sortBy === "updated") return new Date(b.lastUpdatedAt).getTime() - new Date(a.lastUpdatedAt).getTime()
            return 0
        })

        return result
    }, [query, statusFilter, regimeFilter, sortBy])

    const statusCounts = useMemo(() => {
        return {
            active: clients.filter((c) => c.status === "active").length,
            review: clients.filter((c) => c.status === "review").length,
            pending_vat: clients.filter((c) => c.status === "pending_vat").length,
            overdue: clients.filter((c) => c.status === "overdue").length,
        }
    }, [])

    return (
        <section className="flex flex-col gap-4">
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">{t("clients.page.title" as never)}</h1>
                <p className="text-sm text-muted-foreground">{t("clients.page.description" as never)}</p>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <div className="rounded-lg border border-border/70 bg-card p-3">
                    <p className="text-xs font-medium text-muted-foreground">Total</p>
                    <p className="mt-1 text-lg font-semibold text-foreground">{clients.length}</p>
                </div>
                <div className="rounded-lg border border-border/70 bg-card p-3">
                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Active</p>
                    <p className="mt-1 text-lg font-semibold text-foreground">{statusCounts.active}</p>
                </div>
                <div className="rounded-lg border border-border/70 bg-card p-3">
                    <p className="text-xs font-medium text-amber-600 dark:text-amber-400">Pending</p>
                    <p className="mt-1 text-lg font-semibold text-foreground">{statusCounts.pending_vat}</p>
                </div>
                <div className="rounded-lg border border-border/70 bg-card p-3">
                    <p className="text-xs font-medium text-red-600 dark:text-red-400">Overdue</p>
                    <p className="mt-1 text-lg font-semibold text-foreground">{statusCounts.overdue}</p>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="relative max-w-xl flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder={t("clients.page.searchPlaceholder" as never)}
                        className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm text-foreground outline-none ring-0 placeholder:text-muted-foreground focus:border-primary"
                    />
                </div>
                <div className="flex gap-2">
                    <ClientsFilters
                        onStatusChange={setStatusFilter}
                        onRegimeChange={setRegimeFilter}
                        currentStatus={statusFilter}
                        currentRegime={regimeFilter}
                    />
                    <div className="flex items-center gap-1 rounded-lg border border-border/70 bg-card">
                        <button
                            onClick={() => setSortBy("name")}
                            className={`flex items-center gap-1 px-3 py-2 text-sm transition ${sortBy === "name" ? "font-semibold text-primary" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            Name
                            {sortBy === "name" && <ArrowUpDown className="h-3 w-3" />}
                        </button>
                        <div className="border-r border-border/30" />
                        <button
                            onClick={() => setSortBy("revenue")}
                            className={`flex items-center gap-1 px-3 py-2 text-sm transition ${sortBy === "revenue" ? "font-semibold text-primary" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            Revenue
                            {sortBy === "revenue" && <ArrowUpDown className="h-3 w-3" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Results */}
            {filteredAndSortedClients.length === 0 ? (
                <div className="rounded-2xl border border-border/70 bg-card p-6 text-center text-sm text-muted-foreground">
                    <p>{t("clients.page.noResults" as never)}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredAndSortedClients.map((client) => (
                        <Link
                            key={client.id}
                            href={`/clients/${client.id}`}
                            className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0 flex-1">
                                    <h2 className="truncate text-sm font-semibold text-foreground">{client.name}</h2>
                                    <p className="text-xs text-muted-foreground">{client.id}</p>
                                </div>
                                <span
                                    className={`inline-flex shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${statusStyles[client.status] ?? "bg-muted text-muted-foreground"}`}
                                >
                                    {client.status.replace("_", " ")}
                                </span>
                            </div>

                            <dl className="mt-3 space-y-1 text-xs text-muted-foreground">
                                <div className="flex justify-between gap-3">
                                    <dt>Revenue</dt>
                                    <dd className="font-medium text-foreground">{formatMad(client.monthlyRevenueMad)}</dd>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <dt>Regime</dt>
                                    <dd className="font-medium capitalize text-foreground">{client.regime}</dd>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <dt>Pending</dt>
                                    <dd className="font-medium text-foreground">{client.pendingDeclarations}</dd>
                                </div>
                            </dl>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    )
}

export default ClientsPage
