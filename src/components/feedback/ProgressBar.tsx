import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';

export type ProgressBarVariant = 'primary' | 'success' | 'warning' | 'error';

export interface ProgressBarProps extends LayoutBaseProps {
    value?: number;
    max?: number;
    variant?: ProgressBarVariant;
    animated?: boolean;
    striped?: boolean;
    label?: string;
    showValue?: boolean;
}

export function ProgressBar({
    value = 0,
    max = 100,
    variant = 'primary',
    animated = false,
    striped = false,
    label,
    showValue = true,
    className = '',
    style = {},
}: ProgressBarProps) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const variantClasses = {
        primary: 'bg-primary',
        success: 'bg-success',
        warning: 'bg-warning',
        error: 'bg-danger',
    };

    const classes = clsx(
        'w-full rounded-full bg-muted overflow-hidden',
        className
    );

    const barClasses = clsx(
        'h-full rounded-full transition-all duration-300',
        variantClasses[variant],
        animated && 'animate-pulse',
        striped && 'bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:24px_100%] animate-stripe'
    );

    return (
        <div className="w-full">
            {(label || showValue) && (
                <div className="flex justify-between text-sm mb-1.5">
                    {label && <span className="text-foreground">{label}</span>}
                    {showValue && (
                        <span className="text-muted-foreground font-mono">
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

export default ProgressBar;