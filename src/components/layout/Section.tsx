import React from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Spacing, Background, ContainerMaxWidth, TextAlign, TextColor } from '../../types';
import { Heading } from '../typography/Heading';
import { Text } from '../typography/Text';

export interface SectionProps extends LayoutBaseProps {
    title?: string;
    subtitle?: string;
    spacing?: Spacing;
    background?: Background;
    padding?: Spacing;
    paddingX?: Spacing;
    paddingY?: Spacing;
    fullWidth?: boolean;
    maxWidth?: ContainerMaxWidth;
    as?: React.ElementType;
    titleAlign?: TextAlign;
    titleColor?: TextColor;
    divider?: boolean;
    separator?: boolean;
}

export function Section({
    children,
    title,
    subtitle,
    spacing = 4,
    background = 'transparent',
    padding = 6,
    paddingX,
    paddingY,
    fullWidth = false,
    maxWidth = 'xl',
    as: Component = 'section',
    titleAlign = 'left',
    titleColor = 'primary',
    divider = false,
    separator = false,
    className = '',
    style = {},
}: React.PropsWithChildren<SectionProps>) {
    const backgroundClasses: Record<Background, string> = {
        transparent: 'bg-transparent',
        primary: 'bg-primary/5',
        secondary: 'bg-secondary/5',
        muted: 'bg-muted/10',
        card: 'bg-card',
    };

    const maxWidthClasses: Record<ContainerMaxWidth, string> = {
        xs: 'max-w-xs',
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        full: 'max-w-full',
    };

    const alignClasses: Record<TextAlign, string> = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
    };

    const classes = clsx(
        'w-full transition-all duration-200',
        backgroundClasses[background],
        padding !== undefined && `py-${padding}`,
        paddingX !== undefined && `px-${paddingX}`,
        paddingY !== undefined && `py-${paddingY}`,
        fullWidth ? 'px-0' : `px-${padding}`,
        divider && 'border-b border-border',
        separator && 'relative before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-16 before:h-1 before:bg-primary before:rounded-full',
        separator && 'pt-6',
        className
    );

    const contentClasses = clsx(
        'w-full mx-auto',
        fullWidth ? 'max-w-full' : maxWidthClasses[maxWidth]
    );

    const spacingClass = spacing !== undefined ? `gap-${spacing}` : '';

    return (
        <Component className={classes} style={style}>
            <div className={contentClasses}>
                {(title || subtitle) && (
                    <div className={clsx('mb-6', alignClasses[titleAlign])}>
                        {title && (
                            <Heading
                                level={2}
                                color={titleColor}
                                className={clsx(
                                    'mb-2',
                                    titleAlign === 'center' && 'mx-auto',
                                    titleAlign === 'center' ? 'text-center' : '',
                                    titleAlign === 'right' ? 'text-right' : ''
                                )}
                            >
                                {title}
                            </Heading>
                        )}
                        {subtitle && (
                            <Text
                                variant="body"
                                color="muted"
                                className={clsx(
                                    'max-w-2xl',
                                    titleAlign === 'center' && 'mx-auto text-center',
                                    titleAlign === 'right' && 'ml-auto text-right'
                                )}
                            >
                                {subtitle}
                            </Text>
                        )}
                    </div>
                )}
                <div className={clsx('flex flex-col', spacingClass)}>
                    {children}
                </div>
            </div>
        </Component>
    );
}

export default Section;