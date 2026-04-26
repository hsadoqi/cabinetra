"use client"

import { I18nProvider, type Locale } from "@cabinetra/platform-i18n"
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
                <CommandProvider>{children}</CommandProvider>
            </I18nProvider>
        </ThemeProvider>
    )
}