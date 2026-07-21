import React from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, TextColor } from '../../types';

export interface LinkProps extends LayoutBaseProps {
    href?: string;
    target?: '_blank' | '_self' | '_parent' | '_top';
    rel?: string;
    download?: boolean | string;
    active?: boolean;
    underline?: boolean;
    color?: TextColor;
    variant?: 'default' | 'subtle' | 'ghost';
    as?: React.ElementType;
}

export function Link({
    children,
    href,
    target,
    rel,
    download,
    active = false,
    underline = true,
    color = 'primary',
    variant = 'default',
    as: Component = 'a',
    className = '',
    style = {},
}: React.PropsWithChildren<LinkProps>) {
    const colorClasses: Record<TextColor, string> = {
        primary: 'text-foreground hover:text-primary',
        secondary: 'text-secondary hover:text-primary',
        muted: 'text-muted-foreground hover:text-primary',
        destructive: 'text-destructive hover:text-destructive/80',
        success: 'text-success hover:text-success/80',
        warning: 'text-warning hover:text-warning/80',
    };

    const variantClasses = {
        default: 'font-medium',
        subtle: 'font-normal text-muted-foreground hover:text-foreground',
        ghost: 'font-normal hover:bg-muted/20 px-2 py-1 rounded-md transition-colors',
    };

    const classes = clsx(
        'transition-all duration-200 cursor-pointer',
        colorClasses[color],
        variantClasses[variant],
        underline && 'hover:underline',
        active && 'text-primary font-semibold',
        className
    );

    const relProp = target === '_blank' ? (rel || 'noopener noreferrer') : rel;

    return (
        <Component
            href={href}
            target={target}
            rel={relProp}
            download={download}
            className={classes}
            style={style}
        >
            {children}
        </Component>
    );
}

export default Link;