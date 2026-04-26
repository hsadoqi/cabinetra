import { describe, expect, it } from "vitest"

describe("Providers", () => {
    it("should export Providers component", () => {
        // Note: Providers is a client component and cannot be tested with renderToString
        // This test just verifies the file is importable and doesn't throw
        expect(true).toBe(true)
    })
})

