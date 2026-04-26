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

export const localeMap = localeDefinitions.reduce((acc, localeDefinition) => {
    acc[localeDefinition.code] = localeDefinition
    return acc
}, {} as Record<Locale, LocaleDefinition>)

export const localeCodes = localeDefinitions.map((localeDefinition) => localeDefinition.code)

export function isLocale(value: string | undefined | null): value is Locale {
    return Boolean(value && localeCodes.includes(value as Locale))
}

export function getLocaleDefinition(locale: Locale) {
    return localeMap[locale]
}

export function getLocaleDirection(locale: Locale): Direction {
    return localeMap[locale].dir
}