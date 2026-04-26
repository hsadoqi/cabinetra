import { getClientById, isValidRouteParam } from "@cabinetra/domain-clients"

import { ClientDetailsContent } from "./client-details-content"
import { ClientDetailsSkeleton } from "@cabinetra/ui-clients"
import type { Metadata } from "next"
import { Suspense } from "react"
import { notFound } from "next/navigation"

type ClientDetailsPageProps = {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ClientDetailsPageProps): Promise<Metadata> {
    const { id } = await params

    // Validate route parameter with format check
    if (!isValidRouteParam(id)) {
        return {
            title: "Client Not Found",
        }
    }

    const client = getClientById(id)

    if (!client) {
        return {
            title: "Client Not Found",
        }
    }

    return {
        title: `${client.name} - Client Details`,
        description: `Client profile for ${client.name}`,
    }
}

export default async function ClientDetailsPage({ params }: ClientDetailsPageProps) {
    const { id } = await params

    // Validate route parameter with format check (CL-XXXX)
    if (!isValidRouteParam(id)) {
        notFound()
    }

    const client = getClientById(id)

    if (!client) {
        notFound()
    }

    return (
        <Suspense fallback={<ClientDetailsSkeleton />}>
            <ClientDetailsContent client={client} />
        </Suspense>
    )
}