import React from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';
import { X } from 'lucide-react';

export interface DrawerProps extends LayoutBaseProps {
    open?: boolean;
    onClose?: () => void;
    anchor?: 'left' | 'right' | 'top' | 'bottom';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    backdrop?: boolean;
}

export function Drawer({
    children,
    open = false,
    onClose,
    anchor = 'left',
    size = 'md',
    backdrop = true,
    className = '',
    style = {},
}: React.PropsWithChildren<DrawerProps>) {
    const sizeClasses = {
        sm: anchor === 'top' || anchor === 'bottom' ? 'h-48' : 'w-48',
        md: anchor === 'top' || anchor === 'bottom' ? 'h-64' : 'w-64',
        lg: anchor === 'top' || anchor === 'bottom' ? 'h-80' : 'w-80',
        xl: anchor === 'top' || anchor === 'bottom' ? 'h-96' : 'w-96',
    };

    const anchorClasses = {
        left: 'left-0 top-0 h-full',
        right: 'right-0 top-0 h-full',
        top: 'top-0 left-0 w-full',
        bottom: 'bottom-0 left-0 w-full',
    };

    const classes = clsx(
        'fixed bg-white shadow-lg transition-all duration-300 z-50',
        anchorClasses[anchor],
        sizeClasses[size],
        open ? 'translate-x-0 translate-y-0' : anchor === 'left' && '-translate-x-full',
        open ? 'translate-x-0 translate-y-0' : anchor === 'right' && 'translate-x-full',
        open ? 'translate-x-0 translate-y-0' : anchor === 'top' && '-translate-y-full',
        open ? 'translate-x-0 translate-y-0' : anchor === 'bottom' && 'translate-y-full',
        className
    );

    return (
        <>
            {backdrop && open && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={onClose}
                />
            )}
            <div className={classes} style={style}>
                <div className="p-4 h-full overflow-auto">
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="float-right p-1 hover:bg-gray-100 rounded text-primary"
                            aria-label="Close drawer"
                        >
                            <X size={20} />
                        </button>
                    )}
                    {children}
                </div>
            </div>
        </>
    );
}

export default Drawer;