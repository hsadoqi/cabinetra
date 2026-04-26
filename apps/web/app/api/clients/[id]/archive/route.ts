import { NextRequest, NextResponse } from "next/server"
import { archiveClient, validateClientId } from "@cabinetra/domain-clients"

/**
 * PATCH /api/clients/[id]/archive
 * Archive a client by setting the archivedAt timestamp
 */
export async function PATCH(
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

        const result = archiveClient(id)

        if (!result.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: result.error,
                },
                { status: result.error?.includes("not found") ? 404 : 409 }
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
        console.error("Error archiving client:", error)
        return NextResponse.json(
            {
                success: false,
                error: "Failed to archive client",
            },
            { status: 500 }
        )
    }
}
