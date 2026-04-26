"use client"

import { AlertCircle } from "lucide-react"

export function ClientAlertsPanel() {
    return (
        <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="text-sm font-semibold text-foreground mb-4">Alerts</h3>
            <div className="flex items-center justify-center py-8 text-muted-foreground">
                <div className="text-center">
                    <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No active alerts</p>
                </div>
            </div>
        </div>
    )
}