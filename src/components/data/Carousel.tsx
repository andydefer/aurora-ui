// src/components/data/Carousel.tsx
import { ReactNode, useState, useEffect, useRef, useCallback } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, TextColor } from '../../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSwipe } from '../../hooks/useSwipe';

export interface CarouselItem {
    id?: string;
    content: ReactNode;
}

export type CarouselVariant = 'default' | 'bordered' | 'elevated' | 'ghost';

export interface CarouselProps extends LayoutBaseProps {
    items: CarouselItem[];
    autoplay?: boolean;
    interval?: number;
    indicators?: boolean;
    navigation?: boolean;
    loop?: boolean;
    variant?: CarouselVariant;
    color?: TextColor;
    showControls?: boolean;
    pauseOnHover?: boolean;
    className?: string;
    swipeThreshold?: number;
    enableSwipe?: boolean;
}

export function Carousel({
    items,
    autoplay = false,
    interval = 4000,
    indicators = true,
    navigation = true,
    variant = 'default',
    color = 'primary',
    showControls = true,
    pauseOnHover = true,
    className = '',
    style = {},
    swipeThreshold = 50,
    enableSwipe = true,
}: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [containerWidth, setContainerWidth] = useState(0);
    const autoplayRef = useRef<NodeJS.Timeout | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const totalItems = items.length;

    const { handleTouchStart, handleTouchEnd, isSwiping } = useSwipe({
        threshold: swipeThreshold,
        onSwipeLeft: () => {
            if (!isTransitioning) next();
        },
        onSwipeRight: () => {
            if (!isTransitioning) prev();
        },
    });

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.clientWidth);
            }
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const goTo = useCallback((index: number) => {
        if (isTransitioning || totalItems === 0) return;
        // Sans loop : on bloque aux limites
        let newIndex = Math.max(0, Math.min(totalItems - 1, index));
        setIsTransitioning(true);
        setCurrentIndex(newIndex);
        setTimeout(() => setIsTransitioning(false), 500);
    }, [isTransitioning, totalItems]);

    const next = useCallback(() => {
        if (currentIndex < totalItems - 1) {
            goTo(currentIndex + 1);
        }
    }, [goTo, currentIndex, totalItems]);

    const prev = useCallback(() => {
        if (currentIndex > 0) {
            goTo(currentIndex - 1);
        }
    }, [goTo, currentIndex]);

    useEffect(() => {
        if (autoplay && !isPaused && totalItems > 1) {
            autoplayRef.current = setInterval(next, interval);
            return () => {
                if (autoplayRef.current) clearInterval(autoplayRef.current);
            };
        }
    }, [autoplay, isPaused, interval, next, totalItems]);

    const variantClasses = {
        default: 'bg-card border border-border',
        bordered: 'border-2 border-border bg-card shadow-sm',
        elevated: 'bg-card shadow-lg',
        ghost: 'bg-transparent',
    };

    const colorClasses: Record<TextColor, string> = {
        primary: 'ring-primary/30',
        secondary: 'ring-secondary/30',
        muted: 'ring-muted/30',
        destructive: 'ring-destructive/30',
        success: 'ring-success/30',
        warning: 'ring-warning/30',
    };

    const classes = clsx(
        'relative overflow-hidden rounded-xl select-none',
        variantClasses[variant],
        'transition-all duration-300',
        className
    );

    const handleMouseEnter = () => {
        if (pauseOnHover) setIsPaused(true);
    };

    const handleMouseLeave = () => {
        if (pauseOnHover) setIsPaused(false);
    };

    if (totalItems === 0) return null;

    const slideWidth = containerWidth || 800;
    const totalWidth = totalItems * slideWidth;

    const isFirstSlide = currentIndex === 0;
    const isLastSlide = currentIndex === totalItems - 1;
    const prevDisabled = isFirstSlide;
    const nextDisabled = isLastSlide;

    const onTouchStart = (e: React.TouchEvent) => {
        if (enableSwipe) {
            handleTouchStart(e);
        }
    };

    const onTouchEnd = () => {
        if (enableSwipe) {
            handleTouchEnd();
        }
    };

    return (
        <div
            ref={containerRef}
            className={classes}
            style={style}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            <div
                className="flex transition-transform duration-500 ease-in-out will-change-transform"
                style={{
                    transform: `translateX(-${currentIndex * slideWidth}px)`,
                    width: `${totalWidth}px`,
                }}
            >
                {items.map((item, index) => (
                    <div
                        key={item.id || index}
                        className="flex-shrink-0 relative"
                        style={{
                            width: `${slideWidth}px`,
                            minWidth: `${slideWidth}px`,
                        }}
                    >
                        {item.content}
                    </div>
                ))}
            </div>

            {indicators && totalItems > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {items.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goTo(index)}
                            className={clsx(
                                'transition-all duration-300 rounded-full',
                                'hover:scale-110',
                                index === currentIndex
                                    ? clsx('w-8 h-2.5', colorClasses[color])
                                    : 'w-2.5 h-2.5 bg-muted/70 hover:bg-muted'
                            )}
                            aria-label={`Aller à l'élément ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            {navigation && totalItems > 1 && showControls && (
                <>
                    <button
                        onClick={prev}
                        disabled={prevDisabled}
                        className={clsx(
                            'absolute left-3 top-1/2 -translate-y-1/2 z-10',
                            'p-2 rounded-full transition-all duration-300',
                            'bg-card/80 backdrop-blur-sm border border-border/50',
                            'hover:bg-card hover:scale-110',
                            'text-foreground shadow-lg',
                            'focus:outline-none focus:ring-2 focus:ring-primary/50',
                            prevDisabled && 'opacity-40 cursor-not-allowed hover:scale-100 hover:bg-card/80 rotate-90'
                        )}
                        aria-label="Précédent"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={next}
                        disabled={nextDisabled}
                        className={clsx(
                            'absolute right-3 top-1/2 -translate-y-1/2 z-10',
                            'p-2 rounded-full transition-all duration-300',
                            'bg-card/80 backdrop-blur-sm border border-border/50',
                            'hover:bg-card hover:scale-110',
                            'text-foreground shadow-lg',
                            'focus:outline-none focus:ring-2 focus:ring-primary/50',
                            nextDisabled && 'opacity-40 cursor-not-allowed hover:scale-100 hover:bg-card/80 -rotate-90'
                        )}
                        aria-label="Suivant"
                    >
                        <ChevronRight size={20} />
                    </button>
                </>
            )}

            {totalItems > 1 && (
                <div className="absolute bottom-4 right-4 z-10 px-2 py-0.5 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-xs text-muted-foreground">
                    {currentIndex + 1} / {totalItems}
                </div>
            )}

            {isSwiping && enableSwipe && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm border border-border/50 text-xs text-muted-foreground animate-pulse">
                    👆 Glissez pour naviguer
                </div>
            )}
        </div>
    );
}

export default Carousel;