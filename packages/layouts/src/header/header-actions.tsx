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
                "ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}
