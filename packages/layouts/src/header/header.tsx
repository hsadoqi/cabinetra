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
                "sticky top-0 z-30 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90",
                className
            )}
            {...props}
        >
            {children}
        </header>
    )
}
