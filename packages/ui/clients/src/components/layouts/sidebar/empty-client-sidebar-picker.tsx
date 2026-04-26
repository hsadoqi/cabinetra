import { Building2 } from "lucide-react"

export const EmptyClientSidebarPicker = ({
    onOpenClientSwitcher,
    tr,
}: {
    onOpenClientSwitcher: () => void
    tr: (key: string) => string
}) => {
    return (
        <button
            onClick={onOpenClientSwitcher}
            className="w-full flex items-center gap-2 rounded-sm border border-dashed border-sidebar-border bg-background/50 px-2 py-2.5 hover:bg-accent/40 hover:border-primary/40 text-start group"
        >
            <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-muted text-muted-foreground shrink-0 group-hover:bg-primary/10 group-hover:text-primary">
                <Building2 className="h-3.5 w-3.5" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-[12px] font-medium text-foreground truncate">
                    {tr("nav.client.select")}
                </div>
                <div className="text-[10px] text-muted-foreground truncate">
                    {tr("nav.client.none")}
                </div>
            </div>
            <kbd className="hidden group-hover:inline-flex items-center rounded border border-border bg-background px-1 py-0.5 font-mono text-[9px] text-muted-foreground shrink-0">
                ⌘K
            </kbd>
        </button>
    )
}
