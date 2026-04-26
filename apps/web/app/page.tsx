"use client"

import { useMemo } from "react"
import { Users, TrendingUp, AlertCircle, FileText, Zap } from "lucide-react"
import { useI18n } from "@cabinetra/platform-i18n"
import { calculateMetrics } from "@/lib/metrics"
import { MetricCard } from "@/components/dashboard/metric-card"
import { QuickAccessCard } from "@/components/dashboard/quick-access-card"

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
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back. Here&apos;s an overview of your business.
        </p>
      </div>

      {/* Critical Alerts */}
      {hasCriticalAlerts && (
        <div className="rounded-2xl border border-amber-200/50 bg-amber-50/50 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
            <div>
              <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-300">
                Attention needed
              </h3>
              <p className="mt-1 text-sm text-amber-800 dark:text-amber-200">
                {metrics.overdueClients > 0 && (
                  <>
                    {metrics.overdueClients} client{metrics.overdueClients !== 1 ? "s" : ""} overdue
                    {metrics.totalPendingDeclarations > 10 && " • "}
                  </>
                )}
                {metrics.totalPendingDeclarations > 10 && (
                  <>{metrics.totalPendingDeclarations} pending declarations</>
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
          description={`${metrics.activeClients} active`}
        />
        <MetricCard
          label={t("dashboard.metrics.monthlyRevenue" as never)}
          value={formatMad(metrics.totalMonthlyRevenue)}
          icon={<TrendingUp className="h-5 w-5" />}
          description={`Avg: ${formatMad(metrics.averageRevenue)}`}
        />
        <MetricCard
          label={t("dashboard.metrics.pendingDeclarations" as never)}
          value={metrics.totalPendingDeclarations}
          icon={<FileText className="h-5 w-5" />}
          variant={metrics.totalPendingDeclarations > 5 ? "warning" : "default"}
          description={`From ${metrics.criticalClients.length} client${metrics.criticalClients.length !== 1 ? "s" : ""}`}
        />
        <MetricCard
          label={t("dashboard.metrics.totalEmployees" as never)}
          value={metrics.totalEmployees}
          icon={<Zap className="h-5 w-5" />}
          description={`${metrics.totalUnreconciledEntries} entries to reconcile`}
        />
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Quick Access</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <QuickAccessCard
            href="/clients"
            title={t("clients.page.title" as never)}
            description="Manage all your clients"
            icon={<Users className="h-5 w-5" />}
            badge={`${metrics.activeClients} active`}
            badgeVariant="success"
          />
          {metrics.overdueClients > 0 && (
            <QuickAccessCard
              href="/clients"
              title="Overdue Clients"
              description="Clients with pending items"
              icon={<AlertCircle className="h-5 w-5" />}
              badge={`${metrics.overdueClients} overdue`}
              badgeVariant="danger"
            />
          )}
          <QuickAccessCard
            href="/clients"
            title="All Clients"
            description="Browse all {0} clients".replace("{0}", metrics.totalClients.toString())
            icon={<FileText className="h-5 w-5" />}
            badge={t("dashboard.viewAll" as never)}
          />
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
        <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Active</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-600 dark:text-emerald-400">{metrics.activeClients}</p>
        </div>
        <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Review</p>
          <p className="mt-2 text-2xl font-semibold text-blue-600 dark:text-blue-400">{metrics.reviewClients}</p>
        </div>
        <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Pending VAT</p>
          <p className="mt-2 text-2xl font-semibold text-amber-600 dark:text-amber-400">{metrics.pendingClients}</p>
        </div>
        <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Overdue</p>
          <p className="mt-2 text-2xl font-semibold text-red-600 dark:text-red-400">{metrics.overdueClients}</p>
        </div>
      </div>
    </section>
  )
}
