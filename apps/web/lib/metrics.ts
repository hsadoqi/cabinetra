import { clients } from "./clients-data"

export function calculateMetrics() {
    const totalClients = clients.length
    const activeClients = clients.filter((c) => c.status === "active").length
    const pendingClients = clients.filter((c) => c.status === "pending_vat").length
    const reviewClients = clients.filter((c) => c.status === "review").length
    const overdueClients = clients.filter((c) => c.status === "overdue").length

    const totalMonthlyRevenue = clients.reduce((sum, c) => sum + c.monthlyRevenueMad, 0)
    const totalPendingDeclarations = clients.reduce((sum, c) => sum + c.pendingDeclarations, 0)
    const totalUnreconciledEntries = clients.reduce((sum, c) => sum + c.unreconciledEntries, 0)
    const totalEmployees = clients.reduce((sum, c) => sum + c.employeeCount, 0)

    const averageRevenue = totalClients > 0 ? totalMonthlyRevenue / totalClients : 0

    // Find clients with critical issues (overdue or high pending declarations)
    const criticalClients = clients.filter(
        (c) => c.status === "overdue" || c.pendingDeclarations >= 3
    )

    return {
        totalClients,
        activeClients,
        pendingClients,
        reviewClients,
        overdueClients,
        totalMonthlyRevenue,
        totalPendingDeclarations,
        totalUnreconciledEntries,
        totalEmployees,
        averageRevenue,
        criticalClients,
    }
}

export type Metrics = ReturnType<typeof calculateMetrics>
