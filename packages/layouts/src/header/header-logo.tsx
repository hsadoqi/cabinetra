import { Slot } from "radix-ui"
import { cn } from "@cabinetra/ui/lib/utils"

export function HeaderLogo({
    className,
    asChild = false,
    children,
    ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
    const Comp = asChild ? Slot.Root : "div"
    return (
        <Comp
            data-slot="header-logo"
            className={cn("flex shrink-0 items-center", className)}
            {...props}
        >
            {/* <Logo size="sm" /> */}

            {children}
        </Comp>
    )
}