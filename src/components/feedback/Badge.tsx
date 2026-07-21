// src/components/feedback/Badge.tsx
import { ReactNode } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';

export type BadgeVariant =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'danger'
    | 'info'
    | 'muted'
    | 'outline'
    | 'ghost';

export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

export interface BadgeProps extends LayoutBaseProps {
    children?: ReactNode;
    count?: number;
    variant?: BadgeVariant;
    size?: BadgeSize;
    dot?: boolean;
    max?: number;
    overlap?: boolean;
    rounded?: boolean;
    removable?: boolean;
    onRemove?: () => void;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
}

export function Badge({
    children,
    count,
    variant = 'primary',
    size = 'md',
    dot = false,
    max = 99,
    overlap = false,
    rounded = false,
    removable = false,
    onRemove,
    icon,
    iconPosition = 'left',
    className = '',
    style = {},
}: BadgeProps) {
    const variantClasses: Record<BadgeVariant, string> = {
        primary: 'bg-primary text-primary-foreground border-transparent',
        secondary: 'bg-secondary text-secondary-foreground border-transparent',
        success: 'bg-success text-white border-transparent',
        warning: 'bg-warning text-white border-transparent',
        error: 'bg-danger text-white border-transparent',
        danger: 'bg-danger text-white border-transparent',
        info: 'bg-blue-500 text-white border-transparent',
        muted: 'bg-muted text-muted-foreground border-transparent',
        outline: 'bg-transparent text-foreground border border-border',
        ghost: 'bg-transparent text-foreground hover:bg-muted/10',
    };

    const sizeClasses: Record<BadgeSize, string> = {
        xs: 'text-[10px] px-1.5 py-0.5 h-4 min-w-[16px]',
        sm: 'text-xs px-2 py-0.5 h-5 min-w-[20px]',
        md: 'text-sm px-2.5 py-1 h-6 min-w-[24px]',
        lg: 'text-base px-3 py-1.5 h-8 min-w-[32px]',
    };

    const displayCount = count !== undefined && count > max ? `${max}+` : count;

    // Classes pour le badge principal
    const badgeClasses = clsx(
        'inline-flex items-center justify-center gap-1 font-medium transition-all duration-200',
        'whitespace-nowrap select-none',
        rounded ? 'rounded-full' : 'rounded',
        dot ? 'w-2.5 h-2.5 p-0 rounded-full' : sizeClasses[size],
        variantClasses[variant],
        variant === 'ghost' && 'hover:bg-muted/10',
        className
    );

    // Classes pour le badge de notification
    const notificationClasses = clsx(
        'inline-flex items-center justify-center',
        'text-[10px] font-medium',
        dot ? 'w-2.5 h-2.5 p-0 rounded-full' : 'px-1.5 py-0.5 rounded-full min-w-[18px] h-4.5',
        variantClasses[variant],
        'animate-in fade-in zoom-in duration-200'
    );

    // Rendu du badge de notification
    const renderNotificationBadge = () => {
        if (!dot && (count === undefined || count === 0)) return null;

        return (
            <span
                className={clsx(
                    'absolute',
                    overlap ? '-top-2 -right-2' : '-top-1 -right-1',
                    notificationClasses
                )}
                style={style}
            >
                {!dot && displayCount}
            </span>
        );
    };

    // Rendu du badge standalone
    const renderStandaloneBadge = () => {
        if (dot) {
            return <span className={badgeClasses} style={style} />;
        }

        return (
            <span className={badgeClasses} style={style}>
                {icon && iconPosition === 'left' && (
                    <span className="shrink-0">{icon}</span>
                )}
                <span>{displayCount || children}</span>
                {icon && iconPosition === 'right' && (
                    <span className="shrink-0">{icon}</span>
                )}
                {removable && onRemove && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove();
                        }}
                        className={clsx(
                            'ml-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10',
                            'transition-colors duration-200',
                            'flex items-center justify-center',
                            size === 'xs' && 'w-3 h-3 text-[8px]',
                            size === 'sm' && 'w-3.5 h-3.5 text-[10px]',
                            size === 'md' && 'w-4 h-4 text-xs',
                            size === 'lg' && 'w-5 h-5 text-sm'
                        )}
                        aria-label="Supprimer"
                    >
                        ×
                    </button>
                )}
            </span>
        );
    };

    // Si children est présent, c'est un badge de notification sur un élément
    if (children) {
        return (
            <div className="relative inline-block">
                {children}
                {renderNotificationBadge()}
            </div>
        );
    }

    return renderStandaloneBadge();
}

export default Badge;