"use client"

import Link from "next/link"
import { cn } from "@cabinetra/ui-components/lib/utils"
import { useI18n } from "@cabinetra/platform-i18n"
import { usePathname } from "next/navigation"

const tabs = [
    { id: "overview", label: "Overview", href: "" },
    { id: "journal", label: "Journal", href: "?tab=journal" },
    { id: "payroll", label: "Payroll", href: "?tab=payroll" },
    { id: "vat", label: "VAT", href: "?tab=vat" },
]

export function ClientTabs({ active }: { active: string }) {
    const { t } = useI18n()
    const pathname = usePathname()

    return (
        <div className="border-b border-border">
            <nav className="flex gap-8" aria-label="Client tabs">
                {tabs.map((tab) => (
                    <Link
                        key={tab.id}
                        href={pathname + tab.href}
                        className={cn(
                            "px-1 py-3 text-sm font-medium border-b-2 transition-colors",
                            active === tab.id
                                ? "border-primary text-foreground"
                                : "border-transparent text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {tab.label}
                    </Link>
                ))}
            </nav>
        </div>
    )
}