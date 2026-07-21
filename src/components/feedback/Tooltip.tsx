// src/components/feedback/Tooltip.tsx
import { ReactNode, useState, useRef, useEffect } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, TextColor } from '../../types';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends LayoutBaseProps {
    content: ReactNode;
    children: ReactNode;
    position?: TooltipPosition;
    delay?: number;
    arrow?: boolean;
    open?: boolean;
    color?: TextColor;
    size?: 'sm' | 'md' | 'lg';
    maxWidth?: number | string;
    className?: string;
}

export function Tooltip({
    content,
    children,
    position = 'top',
    delay = 200,
    arrow = true,
    open,
    color = 'primary',
    size = 'md',
    maxWidth = 250,
    className = '',
    style = {},
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>(position);

    // Ajustement automatique de la position si le tooltip sort de l'écran
    useEffect(() => {
        if (!isVisible || !tooltipRef.current || !triggerRef.current) return;

        const tooltip = tooltipRef.current;
        const rect = tooltip.getBoundingClientRect();

        let newPosition = position;

        if (position === 'top' && rect.top < 0) {
            newPosition = 'bottom';
        } else if (position === 'bottom' && rect.bottom > window.innerHeight) {
            newPosition = 'top';
        } else if (position === 'left' && rect.left < 0) {
            newPosition = 'right';
        } else if (position === 'right' && rect.right > window.innerWidth) {
            newPosition = 'left';
        }

        if (newPosition !== tooltipPosition) {
            setTooltipPosition(newPosition);
        }
    }, [isVisible, position, tooltipPosition]);

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    const arrowClasses = {
        top: 'bottom-[-6px] left-1/2 -translate-x-1/2 border-t-card',
        bottom: 'top-[-6px] left-1/2 -translate-x-1/2 border-b-card',
        left: 'right-[-6px] top-1/2 -translate-y-1/2 border-l-card',
        right: 'left-[-6px] top-1/2 -translate-y-1/2 border-r-card',
    };

    const colorClasses: Record<TextColor, string> = {
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        muted: 'bg-muted text-muted-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
    };

    const sizeClasses = {
        sm: 'px-2 py-1 text-xs rounded',
        md: 'px-2.5 py-1.5 text-sm rounded-md',
        lg: 'px-3 py-2 text-base rounded-lg',
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
        'absolute z-50 shadow-lg transition-all duration-200',
        'font-medium',
        sizeClasses[size],
        colorClasses[color],
        positionClasses[tooltipPosition],
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none',
        className
    );

    const arrowClass = clsx(
        'absolute w-0 h-0 border-[6px] border-transparent',
        arrowClasses[tooltipPosition],
        !arrow && 'hidden'
    );

    const maxWidthStyle = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;

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
                <div
                    className={classes}
                    style={{ ...style, maxWidth: maxWidthStyle }}
                    ref={tooltipRef}
                    role="tooltip"
                >
                    {arrow && <span className={arrowClass} />}
                    {content}
                </div>
            )}
        </div>
    );
}

export default Tooltip;