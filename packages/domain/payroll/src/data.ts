import type { EmployeeRecord, PayslipRecord, PayrollRun } from "./types"
import {
    InMemoryEmployeeRepository,
    InMemoryPayslipRepository,
    InMemoryPayrollRunRepository,
    setEmployeeRepository,
    setPayslipRepository,
    setPayrollRunRepository,
    getEmployeeRepository,
    getPayslipRepository,
    getPayrollRunRepository,
} from "./repository"

/**
 * Seed data for employees
 */
const SEED_EMPLOYEES: EmployeeRecord[] = [
    {
        id: "EMP-0001",
        clientId: "CL-0001", // Atlas SARL
        firstName: "Mohammed",
        lastName: "Bennani",
        email: "m.bennani@atlas.ma",
        phone: "+212612345678",
        hireDate: "2020-03-15",
        department: "Operations",
        jobTitle: "Operations Manager",
        employmentType: "permanent",
        grossSalaryMad: 8500,
        paymentFrequency: "monthly",
        cnssNumber: "123456789",
        irpp: 15,
        status: "active",
        lastPayslipAt: "2026-03-31",
        createdAt: "2020-03-15",
        updatedAt: "2026-04-20",
    },
    {
        id: "EMP-0002",
        clientId: "CL-0001", // Atlas SARL
        firstName: "Leila",
        lastName: "Razzaq",
        email: "l.razzaq@atlas.ma",
        phone: "+212612345679",
        hireDate: "2021-06-01",
        department: "Finance",
        jobTitle: "Finance Analyst",
        employmentType: "permanent",
        grossSalaryMad: 6200,
        paymentFrequency: "monthly",
        cnssNumber: "123456790",
        irpp: 10,
        status: "active",
        lastPayslipAt: "2026-03-31",
        createdAt: "2021-06-01",
        updatedAt: "2026-04-20",
    },
    {
        id: "EMP-0003",
        clientId: "CL-0001", // Atlas SARL
        firstName: "Karim",
        lastName: "El Mansouri",
        email: "k.mansouri@atlas.ma",
        phone: "+212612345680",
        hireDate: "2022-01-10",
        department: "Operations",
        jobTitle: "Logistics Officer",
        employmentType: "permanent",
        grossSalaryMad: 4800,
        paymentFrequency: "monthly",
        cnssNumber: "123456791",
        irpp: 8,
        status: "on_leave",
        lastPayslipAt: "2026-03-31",
        createdAt: "2022-01-10",
        updatedAt: "2026-04-20",
    },
    {
        id: "EMP-0004",
        clientId: "CL-0002", // Noura Consulting
        firstName: "Noura",
        lastName: "El Amrani",
        email: "n.amrani@noura-consulting.ma",
        phone: "+212612345681",
        hireDate: "2018-09-01",
        department: "Management",
        jobTitle: "Managing Director",
        employmentType: "permanent",
        grossSalaryMad: 12000,
        paymentFrequency: "monthly",
        cnssNumber: "123456792",
        irpp: 20,
        status: "active",
        lastPayslipAt: "2026-03-31",
        createdAt: "2018-09-01",
        updatedAt: "2026-04-20",
    },
    {
        id: "EMP-0005",
        clientId: "CL-0002", // Noura Consulting
        firstName: "Amina",
        lastName: "Tazi",
        email: "a.tazi@noura-consulting.ma",
        phone: "+212612345682",
        hireDate: "2023-02-15",
        department: "Consulting",
        jobTitle: "Business Consultant",
        employmentType: "contract",
        grossSalaryMad: 7500,
        paymentFrequency: "monthly",
        cnssNumber: "123456793",
        irpp: 12,
        status: "active",
        lastPayslipAt: "2026-03-31",
        createdAt: "2023-02-15",
        updatedAt: "2026-04-20",
    },
]

/**
 * Seed data for payslips (sample from March 2026)
 */
const SEED_PAYSLIPS: PayslipRecord[] = [
    {
        id: "PAY-0001",
        employeeId: "EMP-0001",
        clientId: "CL-0001",
        payPeriodStart: "2026-03-01",
        payPeriodEnd: "2026-03-31",
        issuedAt: "2026-03-31",
        baseSalary: 8500,
        bonuses: 0,
        overtime: 0,
        otherIncome: 0,
        cnssContribution: 347, // 8500 * 4.08%
        irppWithheld: 1020, // Approximate
        healthInsurance: 0,
        otherDeductions: 100, // Union dues, etc.
        grossSalaryMad: 8500,
        totalDeductionsMad: 1467,
        netSalaryMad: 7033,
        status: "paid",
    },
    {
        id: "PAY-0002",
        employeeId: "EMP-0002",
        clientId: "CL-0001",
        payPeriodStart: "2026-03-01",
        payPeriodEnd: "2026-03-31",
        issuedAt: "2026-03-31",
        baseSalary: 6200,
        bonuses: 0,
        overtime: 200,
        otherIncome: 0,
        cnssContribution: 253, // 6200 * 4.08%
        irppWithheld: 600,
        healthInsurance: 0,
        otherDeductions: 50,
        grossSalaryMad: 6400,
        totalDeductionsMad: 903,
        netSalaryMad: 5497,
        status: "paid",
    },
    {
        id: "PAY-0003",
        employeeId: "EMP-0004",
        clientId: "CL-0002",
        payPeriodStart: "2026-03-01",
        payPeriodEnd: "2026-03-31",
        issuedAt: "2026-03-31",
        baseSalary: 12000,
        bonuses: 1000,
        overtime: 0,
        otherIncome: 0,
        cnssContribution: 490, // 12000 * 4.08%
        irppWithheld: 1900,
        healthInsurance: 150,
        otherDeductions: 100,
        grossSalaryMad: 13000,
        totalDeductionsMad: 2640,
        netSalaryMad: 10360,
        status: "paid",
    },
]

/**
 * Seed data for payroll runs
 */
const SEED_PAYROLL_RUNS: PayrollRun[] = [
    {
        id: "RUN-0001",
        clientId: "CL-0001",
        payPeriodStart: "2026-03-01",
        payPeriodEnd: "2026-03-31",
        createdAt: "2026-03-31",
        employeeCount: 3,
        totalGrossSalaries: 21100,
        totalNetSalaries: 13530,
        totalDeductionsMad: 7570,
        status: "paid",
        issuedAt: "2026-03-31",
        paidAt: "2026-04-10",
    },
    {
        id: "RUN-0002",
        clientId: "CL-0002",
        payPeriodStart: "2026-03-01",
        payPeriodEnd: "2026-03-31",
        createdAt: "2026-03-31",
        employeeCount: 2,
        totalGrossSalaries: 13000,
        totalNetSalaries: 10360,
        totalDeductionsMad: 2640,
        status: "paid",
        issuedAt: "2026-03-31",
        paidAt: "2026-04-10",
    },
]

/**
 * Initialize the payroll repositories with seed data
 */
function initializeRepositories(): void {
    const employeeRepo = new InMemoryEmployeeRepository(SEED_EMPLOYEES)
    const payslipRepo = new InMemoryPayslipRepository(SEED_PAYSLIPS)
    const payrollRunRepo = new InMemoryPayrollRunRepository(SEED_PAYROLL_RUNS)

    setEmployeeRepository(employeeRepo)
    setPayslipRepository(payslipRepo)
    setPayrollRunRepository(payrollRunRepo)
}

// Initialize repositories on module load
initializeRepositories()

/**
 * Get all employees for a client
 */
export function getEmployeesByClientId(clientId: string): EmployeeRecord[] {
    const repo = getEmployeeRepository()
    return repo.findByClientId(clientId)
}

/**
 * Get an employee by ID
 */
export function getEmployeeById(id: string): EmployeeRecord | null {
    const repo = getEmployeeRepository()
    const employee = repo.findById(id)
    return employee || null
}

/**
 * Get payslips for an employee
 */
export function getPayslipsByEmployeeId(employeeId: string): PayslipRecord[] {
    const repo = getPayslipRepository()
    return repo.findByEmployeeId(employeeId)
}

/**
 * Get payslips for a client
 */
export function getPayslipsByClientId(clientId: string): PayslipRecord[] {
    const repo = getPayslipRepository()
    return repo.findByClientId(clientId)
}

/**
 * Get payroll runs for a client
 */
export function getPayrollRunsByClientId(clientId: string): PayrollRun[] {
    const repo = getPayrollRunRepository()
    return repo.findByClientId(clientId)
}

/**
 * Get latest payroll run for a client
 */
export function getLatestPayrollRunByClientId(clientId: string): PayrollRun | null {
    const repo = getPayrollRunRepository()
    const run = repo.findLatestByClientId(clientId)
    return run || null
}
