import type { ClientRecord, ClientStatus, Regime } from "./types"

/**
 * Validation schemas for client operations
 * Provides runtime validators and type guards for all client operations
 */

export interface ClientValidationError {
    field: string
    message: string
}

/**
 * Type guard: Check if value is a valid ClientStatus
 */
export function isClientStatus(value: unknown): value is ClientStatus {
    const validStatuses: ClientStatus[] = ["active", "pending_vat", "review", "overdue"]
    return typeof value === "string" && validStatuses.includes(value as ClientStatus)
}

/**
 * Type guard: Check if value is a valid Regime
 */
export function isRegime(value: unknown): value is Regime {
    const validRegimes: Regime[] = ["normal", "simplified"]
    return typeof value === "string" && validRegimes.includes(value as Regime)
}

/**
 * Validate client ID format (CL-XXXX)
 */
export function validateClientId(id: unknown): { valid: boolean; error?: string } {
    if (typeof id !== "string") {
        return { valid: false, error: "Client ID must be a string" }
    }
    if (id.trim() === "") {
        return { valid: false, error: "Client ID cannot be empty" }
    }
    if (!/^CL-\d{4}$/.test(id)) {
        return { valid: false, error: "Client ID must be in format CL-XXXX (e.g., CL-0001)" }
    }
    return { valid: true }
}

/**
 * Type guard: Check if value is a valid ClientId
 */
export function isValidClientId(value: unknown): value is string {
    return validateClientId(value).valid
}

/**
 * Validate client name
 */
export function validateClientName(name: unknown): { valid: boolean; error?: string } {
    if (typeof name !== "string") {
        return { valid: false, error: "Client name must be a string" }
    }
    if (name.trim().length === 0) {
        return { valid: false, error: "Client name cannot be empty" }
    }
    if (name.length > 255) {
        return { valid: false, error: "Client name must not exceed 255 characters" }
    }
    return { valid: true }
}

/**
 * Validate ICE (Tax ID)
 */
export function validateIce(ice: unknown): { valid: boolean; error?: string } {
    if (typeof ice !== "string") {
        return { valid: false, error: "ICE must be a string" }
    }
    if (!/^\d{15}$/.test(ice.replace(/\s+/g, ""))) {
        return { valid: false, error: "ICE must be 15 digits" }
    }
    return { valid: true }
}

/**
 * Validate legal form
 */
export function validateLegalForm(
    legalForm: unknown
): { valid: boolean; error?: string } {
    if (typeof legalForm !== "string") {
        return { valid: false, error: "Legal form must be a string" }
    }
    const validForms = ["SARL", "SCS", "EIRL", "Auto", "Collectivité"]
    if (!validForms.includes(legalForm)) {
        return {
            valid: false,
            error: `Legal form must be one of: ${validForms.join(", ")}`,
        }
    }
    return { valid: true }
}

/**
 * Validate regime
 */
export function validateRegime(regime: unknown): { valid: boolean; error?: string } {
    if (typeof regime !== "string") {
        return { valid: false, error: "Regime must be a string" }
    }
    const validRegimes: Regime[] = ["normal", "simplified"]
    if (!validRegimes.includes(regime as Regime)) {
        return {
            valid: false,
            error: `Regime must be one of: ${validRegimes.join(", ")}`,
        }
    }
    return { valid: true }
}

/**
 * Validate client status
 */
export function validateClientStatus(status: unknown): { valid: boolean; error?: string } {
    if (typeof status !== "string") {
        return { valid: false, error: "Status must be a string" }
    }
    const validStatuses: ClientStatus[] = ["active", "pending_vat", "review", "overdue"]
    if (!validStatuses.includes(status as ClientStatus)) {
        return {
            valid: false,
            error: `Status must be one of: ${validStatuses.join(", ")}`,
        }
    }
    return { valid: true }
}

/**
 * Validate monthly revenue
 */
export function validateMonthlyRevenue(revenue: unknown): { valid: boolean; error?: string } {
    if (typeof revenue !== "number") {
        return { valid: false, error: "Monthly revenue must be a number" }
    }
    if (revenue < 0) {
        return { valid: false, error: "Monthly revenue cannot be negative" }
    }
    return { valid: true }
}

/**
 * Validate employee count
 */
export function validateEmployeeCount(count: unknown): { valid: boolean; error?: string } {
    if (typeof count !== "number") {
        return { valid: false, error: "Employee count must be a number" }
    }
    if (!Number.isInteger(count)) {
        return { valid: false, error: "Employee count must be an integer" }
    }
    if (count < 0) {
        return { valid: false, error: "Employee count cannot be negative" }
    }
    return { valid: true }
}

/**
 * Validate create client input
 */
export function validateCreateClientInput(input: unknown): {
    valid: boolean
    errors: ClientValidationError[]
} {
    const errors: ClientValidationError[] = []

    if (typeof input !== "object" || input === null) {
        return {
            valid: false,
            errors: [{ field: "input", message: "Input must be an object" }],
        }
    }

    const data = input as Record<string, unknown>

    // Validate required fields
    const nameCheck = validateClientName(data.name)
    if (!nameCheck.valid) {
        errors.push({ field: "name", message: nameCheck.error! })
    }

    const iceCheck = validateIce(data.ice)
    if (!iceCheck.valid) {
        errors.push({ field: "ice", message: iceCheck.error! })
    }

    const legalFormCheck = validateLegalForm(data.legalForm)
    if (!legalFormCheck.valid) {
        errors.push({ field: "legalForm", message: legalFormCheck.error! })
    }

    const regimeCheck = validateRegime(data.regime)
    if (!regimeCheck.valid) {
        errors.push({ field: "regime", message: regimeCheck.error! })
    }

    // Validate optional but recommended fields
    if (data.monthlyRevenueMad !== undefined) {
        const revenueCheck = validateMonthlyRevenue(data.monthlyRevenueMad)
        if (!revenueCheck.valid) {
            errors.push({ field: "monthlyRevenueMad", message: revenueCheck.error! })
        }
    }

    if (data.employeeCount !== undefined) {
        const empCheck = validateEmployeeCount(data.employeeCount)
        if (!empCheck.valid) {
            errors.push({ field: "employeeCount", message: empCheck.error! })
        }
    }

    return {
        valid: errors.length === 0,
        errors,
    }
}

/**
 * Validate update client input
 */
export function validateUpdateClientInput(input: unknown): {
    valid: boolean
    errors: ClientValidationError[]
} {
    const errors: ClientValidationError[] = []

    if (typeof input !== "object" || input === null) {
        return {
            valid: false,
            errors: [{ field: "input", message: "Input must be an object" }],
        }
    }

    const data = input as Record<string, unknown>

    // All fields are optional, but if provided, they must be valid
    if (data.name !== undefined) {
        const nameCheck = validateClientName(data.name)
        if (!nameCheck.valid) {
            errors.push({ field: "name", message: nameCheck.error! })
        }
    }

    if (data.ice !== undefined) {
        const iceCheck = validateIce(data.ice)
        if (!iceCheck.valid) {
            errors.push({ field: "ice", message: iceCheck.error! })
        }
    }

    if (data.legalForm !== undefined) {
        const legalFormCheck = validateLegalForm(data.legalForm)
        if (!legalFormCheck.valid) {
            errors.push({ field: "legalForm", message: legalFormCheck.error! })
        }
    }

    if (data.regime !== undefined) {
        const regimeCheck = validateRegime(data.regime)
        if (!regimeCheck.valid) {
            errors.push({ field: "regime", message: regimeCheck.error! })
        }
    }

    if (data.monthlyRevenueMad !== undefined) {
        const revenueCheck = validateMonthlyRevenue(data.monthlyRevenueMad)
        if (!revenueCheck.valid) {
            errors.push({ field: "monthlyRevenueMad", message: revenueCheck.error! })
        }
    }

    if (data.employeeCount !== undefined) {
        const empCheck = validateEmployeeCount(data.employeeCount)
        if (!empCheck.valid) {
            errors.push({ field: "employeeCount", message: empCheck.error! })
        }
    }

    if (data.status !== undefined) {
        const statusCheck = validateClientStatus(data.status)
        if (!statusCheck.valid) {
            errors.push({ field: "status", message: statusCheck.error! })
        }
    }

    // Validate archivedAt field (optional, can be ISO 8601 string or null to unarchive)
    if (data.archivedAt !== undefined) {
        if (data.archivedAt !== null && typeof data.archivedAt === "string") {
            // Validate ISO 8601 timestamp
            try {
                new Date(data.archivedAt)
            } catch {
                errors.push({ field: "archivedAt", message: "Invalid ISO 8601 timestamp" })
            }
        } else if (data.archivedAt !== null) {
            errors.push({ field: "archivedAt", message: "archivedAt must be an ISO 8601 timestamp string or null" })
        }
    }

    return {
        valid: errors.length === 0,
        errors,
    }
}

export type CreateClientInput = Omit<ClientRecord, "id" | "lastUpdatedAt" | "archivedAt" | "monthlyRevenueDeltaPct" | "pendingDeclarationsDelta" | "unreconciledEntriesDelta" | "employeeCountDelta">

export type UpdateClientInput = Partial<CreateClientInput> & { archivedAt?: string | null }

/**
 * Helper function to validate route parameters
 * Used in Next.js dynamic routes like [id]
 * 
 * @param id - The route parameter value
 * @returns true if ID is valid, false otherwise
 */
export function isValidRouteParam(id: unknown): id is string {
    if (typeof id !== "string") return false
    if (id.trim() === "") return false
    return isValidClientId(id)
}
