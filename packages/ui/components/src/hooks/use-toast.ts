import { toast } from 'sonner'

/**
 * Custom hook for showing toast notifications with consistent styling
 */
export function useToast() {
    return {
        success: (message: string, description?: string) => {
            toast.success(message, description ? { description } : {})
        },
        error: (message: string, description?: string) => {
            toast.error(message, description ? { description } : {})
        },
        info: (message: string, description?: string) => {
            toast.info(message, description ? { description } : {})
        },
        warning: (message: string, description?: string) => {
            toast.warning(message, description ? { description } : {})
        },
        loading: (message: string) => {
            return toast.loading(message)
        },
        dismiss: (toastId: number | string) => {
            toast.dismiss(toastId)
        },
        promise: <T,>(
            promise: Promise<T>,
            messages: {
                loading: string
                success: string
                error: string
            }
        ) => {
            return toast.promise(promise, messages)
        },
    }
}
