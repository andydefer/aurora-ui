// src/components/overlay/Card.tsx
import React from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Radius, Shadow, TextColor, Size } from '../../types';

export type CardVariant = 'default' | 'outlined' | 'elevated' | 'ghost' | 'gradient' | 'glass';

export interface CardProps extends LayoutBaseProps {
    padding?: number | string;
    shadow?: Shadow;
    radius?: Radius;
    border?: boolean;
    hoverable?: boolean;
    as?: React.ElementType;
    variant?: CardVariant;
    size?: Size;
    color?: TextColor;
    gradient?: 'primary' | 'secondary' | 'success' | 'destructive' | 'warning' | 'custom';
    gradientFrom?: string;
    gradientTo?: string;
    glassBlur?: 'sm' | 'md' | 'lg';
    glassOpacity?: number;
    interactive?: boolean;
    selected?: boolean;
    disabled?: boolean;
    loading?: boolean;
    skeleton?: boolean;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    action?: React.ReactNode;
    badge?: React.ReactNode;
    image?: string;
    imageHeight?: number | string;
    imagePosition?: 'top' | 'bottom' | 'left' | 'right';
    fullHeight?: boolean;
    noPadding?: boolean;
    divider?: boolean;
    onClick?: () => void;
}

export function Card({
    children,
    padding = 6,
    shadow = 'md',
    radius = 'lg',
    border = true,
    hoverable = false,
    variant = 'default',
    size = 'md',
    color = 'primary',
    gradient = 'primary',
    gradientFrom,
    gradientTo,
    glassBlur = 'md',
    interactive = false,
    selected = false,
    disabled = false,
    loading = false,
    skeleton = false,
    header,
    footer,
    action,
    badge,
    image,
    imageHeight = '200px',
    imagePosition = 'top',
    fullHeight = false,
    noPadding = false,
    divider = true,
    onClick,
    as: Component = 'div',
    className = '',
    style = {},
}: CardProps) {
    const shadowClasses: Record<Shadow, string> = {
        none: 'shadow-none',
        xs: 'shadow-xs',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
        xl: 'shadow-xl',
        '2xl': 'shadow-2xl',
    };

    const radiusClasses: Record<Radius, string> = {
        none: 'rounded-none',
        xs: 'rounded-xs',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-md',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl',
        '4xl': 'rounded-4xl',
        full: 'rounded-full',
    };

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

    const isGlass = variant === 'glass';
    const isGradient = variant === 'gradient';

    // Classes pour le gradient
    const gradientClasses = isGradient
        ? `bg-gradient-to-br from-${gradientFrom || gradient}/20 to-${gradientTo || 'transparent'}`
        : '';

    // Classes pour le glassmorphism avec meilleur rendu light mode
    const glassClasses = isGlass
        ? clsx(
            'bg-card/70 dark:bg-card/30',
            'backdrop-blur-' + glassBlur,
            'border border-border/50 dark:border-white/10'
        )
        : '';

    const variantClasses: Record<CardVariant, string> = {
        default: 'bg-card border border-border',
        outlined: 'bg-transparent border-2 border-border hover:border-primary/50',
        elevated: 'bg-card border-none shadow-lg',
        ghost: 'bg-transparent border-none shadow-none',
        gradient: gradientClasses,
        glass: glassClasses,
    };

    const colorClasses: Record<TextColor, string> = {
        primary: 'border-primary/30',
        secondary: 'border-secondary/30',
        muted: 'border-muted/30',
        destructive: 'border-destructive/30',
        success: 'border-success/30',
        warning: 'border-warning/30',
    };

    const glassBlurClasses = {
        sm: 'backdrop-blur-sm',
        md: 'backdrop-blur-md',
        lg: 'backdrop-blur-lg',
    };

    const imagePositionClasses = {
        top: 'flex-col',
        bottom: 'flex-col-reverse',
        left: 'flex-row',
        right: 'flex-row-reverse',
    };

    const imageSizeClasses = {
        left: 'w-1/3 h-auto',
        right: 'w-1/3 h-auto',
        top: 'w-full',
        bottom: 'w-full',
    };

    const classes = clsx(
        'relative flex transition-all duration-300',
        imagePositionClasses[imagePosition],
        fullHeight && 'h-full',
        sizeClasses[size],
        variantClasses[variant],
        isGlass && glassBlurClasses[glassBlur],
        shadowClasses[shadow],
        radiusClasses[radius],
        border && !isGlass && 'border',
        variant !== 'ghost' && !isGlass && colorClasses[color],
        hoverable && 'hover:shadow-xl hover:-translate-y-1 cursor-pointer',
        interactive && 'cursor-pointer hover:ring-2 hover:ring-primary/30',
        selected && 'ring-2 ring-primary bg-primary/5',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        loading && 'opacity-70 pointer-events-none',
        skeleton && 'animate-pulse bg-muted/30',
        className
    );

    const contentClasses = clsx(
        'flex-1',
        noPadding ? 'p-0' : `p-${padding}`,
        !image && 'rounded-md'
    );

    const imageClasses = clsx(
        'object-cover',
        imageSizeClasses[imagePosition],
        imagePosition === 'top' && `rounded-t-${radius} w-full`,
        imagePosition === 'bottom' && `rounded-b-${radius} w-full`,
        imagePosition === 'left' && `rounded-l-${radius} h-full`,
        imagePosition === 'right' && `rounded-r-${radius} h-full`,
        'bg-muted/20'
    );

    const headerClasses = clsx(
        'flex items-center justify-between',
        divider && 'border-b border-border/50',
        noPadding ? 'px-6 pt-6 pb-4' : `px-${padding} pt-${padding} pb-4`,
        'mb-2'
    );

    const footerClasses = clsx(
        'flex items-center justify-between',
        divider && 'border-t border-border/50',
        noPadding ? 'px-6 pt-4 pb-6' : `px-${padding} pt-4 pb-${padding}`,
        'mt-2'
    );

    const badgeClasses = clsx(
        'absolute top-3 right-3 z-10 px-3 py-1 text-xs font-medium rounded-full',
        'bg-primary text-primary-foreground shadow-sm'
    );

    const skeletonLoader = (
        <div className="space-y-3">
            <div className="h-4 bg-muted/50 rounded w-3/4" />
            <div className="h-4 bg-muted/50 rounded w-1/2" />
            <div className="h-4 bg-muted/50 rounded w-2/3" />
            <div className="h-4 bg-muted/50 rounded w-1/3" />
        </div>
    );

    const loadingOverlay = (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-md z-20">
            <div className="flex flex-col items-center gap-2">
                <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="text-sm text-muted-foreground">Chargement...</span>
            </div>
        </div>
    );

    return (
        <Component className={classes} style={style} onClick={onClick}>
            {badge && <span className={badgeClasses}>{badge}</span>}
            {loading && loadingOverlay}

            {image && (
                <div className={clsx(
                    'overflow-hidden shrink-0',
                    imagePosition === 'top' && `rounded-t-${radius}`,
                    imagePosition === 'bottom' && `rounded-b-${radius}`,
                    imagePosition === 'left' && `rounded-l-${radius}`,
                    imagePosition === 'right' && `rounded-r-${radius}`,
                )}>
                    <img
                        src={image}
                        alt="Card image"
                        className={imageClasses}
                        style={{ height: imagePosition === 'top' || imagePosition === 'bottom' ? imageHeight : '100%' }}
                    />
                </div>
            )}

            <div className="flex-1 flex flex-col">
                {header && (
                    <div className={headerClasses}>
                        <div className="flex-1">{header}</div>
                        {action && <div className="shrink-0 ml-4">{action}</div>}
                    </div>
                )}

                <div className={contentClasses}>
                    {skeleton ? skeletonLoader : children}
                </div>

                {footer && (
                    <div className={footerClasses}>
                        {footer}
                    </div>
                )}
            </div>
        </Component>
    );
}

export default Card;