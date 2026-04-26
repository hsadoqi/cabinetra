"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@cabinetra/ui/primitives/command"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@cabinetra/ui/primitives/dropdown-menu"
import {
    Header,
    HeaderActions,
    HeaderContent,
    HeaderLogo,
    HeaderSearch,
} from "@cabinetra/layouts/header"
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

import { AppBrandLogo } from "./app-brand-logo"
import { Button } from "@cabinetra/ui/primitives/button"
import { useCommand } from "@cabinetra/ui/providers"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Theme = "light" | "dark" | "system"
type Locale = "fr" | "en" | "ar"

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
    locale = "fr",
    onLocaleChange,
    user,
    onLogout,
}: AppHeaderProps) {
    const { open, setOpen, openCommand } = useCommand()
    const { theme, setTheme } = useTheme()

    return (
        <>
            <Header>
                <HeaderContent>
                    {/* Logo */}
                    <HeaderLogo>
                        <AppBrandLogo />
                    </HeaderLogo>
                    <HeaderSearch
                        placeholder="Search clients, payroll, reports..."
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
                                    aria-label="Change language"
                                >
                                    <Languages className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    Language
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {Object.entries(localeLabels).map(([localeValue, language], idx) => (
                                    <DropdownMenuItem
                                        key={idx}
                                        onClick={() => onLocaleChange?.(localeValue as Locale)}
                                    >
                                        {language}
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
                                    aria-label="Change theme"
                                >
                                    {theme === "dark" ? <Moon className="h-4 w-4" /> : theme === "light" ? <Sun className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    Theme
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => setTheme("light")}>
                                    <Sun className="mr-2 h-4 w-4" />
                                    Light
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("dark")}>
                                    <Moon className="mr-2 h-4 w-4" />
                                    Dark
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("system")}>
                                    <Monitor className="mr-2 h-4 w-4" />
                                    System
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* User */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="gap-2 h-10"
                                    aria-label="User menu"
                                >
                                    {user ? (
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                                            {user.initials}
                                        </span>
                                    ) : (
                                        <UserCircle className="h-4 w-4" />
                                    )}
                                    <span className="hidden text-sm font-medium text-foreground lg:inline-flex">
                                        {user?.name ?? "Account"}
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
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={onLogout}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
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
                title="Command Palette"
                description="Search or run a command"
            >
                <CommandInput className="text-[15px]" placeholder="Type a command or search…" />
                <CommandList className="max-h-[360px] p-2">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup className="gap-1" heading="Navigation">
                        <CommandItem className="rounded-xl px-3 py-2.5" onSelect={() => setOpen(false)}>
                            Dashboard
                        </CommandItem>
                        <CommandItem className="rounded-xl px-3 py-2.5" onSelect={() => setOpen(false)}>
                            Clients
                        </CommandItem>
                        <CommandItem className="rounded-xl px-3 py-2.5" onSelect={() => setOpen(false)}>
                            Payroll
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}
