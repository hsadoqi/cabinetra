"use client"

import React from "react"
import { I18nProvider, type Locale } from "@cabinetra/platform-i18n"
import { SidebarProvider } from "@cabinetra/ui-components"
import { ThemeProvider, type Theme } from "@cabinetra/ui-components/theme"
import { CommandProvider, ToastProvider } from "@cabinetra/ui-components/providers"
import { TooltipProvider } from "@cabinetra/ui-components"

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
                    <TooltipProvider>
                        <SidebarProvider
                            className="flex flex-col"
                            style={{
                                maxHeight: "calc(100dvh - 64px)",
                            }}
                        >
                            <ToastProvider />
                            {children}
                        </SidebarProvider>
                    </TooltipProvider>
                </CommandProvider>
            </I18nProvider>
        </ThemeProvider>
    )
}