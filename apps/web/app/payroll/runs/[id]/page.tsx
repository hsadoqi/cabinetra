import { getPayrollRunRepository, getPayslipRepository } from "@cabinetra/domain-payroll"
import { PAYSLIP_STATUS_CONFIG } from "@cabinetra/domain-payroll"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, DollarSign, Users } from "lucide-react"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const repo = getPayrollRunRepository()
    const run = repo.findById(id)

    if (!run) {
        return {
            title: "Payroll Run Not Found",
        }
    }

    const periodStart = new Date(run.payPeriodStart).toLocaleDateString()
    const periodEnd = new Date(run.payPeriodEnd).toLocaleDateString()

    return {
        title: `Payroll Run ${periodStart} - ${periodEnd}`,
        description: `Payroll run details for ${periodStart} - ${periodEnd}`,
    }
}

export default async function PayrollRunDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const repo = getPayrollRunRepository()
    const run = repo.findById(id)

    if (!run) {
        notFound()
    }

    const payslipsRepo = getPayslipRepository()
    const payslips = payslipsRepo.findByPayrollRunPeriod(run.clientId, run.payPeriodStart, run.payPeriodEnd)

    const periodStart = new Date(run.payPeriodStart).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
    })
    const periodEnd = new Date(run.payPeriodEnd).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })

    return (
        <div className="min-h-screen bg-background">
            <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hidden">
                <div className="p-6 space-y-6">
                    {/* Back Link */}
                    <Link href="/payroll/runs" className="flex items-center gap-2 text-sm text-primary hover:underline">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Payroll Runs
                    </Link>

                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            Payroll Run: {periodStart} - {periodEnd}
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">Run ID: {run.id}</p>
                    </div>

                    {/* Status & Quick Info */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-lg border border-border bg-card p-4">
                            <p className="text-xs text-muted-foreground">Status</p>
                            <p className="mt-2 text-sm font-semibold text-foreground capitalize">{run.status}</p>
                        </div>
                        <div className="rounded-lg border border-border bg-card p-4">
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Users className="h-3 w-3" /> Employees
                            </p>
                            <p className="mt-2 text-2xl font-bold text-foreground">{run.employeeCount}</p>
                        </div>
                        <div className="rounded-lg border border-border bg-card p-4">
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <DollarSign className="h-3 w-3" /> Gross Total
                            </p>
                            <p className="mt-2 font-semibold text-foreground">
                                {Math.round(run.totalGrossSalaries).toLocaleString()} MAD
                            </p>
                        </div>
                        <div className="rounded-lg border border-border bg-card p-4">
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <DollarSign className="h-3 w-3" /> Net Total
                            </p>
                            <p className="mt-2 font-semibold text-foreground">
                                {Math.round(run.totalNetSalaries).toLocaleString()} MAD
                            </p>
                        </div>
                    </div>

                    {/* Payslips Table */}
                    <div>
                        <h2 className="text-xl font-semibold text-foreground mb-4">Payslips</h2>
                        {payslips.length > 0 ? (
                            <div className="rounded-lg border border-border overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="border-b border-border bg-muted/50">
                                            <tr>
                                                <th className="px-4 py-3 text-left font-medium text-foreground">Employee</th>
                                                <th className="px-4 py-3 text-right font-medium text-foreground">Gross Salary</th>
                                                <th className="px-4 py-3 text-right font-medium text-foreground">Deductions</th>
                                                <th className="px-4 py-3 text-right font-medium text-foreground">Net Salary</th>
                                                <th className="px-4 py-3 text-left font-medium text-foreground">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {payslips.map((payslip) => {
                                                const statusConfig = PAYSLIP_STATUS_CONFIG[payslip.status]
                                                const StatusIcon = statusConfig.icon

                                                return (
                                                    <tr key={payslip.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                                                        <td className="px-4 py-3 text-foreground">{payslip.employeeId}</td>
                                                        <td className="px-4 py-3 text-right text-foreground font-medium">
                                                            {Math.round(payslip.grossSalaryMad).toLocaleString()} MAD
                                                        </td>
                                                        <td className="px-4 py-3 text-right text-foreground">
                                                            {Math.round(payslip.totalDeductionsMad).toLocaleString()} MAD
                                                        </td>
                                                        <td className="px-4 py-3 text-right text-foreground font-semibold">
                                                            {Math.round(payslip.netSalaryMad).toLocaleString()} MAD
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <div className="flex items-center gap-1">
                                                                <StatusIcon className={`h-4 w-4 ${statusConfig.color}`} />
                                                                <span className={`text-xs font-medium ${statusConfig.color}`}>
                                                                    {statusConfig.label}
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-lg border border-border bg-card p-8 text-center">
                                <p className="text-muted-foreground">No payslips in this run</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
