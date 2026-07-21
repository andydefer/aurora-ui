import React from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Size, TextColor } from '../../types';
import { LucideIcon } from 'lucide-react';

export interface IconProps extends LayoutBaseProps {
    icon: LucideIcon;
    size?: Size | number;
    color?: TextColor | string;
    stroke?: number;
    fill?: string;
    rotate?: number;
    spin?: boolean;
    pulse?: boolean;
    bounce?: boolean;
    flip?: 'horizontal' | 'vertical' | 'both';
    label?: string;
}

export function Icon({
    icon: IconComponent,
    size = 'md',
    color = 'primary',
    stroke = 2,
    fill = 'none',
    rotate,
    spin = false,
    pulse = false,
    bounce = false,
    flip,
    label,
    className = '',
    style = {},
}: IconProps) {
    const sizeClasses: Record<Size, string> = {
        xs: 'w-3 h-3',
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
        xl: 'w-8 h-8',
        '2xl': 'w-10 h-10',
        '3xl': 'w-12 h-12',
        '4xl': 'w-14 h-14',
        full: 'w-16 h-16',
    };

    const colorClasses: Record<TextColor, string> = {
        primary: 'text-foreground',
        secondary: 'text-secondary',
        muted: 'text-muted-foreground',
        destructive: 'text-destructive',
        success: 'text-success',
        warning: 'text-warning',
    };

    const flipClasses = {
        horizontal: 'scale-x-[-1]',
        vertical: 'scale-y-[-1]',
        both: 'scale-x-[-1] scale-y-[-1]',
    };

    const isSizeNumber = typeof size === 'number';
    const sizeStyle = isSizeNumber ? `${size}px` : undefined;
    const sizeClass = !isSizeNumber ? sizeClasses[size] : '';

    const classes = clsx(
        'shrink-0 transition-all duration-200',
        sizeClass,
        spin && 'animate-spin',
        pulse && 'animate-pulse',
        bounce && 'animate-bounce',
        flip && flipClasses[flip],
        typeof color === 'string' && color in colorClasses
            ? colorClasses[color as TextColor]
            : '',
        className
    );

    const styles: React.CSSProperties = {
        width: sizeStyle,
        height: sizeStyle,
        color: typeof color === 'string' && !(color in colorClasses) ? color : undefined,
        strokeWidth: stroke,
        fill,
        ...(rotate && { transform: `rotate(${rotate}deg)` }),
        ...style,
    };

    return (
        <IconComponent
            className={classes}
            style={styles}
            strokeWidth={stroke}
            aria-label={label}
            role={label ? 'img' : undefined}
        />
    );
}

export default Icon;