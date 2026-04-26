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
