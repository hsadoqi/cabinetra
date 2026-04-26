import type { EmployeeRecord, PayslipRecord, PayrollRun } from "./types"

/**
 * In-memory repository for employees
 * Mimics database interface for testing and initial development
 */
export class InMemoryEmployeeRepository {
    private employees: EmployeeRecord[]

    constructor(employees: EmployeeRecord[] = []) {
        this.employees = employees
    }

    findAll(): EmployeeRecord[] {
        return this.employees
    }

    findById(id: string): EmployeeRecord | undefined {
        return this.employees.find((e) => e.id === id)
    }

    findByClientId(clientId: string): EmployeeRecord[] {
        return this.employees.filter((e) => e.clientId === clientId)
    }

    findActiveByClientId(clientId: string): EmployeeRecord[] {
        return this.employees.filter((e) => e.clientId === clientId && e.status === "active" && !e.archivedAt)
    }

    create(employee: EmployeeRecord): EmployeeRecord {
        this.employees.push(employee)
        return employee
    }

    update(id: string, updates: Partial<EmployeeRecord>): EmployeeRecord | undefined {
        const index = this.employees.findIndex((e) => e.id === id)
        if (index === -1) return undefined
        const updated = { ...this.employees[index], ...updates, updatedAt: new Date().toISOString() }
        this.employees[index] = updated
        return updated
    }

    delete(id: string): boolean {
        const index = this.employees.findIndex((e) => e.id === id)
        if (index === -1) return false
        this.employees.splice(index, 1)
        return true
    }

    archive(id: string): EmployeeRecord | undefined {
        return this.update(id, { archivedAt: new Date().toISOString() })
    }
}

/**
 * In-memory repository for payslips
 */
export class InMemoryPayslipRepository {
    private payslips: PayslipRecord[]

    constructor(payslips: PayslipRecord[] = []) {
        this.payslips = payslips
    }

    findAll(): PayslipRecord[] {
        return this.payslips
    }

    findById(id: string): PayslipRecord | undefined {
        return this.payslips.find((p) => p.id === id)
    }

    findByEmployeeId(employeeId: string): PayslipRecord[] {
        return this.payslips.filter((p) => p.employeeId === employeeId)
    }

    findByClientId(clientId: string): PayslipRecord[] {
        return this.payslips.filter((p) => p.clientId === clientId)
    }

    findByPayrollRunPeriod(clientId: string, start: string, end: string): PayslipRecord[] {
        return this.payslips.filter(
            (p) => p.clientId === clientId && p.payPeriodStart === start && p.payPeriodEnd === end
        )
    }

    create(payslip: PayslipRecord): PayslipRecord {
        this.payslips.push(payslip)
        return payslip
    }

    update(id: string, updates: Partial<PayslipRecord>): PayslipRecord | undefined {
        const index = this.payslips.findIndex((p) => p.id === id)
        if (index === -1) return undefined
        const updated = { ...this.payslips[index], ...updates }
        this.payslips[index] = updated
        return updated
    }

    delete(id: string): boolean {
        const index = this.payslips.findIndex((p) => p.id === id)
        if (index === -1) return false
        this.payslips.splice(index, 1)
        return true
    }
}

/**
 * In-memory repository for payroll runs
 */
export class InMemoryPayrollRunRepository {
    private runs: PayrollRun[]

    constructor(runs: PayrollRun[] = []) {
        this.runs = runs
    }

    findAll(): PayrollRun[] {
        return this.runs
    }

    findById(id: string): PayrollRun | undefined {
        return this.runs.find((r) => r.id === id)
    }

    findByClientId(clientId: string): PayrollRun[] {
        return this.runs.filter((r) => r.clientId === clientId)
    }

    findLatestByClientId(clientId: string): PayrollRun | undefined {
        const clientRuns = this.runs.filter((r) => r.clientId === clientId)
        if (clientRuns.length === 0) return undefined
        return clientRuns.reduce((latest, current) =>
            new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest
        )
    }

    create(run: PayrollRun): PayrollRun {
        this.runs.push(run)
        return run
    }

    update(id: string, updates: Partial<PayrollRun>): PayrollRun | undefined {
        const index = this.runs.findIndex((r) => r.id === id)
        if (index === -1) return undefined
        const updated = { ...this.runs[index], ...updates }
        this.runs[index] = updated
        return updated
    }

    delete(id: string): boolean {
        const index = this.runs.findIndex((r) => r.id === id)
        if (index === -1) return false
        this.runs.splice(index, 1)
        return true
    }
}

/**
 * Global repository instances
 */
let employeeRepository: InMemoryEmployeeRepository
let payslipRepository: InMemoryPayslipRepository
let payrollRunRepository: InMemoryPayrollRunRepository

export function getEmployeeRepository(): InMemoryEmployeeRepository {
    if (!employeeRepository) {
        employeeRepository = new InMemoryEmployeeRepository()
    }
    return employeeRepository
}

export function getPayslipRepository(): InMemoryPayslipRepository {
    if (!payslipRepository) {
        payslipRepository = new InMemoryPayslipRepository()
    }
    return payslipRepository
}

export function getPayrollRunRepository(): InMemoryPayrollRunRepository {
    if (!payrollRunRepository) {
        payrollRunRepository = new InMemoryPayrollRunRepository()
    }
    return payrollRunRepository
}

export function setEmployeeRepository(repo: InMemoryEmployeeRepository): void {
    employeeRepository = repo
}

export function setPayslipRepository(repo: InMemoryPayslipRepository): void {
    payslipRepository = repo
}

export function setPayrollRunRepository(repo: InMemoryPayrollRunRepository): void {
    payrollRunRepository = repo
}
