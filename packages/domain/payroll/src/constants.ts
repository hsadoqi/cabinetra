import { AlertCircle, CheckCircle2, Clock, Briefcase, LogOut } from "lucide-react"

import type { EmployeeStatus, PayrollRunStatus, PayslipStatus, EmploymentType } from "./types"

/**
 * Centralized lists of valid values
 */
export const EMPLOYMENT_TYPES: ReadonlyArray<EmploymentType> = ["permanent", "contract", "intern"]

export const EMPLOYEE_STATUSES: ReadonlyArray<EmployeeStatus> = ["active", "on_leave", "inactive"]

export const PAYSLIP_STATUSES: ReadonlyArray<PayslipStatus> = ["draft", "issued", "paid", "disputed"]

export const PAYROLL_RUN_STATUSES: ReadonlyArray<PayrollRunStatus> = ["draft", "processing", "completed", "paid"]

/**
 * Status configuration for UI display
 */
export const EMPLOYEE_STATUS_CONFIG: Record<
    EmployeeStatus,
    {
        color: string
        bgColor: string
        icon: typeof CheckCircle2
        label: string
    }
> = {
    active: {
        label: "Active",
        color: "text-emerald-600 dark:text-emerald-400",
        bgColor: "bg-emerald-50/50 dark:bg-emerald-950/20",
        icon: CheckCircle2,
    },
    on_leave: {
        label: "On Leave",
        color: "text-amber-600 dark:text-amber-400",
        bgColor: "bg-amber-50/50 dark:bg-amber-950/20",
        icon: LogOut,
    },
    inactive: {
        label: "Inactive",
        color: "text-muted-foreground dark:text-muted-foreground",
        bgColor: "bg-muted/50 dark:bg-muted/20",
        icon: AlertCircle,
    },
}

export const PAYSLIP_STATUS_CONFIG: Record<
    PayslipStatus,
    {
        color: string
        bgColor: string
        icon: typeof CheckCircle2
        label: string
    }
> = {
    draft: {
        label: "Draft",
        color: "text-muted-foreground dark:text-muted-foreground",
        bgColor: "bg-muted/50 dark:bg-muted/20",
        icon: Clock,
    },
    issued: {
        label: "Issued",
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-50/50 dark:bg-blue-950/20",
        icon: Briefcase,
    },
    paid: {
        label: "Paid",
        color: "text-emerald-600 dark:text-emerald-400",
        bgColor: "bg-emerald-50/50 dark:bg-emerald-950/20",
        icon: CheckCircle2,
    },
    disputed: {
        label: "Disputed",
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-50/50 dark:bg-red-950/20",
        icon: AlertCircle,
    },
}

export const PAYROLL_RUN_STATUS_CONFIG: Record<
    PayrollRunStatus,
    {
        color: string
        bgColor: string
        icon: typeof CheckCircle2
        label: string
    }
> = {
    draft: {
        label: "Draft",
        color: "text-muted-foreground dark:text-muted-foreground",
        bgColor: "bg-muted/50 dark:bg-muted/20",
        icon: Clock,
    },
    processing: {
        label: "Processing",
        color: "text-amber-600 dark:text-amber-400",
        bgColor: "bg-amber-50/50 dark:bg-amber-950/20",
        icon: Clock,
    },
    completed: {
        label: "Completed",
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-50/50 dark:bg-blue-950/20",
        icon: Briefcase,
    },
    paid: {
        label: "Paid",
        color: "text-emerald-600 dark:text-emerald-400",
        bgColor: "bg-emerald-50/50 dark:bg-emerald-950/20",
        icon: CheckCircle2,
    },
}

/**
 * Moroccan payroll tax and deduction constants
 */
export const MOROCCO_PAYROLL = {
    CNSS_RATE: 0.0408, // 4.08% employee contribution
    CNSS_CEILING: 6000, // Monthly ceiling in MAD
    IRPP_RATES: {
        // IRPP tax brackets (simplified - actual implementation needs full tables)
        bracket1: { min: 0, max: 30000, rate: 0 },
        bracket2: { min: 30001, max: 50000, rate: 0.13 },
        bracket3: { min: 50001, max: 60000, rate: 0.21 },
        bracket4: { min: 60001, max: 100000, rate: 0.34 },
        bracket5: { min: 100001, max: Infinity, rate: 0.38 },
    },
} as const

export const EMPLOYMENT_TYPE_LABELS = {
    permanent: "Permanent",
    contract: "Contract",
    intern: "Intern",
} as const

export const PAYMENT_FREQUENCY_LABELS = {
    monthly: "Monthly",
    "bi-weekly": "Bi-Weekly",
} as const
