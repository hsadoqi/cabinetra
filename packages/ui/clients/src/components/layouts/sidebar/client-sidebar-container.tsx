import { ClientSidebar, type SidebarClient } from "./client-sidebar"
import { ClientContent } from "../content/client-content"

type ClientSidebarContainerProps = {
    clientId: string
    children: React.ReactNode
    currentClient?: SidebarClient | null
    onClearClient?: () => void
    onOpenClientSwitcher?: () => void
    clientSwitcher?: React.ReactNode
}

export function ClientSidebarContainer({
    clientId,
    children,
    currentClient,
    onClearClient,
    onOpenClientSwitcher,
    clientSwitcher,
}: ClientSidebarContainerProps) {
    const activeClient: SidebarClient = currentClient ?? {
        id: clientId,
        name: clientId,
        legalForm: "-",
        ice: "-",
        regime: "normal",
        status: "active",
    }

    return (
        <div className="flex flex-1 min-w-0">
            <ClientSidebar
                currentClient={activeClient}
                onClearClient={onClearClient}
                onOpenClientSwitcher={onOpenClientSwitcher}
                clientSwitcher={clientSwitcher}
            />
            <ClientContent activeClient={activeClient}>{children}</ClientContent>
        </div>
    )
}
