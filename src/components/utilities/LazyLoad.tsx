import { ReactNode, useState, useEffect, useRef } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';

export interface LazyLoadProps extends LayoutBaseProps {
    children: ReactNode;
    offset?: number;
    placeholder?: ReactNode;
    once?: boolean;
    root?: HTMLElement | null;
}

export function LazyLoad({
    children,
    offset = 100,
    placeholder,
    once = true,
    root = null,
    className = '',
    style = {},
}: LazyLoadProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (once && hasLoaded) return;

        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        if (once) {
                            setHasLoaded(true);
                        }
                    } else if (!once) {
                        setIsVisible(false);
                    }
                });
            },
            {
                root,
                rootMargin: `${offset}px`,
                threshold: 0,
            }
        );

        observer.observe(container);

        return () => {
            observer.disconnect();
        };
    }, [offset, once, hasLoaded, root]);

    const classes = clsx('lazy-load', className);

    return (
        <div ref={containerRef} className={classes} style={style}>
            {isVisible ? children : (placeholder || null)}
        </div>
    );
}

export default LazyLoad;