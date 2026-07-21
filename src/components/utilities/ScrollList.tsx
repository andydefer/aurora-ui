// src/components/utilities/ScrollList.tsx
import { ReactNode, useRef, useEffect, useState } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, TextColor } from '../../types';

export type ScrollListDirection = 'vertical' | 'horizontal';
export type ScrollListVariant = 'default' | 'bordered' | 'elevated' | 'ghost';

export interface ScrollListProps extends LayoutBaseProps {
    children: ReactNode;
    direction?: ScrollListDirection;
    variant?: ScrollListVariant;
    color?: TextColor;
    maxHeight?: number | string;
    maxWidth?: number | string;
    showScrollbar?: boolean;
    autoHideScrollbar?: boolean;
    smoothScroll?: boolean;
    snapScroll?: boolean;
    snapAlign?: 'start' | 'center' | 'end' | 'none';
    gap?: number;
    padding?: number;
    className?: string;
    hideScrollbar?: boolean;
}

export function ScrollList({
    children,
    direction = 'vertical',
    variant = 'default',
    color = 'primary',
    maxHeight = '400px',
    maxWidth = '100%',
    showScrollbar = true,
    autoHideScrollbar = false,
    smoothScroll = true,
    snapScroll = false,
    snapAlign = 'start',
    gap = 4,
    padding = 4,
    className = '',
    style = {},
    hideScrollbar = false,
}: ScrollListProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    const isVertical = direction === 'vertical';

    const variantClasses = {
        default: 'bg-card border border-border rounded-md',
        bordered: 'border-2 border-border rounded-xl bg-card shadow-sm',
        elevated: 'bg-card rounded-xl shadow-lg',
        ghost: 'bg-transparent rounded-md',
    };

    const colorClasses: Record<TextColor, string> = {
        primary: 'scrollbar-thumb-primary/50 hover:scrollbar-thumb-primary',
        secondary: 'scrollbar-thumb-secondary/50 hover:scrollbar-thumb-secondary',
        muted: 'scrollbar-thumb-muted/50 hover:scrollbar-thumb-muted',
        destructive: 'scrollbar-thumb-destructive/50 hover:scrollbar-thumb-destructive',
        success: 'scrollbar-thumb-success/50 hover:scrollbar-thumb-success',
        warning: 'scrollbar-thumb-warning/50 hover:scrollbar-thumb-warning',
    };

    const handleScroll = () => {
        const container = containerRef.current;
        if (!container) return;

        setIsScrolling(true);
        clearTimeout((container as any).scrollTimeout);
        (container as any).scrollTimeout = setTimeout(() => {
            setIsScrolling(false);
        }, 1000);

        const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } = container;
        const maxScroll = isVertical ? scrollHeight - clientHeight : scrollWidth - clientWidth;
        const currentScroll = isVertical ? scrollTop : scrollLeft;
        const progress = maxScroll > 0 ? (currentScroll / maxScroll) * 100 : 0;
        setScrollProgress(Math.min(Math.round(progress), 100));
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            handleScroll();
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const classes = clsx(
        'relative overflow-auto transition-all duration-200',
        variantClasses[variant],
        isVertical ? 'flex flex-col' : 'flex flex-row',
        // Gestion de la scrollbar
        hideScrollbar && 'scrollbar-hide',
        !hideScrollbar && showScrollbar && 'custom-scrollbar',
        !hideScrollbar && !showScrollbar && 'scrollbar-hide',
        autoHideScrollbar && 'scrollbar-hide hover:custom-scrollbar',
        smoothScroll && 'scroll-smooth',
        snapScroll && 'snap-x snap-mandatory',
        colorClasses[color],
        className
    );

    const contentClasses = clsx(
        'flex',
        isVertical ? 'flex-col' : 'flex-row',
        isVertical ? 'w-full' : 'h-full',
        `gap-${gap}`,
        `p-${padding}`
    );

    const itemClasses = clsx(
        snapScroll && `snap-${snapAlign} shrink-0`
    );

    return (
        <div
            ref={containerRef}
            className={classes}
            style={{
                maxHeight: isVertical ? maxHeight : undefined,
                maxWidth: isVertical ? maxWidth : undefined,
                ...style,
            }}
        >
            {isScrolling && (
                <div className="absolute top-0 left-0 right-0 z-10 h-0.5 bg-muted/30">
                    <div
                        className="h-full transition-all duration-300"
                        style={{
                            width: `${scrollProgress}%`,
                            backgroundColor: `hsl(var(--${color}))`,
                        }}
                    />
                </div>
            )}

            <div className={contentClasses}>
                {Array.isArray(children) ? (
                    children.map((child, index) => (
                        <div key={index} className={itemClasses}>
                            {child}
                        </div>
                    ))
                ) : (
                    <div className={itemClasses}>
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ScrollList;