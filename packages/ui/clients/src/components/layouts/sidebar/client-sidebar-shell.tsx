"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useI18n } from "@cabinetra/platform-i18n"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@cabinetra/ui-components"
import {
    type SidebarClient,
} from "./client-sidebar"
import { ClientSidebarContainer } from "./client-sidebar-container"

export function ClientSidebarShell({
    clientId,
    clients,
    currentClient,
    children,
}: {
    clientId: string
    clients: SidebarClient[]
    currentClient: SidebarClient
    children: React.ReactNode
}) {
    const router = useRouter()
    const { t } = useI18n()
    const [isOpen, setIsOpen] = useState(false)

    const sortedClients = useMemo(
        () => [...clients].sort((a, b) => a.name.localeCompare(b.name)),
        [clients],
    )

    return (
        <ClientSidebarContainer
            clientId={clientId}
            currentClient={currentClient}
            onOpenClientSwitcher={() => setIsOpen(true)}
            onClearClient={() => router.push("/clients")}
            clientSwitcher={
                <CommandDialog
                    className="overflow-hidden rounded-[1.75rem] border border-border/70 bg-background/95 shadow-2xl shadow-black/10 backdrop-blur supports-[backdrop-filter]:bg-background/88"
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    title={t("clients.switcher.title" as never)}
                    description={t("clients.switcher.description" as never)}
                >
                    <CommandInput
                        className="text-[15px]"
                        placeholder={t("clients.switcher.searchPlaceholder" as never)}
                    />
                    <CommandList className="max-h-[380px] p-2">
                        <CommandEmpty>{t("clients.switcher.notFound" as never)}</CommandEmpty>
                        <CommandGroup heading="Clients" className="gap-1">
                            {sortedClients.map((client) => (
                                <CommandItem
                                    key={client.id}
                                    value={`${client.name} ${client.id} ${client.legalForm}`}
                                    className="rounded-xl px-3 py-2.5"
                                    onSelect={() => {
                                        setIsOpen(false)
                                        router.push(`/clients/${client.id}`)
                                    }}
                                >
                                    <div className="flex w-full min-w-0 items-center justify-between gap-3">
                                        <span className="min-w-0">
                                            <span className="block truncate text-sm font-medium text-foreground">{client.name}</span>
                                            <span className="block truncate text-xs text-muted-foreground">
                                                {client.id} · {client.legalForm}
                                            </span>
                                        </span>
                                        {client.id === currentClient.id && (
                                            <span className="text-xs font-medium text-primary">{t("clients.switcher.current" as never)}</span>
                                        )}
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </CommandDialog>
            }
        >
            {children}
        </ClientSidebarContainer>
    )
}
