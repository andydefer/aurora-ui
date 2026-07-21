import { useState } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, TextAlign, TextColor, Radius, Shadow } from '../../types';
import { Image, ImageProps } from './Image';
import { Maximize2, Minimize2, X } from 'lucide-react';

export interface FigureProps extends LayoutBaseProps {
    image: ImageProps;
    caption?: string;
    align?: TextAlign;
    color?: TextColor;
    zoomable?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    radius?: Radius;
    shadow?: Shadow;
    showCaption?: boolean;
    captionPosition?: 'bottom' | 'overlay' | 'top';
}

export function Figure({
    image,
    caption,
    align = 'center',
    color = 'muted',
    zoomable = false,
    size = 'md',
    radius = 'lg',
    shadow = 'sm',
    showCaption = true,
    captionPosition = 'bottom',
    className = '',
    style = {},
}: FigureProps) {
    const [isZoomed, setIsZoomed] = useState(false);

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        full: 'max-w-full',
    };

    const alignClasses: Record<TextAlign, string> = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
    };

    const colorClasses: Record<TextColor, string> = {
        primary: 'text-foreground',
        secondary: 'text-secondary',
        muted: 'text-muted-foreground',
        destructive: 'text-destructive',
        success: 'text-success',
        warning: 'text-warning',
    };

    const radiusClasses: Record<Radius, string> = {
        none: 'rounded-none',
        xs: 'rounded-xs',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl',
        '4xl': 'rounded-4xl',
        full: 'rounded-full',
    };

    const shadowClasses: Record<Shadow, string> = {
        none: 'shadow-none',
        xs: 'shadow-xs',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
        xl: 'shadow-xl',
        '2xl': 'shadow-2xl',
    };

    const classes = clsx(
        'relative mx-auto transition-all duration-300',
        sizeClasses[size],
        alignClasses[align],
        className
    );

    const imageContainerClasses = clsx(
        'relative overflow-hidden transition-all duration-300',
        radiusClasses[radius],
        shadowClasses[shadow],
        'border border-border/50 bg-card/5',
        zoomable && 'cursor-pointer hover:shadow-xl hover:scale-[1.01]',
        isZoomed && 'fixed inset-4 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl border-none shadow-2xl'
    );

    const overlayClasses = clsx(
        'absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300',
        'flex items-end justify-start p-4',
        zoomable && 'group-hover:opacity-100'
    );

    const captionClasses = clsx(
        'transition-all duration-300',
        captionPosition === 'bottom' && 'mt-3',
        captionPosition === 'top' && 'mb-3',
        captionPosition === 'overlay' && 'absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'
    );

    const handleZoom = () => {
        if (zoomable) {
            setIsZoomed(!isZoomed);
        }
    };

    const handleCloseZoom = () => {
        if (isZoomed) {
            setIsZoomed(false);
        }
    };

    return (
        <figure className={classes} style={style}>
            {captionPosition === 'top' && showCaption && caption && (
                <figcaption className={clsx(captionClasses, colorClasses[color], alignClasses[align])}>
                    {caption}
                </figcaption>
            )}

            <div
                className={imageContainerClasses}
                onClick={handleZoom}
                role={zoomable ? 'button' : undefined}
                tabIndex={zoomable ? 0 : undefined}
            >
                <Image {...image} />

                {/* Gradient overlay pour l'effet hover */}
                {zoomable && (
                    <div className={overlayClasses}>
                        <span className="text-white text-sm font-medium flex items-center gap-2">
                            <Maximize2 size={16} />
                            Cliquer pour agrandir
                        </span>
                    </div>
                )}

                {/* Bouton de zoom */}
                {zoomable && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleZoom();
                        }}
                        className={clsx(
                            'absolute top-3 right-3 p-2 rounded-full transition-all duration-200',
                            'bg-background/80 backdrop-blur-sm text-foreground hover:bg-background hover:scale-110',
                            'border border-border/50 shadow-sm',
                            isZoomed && 'bg-primary text-primary-foreground hover:bg-primary/90'
                        )}
                        aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
                    >
                        {isZoomed ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                    </button>
                )}

                {/* Bouton de fermeture en mode zoomé */}
                {isZoomed && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCloseZoom();
                        }}
                        className="absolute top-4 right-16 p-2 rounded-full bg-background/90 backdrop-blur-sm text-foreground hover:bg-background transition-all border border-border/50 shadow-sm"
                        aria-label="Close zoom"
                    >
                        <X size={20} />
                    </button>
                )}

                {/* Badge "Zoomé" */}
                {isZoomed && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 text-sm text-foreground shadow-sm">
                        🔍 Mode zoom
                    </div>
                )}

                {/* Caption en overlay */}
                {captionPosition === 'overlay' && showCaption && caption && (
                    <div className={captionClasses}>
                        <span className="text-white/90 text-sm font-medium drop-shadow-lg">
                            {caption}
                        </span>
                    </div>
                )}
            </div>

            {captionPosition === 'bottom' && showCaption && caption && (
                <figcaption className={clsx(captionClasses, colorClasses[color], alignClasses[align])}>
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}

export default Figure;