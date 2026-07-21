import React from 'react';
import { clsx } from '../../utils/clsx';
import { Display, Radius, Spacing, LayoutBaseProps } from '../../types';

export interface BoxProps extends LayoutBaseProps {
    as?: React.ElementType;
    padding?: Spacing;
    margin?: Spacing;
    display?: Display;
    gap?: Spacing;
    radius?: Radius;
    shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    border?: boolean | 'primary' | 'muted';
    hoverable?: boolean;
}

export function Box({
    as: Component = 'div',
    padding,
    margin,
    display = 'block',
    gap,
    radius,
    shadow = 'none',
    border = false,
    hoverable = false,
    className = '',
    style = {},
    children,
}: React.PropsWithChildren<BoxProps>) {
    const classes = clsx(
        'transition-all duration-200',
        display === 'flex' && 'flex',
        display === 'grid' && 'grid',
        display === 'block' && 'block',
        padding !== undefined && `p-${padding}`,
        margin !== undefined && `m-${margin}`,
        display !== 'block' && gap !== undefined && `gap-${gap}`,
        radius === 'none' && 'rounded-none',
        radius === 'sm' && 'rounded-sm',
        radius === 'md' && 'rounded-md',
        radius === 'lg' && 'rounded-md',
        radius === 'xl' && 'rounded-xl',
        radius === 'full' && 'rounded-full',
        shadow === 'sm' && 'shadow-sm',
        shadow === 'md' && 'shadow-md',
        shadow === 'lg' && 'shadow-lg',
        shadow === 'xl' && 'shadow-xl',
        border === true && 'border border-border',
        border === 'primary' && 'border border-primary/30',
        border === 'muted' && 'border border-muted/30',
        hoverable && 'hover:shadow-lg hover:scale-[1.01] cursor-pointer',
        className
    );

    return (
        <Component className={classes} style={style}>
            {children}
        </Component>
    );
}

export default Box;