import React from 'react';
import { clsx } from '../../utils/clsx';
import { Direction, Align, Justify, LayoutBaseProps, Spacing } from '../../types';

export interface FlexProps extends LayoutBaseProps {
    direction?: Direction;
    gap?: Spacing;
    wrap?: boolean;
    align?: Align;
    justify?: Justify;
}

export function Flex({
    children,
    direction = 'horizontal',
    gap = 4,
    wrap = false,
    align = 'stretch',
    justify = 'start',
    className = '',
    style = {},
}: React.PropsWithChildren<FlexProps>) {
    const classes = clsx(
        'flex',
        direction === 'vertical' ? 'flex-col' : 'flex-row',
        gap !== undefined && `gap-${gap}`,
        wrap && 'flex-wrap',
        align === 'start' && 'items-start',
        align === 'center' && 'items-center',
        align === 'end' && 'items-end',
        align === 'stretch' && 'items-stretch',
        justify === 'start' && 'justify-start',
        justify === 'center' && 'justify-center',
        justify === 'end' && 'justify-end',
        justify === 'between' && 'justify-between',
        justify === 'around' && 'justify-around',
        justify === 'evenly' && 'justify-evenly',
        className
    );

    return (
        <div className={classes} style={style}>
            {children}
        </div>
    );
}

export default Flex;