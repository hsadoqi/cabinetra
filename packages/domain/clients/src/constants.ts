import { AlertCircle, AlertTriangle, CheckCircle2, FileWarning, Shield, ShieldAlert } from "lucide-react"

import type { ClientStatus, ComplianceStatus, Regime, RiskLevel } from "./types"

/**
 * Centralized list of all valid client statuses
 * Use this as the single source of truth for status validation
 */
export const CLIENT_STATUSES: ReadonlyArray<ClientStatus> = ["active", "pending_vat", "review", "overdue"]

/**
 * Centralized list of all valid regimes
 * Use this as the single source of truth for regime validation
 */
export const CLIENT_REGIMES: ReadonlyArray<Regime> = ["normal", "simplified"]

export const STATUS_CONFIG: Record<
    ClientStatus,
    {
        key: string
        color: string
        bgColor: string
        icon: typeof CheckCircle2
        label: string
    }
> = {
    active: {
        key: "switcher.status.active",
        label: "Active",
        color: "text-emerald-600 dark:text-emerald-400",
        bgColor: "bg-emerald-50/50 dark:bg-emerald-950/20",
        icon: CheckCircle2,
    },
    pending_vat: {
        key: "switcher.status.pending",
        label: "Pending VAT",
        color: "text-amber-600 dark:text-amber-400",
        bgColor: "bg-amber-50/50 dark:bg-amber-950/20",
        icon: FileWarning,
    },
    overdue: {
        key: "switcher.status.overdue",
        label: "Overdue",
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-50/50 dark:bg-red-950/20",
        icon: AlertCircle,
    },
    review: {
        key: "switcher.status.review",
        label: "Review",
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-50/50 dark:bg-blue-950/20",
        icon: AlertTriangle,
    },
}

export const STATUS_COLORS: Record<ClientStatus, string> = {
    active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    pending_vat: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    review: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    overdue: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
}

export const REGIME_LABELS = {
    normal: "Régime Normal",
    simplified: "Régime Simplifié",
} as const

/**
 * Centralized list of all valid compliance statuses
 */
export const COMPLIANCE_STATUSES: ReadonlyArray<ComplianceStatus> = [
    "compliant",
    "non_compliant",
    "under_review",
    "scheduled",
]

/**
 * Centralized list of all valid risk levels
 */
export const RISK_LEVELS: ReadonlyArray<RiskLevel> = ["low", "medium", "high"]

export const COMPLIANCE_STATUS_CONFIG: Record<
    ComplianceStatus,
    {
        key: string
        color: string
        bgColor: string
        icon: typeof CheckCircle2
        label: string
    }
> = {
    compliant: {
        key: "compliance.status.compliant",
        label: "Compliant",
        color: "text-emerald-600 dark:text-emerald-400",
        bgColor: "bg-emerald-50/50 dark:bg-emerald-950/20",
        icon: CheckCircle2,
    },
    non_compliant: {
        key: "compliance.status.non_compliant",
        label: "Non-Compliant",
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-50/50 dark:bg-red-950/20",
        icon: AlertCircle,
    },
    under_review: {
        key: "compliance.status.under_review",
        label: "Under Review",
        color: "text-amber-600 dark:text-amber-400",
        bgColor: "bg-amber-50/50 dark:bg-amber-950/20",
        icon: AlertTriangle,
    },
    scheduled: {
        key: "compliance.status.scheduled",
        label: "Scheduled",
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-50/50 dark:bg-blue-950/20",
        icon: FileWarning,
    },
}

export const RISK_LEVEL_CONFIG: Record<
    RiskLevel,
    {
        color: string
        bgColor: string
        icon: typeof ShieldAlert
        label: string
    }
> = {
    low: {
        label: "Low Risk",
        color: "text-emerald-600 dark:text-emerald-400",
        bgColor: "bg-emerald-50/50 dark:bg-emerald-950/20",
        icon: Shield,
    },
    medium: {
        label: "Medium Risk",
        color: "text-amber-600 dark:text-amber-400",
        bgColor: "bg-amber-50/50 dark:bg-amber-950/20",
        icon: AlertTriangle,
    },
    high: {
        label: "High Risk",
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-50/50 dark:bg-red-950/20",
        icon: ShieldAlert,
    },
}
