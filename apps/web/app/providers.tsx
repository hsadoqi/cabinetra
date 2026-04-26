"use client"

import React from "react"
import { I18nProvider, type Locale } from "@cabinetra/platform-i18n"
import { SidebarProvider } from "@cabinetra/ui-components"
import { ThemeProvider, type Theme, CommandProvider, ToastProvider } from "@cabinetra/ui-components/providers"
import { TooltipProvider } from "@cabinetra/ui-components/primitives"
import { ClientProvider } from "@cabinetra/ui-clients"
import { ClientSwitcherModalProvider } from "@/lib/client-switcher-context"

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
                <ClientSwitcherModalProvider>
                    <CommandProvider>
                        <TooltipProvider>
                            <SidebarProvider
                                className="flex flex-col"
                                style={{
                                    maxHeight: "calc(100dvh - 64px)",
                                }}
                            >
                                <ClientProvider>
                                    <ToastProvider />
                                    {children}
                                </ClientProvider>
                            </SidebarProvider>
                        </TooltipProvider>
                    </CommandProvider>
                </ClientSwitcherModalProvider>
            </I18nProvider>
        </ThemeProvider>
    )
}