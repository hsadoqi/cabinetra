import { Search } from "lucide-react"
// import { cn } from "@cabinetra/ui/lib/utils"

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
        // <div className="min-w-0 flex-none md:ms-5 w-[clamp(14rem,42vw,30rem)] max-w-full">
        //     <button
        //         data-slot="header-search"
        //         type="button"
        //         role="combobox"
        //         aria-expanded="false"
        //         aria-haspopup="dialog"
        //         onClick={onClick}
        //         className={cn(
        //             "relative h-9 w-full rounded-sm border border-input bg-secondary/50 ps-8 pe-14 text-start text-[13px] text-muted-foreground hover:bg-secondary/70 focus:bg-background focus:outline-none focus:ring-2 focus:ring-ring",
        //             className
        //         )}
        //         {...props}
        //     >
        //         <Search className="absolute start-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        //         <span className="hidden flex-1 truncate text-start sm:inline-flex">{placeholder}</span>
        //         {shortcut && (
        //             <kbd className="absolute end-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 rounded border border-border bg-background px-1 py-0.5 font-mono text-[10px] text-muted-foreground">
        //                 {shortcut.split("").map((char, index) => (
        //                     <span key={index}>{char}</span>
        //                 ))}
        //             </kbd>
        //         )}
        //     </button>

        // </div>
        <div className="flex-1 max-w-xl ms-auto md:ms-6">
            <button
                onClick={onClick}
                className="w-full h-9 ps-8 pe-14 rounded-sm border border-input bg-secondary/50 text-[13px] text-muted-foreground text-start hover:bg-secondary/70 focus:outline-none focus:ring-2 focus:ring-ring focus:bg-background relative"
            // aria-label={t("topbar.search.aria")}
            >
                <Search className="absolute start-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                {/* <span className="truncate">{t("topbar.search.placeholder")}</span> */}
                <kbd className="absolute end-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 rounded border border-border bg-background px-1 py-0.5 font-mono text-[10px] text-muted-foreground">
                    <span>⌘</span>
                    <span>K</span>
                </kbd>
            </button>
        </div>
    )
}


// <div className="flex-1 max-w-xl ms-auto md:ms-6">
//     <button
//         onClick={open}
//         className="w-full h-9 ps-8 pe-14 rounded-sm border border-input bg-secondary/50 text-[13px] text-muted-foreground text-start hover:bg-secondary/70 focus:outline-none focus:ring-2 focus:ring-ring focus:bg-background relative"
//         aria-label={t("topbar.search.aria")}
//     >
//         <Search className="absolute start-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
//         <span className="truncate">{t("topbar.search.placeholder")}</span>
//         <kbd className="absolute end-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 rounded border border-border bg-background px-1 py-0.5 font-mono text-[10px] text-muted-foreground">
//             <span>⌘</span>
//             <span>K</span>
//         </kbd>
//     </button>
// </div>
