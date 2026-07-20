import React from 'react';
import { clsx } from '../../utils/clsx';
import { ContainerMaxWidth, LayoutBaseProps, Spacing, Background, Radius, Shadow } from '../../types';

export interface ContainerProps extends LayoutBaseProps {
    maxWidth?: ContainerMaxWidth;
    fluid?: boolean;
    centered?: boolean;
    padding?: Spacing;
    paddingX?: Spacing;
    paddingY?: Spacing;
    as?: React.ElementType;
    background?: Background;
    border?: boolean;
    borderRadius?: Radius;
    shadow?: Shadow;
}

export function Container({
    children,
    maxWidth = 'lg',
    fluid = false,
    centered = true,
    padding = 4,
    paddingX,
    paddingY,
    as: Component = 'div',
    background = 'transparent',
    border = false,
    borderRadius = 'none',
    shadow = 'none',
    className = '',
    style = {},
}: React.PropsWithChildren<ContainerProps>) {
    const maxWidthClasses: Record<ContainerMaxWidth, string> = {
        xs: 'max-w-xs',
        sm: 'max-w-screen-sm',
        md: 'max-w-screen-md',
        lg: 'max-w-screen-lg',
        xl: 'max-w-screen-xl',
        '2xl': 'max-w-screen-2xl',
        '3xl': 'max-w-screen-3xl',
        '4xl': 'max-w-screen-4xl',
        full: 'max-w-full',
    };

    const backgroundClasses: Record<Background, string> = {
        transparent: 'bg-transparent',
        primary: 'bg-primary/5',
        secondary: 'bg-secondary/5',
        muted: 'bg-muted/10',
        card: 'bg-card',
    };

    const radiusClasses: Record<Radius, string> = {
        none: 'rounded-none',
        xs: 'rounded-xs',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl',
        '4xl': 'rounded-4xl',
        full: 'rounded-full',
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
        fluid ? 'max-w-full' : maxWidthClasses[maxWidth],
        centered && 'mx-auto',
        padding !== undefined && `px-${padding}`,
        paddingX !== undefined && `px-${paddingX}`,
        paddingY !== undefined && `py-${paddingY}`,
        backgroundClasses[background],
        border && 'border border-border',
        radiusClasses[borderRadius],
        shadowClasses[shadow],
        className
    );

    return (
        <Component className={classes} style={style}>
            {children}
        </Component>
    );
}

export default Container;