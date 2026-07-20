import React from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Spacing } from '../../types';

export interface MainProps extends LayoutBaseProps {
    ariaLabel?: string;
    fullHeight?: boolean;
    padding?: Spacing;
}

export function Main({
    children,
    ariaLabel = 'Main content',
    fullHeight = false,
    padding = 4,
    className = '',
    style = {},
}: React.PropsWithChildren<MainProps>) {
    const classes = clsx(
        'flex-1',
        fullHeight && 'min-h-screen',
        padding !== undefined && `p-${padding}`,
        className
    );

    return (
        <main className={classes} style={style} aria-label={ariaLabel}>
            {children}
        </main>
    );
}

export default Main;