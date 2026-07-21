import { ReactNode, useState, useRef, useEffect } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends LayoutBaseProps {
    content: ReactNode;
    children: ReactNode;
    position?: TooltipPosition;
    delay?: number;
    arrow?: boolean;
    open?: boolean;
}

export function Tooltip({
    content,
    children,
    position = 'top',
    delay = 200,
    arrow = true,
    open,
    className = '',
    style = {},
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    const arrowClasses = {
        top: 'bottom-[-6px] left-1/2 -translate-x-1/2 border-t-muted',
        bottom: 'top-[-6px] left-1/2 -translate-x-1/2 border-b-muted',
        left: 'right-[-6px] top-1/2 -translate-y-1/2 border-l-muted',
        right: 'left-[-6px] top-1/2 -translate-y-1/2 border-r-muted',
    };

    useEffect(() => {
        if (open !== undefined) {
            setIsVisible(open);
        }
    }, [open]);

    const showTooltip = () => {
        if (open !== undefined) return;
        timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
        }, delay);
    };

    const hideTooltip = () => {
        if (open !== undefined) return;
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsVisible(false);
    };

    const classes = clsx(
        'absolute z-50 px-2.5 py-1.5 text-sm rounded-md bg-muted text-foreground',
        'transition-opacity duration-200 whitespace-nowrap',
        positionClasses[position],
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
        className
    );

    const arrowClass = clsx(
        'absolute w-0 h-0 border-[6px] border-transparent',
        arrowClasses[position],
        !arrow && 'hidden'
    );

    return (
        <div
            ref={triggerRef}
            className="inline-flex"
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
        >
            {children}
            {content && (
                <div className={classes} style={style} ref={tooltipRef} role="tooltip">
                    {arrow && <span className={arrowClass} />}
                    {content}
                </div>
            )}
        </div>
    );
}

export default Tooltip;