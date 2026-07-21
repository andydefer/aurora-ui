// src/components/utilities/IntersectionObserver.tsx
import { ReactNode, useEffect, useRef, useState, useCallback } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, TextColor } from '../../types';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';

export interface IntersectionObserverProps extends LayoutBaseProps {
    children: ReactNode;
    onIntersect?: (entry: IntersectionObserverEntry) => void;
    onLeave?: (entry: IntersectionObserverEntry) => void;
    threshold?: number | number[];
    once?: boolean;
    root?: HTMLElement | null;
    rootMargin?: string;
    delay?: number;
    showIndicator?: boolean;
    indicatorColor?: TextColor;
    className?: string;
}

export function IntersectionObserver({
    children,
    onIntersect,
    onLeave,
    threshold = 0.1,
    once = false,
    root = null,
    rootMargin = '0px',
    delay = 0,
    showIndicator = false,
    indicatorColor = 'primary',
    className = '',
    style = {},
}: IntersectionObserverProps) {
    const [hasIntersected, setHasIntersected] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleIntersect = useCallback((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
            setIsInView(true);
            if (delay > 0) {
                timeoutRef.current = setTimeout(() => {
                    setIsVisible(true);
                    if (once) setHasIntersected(true);
                    onIntersect?.(entry);
                }, delay);
            } else {
                setIsVisible(true);
                if (once) setHasIntersected(true);
                onIntersect?.(entry);
            }
        } else {
            setIsInView(false);
            setIsVisible(false);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            onLeave?.(entry);
        }
    }, [delay, once, onIntersect, onLeave]);

    useEffect(() => {
        if (once && hasIntersected) return;

        const container = containerRef.current;
        if (!container) return;

        const observer = new window.IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    handleIntersect(entry);
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
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, [once, hasIntersected, handleIntersect, threshold, root, rootMargin]);

    const colorClasses: Record<TextColor, string> = {
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        muted: 'bg-muted text-muted-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
    };


    const classes = clsx(
        'relative transition-all duration-500',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className
    );

    return (
        <div ref={containerRef} className="relative">
            {/* Indicateur de statut */}
            {showIndicator && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    {isInView ? (
                        <div className={clsx(
                            'px-3 py-1.5 rounded-full text-xs font-medium shadow-lg border animate-in fade-in zoom-in duration-200',
                            'flex items-center gap-1.5 whitespace-nowrap',
                            colorClasses[indicatorColor]
                        )}>
                            <Eye size={12} className="shrink-0" />
                            {isVisible ? 'Visible' : 'En vue'}
                        </div>
                    ) : (
                        <div className="px-3 py-1.5 rounded-full text-xs font-medium shadow-lg border bg-muted text-muted-foreground border-muted/20 flex items-center gap-1.5 whitespace-nowrap">
                            <EyeOff size={12} className="shrink-0" />
                            Hors vue
                        </div>
                    )}
                </div>
            )}

            {/* Badge de statut en bas à droite */}
            {showIndicator && isVisible && (
                <div className="absolute bottom-2 right-2 z-10 px-2 py-0.5 rounded-full bg-success/20 text-success border border-success/20 text-[10px] font-medium flex items-center gap-1 animate-in fade-in zoom-in duration-200">
                    <CheckCircle size={10} />
                    Chargé
                </div>
            )}

            <div className={classes} style={style}>
                {children}
            </div>
        </div>
    );
}

export default IntersectionObserver;