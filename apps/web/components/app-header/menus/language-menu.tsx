import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@cabinetra/ui-components"
import { Locale, localeMap } from "@cabinetra/platform-i18n"

import { Languages } from "lucide-react"
import { Translator } from "@/components/app-header/app-header"

interface LanguageMenuProps {
    locale: Locale
    setLocale: (locale: Locale) => void
    t: Translator
}

const localeLabels: Record<Locale, string> = {
    fr: "FR",
    en: "EN",
    ar: "AR",
}


export function LanguageMenu({ locale, setLocale, t }: LanguageMenuProps) {
    return (
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
                <DropdownMenuLabel>{t("common.language")}</DropdownMenuLabel>
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
    )
}