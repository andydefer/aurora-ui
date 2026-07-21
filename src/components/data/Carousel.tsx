import { ReactNode, useState, useEffect, useRef } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CarouselItem {
    id?: string;
    content: ReactNode;
}

export interface CarouselProps extends LayoutBaseProps {
    items: CarouselItem[];
    autoplay?: boolean;
    interval?: number;
    indicators?: boolean;
    navigation?: boolean;
    loop?: boolean;
    className?: string;
}

export function Carousel({
    items,
    autoplay = false,
    interval = 3000,
    indicators = true,
    navigation = true,
    loop = true,
    className = '',
    style = {},
}: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const autoplayRef = useRef<NodeJS.Timeout | null>(null);

    const totalItems = items.length;

    const goTo = (index: number) => {
        if (isTransitioning) return;
        let newIndex = index;
        if (loop) {
            if (newIndex < 0) newIndex = totalItems - 1;
            if (newIndex >= totalItems) newIndex = 0;
        } else {
            newIndex = Math.max(0, Math.min(totalItems - 1, newIndex));
        }
        setIsTransitioning(true);
        setCurrentIndex(newIndex);
        setTimeout(() => setIsTransitioning(false), 300);
    };

    const next = () => goTo(currentIndex + 1);
    const prev = () => goTo(currentIndex - 1);

    useEffect(() => {
        if (autoplay) {
            autoplayRef.current = setInterval(next, interval);
            return () => {
                if (autoplayRef.current) clearInterval(autoplayRef.current);
            };
        }
    }, [autoplay, interval, currentIndex]);

    const classes = clsx(
        'relative overflow-hidden rounded-lg',
        className
    );

    const itemClasses = clsx(
        'flex transition-transform duration-300 ease-out',
        isTransitioning && 'transition-transform'
    );

    return (
        <div className={classes} style={style}>
            <div
                className={itemClasses}
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
            >
                {items.map((item, index) => (
                    <div
                        key={item.id || index}
                        className="w-full flex-shrink-0"
                    >
                        {item.content}
                    </div>
                ))}
            </div>

            {navigation && totalItems > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                        aria-label="Précédent"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                        aria-label="Suivant"
                    >
                        <ChevronRight size={20} />
                    </button>
                </>
            )}

            {indicators && totalItems > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {items.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goTo(index)}
                            className={clsx(
                                'w-2 h-2 rounded-full transition-all duration-200',
                                index === currentIndex
                                    ? 'bg-white w-6'
                                    : 'bg-white/50 hover:bg-white/70'
                            )}
                            aria-label={`Aller à l'élément ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Carousel;