import { NextRequest, NextResponse } from "next/server"
import { createClient, validateCreateClientInput } from "@cabinetra/domain-clients"

import { clients } from "@cabinetra/domain-clients"

/**
 * GET /api/clients
 * List all clients with optional filtering
 */
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const status = searchParams.get("status")
        const regime = searchParams.get("regime")
        const search = searchParams.get("q")?.toLowerCase()

        let filtered = clients

        // Filter by status
        if (status && status !== "") {
            filtered = filtered.filter((c) => c.status === status)
        }

        // Filter by regime
        if (regime && regime !== "") {
            filtered = filtered.filter((c) => c.regime === regime)
        }

        // Search by name or ICE
        if (search) {
            filtered = filtered.filter(
                (c) =>
                    c.name.toLowerCase().includes(search) ||
                    c.ice.includes(search) ||
                    c.id.toLowerCase().includes(search)
            )
        }

        return NextResponse.json(
            {
                success: true,
                data: filtered,
                count: filtered.length,
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error fetching clients:", error)
        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch clients",
            },
            { status: 500 }
        )
    }
}

/**
 * POST /api/clients
 * Create a new client
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const validation = validateCreateClientInput(body)
        if (!validation.valid) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Validation failed",
                    errors: validation.errors,
                },
                { status: 400 }
            )
        }

        const result = createClient(body)

        if (!result.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: result.error,
                    errors: result.errors,
                },
                { status: 400 }
            )
        }

        return NextResponse.json(
            {
                success: true,
                data: result.data,
            },
            { status: 201 }
        )
    } catch (error) {
        console.error("Error creating client:", error)

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid JSON body",
                },
                { status: 400 }
            )
        }

        return NextResponse.json(
            {
                success: false,
                error: "Failed to create client",
            },
            { status: 500 }
        )
    }
}
