import React from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
    label: string;
    href?: string;
    icon?: React.ReactNode;
    active?: boolean;
}

export interface BreadcrumbProps extends LayoutBaseProps {
    items: BreadcrumbItem[];
    separator?: React.ReactNode;
    maxItems?: number;
    truncate?: boolean;
    showHome?: boolean;
    homeIcon?: React.ReactNode;
}

export function Breadcrumb({
    items,
    separator = <ChevronRight size={14} className="text-muted-foreground" />,
    maxItems,
    truncate = false,
    showHome = true,
    homeIcon = <Home size={14} />,
    className = '',
    style = {},
}: BreadcrumbProps) {
    const displayItems = [...items];

    if (showHome) {
        displayItems.unshift({
            label: 'Accueil',
            href: '/',
            icon: homeIcon,
        });
    }

    let renderedItems = displayItems;

    if (maxItems && displayItems.length > maxItems) {
        const first = displayItems[0];
        const last = displayItems[displayItems.length - 1];
        const middle = displayItems.slice(1, -1);

        renderedItems = [
            first,
            { label: '...', href: undefined, active: false },
            ...middle.slice(-(maxItems - 3)),
            last,
        ];
    }

    const classes = clsx(
        'flex items-center flex-wrap gap-1 text-sm',
        className
    );

    return (
        <nav className={classes} style={style} aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-1 list-none">
                {renderedItems.map((item, index) => {
                    const isLast = index === renderedItems.length - 1;
                    const isEllipsis = item.label === '...';

                    return (
                        <li key={index} className="flex items-center gap-1">
                            {index > 0 && (
                                <span className="mx-1 text-muted-foreground">
                                    {separator}
                                </span>
                            )}
                            {isEllipsis ? (
                                <span className="text-muted-foreground px-1">…</span>
                            ) : isLast || !item.href ? (
                                <span
                                    className={clsx(
                                        'text-foreground font-medium',
                                        truncate && 'truncate max-w-[150px] block'
                                    )}
                                >
                                    {item.icon && (
                                        <span className="mr-1.5 inline-flex">{item.icon}</span>
                                    )}
                                    {item.label}
                                </span>
                            ) : (
                                <a
                                    href={item.href}
                                    className={clsx(
                                        'text-muted-foreground hover:text-primary transition-colors',
                                        truncate && 'truncate max-w-[150px] block'
                                    )}
                                >
                                    {item.icon && (
                                        <span className="mr-1.5 inline-flex">{item.icon}</span>
                                    )}
                                    {item.label}
                                </a>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

export default Breadcrumb;