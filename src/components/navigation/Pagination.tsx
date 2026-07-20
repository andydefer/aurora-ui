import React from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Size } from '../../types';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

export interface PaginationProps extends LayoutBaseProps {
    current: number;
    total: number;
    onChange: (page: number) => void;
    siblings?: number;
    boundaries?: number;
    size?: Size;
    showFirstLast?: boolean;
    showPrevNext?: boolean;
    disabled?: boolean;
}

export function Pagination({
    current,
    total,
    onChange,
    siblings = 1,
    boundaries = 1,
    size = 'md',
    showFirstLast = true,
    showPrevNext = true,
    disabled = false,
    className = '',
    style = {},
}: PaginationProps) {
    const sizeClasses: Record<Size, string> = {
        xs: 'px-2 py-1 text-xs min-w-[28px] h-7',
        sm: 'px-2.5 py-1.5 text-sm min-w-[32px] h-8',
        md: 'px-3 py-2 text-sm min-w-[36px] h-9',
        lg: 'px-3.5 py-2.5 text-base min-w-[40px] h-10',
        xl: 'px-4 py-3 text-base min-w-[44px] h-11',
        '2xl': 'px-4.5 py-3.5 text-lg min-w-[48px] h-12',
        '3xl': 'px-5 py-4 text-lg min-w-[52px] h-13',
        '4xl': 'px-5.5 py-4.5 text-xl min-w-[56px] h-14',
        full: 'px-6 py-5 text-xl min-w-[60px] h-15',
    };

    const generatePages = (): (number | 'ellipsis')[] => {
        const pages: (number | 'ellipsis')[] = [];

        if (total <= 1) return pages;

        const leftBoundary = Math.min(boundaries, total);
        const rightBoundary = Math.min(boundaries, total);

        const leftSiblings = Math.min(siblings, total - 1);
        const rightSiblings = Math.min(siblings, total - 1);

        const leftStart = Math.max(1, current - leftSiblings);
        const rightEnd = Math.min(total, current + rightSiblings);

        // Boundary gauche
        for (let i = 1; i <= leftBoundary; i++) {
            pages.push(i);
        }

        // Ellipsis gauche
        if (leftStart > leftBoundary + 1) {
            pages.push('ellipsis');
        }

        // Pages centrales
        for (let i = Math.max(leftStart, leftBoundary + 1); i <= Math.min(rightEnd, total - rightBoundary); i++) {
            pages.push(i);
        }

        // Ellipsis droite
        if (rightEnd < total - rightBoundary) {
            pages.push('ellipsis');
        }

        // Boundary droite
        for (let i = total - rightBoundary + 1; i <= total; i++) {
            if (i > leftBoundary) {
                pages.push(i);
            }
        }

        return pages;
    };

    const pages = generatePages();

    if (pages.length === 0) return null;

    const handlePageChange = (page: number) => {
        if (!disabled && page !== current && page >= 1 && page <= total) {
            onChange(page);
        }
    };

    const classes = clsx(
        'flex items-center gap-1',
        disabled && 'opacity-50 pointer-events-none',
        className
    );

    const buttonClasses = (isActive: boolean = false) =>
        clsx(
            'flex items-center justify-center rounded-lg transition-all duration-200',
            'hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20',
            sizeClasses[size],
            isActive
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'text-foreground hover:bg-muted/20',
            disabled && 'cursor-not-allowed opacity-50'
        );

    return (
        <div className={classes} style={style}>
            {showFirstLast && (
                <button
                    onClick={() => handlePageChange(1)}
                    disabled={current === 1 || disabled}
                    className={buttonClasses()}
                    aria-label="First page"
                >
                    <ChevronLeft size={16} />
                    <ChevronLeft size={16} className="-ml-1.5" />
                </button>
            )}

            {showPrevNext && (
                <button
                    onClick={() => handlePageChange(current - 1)}
                    disabled={current === 1 || disabled}
                    className={buttonClasses()}
                    aria-label="Previous page"
                >
                    <ChevronLeft size={16} />
                </button>
            )}

            {pages.map((page, index) => (
                <React.Fragment key={index}>
                    {page === 'ellipsis' ? (
                        <span className="flex items-center justify-center px-2 text-muted-foreground">
                            <MoreHorizontal size={16} />
                        </span>
                    ) : (
                        <button
                            onClick={() => handlePageChange(page)}
                            className={buttonClasses(page === current)}
                            aria-current={page === current ? 'page' : undefined}
                        >
                            {page}
                        </button>
                    )}
                </React.Fragment>
            ))}

            {showPrevNext && (
                <button
                    onClick={() => handlePageChange(current + 1)}
                    disabled={current === total || disabled}
                    className={buttonClasses()}
                    aria-label="Next page"
                >
                    <ChevronRight size={16} />
                </button>
            )}

            {showFirstLast && (
                <button
                    onClick={() => handlePageChange(total)}
                    disabled={current === total || disabled}
                    className={buttonClasses()}
                    aria-label="Last page"
                >
                    <ChevronRight size={16} />
                    <ChevronRight size={16} className="-ml-1.5" />
                </button>
            )}
        </div>
    );
}

export default Pagination;