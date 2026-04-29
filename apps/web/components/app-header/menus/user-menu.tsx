"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@cabinetra/ui-components"
import { LogOut, Settings, User } from "lucide-react"

import { Translator } from "@/components/app-header/app-header"

export type User = {
    name: string
    email: string
    initials: string
    role?: string
}

interface UserMenuProps {
    user?: User
    onLogout?: () => void
    t: Translator
}

export function UserMenu({ user = {
    name: "John Doe",
    email: "john.doe@mail.com",
    initials: "JD",
    role: "Admin"
}, onLogout, t }: UserMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="flex items-center gap-2 p-2 ms-1 border-s border-border cursor-pointer hover:bg-muted transition-colors rounded-md py-1"
                    aria-label={t("common.account")}
                >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-foreground text-[11px] font-medium">
                        {user?.initials}
                    </div>
                    <div className="hidden md:flex flex-col items-start justify-center leading-tight">
                        <span className="text-[12px] font-medium">{user?.name}</span>
                        <span className="text-[11px] text-muted-foreground">{user?.role}</span>
                    </div>
                </button>
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
                <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {t("common.logout")}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
