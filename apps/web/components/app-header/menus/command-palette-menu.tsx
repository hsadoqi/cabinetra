import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@cabinetra/ui-components"

import { Translator } from "@/components/app-header/app-header"
import { buildHeaderCommandGroups } from "@/lib/commands/registry"
import { useMemo } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@cabinetra/ui-components/hooks/use-toast"

interface CommandPaletteProps {
    open: boolean
    setOpen: (open: boolean) => void
    t: Translator
}

export function CommandPaletteMenu({ open, setOpen, t }: CommandPaletteProps) {
    const router = useRouter()
    const { error: toastError } = useToast()
    const commandGroups = useMemo(() => buildHeaderCommandGroups(t), [t])

    async function navigateTo(path: string) {
        try {
            setOpen(false)
            await router.push(path)
        } catch (error) {
            toastError(
                t("command.navigationFailed" as never),
                t("command.navigationFailedDescription" as never)
            )
            console.log("Navigation error:", error)
        }
    }

    return (
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
                {commandGroups.map((group) => (
                    <CommandGroup key={group.id} className="gap-1" heading={group.heading}>
                        {group.commands.map((command) => (
                            <CommandItem
                                key={command.id}
                                className="rounded-xl px-3 py-2.5"
                                onSelect={() => navigateTo(command.href)}
                            >
                                {command.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                ))}
            </CommandList>
        </CommandDialog>
    )
}
