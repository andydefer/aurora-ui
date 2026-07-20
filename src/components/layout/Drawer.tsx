import React, { useState, useEffect, useRef } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Size, Radius } from '../../types';
import { X } from 'lucide-react';

export interface DrawerProps extends LayoutBaseProps {
    open?: boolean;
    onClose?: () => void;
    anchor?: 'left' | 'right' | 'top' | 'bottom';
    size?: Size;
    title?: string;
    backdrop?: boolean;
    showCloseButton?: boolean;
    closeOnBackdrop?: boolean;
    hideHeader?: boolean;
    radius?: Radius;
    overlayClassName?: string;
    headerClassName?: string;
    bodyClassName?: string;
}

export function Drawer({
    children,
    open = false,
    onClose,
    anchor = 'right',
    size = 'md',
    title,
    backdrop = true,
    showCloseButton = true,
    closeOnBackdrop = true,
    hideHeader = false,
    radius = 'xs',
    overlayClassName = '',
    headerClassName = '',
    bodyClassName = '',
    className = '',
    style = {},
}: React.PropsWithChildren<DrawerProps>) {
    const [isClosing, setIsClosing] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open) {
            setIsVisible(true);
            setIsClosing(false);
            document.body.style.overflow = 'hidden';
        } else {
            if (isVisible) {
                setIsClosing(true);
                const timer = setTimeout(() => {
                    setIsVisible(false);
                    setIsClosing(false);
                    document.body.style.overflow = '';
                }, 300);
                return () => clearTimeout(timer);
            }
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open, isVisible]);

    const sizeClasses = {
        xs: anchor === 'top' || anchor === 'bottom' ? 'h-32' : 'w-32 max-w-xs',
        sm: anchor === 'top' || anchor === 'bottom' ? 'h-48' : 'w-48 max-w-sm',
        md: anchor === 'top' || anchor === 'bottom' ? 'h-64' : 'w-64 max-w-md',
        lg: anchor === 'top' || anchor === 'bottom' ? 'h-80' : 'w-80 max-w-lg',
        xl: anchor === 'top' || anchor === 'bottom' ? 'h-96' : 'w-96 max-w-xl',
        '2xl': anchor === 'top' || anchor === 'bottom' ? 'h-[40vh]' : 'w-[40vw] max-w-2xl',
        '3xl': anchor === 'top' || anchor === 'bottom' ? 'h-[60vh]' : 'w-[60vw] max-w-3xl',
        '4xl': anchor === 'top' || anchor === 'bottom' ? 'h-[80vh]' : 'w-[80vw] max-w-4xl',
        full: anchor === 'top' || anchor === 'bottom' ? 'h-[90vh]' : 'w-[90vw] max-w-full',
    };

    const anchorClasses = {
        left: 'left-0 top-0 h-full',
        right: 'right-0 top-0 h-full',
        top: 'top-0 left-0 w-full',
        bottom: 'bottom-0 left-0 w-full',
    };

    const transformClasses = {
        left: open && !isClosing ? 'translate-x-0' : '-translate-x-full',
        right: open && !isClosing ? 'translate-x-0' : 'translate-x-full',
        top: open && !isClosing ? 'translate-y-0' : '-translate-y-full',
        bottom: open && !isClosing ? 'translate-y-0' : 'translate-y-full',
    };

    const radiusClasses = {
        none: '',
        xs: anchor === 'left' ? 'rounded-r-xs' : anchor === 'right' ? 'rounded-l-xs' : anchor === 'top' ? 'rounded-b-xs' : 'rounded-t-xs',
        sm: anchor === 'left' ? 'rounded-r-sm' : anchor === 'right' ? 'rounded-l-sm' : anchor === 'top' ? 'rounded-b-sm' : 'rounded-t-sm',
        md: anchor === 'left' ? 'rounded-r-md' : anchor === 'right' ? 'rounded-l-md' : anchor === 'top' ? 'rounded-b-md' : 'rounded-t-md',
        lg: anchor === 'left' ? 'rounded-r-lg' : anchor === 'right' ? 'rounded-l-lg' : anchor === 'top' ? 'rounded-b-lg' : 'rounded-t-lg',
        xl: anchor === 'left' ? 'rounded-r-xl' : anchor === 'right' ? 'rounded-l-xl' : anchor === 'top' ? 'rounded-b-xl' : 'rounded-t-xl',
        '2xl': anchor === 'left' ? 'rounded-r-2xl' : anchor === 'right' ? 'rounded-l-2xl' : anchor === 'top' ? 'rounded-b-2xl' : 'rounded-t-2xl',
        '3xl': anchor === 'left' ? 'rounded-r-3xl' : anchor === 'right' ? 'rounded-l-3xl' : anchor === 'top' ? 'rounded-b-3xl' : 'rounded-t-3xl',
        '4xl': anchor === 'left' ? 'rounded-r-4xl' : anchor === 'right' ? 'rounded-l-4xl' : anchor === 'top' ? 'rounded-b-4xl' : 'rounded-t-4xl',
        full: anchor === 'left' ? 'rounded-r-full' : anchor === 'right' ? 'rounded-l-full' : anchor === 'top' ? 'rounded-b-full' : 'rounded-t-full',
    };

    const classes = clsx(
        'fixed bg-card shadow-2xl transition-transform duration-300 ease-in-out z-50 flex flex-col',
        anchorClasses[anchor],
        sizeClasses[size],
        transformClasses[anchor],
        radiusClasses[radius],
        className
    );

    const handleClose = () => {
        if (closeOnBackdrop) {
            setIsClosing(true);
            setTimeout(() => {
                onClose?.();
                setIsClosing(false);
            }, 300);
        }
    };

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    if (!isVisible && !isClosing) {
        return null;
    }

    return (
        <>
            {backdrop && (
                <div
                    className={clsx(
                        'fixed inset-0 z-40 transition-opacity duration-300',
                        open && !isClosing ? 'opacity-100' : 'opacity-0 pointer-events-none',
                        overlayClassName
                    )}
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                    onClick={handleClose}
                />
            )}
            <div
                className={classes}
                style={style}
                onClick={handleContentClick}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? 'drawer-title' : undefined}
            >
                {!hideHeader && (
                    <div
                        className={clsx(
                            'flex items-center justify-between border-b border-border px-6 py-4 shrink-0',
                            headerClassName
                        )}
                    >
                        {title && (
                            <h2 id="drawer-title" className="text-xl font-bold text-foreground">
                                {title}
                            </h2>
                        )}
                        {showCloseButton && (
                            <button
                                onClick={() => {
                                    setIsClosing(true);
                                    setTimeout(() => {
                                        onClose?.();
                                        setIsClosing(false);
                                    }, 300);
                                }}
                                className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground shrink-0"
                                aria-label="Close"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                )}
                <div
                    ref={contentRef}
                    className={clsx(
                        'flex-1 overflow-y-auto overscroll-contain',
                        !hideHeader && 'pt-4',
                        bodyClassName
                    )}
                    style={{
                        maxHeight: anchor === 'top' || anchor === 'bottom' ? undefined : '100%',
                    }}
                >
                    <div className="px-4 pb-4">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Drawer;