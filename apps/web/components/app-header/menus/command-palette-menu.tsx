import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@cabinetra/ui-components"

import { Translator } from "@/components/app-header/app-header"

interface CommandPaletteProps {
    open: boolean
    setOpen: (open: boolean) => void
    t: Translator
}

export function CommandPaletteMenu({ open, setOpen, t }: CommandPaletteProps) {
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
    )
}
