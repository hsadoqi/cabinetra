/**
 * @cabinetra/domain-payroll
 *
 * Payroll domain package
 * Contains types, constants, data, and repositories for payroll management
 */

// Types
export type {
    EmploymentType,
    EmployeeStatus,
    PaymentFrequency,
    EmployeeRecord,
    PayslipStatus,
    PayslipRecord,
    PayrollRunStatus,
    PayrollRun,
    EmployeeStatusFilter,
    PayslipStatusFilter,
    PayrollRunStatusFilter,
} from "./types"

// Constants
export {
    EMPLOYMENT_TYPES,
    EMPLOYEE_STATUSES,
    PAYSLIP_STATUSES,
    PAYROLL_RUN_STATUSES,
    EMPLOYEE_STATUS_CONFIG,
    PAYSLIP_STATUS_CONFIG,
    PAYROLL_RUN_STATUS_CONFIG,
    EMPLOYMENT_TYPE_LABELS,
    PAYMENT_FREQUENCY_LABELS,
    MOROCCO_PAYROLL,
} from "./constants"

// Repository
export {
    InMemoryEmployeeRepository,
    InMemoryPayslipRepository,
    InMemoryPayrollRunRepository,
    getEmployeeRepository,
    getPayslipRepository,
    getPayrollRunRepository,
    setEmployeeRepository,
    setPayslipRepository,
    setPayrollRunRepository,
} from "./repository"

// Data & helpers
export {
    getEmployeesByClientId,
    getEmployeeById,
    getPayslipsByEmployeeId,
    getPayslipsByClientId,
    getPayrollRunsByClientId,
    getLatestPayrollRunByClientId,
} from "./data"
