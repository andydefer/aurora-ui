import { ReactNode, useEffect, useRef, useState } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';

export interface IntersectionObserverProps extends LayoutBaseProps {
    children: ReactNode;
    onIntersect?: (entry: IntersectionObserverEntry) => void;
    threshold?: number | number[];
    once?: boolean;
    root?: HTMLElement | null;
    rootMargin?: string;
}

export function IntersectionObserver({
    children,
    onIntersect,
    threshold = 0.1,
    once = false,
    root = null,
    rootMargin = '0px',
    className = '',
    style = {},
}: IntersectionObserverProps) {
    const [hasIntersected, setHasIntersected] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (once && hasIntersected) return;

        const container = containerRef.current;
        if (!container) return;

        const observer = new window.IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (once) {
                            setHasIntersected(true);
                        }
                        onIntersect?.(entry);
                    }
                });
            },
            {
                threshold,
                root,
                rootMargin,
            }
        );

        observer.observe(container);

        return () => {
            observer.disconnect();
        };
    }, [once, hasIntersected, onIntersect, threshold, root, rootMargin]);

    const classes = clsx('intersection-observer', className);

    return (
        <div ref={containerRef} className={classes} style={style}>
            {children}
        </div>
    );
}

export default IntersectionObserver;