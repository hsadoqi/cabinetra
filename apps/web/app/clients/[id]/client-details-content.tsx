"use client"

import type { ClientRecord } from "@/lib/clients-data"
import { useI18n } from "@cabinetra/platform-i18n"

const statusKeyByCode: Record<ClientRecord["status"], string> = {
    active: "switcher.status.active",
    pending_vat: "switcher.status.pending",
    review: "switcher.status.review",
    overdue: "switcher.status.overdue",
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
        <section className="space-y-6 px-4 pb-6 md:px-6">
            <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("clients.workspace" as never)}</p>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">{client.name}</h1>
                <p className="text-sm text-muted-foreground">ID: {client.id}</p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <article className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
                    <p className="text-xs text-muted-foreground">{t("clients.kpi.monthlyRevenue" as never)}</p>
                    <p className="mt-1 text-xl font-semibold text-foreground">{formatMad(client.monthlyRevenueMad)}</p>
                    <p className="mt-2">
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${getDeltaTone(client.monthlyRevenueDeltaPct)}`}>
                            {formatDelta(client.monthlyRevenueDeltaPct, "%")}
                        </span>
                    </p>
                </article>
                <article className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
                    <p className="text-xs text-muted-foreground">{t("clients.kpi.pendingDeclarations" as never)}</p>
                    <p className="mt-1 text-xl font-semibold text-foreground">{client.pendingDeclarations}</p>
                    <p className="mt-2">
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${getDeltaTone(client.pendingDeclarationsDelta, true)}`}>
                            {formatDelta(client.pendingDeclarationsDelta)}
                        </span>
                    </p>
                </article>
                <article className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
                    <p className="text-xs text-muted-foreground">{t("clients.kpi.unreconciledEntries" as never)}</p>
                    <p className="mt-1 text-xl font-semibold text-foreground">{client.unreconciledEntries}</p>
                    <p className="mt-2">
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${getDeltaTone(client.unreconciledEntriesDelta, true)}`}>
                            {formatDelta(client.unreconciledEntriesDelta)}
                        </span>
                    </p>
                </article>
                <article className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
                    <p className="text-xs text-muted-foreground">{t("clients.kpi.employees" as never)}</p>
                    <p className="mt-1 text-xl font-semibold text-foreground">{client.employeeCount}</p>
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
                    <dl className="mt-4 space-y-2 text-sm">
                        <div className="flex items-center justify-between gap-3">
                            <dt className="text-muted-foreground">{t("clients.profile.name" as never)}</dt>
                            <dd className="font-medium text-foreground">{client.name}</dd>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                            <dt className="text-muted-foreground">{t("clients.profile.legalForm" as never)}</dt>
                            <dd className="font-medium text-foreground">{client.legalForm}</dd>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                            <dt className="text-muted-foreground">{t("clients.profile.ice" as never)}</dt>
                            <dd className="font-mono text-foreground">{client.ice}</dd>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                            <dt className="text-muted-foreground">{t("clients.profile.regime" as never)}</dt>
                            <dd className="font-medium capitalize text-foreground">{client.regime}</dd>
                        </div>
                    </dl>
                </article>

                <article className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
                    <h2 className="text-sm font-semibold text-foreground">{t("clients.status" as never)}</h2>
                    <div className="mt-4 space-y-3">
                        <div className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium capitalize text-foreground">
                            {t(statusKeyByCode[client.status] as never)}
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{t("clients.status.lastUpdated" as never)}</span>
                            <span className="font-medium text-foreground">{formatRelativeDate(client.lastUpdatedAt)}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {t("clients.status.routeNote" as never)}
                        </p>
                    </div>
                </article>
            </div>
        </section>
    )
}
