import { Building2, X } from "lucide-react"
import { ClientStatus, SidebarClient } from "./client-sidebar"

import { Badge } from "@cabinetra/ui-components"
import Link from "next/link";
import { cn } from "@cabinetra/ui-components/lib/utils"

const statusDot: Record<ClientStatus, string> = {
    active: "bg-success",
    pending_vat: "bg-info",
    review: "bg-warning",
    overdue: "bg-destructive",
}

const statusLabelKey: Record<ClientStatus, string> = {
    active: "switcher.status.active",
    pending_vat: "switcher.status.pending",
    review: "switcher.status.review",
    overdue: "switcher.status.overdue",
}

export const ClientSidebarPicker = ({
    currentClient,
    onOpenClientSwitcher,
    onClearClient,
    tr,
}: {
    currentClient: SidebarClient
    onOpenClientSwitcher: () => void
    onClearClient: () => void
    tr: (key: string) => string
}) => {
    return (
        <div className="px-2 pt-2 pb-1">
            <div className="rounded-sm border border-sidebar-border bg-background overflow-hidden">
                {/* Client row */}
                <button
                    onClick={onOpenClientSwitcher}
                    className="w-full flex items-center gap-2 px-2 py-2 hover:bg-accent/60 text-start"
                    aria-label={tr("nav.client.change")}
                >
                    <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-secondary text-foreground text-sm font-bold shrink-0">
                        {currentClient.name
                            .split(" ")
                            .slice(0, 2)
                            .map((w: string) => w[0])
                            .join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                            <span
                                className={cn("h-1.5 w-1.5 rounded-full shrink-0", statusDot[currentClient.status])}
                                title={tr(statusLabelKey[currentClient.status])}
                                aria-hidden="true"
                            />
                            <span className="text-sm font-semibold text-foreground truncate">
                                {currentClient.name}
                            </span>
                        </div>
                        <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground font-mono">
                            <span>{currentClient.id}</span>
                            <span className="text-border">·</span>
                            <span>{currentClient.legalForm}</span>
                        </div>
                    </div>
                    <Badge className="shrink-0 text-xs font-medium" variant="outline">
                        {currentClient.id.toUpperCase()}
                    </Badge>
                </button>

                {/* Meta */}
                <div className="grid grid-cols-2 border-t border-sidebar-border bg-secondary/20 text-xs text-muted-foreground">
                    <div className="px-2 py-1.5 border-e border-sidebar-border">
                        <div className="text-muted-foreground">ICE</div>
                        <div className="font-mono text-foreground truncate">
                            {currentClient.ice.slice(0, 10)}…
                        </div>
                    </div>
                    <div className="px-2 py-1.5">
                        <div className="text-muted-foreground">{tr("nav.regime")}</div>
                        <div className="font-medium text-foreground truncate capitalize">
                            {currentClient.regime}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center border-t border-sidebar-border divide-x divide-sidebar-border rtl:divide-x-reverse">
                    <Link
                        href={`/clients/${currentClient.id}`}
                        className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-xs font-medium text-foreground hover:bg-accent/60"
                    >
                        <Building2 className="h-3 w-3" />
                        {tr("nav.client.viewDossier")}
                    </Link>
                    <button
                        onClick={onClearClient}
                        className="flex items-center justify-center gap-1 px-2 py-1.5 text-[10px] font-medium text-muted-foreground hover:bg-accent/60 hover:text-destructive"
                        aria-label={tr("nav.client.clear")}
                    >
                        <X className="h-3 w-3" />
                    </button>
                </div>
            </div>

        </div>
    )
}
