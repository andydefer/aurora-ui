import React from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Spacing } from '../../types';

export interface FooterProps extends LayoutBaseProps {
    compact?: boolean;
    sticky?: boolean;
    borderTop?: boolean;
    padding?: Spacing;
}

export function Footer({
    children,
    compact = false,
    sticky = false,
    borderTop = true,
    padding = 4,
    className = '',
    style = {},
}: React.PropsWithChildren<FooterProps>) {
    const classes = clsx(
        'w-full bg-white text-primary',
        sticky && 'sticky bottom-0',
        borderTop && 'border-t border-gray-200',
        compact ? 'py-2' : 'py-4',
        padding !== undefined && `px-${padding}`,
        className
    );

    return (
        <footer className={classes} style={style}>
            {children}
        </footer>
    );
}

export default Footer;