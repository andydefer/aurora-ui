import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';

export interface ProgressProps extends LayoutBaseProps {
    value: number;
    max?: number;
    label?: string;
    showValue?: boolean;
    animated?: boolean;
    variant?: 'default' | 'success' | 'destructive' | 'warning';
}

export function Progress({
    value,
    max = 100,
    label,
    showValue = false,
    animated = false,
    variant = 'default',
    className = '',
    style = {},
}: ProgressProps) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const variantClasses = {
        default: 'bg-primary',
        success: 'bg-success',
        destructive: 'bg-destructive',
        warning: 'bg-warning',
    };

    const classes = clsx(
        'w-full h-2 rounded-full bg-muted overflow-hidden',
        className
    );

    const barClasses = clsx(
        'h-full rounded-full transition-all duration-300',
        variantClasses[variant],
        animated && 'animate-pulse'
    );

    return (
        <div className="w-full">
            {(label || showValue) && (
                <div className="flex justify-between text-sm mb-1">
                    {label && <span className="text-foreground">{label}</span>}
                    {showValue && (
                        <span className="text-muted-foreground">
                            {Math.round(percentage)}%
                        </span>
                    )}
                </div>
            )}
            <div className={classes} style={style}>
                <div
                    className={barClasses}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

export default Progress;