import { describe, expect, it } from "vitest"

import { accountCommandPlugin } from "./account"

describe("accountCommandPlugin", () => {
    it("builds the expected account command group", () => {
        const t = (key: string) => `t:${key}`

        const groups = accountCommandPlugin(t)

        expect(groups).toHaveLength(1)
        expect(groups[0]?.id).toBe("account")
        expect(groups[0]?.heading).toBe("t:common.account")
        expect(groups[0]?.commands).toHaveLength(2)

        expect(groups[0]?.commands[0]).toEqual({
            id: "account-profile",
            label: "t:common.profile",
            href: "/profile",
        })

        expect(groups[0]?.commands[1]).toEqual({
            id: "account-settings",
            label: "t:common.settings",
            href: "/settings",
        })
    })
})
