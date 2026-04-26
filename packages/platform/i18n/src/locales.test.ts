import { describe, expect, it } from "vitest"
import { getLocaleDirection, isLocale, localeMap } from "./locales"

describe("locales", () => {
    it("validates supported locales", () => {
        expect(isLocale("fr")).toBe(true)
        expect(isLocale("en")).toBe(true)
        expect(isLocale("ar")).toBe(true)
        expect(isLocale("de")).toBe(false)
    })

    it("returns correct locale directions", () => {
        expect(getLocaleDirection("fr")).toBe("ltr")
        expect(getLocaleDirection("ar")).toBe("rtl")
    })

    it("builds locale map from definitions", () => {
        expect(localeMap.fr.native).toBe("Français")
        expect(localeMap.en.label).toBe("English")
        expect(localeMap.ar.dir).toBe("rtl")
    })
})