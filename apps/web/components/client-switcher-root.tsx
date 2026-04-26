"use client"

import { ClientSwitcher } from "@cabinetra/ui-clients"
import { useClientSwitcher } from "@/lib/client-switcher-context"
import { useEffect } from "react"

export function ClientSwitcherRoot() {
    const { isOpen, open, close } = useClientSwitcher()

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Cmd+Shift+P or Ctrl+Shift+P to open client switcher
            if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "p") {
                e.preventDefault()
                open()
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [open])

    return <ClientSwitcher isOpen={isOpen} onClose={close} />
}
