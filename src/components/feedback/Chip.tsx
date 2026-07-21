// src/components/feedback/Chip.tsx
import { ReactNode, useState } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';
import { X } from 'lucide-react';

export type ChipVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info' | 'muted';

export interface ChipProps extends LayoutBaseProps {
    label?: string;
    children?: ReactNode;
    onDelete?: () => void;
    avatar?: ReactNode;
    variant?: ChipVariant;
    clickable?: boolean;
    icon?: ReactNode;
    onClick?: () => void;
    size?: 'sm' | 'md' | 'lg';
    selected?: boolean;
    removable?: boolean;
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
    size = 'md',
    selected = false,
    removable = false,
    className = '',
    style = {},
}: ChipProps) {
    const [isVisible, setIsVisible] = useState(true);

    const variantClasses = {
        primary: 'bg-primary/10 text-primary hover:bg-primary/20 border-primary/20',
        secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/20 border-secondary/20',
        success: 'bg-success/10 text-success hover:bg-success/20 border-success/20',
        warning: 'bg-warning/10 text-warning hover:bg-warning/20 border-warning/20',
        destructive: 'bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20',
        info: 'bg-primary/10 text-primary hover:bg-primary/20 border-primary/20',
        muted: 'bg-muted text-muted-foreground hover:bg-muted/80 border-muted/20',
    };

    const sizeClasses = {
        sm: 'px-2 py-0.5 text-xs gap-1',
        md: 'px-3 py-1 text-sm gap-1.5',
        lg: 'px-4 py-1.5 text-base gap-2',
    };

    const isClickable = clickable || onClick;

    const handleDelete = () => {
        setIsVisible(false);
        onDelete?.();
    };

    if (!isVisible) return null;

    const classes = clsx(
        'inline-flex items-center font-medium transition-all duration-200',
        'border rounded-full',
        sizeClasses[size],
        variantClasses[variant],
        selected && 'ring-2 ring-primary/30',
        isClickable && 'cursor-pointer hover:scale-105 active:scale-95',
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
            {(removable || onDelete) && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                    }}
                    className="shrink-0 p-0.5 rounded-full hover:bg-black/5 transition-colors"
                    aria-label="Supprimer"
                >
                    <X size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} />
                </button>
            )}
        </span>
    );
}

export default Chip;