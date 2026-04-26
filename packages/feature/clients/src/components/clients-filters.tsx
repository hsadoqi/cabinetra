"use client"

import { CLIENT_REGIMES, CLIENT_STATUSES } from "@cabinetra/domain-clients"
import type { ClientStatus, Regime, RegimeFilter, StatusFilter } from "@cabinetra/domain-clients"
import { Filter, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@cabinetra/ui-components/primitives"
import { memo, useEffect } from "react"

import { useI18n } from "@cabinetra/platform-i18n"
import { useState } from "react"

interface ClientsFiltersProps {
    onStatusChange: (status: StatusFilter) => void
    onRegimeChange: (regime: RegimeFilter) => void
    onClearFilters: () => void
    currentStatus: StatusFilter
    currentRegime: RegimeFilter
}

const statusOptions: { value: ClientStatus; labelKey: string; color: string }[] = [
    { value: "active", labelKey: "switcher.status.active", color: "text-green-600 dark:text-green-400" },
    { value: "review", labelKey: "switcher.status.review", color: "text-blue-600 dark:text-blue-400" },
    { value: "pending_vat", labelKey: "switcher.status.pending", color: "text-amber-600 dark:text-amber-400" },
    { value: "overdue", labelKey: "switcher.status.overdue", color: "text-red-600 dark:text-red-400" },
]

const regimeOptions: { value: Regime; labelKey: string }[] = [
    { value: "normal", labelKey: "clients.filters.regime.normal" },
    { value: "simplified", labelKey: "clients.filters.regime.simplified" },
]

// Validation functions to ensure filter values are valid
function isValidStatusFilter(value: unknown): value is StatusFilter {
    return typeof value === "string" && (value === "" || CLIENT_STATUSES.includes(value as ClientStatus))
}

function isValidRegimeFilter(value: unknown): value is RegimeFilter {
    return typeof value === "string" && (value === "" || CLIENT_REGIMES.includes(value as Regime))
}

function ClientsFiltersComponent({
    onStatusChange,
    onRegimeChange,
    onClearFilters,
    currentStatus,
    currentRegime,
}: ClientsFiltersProps) {
    const { t } = useI18n()
    const [isOpen, setIsOpen] = useState(false)
    const [shouldAnimateBadge, setShouldAnimateBadge] = useState(false)

    const hasActiveFilters = currentStatus !== "" || currentRegime !== ""

    // Flash badge when filters are applied and panel closes
    useEffect(() => {
        if (!isOpen && hasActiveFilters) {
            setShouldAnimateBadge(true)
            const timer = setTimeout(() => setShouldAnimateBadge(false), 600)
            return () => clearTimeout(timer)
        }
    }, [isOpen, hasActiveFilters])

    // Handle Escape key to close filter panel
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            e.preventDefault()
            setIsOpen(false)
        }
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <button
                    aria-expanded={isOpen}
                    aria-controls="filters-panel"
                    className="flex items-center gap-2 rounded-lg border border-border/70 bg-card px-3 py-2 text-sm font-medium text-foreground transition hover:border-primary/50"
                >
                    <Filter className="h-4 w-4" />
                    {t("clients.filters.title" as never)}
                    {hasActiveFilters && (
                        <span
                            className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary transition-all duration-300"
                            style={
                                shouldAnimateBadge
                                    ? {
                                        animation: "badgeFlash 0.6s ease-out",
                                    }
                                    : {}
                            }
                        >
                            {(currentStatus !== "" ? 1 : 0) + (currentRegime !== "" ? 1 : 0)}
                        </span>
                    )}
                </button>
            </PopoverTrigger>

            <PopoverContent id="filters-panel" className="w-64 space-y-3 p-3" onKeyDown={handleKeyDown}>
                {/* Status Filter */}
                <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {t("clients.filters.status" as never)}
                    </h3>
                    <div className="space-y-1">
                        {/* All option */}
                        <label className="flex items-center gap-2 rounded px-2 py-1.5 text-sm transition hover:bg-muted/50">
                            <input
                                type="radio"
                                name="status"
                                value=""
                                checked={currentStatus === ""}
                                onChange={() => onStatusChange("")}
                                className="h-4 w-4"
                            />
                            <span className="text-foreground">{t("clients.filters.status.all" as never)}</span>
                        </label>
                        {/* Specific statuses */}
                        {statusOptions.map((option) => (
                            <label
                                key={option.value}
                                className="flex items-center gap-2 rounded px-2 py-1.5 text-sm transition hover:bg-muted/50"
                            >
                                <input
                                    type="radio"
                                    name="status"
                                    value={option.value}
                                    checked={currentStatus === option.value}
                                    onChange={(e) => {
                                        if (isValidStatusFilter(e.target.value)) {
                                            onStatusChange(e.target.value)
                                        }
                                    }}
                                    className="h-4 w-4"
                                />
                                <span className={option.color}>{t(option.labelKey as never)}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Regime Filter */}
                <div className="border-t border-border/70 pt-3">
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {t("clients.filters.regime" as never)}
                    </h3>
                    <div className="space-y-1">
                        {/* All option */}
                        <label className="flex items-center gap-2 rounded px-2 py-1.5 text-sm transition hover:bg-muted/50">
                            <input
                                type="radio"
                                name="regime"
                                value=""
                                checked={currentRegime === ""}
                                onChange={() => onRegimeChange("")}
                                className="h-4 w-4"
                            />
                            <span className="text-foreground">{t("clients.filters.regime.all" as never)}</span>
                        </label>
                        {/* Specific regimes */}
                        {regimeOptions.map((option) => (
                            <label
                                key={option.value}
                                className="flex items-center gap-2 rounded px-2 py-1.5 text-sm transition hover:bg-muted/50"
                            >
                                <input
                                    type="radio"
                                    name="regime"
                                    value={option.value}
                                    checked={currentRegime === option.value}
                                    onChange={(e) => {
                                        if (isValidRegimeFilter(e.target.value)) {
                                            onRegimeChange(e.target.value)
                                        }
                                    }}
                                    className="h-4 w-4"
                                />
                                <span>{t(option.labelKey as never)}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Clear Filters Button */}
                {hasActiveFilters && (
                    <div className="border-t border-border/70 pt-3">
                        <button
                            onClick={onClearFilters}
                            className="w-full flex items-center justify-center gap-2 rounded px-2 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition"
                        >
                            <X className="h-4 w-4" />
                            {t("clients.filters.clear" as never)}
                        </button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}

export const ClientsFilters = memo(ClientsFiltersComponent)
