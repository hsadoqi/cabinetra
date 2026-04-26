import { describe, expect, it } from "vitest"

import { Providers } from "./providers"
import React from "react"
import { renderToString } from "react-dom/server"

describe("Providers", () => {
    it("renders children within app providers", () => {
        const html = renderToString(
            <Providers initialTheme="system" initialLocale="fr">
                <div data-testid="child">providers-child</div>
            </Providers>
        )

        expect(html).toContain("providers-child")
    })

    it("supports explicit locale and theme inputs", () => {
        const html = renderToString(
            <Providers initialTheme="dark" initialLocale="en">
                <p>localized-content</p>
            </Providers>
        )

        expect(html).toContain("localized-content")
    })
})
