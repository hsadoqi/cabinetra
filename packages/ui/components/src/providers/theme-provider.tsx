'use client'

import * as React from 'react'

export type Theme = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

const THEME_COOKIE_NAME = 'theme'

interface ThemeContextValue {
    theme: Theme
    resolvedTheme: ResolvedTheme
    setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

function getSystemTheme(): ResolvedTheme {
    if (typeof window === 'undefined') {
        return 'light'
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function resolveTheme(theme: Theme): ResolvedTheme {
    return theme === 'system' ? getSystemTheme() : theme
}

function applyThemeToDocument(theme: Theme) {
    if (typeof document === 'undefined') {
        return
    }

    const root = document.documentElement
    const resolvedTheme = resolveTheme(theme)
    root.classList.toggle('dark', resolvedTheme === 'dark')
}

export function ThemeProvider({
    children,
    initialTheme = 'system',
}: {
    children: React.ReactNode
    initialTheme?: Theme
}) {
    const [theme, setThemeState] = React.useState<Theme>(initialTheme)

    React.useEffect(() => {
        applyThemeToDocument(theme)
    }, [theme])

    React.useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        const handleChange = () => {
            setThemeState((currentTheme) => {
                if (currentTheme === 'system') {
                    applyThemeToDocument('system')
                }

                return currentTheme
            })
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    const setTheme = React.useCallback((nextTheme: Theme) => {
        document.cookie = `${THEME_COOKIE_NAME}=${nextTheme}; Path=/; Max-Age=31536000; SameSite=Lax`
        setThemeState(nextTheme)
        applyThemeToDocument(nextTheme)
    }, [])

    const value = React.useMemo<ThemeContextValue>(
        () => ({
            theme,
            resolvedTheme: resolveTheme(theme),
            setTheme,
        }),
        [theme, setTheme]
    )

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
    const context = React.useContext(ThemeContext)

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }

    return context
}
