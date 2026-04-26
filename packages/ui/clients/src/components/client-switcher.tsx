"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Search, X, ChevronRight, Clock, Building2 } from "lucide-react"
import { cn } from "@cabinetra/ui-components/lib/utils"
import { useI18n } from "@cabinetra/platform-i18n"
import { useClientContext } from "../contexts"
import { clients, STATUS_CONFIG, type ClientRecord } from "@cabinetra/domain-clients"

interface ClientSwitcherProps {
    isOpen: boolean
    onClose: () => void
}

export function ClientSwitcher({ isOpen, onClose }: ClientSwitcherProps) {
    const { t } = useI18n()
    const router = useRouter()
    const { setCurrentClient, recentClientIds } = useClientContext()
    const [query, setQuery] = useState("")
    const [selectedIndex, setSelectedIndex] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)
    const listRef = useRef<HTMLDivElement>(null)

    // Use recent clients from context, fallback to first 4 if none
    const recentClients = useMemo(() => {
        if (recentClientIds.length > 0) {
            return clients.filter((c) => recentClientIds.includes(c.id))
        }
        return clients.slice(0, 4)
    }, [recentClientIds])

    const filteredClients = useMemo(() => {
        if (!query.trim()) return []
        const q = query.toLowerCase()
        return clients.filter(
            (c) =>
                c.name.toLowerCase().includes(q) ||
                c.id.toLowerCase().includes(q)
        )
    }, [query])

    const displayClients = query.trim() ? filteredClients : recentClients
    const showRecentHeader = !query.trim() && recentClients.length > 0
    const showAllHeader = query.trim() && filteredClients.length > 0

    // Reset selection when list changes
    useEffect(() => {
        setSelectedIndex(0)
    }, [query])

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setQuery("")
            setSelectedIndex(0)
            setTimeout(() => inputRef.current?.focus(), 50)
        }
    }, [isOpen])

    // Scroll selected item into view
    useEffect(() => {
        if (listRef.current) {
            const selected = listRef.current.querySelector("[data-selected=true]")
            selected?.scrollIntoView({ block: "nearest" })
        }
    }, [selectedIndex])

    const handleSelect = useCallback(
        (client: ClientRecord) => {
            setCurrentClient(client)
            router.push(`/clients/${client.id}`)
            onClose()
        },
        [router, onClose, setCurrentClient]
    )

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault()
                    setSelectedIndex((prev) =>
                        prev < displayClients.length - 1 ? prev + 1 : prev
                    )
                    break
                case "ArrowUp":
                    e.preventDefault()
                    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
                    break
                case "Enter":
                    e.preventDefault()
                    if (displayClients[selectedIndex]) {
                        handleSelect(displayClients[selectedIndex])
                    }
                    break
                case "Escape":
                    e.preventDefault()
                    onClose()
                    break
            }
        },
        [displayClients, selectedIndex, handleSelect, onClose]
    )

    // Close on outside click
    useEffect(() => {
        if (!isOpen) return
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (!target.closest("[data-client-switcher]")) {
                onClose()
            }
        }
        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [isOpen, onClose])

    // Global keyboard shortcut
    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose()
            }
        }
        document.addEventListener("keydown", handleGlobalKeyDown)
        return () => document.removeEventListener("keydown", handleGlobalKeyDown)
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-foreground/20 backdrop-blur-sm">
            <div
                data-client-switcher
                className="w-full max-w-lg bg-background border border-border rounded-xl shadow-2xl overflow-hidden"
                role="dialog"
                aria-modal="true"
                aria-label={t("switcher.title" as never)}
            >
                {/* Search header */}
                <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border">
                    <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={t("switcher.search" as never)}
                        className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                        autoComplete="off"
                        spellCheck={false}
                    />
                    <button
                        onClick={onClose}
                        className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-foreground"
                        aria-label="Close"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Results */}
                <div
                    ref={listRef}
                    className="max-h-[340px] overflow-y-auto py-1"
                    role="listbox"
                >
                    {showRecentHeader && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                            <Clock className="h-3 w-3" />
                            {t("switcher.recent" as never)}
                        </div>
                    )}
                    {showAllHeader && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                            <Building2 className="h-3 w-3" />
                            {t("switcher.all" as never)} ({filteredClients.length})
                        </div>
                    )}

                    {displayClients.length === 0 && query.trim() && (
                        <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                            {t("switcher.noResults" as never)}
                        </div>
                    )}

                    {displayClients.map((client, index) => {
                        const status = STATUS_CONFIG[client.status] ?? STATUS_CONFIG["active"]
                        const StatusIcon = status!.icon
                        const isSelected = index === selectedIndex

                        return (
                            <button
                                key={client.id}
                                data-selected={isSelected}
                                onClick={() => handleSelect(client)}
                                onMouseEnter={() => setSelectedIndex(index)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-2 text-start transition-colors",
                                    isSelected ? "bg-accent" : "hover:bg-accent/50"
                                )}
                                role="option"
                                aria-selected={isSelected}
                            >
                                {/* Avatar */}
                                <div className="flex h-9 w-9 items-center justify-center rounded bg-secondary text-foreground text-xs font-medium shrink-0">
                                    {client.name
                                        .split(" ")
                                        .slice(0, 2)
                                        .map((w) => w[0])
                                        .join("")}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium truncate">
                                            {client.name}
                                        </span>
                                        <span className="text-[11px] font-mono text-muted-foreground">
                                            {client.id}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                                        <span className="text-border">·</span>
                                        <span>MAD {(client.monthlyRevenueMad * 12).toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="flex items-center gap-2 shrink-0">
                                    <span
                                        className={cn(
                                            "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium",
                                            status!.bgColor,
                                            status!.color
                                        )}
                                    >
                                        <StatusIcon className="h-3 w-3" />
                                        {t(status!.key as never)}
                                    </span>
                                    <ChevronRight
                                        className={cn(
                                            "h-4 w-4 text-muted-foreground",
                                            isSelected ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </div>
                            </button>
                        )
                    })}
                </div>

                {/* Footer hints */}
                <div className="flex items-center gap-4 px-3 py-2 border-t border-border bg-muted/30 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <kbd className="px-1 py-0.5 rounded border border-border bg-background font-mono text-[10px]">
                            ↑↓
                        </kbd>
                        {t("switcher.toNavigate" as never)}
                    </span>
                    <span className="flex items-center gap-1">
                        <kbd className="px-1 py-0.5 rounded border border-border bg-background font-mono text-[10px]">
                            ↵
                        </kbd>
                        {t("switcher.toSelect" as never)}
                    </span>
                    <span className="flex items-center gap-1">
                        <kbd className="px-1 py-0.5 rounded border border-border bg-background font-mono text-[10px]">
                            esc
                        </kbd>
                        {t("switcher.toClose" as never)}
                    </span>
                </div>
            </div>
        </div>
    )
}
