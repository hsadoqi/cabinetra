"use client"

import * as React from "react"

interface CommandContextValue {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    openCommand: () => void
    closeCommand: () => void
    toggleCommand: () => void
}

const CommandContext = React.createContext<CommandContextValue | null>(null)

export function CommandProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [open, setOpen] = React.useState(false)

    const openCommand = React.useCallback(() => setOpen(true), [])
    const closeCommand = React.useCallback(() => setOpen(false), [])
    const toggleCommand = React.useCallback(() => setOpen((prev) => !prev), [])

    React.useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault()
                toggleCommand()
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [toggleCommand])

    const value = React.useMemo(
        () => ({ open, setOpen, openCommand, closeCommand, toggleCommand }),
        [open, openCommand, closeCommand, toggleCommand]
    )

    return <CommandContext.Provider value={value}>{children}</CommandContext.Provider>
}

export function useCommand() {
    const context = React.useContext(CommandContext)

    if (!context) {
        throw new Error("useCommand must be used within a CommandProvider")
    }

    return context
}