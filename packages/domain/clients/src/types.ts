export type ClientStatus = "active" | "pending_vat" | "review" | "overdue"

export type Regime = "normal" | "simplified"

// Filter types - used for URL-driven filtering
export type StatusFilter = ClientStatus | ""
export type RegimeFilter = Regime | ""

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
}

export interface ClientListItem {
    id: string
    name: string
    legalForm: string
    ice: string
    regime: Regime
    status: ClientStatus
}
