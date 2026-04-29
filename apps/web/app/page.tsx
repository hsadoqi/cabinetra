"use client"

import { useI18n } from "@cabinetra/platform-i18n"

export default function Home() {
  const { t } = useI18n()

  return (
    <section className="space-y-6 pb-10">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{t("dashboard.title" as never)}</h1>
        <p className="text-sm text-muted-foreground">
          {t("dashboard.subtitle" as never)}
        </p>
      </div>
    </section>
  )
}
