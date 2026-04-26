"use client"

import { useMemo, Suspense } from "react"

import Link from "next/link"
import { Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { STATUS_COLORS } from "@cabinetra/domain-clients"
import { useI18n } from "@cabinetra/platform-i18n"
import { useDebounce } from "@cabinetra/ui-components/hooks/use-debounce"
import { useClientFiltering, type SortBy, ClientsFilters } from "@cabinetra/feature-clients"
import type { StatusFilter, RegimeFilter } from "@cabinetra/domain-clients"
import { ClientsGridSkeleton } from "@cabinetra/ui-clients"
import { useClientsSearch } from "@/hooks/use-clients-search"

export const ClientsPage = () => {
    const { t } = useI18n()
    const {
        query,
        statusFilter,
        regimeFilter,
        sortBy,
        sortDirection,
        onQueryChange,
        onStatusChange,
        onRegimeChange,
        onSortChangeWithDirection,
        onClearFilters,
    } = useClientFiltering()

    return (
        <section className="flex flex-col h-full gap-0">
            {/* Fixed header section */}
            <div className="shrink-0 space-y-1 pb-4">
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">{t("clients.page.title" as never)}</h1>
                <p className="text-sm text-muted-foreground">{t("clients.page.description" as never)}</p>
            </div>

            {/* Scrollable content section */}
            <Suspense fallback={<ClientsGridSkeleton />}>
                <ClientsGridContent
                    query={query}
                    onQueryChange={onQueryChange}
                    statusFilter={statusFilter}
                    onStatusChange={onStatusChange}
                    regimeFilter={regimeFilter}
                    onRegimeChange={onRegimeChange}
                    sortBy={sortBy}
                    onSortChangeWithDirection={onSortChangeWithDirection}
                    sortDirection={sortDirection as "asc" | "desc"}
                    onClearFilters={onClearFilters}
                />
            </Suspense>
        </section>
    )
}

function ClientsGridContent({
    query,
    onQueryChange,
    statusFilter,
    onStatusChange,
    regimeFilter,
    onRegimeChange,
    sortBy,
    onSortChangeWithDirection,
    sortDirection,
    onClearFilters,
}: {
    query: string
    onQueryChange: (query: string) => void
    statusFilter: StatusFilter
    onStatusChange: (status: StatusFilter) => void
    regimeFilter: RegimeFilter
    onRegimeChange: (regime: RegimeFilter) => void
    sortBy: SortBy
    onSortChangeWithDirection: (sort: SortBy, direction: "asc" | "desc") => void
    sortDirection: "asc" | "desc"
    onClearFilters: () => void
}) {
    const { t, locale } = useI18n()
    const debouncedQuery = useDebounce(query, 300)

    // Fetch clients from server with pagination and filtering
    const { data: clientsData, isLoading, error, pagination, goToPage } = useClientsSearch({
        query: debouncedQuery,
        status: statusFilter,
        regime: regimeFilter,
        sortBy,
        sortDirection,
        pageSize: 20,
    })

    const formatMad = (value: number) =>
        new Intl.NumberFormat(locale === "ar" ? "ar-MA" : locale === "en" ? "en-MA" : "fr-MA", {
            style: "currency",
            currency: "MAD",
            maximumFractionDigits: 0,
        }).format(value)

    const handleSortClick = (field: SortBy) => {
        if (sortBy === field) {
            // Toggle direction if clicking the same field
            onSortChangeWithDirection(field, sortDirection === "asc" ? "desc" : "asc")
        } else {
            // Reset to ascending when switching to a different field
            onSortChangeWithDirection(field, "asc")
        }
    }

    // Calculate status counts from current page data for UI feedback
    // Note: In production, you'd want to fetch these separately from the backend
    const statusCounts = useMemo(() => {
        return {
            active: clientsData.filter((c) => c.status === "active").length,
            review: clientsData.filter((c) => c.status === "review").length,
            pending_vat: clientsData.filter((c) => c.status === "pending_vat").length,
            overdue: clientsData.filter((c) => c.status === "overdue").length,
        }
    }, [clientsData])

    return (
        <div className="flex flex-col gap-4 min-h-0">
            {/* Summary Stats */}
            <div className="shrink-0 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <div className="rounded-lg border border-border/70 bg-card p-3">
                    <p className="text-xs font-medium text-muted-foreground">Total</p>
                    <p className="mt-1 text-lg font-semibold text-foreground">{pagination.total}</p>
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
            <div className="shrink-0 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="relative max-w-xl flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        value={query}
                        onChange={(event) => onQueryChange(event.target.value)}
                        placeholder={t("clients.page.searchPlaceholder" as never)}
                        className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm text-foreground outline-none ring-0 placeholder:text-muted-foreground focus:border-primary"
                    />
                </div>
                <div className="flex gap-2">
                    <ClientsFilters
                        onStatusChange={onStatusChange}
                        onRegimeChange={onRegimeChange}
                        onClearFilters={onClearFilters}
                        currentStatus={statusFilter}
                        currentRegime={regimeFilter}
                    />
                    <div className="flex items-center gap-1 rounded-lg border border-border/70 bg-card">
                        <button
                            onClick={() => handleSortClick("name")}
                            className={`flex items-center gap-1 px-3 py-2 text-sm transition ${sortBy === "name" ? "font-semibold text-primary" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            Name
                            {sortBy === "name" && (
                                sortDirection === "asc" ?
                                    <ChevronUp className="h-3 w-3" /> :
                                    <ChevronDown className="h-3 w-3" />
                            )}
                        </button>
                        <div className="border-r border-border/30" />
                        <button
                            onClick={() => handleSortClick("revenue")}
                            className={`flex items-center gap-1 px-3 py-2 text-sm transition ${sortBy === "revenue" ? "font-semibold text-primary" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            Revenue
                            {sortBy === "revenue" && (
                                sortDirection === "asc" ?
                                    <ChevronUp className="h-3 w-3" /> :
                                    <ChevronDown className="h-3 w-3" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Scrollable results section */}
            <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hidden space-y-4 flex flex-col">
                {/* Results Header with Pagination */}
                {clientsData.length > 0 && (
                    <div className="flex items-center justify-between rounded-lg bg-muted/30 px-4 py-2">
                        <p className="text-sm text-muted-foreground">
                            {t("clients.page.showing" as never, undefined, {
                                count: clientsData.length,
                                total: pagination.total,
                            })}
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => goToPage(pagination.page - 1)}
                                disabled={pagination.page === 1 || isLoading}
                                className="rounded p-1 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Previous page"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <span className="text-sm font-medium">
                                {pagination.page} / {pagination.totalPages}
                            </span>
                            <button
                                onClick={() => goToPage(pagination.page + 1)}
                                disabled={pagination.page === pagination.totalPages || isLoading}
                                className="rounded p-1 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Next page"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Loading or Error State */}
                {isLoading && (
                    <div className="rounded-2xl border border-dashed border-border/50 bg-card/50 p-12 text-center">
                        <div className="flex items-center justify-center gap-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-foreground" />
                            <p className="text-sm text-muted-foreground">Loading clients...</p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
                        <p className="text-sm font-medium text-red-700 dark:text-red-400">Error loading clients</p>
                        <p className="text-xs text-red-600 dark:text-red-500 mt-1">{error.message}</p>
                    </div>
                )}

                {/* Results */}
                {!isLoading && !error && clientsData.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-border/50 bg-card/50 p-12 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                            <svg
                                className="h-8 w-8 text-muted-foreground"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-base font-semibold text-foreground">{t("clients.page.noResults" as never)}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{t("clients.page.noResultsHint" as never)}</p>
                    </div>
                ) : (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 pb-4">
                            {clientsData.map((client) => (
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
                                            className={`inline-flex shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${STATUS_COLORS[client.status] ?? "bg-muted text-muted-foreground"}`}
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
            </div>
        </div>
    )
}

export default ClientsPage
