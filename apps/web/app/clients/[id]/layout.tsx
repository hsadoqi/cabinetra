import { clients, getClientById } from "@cabinetra/domain-clients"

import { ClientDetailProviders } from "./client-detail-providers"
import { ClientSidebarShell } from "@cabinetra/ui-clients";
import { notFound } from "next/navigation"

const ClientsLayout = async ({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ id: string }>
}) => {
    const { id } = await params
    const client = getClientById(id)

    if (!client) {
        notFound()
    }

    return (
        <ClientDetailProviders>
            <div className="flex flex-1 min-w-0">
                <ClientSidebarShell clientId={id} clients={clients} currentClient={client}>
                    {children}
                </ClientSidebarShell>
            </div>
        </ClientDetailProviders>
    )
}

export default ClientsLayout