import React from 'react';
import { clsx } from '../../utils/clsx';
import { Direction, Align, Justify, LayoutBaseProps, Spacing } from '../../types';

export interface FlexProps extends LayoutBaseProps {
    direction?: Direction;
    gap?: Spacing;
    wrap?: boolean;
    align?: Align;
    justify?: Justify;
    inline?: boolean;
    reverse?: boolean;
    grow?: boolean;
    shrink?: boolean;
    basis?: 'auto' | 'full' | 'half' | 'third' | 'quarter';
}

export function Flex({
    children,
    direction = 'horizontal',
    gap = 4,
    wrap = false,
    align = 'stretch',
    justify = 'start',
    inline = false,
    reverse = false,
    grow = false,
    shrink = true,
    basis,
    className = '',
    style = {},
}: React.PropsWithChildren<FlexProps>) {
    const directionMap = {
        horizontal: reverse ? 'flex-row-reverse' : 'flex-row',
        vertical: reverse ? 'flex-col-reverse' : 'flex-col',
    };

    const basisClasses = {
        auto: 'basis-auto',
        full: 'basis-full',
        half: 'basis-1/2',
        third: 'basis-1/3',
        quarter: 'basis-1/4',
    };

    const classes = clsx(
        inline ? 'inline-flex' : 'flex',
        directionMap[direction],
        gap !== undefined && `gap-${gap}`,
        wrap && 'flex-wrap',
        wrap && reverse && 'flex-wrap-reverse',
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
        grow && 'flex-grow',
        !shrink && 'flex-shrink-0',
        basis && basisClasses[basis],
        className
    );

    return (
        <div className={classes} style={style}>
            {children}
        </div>
    );
}

export default Flex;