// src/components/forms/Fieldset.tsx
import React, { useRef } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Size, TextColor } from '../../types';
import { CheckCircle2, AlertCircle, ChevronDown } from 'lucide-react';

export interface FieldsetProps extends LayoutBaseProps {
    legend?: string;
    description?: string;
    disabled?: boolean;
    border?: boolean;
    size?: Size;
    color?: TextColor;
    variant?: 'default' | 'outlined' | 'elevated' | 'ghost';
    status?: 'default' | 'success' | 'error' | 'warning';
    statusMessage?: string;
    required?: boolean;
    collapsible?: boolean;
    defaultCollapsed?: boolean;
    maxHeight?: number | string;
    scrollable?: boolean;
}

export function Fieldset({
    children,
    legend,
    description,
    disabled = false,
    border = true,
    size = 'md',
    color = 'primary',
    variant = 'default',
    status = 'default',
    statusMessage,
    required = false,
    collapsible = false,
    defaultCollapsed = false,
    maxHeight = '300px',
    scrollable = false,
    className = '',
    style = {},
}: FieldsetProps) {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
    const contentRef = useRef<HTMLDivElement>(null);

    const sizeClasses: Record<Size, string> = {
        xs: 'text-xs p-2 gap-1.5',
        sm: 'text-sm p-3 gap-2',
        md: 'text-base p-4 gap-3',
        lg: 'text-lg p-5 gap-4',
        xl: 'text-xl p-6 gap-5',
        '2xl': 'text-2xl p-7 gap-6',
        '3xl': 'text-3xl p-8 gap-7',
        '4xl': 'text-4xl p-9 gap-8',
        full: 'text-5xl p-10 gap-9',
    };

    const variantClasses = {
        default: 'bg-card border border-border',
        outlined: 'bg-transparent border-2 border-border',
        elevated: 'bg-card border border-border shadow-md',
        ghost: 'bg-transparent border-0',
    };

    const colorClasses: Record<TextColor, string> = {
        primary: 'border-primary/30 focus-within:border-primary',
        secondary: 'border-secondary/30 focus-within:border-secondary',
        muted: 'border-muted/30 focus-within:border-muted',
        destructive: 'border-destructive/30 focus-within:border-destructive',
        success: 'border-success/30 focus-within:border-success',
        warning: 'border-warning/30 focus-within:border-warning',
    };

    const statusClasses = {
        default: {
            border: 'border-border',
            text: 'text-muted-foreground',
            icon: null,
        },
        success: {
            border: 'border-success/30',
            text: 'text-success',
            icon: <CheckCircle2 size={16} className="text-success" />,
        },
        error: {
            border: 'border-destructive/30',
            text: 'text-destructive',
            icon: <AlertCircle size={16} className="text-destructive" />,
        },
        warning: {
            border: 'border-warning/30',
            text: 'text-warning',
            icon: <AlertCircle size={16} className="text-warning" />,
        },
    };

    const legendSizeClasses: Record<Size, string> = {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
        '4xl': 'text-4xl',
        full: 'text-5xl',
    };

    const descriptionSizeClasses: Record<Size, string> = {
        xs: 'text-[10px]',
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-base',
        '2xl': 'text-lg',
        '3xl': 'text-lg',
        '4xl': 'text-xl',
        full: 'text-xl',
    };

    const classes = clsx(
        'w-full rounded-md transition-all duration-200',
        variantClasses[variant],
        colorClasses[color],
        border && variant !== 'ghost' && 'border',
        status !== 'default' && statusClasses[status].border,
        sizeClasses[size],
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        scrollable && 'overflow-y-auto',
        className
    );

    const contentClasses = clsx(
        'transition-all duration-300 overflow-hidden',
        collapsible && isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[2000px] opacity-100',
        border || variant !== 'ghost' ? 'mt-3 space-y-3' : 'space-y-3'
    );

    const legendClasses = clsx(
        'font-semibold px-1',
        legendSizeClasses[size],
        status !== 'default' ? statusClasses[status].text : 'text-foreground',
        required && 'after:content-["*"] after:ml-0.5 after:text-destructive'
    );

    const statusMessageClasses = clsx(
        'flex items-center gap-1.5 text-sm mt-2',
        statusClasses[status].text
    );

    const scrollableStyle = scrollable ? {
        maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
    } : {};

    return (
        <fieldset
            className={classes}
            style={{ ...style, ...scrollableStyle }}
            disabled={disabled}
        >
            {(legend || collapsible) && (
                <div className="flex items-center justify-between w-full">
                    {legend && (
                        <legend className={legendClasses}>
                            {legend}
                        </legend>
                    )}
                    {collapsible && (
                        <button
                            type="button"
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className={clsx(
                                'p-1 rounded-md hover:bg-muted/20 transition-colors text-muted-foreground hover:text-foreground',
                                'focus:outline-none focus:ring-2 focus:ring-primary/20'
                            )}
                            aria-expanded={!isCollapsed}
                        >
                            <ChevronDown
                                className={clsx(
                                    'w-4 h-4 transition-transform duration-200',
                                    isCollapsed ? 'rotate-0' : 'rotate-180'
                                )}
                            />
                        </button>
                    )}
                </div>
            )}

            {description && (
                <p className={clsx(
                    'text-muted-foreground mt-1',
                    descriptionSizeClasses[size]
                )}>
                    {description}
                </p>
            )}

            <div ref={contentRef} className={contentClasses}>
                {children}
            </div>

            {statusMessage && status !== 'default' && (
                <div className={statusMessageClasses}>
                    {statusClasses[status].icon}
                    <span>{statusMessage}</span>
                </div>
            )}
        </fieldset>
    );
}

export default Fieldset;