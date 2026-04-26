"use client"

import * as React from "react"

import {
    DEFAULT_LOCALE,
    getLocaleDefinition,
    getLocaleDirection,
    LOCALE_COOKIE_NAME,
    type Direction,
    type Locale,
} from "./locales"
import { getDictionary, translate } from "./translate"
import type { MessageDictionary, MessageKey } from "./messages"
import type { TranslationValues } from "./translate"

interface I18nContextValue {
    locale: Locale
    direction: Direction
    messages: MessageDictionary
    setLocale: (locale: Locale) => void
    t: (key: MessageKey, fallback?: string, values?: TranslationValues) => string
}

const I18nContext = React.createContext<I18nContextValue | null>(null)

function applyLocaleToDocument(locale: Locale) {
    if (typeof document === "undefined") {
        return
    }

    const root = document.documentElement
    root.lang = locale
    root.dir = getLocaleDirection(locale)
}

export function I18nProvider({
    children,
    initialLocale = DEFAULT_LOCALE,
}: {
    children: React.ReactNode
    initialLocale?: Locale
}) {
    const [locale, setLocaleState] = React.useState<Locale>(initialLocale)

    React.useEffect(() => {
        applyLocaleToDocument(locale)
    }, [locale])

    const setLocale = React.useCallback((nextLocale: Locale) => {
        document.cookie = `${LOCALE_COOKIE_NAME}=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`
        setLocaleState(nextLocale)
        applyLocaleToDocument(nextLocale)
    }, [])

    const value = React.useMemo<I18nContextValue>(
        () => ({
            locale,
            direction: getLocaleDefinition(locale).dir,
            messages: getDictionary(locale),
            setLocale,
            t: (key: MessageKey, fallback?: string, values?: TranslationValues) =>
                translate(locale, key, fallback, values),
        }),
        [locale, setLocale]
    )

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export const LocaleProvider = I18nProvider

export function useI18n() {
    const context = React.useContext(I18nContext)

    if (!context) {
        throw new Error("useI18n must be used within an I18nProvider")
    }

    return context
}

export function useLocale() {
    const { locale, setLocale, direction } = useI18n()

    return { locale, setLocale, direction }
}