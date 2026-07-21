import { ReactNode } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';
import { X } from 'lucide-react';

export type ChipVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'muted';

export interface ChipProps extends LayoutBaseProps {
    label?: string;
    children?: ReactNode;
    onDelete?: () => void;
    avatar?: ReactNode;
    variant?: ChipVariant;
    clickable?: boolean;
    icon?: ReactNode;
    onClick?: () => void;
}

export function Chip({
    label,
    children,
    onDelete,
    avatar,
    variant = 'primary',
    clickable = false,
    icon,
    onClick,
    className = '',
    style = {},
}: ChipProps) {
    const variantClasses = {
        primary: 'bg-primary/10 text-primary hover:bg-primary/20',
        secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/20',
        success: 'bg-success/10 text-success hover:bg-success/20',
        warning: 'bg-warning/10 text-warning hover:bg-warning/20',
        error: 'bg-error/10 text-error hover:bg-error/20',
        info: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20',
        muted: 'bg-muted text-muted-foreground hover:bg-muted/80',
    };

    const isClickable = clickable || onClick;

    const classes = clsx(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium transition-all duration-200',
        variantClasses[variant],
        isClickable && 'cursor-pointer hover:scale-105',
        className
    );

    const handleClick = () => {
        if (onClick) onClick();
    };

    return (
        <span
            className={classes}
            style={style}
            onClick={handleClick}
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : undefined}
            onKeyDown={(e) => {
                if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    handleClick();
                }
            }}
        >
            {avatar && <span className="shrink-0">{avatar}</span>}
            {icon && <span className="shrink-0">{icon}</span>}
            <span>{label || children}</span>
            {onDelete && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    className="shrink-0 p-0.5 rounded-full hover:bg-black/5 transition-colors"
                    aria-label="Supprimer"
                >
                    <X size={14} />
                </button>
            )}
        </span>
    );
}

export default Chip;