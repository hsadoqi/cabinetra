import { describe, expect, it } from "vitest"

import { translate } from "./translate"

describe("translate", () => {
    it("returns localized message when key exists", () => {
        expect(translate("fr", "common.language")).toBe("Langue")
        expect(translate("en", "common.language")).toBe("Language")
    })

    it("uses fallback text for missing locale key lookup path", () => {
        expect(translate("fr", "nav.dashboard", "Dashboard")).toBe("Tableau de bord")
    })

    it("applies placeholder interpolation values", () => {
        const value = translate("en", "command.description", undefined, {
            action: "search",
        })

        expect(value).toBe("Search or run a command")
    })
})