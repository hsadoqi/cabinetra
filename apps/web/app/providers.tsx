"use client"

import { CommandProvider, ThemeProvider } from "@cabinetra/ui/providers"

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider>
            <CommandProvider>{children}</CommandProvider>
        </ThemeProvider>
    )
}