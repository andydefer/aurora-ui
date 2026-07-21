import { ReactNode } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';
import { Info, AlertCircle, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export type InputInfoVariant = 'info' | 'success' | 'warning' | 'destructive';

export interface InputInfoProps extends LayoutBaseProps {
    children?: ReactNode;
    message?: string;
    variant?: InputInfoVariant;
    icon?: ReactNode;
    showIcon?: boolean;
    size?: 'sm' | 'md' | 'lg';
    dismissible?: boolean;
    onDismiss?: () => void;
}

export function InputInfo({
    children,
    message,
    variant = 'info',
    icon,
    showIcon = true,
    size = 'md',
    dismissible = false,
    onDismiss,
    className = '',
    style = {},
}: InputInfoProps) {
    const variantClasses = {
        info: {
            container: 'bg-blue-500/10 border-blue-500 text-blue-600 dark:text-blue-400',
            icon: 'text-blue-500',
        },
        success: {
            container: 'bg-green-500/10 border-green-500 text-green-600 dark:text-green-400',
            icon: 'text-green-500',
        },
        warning: {
            container: 'bg-yellow-500/10 border-yellow-500 text-yellow-600 dark:text-yellow-400',
            icon: 'text-yellow-500',
        },
        destructive: {
            container: 'bg-red-500/10 border-red-500 text-red-600 dark:text-red-400',
            icon: 'text-red-500',
        },
    };

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-xs gap-1.5 rounded',
        md: 'px-4 py-2.5 text-sm gap-2 rounded-lg',
        lg: 'px-5 py-3 text-base gap-2.5 rounded-lg',
    };

    const iconSizes = {
        sm: 14,
        md: 18,
        lg: 22,
    };

    const defaultIcons = {
        info: <Info size={iconSizes[size]} />,
        success: <CheckCircle size={iconSizes[size]} />,
        warning: <AlertTriangle size={iconSizes[size]} />,
        destructive: <AlertCircle size={iconSizes[size]} />,
    };

    const displayIcon = icon || defaultIcons[variant];
    const displayMessage = message || children;
    const variantStyle = variantClasses[variant];

    const classes = clsx(
        'flex items-start rounded-lg border',
        variantStyle.container,
        sizeClasses[size],
        dismissible && 'pr-10 relative',
        className
    );

    const iconClasses = clsx(
        'shrink-0 mt-0.5',
        variantStyle.icon
    );

    const messageClasses = clsx(
        'flex-1',
        size === 'sm' ? 'leading-tight' : 'leading-normal'
    );

    return (
        <div className={classes} style={style} role="alert">
            {showIcon && (
                <span className={iconClasses}>
                    {displayIcon}
                </span>
            )}
            <span className={messageClasses}>
                {displayMessage}
            </span>
            {dismissible && onDismiss && (
                <button
                    type="button"
                    onClick={onDismiss}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-black/5 transition-colors"
                    aria-label="Fermer"
                >
                    <XCircle size={iconSizes[size]} className="opacity-60 hover:opacity-100" />
                </button>
            )}
        </div>
    );
}

export default InputInfo;