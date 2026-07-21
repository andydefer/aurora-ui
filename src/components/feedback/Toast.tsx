// src/components/feedback/Toast.tsx
import { ReactNode, useEffect, useState, useRef } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

export type ToastType = 'info' | 'success' | 'warning' | 'destructive';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface ToastProps extends LayoutBaseProps {
    message?: string;
    type?: ToastType;
    duration?: number;
    position?: ToastPosition;
    onClose?: () => void;
    icon?: ReactNode;
    title?: string;
    action?: ReactNode;
    dismissible?: boolean;
    progress?: boolean;
    stacked?: boolean;
}

// Gestionnaire global des toasts
let toastInstances: Array<{ id: string; onClose: () => void }> = [];

export function Toast({
    message,
    type = 'info',
    duration = 3000,
    position = 'top-right',
    onClose,
    icon,
    title,
    action,
    dismissible = true,
    progress = true,
    stacked = false,
    className = '',
    style = {},
}: ToastProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [isLeaving, setIsLeaving] = useState(false);
    const [progressWidth, setProgressWidth] = useState(100);
    const toastId = useRef(`toast-${Date.now()}-${Math.random()}`);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Supprimer les toasts précédents si non empilés
    useEffect(() => {
        if (!stacked) {
            toastInstances.forEach((instance) => {
                if (instance.id !== toastId.current) {
                    instance.onClose();
                }
            });
            toastInstances = toastInstances.filter(
                (instance) => instance.id === toastId.current
            );
        }

        // Ajouter l'instance courante
        toastInstances.push({
            id: toastId.current,
            onClose: handleClose,
        });

        return () => {
            toastInstances = toastInstances.filter(
                (instance) => instance.id !== toastId.current
            );
        };
    }, [stacked]);

    useEffect(() => {
        if (duration > 0) {
            // Timer pour la fermeture
            timerRef.current = setTimeout(() => {
                handleClose();
            }, duration);

            // Progression de la barre
            if (progress) {
                const step = 100 / (duration / 50);
                progressIntervalRef.current = setInterval(() => {
                    setProgressWidth((prev) => {
                        if (prev <= 0) {
                            clearInterval(progressIntervalRef.current!);
                            return 0;
                        }
                        return Math.max(0, prev - step);
                    });
                }, 50);
            }

            return () => {
                if (timerRef.current) clearTimeout(timerRef.current);
                if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
            };
        }
    }, [duration, progress]);

    const handleClose = () => {
        if (isLeaving) return;
        setIsLeaving(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        setTimeout(() => {
            setIsVisible(false);
            onClose?.();
            // Retirer l'instance
            toastInstances = toastInstances.filter(
                (instance) => instance.id !== toastId.current
            );
        }, 300);
    };

    const typeClasses = {
        info: {
            container: 'bg-primary/10 border-primary/30 text-primary',
            icon: 'text-primary',
            title: 'text-primary',
        },
        success: {
            container: 'bg-success/10 border-success/30 text-success',
            icon: 'text-success',
            title: 'text-success',
        },
        warning: {
            container: 'bg-warning/10 border-warning/30 text-warning',
            icon: 'text-warning',
            title: 'text-warning',
        },
        destructive: {
            container: 'bg-destructive/10 border-destructive/30 text-destructive',
            icon: 'text-destructive',
            title: 'text-destructive',
        },
    };

    const defaultIcons = {
        info: <Info size={20} />,
        success: <CheckCircle size={20} />,
        warning: <AlertTriangle size={20} />,
        destructive: <AlertCircle size={20} />,
    };

    const positionClasses = {
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'top-center': 'top-4 left-1/2 -translate-x-1/2',
        'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    };

    const displayIcon = icon || defaultIcons[type];
    const variantStyle = typeClasses[type];

    const classes = clsx(
        'fixed z-50 max-w-sm w-full rounded-xl border shadow-xl p-4 transition-all duration-300',
        'overflow-hidden',
        variantStyle.container,
        positionClasses[position],
        isLeaving ? 'opacity-0 translate-y-2 scale-95' : 'opacity-100 translate-y-0 scale-100',
        className
    );

    if (!isVisible) return null;

    return (
        <div className={classes} style={style} role="alert">
            {/* Barre de progression */}
            {progress && duration > 0 && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-muted/30">
                    <div
                        className="h-full transition-all duration-300 ease-linear"
                        style={{
                            width: `${progressWidth}%`,
                            backgroundColor: `hsl(var(--${type}))`,
                        }}
                    />
                </div>
            )}

            <div className="flex items-start gap-3">
                <span className={clsx('shrink-0 mt-0.5', variantStyle.icon)}>
                    {displayIcon}
                </span>
                <div className="flex-1 min-w-0">
                    {title && (
                        <h4 className={clsx('font-semibold text-sm', variantStyle.title)}>
                            {title}
                        </h4>
                    )}
                    <p className={clsx('text-sm', title ? 'text-foreground/80 mt-0.5' : 'text-foreground')}>
                        {message}
                    </p>
                    {action && (
                        <div className="mt-2">
                            {action}
                        </div>
                    )}
                </div>
                {dismissible && (
                    <button
                        onClick={handleClose}
                        className="shrink-0 p-1 rounded-full hover:bg-black/5 transition-colors text-muted-foreground hover:text-foreground"
                        aria-label="Fermer"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>
        </div>
    );
}

export default Toast;