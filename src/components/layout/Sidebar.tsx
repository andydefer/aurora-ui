import React from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Background, Size } from '../../types';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface SidebarProps extends LayoutBaseProps {
    position?: 'left' | 'right';
    width?: Size;
    collapsible?: boolean;
    open?: boolean;
    onToggle?: () => void;
    onClose?: () => void;
    background?: Background;
    border?: boolean;
    overlay?: boolean;
    closeOnOverlay?: boolean;
    title?: string;
    header?: React.ReactNode;
    footer?: React.ReactNode;
}

export function Sidebar({
    children,
    position = 'left',
    width = 'md',
    collapsible = false,
    open = true,
    onToggle,
    onClose,
    background = 'card',
    border = true,
    overlay = false,
    closeOnOverlay = true,
    title,
    header,
    footer,
    className = '',
    style = {},
}: React.PropsWithChildren<SidebarProps>) {
    const backgroundClasses: Record<Background, string> = {
        transparent: 'bg-transparent',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        muted: 'bg-muted text-muted-foreground',
        card: 'bg-card text-foreground',
    };

    const widthClasses: Record<Size, string> = {
        xs: 'w-40',
        sm: 'w-48',
        md: 'w-64',
        lg: 'w-80',
        xl: 'w-96',
        '2xl': 'w-[400px]',
        '3xl': 'w-[480px]',
        '4xl': 'w-[560px]',
        full: 'w-full',
    };

    const positionClasses = {
        left: 'left-0 top-0',
        right: 'right-0 top-0',
    };

    const borderClasses = {
        left: 'border-r border-border',
        right: 'border-l border-border',
    };

    const transformClasses = {
        left: open ? 'translate-x-0' : '-translate-x-full',
        right: open ? 'translate-x-0' : 'translate-x-full',
    };

    const classes = clsx(
        'fixed h-full transition-all duration-300 ease-in-out z-40',
        'flex flex-col',
        positionClasses[position],
        widthClasses[width],
        backgroundClasses[background],
        border && borderClasses[position],
        transformClasses[position],
        collapsible && !open && 'w-0 overflow-hidden',
        className
    );

    const handleOverlayClick = () => {
        if (closeOnOverlay && onClose) {
            onClose();
        }
    };

    return (
        <>
            {overlay && open && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 transition-opacity duration-300"
                    onClick={handleOverlayClick}
                />
            )}
            <aside className={classes} style={style}>
                {/* Header */}
                {(title || header || onClose) && (
                    <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
                        {header ? (
                            header
                        ) : title ? (
                            <h2 className="text-lg font-bold text-foreground">{title}</h2>
                        ) : (
                            <div />
                        )}
                        {onClose && (
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-muted/20 transition-colors text-muted-foreground hover:text-foreground"
                                aria-label="Close sidebar"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="p-4 border-t border-border shrink-0">
                        {footer}
                    </div>
                )}

                {/* Toggle Button */}
                {collapsible && onToggle && (
                    <button
                        onClick={onToggle}
                        className={clsx(
                            'absolute top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-card border border-border shadow-md hover:bg-muted/20 transition-all duration-300',
                            position === 'left' ? '-right-3' : '-left-3'
                        )}
                        aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
                    >
                        {position === 'left' ? (
                            open ? <ChevronLeft size={16} /> : <ChevronRight size={16} />
                        ) : (
                            open ? <ChevronRight size={16} /> : <ChevronLeft size={16} />
                        )}
                    </button>
                )}
            </aside>
        </>
    );
}

export default Sidebar;