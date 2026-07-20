import React from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface SidebarProps extends LayoutBaseProps {
    position?: 'left' | 'right';
    width?: 'sm' | 'md' | 'lg';
    collapsible?: boolean;
    open?: boolean;
    onToggle?: () => void;
}

export function Sidebar({
    children,
    position = 'left',
    width = 'md',
    collapsible = false,
    open = true,
    onToggle,
    className = '',
    style = {},
}: React.PropsWithChildren<SidebarProps>) {
    const widthClasses = {
        sm: 'w-48',
        md: 'w-64',
        lg: 'w-80',
    };

    const classes = clsx(
        'bg-white border-r border-gray-200 h-full transition-all duration-300 text-primary',
        position === 'right' && 'border-l border-r-0',
        widthClasses[width],
        collapsible && !open && 'w-0 overflow-hidden',
        className
    );

    return (
        <aside className={classes} style={style}>
            {collapsible && onToggle && (
                <button
                    onClick={onToggle}
                    className="absolute top-2 right-2 p-1 rounded hover:bg-gray-100 text-primary"
                    aria-label="Toggle sidebar"
                >
                    {open ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
            )}
            {open && children}
        </aside>
    );
}

export default Sidebar;