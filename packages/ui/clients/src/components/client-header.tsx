"use client"

import type { ClientRecord } from "@cabinetra/domain-clients"
import { STATUS_CONFIG } from "@cabinetra/domain-clients"
import { cn } from "@cabinetra/ui-components/lib/utils"
import { useI18n } from "@cabinetra/platform-i18n"

export function ClientHeader({ client }: { client: ClientRecord }) {
    const { t } = useI18n()
    const status = STATUS_CONFIG[client.status] ?? STATUS_CONFIG["active"]
    const StatusIcon = status!.icon

    return (
        <div className="flex items-start justify-between">
            <div>
                <h1 className="text-3xl font-bold text-foreground">{client.name}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                    <span
                        className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium",
                            status!.bgColor,
                            status!.color
                        )}
                    >
                        <StatusIcon className="h-4 w-4" />
                        {t(status!.key as never)}
                    </span>
                    <div className="text-sm text-muted-foreground space-y-1">
                        <p>
                            <strong>ID:</strong> <span className="font-mono">{client.id}</span>
                        </p>
                        <p>
                            <strong>Régime:</strong> {client.regime === "normal" ? "Régime Normal" : "Régime Simplifié"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
