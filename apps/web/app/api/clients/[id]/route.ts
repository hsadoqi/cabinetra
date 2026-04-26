import { NextRequest, NextResponse } from "next/server"
import { deleteClient, getClientById, updateClient, validateClientId, validateUpdateClientInput } from "@cabinetra/domain-clients"

/**
 * GET /api/clients/[id]
 * Get a single client by ID
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        // Validate client ID format
        const idValidation = validateClientId(id)
        if (!idValidation.valid) {
            return NextResponse.json(
                {
                    success: false,
                    error: idValidation.error || "Invalid client ID format",
                },
                { status: 400 }
            )
        }

        const client = getClientById(id)

        if (!client) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Client with ID ${id} not found`,
                },
                { status: 404 }
            )
        }

        return NextResponse.json(
            {
                success: true,
                data: client,
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error fetching client:", error)
        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch client",
            },
            { status: 500 }
        )
    }
}

/**
 * PUT /api/clients/[id]
 * Update a client
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        // Validate client ID format
        const idValidation = validateClientId(id)
        if (!idValidation.valid) {
            return NextResponse.json(
                {
                    success: false,
                    error: idValidation.error || "Invalid client ID format",
                },
                { status: 400 }
            )
        }

        const body = await request.json()

        const validation = validateUpdateClientInput(body)
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

        const result = updateClient(id, body)

        if (!result.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: result.error,
                    errors: result.errors,
                },
                { status: result.error?.includes("not found") ? 404 : 400 }
            )
        }

        return NextResponse.json(
            {
                success: true,
                data: result.data,
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error updating client:", error)

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
                error: "Failed to update client",
            },
            { status: 500 }
        )
    }
}

/**
 * DELETE /api/clients/[id]
 * Delete a client
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        // Validate client ID format
        const idValidation = validateClientId(id)
        if (!idValidation.valid) {
            return NextResponse.json(
                {
                    success: false,
                    error: idValidation.error || "Invalid client ID format",
                },
                { status: 400 }
            )
        }

        const result = deleteClient(id)

        if (!result.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: result.error,
                },
                { status: 404 }
            )
        }

        return NextResponse.json(
            {
                success: true,
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error deleting client:", error)
        return NextResponse.json(
            {
                success: false,
                error: "Failed to delete client",
            },
            { status: 500 }
        )
    }
}
