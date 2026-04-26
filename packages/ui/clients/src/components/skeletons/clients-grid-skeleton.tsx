export function ClientsGridSkeleton() {
    return (
        <div className="space-y-4">
            {/* Search & Filters Skeleton */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="relative max-w-xl flex-1">
                    <div className="h-10 w-full rounded-lg border border-border/50 bg-muted/50" />
                </div>
                <div className="flex gap-2">
                    <div className="h-10 w-32 rounded-lg border border-border/50 bg-muted/50" />
                    <div className="h-10 w-40 rounded-lg border border-border/50 bg-muted/50" />
                </div>
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="rounded-lg border border-border/50 bg-card p-3">
                        <div className="h-4 w-16 rounded bg-muted/50" />
                        <div className="mt-2 h-6 w-12 rounded bg-muted/50" />
                    </div>
                ))}
            </div>

            {/* Clients Grid Skeleton */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="rounded-2xl border border-border/50 bg-card p-4 shadow-sm"
                    >
                        {/* Header with title and status */}
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1 space-y-2">
                                <div className="h-4 w-32 rounded bg-muted/50" />
                                <div className="h-3 w-24 rounded bg-muted/50" />
                            </div>
                            <div className="h-6 w-20 rounded-full bg-muted/50" />
                        </div>

                        {/* Details */}
                        <div className="mt-3 space-y-3">
                            <div className="flex justify-between gap-3">
                                <div className="h-3 w-16 rounded bg-muted/50" />
                                <div className="h-3 w-24 rounded bg-muted/50" />
                            </div>
                            <div className="flex justify-between gap-3">
                                <div className="h-3 w-16 rounded bg-muted/50" />
                                <div className="h-3 w-24 rounded bg-muted/50" />
                            </div>
                            <div className="flex justify-between gap-3">
                                <div className="h-3 w-16 rounded bg-muted/50" />
                                <div className="h-3 w-24 rounded bg-muted/50" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
