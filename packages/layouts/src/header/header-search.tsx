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
        <div className="hidden flex-1 max-w-sm md:block md:max-w-md lg:max-w-lg">
            <button
                data-slot="header-search"
                type="button"
                role="combobox"
                aria-expanded="false"
                aria-haspopup="dialog"
                onClick={onClick}
                className={cn(
                    "w-full relative h-10 rounded-lg border border-border/80 bg-secondary/40 pl-3.5 pr-12 text-start text-sm text-muted-foreground transition-colors hover:bg-secondary/60 hover:border-border focus:outline-none focus:ring-2 focus:ring-ring/50 focus:bg-background",
                    className
                )}
                {...props}
            >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <span className="hidden text-sm text-muted-foreground sm:inline-block ml-1">{placeholder}</span>
                {shortcut && (
                    <kbd className="absolute right-2 top-1/2 -translate-y-1/2 hidden gap-1 rounded border border-border/50 bg-background/80 px-2 py-1 font-mono text-xs text-muted-foreground sm:flex items-center">
                        {shortcut}
                    </kbd>
                )}
            </button>
        </div>
    )
}
