"use client"

import { getPayrollRunsByClientId } from "@cabinetra/domain-payroll"
import { PayrollSummaryCard } from "@cabinetra/ui-payroll"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"

const CLIENT_ID = "CL-0001" // Default to Atlas SARL for now

export default function PayrollRunsPage() {
    const router = useRouter()
    const payrollRuns = getPayrollRunsByClientId(CLIENT_ID)

    // Sort by created date, newest first
    const sorted = [...payrollRuns].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    return (
        <div className="min-h-screen bg-background">
            <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hidden">
                <div className="p-6 space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Payroll Runs</h1>
                            <p className="text-sm text-muted-foreground mt-1">{sorted.length} payroll runs</p>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
                            <Plus className="h-4 w-4" />
                            New Payroll Run
                        </button>
                    </div>

                    {/* Payroll Runs List */}
                    {sorted.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            {sorted.map((run) => (
                                <div
                                    key={run.id}
                                    onClick={() => router.push(`/payroll/runs/${run.id}`)}
                                    className="cursor-pointer"
                                >
                                    <PayrollSummaryCard run={run} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-lg border border-border bg-card p-8 text-center">
                            <p className="text-muted-foreground">No payroll runs yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
