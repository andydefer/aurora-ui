import { ReactNode, useState } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends LayoutBaseProps {
    variant?: AlertVariant;
    title?: string;
    children?: ReactNode;
    closable?: boolean;
    icon?: ReactNode;
    onClose?: () => void;
}

export function Alert({
    variant = 'info',
    title,
    children,
    closable = false,
    icon,
    onClose,
    className = '',
    style = {},
}: AlertProps) {
    const [isVisible, setIsVisible] = useState(true);

    const variantClasses = {
        info: {
            container: 'bg-blue-500/10 border-blue-500 text-blue-700 dark:text-blue-300',
            icon: 'text-blue-500',
            title: 'text-blue-800 dark:text-blue-200',
        },
        success: {
            container: 'bg-green-500/10 border-green-500 text-green-700 dark:text-green-300',
            icon: 'text-green-500',
            title: 'text-green-800 dark:text-green-200',
        },
        warning: {
            container: 'bg-yellow-500/10 border-yellow-500 text-yellow-700 dark:text-yellow-300',
            icon: 'text-yellow-500',
            title: 'text-yellow-800 dark:text-yellow-200',
        },
        error: {
            container: 'bg-red-500/10 border-red-500 text-red-700 dark:text-red-300',
            icon: 'text-red-500',
            title: 'text-red-800 dark:text-red-200',
        },
    };

    const defaultIcons = {
        info: <Info size={20} />,
        success: <CheckCircle size={20} />,
        warning: <AlertTriangle size={20} />,
        error: <AlertCircle size={20} />,
    };

    const displayIcon = icon || defaultIcons[variant];
    const variantStyle = variantClasses[variant];

    const classes = clsx(
        'relative rounded-lg border p-4 transition-all duration-300',
        variantStyle.container,
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
            <div className="flex items-start gap-3">
                <span className={clsx('shrink-0 mt-0.5', variantStyle.icon)}>
                    {displayIcon}
                </span>
                <div className="flex-1">
                    {title && (
                        <h4 className={clsx('font-semibold mb-1', variantStyle.title)}>
                            {title}
                        </h4>
                    )}
                    <div className="text-sm">{children}</div>
                </div>
                {closable && (
                    <button
                        onClick={handleClose}
                        className="shrink-0 p-1 rounded hover:bg-black/5 transition-colors"
                        aria-label="Fermer"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>
        </div>
    );
}

export default Alert;