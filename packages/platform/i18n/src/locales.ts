export type Locale = "fr" | "en" | "ar"
export type Direction = "ltr" | "rtl"

export const LOCALE_COOKIE_NAME = "locale"
export const DEFAULT_LOCALE: Locale = "fr"

export interface LocaleDefinition {
    code: Locale
    label: string
    native: string
    dir: Direction
}

export const localeDefinitions: LocaleDefinition[] = [
    { code: "fr", label: "French", native: "Français", dir: "ltr" },
    { code: "en", label: "English", native: "English", dir: "ltr" },
    { code: "ar", label: "Arabic", native: "العربية", dir: "rtl" },
]

export const localeMap: Record<Locale, LocaleDefinition> = {
    fr: { code: "fr", label: "French", native: "Français", dir: "ltr" },
    en: { code: "en", label: "English", native: "English", dir: "ltr" },
    ar: { code: "ar", label: "Arabic", native: "العربية", dir: "rtl" },
}

export function isLocale(value: string | undefined | null): value is Locale {
    return value === "fr" || value === "en" || value === "ar"
}

export function getLocaleDefinition(locale: Locale) {
    return localeMap[locale]
}

export function getLocaleDirection(locale: Locale): Direction {
    return localeMap[locale].dir
}