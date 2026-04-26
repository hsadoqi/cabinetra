"use client"

import { ThemeProvider, type Theme } from "@cabinetra/ui-components/providers"

import { CommandProvider } from "@cabinetra/ui-components/providers"

export const Providers = ({
    children,
    initialTheme
}: {
    children: React.ReactNode
    initialTheme: Theme
}) => {
    return (
        <ThemeProvider initialTheme={initialTheme}>
            <CommandProvider>{children}</CommandProvider>
        </ThemeProvider>
    )
}