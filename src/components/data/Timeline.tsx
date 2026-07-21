// src/components/data/Timeline.tsx
import { ReactNode } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, TextColor } from '../../types';

export interface TimelineItem {
    title: ReactNode;
    description?: ReactNode;
    time?: ReactNode;
    icon?: ReactNode;
    color?: TextColor;
    active?: boolean;
}

export type TimelineOrientation = 'vertical' | 'horizontal';

export interface TimelineProps extends LayoutBaseProps {
    items: TimelineItem[];
    orientation?: TimelineOrientation;
    alternate?: boolean;
    color?: TextColor;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function Timeline({
    items,
    orientation = 'vertical',
    alternate = false,
    color = 'primary',
    size = 'md',
    className = '',
    style = {},
}: TimelineProps) {
    const colorClasses: Record<TextColor, string> = {
        primary: 'border-primary bg-primary',
        secondary: 'border-secondary bg-secondary',
        muted: 'border-muted bg-muted',
        destructive: 'border-destructive bg-destructive',
        success: 'border-success bg-success',
        warning: 'border-warning bg-warning',
    };

    const sizeClasses = {
        sm: { dot: 'w-4 h-4', line: 'w-0.5', gap: 'gap-3' },
        md: { dot: 'w-6 h-6', line: 'w-0.5', gap: 'gap-4' },
        lg: { dot: 'w-8 h-8', line: 'w-0.5', gap: 'gap-6' },
    };

    const classes = clsx(
        'relative',
        orientation === 'vertical' ? `flex flex-col ${sizeClasses[size].gap}` : `flex flex-row gap-8 overflow-x-auto pb-4`,
        className
    );

    const itemClasses = (index: number) => clsx(
        'relative flex',
        orientation === 'vertical' ? `flex-row ${sizeClasses[size].gap}` : 'flex-col items-center gap-2 min-w-[120px]',
        alternate && orientation === 'vertical' && index % 2 === 0 ? 'flex-row-reverse' : '',
        alternate && orientation === 'vertical' && index % 2 === 0 ? 'text-right' : ''
    );

    const lineClasses = (index: number) => clsx(
        'absolute bg-border',
        orientation === 'vertical'
            ? `left-${parseInt(sizeClasses[size].dot) / 2} top-${parseInt(sizeClasses[size].dot)} w-${sizeClasses[size].line} h-[calc(100%-${parseInt(sizeClasses[size].dot)}rem)]`
            : `top-${parseInt(sizeClasses[size].dot) / 2} left-${parseInt(sizeClasses[size].dot)} h-${sizeClasses[size].line} w-[calc(100%-${parseInt(sizeClasses[size].dot)}rem)]`,
        index < items.length - 1 ? 'bg-border' : 'hidden'
    );

    const dotClasses = clsx(
        'rounded-full border-2 shrink-0 flex items-center justify-center',
        sizeClasses[size].dot,
        colorClasses[color],
        'bg-background transition-all duration-300',
        'hover:scale-110'
    );

    const contentClasses = clsx(
        'flex-1'
    );

    return (
        <div className={classes} style={style}>
            {items.map((item, index) => (
                <div key={index} className={itemClasses(index)}>
                    <div className="relative">
                        <div className={dotClasses}>
                            {item.icon}
                        </div>
                        <div className={lineClasses(index)} />
                    </div>
                    <div className={contentClasses}>
                        <div className={clsx(
                            'font-medium text-foreground',
                            item.active && 'text-primary'
                        )}>
                            {item.title}
                        </div>
                        {item.description && (
                            <div className="text-sm text-muted-foreground mt-0.5">
                                {item.description}
                            </div>
                        )}
                        {item.time && (
                            <div className="text-xs text-muted-foreground mt-1">
                                {item.time}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Timeline;