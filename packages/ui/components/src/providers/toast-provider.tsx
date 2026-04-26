'use client'

import React from 'react'
import { Toaster } from 'sonner'

export function ToastProvider() {
    return (
        <Toaster
            position="top-right"
            theme="system"
            richColors
            closeButton
            expand
            visibleToasts={5}
        />
    )
}
