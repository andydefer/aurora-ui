import React from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Shadow, Height, Background, Spacing } from '../../types';

export interface HeaderProps extends LayoutBaseProps {
    sticky?: boolean;
    fixed?: boolean;
    transparent?: boolean;
    height?: Height;
    shadow?: Shadow;
    background?: Background;
    borderBottom?: boolean;
    as?: React.ElementType;
    padding?: Spacing;
    rounded?: boolean;
    glassmorphism?: boolean;
    blur?: boolean;
}

export function Header({
    children,
    sticky = false,
    fixed = false,
    transparent = false,
    height = 16,
    shadow = 'sm',
    background = 'card',
    borderBottom = true,
    as: Component = 'header',
    padding = 4,
    rounded = false,
    glassmorphism = false,
    blur = false,
    className = '',
    style = {},
}: React.PropsWithChildren<HeaderProps>) {
    const backgroundClasses: Record<Background, string> = {
        transparent: 'bg-transparent',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        muted: 'bg-muted text-muted-foreground',
        card: 'bg-card text-foreground',
    };

    const shadowClasses: Record<Shadow, string> = {
        none: 'shadow-none',
        xs: 'shadow-xs',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
        xl: 'shadow-xl',
        '2xl': 'shadow-2xl',
    };

    const heightClasses = {
        auto: 'h-auto',
        full: 'h-full',
        screen: 'h-screen',
    };

    const classes = clsx(
        'w-full transition-all duration-300 ease-in-out',
        transparent ? 'bg-transparent' : backgroundClasses[background],
        shadowClasses[shadow],
        sticky && 'sticky top-0 z-40',
        fixed && 'fixed top-0 left-0 right-0 z-50',
        borderBottom && 'border-b border-border/50',
        rounded && 'rounded-md',
        typeof height === 'number' && `h-${height}`,
        typeof height === 'string' && heightClasses[height as keyof typeof heightClasses],
        padding !== undefined && `px-${padding}`,
        padding !== undefined && `py-${padding}`,
        glassmorphism && 'backdrop-blur-xl bg-white/70 dark:bg-black/70 border border-white/20 dark:border-white/10',
        blur && 'backdrop-blur-md',
        className
    );

    return (
        <Component className={classes} style={style}>
            <div className="container mx-auto flex items-center justify-between">
                {children}
            </div>
        </Component>
    );
}

export default Header;