// src/components/utilities/InfiniteScroll.tsx
import { ReactNode, useEffect, useRef, useCallback, useState } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, TextColor } from '../../types';
import { Spinner } from '../feedback/Spinner';
import { Button } from '../forms/Button';
import { ChevronDown, ChevronRight } from 'lucide-react';

export type InfiniteScrollDirection = 'vertical' | 'horizontal';
export type InfiniteScrollMode = 'auto' | 'manual';

export interface InfiniteScrollProps extends LayoutBaseProps {
    children: ReactNode;
    hasMore: boolean;
    loadMore: () => void;
    threshold?: number;
    loading?: boolean;
    loader?: ReactNode;
    endMessage?: ReactNode;
    direction?: InfiniteScrollDirection;
    mode?: InfiniteScrollMode;
    loadMoreText?: string;
    loadingText?: string;
    endMessageText?: string;
    showProgress?: boolean;
    color?: TextColor;
    className?: string;
    hideScrollbar?: boolean;
    showScrollbar?: boolean;
    autoHideScrollbar?: boolean;
}

export function InfiniteScroll({
    children,
    hasMore,
    loadMore,
    threshold = 100,
    loading = false,
    loader,
    endMessage,
    direction = 'vertical',
    mode = 'auto',
    loadMoreText = 'Charger plus',
    loadingText = 'Chargement...',
    endMessageText = 'Vous avez tout vu !',
    showProgress = false,
    color = 'primary',
    className = '',
    style = {},
    hideScrollbar = false,
    showScrollbar = true,
    autoHideScrollbar = false,
}: InfiniteScrollProps) {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    const handleIntersect = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const entry = entries[0];
            if (entry.isIntersecting && hasMore && !loading && mode === 'auto') {
                loadMore();
            }
        },
        [hasMore, loading, loadMore, mode]
    );

    const handleLoadMore = () => {
        if (!loading && hasMore) {
            loadMore();
        }
    };

    useEffect(() => {
        if (!showProgress || !containerRef.current) return;

        const handleScroll = () => {
            const container = containerRef.current;
            if (!container) return;

            const scrollTop = container.scrollTop;
            const scrollHeight = container.scrollHeight - container.clientHeight;
            const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            setProgress(Math.min(Math.round(progress), 100));
        };

        const container = containerRef.current;
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [showProgress]);

    useEffect(() => {
        if (mode !== 'auto') return;

        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver(handleIntersect, {
            root: null,
            rootMargin: `${threshold}px`,
        });

        if (sentinelRef.current) {
            observerRef.current.observe(sentinelRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [handleIntersect, threshold, mode]);

    const isVertical = direction === 'vertical';

    const classes = clsx(
        'infinite-scroll relative',
        isVertical ? 'overflow-y-auto' : 'overflow-x-auto',
        isVertical ? 'flex flex-col' : 'flex flex-row',
        // Gestion de la scrollbar
        hideScrollbar && 'scrollbar-hide',
        !hideScrollbar && showScrollbar && 'custom-scrollbar',
        !hideScrollbar && !showScrollbar && 'scrollbar-hide',
        autoHideScrollbar && 'scrollbar-hide hover:custom-scrollbar',
        className
    );

    const contentClasses = clsx(
        'w-full',
        isVertical ? 'flex-1' : 'flex-1 min-w-max'
    );

    const sentinelClasses = clsx(
        'shrink-0',
        isVertical ? 'h-4 w-full' : 'w-4 h-full'
    );

    const colorClasses: Record<TextColor, string> = {
        primary: 'text-primary',
        secondary: 'text-secondary',
        muted: 'text-muted-foreground',
        destructive: 'text-destructive',
        success: 'text-success',
        warning: 'text-warning',
    };

    const buttonColorMap: Record<TextColor, 'primary' | 'secondary' | 'destructive' | 'success' | 'warning'> = {
        primary: 'primary',
        secondary: 'secondary',
        muted: 'primary',
        destructive: 'destructive',
        success: 'success',
        warning: 'warning',
    };

    const isLoading = loading;

    return (
        <div ref={containerRef} className={classes} style={style}>
            {showProgress && hasMore && (
                <div className={clsx(
                    'sticky top-0 z-10 w-full h-1 bg-muted/50',
                    isVertical ? 'sticky' : 'sticky left-0'
                )}>
                    <div
                        className={clsx(
                            'h-full transition-all duration-300',
                            colorClasses[color]
                        )}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}

            <div className={contentClasses}>
                {children}
            </div>

            {mode === 'auto' && hasMore && (
                <div ref={sentinelRef} className={sentinelClasses} />
            )}

            {mode === 'manual' && hasMore && !isLoading && (
                <div className={clsx(
                    'flex justify-center py-4',
                    isVertical ? 'w-full' : 'w-auto px-4'
                )}>
                    <Button
                        variant={buttonColorMap[color]}
                        size="md"
                        icon={isVertical ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        onClick={handleLoadMore}
                        className="min-w-[150px]"
                    >
                        {loadMoreText}
                    </Button>
                </div>
            )}

            {isLoading && (
                <div className={clsx(
                    'flex justify-center py-4 pb-16',
                    isVertical ? 'w-full' : 'w-auto px-4'
                )}>
                    {loader || (
                        <div className="flex items-center gap-2">
                            <Spinner size="md" />
                            <span className="text-sm text-muted-foreground">{loadingText}</span>
                        </div>
                    )}
                </div>
            )}

            {!hasMore && endMessage !== null && (
                <div className={clsx(
                    'text-center py-4 text-muted-foreground',
                    isVertical ? 'w-full' : 'w-auto px-4',
                    'text-sm'
                )}>
                    {endMessage || endMessageText}
                </div>
            )}
        </div>
    );
}

export default InfiniteScroll;