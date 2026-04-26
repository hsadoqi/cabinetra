import type { ClientRecord } from "./types"

/**
 * Repository abstraction for client persistence
 * Enables swapping in-memory storage with database implementations
 * Supports optimistic locking through version tracking
 */

export interface ClientWithVersion extends ClientRecord {
    _version: number // For optimistic locking
}

export interface RepositoryTransaction {
    rollback(): void
    commit(): void
}

export interface IClientRepository {
    /**
     * Find a client by ID
     */
    findById(id: string): ClientWithVersion | null

    /**
     * Find all clients
     */
    findAll(): ClientWithVersion[]

    /**
     * Find clients matching a filter predicate
     */
    findByPredicate(predicate: (client: ClientWithVersion) => boolean): ClientWithVersion[]

    /**
     * Create a new client
     * @throws Error if client with same ID already exists
     */
    create(client: Omit<ClientRecord, "lastUpdatedAt">): ClientWithVersion

    /**
     * Update an existing client with optimistic locking
     * @throws Error if version mismatch (concurrent modification)
     */
    update(id: string, updates: Partial<ClientRecord>, expectedVersion?: number): ClientWithVersion

    /**
     * Delete a client
     * @throws Error if not found
     */
    delete(id: string): void

    /**
     * Delete multiple clients
     * @returns { deleted: number; failed: number }
     */
    deleteBatch(ids: string[]): { deleted: number; failed: number }

    /**
     * Get next available client ID
     */
    getNextClientId(): string

    /**
     * Atomically find and update (prevents race conditions)
     */
    findAndUpdate(
        id: string,
        updates: Partial<ClientRecord>
    ): ClientWithVersion | null
}

// Global repository instance
let globalRepository: IClientRepository | null = null

/**
 * Set the global client repository instance
 * This allows dependency injection of different implementations
 */
export function setClientRepository(repo: IClientRepository): void {
    globalRepository = repo
}

/**
 * Get the global client repository instance
 */
export function getClientRepository(): IClientRepository {
    if (!globalRepository) {
        // Lazy initialize with in-memory repository
        globalRepository = new InMemoryClientRepository()
    }
    return globalRepository
}

/**
 * In-memory implementation of client repository
 * Can be used for testing or as a fallback, with versioning for optimistic locking
 */
export class InMemoryClientRepository implements IClientRepository {
    private clients: Map<string, ClientWithVersion> = new Map()
    private nextId: number = 1

    constructor(initialClients?: ClientWithVersion[]) {
        if (initialClients) {
            for (const client of initialClients) {
                this.clients.set(client.id, client)
                // Extract numeric ID to track for next ID generation
                const match = client.id.match(/CL-(\d+)/)
                if (match) {
                    const num = parseInt(match[1]!, 10)
                    if (num >= this.nextId) {
                        this.nextId = num + 1
                    }
                }
            }
        }
    }

    findById(id: string): ClientWithVersion | null {
        return this.clients.get(id) ?? null
    }

    findAll(): ClientWithVersion[] {
        return Array.from(this.clients.values())
    }

    findByPredicate(predicate: (client: ClientWithVersion) => boolean): ClientWithVersion[] {
        return Array.from(this.clients.values()).filter(predicate)
    }

    create(client: Omit<ClientRecord, "lastUpdatedAt">): ClientWithVersion {
        const clientWithVersion: ClientWithVersion = {
            ...client,
            lastUpdatedAt: new Date().toISOString(),
            _version: 1,
        }

        if (this.clients.has(clientWithVersion.id)) {
            throw new Error(`Client with ID ${clientWithVersion.id} already exists`)
        }

        this.clients.set(clientWithVersion.id, clientWithVersion)
        return clientWithVersion
    }

    update(id: string, updates: Partial<ClientRecord>, expectedVersion?: number): ClientWithVersion {
        const existing = this.clients.get(id)
        if (!existing) {
            throw new Error(`Client with ID ${id} not found`)
        }

        // Optimistic locking: check version if provided
        if (expectedVersion !== undefined && existing._version !== expectedVersion) {
            throw new Error(
                `Concurrent modification detected: expected version ${expectedVersion}, but found ${existing._version}`
            )
        }

        const updated: ClientWithVersion = {
            ...existing,
            ...updates,
            id: existing.id, // Prevent ID changes
            _version: existing._version + 1,
            lastUpdatedAt: new Date().toISOString(),
        }

        this.clients.set(id, updated)
        return updated
    }

    delete(id: string): void {
        if (!this.clients.has(id)) {
            throw new Error(`Client with ID ${id} not found`)
        }
        this.clients.delete(id)
    }

    deleteBatch(ids: string[]): { deleted: number; failed: number } {
        let deleted = 0
        let failed = 0

        for (const id of ids) {
            try {
                this.delete(id)
                deleted++
            } catch {
                failed++
            }
        }

        return { deleted, failed }
    }

    getNextClientId(): string {
        const id = `CL-${this.nextId.toString().padStart(4, "0")}`
        this.nextId++
        return id
    }

    findAndUpdate(id: string, updates: Partial<ClientRecord>): ClientWithVersion | null {
        const existing = this.clients.get(id)
        if (!existing) {
            return null
        }

        const updated: ClientWithVersion = {
            ...existing,
            ...updates,
            id: existing.id,
            _version: existing._version + 1,
            lastUpdatedAt: new Date().toISOString(),
        }

        this.clients.set(id, updated)
        return updated
    }
}
