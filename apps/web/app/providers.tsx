"use client"

import React from "react"
import { I18nProvider, type Locale } from "@cabinetra/platform-i18n"
import { SidebarProvider } from "@cabinetra/ui-components"
import { ThemeProvider, type Theme } from "@cabinetra/ui-components/providers"

import { CommandProvider } from "@cabinetra/ui-components/providers"

export const Providers = ({
    children,
    initialTheme,
    initialLocale,
}: {
    children: React.ReactNode
    initialTheme: Theme
        initialLocale: Locale
}) => {
    return (
        <ThemeProvider initialTheme={initialTheme}>
            <I18nProvider initialLocale={initialLocale}>
                <CommandProvider>
                    <SidebarProvider
                        className="flex flex-col"
                        style={{
                            maxHeight: "calc(100dvh - 64px)",
                        }}
                    >
                        {children}
                    </SidebarProvider>
                </CommandProvider>
            </I18nProvider>
        </ThemeProvider>
    )
}