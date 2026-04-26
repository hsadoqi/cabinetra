import { cn } from "@cabinetra/ui/lib/utils";

export function HeaderActions({
    className,
    children,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="header-actions"
            className={cn(
                "ms-auto flex shrink-0 items-center gap-1.5 border-l border-border/70 pl-2.5 sm:gap-2 sm:pl-3",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}
