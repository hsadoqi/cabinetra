import type { ClientStatus, Regime } from "@cabinetra/domain-clients"
import { NextRequest, NextResponse } from "next/server"
import { getClientRepository, isClientStatus, isRegime } from "@cabinetra/domain-clients"

/**
 * GET /api/clients/search
 * Search and filter clients with server-side pagination
 * 
 * Query Parameters:
 * - q: Search query (searches name, id, ice, legalForm, regime)
 * - status: Filter by status (active, pending_vat, review, overdue, or empty for all)
 * - regime: Filter by regime (normal, simplified, or empty for all)
 * - sortBy: Sort field (name, revenue, status, updated)
 * - sortDirection: Sort direction (asc, desc)
 * - page: Page number (1-based, default: 1)
 * - pageSize: Results per page (default: 20)
 * 
 * Response:
 * {
 *   success: boolean
 *   data: ClientRecord[]
 *   pagination: {
 *     page: number
 *     pageSize: number
 *     total: number
 *     totalPages: number
 *   }
 * }
 */
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams

        // Parse pagination parameters with validation
        const parsedPage = parseInt(searchParams.get("page") || "1", 10)
        const page = Number.isFinite(parsedPage) ? Math.max(1, parsedPage) : 1

        const parsedPageSize = parseInt(searchParams.get("pageSize") || "20", 10)
        const pageSize = Number.isFinite(parsedPageSize) ? Math.max(1, Math.min(100, parsedPageSize)) : 20

        // Parse filter parameters
        const search = searchParams.get("q")?.toLowerCase().trim() || ""
        const status = searchParams.get("status") || ""
        const regime = searchParams.get("regime") || ""
        const sortBy = (searchParams.get("sortBy") || "name") as "name" | "revenue" | "status" | "updated"
        const sortDirection = (searchParams.get("sortDirection") || "asc") as "asc" | "desc"

        // Validate filter values
        if (status && status !== "" && !isClientStatus(status)) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Invalid status: ${status}`,
                },
                { status: 400 }
            )
        }

        if (regime && regime !== "" && !isRegime(regime)) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Invalid regime: ${regime}`,
                },
                { status: 400 }
            )
        }

        // Apply filters
        const repo = getClientRepository()
        const clients = repo.findAll()

        const filtered = clients.filter((client) => {
            // Exclude archived clients by default (unless explicitly requested)
            if (client.archivedAt && !searchParams.get("includeArchived")) {
                return false
            }

            // Search filter
            if (search) {
                const searchableText = [client.name, client.id, client.legalForm, client.ice, client.regime]
                    .join(" ")
                    .toLowerCase()
                if (!searchableText.includes(search)) {
                    return false
                }
            }

            // Status filter
            if (status && status !== "") {
                if (client.status !== (status as ClientStatus)) {
                    return false
                }
            }

            // Regime filter
            if (regime && regime !== "") {
                if (client.regime !== (regime as Regime)) {
                    return false
                }
            }

            return true
        })

        // Apply sorting
        filtered.sort((a, b) => {
            let comparison = 0

            switch (sortBy) {
                case "name":
                    comparison = a.name.localeCompare(b.name)
                    break
                case "revenue":
                    comparison = a.monthlyRevenueMad - b.monthlyRevenueMad
                    break
                case "status":
                    comparison = a.status.localeCompare(b.status)
                    break
                case "updated":
                    comparison = new Date(a.lastUpdatedAt).getTime() - new Date(b.lastUpdatedAt).getTime()
                    break
            }

            return sortDirection === "asc" ? comparison : -comparison
        })

        // Apply pagination
        const total = filtered.length
        const totalPages = Math.ceil(total / pageSize)
        const startIndex = (page - 1) * pageSize
        const endIndex = startIndex + pageSize
        const paginated = filtered.slice(startIndex, endIndex)

        return NextResponse.json(
            {
                success: true,
                data: paginated,
                pagination: {
                    page,
                    pageSize,
                    total,
                    totalPages,
                },
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error searching clients:", error)
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            },
            { status: 500 }
        )
    }
}
