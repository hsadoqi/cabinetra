import { AlertCircle, AlertTriangle, CheckCircle2, FileWarning } from "lucide-react"

import type { ClientStatus } from "./types"

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
