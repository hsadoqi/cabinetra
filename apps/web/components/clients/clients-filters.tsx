"use client"

import { useState, useMemo } from "react"
import { Filter, X } from "lucide-react"

export type StatusFilter = "all" | "active" | "pending_vat" | "review" | "overdue"
export type RegimeFilter = "all" | "normal" | "simplified"

interface ClientsFiltersProps {
    onStatusChange: (status: StatusFilter) => void
    onRegimeChange: (regime: RegimeFilter) => void
    currentStatus: StatusFilter
    currentRegime: RegimeFilter
}

const statusOptions: { value: StatusFilter; label: string; color: string }[] = [
    { value: "all", label: "All Status", color: "text-foreground" },
    { value: "active", label: "Active", color: "text-green-600 dark:text-green-400" },
    { value: "review", label: "Under Review", color: "text-blue-600 dark:text-blue-400" },
    { value: "pending_vat", label: "Pending VAT", color: "text-amber-600 dark:text-amber-400" },
    { value: "overdue", label: "Overdue", color: "text-red-600 dark:text-red-400" },
]

const regimeOptions: { value: RegimeFilter; label: string }[] = [
    { value: "all", label: "All Regimes" },
    { value: "normal", label: "Normal" },
    { value: "simplified", label: "Simplified" },
]

export function ClientsFilters({
    onStatusChange,
    onRegimeChange,
    currentStatus,
    currentRegime,
}: ClientsFiltersProps) {
    const [isOpen, setIsOpen] = useState(false)

    const hasActiveFilters = currentStatus !== "all" || currentRegime !== "all"

    return (
        <div className="space-y-3">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-lg border border-border/70 bg-card px-3 py-2 text-sm font-medium text-foreground transition hover:border-primary/50"
            >
                <Filter className="h-4 w-4" />
                Filters
                {hasActiveFilters && (
                    <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                        {(currentStatus !== "all" ? 1 : 0) + (currentRegime !== "all" ? 1 : 0)}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="space-y-3 rounded-xl border border-border/70 bg-card p-3">
                    {/* Status Filter */}
                    <div>
                        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Status
                        </h3>
                        <div className="space-y-1">
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
                                        onChange={(e) => onStatusChange(e.target.value as StatusFilter)}
                                        className="h-4 w-4"
                                    />
                                    <span className={option.color}>{option.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Regime Filter */}
                    <div className="border-t border-border/70 pt-3">
                        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Regime
                        </h3>
                        <div className="space-y-1">
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
                                        onChange={(e) => onRegimeChange(e.target.value as RegimeFilter)}
                                        className="h-4 w-4"
                                    />
                                    <span>{option.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Clear Filters */}
                    {hasActiveFilters && (
                        <button
                            onClick={() => {
                                onStatusChange("all")
                                onRegimeChange("all")
                            }}
                            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-muted/50 px-2 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-muted"
                        >
                            <X className="h-3 w-3" />
                            Clear Filters
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}
