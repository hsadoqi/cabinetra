'use client'

import { CabinetraLogo } from './cabinetra-logo'
import { LogoMark } from './logo-mark'

interface LogoProps {
    variant?: 'horizontal' | 'vertical' | 'icon' | 'text'
    size?: 'sm' | 'md' | 'lg' | 'xl'
    theme?: 'light' | 'dark'
    href?: string
    className?: string
}

/**
 * Logo component - Displays Cabinetra branding in various formats
 * Uses SVG-based designs for perfect consistency across light/dark themes
 */
export function Logo({
    variant = 'horizontal',
    size = 'md',
    theme = 'light',
    href = '/',
    className = ''
}: LogoProps) {
    const logo = (
        <CabinetraLogo
            variant={variant}
            size={size}
            theme={theme}
            className={className}
        />
    )

    if (href) {
        return <a href={href}>{logo}</a>
    }

    return logo
}

/**
 * Icon-only logo - Minimal, professional accounting ledger mark
 */
export function LogoIcon({
    size = 'md',
    theme = 'light',
    className = '',
}: Omit<LogoProps, 'variant' | 'href'>) {
    const sizeMap = { sm: 24, md: 32, lg: 48, xl: 64 }
    return <LogoMark size={sizeMap[size]} theme={theme} className={className} />
}

/**
 * Full logo with text - For headers and branding
 */
export function LogoWithText({
    size = 'md',
    theme = 'light',
    href = '/',
    className = '',
}: Omit<LogoProps, 'variant'>) {
    const logo = (
        <CabinetraLogo
            variant="horizontal"
            size={size}
            theme={theme}
            className={className}
        />
    )

    if (href) {
        return <a href={href}>{logo}</a>
    }

    return logo
}

