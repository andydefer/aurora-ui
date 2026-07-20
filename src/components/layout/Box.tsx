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
}

export function Box({
    as: Component = 'div',
    padding,
    margin,
    display = 'block',
    gap,
    radius,
    className = '',
    style = {},
    children,
}: React.PropsWithChildren<BoxProps>) {
    const classes = clsx(
        display === 'flex' && 'flex',
        display === 'grid' && 'grid',
        display === 'block' && 'block',
        padding !== undefined && `p-${padding}`,
        margin !== undefined && `m-${margin}`,
        display !== 'block' && gap !== undefined && `gap-${gap}`,
        radius === 'none' && 'rounded-none',
        radius === 'sm' && 'rounded-sm',
        radius === 'md' && 'rounded-md',
        radius === 'lg' && 'rounded-lg',
        radius === 'xl' && 'rounded-xl',
        radius === 'full' && 'rounded-full',
        className
    );

    return (
        <Component className={classes} style={style}>
            {children}
        </Component>
    );
}

export default Box;