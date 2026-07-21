// src/components/utilities/LazyLoad.tsx
import { ReactNode, useState, useEffect, useRef } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, TextColor } from '../../types';
import { Loader2, Image as ImageIcon, AlertCircle } from 'lucide-react';

export type LazyLoadVariant = 'default' | 'card' | 'minimal' | 'skeleton' | 'blur';

export interface LazyLoadProps extends LayoutBaseProps {
    children: ReactNode;
    offset?: number;
    placeholder?: ReactNode;
    once?: boolean;
    root?: HTMLElement | null;
    variant?: LazyLoadVariant;
    color?: TextColor;
    minHeight?: number | string;
    showSpinner?: boolean;
    spinnerSize?: 'sm' | 'md' | 'lg';
    placeholderText?: string;
    className?: string;
}

export function LazyLoad({
    children,
    offset = 100,
    placeholder,
    once = true,
    root = null,
    variant = 'default',
    color = 'primary',
    minHeight = '200px',
    showSpinner = true,
    spinnerSize = 'md',
    placeholderText = 'Chargement...',
    className = '',
    style = {},
}: LazyLoadProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [isError, _] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [offset, once, hasLoaded, root]);

    const colorClasses: Record<TextColor, string> = {
        primary: 'text-primary border-primary/30',
        secondary: 'text-secondary border-secondary/30',
        muted: 'text-muted-foreground border-muted/30',
        destructive: 'text-destructive border-destructive/30',
        success: 'text-success border-success/30',
        warning: 'text-warning border-warning/30',
    };

    const spinnerSizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
    };

    const variantClasses = {
        default: 'flex items-center justify-center bg-muted/10 rounded-md border border-border/50',
        card: 'flex items-center justify-center p-8 bg-card rounded-xl border border-border shadow-sm',
        minimal: 'flex items-center justify-center p-4 bg-transparent',
        skeleton: 'flex flex-col items-center justify-center gap-3 p-6 bg-muted/20 rounded-md border border-border/50',
        blur: 'flex items-center justify-center backdrop-blur-sm bg-card/30 rounded-md border border-border/50',
    };

    // Placeholder par défaut
    const defaultPlaceholder = () => {
        if (placeholder) return placeholder;

        switch (variant) {
            case 'skeleton':
                return (
                    <div className="w-full space-y-3 animate-pulse">
                        <div className="h-4 bg-muted/50 rounded w-3/4 mx-auto" />
                        <div className="h-4 bg-muted/50 rounded w-1/2 mx-auto" />
                        <div className="h-4 bg-muted/50 rounded w-2/3 mx-auto" />
                        <div className="h-4 bg-muted/50 rounded w-1/3 mx-auto" />
                        <div className="h-20 bg-muted/30 rounded w-full mt-4" />
                    </div>
                );

            case 'blur':
                return (
                    <div className="flex flex-col items-center gap-3">
                        <div className={clsx(
                            'rounded-full border-2 border-t-transparent animate-spin',
                            spinnerSizeClasses[spinnerSize],
                            colorClasses[color]
                        )} />
                        {placeholderText && (
                            <span className={clsx('text-sm font-medium', colorClasses[color])}>
                                {placeholderText}
                            </span>
                        )}
                    </div>
                );

            default:
                return (
                    <div className="flex flex-col items-center gap-3">
                        {showSpinner && (
                            <Loader2 className={clsx(
                                'animate-spin',
                                spinnerSizeClasses[spinnerSize],
                                colorClasses[color]
                            )} />
                        )}
                        {placeholderText && (
                            <span className={clsx('text-sm text-muted-foreground', colorClasses[color])}>
                                {placeholderText}
                            </span>
                        )}
                        <div className="flex items-center gap-1">
                            <ImageIcon size={14} className="text-muted-foreground/50" />
                            <span className="text-xs text-muted-foreground/50">
                                En attente de chargement
                            </span>
                        </div>
                    </div>
                );
        }
    };

    // Placeholder d'erreur
    const errorPlaceholder = (
        <div className="flex flex-col items-center gap-2 p-4 text-destructive">
            <AlertCircle size={24} />
            <span className="text-sm font-medium">Erreur de chargement</span>
            <span className="text-xs text-muted-foreground">Veuillez réessayer</span>
        </div>
    );

    const classes = clsx(
        'lazy-load relative transition-all duration-500',
        !isVisible && variant !== 'skeleton' && variantClasses[variant],
        isVisible && 'opacity-100',
        !isVisible && variant !== 'skeleton' && 'opacity-0',
        className
    );

    const placeholderClasses = clsx(
        'w-full transition-opacity duration-300',
        variantClasses[variant],
        !isVisible ? 'opacity-100' : 'opacity-0'
    );

    const contentClasses = clsx(
        'w-full transition-opacity duration-300',
        isVisible ? 'opacity-100' : 'opacity-0',
        'min-h-[50px]'
    );

    const minHeightStyle = typeof minHeight === 'number' ? `${minHeight}px` : minHeight;

    return (
        <div ref={containerRef} className={classes} style={{ minHeight: minHeightStyle, ...style }}>
            {/* Placeholder */}
            {!isVisible && (
                <div className={placeholderClasses} style={{ minHeight: minHeightStyle }}>
                    {defaultPlaceholder()}
                </div>
            )}

            {/* Contenu */}
            {(isVisible || !once) && (
                <div className={contentClasses}>
                    {isError ? errorPlaceholder : children}
                </div>
            )}
        </div>
    );
}

export default LazyLoad;