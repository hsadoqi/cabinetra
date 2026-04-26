import { describe, expect, it } from "vitest"

import {
    buildHeaderCommandGroups,
    registerHeaderCommandPlugin,
    type HeaderCommandPlugin,
} from "./registry"

const t = (key: string) => key

describe("header command registry", () => {
    it("includes default command group", () => {
        const groups = buildHeaderCommandGroups(t)
        const navigation = groups.find((group) => group.id === "navigation")

        expect(navigation).toBeDefined()
        expect(navigation?.commands.some((command) => command.id === "dashboard")).toBe(true)
        expect(navigation?.commands.some((command) => command.id === "clients")).toBe(true)
        expect(navigation?.commands.some((command) => command.id === "payroll")).toBe(true)
    })

    it("registers and unregisters plugin command groups", () => {
        const plugin: HeaderCommandPlugin = () => [
            {
                id: "test-group",
                heading: "test-heading",
                commands: [
                    {
                        id: "test-command",
                        label: "Test",
                        href: "/test",
                    },
                ],
            },
        ]

        const unregister = registerHeaderCommandPlugin(plugin)

        const withPlugin = buildHeaderCommandGroups(t)
        expect(withPlugin.some((group) => group.id === "test-group")).toBe(true)

        unregister()

        const withoutPlugin = buildHeaderCommandGroups(t)
        expect(withoutPlugin.some((group) => group.id === "test-group")).toBe(false)
    })

    it("merges commands from multiple plugins into the same group", () => {
        const plugin1: HeaderCommandPlugin = () => [
            {
                id: "shared",
                heading: "Shared Group",
                commands: [
                    {
                        id: "cmd1",
                        label: "Command 1",
                        href: "/cmd1",
                    },
                ],
            },
        ]

        const plugin2: HeaderCommandPlugin = () => [
            {
                id: "shared",
                heading: "Shared Group",
                commands: [
                    {
                        id: "cmd2",
                        label: "Command 2",
                        href: "/cmd2",
                    },
                ],
            },
        ]

        const unregister1 = registerHeaderCommandPlugin(plugin1)
        const unregister2 = registerHeaderCommandPlugin(plugin2)

        const groups = buildHeaderCommandGroups(t)
        const shared = groups.find((group) => group.id === "shared")

        expect(shared?.commands.length).toBe(2)
        expect(shared?.commands.some((cmd) => cmd.id === "cmd1")).toBe(true)
        expect(shared?.commands.some((cmd) => cmd.id === "cmd2")).toBe(true)

        unregister1()
        unregister2()
    })

    it("deduplicates commands with the same id", () => {
        const plugin1: HeaderCommandPlugin = () => [
            {
                id: "dedup",
                heading: "Dedup Group",
                commands: [
                    {
                        id: "dup-cmd",
                        label: "Duplicate",
                        href: "/dup",
                    },
                ],
            },
        ]

        const plugin2: HeaderCommandPlugin = () => [
            {
                id: "dedup",
                heading: "Dedup Group",
                commands: [
                    {
                        id: "dup-cmd",
                        label: "Duplicate",
                        href: "/dup",
                    },
                    {
                        id: "unique-cmd",
                        label: "Unique",
                        href: "/unique",
                    },
                ],
            },
        ]

        const unregister1 = registerHeaderCommandPlugin(plugin1)
        const unregister2 = registerHeaderCommandPlugin(plugin2)

        const groups = buildHeaderCommandGroups(t)
        const dedup = groups.find((group) => group.id === "dedup")

        expect(dedup?.commands.length).toBe(2)
        expect(dedup?.commands.filter((cmd) => cmd.id === "dup-cmd").length).toBe(1)

        unregister1()
        unregister2()
    })
})
