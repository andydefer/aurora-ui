// src/components/feedback/Spinner.tsx
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, TextColor } from '../../types';
import { Loader2 } from 'lucide-react';

export interface SpinnerProps extends LayoutBaseProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    color?: TextColor;
    thickness?: number;
    label?: string;
    labelPosition?: 'left' | 'right' | 'bottom' | 'top';
}

export function Spinner({
    size = 'md',
    color = 'primary',
    thickness = 2,
    label,
    labelPosition = 'right',
    className = '',
    style = {},
}: SpinnerProps) {
    const sizeClasses = {
        xs: 'w-3 h-3',
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12',
    };

    const colorClasses: Record<TextColor, string> = {
        primary: 'text-primary',
        secondary: 'text-secondary',
        muted: 'text-muted-foreground',
        destructive: 'text-destructive',
        success: 'text-success',
        warning: 'text-warning',
    };

    const labelPositionClasses = {
        left: 'flex-row',
        right: 'flex-row-reverse',
        bottom: 'flex-col',
        top: 'flex-col-reverse',
    };

    const classes = clsx(
        'animate-spin',
        colorClasses[color],
        sizeClasses[size],
        className
    );

    return (
        <div className={clsx(
            'inline-flex items-center gap-2',
            labelPositionClasses[labelPosition]
        )}>
            <Loader2 className={classes} style={{ strokeWidth: thickness, ...style }} />
            {label && (
                <span className={clsx(
                    'text-sm text-muted-foreground',
                    (labelPosition === 'bottom' || labelPosition === 'top') && 'text-center'
                )}>
                    {label}
                </span>
            )}
        </div>
    );
}

export default Spinner;