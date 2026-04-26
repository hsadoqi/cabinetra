import { ClientDetailsContent } from "./client-details-content"
import type { Metadata } from "next"
import { getClientById } from "@/lib/clients-data"
import { notFound } from "next/navigation"

type ClientDetailsPageProps = {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ClientDetailsPageProps): Promise<Metadata> {
    const { id } = await params
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
    const client = getClientById(id)

    if (!client) {
        notFound()
    }

    return <ClientDetailsContent client={client} />
}