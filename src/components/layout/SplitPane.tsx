import React, { useState, useRef, useEffect } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';
import { GripVertical, GripHorizontal } from 'lucide-react';

export interface SplitPaneProps extends LayoutBaseProps {
    split?: 'vertical' | 'horizontal';
    minSize?: number;
    maxSize?: number;
    defaultSize?: number;
    onResize?: (size: number) => void;
    resizerSize?: number;
    resizerColor?: string;
    showGrip?: boolean;
    snap?: boolean;
    snapSize?: number;
}

export function SplitPane({
    children,
    split = 'vertical',
    minSize = 100,
    maxSize = 500,
    defaultSize = 250,
    onResize,
    resizerSize = 4,
    resizerColor = 'border-border bg-muted',
    showGrip = true,
    snap = false,
    snapSize = 50,
    className = '',
    style = {},
}: React.PropsWithChildren<SplitPaneProps>) {
    const [size, setSize] = useState(defaultSize);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseUp = () => {
            setIsDragging(false);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            let newSize = split === 'vertical'
                ? e.clientX - rect.left
                : e.clientY - rect.top;

            // Snap
            if (snap) {
                const snapped = Math.round(newSize / snapSize) * snapSize;
                if (Math.abs(newSize - snapped) < snapSize / 4) {
                    newSize = snapped;
                }
            }

            newSize = Math.max(minSize, Math.min(maxSize, newSize));
            setSize(newSize);
            onResize?.(newSize);
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, split, minSize, maxSize, snap, snapSize, onResize]);

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const childrenArray = React.Children.toArray(children);
    const firstChild = childrenArray[0];
    const secondChild = childrenArray[1];

    const classes = clsx(
        'flex relative overflow-hidden rounded-md',
        split === 'vertical' ? 'flex-row' : 'flex-col',
        className
    );

    const paneStyles = split === 'vertical'
        ? { width: size, flexShrink: 0, minWidth: minSize, maxWidth: maxSize }
        : { height: size, flexShrink: 0, minHeight: minSize, maxHeight: maxSize };

    const resizeClasses = clsx(
        'relative transition-colors duration-200 flex items-center justify-center',
        split === 'vertical' ? `w-${resizerSize} cursor-col-resize` : `h-${resizerSize} cursor-row-resize`,
        isDragging ? 'bg-primary' : resizerColor,
        isHovering && !isDragging && 'bg-primary/30',
        className
    );

    const gripIcon = split === 'vertical' ? GripVertical : GripHorizontal;
    const GripIcon = gripIcon;

    return (
        <div ref={containerRef} className={classes} style={style}>
            <div style={paneStyles}>
                {firstChild}
            </div>
            <div
                className={resizeClasses}
                onMouseDown={handleMouseDown}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                role="separator"
                aria-valuenow={size}
                aria-valuemin={minSize}
                aria-valuemax={maxSize}
            >
                {showGrip && (
                    <GripIcon
                        size={16}
                        className={clsx(
                            'text-muted-foreground transition-colors duration-200',
                            (isDragging || isHovering) && 'text-primary'
                        )}
                    />
                )}
            </div>
            <div className="flex-1 overflow-hidden">
                {secondChild}
            </div>
        </div>
    );
}

export default SplitPane;