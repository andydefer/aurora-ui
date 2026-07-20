import React from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Spacing } from '../../types';
import { Heading } from '../Typography/Heading';

export interface SectionProps extends LayoutBaseProps {
    title?: string;
    spacing?: Spacing;
    background?: 'white' | 'gray' | 'transparent';
    padding?: Spacing;
    fullWidth?: boolean;
}

export function Section({
    children,
    title,
    spacing = 4,
    background = 'white',
    padding = 6,
    fullWidth = false,
    className = '',
    style = {},
}: React.PropsWithChildren<SectionProps>) {
    const bgClasses = {
        white: 'bg-white',
        gray: 'bg-gray-50',
        transparent: 'bg-transparent',
    };

    const classes = clsx(
        'w-full text-primary',
        bgClasses[background],
        padding !== undefined && `py-${padding}`,
        fullWidth ? 'px-0' : `px-${padding}`,
        className
    );

    return (
        <section className={classes} style={style}>
            <div className={fullWidth ? 'w-full' : 'container mx-auto'}>
                {title && (
                    <Heading level={2} className={`mb-${spacing}`}>
                        {title}
                    </Heading>
                )}
                {children}
            </div>
        </section>
    );
}

export default Section;