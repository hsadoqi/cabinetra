import { cn } from "@cabinetra/ui/lib/utils";

export function HeaderContent({
    className,
    children,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="header-content"
            className={cn(
                "mx-auto flex h-14 w-full max-w-7xl items-center gap-2.5 px-3 sm:h-15 sm:gap-3 sm:px-6 lg:px-8",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}
