import React from 'react';
import { clsx } from '../../utils/clsx';
import { GridColumns, LayoutBaseProps, Spacing, Align, Justify } from '../../types';

export interface GridProps extends LayoutBaseProps {
    columns?: GridColumns;
    gap?: Spacing;
    gapX?: Spacing;
    gapY?: Spacing;
    align?: Align;
    justify?: Justify;
    autoRows?: boolean;
    autoCols?: boolean;
    flow?: 'row' | 'col' | 'dense' | 'row-dense' | 'col-dense';
    as?: React.ElementType;
}

export function Grid({
    children,
    columns = 2,
    gap = 4,
    gapX,
    gapY,
    align = 'stretch',
    justify = 'start',
    autoRows = false,
    autoCols = false,
    flow,
    as: Component = 'div',
    className = '',
    style = {},
}: React.PropsWithChildren<GridProps>) {
    const alignClasses: Record<Align, string> = {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
    };

    const justifyClasses: Record<Justify, string> = {
        start: 'justify-items-start',
        center: 'justify-items-center',
        end: 'justify-items-end',
        stretch: 'justify-items-stretch',
        between: 'justify-items-between',
        around: 'justify-items-around',
        evenly: 'justify-items-evenly',
    };

    const flowClasses: Record<string, string> = {
        row: 'grid-flow-row',
        col: 'grid-flow-col',
        dense: 'grid-flow-dense',
        'row-dense': 'grid-flow-row-dense',
        'col-dense': 'grid-flow-col-dense',
    };

    const classes = clsx(
        'grid w-full',
        `grid-cols-${columns}`,
        gap !== undefined && `gap-${gap}`,
        gapX !== undefined && `gap-x-${gapX}`,
        gapY !== undefined && `gap-y-${gapY}`,
        alignClasses[align],
        justifyClasses[justify],
        autoRows && 'auto-rows-auto',
        autoCols && 'auto-cols-auto',
        flow && flowClasses[flow],
        className
    );

    return (
        <Component className={classes} style={style}>
            {children}
        </Component>
    );
}

export default Grid;