export type ClientStatus = "active" | "pending_vat" | "review" | "overdue"

export type Regime = "normal" | "simplified"

export type ComplianceStatus = "compliant" | "non_compliant" | "under_review" | "scheduled"
export type RiskLevel = "low" | "medium" | "high"

// Filter types - used for URL-driven filtering
export type StatusFilter = ClientStatus | ""
export type RegimeFilter = Regime | ""
export type ComplianceFilter = ComplianceStatus | ""
export type RiskFilter = RiskLevel | ""

// Compliance sub-types
export type VATHistory = {
    filingDeadline: string // ISO 8601
    lastFiledAt?: string
    status: "pending" | "filed" | "audited"
    nextDueAt: string
}

export type AuditInfo = {
    status: "none" | "scheduled" | "in_progress" | "completed"
    lastAuditDate?: string
    nextScheduledDate?: string
    findings?: {
        count: number
        resolved: number
        pending: number
    }
}

export type DocumentRequirements = {
    totalRequired: number
    submitted: number
    pending: number
    expiringSoon: number // docs expiring in next 30 days
}

export type Compliance = {
    overallStatus: ComplianceStatus
    lastComplianceCheckAt?: string
    vatHistory: VATHistory
    auditInfo: AuditInfo
    documentRequirements: DocumentRequirements
    riskLevel: RiskLevel
    flaggedItems: {
        count: number
        urgentCount: number
    }
}

export type ClientRecord = {
    id: string
    name: string
    legalForm: string
    ice: string
    regime: Regime
    status: ClientStatus
    monthlyRevenueMad: number
    monthlyRevenueDeltaPct: number
    pendingDeclarations: number
    pendingDeclarationsDelta: number
    unreconciledEntries: number
    unreconciledEntriesDelta: number
    employeeCount: number
    employeeCountDelta: number
    lastUpdatedAt: string
    archivedAt?: string // ISO 8601 timestamp when archived, undefined if active
    // NEW: Compliance fields
    compliance: Compliance
}

export interface ClientListItem {
    id: string
    name: string
    legalForm: string
    ice: string
    regime: Regime
    status: ClientStatus
}
