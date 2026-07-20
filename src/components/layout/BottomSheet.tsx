import React, { useState, useEffect, useRef } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';
import { X, GripVertical } from 'lucide-react';

export interface BottomSheetProps extends LayoutBaseProps {
    open?: boolean;
    onClose?: () => void;
    height?: 'auto' | 'half' | 'full';
    draggable?: boolean;
    snapPoints?: number[];
    title?: string;
    showHandle?: boolean;
    closeOnBackdrop?: boolean;
    maxWidth?: string | number;
}

export function BottomSheet({
    children,
    open = false,
    onClose,
    height = 'half',
    draggable = true,
    snapPoints,
    title,
    showHandle = true,
    closeOnBackdrop = true,
    maxWidth = '750px',
    className = '',
    style = {},
}: React.PropsWithChildren<BottomSheetProps>) {
    const [currentHeight, setCurrentHeight] = useState(height);
    const [dragStartY, setDragStartY] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (snapPoints && snapPoints.length > 0) {
            const snapHeight = snapPoints[0];
            if (snapHeight <= 100) {
                setCurrentHeight('half');
            } else if (snapHeight >= 90) {
                setCurrentHeight('full');
            } else {
                setCurrentHeight('auto');
            }
        }
    }, [snapPoints]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && open) {
                onClose?.();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [open, onClose]);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    const heightClasses = {
        auto: 'h-auto max-h-[90vh]',
        half: 'h-1/2 min-h-[40vh]',
        full: 'h-[90vh] min-h-[80vh]',
    };

    const maxWidthStyle = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;

    const classes = clsx(
        'fixed bottom-0 bg-card rounded-t-2xl shadow-2xl transition-transform duration-300 ease-out z-50',
        heightClasses[currentHeight as keyof typeof heightClasses],
        open ? 'translate-y-0' : 'translate-y-full',
        className
    );

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        if (!draggable) return;
        setIsDragging(true);
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        setDragStartY(clientY);
        document.addEventListener('mousemove', handleDragMove);
        document.addEventListener('mouseup', handleDragEnd);
        document.addEventListener('touchmove', handleDragMoveTouch);
        document.addEventListener('touchend', handleDragEndTouch);
    };

    const handleDragMove = (e: MouseEvent) => {
        if (!isDragging) return;
        const diff = dragStartY - e.clientY;
        setDragOffset(Math.max(0, diff));
    };

    const handleDragMoveTouch = (e: TouchEvent) => {
        if (!isDragging) return;
        const diff = dragStartY - e.touches[0].clientY;
        setDragOffset(Math.max(0, diff));
    };

    const handleDragEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('mouseup', handleDragEnd);
        document.removeEventListener('touchmove', handleDragMoveTouch);
        document.removeEventListener('touchend', handleDragEndTouch);
        if (dragOffset > 80) {
            onClose?.();
        }
        setDragOffset(0);
    };

    const handleDragEndTouch = () => {
        if (!isDragging) return;
        setIsDragging(false);
        document.removeEventListener('touchmove', handleDragMoveTouch);
        document.removeEventListener('touchend', handleDragEndTouch);
        if (dragOffset > 80) {
            onClose?.();
        }
        setDragOffset(0);
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && closeOnBackdrop) {
            onClose?.();
        }
    };

    if (!open) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-40"
                onClick={handleBackdropClick}
            />
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-full flex justify-center">
                <div
                    className={classes}
                    style={{
                        maxWidth: maxWidthStyle,
                        width: '100%',
                        pointerEvents: 'auto',
                        ...style,
                        transform: isDragging && dragOffset > 0
                            ? `translateY(-${Math.min(dragOffset, 150)}px)`
                            : style.transform,
                    }}
                >
                    {/* Handle */}
                    {showHandle && (
                        <div
                            className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing hover:bg-primary/5 transition-colors rounded-t-2xl touch-none select-none"
                            onMouseDown={handleDragStart}
                            onTouchStart={handleDragStart}
                        >
                            <GripVertical size={20} className="text-muted-foreground" />
                        </div>
                    )}

                    {/* Header */}
                    {(title || onClose) && (
                        <div className="flex items-center justify-between px-4 pb-3 border-b border-border shrink-0">
                            {title && (
                                <h2 className="text-lg font-semibold text-foreground">
                                    {title}
                                </h2>
                            )}
                            {onClose && (
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground shrink-0"
                                    aria-label="Close"
                                >
                                    <X size={20} />
                                </button>
                            )}
                        </div>
                    )}

                    {/* Content */}
                    <div
                        ref={contentRef}
                        className="p-4 overflow-y-auto overscroll-contain flex-1"
                        style={{
                            maxHeight: 'calc(90vh - 6rem)',
                        }}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}

export default BottomSheet;