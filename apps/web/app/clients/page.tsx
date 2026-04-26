"use client"

import { useMemo, useState } from "react"

import Link from "next/link"
import { Search } from "lucide-react"
import { clients } from "@/lib/clients-data"
import { useI18n } from "@cabinetra/platform-i18n"

const statusStyles: Record<string, string> = {
    active: "bg-green-100 text-green-800",
    pending_vat: "bg-blue-100 text-blue-800",
    review: "bg-amber-100 text-amber-800",
    overdue: "bg-red-100 text-red-800",
}

export const ClientsPage = () => {
    const { t } = useI18n()
    const [query, setQuery] = useState("")

    const filteredClients = useMemo(() => {
        const trimmed = query.trim().toLowerCase()
        if (!trimmed) {
            return clients
        }

        return clients.filter((client) =>
            [client.name, client.id, client.legalForm, client.ice, client.regime]
                .join(" ")
                .toLowerCase()
                .includes(trimmed),
        )
    }, [query])

    return (
        <section className="flex flex-col gap-4">
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">{t("clients.page.title" as never)}</h1>
                <p className="text-sm text-muted-foreground">{t("clients.page.description" as never)}</p>
            </div>

            <div className="relative max-w-xl">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={t("clients.page.searchPlaceholder" as never)}
                    className="h-11 w-full rounded-xl border border-border bg-background pl-9 pr-3 text-sm text-foreground outline-none ring-0 placeholder:text-muted-foreground focus:border-primary"
                />
            </div>

            {filteredClients.length === 0 ? (
                <div className="rounded-2xl border border-border/70 bg-card p-6 text-sm text-muted-foreground">
                    {t("clients.page.noResults" as never)}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredClients.map((client) => (
                        <Link
                            key={client.id}
                            href={`/clients/${client.id}`}
                            className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <h2 className="truncate text-sm font-semibold text-foreground">{client.name}</h2>
                                    <p className="text-xs text-muted-foreground">{client.id}</p>
                                </div>
                                <span
                                    className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${statusStyles[client.status] ?? "bg-muted text-muted-foreground"}`}
                                >
                                    {client.status.replace("_", " ")}
                                </span>
                            </div>

                            <dl className="mt-3 space-y-1 text-xs text-muted-foreground">
                                <div className="flex justify-between gap-3">
                                    <dt>Legal Form</dt>
                                    <dd className="font-medium text-foreground">{client.legalForm}</dd>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <dt>ICE</dt>
                                    <dd className="truncate font-mono text-foreground">{client.ice}</dd>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <dt>Regime</dt>
                                    <dd className="font-medium capitalize text-foreground">{client.regime}</dd>
                                </div>
                            </dl>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    )
}

export default ClientsPage