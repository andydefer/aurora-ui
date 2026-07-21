// src/components/feedback/Toast.tsx
import { ReactNode, useEffect, useState } from 'react';
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
}

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
    className = '',
    style = {},
}: ToastProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [isLeaving, setIsLeaving] = useState(false);

    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                setIsLeaving(true);
                setTimeout(() => {
                    setIsVisible(false);
                    onClose?.();
                }, 300);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

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
        'fixed z-50 max-w-sm w-full rounded-lg border shadow-lg p-4 transition-all duration-300',
        variantStyle.container,
        positionClasses[position],
        isLeaving ? 'opacity-0 translate-y-2 scale-95' : 'opacity-100 translate-y-0 scale-100',
        className
    );

    if (!isVisible) return null;

    return (
        <div className={classes} style={style} role="alert">
            <div className="flex items-start gap-3">
                <span className={clsx('shrink-0 mt-0.5', variantStyle.icon)}>
                    {displayIcon}
                </span>
                <div className="flex-1 min-w-0">
                    {title && (
                        <h4 className={clsx('font-semibold', variantStyle.title)}>
                            {title}
                        </h4>
                    )}
                    <p className={clsx('text-sm', title ? 'text-foreground/80' : 'text-foreground')}>
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
                )}
            </div>
        </div>
    );
}

export default Toast;