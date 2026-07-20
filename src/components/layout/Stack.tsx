import React from 'react';
import { clsx } from '../../utils/clsx';
import { Direction, Align, Justify, LayoutBaseProps, Spacing } from '../../types';

export interface StackProps extends LayoutBaseProps {
    direction?: Direction;
    spacing?: Spacing;
    wrap?: boolean;
    align?: Align;
    justify?: Justify;
    reverse?: boolean;
    inline?: boolean;
    divider?: React.ReactNode;
    as?: React.ElementType;
    grow?: boolean;
    shrink?: boolean;
}

export function Stack({
    children,
    direction = 'vertical',
    spacing = 4,
    wrap = false,
    align = 'stretch',
    justify = 'start',
    reverse = false,
    inline = false,
    divider,
    as: Component = 'div',
    grow = false,
    shrink = true,
    className = '',
    style = {},
}: React.PropsWithChildren<StackProps>) {
    const directionMap = {
        vertical: reverse ? 'flex-col-reverse' : 'flex-col',
        horizontal: reverse ? 'flex-row-reverse' : 'flex-row',
    };

    const classes = clsx(
        inline ? 'inline-flex' : 'flex',
        directionMap[direction],
        spacing !== undefined && `gap-${spacing}`,
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
        className
    );

    const childrenArray = React.Children.toArray(children);
    const totalChildren = childrenArray.length;

    return (
        <Component className={classes} style={style}>
            {childrenArray.map((child, index) => (
                <React.Fragment key={index}>
                    {child}
                    {divider && index < totalChildren - 1 && (
                        <span className="shrink-0">{divider}</span>
                    )}
                </React.Fragment>
            ))}
        </Component>
    );
}

export default Stack;