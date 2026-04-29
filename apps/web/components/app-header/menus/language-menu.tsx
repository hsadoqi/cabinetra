"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@cabinetra/ui-components"
import { Locale } from "@cabinetra/platform-i18n"

import { ChevronDown, Check } from "lucide-react"
import { Translator } from "@/components/app-header/app-header"

interface LanguageMenuProps {
    locale: Locale
    setLocale: (locale: Locale) => void
    t: Translator
}

type LocaleData = {
    initials: string;
    native: string;
    icon: React.ReactNode;
}

const localeData: Record<Locale, LocaleData> = {
    en: {
        initials: "EN",
        native: "English",
        icon: "🇬🇧"
    },
    fr: {
        initials: "FR",
        native: "Français",
        icon: "🇫🇷"
    },
    ar: {
        initials: "AR",
        native: "العربية",
        icon: "🇸🇦"
    }
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
                <button
                    className="inline-flex items-center gap-1.5 h-9 px-2.5 rounded-md border border-border bg-background text-[13px] hover:bg-muted transition-colors"
                    aria-label={t("common.language")}
                >
                    <span className="text-lg mr-1.5">
                        {localeData[locale].icon}
                    </span>
                    <span className="font-mono text-[11.5px] font-medium tracking-wide">{localeLabels[locale]}</span>
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[200px]">
                <div className="px-2.5 py-1.5 border-b border-border">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        {t("common.language")}
                    </p>
                </div>
                <ul className="py-0.5">
                    {Object.entries(localeData).map(([localeValue, data]) => {
                        const active = localeValue === locale
                        return (
                            <li key={localeValue}>
                                <DropdownMenuItem
                                    className={active ? "bg-accent/60" : ""}
                                    onClick={() => setLocale(localeValue as Locale)}
                                >
                                    <span className="text-lg mr-1.5">
                                        {data.icon}
                                    </span>
                                    <span className="flex-1 text-foreground">{data.native}</span>
                                    {active && <Check className="h-3.5 w-3.5 text-foreground" />}
                                </DropdownMenuItem>
                            </li>
                        )
                    })}
                </ul>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}