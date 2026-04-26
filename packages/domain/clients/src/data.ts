import type { ClientRecord } from "./types"
import { InMemoryClientRepository, setClientRepository, getClientRepository } from "./repository"

/**
 * Seed data for clients
 * Used to initialize the repository on startup
 */
const SEED_CLIENTS: ClientRecord[] = [
    {
        id: "CL-0001",
        name: "Atlas SARL",
        legalForm: "SARL",
        ice: "001234567800001",
        regime: "normal",
        status: "active",
        monthlyRevenueMad: 128450,
        monthlyRevenueDeltaPct: 6.8,
        pendingDeclarations: 1,
        pendingDeclarationsDelta: -1,
        unreconciledEntries: 7,
        unreconciledEntriesDelta: -4,
        employeeCount: 14,
        employeeCountDelta: 1,
        lastUpdatedAt: "2026-04-24",
        compliance: {
            overallStatus: "compliant",
            lastComplianceCheckAt: "2026-04-20",
            vatHistory: {
                filingDeadline: "2026-05-30",
                lastFiledAt: "2026-03-15",
                status: "filed",
                nextDueAt: "2026-05-30",
            },
            auditInfo: {
                status: "completed",
                lastAuditDate: "2025-11-10",
                nextScheduledDate: "2026-11-10",
                findings: { count: 3, resolved: 3, pending: 0 },
            },
            documentRequirements: {
                totalRequired: 12,
                submitted: 12,
                pending: 0,
                expiringSoon: 1,
            },
            riskLevel: "low",
            flaggedItems: { count: 0, urgentCount: 0 },
        },
    },
    {
        id: "CL-0002",
        name: "Noura Consulting",
        legalForm: "SUARL",
        ice: "001234567800002",
        regime: "simplified",
        status: "review",
        monthlyRevenueMad: 84200,
        monthlyRevenueDeltaPct: 2.1,
        pendingDeclarations: 2,
        pendingDeclarationsDelta: 0,
        unreconciledEntries: 11,
        unreconciledEntriesDelta: -2,
        employeeCount: 6,
        employeeCountDelta: 0,
        lastUpdatedAt: "2026-04-22",
        compliance: {
            overallStatus: "under_review",
            lastComplianceCheckAt: "2026-04-18",
            vatHistory: {
                filingDeadline: "2026-05-15",
                lastFiledAt: "2026-02-20",
                status: "pending",
                nextDueAt: "2026-05-15",
            },
            auditInfo: {
                status: "in_progress",
                lastAuditDate: "2025-08-05",
                nextScheduledDate: undefined,
                findings: { count: 5, resolved: 2, pending: 3 },
            },
            documentRequirements: {
                totalRequired: 10,
                submitted: 8,
                pending: 2,
                expiringSoon: 2,
            },
            riskLevel: "medium",
            flaggedItems: { count: 3, urgentCount: 1 },
        },
    },
    {
        id: "CL-0003",
        name: "Maghreb Logistics",
        legalForm: "SA",
        ice: "001234567800003",
        regime: "normal",
        status: "pending_vat",
        monthlyRevenueMad: 233900,
        monthlyRevenueDeltaPct: -1.4,
        pendingDeclarations: 3,
        pendingDeclarationsDelta: 1,
        unreconciledEntries: 19,
        unreconciledEntriesDelta: 3,
        employeeCount: 41,
        employeeCountDelta: 2,
        lastUpdatedAt: "2026-04-20",
        compliance: {
            overallStatus: "non_compliant",
            lastComplianceCheckAt: "2026-04-15",
            vatHistory: {
                filingDeadline: "2026-04-30",
                lastFiledAt: "2025-12-28",
                status: "pending",
                nextDueAt: "2026-04-30",
            },
            auditInfo: {
                status: "scheduled",
                lastAuditDate: "2024-06-20",
                nextScheduledDate: "2026-05-15",
                findings: { count: 12, resolved: 8, pending: 4 },
            },
            documentRequirements: {
                totalRequired: 15,
                submitted: 11,
                pending: 4,
                expiringSoon: 3,
            },
            riskLevel: "high",
            flaggedItems: { count: 7, urgentCount: 4 },
        },
    },
    {
        id: "CL-0004",
        name: "Rimal Trading",
        legalForm: "SARL",
        ice: "001234567800004",
        regime: "normal",
        status: "overdue",
        monthlyRevenueMad: 56300,
        monthlyRevenueDeltaPct: -4.9,
        pendingDeclarations: 5,
        pendingDeclarationsDelta: 2,
        unreconciledEntries: 28,
        unreconciledEntriesDelta: 5,
        employeeCount: 9,
        employeeCountDelta: -1,
        lastUpdatedAt: "2026-04-16",
        compliance: {
            overallStatus: "non_compliant",
            lastComplianceCheckAt: "2026-04-10",
            vatHistory: {
                filingDeadline: "2026-04-15",
                lastFiledAt: "2025-11-15",
                status: "pending",
                nextDueAt: "2026-04-15",
            },
            auditInfo: {
                status: "none",
                lastAuditDate: undefined,
                nextScheduledDate: undefined,
                findings: undefined,
            },
            documentRequirements: {
                totalRequired: 12,
                submitted: 6,
                pending: 6,
                expiringSoon: 5,
            },
            riskLevel: "high",
            flaggedItems: { count: 11, urgentCount: 8 },
        },
    },
]

/**
 * Initialize the client repository with seed data
 * This is called on module load to set up the data store
 */
function initializeRepository(): void {
    const seedWithVersions = SEED_CLIENTS.map((client) => ({
        ...client,
        _version: 1,
    }))
    const repository = new InMemoryClientRepository(seedWithVersions)
    setClientRepository(repository)
}

// Initialize repository on module load
initializeRepository()

/**
 * Get all clients from the repository
 * @deprecated Use repository directly via getClientRepository()
 * Kept for backwards compatibility
 */
export function getClients(): ClientRecord[] {
    const repo = getClientRepository()
    return repo.findAll()
}

/**
 * Re-export for backwards compatibility
 * Deprecated: Use getClientRepository().findAll() instead
 */
export const clients: ClientRecord[] = new Proxy([], {
    get(target, prop) {
        if (prop === "find" || prop === "filter" || prop === Symbol.iterator) {
            return Reflect.get(getClients(), prop)
        }
        return Reflect.get(getClients(), prop)
    },
})

/**
 * Get a client by ID from the repository
 */
export function getClientById(id: string): ClientRecord | null {
    const repo = getClientRepository()
    const client = repo.findById(id)
    return client ? (({ _version, ...rest }: any) => rest)(client) : null
}
