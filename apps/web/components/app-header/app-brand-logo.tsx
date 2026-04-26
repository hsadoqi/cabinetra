"use client";

import Link from "next/link"

export const AppBrandLogo = () => {
    return (
        <Link href="/" className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-primary text-primary-foreground">
                <span className="text-[10px] font-bold tracking-tight">CP</span>
            </div>
            <div className="hidden min-w-0 flex-col leading-tight sm:flex">
                <span className="truncate text-[12px] font-semibold text-foreground">Cabinetra</span>
            </div>
        </Link>
    )
}