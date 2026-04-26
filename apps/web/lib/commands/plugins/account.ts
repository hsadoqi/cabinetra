import type { HeaderCommandPlugin } from "@/lib/commands/registry"

export const accountCommandPlugin: HeaderCommandPlugin = (t) => {
    return [
        {
            id: "account",
            heading: t("common.account"),
            commands: [
                {
                    id: "account-profile",
                    label: t("common.profile"),
                    href: "/profile",
                },
                {
                    id: "account-settings",
                    label: t("common.settings"),
                    href: "/settings",
                },
            ],
        },
    ]
}
