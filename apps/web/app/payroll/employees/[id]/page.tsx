import { getEmployeeById, getPayslipsByEmployeeId } from "@cabinetra/domain-payroll"
import { EmployeeSummaryPanel } from "@cabinetra/ui-payroll"
import { notFound } from "next/navigation"
import Link from "next/link"
import { PAYSLIP_STATUS_CONFIG } from "@cabinetra/domain-payroll"
import { ArrowLeft } from "lucide-react"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const employee = getEmployeeById(id)

    if (!employee) {
        return {
            title: "Employee Not Found",
        }
    }

    return {
        title: `${employee.firstName} ${employee.lastName} - Employee Details`,
        description: `Employee profile for ${employee.firstName} ${employee.lastName}`,
    }
}

export default async function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const employee = getEmployeeById(id)

    if (!employee) {
        notFound()
    }

    const payslips = getPayslipsByEmployeeId(id)

    return (
        <div className="min-h-screen bg-background">
            <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hidden">
                <div className="p-6 space-y-6">
                    {/* Back Link */}
                    <Link href="/payroll/employees" className="flex items-center gap-2 text-sm text-primary hover:underline">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Employees
                    </Link>

                    {/* Employee Summary */}
                    <EmployeeSummaryPanel employee={employee} />

                    {/* Payslip History */}
                    <div>
                        <h2 className="text-xl font-semibold text-foreground mb-4">Payslip History</h2>
                        {payslips.length > 0 ? (
                            <div className="rounded-lg border border-border overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="border-b border-border bg-muted/50">
                                            <tr>
                                                <th className="px-4 py-3 text-left font-medium text-foreground">Period</th>
                                                <th className="px-4 py-3 text-right font-medium text-foreground">Gross Salary</th>
                                                <th className="px-4 py-3 text-right font-medium text-foreground">Deductions</th>
                                                <th className="px-4 py-3 text-right font-medium text-foreground">Net Salary</th>
                                                <th className="px-4 py-3 text-left font-medium text-foreground">Status</th>
                                                <th className="px-4 py-3 text-center font-medium text-foreground">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {payslips.map((payslip) => {
                                                const statusConfig = PAYSLIP_STATUS_CONFIG[payslip.status]
                                                const StatusIcon = statusConfig.icon

                                                return (
                                                    <tr key={payslip.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                                                        <td className="px-4 py-3 text-foreground">
                                                            {new Date(payslip.payPeriodStart).toLocaleDateString()} -{" "}
                                                            {new Date(payslip.payPeriodEnd).toLocaleDateString()}
                                                        </td>
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
                                                        <td className="px-4 py-3 text-center">
                                                            <button className="text-xs text-primary hover:underline font-medium">
                                                                View
                                                            </button>
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
                                <p className="text-muted-foreground">No payslips yet</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
