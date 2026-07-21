// src/components/forms/Label.tsx
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Size, TextColor } from '../../types';
import { Info } from 'lucide-react';

export interface LabelProps extends LayoutBaseProps {
    htmlFor?: string;
    required?: boolean;
    optional?: boolean;
    tooltip?: string;
    hidden?: boolean;
    size?: Size;
    color?: TextColor;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

export function Label({
    children,
    htmlFor,
    required = false,
    optional = false,
    tooltip,
    hidden = false,
    size = 'md',
    color = 'primary',
    icon,
    iconPosition = 'left',
    className = '',
    style = {},
}: LabelProps) {
    const sizeClasses: Record<Size, string> = {
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

    const colorClasses: Record<TextColor, string> = {
        primary: 'text-primary',
        secondary: 'text-secondary',
        muted: 'text-muted-foreground',
        destructive: 'text-destructive',
        success: 'text-success',
        warning: 'text-warning',
    };

    const classes = clsx(
        'block font-semibold transition-colors',
        sizeClasses[size],
        colorClasses[color],
        hidden && 'sr-only',
        className
    );

    return (
        <label htmlFor={htmlFor} className={classes} style={style}>
            {icon && iconPosition === 'left' && (
                <span className="mr-1.5 inline-flex">{icon}</span>
            )}

            {children}

            {icon && iconPosition === 'right' && (
                <span className="ml-1.5 inline-flex">{icon}</span>
            )}

            {required && (
                <span className="ml-0.5 text-destructive" aria-label="Champ requis">*</span>
            )}

            {optional && (
                <span className="ml-1.5 text-sm font-normal text-muted-foreground">
                    (optionnel)
                </span>
            )}

            {tooltip && (
                <span
                    className="ml-1.5 inline-flex cursor-help group relative"
                    title={tooltip}
                >
                    <Info size={14} className="text-muted-foreground hover:text-foreground transition-colors" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded bg-foreground text-background whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        {tooltip}
                    </span>
                </span>
            )}
        </label>
    );
}

export default Label;