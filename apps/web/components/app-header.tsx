"use client"

import * as React from "react"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@cabinetra/ui-components/primitives/command"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@cabinetra/ui-components/primitives/dropdown-menu"
import {
    Header,
    HeaderActions,
    HeaderContent,
    HeaderLogo,
    HeaderSearch,
} from "@cabinetra/ui-layouts/header"
import {
    Languages,
    LogOut,
    Monitor,
    Moon,
    Settings,
    Sun,
    User,
    UserCircle,
} from "lucide-react"
import { type Locale, localeMap, useI18n } from "@cabinetra/platform-i18n"
import { useCommand, useTheme } from "@cabinetra/ui-components/providers"

import { AppBrandLogo } from "./app-brand-logo"
import { Button } from "@cabinetra/ui-components/primitives"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Theme = "light" | "dark" | "system"

const localeLabels: Record<Locale, string> = {
    fr: "FR",
    en: "EN",
    ar: "AR",
}

interface AppHeaderProps {
    /** Current locale — passed in from layout/provider */
    locale?: Locale
    onLocaleChange?: (locale: Locale) => void
    /** Current theme — passed in from theme provider */
    theme?: Theme
    onThemeChange?: (theme: Theme) => void
    /** User info */
    user?: {
        name: string
        email: string
        initials: string
    }
    onLogout?: () => void
}

// ---------------------------------------------------------------------------
// AppHeader
// ---------------------------------------------------------------------------

export function AppHeader({
    user,
    onLogout,
}: AppHeaderProps) {
    const { open, setOpen, openCommand } = useCommand()
    const { theme, setTheme } = useTheme()
    const { locale, setLocale, t } = useI18n()

    return (
        <>
            <Header>
                <HeaderContent>
                    {/* Logo */}
                    <HeaderLogo>
                        <AppBrandLogo />
                    </HeaderLogo>
                    <HeaderSearch
                        placeholder={t("topbar.search.placeholder")}
                        shortcut="⌘K"
                        onClick={openCommand}
                    />

                    {/* Right-side actions */}
                    <HeaderActions>
                        {/* Language */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10"
                                    aria-label={t("common.language")}
                                >
                                    <Languages className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    {t("common.language")}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {Object.entries(localeLabels).map(([localeValue, language], idx) => (
                                    <DropdownMenuItem
                                        key={idx}
                                        className={localeValue === locale ? "font-medium" : undefined}
                                        onClick={() => setLocale(localeValue as Locale)}
                                    >
                                        {localeValue === locale ? "• " : ""}
                                        {language} · {localeMap[localeValue as Locale].native}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Theme */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10"
                                    aria-label={t("common.theme")}
                                >
                                    {theme === "dark" ? <Moon className="h-4 w-4" /> : theme === "light" ? <Sun className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    {t("common.theme")}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => setTheme("light")}>
                                    <Sun className="mr-2 h-4 w-4" />
                                    {t("common.light")}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("dark")}>
                                    <Moon className="mr-2 h-4 w-4" />
                                    {t("common.dark")}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("system")}>
                                    <Monitor className="mr-2 h-4 w-4" />
                                    {t("common.system")}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* User */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="gap-2 h-10"
                                    aria-label={t("common.account")}
                                >
                                    {user ? (
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                                            {user.initials}
                                        </span>
                                    ) : (
                                            <UserCircle className="h-4 w-4" />
                                    )}
                                    <span className="hidden text-sm font-medium text-foreground lg:inline-flex">
                                        {user?.name ?? t("common.account")}
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {user && (
                                    <>
                                        <DropdownMenuLabel className="px-3 py-2 font-normal">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-sm font-medium text-foreground">{user.name}</span>
                                                <span className="text-xs text-muted-foreground">{user.email}</span>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                    </>
                                )}
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    {t("common.profile")}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    {t("common.settings")}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={onLogout}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    {t("common.logout")}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </HeaderActions>
                </HeaderContent>
            </Header>

            {/* Command palette */}
            <CommandDialog
                className="overflow-hidden rounded-[1.75rem] border border-border/70 bg-background/95 shadow-2xl shadow-black/10 backdrop-blur supports-[backdrop-filter]:bg-background/88"
                open={open}
                onOpenChange={setOpen}
                title={t("command.title")}
                description={t("command.description")}
            >
                <CommandInput className="text-[15px]" placeholder={t("command.searchPlaceholder")} />
                <CommandList className="max-h-[360px] p-2">
                    <CommandEmpty>{t("command.empty")}</CommandEmpty>
                    <CommandGroup className="gap-1" heading={t("command.navigation")}>
                        <CommandItem className="rounded-xl px-3 py-2.5" onSelect={() => setOpen(false)}>
                            {t("nav.dashboard")}
                        </CommandItem>
                        <CommandItem className="rounded-xl px-3 py-2.5" onSelect={() => setOpen(false)}>
                            {t("nav.clients")}
                        </CommandItem>
                        <CommandItem className="rounded-xl px-3 py-2.5" onSelect={() => setOpen(false)}>
                            {t("nav.payroll")}
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}
