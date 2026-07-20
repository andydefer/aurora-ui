import React from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Spacing, Shadow, Background } from '../../types';

export interface FooterProps extends LayoutBaseProps {
    compact?: boolean;
    sticky?: boolean;
    fixed?: boolean;
    borderTop?: boolean;
    borderBottom?: boolean;
    padding?: Spacing;
    paddingX?: Spacing;
    paddingY?: Spacing;
    shadow?: Shadow;
    background?: Background;
    as?: React.ElementType;
}

export function Footer({
    children,
    compact = false,
    sticky = false,
    fixed = false,
    borderTop = true,
    borderBottom = false,
    padding = 4,
    paddingX,
    paddingY,
    shadow = 'none',
    background = 'card',
    as: Component = 'footer',
    className = '',
    style = {},
}: React.PropsWithChildren<FooterProps>) {
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

    const classes = clsx(
        'w-full transition-all duration-200',
        backgroundClasses[background],
        shadowClasses[shadow],
        sticky && 'sticky bottom-0 z-30',
        fixed && 'fixed bottom-0 left-0 right-0 z-50',
        borderTop && 'border-t border-border',
        borderBottom && 'border-b border-border',
        compact ? 'py-2' : 'py-4',
        padding !== undefined && `px-${padding}`,
        paddingX !== undefined && `px-${paddingX}`,
        paddingY !== undefined && `py-${paddingY}`,
        className
    );

    return (
        <Component className={classes} style={style}>
            <div className="container mx-auto">
                {children}
            </div>
        </Component>
    );
}

export default Footer;