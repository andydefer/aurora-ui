import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';
import { Loader2 } from 'lucide-react';

export interface SpinnerProps extends LayoutBaseProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    color?: string;
    thickness?: number;
    label?: string;
}

export function Spinner({
    size = 'md',
    color = 'text-primary',
    thickness = 2,
    label,
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

    const classes = clsx(
        'animate-spin',
        color,
        sizeClasses[size],
        className
    );

    return (
        <div className="inline-flex items-center gap-2">
            <Loader2 className={classes} style={style} strokeWidth={thickness} />
            {label && (
                <span className="text-sm text-muted-foreground">{label}</span>
            )}
        </div>
    );
}

export default Spinner;