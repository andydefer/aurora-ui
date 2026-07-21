import React from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Size, Shape, Placement } from '../../types';
import { Check, X, Clock, Minus } from 'lucide-react';

export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy' | 'none';

export interface AvatarProps extends LayoutBaseProps {
    src?: string;
    name?: string;
    size?: Size;
    shape?: Shape;
    fallback?: string;
    status?: AvatarStatus;
    alt?: string;
    statusPosition?: Placement;
    statusSize?: Size;
    bordered?: boolean;
    borderColor?: string;
}

export function Avatar({
    src,
    name = '',
    size = 'md',
    shape = 'circle',
    fallback,
    status = 'none',
    alt = '',
    statusPosition = 'bottom-right',
    statusSize = 'md',
    bordered = false,
    borderColor = 'ring-primary',
    className = '',
    style = {},
}: AvatarProps) {
    const [destructive, setError] = React.useState(false);

    const sizeClasses: Record<Size, string> = {
        xs: 'w-10 h-10 text-xs',
        sm: 'w-12 h-12 text-sm',
        md: 'w-14 h-14 text-base',
        lg: 'w-16 h-16 text-lg',
        xl: 'w-20 h-20 text-xl',
        '2xl': 'w-24 h-24 text-2xl',
        '3xl': 'w-28 h-28 text-3xl',
        '4xl': 'w-32 h-32 text-4xl',
        full: 'w-40 h-40 text-5xl',
    };

    const shapeClasses: Record<Shape, string> = {
        circle: 'rounded-full',
        square: 'rounded-none',
        rounded: 'rounded-xl',
    };

    const statusIconSize = {
        xs: 10,
        sm: 12,
        md: 14,
        lg: 16,
        xl: 18,
        '2xl': 20,
        '3xl': 22,
        '4xl': 24,
        full: 28,
    };

    const statusClasses: Record<AvatarStatus, string> = {
        online: 'bg-success text-white shadow-md',
        offline: 'bg-muted text-muted-foreground shadow-md',
        away: 'bg-warning text-white shadow-md',
        busy: 'bg-destructive text-white shadow-md',
        none: 'hidden',
    };

    const statusSizeClasses: Record<Size, string> = {
        xs: 'w-5 h-5',
        sm: 'w-6 h-6',
        md: 'w-7 h-7',
        lg: 'w-8 h-8',
        xl: 'w-9 h-9',
        '2xl': 'w-10 h-10',
        '3xl': 'w-11 h-11',
        '4xl': 'w-12 h-12',
        full: 'w-14 h-14',
    };



    const getInitials = (name: string): string => {
        if (!name) return '?';
        const parts = name.split(' ');
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    };

    const getFallbackUrl = (): string => {
        if (fallback) return fallback;
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3b82f6&color=fff&size=128&bold=true`;
    };

    const getStatusIcon = () => {
        switch (status) {
            case 'online':
                return <Check size={statusIconSize[statusSize]} strokeWidth={3} />;
            case 'offline':
                return <Minus size={statusIconSize[statusSize]} strokeWidth={3} />;
            case 'away':
                return <Clock size={statusIconSize[statusSize]} strokeWidth={3} />;
            case 'busy':
                return <X size={statusIconSize[statusSize]} strokeWidth={3} />;
            default:
                return null;
        }
    };

    const imageSrc = destructive ? getFallbackUrl() : src;

    const avatarClasses = clsx(
        'relative shrink-0 overflow-hidden flex items-center justify-center',
        'transition-all duration-200 hover:scale-105',
        sizeClasses[size],
        shapeClasses[shape],
        bordered && `ring-2 ${borderColor} ring-offset-2 ring-offset-background`,
        className
    );

    const statusContainerStyle: React.CSSProperties = {
        position: 'absolute',
        zIndex: 10,
        ...(statusPosition === 'top-right' || statusPosition === 'bottom-right'
            ? { right: '-4px' }
            : { left: '-4px' }),
        ...(statusPosition === 'top-right' || statusPosition === 'top-left'
            ? { top: '-4px' }
            : { bottom: '-4px' }),
    };

    return (
        <div className="relative inline-block">
            <div className={avatarClasses} style={style}>
                {src && !destructive ? (
                    <img
                        src={imageSrc}
                        alt={alt || name || 'Avatar'}
                        className="w-full h-full object-cover"
                        onError={() => setError(true)}
                    />
                ) : (
                    <span className="font-semibold text-primary-foreground">
                        {getInitials(name)}
                    </span>
                )}
            </div>
            {status !== 'none' && (
                <div
                    className={clsx(
                        'absolute flex items-center justify-center rounded-full border-2 border-background',
                        statusSizeClasses[statusSize],
                        statusClasses[status]
                    )}
                    style={statusContainerStyle}
                >
                    {getStatusIcon()}
                </div>
            )}
        </div>
    );
}

export default Avatar;