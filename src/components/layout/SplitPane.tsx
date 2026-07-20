import React, { useState, useRef } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';

export interface SplitPaneProps extends LayoutBaseProps {
    split?: 'vertical' | 'horizontal';
    minSize?: number;
    maxSize?: number;
    defaultSize?: number;
    onResize?: (size: number) => void;
}

export function SplitPane({
    children,
    split = 'vertical',
    minSize = 100,
    maxSize = 500,
    defaultSize = 250,
    onResize,
    className = '',
    style = {},
}: React.PropsWithChildren<SplitPaneProps>) {
    const [size, setSize] = useState(defaultSize);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = () => {
        setIsDragging(true);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        let newSize = split === 'vertical'
            ? e.clientX - rect.left
            : e.clientY - rect.top;

        newSize = Math.max(minSize, Math.min(maxSize, newSize));
        setSize(newSize);
        onResize?.(newSize);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const childrenArray = React.Children.toArray(children);
    const firstChild = childrenArray[0];
    const secondChild = childrenArray[1];

    const classes = clsx(
        'flex',
        split === 'vertical' ? 'flex-row' : 'flex-col',
        className
    );

    const paneStyles = split === 'vertical'
        ? { width: size, flexShrink: 0 }
        : { height: size, flexShrink: 0 };

    const resizeClasses = clsx(
        'bg-gray-200 hover:bg-gray-300 transition-colors',
        split === 'vertical' ? 'w-1 cursor-col-resize' : 'h-1 cursor-row-resize',
        isDragging && 'bg-primary'
    );

    return (
        <div ref={containerRef} className={classes} style={style}>
            <div style={paneStyles}>
                {firstChild}
            </div>
            <div
                className={resizeClasses}
                onMouseDown={handleMouseDown}
            />
            <div className="flex-1">
                {secondChild}
            </div>
        </div>
    );
}

export default SplitPane;