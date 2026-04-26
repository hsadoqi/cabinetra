import { type SidebarClient } from "../sidebar/client-sidebar"

export function ClientContent({
    children,
}: {
    activeClient?: SidebarClient
    children: React.ReactNode
}) {
    return (
        // <div className="flex flex-1 min-w-0 flex-col overflow-hidden">
        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hidden p-4">
            {children}
        </div>
        // </div>
    )
}
