"use client"

import { useEffect, useState } from "react"

/**
 * Custom hook for debouncing a value.
 * Returns the debounced value after a specified delay.
 *
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds (default: 300ms)
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        // Set up a timer to update the debounced value
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        // Clean up the timer if the value changes before the delay completes
        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue
}
