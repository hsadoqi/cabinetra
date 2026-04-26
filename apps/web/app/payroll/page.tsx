import { getPayrollRunsByClientId } from "@cabinetra/domain-payroll"
import { getClientById } from "@cabinetra/domain-clients"
import { PayrollSummaryCard } from "@cabinetra/ui-payroll"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata = {
    title: "Payroll Dashboard",
    description: "Manage payroll, employees, and payslips",
}

export default async function PayrollPage() {
    // For now, get payroll data from first client (atlas SARL)
    const clientId = "CL-0001"
    const client = getClientById(clientId)

    if (!client) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-muted-foreground">Client not found</p>
            </div>
        )
    }

    const payrollRuns = getPayrollRunsByClientId(clientId)

    return (
        <div className="min-h-screen bg-background">
            <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hidden">
                <div className="p-6 space-y-8">
                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Payroll Dashboard</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Manage payroll runs, employees, and payslips for {client.name}
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="rounded-lg border border-border bg-card p-4">
                            <p className="text-xs font-medium text-muted-foreground">Total Employees</p>
                            <p className="mt-2 text-2xl font-bold text-foreground">{client.employeeCount}</p>
                        </div>
                        <div className="rounded-lg border border-border bg-card p-4">
                            <p className="text-xs font-medium text-muted-foreground">Payroll Runs</p>
                            <p className="mt-2 text-2xl font-bold text-foreground">{payrollRuns.length}</p>
                        </div>
                        <div className="rounded-lg border border-border bg-card p-4">
                            <p className="text-xs font-medium text-muted-foreground">Last Run</p>
                            <p className="mt-2 text-sm font-semibold text-foreground">
                                {payrollRuns.length > 0
                                    ? new Date(payrollRuns[0].createdAt).toLocaleDateString()
                                    : "No runs yet"}
                            </p>
                        </div>
                    </div>

                    {/* Payroll Runs Section */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-foreground">Recent Payroll Runs</h2>
                            <Link
                                href={`/payroll/runs`}
                                className="flex items-center gap-1 text-sm text-primary hover:underline"
                            >
                                View All <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                        {payrollRuns.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                {payrollRuns.slice(0, 4).map((run) => (
                                    <Link key={run.id} href={`/payroll/runs/${run.id}`}>
                                        <PayrollSummaryCard run={run} />
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-lg border border-border bg-card p-8 text-center">
                                <p className="text-muted-foreground">No payroll runs yet</p>
                            </div>
                        )}
                    </div>

                    {/* Navigation Links */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Link href={`/payroll/employees`}>
                            <div className="rounded-lg border border-border bg-card p-6 hover:shadow-md transition-shadow cursor-pointer">
                                <h3 className="text-lg font-semibold text-foreground">Employees</h3>
                                <p className="text-xs text-muted-foreground mt-1">Manage employee records and details</p>
                                <p className="text-sm font-medium text-primary mt-3">View Employees →</p>
                            </div>
                        </Link>
                        <Link href={`/payroll/runs`}>
                            <div className="rounded-lg border border-border bg-card p-6 hover:shadow-md transition-shadow cursor-pointer">
                                <h3 className="text-lg font-semibold text-foreground">Payroll Runs</h3>
                                <p className="text-xs text-muted-foreground mt-1">View and manage payroll processing</p>
                                <p className="text-sm font-medium text-primary mt-3">View Runs →</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
