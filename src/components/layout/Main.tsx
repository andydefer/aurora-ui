import React from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Spacing, Background, Size } from '../../types';

export interface MainProps extends LayoutBaseProps {
    ariaLabel?: string;
    fullHeight?: boolean;
    padding?: Spacing;
    paddingX?: Spacing;
    paddingY?: Spacing;
    background?: Background;
    as?: React.ElementType;
    centered?: boolean;
    maxWidth?: Size;
}

export function Main({
    children,
    ariaLabel = 'Main content',
    fullHeight = false,
    padding = 4,
    paddingX,
    paddingY,
    background = 'transparent',
    as: Component = 'main',
    centered = false,
    maxWidth = 'full',
    className = '',
    style = {},
}: React.PropsWithChildren<MainProps>) {
    const backgroundClasses: Record<Background, string> = {
        transparent: 'bg-transparent',
        primary: 'bg-primary/5',
        secondary: 'bg-secondary/5',
        muted: 'bg-muted/10',
        card: 'bg-card',
    };

    const maxWidthClasses: Record<Size, string> = {
        xs: 'max-w-xs',
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        full: 'max-w-full',
    };

    const classes = clsx(
        'flex-1 w-full',
        fullHeight && 'min-h-screen',
        backgroundClasses[background],
        centered && 'flex flex-col items-center justify-center',
        padding !== undefined && `p-${padding}`,
        paddingX !== undefined && `px-${paddingX}`,
        paddingY !== undefined && `py-${paddingY}`,
        className
    );

    const contentClasses = clsx(
        'w-full mx-auto',
        maxWidthClasses[maxWidth]
    );

    return (
        <Component className={classes} style={style} aria-label={ariaLabel}>
            <div className={contentClasses}>
                {children}
            </div>
        </Component>
    );
}

export default Main;