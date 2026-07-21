// src/components/overlay/Dialog.tsx
import { ReactNode, useEffect, useRef, useState } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Size, TextColor } from '../../types';
import { X, AlertCircle, AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';
import { Card } from './Card';

export type DialogType = 'default' | 'info' | 'success' | 'warning' | 'error' | 'confirm' | 'timeout';

export interface DialogProps extends LayoutBaseProps {
    open?: boolean;
    onClose?: () => void;
    title?: ReactNode;
    description?: ReactNode;
    children?: ReactNode;
    size?: Size;
    closeOnBackdrop?: boolean;
    scrollable?: boolean;
    showCloseButton?: boolean;
    type?: DialogType;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onReject?: () => void;
    confirmButtonColor?: TextColor;
    loading?: boolean;
    showCancel?: boolean;
    closeOnConfirm?: boolean;
    closeOnCancel?: boolean;
    // Props pour le type 'timeout'
    timeout?: number;
    onTimeout?: () => void;
    showTimer?: boolean;
    // Props pour le type 'confirm'
    rejectText?: string;
    showReject?: boolean;
}

export function Dialog({
    open = false,
    onClose,
    title,
    description,
    children,
    size = 'md',
    closeOnBackdrop = true,
    scrollable = false,
    showCloseButton = true,
    type = 'default',
    confirmText = 'Confirmer',
    cancelText = 'Annuler',
    onConfirm,
    onReject,
    confirmButtonColor,
    loading = false,
    showCancel = true,
    closeOnConfirm = true,
    closeOnCancel = true,
    timeout = 5000,
    onTimeout,
    showTimer = true,
    rejectText = 'Rejeter',
    showReject = true,
    className = '',
    style = {},
}: DialogProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const [timeLeft, setTimeLeft] = useState<number>(timeout);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const isConfirm = type === 'confirm';
    const isTimeout = type === 'timeout';
    const isAlert = type !== 'default' && !isConfirm && !isTimeout;

    // Gestion du timer pour le type 'timeout'
    useEffect(() => {
        if (open && isTimeout) {
            setTimeLeft(timeout);
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1000) {
                        clearInterval(timerRef.current!);
                        onTimeout?.();
                        onClose?.();
                        return 0;
                    }
                    return prev - 1000;
                });
            }, 1000);

            return () => {
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                }
            };
        }
    }, [open, isTimeout, timeout, onTimeout, onClose]);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && open) {
                onClose?.();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [open, onClose]);

    const sizeClasses: Record<Size, string> = {
        xs: 'max-w-xs',
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        full: 'max-w-full',
    };

    // Configuration des icônes pour les types
    const icons = {
        info: {
            icon: <Info size={28} className="text-blue-500" />,
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
            color: 'text-blue-600 dark:text-blue-400',
        },
        success: {
            icon: <CheckCircle size={28} className="text-success" />,
            bg: 'bg-success/10',
            border: 'border-success/20',
            color: 'text-success',
        },
        warning: {
            icon: <AlertTriangle size={28} className="text-warning" />,
            bg: 'bg-warning/10',
            border: 'border-warning/20',
            color: 'text-warning',
        },
        error: {
            icon: <AlertCircle size={28} className="text-danger" />,
            bg: 'bg-danger/10',
            border: 'border-danger/20',
            color: 'text-danger',
        },
        confirm: {
            icon: <AlertCircle size={28} className="text-warning" />,
            bg: 'bg-warning/10',
            border: 'border-warning/20',
            color: 'text-warning',
        },
        timeout: {
            icon: <Clock size={28} className="text-warning" />,
            bg: 'bg-warning/10',
            border: 'border-warning/20',
            color: 'text-warning',
        },
        default: {
            icon: null,
            bg: '',
            border: '',
            color: '',
        },
    };

    // Configuration des couleurs de confirmation
    const confirmVariantColors: Record<DialogType, TextColor> = {
        default: 'primary',
        info: 'primary',
        success: 'success',
        warning: 'warning',
        error: 'danger',
        confirm: 'warning',
        timeout: 'warning',
    };

    const confirmColor = confirmButtonColor || confirmVariantColors[type];

    const handleConfirm = () => {
        onConfirm?.();
        if (closeOnConfirm) {
            onClose?.();
        }
    };

    const handleCancel = () => {
        if (closeOnCancel) {
            onClose?.();
        }
    };

    const handleReject = () => {
        onReject?.();
        if (closeOnCancel) {
            onClose?.();
        }
    };

    const iconConfig = icons[type];
    const showActions = isAlert || isConfirm || isTimeout;

    // Classes pour le bouton de confirmation
    const confirmButtonClasses: Record<TextColor, string> = {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/50',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary/50',
        muted: 'bg-muted text-muted-foreground hover:bg-muted/80 focus:ring-muted/50',
        danger: 'bg-danger text-white hover:bg-danger/90 focus:ring-danger/50',
        success: 'bg-success text-white hover:bg-success/90 focus:ring-success/50',
        warning: 'bg-warning text-white hover:bg-warning/90 focus:ring-warning/50',
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget && closeOnBackdrop) {
            onClose?.();
        }
    };

    // Formater le temps restant
    const formatTime = (ms: number): string => {
        const seconds = Math.ceil(ms / 1000);
        return `${seconds}s`;
    };

    if (!open) return null;

    return (
        <div
            className={clsx(
                'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300',
                className
            )}
            style={style}
            onClick={handleBackdropClick}
        >
            <div
                ref={dialogRef}
                className={clsx(
                    'w-full max-h-[90vh]',
                    sizeClasses[size],
                    'animate-in fade-in zoom-in duration-200'
                )}
            >
                <Card
                    padding={0}
                    shadow="xl"
                    radius="lg"
                    border={false}
                    className="overflow-hidden"
                >
                    {/* Header */}
                    {(title || showCloseButton) && (
                        <div className={clsx(
                            'flex items-center justify-between px-6 py-4 border-b border-border',
                            (isAlert || isConfirm || isTimeout) && iconConfig.bg,
                            (isAlert || isConfirm || isTimeout) && iconConfig.border,
                            (isAlert || isConfirm || isTimeout) && 'rounded-t-lg'
                        )}>
                            <div className="flex items-center gap-3">
                                {(isAlert || isConfirm || isTimeout) && iconConfig.icon && (
                                    <div className={clsx(
                                        'flex items-center justify-center w-10 h-10 rounded-full shrink-0',
                                        iconConfig.bg,
                                        iconConfig.border
                                    )}>
                                        {iconConfig.icon}
                                    </div>
                                )}
                                {title && (
                                    <h2 className={clsx(
                                        'text-xl font-semibold',
                                        (isAlert || isConfirm || isTimeout) && iconConfig.color
                                    )}>
                                        {title}
                                    </h2>
                                )}
                                {/* Timer pour le type 'timeout' */}
                                {isTimeout && showTimer && (
                                    <span className={clsx(
                                        'ml-2 px-3 py-1 text-sm font-medium rounded-full',
                                        timeLeft <= 3000 ? 'bg-danger/10 text-danger animate-pulse' : 'bg-muted/10 text-muted-foreground'
                                    )}>
                                        {formatTime(timeLeft)}
                                    </span>
                                )}
                            </div>
                            {showCloseButton && onClose && (
                                <button
                                    onClick={onClose}
                                    className="p-1 rounded-lg hover:bg-muted/20 transition-colors text-muted-foreground hover:text-foreground shrink-0"
                                    aria-label="Fermer"
                                >
                                    <X size={20} />
                                </button>
                            )}
                        </div>
                    )}

                    {/* Body */}
                    <div className={clsx(
                        'p-6',
                        scrollable && 'max-h-[60vh] overflow-y-auto'
                    )}>
                        {description && (
                            <p className="text-muted-foreground text-base leading-relaxed">
                                {description}
                            </p>
                        )}
                        {children}
                    </div>

                    {/* Footer avec actions */}
                    {showActions && (
                        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-muted/5">
                            {isConfirm && showReject && (
                                <button
                                    onClick={handleReject}
                                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/10 rounded-lg transition-colors"
                                    disabled={loading}
                                >
                                    {rejectText}
                                </button>
                            )}
                            {showCancel && !isConfirm && (
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/10 rounded-lg transition-colors"
                                    disabled={loading}
                                >
                                    {cancelText}
                                </button>
                            )}
                            <button
                                onClick={handleConfirm}
                                disabled={loading || (isTimeout && timeLeft <= 0)}
                                className={clsx(
                                    'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                                    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background',
                                    'disabled:opacity-50 disabled:cursor-not-allowed',
                                    confirmButtonClasses[confirmColor],
                                    loading && 'cursor-wait'
                                )}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Chargement...
                                    </span>
                                ) : (
                                    confirmText
                                )}
                            </button>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}

export default Dialog;