import type { MessageKey, TranslationValues } from "@cabinetra/platform-i18n"

type Translator = (key: MessageKey, fallback?: string, values?: TranslationValues) => string

export interface HeaderCommand {
    id: string
    label: string
    href: string
}

export interface HeaderCommandGroup {
    id: string
    heading: string
    commands: HeaderCommand[]
}

export type HeaderCommandPlugin = (t: Translator) => HeaderCommandGroup[]

const commandPlugins = new Set<HeaderCommandPlugin>()

function getDefaultHeaderCommandGroups(t: Translator): HeaderCommandGroup[] {
    return [
        {
            id: "navigation",
            heading: t("command.navigation"),
            commands: [
                {
                    id: "dashboard",
                    label: t("nav.dashboard"),
                    href: "/",
                },
                {
                    id: "clients",
                    label: t("nav.clients"),
                    href: "/clients",
                },
                {
                    id: "payroll",
                    label: t("nav.payroll"),
                    href: "/payroll",
                },
            ],
        },
    ]
}

function mergeCommandGroups(commandGroups: HeaderCommandGroup[]): HeaderCommandGroup[] {
    const groupMap = new Map<string, HeaderCommandGroup>()

    for (const group of commandGroups) {
        const existing = groupMap.get(group.id)

        if (!existing) {
            groupMap.set(group.id, {
                ...group,
                commands: [...group.commands],
            })
            continue
        }

        const seenCommandIds = new Set(existing.commands.map((command) => command.id))
        const mergedCommands = [...existing.commands]

        for (const command of group.commands) {
            if (!seenCommandIds.has(command.id)) {
                mergedCommands.push(command)
                seenCommandIds.add(command.id)
            }
        }

        groupMap.set(group.id, {
            ...existing,
            heading: existing.heading || group.heading,
            commands: mergedCommands,
        })
    }

    return [...groupMap.values()]
}

export function registerHeaderCommandPlugin(plugin: HeaderCommandPlugin) {
    commandPlugins.add(plugin)

    return () => {
        commandPlugins.delete(plugin)
    }
}

export function buildHeaderCommandGroups(t: Translator): HeaderCommandGroup[] {
    const defaultGroups = getDefaultHeaderCommandGroups(t)
    const pluginGroups = [...commandPlugins].flatMap((plugin) => plugin(t))

    return mergeCommandGroups([...defaultGroups, ...pluginGroups])
}
