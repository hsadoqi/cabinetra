/**
 * Payroll Domain Types
 *
 * Core data structures for managing employees, payroll runs, and payslips.
 * Employees are scoped to clients for multi-tenant architecture.
 */

export type EmploymentType = "permanent" | "contract" | "intern"
export type EmployeeStatus = "active" | "on_leave" | "inactive"
export type PaymentFrequency = "monthly" | "bi-weekly"

export type EmployeeRecord = {
    id: string // EMP-XXXX
    clientId: string // Link to ClientRecord
    firstName: string
    lastName: string
    email: string
    phone: string

    // Employment details
    hireDate: string // ISO 8601
    department: string
    jobTitle: string
    employmentType: EmploymentType

    // Compensation
    grossSalaryMad: number
    paymentFrequency: PaymentFrequency

    // Tax/Deductions
    cnssNumber?: string
    irpp?: number // Impôt sur le Revenu des Personnes Physiques (annual deduction percentage)

    status: EmployeeStatus
    lastPayslipAt?: string // ISO 8601
    createdAt: string // ISO 8601
    updatedAt: string // ISO 8601
    archivedAt?: string // ISO 8601 timestamp when archived, undefined if active
}

export type PayslipStatus = "draft" | "issued" | "paid" | "disputed"

export type PayslipRecord = {
    id: string // PAY-XXXX
    employeeId: string
    clientId: string

    payPeriodStart: string // ISO 8601
    payPeriodEnd: string // ISO 8601
    issuedAt: string // ISO 8601

    // Income components
    baseSalary: number
    bonuses: number
    overtime: number
    otherIncome: number

    // Deduction components
    cnssContribution: number // CNSS - Caisse Nationale de Sécurité Sociale
    irppWithheld: number // IRPP - Impôt sur le Revenu des Personnes Physiques
    healthInsurance: number
    otherDeductions: number

    // Totals
    grossSalaryMad: number // Before deductions
    totalDeductionsMad: number
    netSalaryMad: number // After deductions

    status: PayslipStatus
    notes?: string
}

export type PayrollRunStatus = "draft" | "processing" | "completed" | "paid"

export type PayrollRun = {
    id: string // RUN-XXXX
    clientId: string

    payPeriodStart: string // ISO 8601
    payPeriodEnd: string // ISO 8601
    createdAt: string // ISO 8601

    employeeCount: number
    totalGrossSalaries: number
    totalNetSalaries: number
    totalDeductions: number

    status: PayrollRunStatus
    issuedAt?: string // ISO 8601
    paidAt?: string // ISO 8601
}

// Filter types
export type EmployeeStatusFilter = EmployeeStatus | ""
export type PayslipStatusFilter = PayslipStatus | ""
export type PayrollRunStatusFilter = PayrollRunStatus | ""
