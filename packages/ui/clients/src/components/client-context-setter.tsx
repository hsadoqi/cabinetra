"use client"

import type { ClientRecord } from "@cabinetra/domain-clients"
import { useClientContext } from "../contexts"
import { useEffect } from "react"

/**
 * ClientContextSetter
 *
 * A utility component that synchronizes a client record with the ClientContext.
 *
 * WHY THIS COMPONENT EXISTS:
 * ===========================
 * ClientDetailsPanel and similar feature components receive a client as a prop,
 * but other child components throughout the tree may need access to that client
 * via the ClientContext. This component bridges that gap by ensuring the context
 * is always in sync with the current client being displayed.
 *
 * This approach is necessary because:
 * 1. The UI layer (@cabinetra/ui-clients) is reusable across multiple apps
 * 2. Child components may not know they need the context until runtime
 * 3. It enables decoupling: child components use context, parent passes data as prop
 * 4. Context is automatically cleared/updated when the client changes
 *
 * IMPLEMENTATION DETAIL:
 * =====================
 * This component intentionally:
 * - Returns null (it's purely a side effect)
 * - Uses useEffect to sync context on mount and when client changes
 * - Should be placed at the top of the component tree that needs context access
 *
 * USAGE:
 * ======
 * Place this component early in your tree, typically in orchestration components:
 *
 * ```tsx
 * export function ClientDetailsPanel({ client }: { client: ClientRecord }) {
 *     return (
 *         <>
 *             <ClientContextSetter client={client} />
 *             <ClientHeader client={client} />
 *             <ClientContent client={client} />
 *         </>
 *     )
 * }
 * ```
 *
 * Now any child component can use the context:
 * ```tsx
 * function SomeChildComponent() {
 *     const { currentClient } = useClientContext()
 *     return <div>{currentClient?.name}</div>
 * }
 * ```
 *
 * @param client - The client record to sync with context
 * @returns null - This component has no visual output
 */
export function ClientContextSetter({ client }: { client: ClientRecord }) {
    const { setCurrentClient } = useClientContext()

    useEffect(() => {
        setCurrentClient(client)
    }, [client, setCurrentClient])

    return null
}
