// src/components/feedback/CircularProgress.tsx
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';

export type CircularProgressVariant = 'primary' | 'success' | 'warning' | 'destructive';

export interface CircularProgressProps extends LayoutBaseProps {
    value?: number;
    size?: number;
    thickness?: number;
    variant?: CircularProgressVariant;
    label?: string;
    showValue?: boolean;
    animate?: boolean;
}

export function CircularProgress({
    value = 0,
    size = 48,
    thickness = 4,
    variant = 'primary',
    label,
    showValue = true,
    animate = true,
    className = '',
    style = {},
}: CircularProgressProps) {
    const percentage = Math.min(Math.max((value / 100) * 100, 0), 100);
    const radius = (size - thickness) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    const variantClasses = {
        primary: 'stroke-primary',
        success: 'stroke-success',
        warning: 'stroke-warning',
        destructive: 'stroke-destructive',
    };

    const classes = clsx(
        'relative inline-flex items-center justify-center',
        className
    );

    return (
        <div className={classes} style={style}>
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className={clsx('transform -rotate-90', animate && 'transition-all duration-300')}
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={thickness}
                    className="text-muted/30"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={thickness}
                    strokeLinecap="round"
                    className={clsx(
                        variantClasses[variant],
                        animate && 'transition-all duration-500 ease-in-out'
                    )}
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: offset,
                    }}
                />
            </svg>
            {showValue && (
                <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-foreground">
                    {Math.round(percentage)}%
                </span>
            )}
            {label && (
                <span className="absolute -bottom-6 text-xs text-muted-foreground">
                    {label}
                </span>
            )}
        </div>
    );
}

export default CircularProgress;