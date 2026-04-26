import { describe, expect, it } from "vitest"

import { getThemeBootstrapScript } from "./theme-bootstrap"

describe("getThemeBootstrapScript", () => {
    it("returns script with no locale config by default", () => {
        const script = getThemeBootstrapScript()

        expect(script).toContain("const localeConfig = null;")
        expect(script).toContain("cookieTheme")
        expect(script).toContain("root.classList.toggle")
    })

    it("embeds locale config when all locale options are provided", () => {
        const script = getThemeBootstrapScript({
            localeCookieName: "locale",
            defaultLocale: "fr",
            locales: ["fr", "en", "ar"],
        })

        expect(script).toContain('"localeCookieName":"locale"')
        expect(script).toContain('"defaultLocale":"fr"')
        expect(script).toContain('"locales":["fr","en","ar"]')
        expect(script).toContain('root.dir = locale === "ar" ? "rtl" : "ltr";')
    })
})