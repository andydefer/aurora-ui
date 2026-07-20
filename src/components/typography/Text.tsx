import React from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, TextAlign, TextColor, FontWeight, TextVariant, } from '../../types';


export interface TextProps extends LayoutBaseProps {
    variant?: TextVariant;
    color?: TextColor;
    align?: TextAlign;
    weight?: FontWeight;
    truncate?: boolean;
    as?: React.ElementType;
    italic?: boolean;
    underline?: boolean;
    lineThrough?: boolean;
}

export function Text({
    children,
    variant = 'body',
    color = 'primary',
    align = 'left',
    weight = 'normal',
    truncate = false,
    as: Component = 'p',
    italic = false,
    underline = false,
    lineThrough = false,
    className = '',
    style = {},
}: React.PropsWithChildren<TextProps>) {
    const variantClasses: Record<TextVariant, string> = {
        h1: 'text-4xl font-bold',
        h2: 'text-3xl font-bold',
        h3: 'text-2xl font-bold',
        h4: 'text-xl font-bold',
        h5: 'text-lg font-bold',
        h6: 'text-base font-bold',
        body: 'text-base',
        small: 'text-sm',
        caption: 'text-xs',
    };

    const colorClasses: Record<TextColor, string> = {
        primary: 'text-foreground',
        secondary: 'text-secondary',
        muted: 'text-muted-foreground',
        danger: 'text-danger',
        success: 'text-success',
        warning: 'text-warning',
    };

    const alignClasses: Record<TextAlign, string> = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
    };

    const weightClasses: Record<FontWeight, string> = {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
    };

    const classes = clsx(
        variantClasses[variant],
        colorClasses[color],
        alignClasses[align],
        weightClasses[weight],
        truncate && 'truncate',
        italic && 'italic',
        underline && 'underline',
        lineThrough && 'line-through',
        className
    );

    return (
        <Component className={classes} style={style}>
            {children}
        </Component>
    );
}

export default Text;