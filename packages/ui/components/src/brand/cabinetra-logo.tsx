import { LogoMark } from './logo-mark'
import React from 'react'

interface CabinetraLogoProps {
    size?: 'sm' | 'md' | 'lg' | 'xl'
    variant?: 'icon' | 'horizontal' | 'vertical' | 'text'
    theme?: 'light' | 'dark'
    className?: string
}

const sizeMap = {
    sm: { icon: 24, text: 14, gap: 2 },
    md: { icon: 32, text: 16, gap: 3 },
    lg: { icon: 48, text: 20, gap: 4 },
    xl: { icon: 64, text: 28, gap: 6 },
}

const textColor = {
    light: '#0f172a',
    dark: '#f1f5f9',
}

const accentColor = {
    light: '#2563eb',
    dark: '#93c5fd',
}

/**
 * Cabinetra Logo Component - Professional accounting software branding
 * Supports multiple variants and sizes for consistent branding across the app
 */
export function CabinetraLogo({
    size = 'md',
    variant = 'horizontal',
    theme = 'light',
    className = '',
}: CabinetraLogoProps) {
    const dims = sizeMap[size]
    const textColorValue = textColor[theme]
    const accentColorValue = accentColor[theme]

    if (variant === 'icon') {
        return <LogoMark size={dims.icon} theme={theme} className={className} />
    }

    if (variant === 'text') {
        return (
            <div className={`flex items-baseline gap-1 ${className}`}>
                <span
                    style={{
                        fontSize: `${dims.text}px`,
                        fontWeight: 700,
                        color: textColorValue,
                        letterSpacing: '-0.02em',
                    }}
                >
                    Cabinetra
                </span>
                <span
                    style={{
                        fontSize: `${dims.text * 0.65}px`,
                        fontWeight: 500,
                        color: accentColorValue,
                        opacity: 0.8,
                        lineHeight: 1,
                    }}
                >
                    Pro
                </span>
            </div>
        )
    }

    if (variant === 'vertical') {
        return (
            <div className={`flex flex-col items-center gap-${dims.gap === 2 ? '1' : dims.gap === 3 ? '2' : dims.gap === 4 ? '3' : '4'} ${className}`}>
                <LogoMark size={dims.icon} theme={theme} />
                <div className="text-center flex items-baseline gap-1">
                    <span
                        style={{
                            fontSize: `${dims.text}px`,
                            fontWeight: 700,
                            color: textColorValue,
                            letterSpacing: '-0.02em',
                        }}
                    >
                        Cabinetra
                    </span>
                    <span
                        style={{
                            fontSize: `${dims.text * 0.65}px`,
                            fontWeight: 500,
                            color: accentColorValue,
                            opacity: 0.8,
                            lineHeight: 1,
                        }}
                    >
                        Pro
                    </span>
                </div>
            </div>
        )
    }

    // Horizontal (default)
    return (
        <div className={`flex items-center gap-${dims.gap === 2 ? '1' : dims.gap === 3 ? '2' : dims.gap === 4 ? '3' : '4'} ${className}`}>
            <LogoMark size={dims.icon} theme={theme} />
            <div className="flex items-baseline gap-1">
                <span
                    style={{
                        fontSize: `${dims.text}px`,
                        fontWeight: 700,
                        color: textColorValue,
                        letterSpacing: '-0.02em',
                    }}
                >
                    Cabinetra
                </span>
                <span
                    style={{
                        fontSize: `${dims.text * 0.65}px`,
                        fontWeight: 500,
                        color: accentColorValue,
                        opacity: 0.8,
                        lineHeight: 1,
                    }}
                >
                    Pro
                </span>
            </div>
        </div>
    )
}
