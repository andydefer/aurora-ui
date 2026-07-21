// src/components/feedback/Snackbar.tsx
import { ReactNode, useEffect, useState } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

export type SnackbarVariant = 'info' | 'success' | 'warning' | 'destructive' | 'default';

export type SnackbarPosition =
    | 'bottom-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-center'
    | 'top-left'
    | 'top-right';

export interface SnackbarProps extends LayoutBaseProps {
    message?: string;
    action?: ReactNode;
    duration?: number;
    open?: boolean;
    onClose?: () => void;
    variant?: SnackbarVariant;
    position?: SnackbarPosition;
    showIcon?: boolean;
    title?: string;
    closable?: boolean;
}

export function Snackbar({
    message,
    action,
    duration = 4000,
    open = false,
    onClose,
    variant = 'default',
    position = 'bottom-center',
    showIcon = true,
    title,
    closable = true,
    className = '',
    style = {},
}: SnackbarProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);

    useEffect(() => {
        if (open) {
            setIsVisible(true);
            setIsLeaving(false);
        } else {
            setIsLeaving(true);
            setTimeout(() => {
                setIsVisible(false);
            }, 300);
        }
    }, [open]);

    useEffect(() => {
        if (open && duration > 0) {
            const timer = setTimeout(() => {
                setIsLeaving(true);
                setTimeout(() => {
                    setIsVisible(false);
                    onClose?.();
                }, 300);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [open, duration, onClose]);

    const variantClasses: Record<SnackbarVariant, string> = {
        info: 'border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300',
        success: 'border-success/30 bg-success/10 text-success-foreground',
        warning: 'border-warning/30 bg-warning/10 text-warning-foreground',
        destructive: 'border-destructive/30 bg-destructive/10 text-destructive-foreground',
        default: 'border-border/30 bg-card text-foreground',
    };

    const iconMap = {
        info: <Info size={20} className="text-blue-500" />,
        success: <CheckCircle size={20} className="text-success" />,
        warning: <AlertTriangle size={20} className="text-warning" />,
        destructive: <AlertCircle size={20} className="text-destructive" />,
        default: null,
    };

    const positionClasses: Record<SnackbarPosition, string> = {
        'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2',
        'bottom-left': 'bottom-6 left-6',
        'bottom-right': 'bottom-6 right-6',
        'top-center': 'top-6 left-1/2 -translate-x-1/2',
        'top-left': 'top-6 left-6',
        'top-right': 'top-6 right-6',
    };

    const classes = clsx(
        'fixed z-50 max-w-lg w-full rounded-2xl border shadow-2xl p-2 transition-all duration-300',
        'backdrop-blur-md bg-opacity-90',
        variantClasses[variant],
        positionClasses[position],
        isVisible && !isLeaving ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95',
        className
    );

    if (!isVisible) return null;

    return (
        <div className={classes} style={style} role="alert">
            <div className="flex items-start gap-4">
                {showIcon && iconMap[variant] && (
                    <div className={clsx(
                        'flex items-center justify-center w-6 h-6 rounded-full shrink-0',
                        variant === 'info' && 'bg-blue-500/20',
                        variant === 'success' && 'bg-success/20',
                        variant === 'warning' && 'bg-warning/20',
                        variant === 'destructive' && 'bg-destructive/20',
                        variant === 'default' && 'bg-muted/20'
                    )}>
                        {iconMap[variant]}
                    </div>
                )}
                <div className="flex-1 min-w-0">
                    {title && (
                        <p className="font-semibold text-base leading-tight">{title}</p>
                    )}
                    <p className={clsx(
                        'text-sm leading-relaxed',
                        title ? 'text-muted-foreground' : 'text-foreground'
                    )}>
                        {message}
                    </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    {action && (
                        <div className="shrink-0">
                            {action}
                        </div>
                    )}
                    {closable && onClose && (
                        <button
                            onClick={() => {
                                setIsLeaving(true);
                                setTimeout(() => {
                                    setIsVisible(false);
                                    onClose();
                                }, 300);
                            }}
                            className={clsx(
                                'shrink-0 p-1.5 rounded-lg transition-colors',
                                'hover:bg-black/10 dark:hover:bg-white/10',
                                'text-muted-foreground hover:text-foreground'
                            )}
                            aria-label="Fermer"
                        >
                            <X size={18} strokeWidth={2} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Snackbar;