// src/components/navigation/Breadcrumb.tsx
import React from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Size, TextColor } from '../../types';
import { ChevronRight, Home, ChevronLeft, Slash, Dot } from 'lucide-react';

export interface BreadcrumbItem {
    label: string;
    href?: string;
    icon?: React.ReactNode;
    active?: boolean;
    badge?: string | number;
}

export interface BreadcrumbProps extends LayoutBaseProps {
    items: BreadcrumbItem[];
    separator?: React.ReactNode;
    maxItems?: number;
    truncate?: boolean;
    showHome?: boolean;
    homeIcon?: React.ReactNode;
    size?: Size;
    color?: TextColor;
    variant?: 'default' | 'outlined' | 'minimal' | 'pill' | 'dark';
    separatorType?: 'chevron' | 'slash' | 'arrow' | 'dot';
    onItemClick?: (item: BreadcrumbItem, index: number) => void;
    activeColor?: TextColor;
    animated?: boolean;
    showBadges?: boolean;
}

export function Breadcrumb({
    items,
    separator,
    maxItems,
    truncate = false,
    showHome = true,
    homeIcon = <Home size={14} />,
    size = 'md',
    color = 'primary',
    variant = 'default',
    separatorType = 'chevron',
    onItemClick,
    activeColor = 'primary',
    animated = true,
    showBadges = true,
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

    const sizeClasses: Record<Size, string> = {
        xs: 'text-xs gap-1',
        sm: 'text-sm gap-1.5',
        md: 'text-base gap-2',
        lg: 'text-lg gap-2.5',
        xl: 'text-xl gap-3',
        '2xl': 'text-2xl gap-3.5',
        '3xl': 'text-3xl gap-4',
        '4xl': 'text-4xl gap-4.5',
        full: 'text-5xl gap-5',
    };

    const colorClasses: Record<TextColor, string> = {
        primary: 'text-primary/80 hover:text-primary',
        secondary: 'text-secondary/80 hover:text-secondary',
        muted: 'text-muted-foreground/80 hover:text-foreground',
        destructive: 'text-destructive/80 hover:text-destructive',
        success: 'text-success/80 hover:text-success',
        warning: 'text-warning/80 hover:text-warning',
    };

    const activeColorClasses: Record<TextColor, string> = {
        primary: 'text-primary font-semibold',
        secondary: 'text-secondary font-semibold',
        muted: 'text-foreground font-semibold',
        destructive: 'text-destructive font-semibold',
        success: 'text-success font-semibold',
        warning: 'text-warning font-semibold',
    };

    const variantClasses = {
        default: 'bg-card border border-border rounded-md px-5 py-3 shadow-sm',
        outlined: 'bg-transparent border-2 border-border rounded-md px-5 py-3',
        minimal: 'bg-transparent px-2 py-1.5',
        pill: 'bg-card border border-border rounded-full px-6 py-2.5 shadow-sm',
        dark: 'bg-foreground/5 border border-border/20 rounded-md px-5 py-3 backdrop-blur-sm',
    };

    const separatorIcons = {
        chevron: <ChevronRight size={14} className="text-muted-foreground/50 shrink-0" />,
        slash: <Slash size={14} className="text-muted-foreground/50 shrink-0" />,
        arrow: <ChevronLeft size={14} className="text-muted-foreground/50 shrink-0" />,
        dot: <Dot size={16} className="text-muted-foreground/50 shrink-0" />,
    };

    const defaultSeparator = separator || separatorIcons[separatorType];

    const iconSizeMap: Record<Size, number> = {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
        '2xl': 22,
        '3xl': 24,
        '4xl': 26,
        full: 28,
    };

    const iconSize = iconSizeMap[size];
    const isPill = variant === 'pill';

    const classes = clsx(
        'flex items-center overflow-x-auto flex-nowrap transition-all duration-300 scrollbar-hide',
        sizeClasses[size],
        variantClasses[variant],
        animated && 'hover:shadow-md transition-shadow',
        isPill && 'w-fit',
        className
    );

    const handleItemClick = (item: BreadcrumbItem, index: number) => {
        if (!item.active && onItemClick) {
            onItemClick(item, index);
        }
    };

    const renderIcon = (icon: React.ReactNode) => {
        if (!icon) return null;
        if (typeof icon === 'string') {
            return <span className="text-current shrink-0">{icon}</span>;
        }
        return React.cloneElement(icon as React.ReactElement, {
            size: iconSize,
            className: 'shrink-0 text-current',
        });
    };

    const getBadgeColor = (badge: string | number) => {
        const num = typeof badge === 'string' ? parseInt(badge) : badge;
        if (num > 10) return 'bg-destructive/10 text-destructive';
        if (num > 5) return 'bg-warning/10 text-warning';
        return 'bg-primary/10 text-primary';
    };

    const olClasses = clsx(
        'flex items-center list-none flex-nowrap whitespace-nowrap min-w-max'
    );

    return (
        <nav className={classes} style={style} aria-label="Breadcrumb">
            <ol className={olClasses}>
                {renderedItems.map((item, index) => {
                    const isLast = index === renderedItems.length - 1;
                    const isEllipsis = item.label === '...';
                    const isActive = item.active || isLast;

                    return (
                        <li key={index} className={clsx(
                            'flex items-center gap-1 shrink-0',
                            'whitespace-nowrap'
                        )}>
                            {index > 0 && (
                                <span className="mx-1 text-muted-foreground/50 transition-all duration-200 group-hover:text-muted-foreground shrink-0">
                                    {defaultSeparator}
                                </span>
                            )}
                            {isEllipsis ? (
                                <span className="text-muted-foreground/50 px-1 select-none shrink-0">…</span>
                            ) : isActive || !item.href ? (
                                <span
                                    className={clsx(
                                        'flex items-center gap-1.5 transition-all duration-200 shrink-0',
                                        isActive ? activeColorClasses[activeColor] : 'text-muted-foreground/70',
                                        truncate && 'truncate max-w-[150px] block',
                                        !isActive && 'hover:text-foreground'
                                    )}
                                >
                                    {renderIcon(item.icon)}
                                    <span className="truncate">{item.label}</span>
                                    {showBadges && item.badge && (
                                        <span className={clsx(
                                            'px-1.5 py-0.5 text-[10px] font-medium rounded-full shrink-0',
                                            getBadgeColor(item.badge)
                                        )}>
                                            {item.badge}
                                        </span>
                                    )}
                                </span>
                            ) : (
                                <button
                                    onClick={() => handleItemClick(item, index)}
                                    className={clsx(
                                        'flex items-center gap-1.5 transition-all duration-200 shrink-0',
                                        colorClasses[color],
                                        truncate && 'truncate max-w-[150px] block',
                                        'focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-md px-1.5 py-0.5',
                                        'hover:scale-105 hover:bg-primary/5'
                                    )}
                                >
                                    {renderIcon(item.icon)}
                                    <span className="truncate">{item.label}</span>
                                    {showBadges && item.badge && (
                                        <span className={clsx(
                                            'px-1.5 py-0.5 text-[10px] font-medium rounded-full shrink-0',
                                            getBadgeColor(item.badge)
                                        )}>
                                            {item.badge}
                                        </span>
                                    )}
                                </button>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

export default Breadcrumb;