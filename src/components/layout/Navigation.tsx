import React, { useState } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Direction, Size } from '../../types';
import { Menu, X } from 'lucide-react';

export interface NavigationItem {
    label: string;
    href: string;
    active?: boolean;
    icon?: React.ReactNode;
    children?: NavigationItem[];
}

export interface NavigationProps extends LayoutBaseProps {
    orientation?: Direction;
    ariaLabel?: string;
    items?: NavigationItem[];
    collapsible?: boolean;
    activeColor?: 'primary' | 'secondary' | 'destructive' | 'success' | 'warning';
    gap?: Size;
    as?: React.ElementType;
    highlight?: boolean;
    mobileBreakpoint?: 'sm' | 'md' | 'lg' | 'xl';
    mobileLabel?: string;
}

export function Navigation({
    children,
    orientation = 'horizontal',
    ariaLabel = 'Main navigation',
    items,
    collapsible = false,
    activeColor = 'primary',
    gap = 'md',
    as: Component = 'nav',
    highlight = true,
    mobileBreakpoint = 'md',
    mobileLabel = 'Menu',
    className = '',
    style = {},
}: React.PropsWithChildren<NavigationProps>) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const gapClasses: Record<Size, string> = {
        xs: 'gap-1',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
        '2xl': 'gap-10',
        '3xl': 'gap-12',
        '4xl': 'gap-14',
        full: 'gap-16',
    };

    const activeColorClasses: Record<string, string> = {
        primary: 'text-primary hover:text-primary/80 bg-primary/10',
        secondary: 'text-secondary hover:text-secondary/80 bg-secondary/10',
        destructive: 'text-destructive hover:text-destructive/80 bg-destructive/10',
        success: 'text-success hover:text-success/80 bg-success/10',
        warning: 'text-warning hover:text-warning/80 bg-warning/10',
    };

    const mobileBreakpointClasses: Record<string, string> = {
        sm: 'sm:flex',
        md: 'md:flex',
        lg: 'lg:flex',
        xl: 'xl:flex',
    };

    const classes = clsx(
        'flex relative',
        orientation === 'vertical' ? 'flex-col' : 'flex-row items-center',
        collapsible && 'flex-wrap',
        gapClasses[gap],
        className
    );

    const mobileClasses = clsx(
        'flex-col items-start gap-2 p-4 bg-card rounded-md shadow-lg border border-border absolute top-full left-0 right-0 z-50',
        'transition-all duration-300 ease-in-out',
        isMobileOpen ? 'opacity-100 translate-y-2 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
    );

    const itemClasses = clsx(
        'px-3 py-2 rounded-md transition-all duration-200 text-foreground hover:text-primary hover:bg-primary/10',
        highlight && 'hover:scale-105',
        'w-full sm:w-auto'
    );

    const activeItemClasses = clsx(
        'px-3 py-2 rounded-md transition-all duration-200',
        activeColorClasses[activeColor],
        highlight && 'scale-105',
        'w-full sm:w-auto'
    );

    const renderItems = (itemsList: NavigationItem[], isMobile: boolean = false) => {
        return itemsList.map((item, index) => {
            const isActive = item.active || false;
            const classes = isActive ? activeItemClasses : itemClasses;

            return (
                <li key={index} className={clsx('list-none w-full sm:w-auto', isMobile && 'w-full')}>
                    <a
                        href={item.href}
                        className={classes}
                        aria-current={isActive ? 'page' : undefined}
                    >
                        {item.icon && (
                            <span className="mr-2">{item.icon}</span>
                        )}
                        {item.label}
                    </a>
                    {item.children && item.children.length > 0 && (
                        <ul className="ml-4 mt-1 space-y-1">
                            {renderItems(item.children, isMobile)}
                        </ul>
                    )}
                </li>
            );
        });
    };

    const toggleMobileMenu = () => {
        setIsMobileOpen(!isMobileOpen);
    };

    return (
        <Component className={classes} style={style} aria-label={ariaLabel}>
            {/* Mobile Toggle Button */}
            <button
                onClick={toggleMobileMenu}
                className={clsx(
                    'flex items-center gap-2 px-3 py-2 rounded-md bg-card border border-border text-foreground hover:bg-muted/20 transition-colors',
                    mobileBreakpointClasses[mobileBreakpoint]
                )}
                aria-label={isMobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={isMobileOpen}
            >
                {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
                <span className="text-sm font-medium">{mobileLabel}</span>
            </button>

            {/* Desktop Navigation */}
            <div className={clsx(
                'hidden',
                mobileBreakpointClasses[mobileBreakpoint],
                orientation === 'vertical' ? 'flex-col' : 'flex-row items-center',
                'gap-2'
            )}>
                {items ? (
                    <ul className={clsx(
                        'flex flex-wrap list-none',
                        orientation === 'vertical' ? 'flex-col' : 'flex-row items-center',
                        gapClasses[gap]
                    )}>
                        {renderItems(items)}
                    </ul>
                ) : (
                    children
                )}
            </div>

            {/* Mobile Navigation */}
            <div className={clsx(
                'block sm:hidden',
                'w-full'
            )}>
                <div className={mobileClasses}>
                    {items ? (
                        <ul className="flex flex-col w-full gap-1 list-none">
                            {renderItems(items, true)}
                        </ul>
                    ) : (
                        <div className="flex flex-col w-full gap-1">
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </Component>
    );
}

export default Navigation;