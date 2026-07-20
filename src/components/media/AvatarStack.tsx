import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';

export interface AvatarStackItem {
    id?: string;
    name: string;
    src?: string;
    alt?: string;
    role?: string;
}

export interface AvatarStackProps extends LayoutBaseProps {
    items: AvatarStackItem[];
    max?: number;
    size?: '8' | '10' | '12' | '14' | '16' | '20' | '24';
    overlap?: number;
    onMoreClick?: () => void;
    moreLabel?: string;
}

export function AvatarStack({
    items,
    max = 3,
    size = '14',
    overlap = 25,
    onMoreClick,
    moreLabel = '+{count}',
    className = '',
    style = {},
}: AvatarStackProps) {
    const visibleItems = items.slice(0, max);
    const remainingCount = items.length - max;
    const hasMore = remainingCount > 0;

    const sizePixels: Record<string, number> = {
        '8': 32,
        '10': 40,
        '12': 48,
        '14': 56,
        '16': 64,
        '20': 80,
        '24': 96,
    };

    const sizeClasses: Record<string, string> = {
        '8': 'w-8 h-8',
        '10': 'w-10 h-10',
        '12': 'w-12 h-12',
        '14': 'w-14 h-14',
        '16': 'w-16 h-16',
        '20': 'w-20 h-20',
        '24': 'w-24 h-24',
    };

    const pixelSize = sizePixels[size];
    const overlapPx = (pixelSize * overlap) / 100;

    const classes = clsx(
        'flex items-center',
        className
    );

    const sizeClass = sizeClasses[size];

    return (
        <div className={classes} style={style}>
            {visibleItems.map((item, index) => {
                const translateX = -index * overlapPx;

                return (
                    <div
                        key={item.id || index}
                        style={{
                            transform: `translateX(${translateX}px)`,
                            zIndex: visibleItems.length - index,
                        }}
                        className="relative"
                    >
                        <img
                            src={item.src}
                            alt={item.alt || item.name}
                            className={clsx(
                                sizeClass,
                                'rounded-full border border-border',
                                'inline-block shrink-0'
                            )}
                        />
                    </div>
                );
            })}
            {hasMore && (
                <div
                    className={clsx(
                        sizeClass,
                        'rounded-full border border-border',
                        'inline-flex items-center justify-center shrink-0',
                        'bg-muted text-foreground text-sm font-medium',
                        'cursor-pointer hover:bg-muted/80 transition-colors'
                    )}
                    style={{
                        transform: `translateX(${-visibleItems.length * overlapPx}px)`,
                        zIndex: 0,
                    }}
                    onClick={onMoreClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && onMoreClick) {
                            onMoreClick();
                        }
                    }}
                >
                    {moreLabel.replace('{count}', String(remainingCount))}
                </div>
            )}
        </div>
    );
}

export default AvatarStack;