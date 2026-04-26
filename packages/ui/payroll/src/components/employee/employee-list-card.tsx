"use client"

import { Badge, Card } from "@cabinetra/ui-components"
import type { EmployeeRecord } from "@cabinetra/domain-payroll"
import { EMPLOYEE_STATUS_CONFIG, EMPLOYMENT_TYPE_LABELS, PAYMENT_FREQUENCY_LABELS } from "@cabinetra/domain-payroll"
import { Mail, Phone, Calendar, Briefcase } from "lucide-react"

export function EmployeeListCard({ employee, onClick }: { employee: EmployeeRecord; onClick?: () => void }) {
    const statusConfig = EMPLOYEE_STATUS_CONFIG[employee.status]
    const StatusIcon = statusConfig.icon

    const hireDate = new Date(employee.hireDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    })

    return (
        <Card
            className={`p-4 cursor-pointer transition-all hover:shadow-md ${onClick ? "hover:border-primary" : ""}`}
            onClick={onClick}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground truncate">
                        {employee.firstName} {employee.lastName}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{employee.jobTitle}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                            {EMPLOYMENT_TYPE_LABELS[employee.employmentType]}
                        </Badge>
                        <div className="flex items-center gap-1">
                            <StatusIcon className={`h-3 w-3 ${statusConfig.color}`} />
                            <span className={`text-xs font-medium ${statusConfig.color}`}>{statusConfig.label}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-border pt-3">
                <div className="flex items-center gap-2 text-xs">
                    <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">{Math.round(employee.grossSalaryMad).toLocaleString()} MAD</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground capitalize">{PAYMENT_FREQUENCY_LABELS[employee.paymentFrequency]}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground text-xs">Hired {hireDate}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                    <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground truncate">{employee.email}</span>
                </div>
            </div>
        </Card>
    )
}

function DollarSign({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
    )
}

function Clock({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
    )
}
