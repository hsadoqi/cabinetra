import { Search } from "lucide-react"
import { cn } from "@cabinetra/ui/lib/utils"

interface HeaderSearchProps extends React.ComponentProps<"button"> {
    placeholder?: string
    shortcut?: string
}

export function HeaderSearch({
    className,
    placeholder = "Search…",
    shortcut = "⌘K",
    onClick,
    ...props
}: HeaderSearchProps) {
    return (
        <div className="hidden md:block md:w-64 lg:w-72">
            <button
                data-slot="header-search"
                type="button"
                role="combobox"
                aria-expanded="false"
                aria-haspopup="dialog"
                onClick={onClick}
                className={cn(
                    "w-full relative h-9 rounded-md border border-border/60 bg-secondary/30 px-3 text-start text-sm text-muted-foreground transition-colors hover:bg-secondary/50 hover:border-border/80 focus:outline-none focus:ring-2 focus:ring-ring/50 focus:bg-background",
                    className
                )}
                {...props}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1">
                        <Search className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm text-muted-foreground truncate">{placeholder}</span>
                    </div>
                    {shortcut && (
                        <kbd className="ml-2 hidden gap-1 rounded border border-border/40 bg-background/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:flex items-center flex-shrink-0">
                            {shortcut}
                        </kbd>
                    )}
                </div>
            </button>
        </div>
    )
}
