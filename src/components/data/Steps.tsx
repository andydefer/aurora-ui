import { ReactNode } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, TextColor } from '../../types';
import { Check, Circle, AlertCircle, Clock } from 'lucide-react';

export type StepStatus = 'completed' | 'current' | 'pending' | 'error';

export interface StepItem {
    label: ReactNode;
    description?: ReactNode;
    status?: StepStatus;
    icon?: ReactNode;
}

export interface StepsProps extends LayoutBaseProps {
    items: StepItem[];
    orientation?: 'vertical' | 'horizontal';
    statusIcons?: boolean;
    color?: TextColor;
}

export function Steps({
    items,
    orientation = 'vertical',
    statusIcons = true,
    color = 'primary',
    className = '',
    style = {},
}: StepsProps) {
    const colorClasses: Record<TextColor, string> = {
        primary: 'text-primary border-primary bg-primary',
        secondary: 'text-secondary border-secondary bg-secondary',
        muted: 'text-muted-foreground border-muted bg-muted',
        danger: 'text-danger border-danger bg-danger',
        success: 'text-success border-success bg-success',
        warning: 'text-warning border-warning bg-warning',
    };

    const statusIconsMap = {
        completed: <Check size={16} />,
        current: <Circle size={16} />,
        pending: <Clock size={16} />,
        error: <AlertCircle size={16} />,
    };

    const statusClasses = {
        completed: 'bg-primary text-primary-foreground border-primary',
        current: 'border-primary ring-4 ring-primary/20 bg-background text-primary',
        pending: 'bg-muted border-muted text-muted-foreground',
        error: 'bg-danger text-white border-danger',
    };

    const classes = clsx(
        'flex',
        orientation === 'vertical' ? 'flex-col gap-6' : 'flex-row gap-8 overflow-x-auto pb-4',
        className
    );

    return (
        <div className={classes} style={style}>
            {items.map((item, index) => {
                const status = item.status || 'pending';
                const isLast = index === items.length - 1;

                return (
                    <div key={index} className={clsx(
                        'flex',
                        orientation === 'vertical' ? 'flex-row gap-4' : 'flex-col items-center gap-2 flex-1'
                    )}>
                        <div className="relative flex items-center">
                            <div className={clsx(
                                'w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0',
                                statusClasses[status]
                            )}>
                                {statusIcons && statusIconsMap[status]}
                            </div>
                            {!isLast && (
                                <div className={clsx(
                                    'absolute',
                                    orientation === 'vertical'
                                        ? 'left-4 top-8 w-0.5 h-[calc(100%-0.5rem)]'
                                        : 'top-4 left-8 h-0.5 w-[calc(100%-0.5rem)]',
                                    status === 'completed' ? 'bg-primary' : 'bg-border'
                                )} />
                            )}
                        </div>
                        <div className={clsx(
                            'flex-1',
                            orientation === 'vertical' ? 'text-left' : 'text-center'
                        )}>
                            <div className={clsx(
                                'text-sm font-medium',
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