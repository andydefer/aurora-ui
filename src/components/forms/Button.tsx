import React from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Size } from '../../types';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'ghost' | 'outline';

export interface ButtonProps extends LayoutBaseProps {
    variant?: ButtonVariant;
    size?: Size;
    fullWidth?: boolean;
    loading?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    as?: React.ElementType;
    type?: 'button' | 'submit' | 'reset';
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
    className = '',
    style = {},
}: React.PropsWithChildren<ButtonProps>) {
    const variantClasses: Record<ButtonVariant, string> = {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/50',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary/50',
        danger: 'bg-danger text-white hover:bg-danger/90 focus:ring-danger/50',
        success: 'bg-success text-white hover:bg-success/90 focus:ring-success/50',
        warning: 'bg-warning text-white hover:bg-warning/90 focus:ring-warning/50',
        ghost: 'bg-transparent text-foreground hover:bg-muted/20 focus:ring-primary/50',
        outline: 'bg-transparent border border-border text-foreground hover:bg-muted/20 focus:ring-primary/50',
    };

    const sizeClasses: Record<Size, string> = {
        xs: 'px-2 py-1 text-xs rounded',
        sm: 'px-3 py-1.5 text-sm rounded',
        md: 'px-4 py-2 text-sm rounded-lg',
        lg: 'px-5 py-2.5 text-base rounded-lg',
        xl: 'px-6 py-3 text-base rounded-xl',
        '2xl': 'px-7 py-3.5 text-lg rounded-xl',
        '3xl': 'px-8 py-4 text-lg rounded-2xl',
        '4xl': 'px-10 py-5 text-xl rounded-2xl',
        full: 'px-12 py-6 text-xl rounded-2xl',
    };

    const classes = clsx(
        'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        loading && 'cursor-wait',
        className
    );

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
        >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {!loading && icon && iconPosition === 'left' && icon}
            {children}
            {!loading && icon && iconPosition === 'right' && icon}
        </Component>
    );
}

export default Button;