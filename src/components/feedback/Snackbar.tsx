import { ReactNode, useEffect, useState } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';

export interface SnackbarProps extends LayoutBaseProps {
    message?: string;
    action?: ReactNode;
    duration?: number;
    open?: boolean;
    onClose?: () => void;
}

export function Snackbar({
    message,
    action,
    duration = 4000,
    open = false,
    onClose,
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

    const classes = clsx(
        'fixed bottom-4 left-1/2 -translate-x-1/2 z-50',
        'bg-card border border-border rounded-lg shadow-lg px-4 py-3 min-w-[280px] max-w-md',
        'flex items-center justify-between gap-4',
        'transition-all duration-300',
        isVisible && !isLeaving ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className
    );

    if (!isVisible) return null;

    return (
        <div className={classes} style={style} role="alert">
            <span className="text-sm text-foreground">{message}</span>
            {action && (
                <div className="shrink-0">
                    {action}
                </div>
            )}
        </div>
    );
}

export default Snackbar;