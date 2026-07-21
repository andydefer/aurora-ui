// src/components/utilities/Table.tsx
import React from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Size, TextColor } from '../../types';

export interface TableColumn<T = any> {
    key: string;
    header: string | React.ReactNode;
    accessor?: (item: T) => React.ReactNode;
    cell?: (item: T) => React.ReactNode;
    className?: string;
    headerClassName?: string;
    cellClassName?: string;
    align?: 'left' | 'center' | 'right';
    width?: string | number;
    sortable?: boolean;
}

export interface TableProps<T = any> extends LayoutBaseProps {
    columns: TableColumn<T>[];
    data: T[];
    keyExtractor?: (item: T, index: number) => string;
    variant?: 'default' | 'striped' | 'hover' | 'bordered' | 'minimal';
    size?: Size;
    color?: TextColor;
    stickyHeader?: boolean;
    compact?: boolean;
    showHeader?: boolean;
    emptyMessage?: string;
    rowClassName?: (item: T, index: number) => string;
    onRowClick?: (item: T, index: number) => void;
}

export function Table<T = any>({
    columns,
    data,
    keyExtractor,
    variant = 'default',
    size = 'md',
    color = 'primary',
    stickyHeader = false,
    compact = false,
    showHeader = true,
    emptyMessage = 'Aucune donnée disponible',
    rowClassName,
    onRowClick,
    className = '',
    style = {},
}: TableProps<T>) {
    const sizeClasses: Record<Size, string> = {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
        '4xl': 'text-4xl',
        full: 'text-5xl',
    };

    const paddingClasses = compact ? 'px-3 py-2' : 'px-6 py-4';

    const variantClasses = {
        default: 'bg-card border border-border rounded-xl shadow-sm overflow-hidden',
        striped: 'bg-card border border-border rounded-xl shadow-sm overflow-hidden',
        hover: 'bg-card border border-border rounded-xl shadow-sm overflow-hidden',
        bordered: 'bg-card border-2 border-border rounded-xl shadow-sm overflow-hidden',
        minimal: 'bg-transparent overflow-hidden',
    };

    const headerVariantClasses = {
        default: 'bg-muted/30 border-b border-border',
        striped: 'bg-muted/30 border-b border-border',
        hover: 'bg-muted/30 border-b border-border',
        bordered: 'bg-muted/30 border-b-2 border-border',
        minimal: 'bg-transparent border-b border-border/50',
    };

    const rowVariantClasses = {
        default: 'border-b border-border/50 hover:bg-muted/5 transition-colors duration-150',
        striped: 'border-b border-border/50 even:bg-muted/5 odd:bg-transparent hover:bg-muted/10 transition-colors duration-150',
        hover: 'border-b border-border/50 hover:bg-muted/10 hover:bg-primary/20 transition-all duration-200',
        bordered: 'border-b border-border/50 hover:bg-muted/5 transition-colors duration-150',
        minimal: 'border-b border-border/30 hover:bg-muted/5 transition-colors duration-150',
    };

    const colorClasses: Record<TextColor, string> = {
        primary: 'text-primary border-primary/30 bg-primary/5',
        secondary: 'text-secondary border-secondary/30 bg-secondary/5',
        muted: 'text-muted-foreground border-muted/30 bg-muted/5',
        destructive: 'text-destructive border-destructive/30 bg-destructive/5',
        success: 'text-success border-success/30 bg-success/5',
        warning: 'text-warning border-warning/30 bg-warning/5',
    };

    const alignClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    };

    const getKey = (item: T, index: number): string => {
        if (keyExtractor) return keyExtractor(item, index);
        return `row-${index}`;
    };

    const renderCell = (item: T, column: TableColumn<T>, _: number) => {
        if (column.cell) {
            return column.cell(item);
        }
        if (column.accessor) {
            return column.accessor(item);
        }
        return (item as any)[column.key] ?? '-';
    };

    const colorStyle = colorClasses[color];

    const classes = clsx(
        'w-full overflow-hidden',
        variantClasses[variant],
        sizeClasses[size],
        className
    );

    const tableClasses = clsx(
        'w-full text-left',
        sizeClasses[size]
    );

    const headerClasses = clsx(
        'text-sm font-medium',
        headerVariantClasses[variant],
        colorStyle,
        stickyHeader && 'sticky top-0 z-10'
    );

    // Couleurs alternées pour les lignes striped avec la couleur du thème
    const getRowColorClass = (index: number) => {
        if (variant !== 'striped') return '';
        const isEven = index % 2 === 0;
        const colorMap: Record<TextColor, string> = {
            primary: isEven ? 'bg-primary/5' : 'bg-transparent',
            secondary: isEven ? 'bg-secondary/5' : 'bg-transparent',
            muted: isEven ? 'bg-muted/10' : 'bg-transparent',
            destructive: isEven ? 'bg-destructive/5' : 'bg-transparent',
            success: isEven ? 'bg-success/5' : 'bg-transparent',
            warning: isEven ? 'bg-warning/5' : 'bg-transparent',
        };
        return colorMap[color] || (isEven ? 'bg-muted/5' : 'bg-transparent');
    };

    return (
        <div className={classes} style={style}>
            <div className="relative overflow-x-auto">
                <table className={tableClasses}>
                    {showHeader && (
                        <thead className={headerClasses}>
                            <tr>
                                {columns.map((column) => (
                                    <th
                                        key={column.key}
                                        scope="col"
                                        className={clsx(
                                            paddingClasses,
                                            column.align && alignClasses[column.align],
                                            column.headerClassName,
                                            column.width && `w-${column.width}`
                                        )}
                                        style={column.width ? { width: column.width } : undefined}
                                    >
                                        {column.header}
                                        {column.sortable && (
                                            <span className="ml-1 text-muted-foreground/50">↕</span>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                    )}
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className={clsx(
                                        paddingClasses,
                                        'text-center text-muted-foreground',
                                        sizeClasses[size]
                                    )}
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((item, index) => {
                                const isLastRow = index === data.length - 1;
                                const rowColor = getRowColorClass(index);
                                const rowClasses = clsx(
                                    rowVariantClasses[variant],
                                    rowColor,
                                    !isLastRow && 'border-b border-border/50',
                                    onRowClick && 'cursor-pointer hover:bg-primary/20 transition-all duration-200',
                                    rowClassName?.(item, index)
                                );

                                return (
                                    <tr
                                        key={getKey(item, index)}
                                        className={rowClasses}
                                        onClick={() => onRowClick?.(item, index)}
                                    >
                                        {columns.map((column) => (
                                            <td
                                                key={`${getKey(item, index)}-${column.key}`}
                                                className={clsx(
                                                    paddingClasses,
                                                    column.align && alignClasses[column.align],
                                                    column.cellClassName,
                                                    compact ? 'py-2' : 'py-4'
                                                )}
                                            >
                                                {renderCell(item, column, index)}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;