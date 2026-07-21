import { useState, useEffect } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Radius, Spacing } from '../../types';
import { Image as ImageIcon } from 'lucide-react';

export type ImageFit = 'contain' | 'cover' | 'fill' | 'none';

export interface ImageProps extends LayoutBaseProps {
    src: string;
    alt?: string;
    width?: Spacing | string;
    height?: Spacing | string;
    lazy?: boolean;
    fallback?: string;
    fit?: ImageFit;
    radius?: Radius;
    placeholder?: boolean;
    onLoad?: () => void;
    onError?: () => void;
    decoding?: 'async' | 'sync' | 'auto';
    showSkeleton?: boolean;
    skeletonAspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
    skeletonWithGlow?: boolean;
}

export function Image({
    src,
    alt = '',
    width,
    height,
    lazy = true,
    fallback,
    fit = 'cover',
    radius = 'none',
    placeholder = false,
    onLoad,
    onError,
    decoding = 'async',
    showSkeleton = false,
    skeletonAspectRatio = 'auto',
    skeletonWithGlow = false,
    className = '',
    style = {},
}: ImageProps) {
    const [currentSrc, setCurrentSrc] = useState<string>(src);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    const fitClasses = {
        contain: 'object-contain',
        cover: 'object-cover',
        fill: 'object-fill',
        none: 'object-none',
    };

    const radiusClasses: Record<Radius, string> = {
        none: 'rounded-none',
        xs: 'rounded-xs',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-md',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl',
        '4xl': 'rounded-4xl',
        full: 'rounded-full',
    };

    const aspectClasses = {
        square: 'aspect-square',
        video: 'aspect-video',
        portrait: 'aspect-[3/4]',
        auto: '',
    };

    const spacingToPixels = (value: Spacing | string): string => {
        if (typeof value === 'number') {
            return `${value * 32}px`;
        }
        return value;
    };

    const widthStyle = width ? spacingToPixels(width) : undefined;
    const heightStyle = height ? spacingToPixels(height) : undefined;

    useEffect(() => {
        setCurrentSrc(src);
        setIsLoading(true);
        setHasError(false);
        setRetryCount(0);
    }, [src]);

    const handleLoad = () => {
        setIsLoading(false);
        setHasError(false);
        onLoad?.();
    };

    const handleError = () => {
        if (retryCount < 1 && fallback) {
            setRetryCount((prev) => prev + 1);
            setCurrentSrc(fallback);
            return;
        }

        setIsLoading(false);
        setHasError(true);
        onError?.();
    };

    const classes = clsx(
        fitClasses[fit],
        radiusClasses[radius],
        'bg-muted/50',
        hasError && 'bg-muted/50',
        className
    );

    const skeletonClasses = clsx(
        'relative overflow-hidden bg-gradient-to-br from-muted/50 to-muted',
        aspectClasses[skeletonAspectRatio],
        radiusClasses[radius],
        className
    );

    if (showSkeleton && isLoading) {
        return (
            <div
                className={skeletonClasses}
                style={{
                    width: widthStyle,
                    height: heightStyle,
                    ...style,
                }}
            >
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <ImageIcon className="size-12 text-muted-foreground" strokeWidth={1.5} />
                </div>
                {skeletonWithGlow && (
                    <div className="absolute inset-0 animate-pulse shadow-[inset_0_0_20px_rgba(255,255,255,0.3)] dark:shadow-[inset_0_0_20px_rgba(0,0,0,0.3)]" />
                )}
            </div>
        );
    }

    return (
        <div className="relative bg-card">
            {placeholder && isLoading && !hasError && (
                <div
                    className="absolute inset-0 bg-muted/50 animate-pulse"
                    style={{
                        borderRadius: radiusClasses[radius],
                    }}
                />
            )}
            <img
                src={currentSrc}
                alt={alt}
                width={widthStyle}
                height={heightStyle}
                loading={lazy ? 'lazy' : 'eager'}
                decoding={decoding}
                className={classes}
                style={{
                    width: widthStyle,
                    height: heightStyle,
                    ...style,
                }}
                onLoad={handleLoad}
                onError={handleError}
                data-loaded={!isLoading}
                data-destructive={hasError}
            />
        </div>
    );
}

export default Image;