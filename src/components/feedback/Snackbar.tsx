// src/components/feedback/Snackbar.tsx
import { ReactNode, useEffect, useState } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

export type SnackbarVariant = 'info' | 'success' | 'warning' | 'destructive';

export interface SnackbarProps extends LayoutBaseProps {
    message?: string;
    action?: ReactNode;
    duration?: number;
    open?: boolean;
    onClose?: () => void;
    variant?: SnackbarVariant;
    position?: 'bottom-center' | 'bottom-left' | 'bottom-right' | 'top-center' | 'top-left' | 'top-right';
    showIcon?: boolean;
}

export function Snackbar({
    message,
    action,
    duration = 4000,
    open = false,
    onClose,
    variant = 'info',
    position = 'bottom-center',
    showIcon = true,
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

    const variantClasses = {
        info: 'bg-primary/10 border-primary/30 text-primary',
        success: 'bg-success/10 border-success/30 text-success',
        warning: 'bg-warning/10 border-warning/30 text-warning',
        destructive: 'bg-destructive/10 border-destructive/30 text-destructive',
    };

    const icons = {
        info: <Info size={20} className="text-primary" />,
        success: <CheckCircle size={20} className="text-success" />,
        warning: <AlertTriangle size={20} className="text-warning" />,
        destructive: <AlertCircle size={20} className="text-destructive" />,
    };

    const positionClasses = {
        'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
        'bottom-left': 'bottom-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'top-center': 'top-4 left-1/2 -translate-x-1/2',
        'top-left': 'top-4 left-4',
        'top-right': 'top-4 right-4',
    };

    const classes = clsx(
        'fixed z-50',
        'bg-card border rounded-lg shadow-lg px-4 py-3 min-w-[280px] max-w-md',
        'flex items-center gap-3',
        'transition-all duration-300',
        variantClasses[variant],
        positionClasses[position],
        isVisible && !isLeaving ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95',
        className
    );

    if (!isVisible) return null;

    return (
        <div className={classes} style={style} role="alert">
            {showIcon && (
                <span className="shrink-0">{icons[variant]}</span>
            )}
            <span className="flex-1 text-sm font-medium">{message}</span>
            {action && (
                <div className="shrink-0">{action}</div>
            )}
            <button
                onClick={() => {
                    setIsLeaving(true);
                    setTimeout(() => {
                        setIsVisible(false);
                        onClose?.();
                    }, 300);
                }}
                className="shrink-0 p-1 rounded-full hover:bg-black/5 transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Fermer"
            >
                <X size={16} />
            </button>
        </div>
    );
}

export default Snackbar;