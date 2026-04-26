"use client"

import * as React from "react"
import {
    Header,
    HeaderActions,
    HeaderContent,
    HeaderLogo,
    HeaderSearch,
} from "@cabinetra/ui-layouts/header"
import { useI18n } from "@cabinetra/platform-i18n"
import { useCommand, useTheme } from "@cabinetra/ui-components/providers"
import { registerHeaderCommandPlugin } from "@/lib/commands/registry"

import { AppBrandLogo } from "./app-brand-logo"
import { accountCommandPlugin } from "@/lib/commands/plugins/account"
import { UserMenu, type User } from './menus/user-menu';
import { LanguageMenu } from "./menus/language-menu"
import { ThemeMenu } from "./menus/theme-menu"
import { CommandPaletteMenu } from "./menus/command-palette-menu"

interface AppHeaderProps {
    user?: User;
    onLogout?: () => void
}

export type Translator = ReturnType<typeof useI18n>["t"]
export type Theme = ReturnType<typeof useTheme>["theme"]

export function AppHeader({
    user,
    onLogout,
}: AppHeaderProps) {
    const { open, setOpen, openCommand } = useCommand()
    const { theme, setTheme } = useTheme()
    const { locale, setLocale, t } = useI18n()

    React.useEffect(() => {
        const unregister = registerHeaderCommandPlugin(accountCommandPlugin)

        return () => unregister()
    }, [])

    return (
        <>
            <Header>
                <HeaderContent>
                    <HeaderLogo>
                        <AppBrandLogo />
                    </HeaderLogo>
                    <HeaderSearch
                        placeholder={t("topbar.search.placeholder")}
                        shortcut="⌘K"
                        expanded={open}
                        onClick={openCommand}
                    />

                    <HeaderActions>
                        <LanguageMenu locale={locale} setLocale={setLocale} t={t} />
                        <ThemeMenu theme={theme} setTheme={setTheme} t={t} />
                        <UserMenu user={user} onLogout={onLogout} t={t} />
                    </HeaderActions>
                </HeaderContent>
            </Header>

            <CommandPaletteMenu open={open} setOpen={setOpen} t={t} />
        </>
    )
}
