// src/components/feedback/ProgressBar.tsx
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';

export type ProgressBarVariant = 'primary' | 'success' | 'warning' | 'destructive';

export interface ProgressBarProps extends LayoutBaseProps {
    value?: number;
    max?: number;
    variant?: ProgressBarVariant;
    animated?: boolean;
    striped?: boolean;
    label?: string;
    showValue?: boolean;
    height?: 'sm' | 'md' | 'lg';
    rounded?: boolean;
}

export function ProgressBar({
    value = 0,
    max = 100,
    variant = 'primary',
    animated = false,
    striped = false,
    label,
    showValue = true,
    height = 'md',
    rounded = true,
    className = '',
    style = {},
}: ProgressBarProps) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const variantClasses = {
        primary: 'bg-primary',
        success: 'bg-success',
        warning: 'bg-warning',
        destructive: 'bg-destructive',
    };

    const heightClasses = {
        sm: 'h-1.5',
        md: 'h-2.5',
        lg: 'h-4',
    };

    const classes = clsx(
        'w-full bg-muted overflow-hidden',
        rounded ? 'rounded-full' : 'rounded-none',
        heightClasses[height],
        className
    );

    const barClasses = clsx(
        'h-full transition-all duration-500 ease-in-out',
        variantClasses[variant],
        rounded ? 'rounded-full' : 'rounded-none',
        animated && 'animate-pulse',
        striped && 'bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:24px_100%] animate-stripe'
    );

    return (
        <div className="w-full">
            {(label || showValue) && (
                <div className="flex justify-between text-sm mb-1.5">
                    {label && <span className="text-foreground font-medium">{label}</span>}
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