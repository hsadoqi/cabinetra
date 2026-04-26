// Domain Types
export type { ClientRecord, ClientStatus, Regime, ClientListItem, StatusFilter, RegimeFilter } from "./types"

// Constants
export { STATUS_CONFIG, STATUS_COLORS, REGIME_LABELS } from "./constants"

// Data & Utilities
export { clients, getClientById } from "./data"
export { isValidStatusFilter, isValidRegimeFilter, isValidClientStatus, isValidRegime } from "./utils"

// Validation
export {
    validateClientId,
    validateClientName,
    validateIce,
    validateLegalForm,
    validateRegime,
    validateClientStatus,
    validateMonthlyRevenue,
    validateEmployeeCount,
    validateCreateClientInput,
    validateUpdateClientInput,
    isClientStatus,
    isRegime,
    isValidClientId,
    isValidRouteParam,
    type ClientValidationError,
    type CreateClientInput,
    type UpdateClientInput,
} from "./validation"

// Mutations (CRUD operations)
export {
    createClient,
    updateClient,
    archiveClient,
    deleteClient,
    deleteClientsBatch,
    exportClient,
    exportClients,
    type MutationResult,
} from "./mutations"
