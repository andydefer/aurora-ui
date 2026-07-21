// src/components/forms/Button.tsx
import React from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, TextColor } from '../../types';
import { Loader2 } from 'lucide-react';

export type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'success'
    | 'warning'
    | 'ghost'
    | 'outline'
    | 'gradient'
    | 'glass';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends LayoutBaseProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    loading?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    as?: React.ElementType;
    type?: 'button' | 'submit' | 'reset';
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    color?: TextColor;
    rounded?: boolean;
    shadow?: boolean;
    animated?: boolean;
    badge?: React.ReactNode;
    badgeColor?: TextColor;
    ariaLabel?: string;
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    disabled = false,
    icon,
    iconPosition = 'left',
    as: Component = 'button',
    type = 'button',
    onClick,
    rounded = false,
    shadow = false,
    animated = false,
    badge,
    badgeColor = 'destructive',
    ariaLabel,
    className = '',
    style = {},
}: React.PropsWithChildren<ButtonProps>) {
    const variantClasses: Record<ButtonVariant, string> = {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground focus:ring-primary/50',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:text-secondary-foreground focus:ring-secondary/50',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:text-destructive-foreground focus:ring-destructive/50',
        success: 'bg-success text-success-foreground hover:bg-success/90 hover:text-success-foreground focus:ring-success/50',
        warning: 'bg-warning text-warning-foreground hover:bg-warning/90 hover:text-warning-foreground focus:ring-warning/50',
        ghost: 'bg-transparent text-foreground hover:bg-muted/20 hover:text-foreground focus:ring-primary/50',
        outline: 'bg-transparent border-2 border-border text-foreground hover:bg-muted/20 hover:text-foreground focus:ring-primary/50',
        gradient: 'bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90 hover:text-primary-foreground focus:ring-primary/50 shadow-md',
        glass: 'bg-card/30 backdrop-blur-md border border-border/50 text-foreground hover:bg-card/50 hover:text-foreground focus:ring-primary/50',
    };

    const sizeClasses: Record<ButtonSize, string> = {
        xs: 'px-2.5 py-1.5 text-xs',
        sm: 'px-3.5 py-2 text-sm',
        md: 'px-5 py-2.5 text-sm',
        lg: 'px-6 py-3 text-base',
        xl: 'px-7 py-3.5 text-base',
    };

    const iconSizeMap: Record<ButtonSize, number> = {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
    };

    const badgeColorClasses: Record<TextColor, string> = {
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        muted: 'bg-muted text-muted-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
    };

    const classes = clsx(
        'relative inline-flex items-center justify-center gap-2 font-medium transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        rounded ? 'rounded-full' : 'rounded-lg',
        shadow && 'shadow-md hover:shadow-lg',
        animated && 'hover:scale-[1.02] active:scale-[0.98]',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        loading && 'cursor-wait opacity-80',
        className
    );

    const iconSize = iconSizeMap[size];

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!loading && !disabled && onClick) {
            onClick(e);
        }
    };

    return (
        <Component
            type={type}
            className={classes}
            style={style}
            onClick={handleClick}
            disabled={disabled || loading}
            aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
        >
            {loading && (
                <Loader2
                    size={iconSize}
                    className="animate-spin shrink-0"
                />
            )}

            {!loading && icon && iconPosition === 'left' && (
                <span className="shrink-0">{icon}</span>
            )}

            {children && (
                <span className="relative">
                    {children}
                    {badge && (
                        <span className={clsx(
                            'absolute -top-2 -right-4 px-1.5 py-0.5 text-[10px] font-medium rounded-full',
                            'animate-in fade-in zoom-in duration-200',
                            badgeColorClasses[badgeColor]
                        )}>
                            {badge}
                        </span>
                    )}
                </span>
            )}

            {!loading && icon && iconPosition === 'right' && (
                <span className="shrink-0">{icon}</span>
            )}
        </Component>
    );
}

export default Button;