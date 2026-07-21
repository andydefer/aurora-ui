// src/components/data/Steps.tsx
import { ReactNode } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, TextColor } from '../../types';
import { Check, Circle, AlertCircle, Clock } from 'lucide-react';

export type StepStatus = 'completed' | 'current' | 'pending' | 'destructive';

export interface StepItem {
    label: ReactNode;
    description?: ReactNode;
    status?: StepStatus;
    icon?: ReactNode;
}

export type StepsOrientation = 'vertical' | 'horizontal';

export interface StepsProps extends LayoutBaseProps {
    items: StepItem[];
    orientation?: StepsOrientation;
    statusIcons?: boolean;
    color?: TextColor;
    size?: 'sm' | 'md' | 'lg';
    clickable?: boolean;
    onStepClick?: (index: number) => void;
    className?: string;
}

export function Steps({
    items,
    orientation = 'vertical',
    statusIcons = true,
    size = 'md',
    clickable = false,
    onStepClick,
    className = '',
    style = {},
}: StepsProps) {
    const statusIconsMap = {
        completed: <Check size={16} />,
        current: <Circle size={16} />,
        pending: <Clock size={16} />,
        destructive: <AlertCircle size={16} />,
    };

    const statusClasses = {
        completed: 'bg-primary text-primary-foreground border-primary',
        current: 'border-primary ring-4 ring-primary/20 bg-background text-primary',
        pending: 'bg-muted border-muted text-muted-foreground',
        destructive: 'bg-destructive text-destructive-foreground border-destructive',
    };

    const sizeClasses = {
        sm: { circle: 'w-6 h-6 text-xs', gap: 'gap-3', label: 'text-xs', circlePos: 3 },
        md: { circle: 'w-8 h-8 text-sm', gap: 'gap-4', label: 'text-sm', circlePos: 4 },
        lg: { circle: 'w-10 h-10 text-base', gap: 'gap-6', label: 'text-base', circlePos: 5 },
    };

    const currentSize = sizeClasses[size];

    const classes = clsx(
        'flex',
        orientation === 'vertical' ? `flex-col ${currentSize.gap}` : `flex-row gap-8 overflow-x-auto pb-4`,
        className
    );

    const handleStepClick = (index: number) => {
        if (clickable && onStepClick) {
            onStepClick(index);
        }
    };

    return (
        <div className={classes} style={style}>
            {items.map((item, index) => {
                const status = item.status || 'pending';
                const isLast = index === items.length - 1;

                return (
                    <div
                        key={index}
                        className={clsx(
                            'flex',
                            orientation === 'vertical' ? 'flex-row gap-4' : 'flex-col items-center gap-2 flex-1',
                            clickable && 'cursor-pointer'
                        )}
                        onClick={() => handleStepClick(index)}
                        role={clickable ? 'button' : undefined}
                        tabIndex={clickable ? 0 : undefined}
                        onKeyDown={(e) => {
                            if (clickable && (e.key === 'Enter' || e.key === ' ')) {
                                e.preventDefault();
                                handleStepClick(index);
                            }
                        }}
                    >
                        <div className="relative flex items-center">
                            <div className={clsx(
                                'rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300',
                                currentSize.circle,
                                statusClasses[status]
                            )}>
                                {statusIcons && statusIconsMap[status]}
                            </div>
                            {!isLast && (
                                <div className={clsx(
                                    'absolute',
                                    orientation === 'vertical'
                                        ? `left-[${currentSize.circlePos}px] top-[${currentSize.circlePos * 2}px] w-0.5 h-[calc(100%-${currentSize.circlePos * 2}px)]`
                                        : `top-[${currentSize.circlePos}px] left-[${currentSize.circlePos * 2}px] h-0.5 w-[calc(100%-${currentSize.circlePos * 2}px)]`,
                                    status === 'completed' ? 'bg-primary' : 'bg-border'
                                )} />
                            )}
                        </div>
                        <div className={clsx(
                            'flex-1',
                            orientation === 'vertical' ? 'text-left' : 'text-center'
                        )}>
                            <div className={clsx(
                                'font-medium',
                                currentSize.label,
                                status === 'completed' ? 'text-foreground' :
                                    status === 'current' ? 'text-primary' : 'text-muted-foreground'
                            )}>
                                {item.label}
                            </div>
                            {item.description && (
                                <div className="text-xs text-muted-foreground mt-0.5">
                                    {item.description}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Steps;