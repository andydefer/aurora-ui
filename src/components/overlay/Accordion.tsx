// src/components/overlay/Accordion.tsx
import { ReactNode, useState, Children, cloneElement, isValidElement, useRef, useEffect } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, TextColor } from '../../types';
import { ChevronDown, Plus, Minus, Eye, EyeOff } from 'lucide-react';

export type AccordionVariant = 'default' | 'bordered' | 'ghost' | 'minimal';
export type AccordionSize = 'sm' | 'md' | 'lg';
export type AccordionIconType = 'chevron' | 'plus' | 'eye';

export interface AccordionItemProps extends LayoutBaseProps {
    id?: string;
    title: ReactNode;
    children: ReactNode;
    open?: boolean;
    onToggle?: () => void;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
    disabled?: boolean;
    color?: TextColor;
    description?: ReactNode;
    badge?: ReactNode;
    showIcon?: boolean;
    iconType?: AccordionIconType;
    expandIcon?: ReactNode;
    collapseIcon?: ReactNode;
}

export interface AccordionProps extends LayoutBaseProps {
    items?: AccordionItemProps[];
    children?: ReactNode;
    multiple?: boolean;
    defaultOpen?: string[];
    onChange?: (openItems: string[]) => void;
    variant?: AccordionVariant;
    size?: AccordionSize;
    color?: TextColor;
    animate?: boolean;
    showIcon?: boolean;
    iconType?: AccordionIconType;
    expandIcon?: ReactNode;
    collapseIcon?: ReactNode;
}

export function AccordionItem({
    id,
    title,
    children,
    open = false,
    onToggle,
    icon,
    iconPosition = 'left',
    disabled = false,
    color = 'primary',
    description,
    badge,
    showIcon = true,
    iconType = 'chevron',
    expandIcon,
    collapseIcon,
    className = '',
    style = {},
}: AccordionItemProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number>(0);

    useEffect(() => {
        if (contentRef.current) {
            if (open) {
                setHeight(contentRef.current.scrollHeight);
            } else {
                setHeight(0);
            }
        }
    }, [open, children]);

    const colorClasses: Record<TextColor, string> = {
        primary: 'text-primary border-primary',
        secondary: 'text-secondary border-secondary',
        muted: 'text-muted-foreground border-muted',
        destructive: 'text-destructive border-destructive',
        success: 'text-success border-success',
        warning: 'text-warning border-warning',
    };

    const renderExpandIcon = () => {
        if (!showIcon) return null;

        if (open && collapseIcon) return collapseIcon;
        if (!open && expandIcon) return expandIcon;

        const iconSize = 24;
        const iconClass = "shrink-0 transition-transform duration-300 text-muted-foreground";

        switch (iconType) {
            case 'chevron':
                return (
                    <ChevronDown
                        size={iconSize}
                        className={clsx(
                            iconClass,
                            open && 'rotate-180'
                        )}
                    />
                );
            case 'plus':
                return open ? (
                    <Minus size={iconSize} className={iconClass} />
                ) : (
                    <Plus size={iconSize} className={iconClass} />
                );
            case 'eye':
                return open ? (
                    <EyeOff size={iconSize} className={iconClass} />
                ) : (
                    <Eye size={iconSize} className={iconClass} />
                );
            default:
                return (
                    <ChevronDown
                        size={iconSize}
                        className={clsx(
                            iconClass,
                            open && 'rotate-180'
                        )}
                    />
                );
        }
    };

    const classes = clsx(
        'w-full border-b border-border last:border-b-0',
        open && 'pb-2',
        disabled && 'opacity-50 cursor-not-allowed',
        className
    );

    const headerClasses = clsx(
        'flex items-center w-full text-left transition-colors',
        'hover:bg-muted/5',
        !disabled && 'cursor-pointer',
        'gap-4 px-6',
        open ? 'py-3' : 'py-5',
        disabled && 'cursor-not-allowed',
    );

    const titleClasses = clsx(
        'flex-1 font-semibold text-xl',
        open ? 'text-foreground' : 'text-foreground/80',
        color && open && colorClasses[color]
    );

    const descriptionClasses = clsx(
        'block text-sm text-muted-foreground mt-0.5 font-normal',
        !open && 'hidden'
    );

    const badgeClasses = clsx(
        'shrink-0 px-3 py-1 text-xs font-medium rounded-full',
        'bg-primary/10 text-primary'
    );

    return (
        <div className={classes} style={style}>
            <button
                onClick={onToggle}
                disabled={disabled}
                className={headerClasses}
                aria-expanded={open}
                aria-controls={id}
                type="button"
            >
                {icon && iconPosition === 'left' && (
                    <span className="shrink-0 text-muted-foreground group-hover:text-foreground transition-colors">
                        {icon}
                    </span>
                )}

                <span className="flex-1 min-w-0">
                    <span className={titleClasses}>
                        {title}
                    </span>
                    {description && (
                        <span className={descriptionClasses}>
                            {description}
                        </span>
                    )}
                </span>

                {badge && (
                    <span className={badgeClasses}>
                        {badge}
                    </span>
                )}

                {icon && iconPosition === 'right' && (
                    <span className="shrink-0 text-muted-foreground group-hover:text-foreground transition-colors">
                        {icon}
                    </span>
                )}

                <span className="shrink-0 ml-2">
                    {renderExpandIcon()}
                </span>
            </button>

            <div
                className="overflow-hidden transition-[height] duration-300 ease-in-out"
                style={{ height: `${height}px` }}
            >
                <div ref={contentRef} className="px-6 pb-6 pt-4 text-muted-foreground">
                    {children}
                </div>
            </div>
        </div>
    );
}

export function Accordion({
    items,
    children,
    multiple = false,
    defaultOpen = [],
    onChange,
    variant = 'default',
    size = 'md',
    color = 'primary',
    animate = true,
    showIcon = true,
    iconType = 'chevron',
    expandIcon,
    collapseIcon,
    className = '',
    style = {},
}: AccordionProps) {
    const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

    const handleToggle = (id: string) => {
        let newOpenItems: string[];
        if (multiple) {
            newOpenItems = openItems.includes(id)
                ? openItems.filter(item => item !== id)
                : [...openItems, id];
        } else {
            newOpenItems = openItems.includes(id) ? [] : [id];
        }
        setOpenItems(newOpenItems);
        onChange?.(newOpenItems);
    };

    const variantClasses = {
        default: 'rounded-lg border border-border bg-card',
        bordered: 'rounded-xl border-2 border-border bg-card shadow-sm',
        ghost: 'rounded-lg',
        minimal: 'rounded-none',
    };

    const sizeClasses = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
    };

    const renderItems = () => {
        if (items) {
            return items.map((item, index) => (
                <AccordionItem
                    key={item.id || index}
                    {...item}
                    open={openItems.includes(item.id || String(index))}
                    onToggle={() => handleToggle(item.id || String(index))}
                    color={color}
                    showIcon={showIcon}
                    iconType={iconType}
                    expandIcon={expandIcon}
                    collapseIcon={collapseIcon}
                />
            ));
        }

        return Children.map(children, (child, index) => {
            if (isValidElement(child) && child.type === AccordionItem) {
                const id = child.props.id || String(index);
                return cloneElement(child, {
                    ...child.props,
                    open: openItems.includes(id),
                    onToggle: () => handleToggle(id),
                    color: color,
                    showIcon: showIcon,
                    iconType: iconType,
                    expandIcon: expandIcon,
                    collapseIcon: collapseIcon,
                });
            }
            return child;
        });
    };

    const classes = clsx(
        'w-full overflow-hidden border border-border',
        variantClasses[variant],
        sizeClasses[size],
        animate && 'hover:shadow-md transition-shadow',
        className
    );

    return (
        <div className={classes} style={style} role="tablist">
            {renderItems()}
        </div>
    );
}

export default Accordion;