import { CLIENT_REGIMES, CLIENT_STATUSES } from "./constants"
import type { ClientStatus, Regime, RegimeFilter, StatusFilter } from "./types"

/**
 * Type guard to validate StatusFilter values
 * Ensures value is either empty string or a valid ClientStatus
 */
export function isValidStatusFilter(value: unknown): value is StatusFilter {
    return typeof value === "string" && (value === "" || CLIENT_STATUSES.includes(value as ClientStatus))
}

/**
 * Type guard to validate RegimeFilter values
 * Ensures value is either empty string or a valid Regime
 */
export function isValidRegimeFilter(value: unknown): value is RegimeFilter {
    return typeof value === "string" && (value === "" || CLIENT_REGIMES.includes(value as Regime))
}

/**
 * Type guard to validate ClientStatus values
 */
export function isValidClientStatus(value: unknown): value is ClientStatus {
    return typeof value === "string" && CLIENT_STATUSES.includes(value as ClientStatus)
}

/**
 * Type guard to validate Regime values
 */
export function isValidRegime(value: unknown): value is Regime {
    return typeof value === "string" && CLIENT_REGIMES.includes(value as Regime)
}

export { }

