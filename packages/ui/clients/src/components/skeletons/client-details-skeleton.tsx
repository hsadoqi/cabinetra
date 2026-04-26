export function ClientDetailsSkeleton() {
    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="border-b pb-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                        <div className="h-8 w-48 rounded bg-muted/50" />
                        <div className="flex gap-2">
                            <div className="h-6 w-20 rounded bg-muted/50" />
                            <div className="h-6 w-24 rounded bg-muted/50" />
                        </div>
                    </div>
                    <div className="h-8 w-32 rounded bg-muted/50" />
                </div>
            </div>

            {/* KPI Strip */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="rounded-lg border border-border/50 bg-card p-4">
                        <div className="h-3 w-16 rounded bg-muted/50" />
                        <div className="mt-3 h-6 w-20 rounded bg-muted/50" />
                    </div>
                ))}
            </div>

            {/* Tabs Section */}
            <div className="space-y-4">
                <div className="flex gap-4 border-b">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-10 w-20 rounded bg-muted/50" />
                    ))}
                </div>

                {/* Tab Content */}
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="rounded-lg border border-border/50 bg-card p-4">
                            <div className="h-4 w-32 rounded bg-muted/50" />
                            <div className="mt-3 space-y-3">
                                {[...Array(2)].map((_, j) => (
                                    <div key={j} className="h-3 w-full rounded bg-muted/50" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
