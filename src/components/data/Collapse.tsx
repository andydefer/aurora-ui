import { ReactNode, useState, useEffect, useRef } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';

export interface CollapseProps extends LayoutBaseProps {
    in?: boolean;
    children: ReactNode;
    timeout?: number;
    dimension?: 'height' | 'width';
    appear?: boolean;
    className?: string;
}

export function Collapse({
    in: isOpen = false,
    children,
    timeout = 300,
    dimension = 'height',
    appear = false,
    className = '',
    style = {},
}: CollapseProps) {
    const [isVisible, setIsVisible] = useState(appear ? isOpen : false);
    const [isAnimating, setIsAnimating] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setIsAnimating(true);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                setIsAnimating(false);
            }, timeout);
        } else {
            setIsAnimating(true);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                setIsVisible(false);
                setIsAnimating(false);
            }, timeout);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [isOpen, timeout]);

    const maxSize = dimension === 'height' ? 'max-h-[1000px]' : 'max-w-[1000px]';
    const sizeClass = isOpen ? maxSize : 'max-h-0 max-w-0';

    const classes = clsx(
        'overflow-hidden transition-all duration-300',
        sizeClass,
        isAnimating && 'transition-all',
        className
    );

    if (!isVisible && !isAnimating) return null;

    return (
        <div
            ref={contentRef}
            className={classes}
            style={{
                ...style,
                transitionDuration: `${timeout}ms`,
            }}
        >
            {children}
        </div>
    );
}

export default Collapse;