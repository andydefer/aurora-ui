// src/components/feedback/Alert.tsx
import { ReactNode, useState } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'destructive';

export interface AlertProps extends LayoutBaseProps {
    variant?: AlertVariant;
    title?: string;
    children?: ReactNode;
    closable?: boolean;
    icon?: ReactNode;
    onClose?: () => void;
    compact?: boolean;
    withBorder?: boolean;
    elevated?: boolean;
}

export function Alert({
    variant = 'info',
    title,
    children,
    closable = false,
    icon,
    onClose,
    compact = false,
    withBorder = true,
    elevated = false,
    className = '',
    style = {},
}: AlertProps) {
    const [isVisible, setIsVisible] = useState(true);

    const variantClasses = {
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

    const displayIcon = icon || defaultIcons[variant];
    const variantStyle = variantClasses[variant];

    const classes = clsx(
        'relative transition-all duration-300',
        'flex items-start gap-3',
        variantStyle.container,
        withBorder && 'border',
        elevated && 'shadow-md',
        compact ? 'p-3 rounded-md' : 'p-4 rounded-lg',
        !isVisible && 'opacity-0 scale-95 hidden',
        className
    );

    const handleClose = () => {
        setIsVisible(false);
        onClose?.();
    };

    if (!isVisible) return null;

    return (
        <div className={classes} style={style} role="alert">
            <span className={clsx('shrink-0 mt-0.5', variantStyle.icon)}>
                {displayIcon}
            </span>
            <div className="flex-1 min-w-0">
                {title && (
                    <h4 className={clsx('font-semibold', variantStyle.title, compact ? 'text-sm' : 'text-base')}>
                        {title}
                    </h4>
                )}
                <div className={clsx('text-foreground/80', compact ? 'text-sm' : 'text-base', title && 'mt-0.5')}>
                    {children}
                </div>
            </div>
            {closable && (
                <button
                    onClick={handleClose}
                    className="shrink-0 p-1 rounded-full hover:bg-black/5 transition-colors text-muted-foreground hover:text-foreground"
                    aria-label="Fermer"
                >
                    <X size={18} />
                </button>
            )}
        </div>
    );
}

export default Alert;