import React from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, TextAlign, TextColor } from '../../types';
import { Quote } from 'lucide-react';
import { Avatar } from '../media/Avatar';

export interface BlockquoteProps extends LayoutBaseProps {
    author?: string;
    authorAvatar?: string;
    cite?: string;
    align?: TextAlign;
    color?: TextColor;
    showIcon?: boolean;
    compact?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export function Blockquote({
    children,
    author,
    authorAvatar,
    cite,
    align = 'left',
    color = 'primary',
    showIcon = true,
    compact = false,
    size = 'md',
    className = '',
    style = {},
}: React.PropsWithChildren<BlockquoteProps>) {
    const colorClasses: Record<TextColor, string> = {
        primary: 'border-primary/30 text-foreground',
        secondary: 'border-secondary/30 text-secondary',
        muted: 'border-muted/30 text-muted-foreground',
        destructive: 'border-destructive/30 text-destructive',
        success: 'border-success/30 text-success',
        warning: 'border-warning/30 text-warning',
    };

    const alignClasses: Record<TextAlign, string> = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
    };

    const sizeClasses = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
    };

    const classes = clsx(
        'group relative rounded-2xl border bg-white/50 backdrop-blur-sm transition-all duration-300',
        'hover:shadow-xl hover:scale-[1.01]',
        colorClasses[color],
        alignClasses[align],
        compact ? 'p-4' : 'p-6',
        sizeClasses[size],
        className
    );

    const quoteIconClasses = clsx(
        'absolute opacity-10',
        align === 'left' && 'top-4 left-4',
        align === 'center' && 'top-4 left-1/2 -translate-x-1/2',
        align === 'right' && 'top-4 right-4'
    );

    const contentClasses = clsx(
        'relative z-10',
        showIcon && align === 'center' && 'pt-8',
        showIcon && align !== 'center' && 'pl-8'
    );

    return (
        <blockquote className={classes} style={style} cite={cite}>
            {showIcon && (
                <Quote size={compact ? 32 : 48} className={quoteIconClasses} />
            )}
            <div className={contentClasses}>
                <p className="font-medium leading-relaxed italic">
                    &ldquo;{children}&rdquo;
                </p>
                {(author || cite) && (
                    <footer className={clsx(
                        'flex items-center gap-3 mt-3',
                        compact ? 'text-xs' : 'text-sm',
                        'text-muted-foreground/80'
                    )}>
                        {authorAvatar && (
                            <Avatar
                                src={authorAvatar}
                                name={author || ''}
                                size="sm"
                                shape="circle"
                            />
                        )}
                        {author && (
                            <span className="font-medium text-foreground/80">
                                — {author}
                            </span>
                        )}
                        {cite && (
                            <cite className="text-muted-foreground/60">
                                <a
                                    href={cite}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary transition-colors border-b border-dotted border-muted-foreground/30"
                                >
                                    {cite}
                                </a>
                            </cite>
                        )}
                    </footer>
                )}
            </div>
        </blockquote>
    );
}

export default Blockquote;