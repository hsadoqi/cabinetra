// Domain Types
export type {
    ClientRecord,
    ClientStatus,
    Regime,
    ClientListItem,
    StatusFilter,
    RegimeFilter,
    ComplianceStatus,
    RiskLevel,
    VATHistory,
    AuditInfo,
    DocumentRequirements,
    Compliance,
    ComplianceFilter,
    RiskFilter,
} from "./types"

// Constants
export {
    CLIENT_STATUSES,
    CLIENT_REGIMES,
    STATUS_CONFIG,
    STATUS_COLORS,
    REGIME_LABELS,
    COMPLIANCE_STATUSES,
    RISK_LEVELS,
    COMPLIANCE_STATUS_CONFIG,
    RISK_LEVEL_CONFIG,
} from "./constants"

// Data & Utilities
export { clients, getClientById } from "./data"
export { isValidStatusFilter, isValidRegimeFilter, isValidClientStatus, isValidRegime } from "./utils"

// Repository (persistence abstraction)
export {
    getClientRepository,
    setClientRepository,
    InMemoryClientRepository,
    type IClientRepository,
    type ClientWithVersion,
    type RepositoryTransaction,
} from "./repository"

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
