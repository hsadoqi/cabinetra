import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@cabinetra/ui-components"
import { LogOut, Settings, User, UserCircle } from "lucide-react"

import { Translator } from "@/components/app-header/app-header"

export type User = {
    name: string
    email: string
    initials: string
}

interface UserMenuProps {
    user?: User
    onLogout?: () => void
    t: Translator
}

export function UserMenu({ user, onLogout, t }: UserMenuProps) {
    return (
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
                <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {t("common.logout")}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
