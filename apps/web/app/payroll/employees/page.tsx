"use client"

import { getEmployeesByClientId } from "@cabinetra/domain-payroll"
import { EmployeeListCard } from "@cabinetra/ui-payroll"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search, Plus } from "lucide-react"

const CLIENT_ID = "CL-0001" // Default to Atlas SARL for now

export default function EmployeesPage() {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("")

    const employees = getEmployeesByClientId(CLIENT_ID)

    const filtered = employees.filter(
        (emp) =>
            emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-background">
            <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hidden">
                <div className="p-6 space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Employees</h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                {filtered.length} of {employees.length} employees
                            </p>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
                            <Plus className="h-4 w-4" />
                            Add Employee
                        </button>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or job title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* Employee List */}
                    {filtered.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            {filtered.map((employee) => (
                                <EmployeeListCard
                                    key={employee.id}
                                    employee={employee}
                                    onClick={() => router.push(`/payroll/employees/${employee.id}`)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-lg border border-border bg-card p-8 text-center">
                            <p className="text-muted-foreground">
                                {searchTerm ? "No employees match your search" : "No employees found"}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
