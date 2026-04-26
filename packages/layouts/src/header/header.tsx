import * as React from "react"

import { cn } from "@cabinetra/ui/lib/utils";

export function Header({
    className,
    children,
    ...props
}: React.ComponentProps<"header">) {
    return (
        <header
            data-slot="header"
            className={cn(
                "sticky top-0 z-30 w-full border-b border-border/70 bg-background/88 shadow-[0_1px_0_rgba(0,0,0,0.03)] backdrop-blur supports-[backdrop-filter]:bg-background/72",
                className
            )}
            {...props}
        >
            {children}
        </header>
    )
}