import React, { useState, useEffect } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';
import { X } from 'lucide-react';

export interface BottomSheetProps extends LayoutBaseProps {
    open?: boolean;
    onClose?: () => void;
    height?: 'auto' | 'half' | 'full';
    draggable?: boolean;
    snapPoints?: number[];
}

export function BottomSheet({
    children,
    open = false,
    onClose,
    height = 'half',
    draggable = false,
    snapPoints,
    className = '',
    style = {},
}: React.PropsWithChildren<BottomSheetProps>) {
    const [currentHeight, setCurrentHeight] = useState(height);
    const [dragStartY, setDragStartY] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);

    useEffect(() => {
        if (snapPoints && snapPoints.length > 0) {
            // Use snapPoints to determine height
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

    const heightClasses = {
        auto: 'h-auto max-h-[90vh]',
        half: 'h-1/2',
        full: 'h-[90vh]',
    };

    const classes = clsx(
        'fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg transition-transform duration-300 z-50',
        heightClasses[currentHeight as keyof typeof heightClasses],
        open ? 'translate-y-0' : 'translate-y-full',
        className
    );

    const handleDragStart = (e: React.MouseEvent) => {
        if (!draggable) return;
        setDragStartY(e.clientY);
        document.addEventListener('mousemove', handleDragMove);
        document.addEventListener('mouseup', handleDragEnd);
    };

    const handleDragMove = (e: MouseEvent) => {
        if (!draggable) return;
        const diff = dragStartY - e.clientY;
        setDragOffset(diff);
    };

    const handleDragEnd = () => {
        if (!draggable) return;
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('mouseup', handleDragEnd);
        setDragOffset(0);
    };

    return (
        <>
            {open && (
                <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
            )}
            <div
                className={classes}
                style={{
                    ...style,
                    transform: draggable && dragOffset > 0
                        ? `translateY(-${dragOffset}px)`
                        : style.transform,
                }}
            >
                {draggable && (
                    <div
                        className="flex justify-center pt-2 pb-4 cursor-grab active:cursor-grabbing"
                        onMouseDown={handleDragStart}
                    >
                        <div className="w-12 h-1 bg-gray-300 rounded-full" />
                    </div>
                )}
                <div className="p-4 overflow-auto max-h-[calc(90vh-2rem)]">
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="float-right p-1 hover:bg-gray-100 rounded text-primary"
                            aria-label="Close"
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

export default BottomSheet;