// Contexts
export { ClientProvider, useClientContext } from "./contexts"

// Components
export { ClientSwitcher } from "./components/client-switcher"
export { ClientContextSetter } from "./components/client-context-setter"
export { ClientHeader } from "./components/client-header"
export { ClientTabs } from "./components/client-tabs"
export { ClientKpiStrip as KpiStrip } from "./components/kpi-strip"
export { ClientAlertsPanel as AlertsPanel } from "./components/alerts-panel"
export { ClientRecentEntries as RecentEntries } from "./components/recent-entries"
export { ClientVatCard as VatCard } from "./components/vat-card"

// Recommended: Use new names directly
export { ClientKpiStrip } from "./components/kpi-strip"
export { ClientAlertsPanel } from "./components/alerts-panel"
export { ClientRecentEntries } from "./components/recent-entries"
export { ClientVatCard } from "./components/vat-card"
export { ClientDeadlines } from "./components/client-deadlines"

// Layout components
export { ClientSidebarShell, ClientSidebarContainer, ClientSidebar, ClientSidebarPicker, EmptyClientSidebarPicker, type SidebarClient } from "./components/layouts/sidebar"
export { ClientLayoutHeader } from "./components/layouts/header"
export { ClientContent } from "./components/layouts/content"

// Skeleton components
export { ClientDetailsSkeleton, ClientsGridSkeleton } from "./components/skeletons"

// Compliance components
export { ComplianceSummaryPanel } from "./components/compliance/compliance-summary-panel"
export { VatFilingPanel } from "./components/compliance/vat-filing-panel"
export { AuditInfoPanel } from "./components/compliance/audit-info-panel"
export { DocumentsPanel } from "./components/compliance/documents-panel"
