import React from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Shadow, Height } from '../../types';

export interface HeaderProps extends LayoutBaseProps {
    sticky?: boolean;
    fixed?: boolean;
    transparent?: boolean;
    height?: Height;
    shadow?: Shadow;
}

export function Header({
    children,
    sticky = false,
    fixed = false,
    transparent = false,
    height = 16,
    shadow = 'sm',
    className = '',
    style = {},
}: React.PropsWithChildren<HeaderProps>) {
    const classes = clsx(
        'w-full',
        sticky && 'sticky top-0 z-40',
        fixed && 'fixed top-0 left-0 right-0 z-50',
        transparent ? 'bg-transparent' : 'bg-white',
        shadow === 'sm' && 'shadow-sm',
        shadow === 'md' && 'shadow-md',
        shadow === 'lg' && 'shadow-lg',
        shadow === 'none' && 'shadow-none',
        typeof height === 'number' && `h-${height}`,
        height === 'auto' && 'h-auto',
        height === 'full' && 'h-full',
        height === 'screen' && 'h-screen',
        className
    );

    return (
        <header className={classes} style={style}>
            {children}
        </header>
    );
}

export default Header;