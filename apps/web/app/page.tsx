"use client"

import { AlertCircle, FileText, TrendingUp, Users, Zap } from "lucide-react"

import Link from "next/link"
import { MetricCard } from "@/components/dashboard/metric-card"
import { QuickAccessCard } from "@/components/dashboard/quick-access-card"
import { calculateMetrics } from "@/lib/metrics"
import { useI18n } from "@cabinetra/platform-i18n"
import { useMemo } from "react"

export default function Home() {
  const { locale, t } = useI18n()
  const metrics = useMemo(() => calculateMetrics(), [])

  const formatMad = (value: number) =>
    new Intl.NumberFormat(locale === "ar" ? "ar-MA" : locale === "en" ? "en-MA" : "fr-MA", {
      style: "currency",
      currency: "MAD",
      maximumFractionDigits: 0,
    }).format(value)

  const hasCriticalAlerts = metrics.overdueClients > 0 || metrics.totalPendingDeclarations > 10

  return (
    <section className="space-y-6 pb-10">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{t("dashboard.title" as never)}</h1>
        <p className="text-sm text-muted-foreground">
          {t("dashboard.subtitle" as never)}
        </p>
      </div>

      {/* Critical Alerts */}
      {hasCriticalAlerts && (
        <div className="rounded-2xl border border-amber-200/50 bg-amber-50/50 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
            <div>
              <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-300">
                {t("dashboard.alerts.attentionNeeded" as never)}
              </h3>
              <p className="mt-1 text-sm text-amber-800 dark:text-amber-200">
                {metrics.overdueClients > 0 && (
                  <>
                    {t("dashboard.alerts.overdueClients" as never, undefined, {
                      count: metrics.overdueClients,
                    })}
                    {metrics.totalPendingDeclarations > 10 && " • "}
                  </>
                )}
                {metrics.totalPendingDeclarations > 10 && (
                  <>
                    {t("dashboard.alerts.pendingDeclarations" as never, undefined, {
                      count: metrics.totalPendingDeclarations,
                    })}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label={t("dashboard.metrics.totalClients" as never)}
          value={metrics.totalClients}
          icon={<Users className="h-5 w-5" />}
          description={t("dashboard.metrics.activeClients" as never, undefined, { count: metrics.activeClients })}
          href="/clients"
        />
        <MetricCard
          label={t("dashboard.metrics.monthlyRevenue" as never)}
          value={formatMad(metrics.totalMonthlyRevenue)}
          icon={<TrendingUp className="h-5 w-5" />}
          description={t("dashboard.metrics.averageRevenue" as never, undefined, { value: formatMad(metrics.averageRevenue) })}
        />
        <MetricCard
          label={t("dashboard.metrics.pendingDeclarations" as never)}
          value={metrics.totalPendingDeclarations}
          icon={<FileText className="h-5 w-5" />}
          variant={metrics.totalPendingDeclarations > 5 ? "warning" : "default"}
          description={t("dashboard.metrics.fromClients" as never, undefined, { count: metrics.criticalClients.length })}
          href="/clients?status=pending_vat"
        />
        <MetricCard
          label={t("dashboard.metrics.totalEmployees" as never)}
          value={metrics.totalEmployees}
          icon={<Zap className="h-5 w-5" />}
          description={t("dashboard.metrics.entriesToReconcile" as never, undefined, { count: metrics.totalUnreconciledEntries })}
        />
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground">{t("dashboard.quickAccess" as never)}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <QuickAccessCard
            href="/clients"
            title={t("clients.page.title" as never)}
            description={t("dashboard.quick.manageClients" as never)}
            icon={<Users className="h-5 w-5" />}
            badge={t("dashboard.metrics.activeClients" as never, undefined, { count: metrics.activeClients })}
            badgeVariant="success"
          />
          {metrics.overdueClients > 0 && (
            <QuickAccessCard
              href="/clients?status=overdue"
              title={t("dashboard.quick.overdueClients" as never)}
              description={t("dashboard.quick.clientsWithPending" as never)}
              icon={<AlertCircle className="h-5 w-5" />}
              badge={t("dashboard.quick.overdueCount" as never, undefined, { count: metrics.overdueClients })}
              badgeVariant="danger"
            />
          )}
          <QuickAccessCard
            href="/clients"
            title={t("dashboard.quick.allClients" as never)}
            description={t("dashboard.quick.browseAllClients" as never, undefined, { count: metrics.totalClients })}
            icon={<FileText className="h-5 w-5" />}
            badge={t("dashboard.viewAll" as never)}
          />
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
        <Link href="/clients?status=active" className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition hover:border-emerald-400/50 hover:shadow-md hover:-translate-y-0.5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("switcher.status.active" as never)}</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-600 dark:text-emerald-400">{metrics.activeClients}</p>
        </Link>
        <Link href="/clients?status=review" className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition hover:border-blue-400/50 hover:shadow-md hover:-translate-y-0.5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("switcher.status.review" as never)}</p>
          <p className="mt-2 text-2xl font-semibold text-blue-600 dark:text-blue-400">{metrics.reviewClients}</p>
        </Link>
        <Link href="/clients?status=pending_vat" className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition hover:border-amber-400/50 hover:shadow-md hover:-translate-y-0.5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("switcher.status.pending" as never)}</p>
          <p className="mt-2 text-2xl font-semibold text-amber-600 dark:text-amber-400">{metrics.pendingClients}</p>
        </Link>
        <Link href="/clients?status=overdue" className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition hover:border-red-400/50 hover:shadow-md hover:-translate-y-0.5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("switcher.status.overdue" as never)}</p>
          <p className="mt-2 text-2xl font-semibold text-red-600 dark:text-red-400">{metrics.overdueClients}</p>
        </Link>
      </div>
    </section>
  )
}
