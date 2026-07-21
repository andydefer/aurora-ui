// src/components/feedback/ToastContainer.tsx
import { ReactNode } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';
import { ToastPosition } from './Toast';

export interface ToastContainerProps extends LayoutBaseProps {
    position?: ToastPosition;
    children?: ReactNode;
    newestOnTop?: boolean;
}

export function ToastContainer({
    position = 'top-right',
    children,
    newestOnTop = true,
    className = '',
    style = {},
}: ToastContainerProps) {
    const positionClasses = {
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'top-center': 'top-4 left-1/2 -translate-x-1/2',
        'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    };

    const classes = clsx(
        'fixed z-50 flex flex-col gap-2 max-h-screen overflow-hidden pointer-events-none',
        positionClasses[position],
        newestOnTop ? 'flex-col-reverse' : 'flex-col',
        className
    );

    return (
        <div className={classes} style={style}>
            <div className="pointer-events-auto flex flex-col gap-2 max-w-sm w-full">
                {children}
            </div>
        </div>
    );
}

export default ToastContainer;