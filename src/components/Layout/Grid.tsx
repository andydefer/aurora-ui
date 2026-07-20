import React from 'react';
import { clsx } from '../../utils/clsx';
import { GridColumns, LayoutBaseProps, Spacing } from '../../types';

export interface GridProps extends LayoutBaseProps {
    columns?: GridColumns;
    gap?: Spacing;
}

export function Grid({
    children,
    columns = 2,
    gap = 4,
    className = '',
    style = {},
}: React.PropsWithChildren<GridProps>) {
    const classes = clsx(
        'grid',
        `grid-cols-${columns}`,
        gap !== undefined && `gap-${gap}`,
        className
    );

    return (
        <div className={classes} style={style}>
            {children}
        </div>
    );
}

export default Grid;