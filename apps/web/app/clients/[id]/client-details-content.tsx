"use client"

import type { ClientRecord } from "@/lib/clients-data"
import { useI18n } from "@cabinetra/platform-i18n"
import { ClientBreadcrumb } from "@/components/clients/client-breadcrumb"
import { ClientActions } from "@/components/clients/client-actions"

const statusKeyByCode: Record<ClientRecord["status"], string> = {
    active: "switcher.status.active",
    pending_vat: "switcher.status.pending",
    review: "switcher.status.review",
    overdue: "switcher.status.overdue",
}

const statusColors: Record<ClientRecord["status"], string> = {
    active: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    pending_vat: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    review: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    overdue: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
}

export function ClientDetailsContent({ client }: { client: ClientRecord }) {
    const { locale, t } = useI18n()

    const formatMad = (value: number) =>
        new Intl.NumberFormat(locale === "ar" ? "ar-MA" : locale === "en" ? "en-MA" : "fr-MA", {
            style: "currency",
            currency: "MAD",
            maximumFractionDigits: 0,
        }).format(value)

    const formatRelativeDate = (isoDate: string) => {
        const now = new Date()
        const value = new Date(isoDate)
        const diffMs = value.getTime() - now.getTime()
        const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))

        if (Math.abs(diffDays) < 1) {
            const diffHours = Math.round(diffMs / (1000 * 60 * 60))
            return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(diffHours, "hour")
        }

        return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(diffDays, "day")
    }

    const getDeltaTone = (delta: number, inverse = false) => {
        if (delta === 0) {
            return "bg-muted text-muted-foreground"
        }

        const isPositive = delta > 0
        const isGood = inverse ? !isPositive : isPositive

        return isGood ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
    }

    const formatDelta = (delta: number, suffix = "") => {
        if (delta === 0) {
            return `0${suffix}`
        }

        const sign = delta > 0 ? "+" : ""
        return `${sign}${delta}${suffix}`
    }

    return (
        <section className="space-y-6 pb-10">
            {/* Breadcrumb Navigation */}
            <ClientBreadcrumb clientName={client.name} clientId={client.id} />

            {/* Header with Title and Actions */}
            <div className="space-y-4">
                <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("clients.workspace" as never)}</p>
                    <div className="flex items-baseline justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight text-foreground">{client.name}</h1>
                            <p className="text-sm text-muted-foreground">ID: {client.id}</p>
                        </div>
                        <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium capitalize whitespace-nowrap ${statusColors[client.status]}`}>
                            {t(statusKeyByCode[client.status] as never)}
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <ClientActions clientName={client.name} />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <article className="rounded-2xl border border-emerald-200/50 bg-emerald-50/30 p-4 shadow-sm dark:border-emerald-900/50 dark:bg-emerald-950/10">
                    <p className="text-xs font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-300">{t("clients.kpi.monthlyRevenue" as never)}</p>
                    <p className="mt-2 text-xl font-semibold text-foreground">{formatMad(client.monthlyRevenueMad)}</p>
                    <p className="mt-2">
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${getDeltaTone(client.monthlyRevenueDeltaPct)}`}>
                            {formatDelta(client.monthlyRevenueDeltaPct, "%")}
                        </span>
                    </p>
                </article>
                <article className="rounded-2xl border border-amber-200/50 bg-amber-50/30 p-4 shadow-sm dark:border-amber-900/50 dark:bg-amber-950/10">
                    <p className="text-xs font-medium uppercase tracking-wide text-amber-700 dark:text-amber-300">{t("clients.kpi.pendingDeclarations" as never)}</p>
                    <p className="mt-2 text-xl font-semibold text-foreground">{client.pendingDeclarations}</p>
                    <p className="mt-2">
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${getDeltaTone(client.pendingDeclarationsDelta, true)}`}>
                            {formatDelta(client.pendingDeclarationsDelta)}
                        </span>
                    </p>
                </article>
                <article className="rounded-2xl border border-blue-200/50 bg-blue-50/30 p-4 shadow-sm dark:border-blue-900/50 dark:bg-blue-950/10">
                    <p className="text-xs font-medium uppercase tracking-wide text-blue-700 dark:text-blue-300">{t("clients.kpi.unreconciledEntries" as never)}</p>
                    <p className="mt-2 text-xl font-semibold text-foreground">{client.unreconciledEntries}</p>
                    <p className="mt-2">
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${getDeltaTone(client.unreconciledEntriesDelta, true)}`}>
                            {formatDelta(client.unreconciledEntriesDelta)}
                        </span>
                    </p>
                </article>
                <article className="rounded-2xl border border-purple-200/50 bg-purple-50/30 p-4 shadow-sm dark:border-purple-900/50 dark:bg-purple-950/10">
                    <p className="text-xs font-medium uppercase tracking-wide text-purple-700 dark:text-purple-300">{t("clients.kpi.employees" as never)}</p>
                    <p className="mt-2 text-xl font-semibold text-foreground">{client.employeeCount}</p>
                    <p className="mt-2">
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${getDeltaTone(client.employeeCountDelta)}`}>
                            {formatDelta(client.employeeCountDelta)}
                        </span>
                    </p>
                </article>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <article className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
                    <h2 className="text-sm font-semibold text-foreground">{t("clients.profile" as never)}</h2>
                    <dl className="mt-4 space-y-3 text-sm">
                        <div className="flex items-center justify-between gap-3 border-b border-border/50 pb-3 last:border-0 last:pb-0">
                            <dt className="font-medium text-muted-foreground">{t("clients.profile.name" as never)}</dt>
                            <dd className="font-semibold text-foreground">{client.name}</dd>
                        </div>
                        <div className="flex items-center justify-between gap-3 border-b border-border/50 pb-3 last:border-0 last:pb-0">
                            <dt className="font-medium text-muted-foreground">{t("clients.profile.legalForm" as never)}</dt>
                            <dd className="font-semibold text-foreground">{client.legalForm}</dd>
                        </div>
                        <div className="flex items-center justify-between gap-3 border-b border-border/50 pb-3 last:border-0 last:pb-0">
                            <dt className="font-medium text-muted-foreground">{t("clients.profile.ice" as never)}</dt>
                            <dd className="font-mono text-foreground">{client.ice}</dd>
                        </div>
                        <div className="flex items-center justify-between gap-3 border-b border-border/50 pb-3 last:border-0 last:pb-0">
                            <dt className="font-medium text-muted-foreground">{t("clients.profile.regime" as never)}</dt>
                            <dd className="font-semibold capitalize text-foreground">{client.regime}</dd>
                        </div>
                    </dl>
                </article>

                <article className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
                    <h2 className="text-sm font-semibold text-foreground">{t("clients.status" as never)}</h2>
                    <div className="mt-4 space-y-4">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">Current Status</p>
                            <div className={`inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold capitalize ${statusColors[client.status]}`}>
                                {t(statusKeyByCode[client.status] as never)}
                            </div>
                        </div>
                        <div className="border-t border-border/50 pt-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-medium text-muted-foreground">{t("clients.status.lastUpdated" as never)}</span>
                                <span className="font-semibold text-foreground">{formatRelativeDate(client.lastUpdatedAt)}</span>
                            </div>
                            <p className="mt-2 text-xs text-muted-foreground">
                                {t("clients.status.routeNote" as never)}
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    )
}
