"use client"

import { Archive, Download, Edit, Trash2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@cabinetra/ui-components"
import { useCallback, useState } from "react"

import { useClientMutations } from "../hooks/use-client-mutations"
import { useI18n } from "@cabinetra/platform-i18n"

interface ClientActionsProps {
    clientId: string
    clientName: string
}

export function ClientActions({ clientId, clientName }: ClientActionsProps) {
    const { t } = useI18n()
    const { delete: deleteOp, archive: archiveOp, export: exportOp } = useClientMutations()
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [showArchiveConfirm, setShowArchiveConfirm] = useState(false)

    const handleDelete = useCallback(async () => {
        await deleteOp.action(clientId)
        setShowDeleteConfirm(false)
    }, [clientId, deleteOp])

    const handleArchive = useCallback(async () => {
        await archiveOp.action(clientId)
        setShowArchiveConfirm(false)
    }, [clientId, archiveOp])

    const handleExport = useCallback(async () => {
        await exportOp.action(clientId)
    }, [clientId, exportOp])

    const handleEdit = useCallback(() => {
        // TODO: Implement edit modal/form
        console.log("Edit client:", clientId)
    }, [clientId])

    return (
        <div className="flex flex-wrap gap-2">
            {/* Edit Button */}
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={handleEdit}
                        className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-card px-3 py-2 text-sm font-medium text-foreground transition hover:border-primary/50 hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Edit className="h-4 w-4" />
                        {t("clients.actions.edit" as never)}
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    {t("clients.actions.editTooltip" as never, undefined, { client: clientName })}
                </TooltipContent>
            </Tooltip>

            {/* Export Button */}
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={handleExport}
                        disabled={exportOp.state.isLoading}
                        className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-card px-3 py-2 text-sm font-medium text-foreground transition hover:border-primary/50 hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Download className="h-4 w-4" />
                        {exportOp.state.isLoading ? t("common.exporting" as never) : t("clients.actions.export" as never)}
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    {exportOp.state.error
                        ? exportOp.state.error
                        : t("clients.actions.exportTooltip" as never, undefined, { client: clientName })}
                </TooltipContent>
            </Tooltip>

            {/* Archive Button */}
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={() => setShowArchiveConfirm(true)}
                        disabled={archiveOp.state.isLoading || showDeleteConfirm}
                        className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-card px-3 py-2 text-sm font-medium text-foreground transition hover:border-amber-500/50 hover:bg-amber-50/5 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-amber-950/10"
                    >
                        <Archive className="h-4 w-4" />
                        {archiveOp.state.isLoading ? t("common.archiving" as never) : t("clients.actions.archive" as never)}
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    {showArchiveConfirm
                        ? t("clients.actions.archiveConfirm" as never)
                        : archiveOp.state.error
                            ? archiveOp.state.error
                            : t("clients.actions.archiveTooltip" as never, undefined, { client: clientName })}
                </TooltipContent>
            </Tooltip>

            {/* Delete Button */}
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        disabled={deleteOp.state.isLoading || showArchiveConfirm}
                        className="inline-flex items-center gap-2 rounded-lg border border-red-200/50 bg-red-50/5 px-3 py-2 text-sm font-medium text-red-600 transition hover:border-red-300/50 hover:bg-red-50/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900/50 dark:bg-red-950/10 dark:text-red-400 dark:hover:bg-red-950/20"
                    >
                        <Trash2 className="h-4 w-4" />
                        {deleteOp.state.isLoading ? t("common.deleting" as never) : t("clients.actions.delete" as never)}
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    {showDeleteConfirm
                        ? t("clients.actions.deleteConfirm" as never)
                        : deleteOp.state.error
                            ? deleteOp.state.error
                            : t("clients.actions.deleteTooltip" as never, undefined, { client: clientName })}
                </TooltipContent>
            </Tooltip>

            {/* Confirmation UI */}
            {showArchiveConfirm && (
                <div className="absolute right-0 top-full mt-2 rounded-lg border border-amber-200 bg-amber-50 p-3 shadow-lg dark:border-amber-900 dark:bg-amber-950/50">
                    <p className="mb-2 text-sm font-medium text-amber-900 dark:text-amber-100">
                        {t("clients.actions.archiveConfirmMessage" as never, undefined, { client: clientName })}
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={handleArchive}
                            disabled={archiveOp.state.isLoading}
                            className="rounded px-3 py-1 text-sm font-medium bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-50"
                        >
                            {t("common.confirm" as never)}
                        </button>
                        <button
                            onClick={() => setShowArchiveConfirm(false)}
                            disabled={archiveOp.state.isLoading}
                            className="rounded px-3 py-1 text-sm font-medium bg-amber-200 text-amber-900 hover:bg-amber-300 dark:bg-amber-900 dark:text-amber-100 dark:hover:bg-amber-800 disabled:opacity-50"
                        >
                            {t("common.cancel" as never)}
                        </button>
                    </div>
                </div>
            )}

            {showDeleteConfirm && (
                <div className="absolute right-0 top-full mt-2 rounded-lg border border-red-200 bg-red-50 p-3 shadow-lg dark:border-red-900 dark:bg-red-950/50">
                    <p className="mb-2 text-sm font-medium text-red-900 dark:text-red-100">
                        {t("clients.actions.deleteConfirmMessage" as never, undefined, { client: clientName })}
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={handleDelete}
                            disabled={deleteOp.state.isLoading}
                            className="rounded px-3 py-1 text-sm font-medium bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                        >
                            {t("common.confirm" as never)}
                        </button>
                        <button
                            onClick={() => setShowDeleteConfirm(false)}
                            disabled={deleteOp.state.isLoading}
                            className="rounded px-3 py-1 text-sm font-medium bg-red-200 text-red-900 hover:bg-red-300 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-800 disabled:opacity-50"
                        >
                            {t("common.cancel" as never)}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
