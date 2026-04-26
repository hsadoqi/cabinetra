import { DEFAULT_LOCALE, type Locale } from "./locales"
import { messages, type MessageDictionary, type MessageKey } from "./messages"

export type TranslationValues = Record<string, string | number>

export function getDictionary(locale: Locale): MessageDictionary {
    return messages[locale]
}

export function translate(
    locale: Locale,
    key: MessageKey,
    fallback?: string,
    values?: TranslationValues
): string {
    const message = String(messages[locale][key] ?? fallback ?? messages[DEFAULT_LOCALE][key] ?? key)

    if (!values) {
        return message
    }

    let formattedMessage = message

    for (const [placeholder, value] of Object.entries(values)) {
        formattedMessage = formattedMessage.replaceAll(`{${placeholder}}`, String(value))
    }

    return formattedMessage
}