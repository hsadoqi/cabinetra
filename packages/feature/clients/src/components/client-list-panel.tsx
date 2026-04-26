"use client"

import type { ClientListItem, ClientStatus } from "@cabinetra/domain-clients"
import { STATUS_COLORS, clients } from "@cabinetra/domain-clients"

import { useI18n } from "@cabinetra/platform-i18n"
import { useMemo } from "react"

export interface ClientListPanelProps {
    onClientClick?: (clientId: string) => void
}

export function ClientListPanel({ onClientClick }: ClientListPanelProps) {
    const { t } = useI18n()

    const stats = useMemo(
        () => ({
            total: clients.length,
            active: clients.filter((c: ClientListItem) => c.status === "active").length,
            pendingVat: clients.filter((c: ClientListItem) => c.status === "pending_vat").length,
            overdue: clients.filter((c: ClientListItem) => c.status === "overdue").length,
        }),
        []
    )

    return (
        <div className="space-y-4">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                    { label: t("clients.stats.total" as never), value: stats.total, color: "bg-slate-50" },
                    { label: t("clients.stats.active" as never), value: stats.active, color: "bg-green-50" },
                    { label: t("clients.stats.pendingVat" as never), value: stats.pendingVat, color: "bg-blue-50" },
                    { label: t("clients.stats.overdue" as never), value: stats.overdue, color: "bg-red-50" },
                ].map((stat, idx) => (
                    <div key={idx} className={`${stat.color} rounded-lg border border-border/50 p-3`}>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Clients Grid */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {clients.map((client: ClientListItem) => (
                    <div
                        key={client.id}
                        onClick={() => onClientClick?.(client.id)}
                        className="group cursor-pointer rounded-2xl border border-border/50 bg-card p-4 shadow-sm transition-all hover:border-border hover:shadow-md"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1 space-y-1">
                                <h3 className="truncate font-semibold group-hover:text-primary">{client.name}</h3>
                                <p className="text-sm text-muted-foreground">{client.legalForm}</p>
                            </div>
                            <span
                                className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[client.status as ClientStatus] || STATUS_COLORS.active
                                    }`}
                            >
                                {t(`clients.status.${client.status}` as never)}
                            </span>
                        </div>
                        <div className="mt-3 space-y-2 text-sm">
                            <div className="flex justify-between text-muted-foreground">
                                <span>ICE</span>
                                <span className="font-mono">{client.ice}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {clients.length === 0 && (
                <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
                    <p className="text-sm text-muted-foreground">{t("clients.noResults" as never)}</p>
                </div>
            )}
        </div>
    )
}
