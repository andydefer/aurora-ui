import React from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Spacing } from '../../types';
import { User, Calendar, Clock, Eye, Share2, Bookmark } from 'lucide-react';
import { Image, ImageProps } from '../media/Image';

export interface ArticleProps extends LayoutBaseProps {
    author?: string;
    authorAvatar?: string;
    date?: string;
    readingTime?: string;
    views?: number;
    image?: Omit<ImageProps, 'className' | 'style'>;
    padding?: Spacing;
    title?: string;
    excerpt?: string;
    tags?: string[];
    showShare?: boolean;
    showBookmark?: boolean;
}

export function Article({
    children,
    author,
    authorAvatar,
    date,
    readingTime,
    views,
    image,
    title,
    excerpt,
    tags = [],
    padding = 6,
    showShare = false,
    showBookmark = false,
    className = '',
    style = {},
}: React.PropsWithChildren<ArticleProps>) {
    const classes = clsx(
        'bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300',
        padding !== undefined && `p-${padding}`,
        className
    );

    return (
        <article className={classes} style={style}>
            {/* Image */}
            {image && (
                <div className="relative -mt-6 -mx-6 rounded-t-xl overflow-hidden">
                    <Image
                        {...image}
                        radius="none"
                        className="w-full h-64 object-cover"
                    />
                    {showBookmark && (
                        <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm">
                            <Bookmark size={18} className="text-primary" />
                        </button>
                    )}
                </div>
            )}

            {/* Contenu */}
            <div className="mt-4">
                {/* Tags */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="text-xs font-medium px-2.5 py-1 bg-primary/10 text-primary rounded-full"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Titre */}
                {title && (
                    <h3 className="text-xl font-bold text-foreground mb-2 hover:text-primary transition-colors">
                        {title}
                    </h3>
                )}

                {/* Extrait */}
                {excerpt && (
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {excerpt}
                    </p>
                )}

                {/* Contenu principal */}
                <div className="prose prose-sm max-w-none text-foreground leading-relaxed">
                    {children}
                </div>
            </div>

            {/* Métadonnées */}
            {(author || date || readingTime || views) && (
                <div className="mt-6 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-4 flex-wrap">
                        {/* Auteur avec avatar */}
                        {author && (
                            <div className="flex items-center gap-2">
                                {authorAvatar ? (
                                    <Image
                                        src={authorAvatar}
                                        alt={author}
                                        radius="full"
                                        width={2}
                                        height={2}
                                        className="w-8 h-8"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <User size={16} className="text-primary" />
                                    </div>
                                )}
                                <span className="text-sm font-medium text-foreground">
                                    {author}
                                </span>
                            </div>
                        )}

                        {/* Date */}
                        {date && (
                            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <Calendar size={14} />
                                {date}
                            </span>
                        )}

                        {/* Temps de lecture */}
                        {readingTime && (
                            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <Clock size={14} />
                                {readingTime}
                            </span>
                        )}

                        {/* Vues */}
                        {views !== undefined && (
                            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <Eye size={14} />
                                {views} vues
                            </span>
                        )}
                    </div>

                    {/* Actions */}
                    {(showShare || showBookmark) && (
                        <div className="flex items-center gap-2">
                            {showShare && (
                                <button className="p-2 rounded-full hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary">
                                    <Share2 size={16} />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}
        </article>
    );
}

export default Article;