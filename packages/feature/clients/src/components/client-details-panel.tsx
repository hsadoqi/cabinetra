"use client"

import {
    ClientAlertsPanel,
    ClientContextSetter,
    ClientDeadlines,
    ClientHeader,
    ClientKpiStrip,
    ClientRecentEntries,
    ClientTabs,
    ClientVatCard,
    ComplianceSummaryPanel,
    VatFilingPanel,
    AuditInfoPanel,
    DocumentsPanel,
} from "@cabinetra/ui-clients"

import type { ClientRecord } from "@cabinetra/domain-clients"
import { useI18n } from "@cabinetra/platform-i18n"
import { useSearchParams } from "next/navigation"

export interface ClientDetailsPanelProps {
    client: ClientRecord
    breadcrumb?: React.ReactNode
    actions?: React.ReactNode
}

/**
 * ClientDetailsPanel
 * 
 * Orchestrates the client detail view layout and tab navigation.
 * Composes multiple UI components into a cohesive panel experience.
 * 
 * Reusable across web, desktop, and admin applications.
 */
export function ClientDetailsPanel({
    client,
    breadcrumb,
    actions,
}: ClientDetailsPanelProps) {
    const { t } = useI18n()
    const searchParams = useSearchParams()
    const activeTab = searchParams.get("tab") || "overview"

    return (
        <>
            <ClientContextSetter client={client} />
            <section className="flex flex-col h-full gap-0">
                {/* Fixed header section */}
                <div className="shrink-0 space-y-6">
                    {/* Breadcrumb Navigation - optional */}
                    {breadcrumb && <div>{breadcrumb}</div>}

                    {/* Client Header */}
                    <ClientHeader client={client} />

                    {/* Action Buttons - optional */}
                    {actions && <div>{actions}</div>}
                </div>

                {/* Navigation Tabs */}
                <div className="shrink-0 mt-6">
                    <ClientTabs active={activeTab} />
                </div>

                {/* Scrollable content section */}
                <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hidden">
                    <div className="p-6 space-y-6">
                        {/* KPI Strip */}
                        <ClientKpiStrip client={client} />

                        {/* Tab content */}
                        {activeTab === "overview" && (
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                <ClientVatCard client={client} />
                                <ClientAlertsPanel />
                            </div>
                        )}

                        {activeTab === "compliance" && (
                            <div className="space-y-6">
                                <ComplianceSummaryPanel client={client} />
                                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                                    <div className="lg:col-span-2">
                                        <VatFilingPanel client={client} />
                                    </div>
                                    <DocumentsPanel client={client} />
                                </div>
                                <AuditInfoPanel client={client} />
                            </div>
                        )}

                        {activeTab === "journal" && <ClientRecentEntries />}

                        {activeTab === "payroll" && (
                            <div className="text-center py-8 text-muted-foreground">
                                <p>
                                    {t("clients.payroll.notImplemented" as never, undefined, {
                                        defaultValue: "Payroll features coming soon",
                                    })}
                                </p>
                            </div>
                        )}

                        {activeTab === "vat" && (
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                <ClientVatCard client={client} />
                                <ClientDeadlines client={client} />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}
