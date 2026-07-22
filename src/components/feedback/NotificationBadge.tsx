// src/components/feedback/NotificationBadge.tsx
import { ReactNode } from 'react';
import { clsx } from '../../utils/clsx';
import { Badge, BadgeProps } from './Badge';

export interface NotificationBadgeProps extends Omit<BadgeProps, 'children'> {
    children: ReactNode;
    count?: number;
    dot?: boolean;
    max?: number;
    overlap?: boolean;
}

export function NotificationBadge({
    children,
    count,
    dot = false,
    max = 99,
    overlap = false,
    variant = 'destructive',
    size = 'sm',
    ...badgeProps
}: NotificationBadgeProps) {
    const displayCount = count !== undefined && count > max ? `${max}+` : count;
    const showBadge = dot || (count !== undefined && count > 0);

    if (!showBadge) {
        return <>{children}</>;
    }

    return (
        <div className="relative inline-block">
            {children}
            <Badge
                {...badgeProps}
                variant={variant}
                size={size}
                className={clsx(
                    'absolute',
                    overlap ? '-top-1.5 -right-1.5' : '-top-1 -right-1',
                    'ring-2 ring-background shadow-lg',
                    dot ? 'w-2.5 h-2.5 p-0 rounded-full' : '',
                    badgeProps.className
                )}
            >
                {!dot && displayCount}
            </Badge>
        </div>
    );
}