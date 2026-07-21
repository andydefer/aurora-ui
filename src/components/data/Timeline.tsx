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

export interface TimelineProps extends LayoutBaseProps {
    items: TimelineItem[];
    orientation?: 'vertical' | 'horizontal';
    alternate?: boolean;
    color?: TextColor;
}

export function Timeline({
    items,
    orientation = 'vertical',
    alternate = false,
    color = 'primary',
    className = '',
    style = {},
}: TimelineProps) {
    const colorClasses: Record<TextColor, string> = {
        primary: 'border-primary bg-primary',
        secondary: 'border-secondary bg-secondary',
        muted: 'border-muted bg-muted',
        danger: 'border-danger bg-danger',
        success: 'border-success bg-success',
        warning: 'border-warning bg-warning',
    };

    const classes = clsx(
        'relative',
        orientation === 'vertical' ? 'flex flex-col gap-6' : 'flex flex-row gap-8 overflow-x-auto pb-4',
        className
    );

    const itemClasses = (index: number) => clsx(
        'relative flex',
        orientation === 'vertical' ? 'flex-row gap-4' : 'flex-col items-center gap-2 min-w-[120px]',
        alternate && orientation === 'vertical' && index % 2 === 0 ? 'flex-row-reverse' : '',
        alternate && orientation === 'vertical' && index % 2 === 0 ? 'text-right' : ''
    );

    const lineClasses = (index: number) => clsx(
        'absolute',
        orientation === 'vertical'
            ? 'left-3 top-6 w-0.5 h-[calc(100%-1.5rem)]'
            : 'top-3 left-6 h-0.5 w-[calc(100%-1.5rem)]',
        index < items.length - 1 ? 'bg-border' : 'hidden'
    );

    const dotClasses = clsx(
        'w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center',
        colorClasses[color],
        'bg-background'
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