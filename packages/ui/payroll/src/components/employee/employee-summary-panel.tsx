"use client"

import type { EmployeeRecord } from "@cabinetra/domain-payroll"
import { EMPLOYEE_STATUS_CONFIG, EMPLOYMENT_TYPE_LABELS, PAYMENT_FREQUENCY_LABELS } from "@cabinetra/domain-payroll"
import { Mail, Phone, Calendar, Briefcase, Building } from "lucide-react"

export function EmployeeSummaryPanel({ employee }: { employee: EmployeeRecord }) {
    const statusConfig = EMPLOYEE_STATUS_CONFIG[employee.status]
    const StatusIcon = statusConfig.icon

    const hireDate = new Date(employee.hireDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })

    const yearsEmployed = Math.floor(
        (new Date().getTime() - new Date(employee.hireDate).getTime()) / (1000 * 60 * 60 * 24 * 365.25)
    )

    return (
        <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-6 flex items-start justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-foreground">
                        {employee.firstName} {employee.lastName}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">{employee.jobTitle}</p>
                </div>
                <div className="flex items-center gap-2">
                    <StatusIcon className={`h-5 w-5 ${statusConfig.color}`} />
                    <span className={`text-sm font-medium ${statusConfig.color}`}>{statusConfig.label}</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                <div className="rounded border border-border/50 bg-background/40 p-3">
                    <p className="text-xs text-muted-foreground">Employment Type</p>
                    <p className="mt-1 text-sm font-medium text-foreground">
                        {EMPLOYMENT_TYPE_LABELS[employee.employmentType]}
                    </p>
                </div>

                <div className="rounded border border-border/50 bg-background/40 p-3">
                    <p className="text-xs text-muted-foreground">Payment Frequency</p>
                    <p className="mt-1 text-sm font-medium text-foreground">
                        {PAYMENT_FREQUENCY_LABELS[employee.paymentFrequency]}
                    </p>
                </div>

                <div className="rounded border border-border/50 bg-background/40 p-3">
                    <p className="text-xs text-muted-foreground">Monthly Salary</p>
                    <p className="mt-1 text-sm font-medium text-foreground">{Math.round(employee.grossSalaryMad).toLocaleString()} MAD</p>
                </div>

                <div className="rounded border border-border/50 bg-background/40 p-3">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> Hire Date
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">{hireDate}</p>
                </div>

                <div className="rounded border border-border/50 bg-background/40 p-3">
                    <p className="text-xs text-muted-foreground">Years Employed</p>
                    <p className="mt-1 text-sm font-medium text-foreground">{yearsEmployed} years</p>
                </div>

                <div className="rounded border border-border/50 bg-background/40 p-3">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Building className="h-3 w-3" /> Department
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">{employee.department}</p>
                </div>
            </div>

            <div className="mt-4 border-t border-border pt-4">
                <p className="text-xs font-medium text-muted-foreground mb-3">Contact Information</p>
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a href={`mailto:${employee.email}`} className="text-sm text-primary hover:underline">
                            {employee.email}
                        </a>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a href={`tel:${employee.phone}`} className="text-sm text-primary hover:underline">
                            {employee.phone}
                        </a>
                    </div>
                </div>
            </div>

            {employee.cnssNumber && (
                <div className="mt-4 border-t border-border pt-4">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Tax Information</p>
                    <div className="space-y-1">
                        <p className="text-sm text-foreground">
                            <span className="text-muted-foreground">CNSS Number:</span> {employee.cnssNumber}
                        </p>
                        {employee.irpp && (
                            <p className="text-sm text-foreground">
                                <span className="text-muted-foreground">IRPP Rate:</span> {employee.irpp}%
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
