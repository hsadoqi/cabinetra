"use client"

import { ClientActions, ClientBreadcrumb, ClientDetailsPanel } from "@cabinetra/feature-clients"

import type { ClientRecord } from "@cabinetra/domain-clients"

export function ClientDetailsContent({ client }: { client: ClientRecord }) {
    return (
        <ClientDetailsPanel
            client={client}
            breadcrumb={<ClientBreadcrumb clientName={client.name} clientId={client.id} />}
            actions={<ClientActions clientId={client.id} clientName={client.name} />}
        />
    )
}
