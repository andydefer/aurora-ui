import React from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Direction } from '../../types';

export interface NavigationProps extends LayoutBaseProps {
    orientation?: Direction;
    ariaLabel?: string;
    items?: Array<{ label: string; href: string }>;
    collapsible?: boolean;
}

export function Navigation({
    children,
    orientation = 'horizontal',
    ariaLabel = 'Main navigation',
    items,
    collapsible = false,
    className = '',
    style = {},
}: React.PropsWithChildren<NavigationProps>) {
    const classes = clsx(
        'flex text-primary',
        orientation === 'vertical' ? 'flex-col' : 'flex-row items-center',
        collapsible && 'flex-wrap',
        className
    );

    return (
        <nav className={classes} style={style} aria-label={ariaLabel}>
            {items ? (
                <ul className="flex gap-4 list-none">
                    {items.map((item, index) => (
                        <li key={index}>
                            <a
                                href={item.href}
                                className="text-primary hover:text-primary/80 transition-colors"
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                children
            )}
        </nav>
    );
}

export default Navigation;