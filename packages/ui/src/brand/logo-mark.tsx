import React from 'react'

interface LogoMarkProps {
    size?: number
    className?: string
    theme?: 'light' | 'dark'
}

/**
 * Cabinetra Logo Mark - Geometric accounting ledger icon
 * Represents interconnected ledger pages with accounting precision
 */
export function LogoMark({ size = 48, className = '', theme = 'light' }: LogoMarkProps) {
    const color = theme === 'dark' ? '#93c5fd' : '#2563eb'
    const accentColor = theme === 'dark' ? '#e2e8f0' : '#1e40af'

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Left ledger page */}
            <rect
                x="6"
                y="8"
                width="16"
                height="20"
                rx="2"
                stroke={color}
                strokeWidth="1.5"
                fill="none"
            />

            {/* Ledger lines - left page */}
            <line x1="8" y1="12" x2="20" y2="12" stroke={color} strokeWidth="1" opacity="0.5" />
            <line x1="8" y1="16" x2="20" y2="16" stroke={color} strokeWidth="1" opacity="0.5" />
            <line x1="8" y1="20" x2="20" y2="20" stroke={color} strokeWidth="1" opacity="0.5" />
            <line x1="8" y1="24" x2="20" y2="24" stroke={color} strokeWidth="1" opacity="0.5" />

            {/* Right ledger page (overlapping) */}
            <rect
                x="22"
                y="12"
                width="16"
                height="20"
                rx="2"
                stroke={accentColor}
                strokeWidth="1.5"
                fill="none"
            />

            {/* Ledger lines - right page */}
            <line x1="24" y1="16" x2="36" y2="16" stroke={accentColor} strokeWidth="1" opacity="0.5" />
            <line x1="24" y1="20" x2="36" y2="20" stroke={accentColor} strokeWidth="1" opacity="0.5" />
            <line x1="24" y1="24" x2="36" y2="24" stroke={accentColor} strokeWidth="1" opacity="0.5" />
            <line x1="24" y1="28" x2="36" y2="28" stroke={accentColor} strokeWidth="1" opacity="0.5" />

            {/* Balance scale icon */}
            <g transform="translate(24, 36)">
                {/* Scale center */}
                <circle cx="0" cy="0" r="1.5" fill={color} />

                {/* Left pan */}
                <rect x="-6" y="2" width="4" height="2" rx="0.5" fill={color} opacity="0.7" />
                <line x1="-6" y1="2" x2="-4" y2="-2" stroke={color} strokeWidth="1" />

                {/* Right pan */}
                <rect x="2" y="2" width="4" height="2" rx="0.5" fill={accentColor} opacity="0.7" />
                <line x1="6" y1="2" x2="4" y2="-2" stroke={accentColor} strokeWidth="1" />
            </g>
        </svg>
    )
}
