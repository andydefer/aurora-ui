import React from 'react';
import { clsx } from '../clsx';
import { LayoutBaseProps } from '../../types';

export interface ItemProps extends LayoutBaseProps {
    color?: string;
}

export function Item({
    children,
    color = 'bg-primary/10',
    className = '',
    style = {},
}: React.PropsWithChildren<ItemProps>) {
    const classes = clsx(
        'p-4 rounded-md text-center text-foreground font-medium min-w-[60px]',
        color,
        className
    );

    return (
        <div className={classes} style={style}>
            {children}
        </div>
    );
}

export default Item;