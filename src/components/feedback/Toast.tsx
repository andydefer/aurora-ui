import { ReactNode, useEffect, useState } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

export type ToastType = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface ToastProps extends LayoutBaseProps {
    message?: string;
    type?: ToastType;
    duration?: number;
    position?: ToastPosition;
    onClose?: () => void;
    icon?: ReactNode;
}

export function Toast({
    message,
    type = 'info',
    duration = 3000,
    position = 'top-right',
    onClose,
    icon,
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
        info: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300',
        success: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300',
        warning: 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300',
        error: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300',
    };

    const defaultIcons = {
        info: <Info size={18} />,
        success: <CheckCircle size={18} />,
        warning: <AlertTriangle size={18} />,
        error: <AlertCircle size={18} />,
    };

    const positionClasses = {
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'top-center': 'top-4 left-1/2 -translate-x-1/2',
        'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    };

    const classes = clsx(
        'fixed z-50 max-w-sm w-full rounded-lg border shadow-lg p-4 transition-all duration-300',
        typeClasses[type],
        positionClasses[position],
        isLeaving ? 'opacity-0 translate-y-2 scale-95' : 'opacity-100 translate-y-0 scale-100',
        className
    );

    if (!isVisible) return null;

    return (
        <div className={classes} style={style} role="alert">
            <div className="flex items-start gap-3">
                <span className="shrink-0 mt-0.5">
                    {icon || defaultIcons[type]}
                </span>
                <span className="flex-1 text-sm">{message}</span>
                <button
                    onClick={() => {
                        setIsLeaving(true);
                        setTimeout(() => {
                            setIsVisible(false);
                            onClose?.();
                        }, 300);
                    }}
                    className="shrink-0 p-1 rounded hover:bg-black/5 transition-colors"
                    aria-label="Fermer"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
}

export default Toast;