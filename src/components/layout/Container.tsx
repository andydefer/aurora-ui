import React from 'react';
import { clsx } from '../../utils/clsx';
import { ContainerMaxWidth, LayoutBaseProps, Spacing } from '../../types';

export interface ContainerProps extends LayoutBaseProps {
    maxWidth?: ContainerMaxWidth;
    fluid?: boolean;
    centered?: boolean;
    padding?: Spacing;
    paddingX?: Spacing;
    paddingY?: Spacing;
    as?: React.ElementType;
    background?: 'transparent' | 'primary' | 'secondary' | 'muted' | 'card';
    border?: boolean;
    borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
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
    const maxWidthClasses = {
        sm: 'max-w-screen-sm',
        md: 'max-w-screen-md',
        lg: 'max-w-screen-lg',
        xl: 'max-w-screen-xl',
        '2xl': 'max-w-screen-2xl',
        full: 'max-w-full',
    };

    const backgroundClasses = {
        transparent: 'bg-transparent',
        primary: 'bg-primary/5',
        secondary: 'bg-secondary/5',
        muted: 'bg-muted/10',
        card: 'bg-card',
    };

    const borderRadiusClasses = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
    };

    const shadowClasses = {
        none: 'shadow-none',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
        xl: 'shadow-xl',
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
        borderRadiusClasses[borderRadius],
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