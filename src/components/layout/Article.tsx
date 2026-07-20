import React from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Spacing } from '../../types';
import { User, Calendar, Clock } from 'lucide-react';

export interface ArticleProps extends LayoutBaseProps {
    author?: string;
    date?: string;
    readingTime?: string;
    image?: string;
    padding?: Spacing;
}

export function Article({
    children,
    author,
    date,
    readingTime,
    image,
    padding = 6,
    className = '',
    style = {},
}: React.PropsWithChildren<ArticleProps>) {
    const classes = clsx(
        'bg-white rounded-lg shadow-sm',
        padding !== undefined && `p-${padding}`,
        className
    );

    return (
        <article className={classes} style={style}>
            {image && (
                <div className="mb-4 -mt-6 -mx-6 rounded-t-lg overflow-hidden">
                    <img src={image} alt="" className="w-full h-48 object-cover" />
                </div>
            )}
            <div className="prose max-w-none">{children}</div>
            {(author || date || readingTime) && (
                <div className="mt-4 pt-4 border-t border-border flex gap-4 text-sm text-primary">
                    {author && (
                        <span className="flex items-center gap-1">
                            <User size={16} />
                            {author}
                        </span>
                    )}
                    {date && (
                        <span className="flex items-center gap-1">
                            <Calendar size={16} />
                            {date}
                        </span>
                    )}
                    {readingTime && (
                        <span className="flex items-center gap-1">
                            <Clock size={16} />
                            {readingTime}
                        </span>
                    )}
                </div>
            )}
        </article>
    );
}

export default Article;