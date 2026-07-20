import React from 'react';
import { clsx } from '../../utils/clsx';
import { ContainerMaxWidth, LayoutBaseProps, Spacing } from '../../types';

export interface ContainerProps extends LayoutBaseProps {
    maxWidth?: ContainerMaxWidth;
    fluid?: boolean;
    centered?: boolean;
    padding?: Spacing;
}

export function Container({
    children,
    maxWidth = 'lg',
    fluid = false,
    centered = true,
    padding = 4,
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

    const classes = clsx(
        'w-full',
        fluid ? 'max-w-full' : maxWidthClasses[maxWidth],
        centered && 'mx-auto',
        padding !== undefined && `px-${padding}`,
        className
    );

    return (
        <div className={classes} style={style}>
            {children}
        </div>
    );
}

export default Container;