"use client";

import Link from "next/link"
import { LogoIcon } from "@cabinetra/ui-components/brand"

export const AppBrandLogo = () => {
    return (
        <Link href="/" className="flex items-center gap-2.5 min-w-0">
            <LogoIcon size="sm" />
            <div className="hidden min-w-0 flex-col leading-tight sm:flex">
                <span className="truncate text-[12px] font-semibold text-foreground">Cabinetra</span>
            </div>
        </Link>
    )
}