import React from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, TextAlign, TextColor, FontWeight } from '../../types';

export interface ParagraphProps extends LayoutBaseProps {
    align?: TextAlign;
    color?: TextColor;
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
    leading?: 'none' | 'tight' | 'normal' | 'relaxed' | 'loose';
    maxLines?: number;
    weight?: FontWeight;
    as?: React.ElementType;
    indent?: boolean;
    firstLetter?: boolean;
    dropCap?: boolean;
    spaced?: boolean;
}

export function Paragraph({
    children,
    align = 'left',
    color = 'primary',
    size = 'base',
    leading = 'normal',
    maxLines,
    weight = 'normal',
    as: Component = 'p',
    indent = false,
    firstLetter = false,
    dropCap = false,
    spaced = false,
    className = '',
    style = {},
}: React.PropsWithChildren<ParagraphProps>) {
    const sizeClasses = {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
    };

    const colorClasses: Record<TextColor, string> = {
        primary: 'text-foreground',
        secondary: 'text-secondary',
        muted: 'text-muted-foreground',
        destructive: 'text-destructive',
        success: 'text-success',
        warning: 'text-warning',
    };

    const alignClasses: Record<TextAlign, string> = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
    };

    const leadingClasses = {
        none: 'leading-none',
        tight: 'leading-tight',
        normal: 'leading-normal',
        relaxed: 'leading-relaxed',
        loose: 'leading-loose',
    };

    const weightClasses: Record<FontWeight, string> = {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
    };

    const classes = clsx(
        sizeClasses[size],
        colorClasses[color],
        alignClasses[align],
        leadingClasses[leading],
        weightClasses[weight],
        indent && 'indent-8',
        spaced && 'tracking-wide',
        maxLines && `line-clamp-${maxLines}`,
        dropCap && 'first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:text-primary',
        firstLetter && 'first-letter:text-4xl first-letter:font-bold first-letter:text-primary',
        className
    );

    return (
        <Component className={classes} style={style}>
            {children}
        </Component>
    );
}

export default Paragraph;