// src/components/typography/Heading.tsx
import React from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, TextAlign, TextColor, FontWeight } from '../../types';

export interface HeadingProps extends LayoutBaseProps {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    color?: TextColor;
    align?: TextAlign;
    truncate?: boolean;
    weight?: FontWeight;
}

export function Heading({
    children,
    level = 1,
    color = 'primary',
    align = 'left',
    truncate = false,
    weight = 'bold',
    className = '',
    style = {},
}: React.PropsWithChildren<HeadingProps>) {
    const sizeClasses = {
        1: 'text-4xl',
        2: 'text-3xl',
        3: 'text-2xl',
        4: 'text-xl',
        5: 'text-lg',
        6: 'text-base',
    };

    const colorClasses = {
        primary: 'text-primary',
        secondary: 'text-secondary',
        muted: 'text-muted',
        destructive: 'text-destructive',
        success: 'text-success',
        warning: 'text-warning',
    };

    const alignClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
    };

    const weightClasses = {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
    };

    const classes = clsx(
        sizeClasses[level],
        colorClasses[color],
        alignClasses[align],
        weightClasses[weight],
        truncate && 'truncate',
        className
    );

    // ✅ Solution: mapping direct des balises HTML
    const tags = {
        1: 'h1',
        2: 'h2',
        3: 'h3',
        4: 'h4',
        5: 'h5',
        6: 'h6',
    } as const;

    const Tag = tags[level];

    return <Tag className={classes} style={style}>{children}</Tag>;
}

export default Heading;