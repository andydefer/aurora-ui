// src/components/overlay/Tabs.tsx
import { ReactNode, useState, Children, cloneElement, isValidElement } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, TextColor } from '../../types';

export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsVariant = 'default' | 'pills' | 'underline' | 'contained' | 'minimal';
export type TabsSize = 'sm' | 'md' | 'lg';

export interface TabItem {
    id: string;
    label: ReactNode;
    icon?: ReactNode;
    badge?: ReactNode;
    disabled?: boolean;
    content?: ReactNode;
}

export interface TabsProps extends LayoutBaseProps {
    items?: TabItem[];
    children?: ReactNode;
    activeTab?: string;
    onChange?: (id: string) => void;
    orientation?: TabsOrientation;
    variant?: TabsVariant;
    size?: TabsSize;
    color?: TextColor;
    defaultActive?: string;
    fullWidth?: boolean;
    withContent?: boolean;
}

export function Tabs({
    items,
    children,
    activeTab: controlledActive,
    onChange,
    orientation = 'horizontal',
    variant = 'default',
    size = 'md',
    color = 'primary',
    defaultActive,
    fullWidth = false,
    withContent = false,
    className = '',
    style = {},
}: TabsProps) {
    const [internalActive, setInternalActive] = useState(defaultActive || '');
    const activeTab = controlledActive !== undefined ? controlledActive : internalActive;

    const handleTabChange = (id: string) => {
        if (controlledActive === undefined) {
            setInternalActive(id);
        }
        onChange?.(id);
    };

    const sizeClasses: Record<TabsSize, string> = {
        sm: 'text-xs px-3 py-1.5 gap-1.5',
        md: 'text-sm px-4 py-2 gap-2',
        lg: 'text-base px-5 py-2.5 gap-2.5',
    };

    const iconSizeClasses: Record<TabsSize, number> = {
        sm: 14,
        md: 16,
        lg: 18,
    };

    const badgeSizeClasses: Record<TabsSize, string> = {
        sm: 'text-[10px] px-1.5 py-0.5',
        md: 'text-xs px-2 py-0.5',
        lg: 'text-sm px-2.5 py-1',
    };

    const colorClasses: Record<TextColor, string> = {
        primary: 'text-primary border-primary bg-primary/10',
        secondary: 'text-secondary border-secondary bg-secondary/10',
        muted: 'text-muted-foreground border-muted bg-muted/10',
        destructive: 'text-destructive border-destructive bg-destructive/10',
        success: 'text-success border-success bg-success/10',
        warning: 'text-warning border-warning bg-warning/10',
    };

    const variantClasses: Record<TabsVariant, {
        container: string;
        tab: string;
        active: string;
        activeColor: string;
    }> = {
        default: {
            container: 'border-b border-border',
            tab: 'border-b-2 border-transparent hover:text-foreground hover:border-border/50 transition-all duration-200',
            active: 'border-primary font-semibold',
            activeColor: colorClasses[color],
        },
        pills: {
            container: 'gap-1',
            tab: 'rounded-lg hover:bg-muted/20 transition-all duration-200',
            active: 'font-semibold',
            activeColor: `bg-${color} text-${color}-foreground hover:bg-${color}/90`,
        },
        underline: {
            container: 'gap-2 border-b border-border',
            tab: 'border-b-2 border-transparent hover:text-foreground hover:border-border/50 transition-all duration-200',
            active: 'border-primary font-semibold',
            activeColor: colorClasses[color],
        },
        contained: {
            container: 'bg-muted/20 rounded-lg p-1 gap-0.5',
            tab: 'rounded-md hover:bg-muted/10 transition-all duration-200',
            active: 'font-semibold shadow-sm',
            activeColor: `bg-${color} text-${color}-foreground hover:bg-${color}/90`,
        },
        minimal: {
            container: 'gap-1',
            tab: 'hover:bg-muted/10 rounded-md transition-all duration-200',
            active: 'font-semibold',
            activeColor: colorClasses[color],
        },
    };

    const classes = clsx(
        'flex',
        orientation === 'vertical' ? 'flex-col' : 'flex-row',
        fullWidth && 'w-full',
        variantClasses[variant].container,
        className
    );

    const renderTab = (item: TabItem) => {
        const isActive = activeTab === item.id;
        const iconSize = iconSizeClasses[size];

        const tabClasses = clsx(
            'flex items-center justify-center transition-all duration-200',
            'font-medium',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            sizeClasses[size],
            variantClasses[variant].tab,
            isActive && variantClasses[variant].active,
            isActive && variantClasses[variant].activeColor,
            !isActive && 'text-muted-foreground hover:text-foreground',
            'flex-1',
            orientation === 'vertical' && 'w-full justify-start'
        );

        return (
            <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                disabled={item.disabled}
                className={tabClasses}
                role="tab"
                aria-selected={isActive}
                aria-disabled={item.disabled}
            >
                {item.icon && (
                    <span className="shrink-0">
                        {typeof item.icon === 'string' ? (
                            <span className="text-current">{item.icon}</span>
                        ) : (
                            cloneElement(item.icon as React.ReactElement, {
                                size: iconSize,
                                className: 'text-current',
                            })
                        )}
                    </span>
                )}
                <span className="whitespace-nowrap">{item.label}</span>
                {item.badge && (
                    <span className={clsx(
                        'shrink-0 rounded-full font-medium transition-all duration-200',
                        badgeSizeClasses[size],
                        isActive ? 'bg-primary/20 text-primary' : 'bg-muted/20 text-muted-foreground'
                    )}>
                        {item.badge}
                    </span>
                )}
            </button>
        );
    };

    const renderContent = () => {
        if (withContent && items) {
            const activeItem = items.find(item => item.id === activeTab);
            if (activeItem?.content) {
                return (
                    <div className="pt-4 border-t border-border/50 min-h-[120px] transition-all duration-300">
                        {activeItem.content}
                    </div>
                );
            }
        }
        return null;
    };

    const renderTabs = () => {
        if (items) {
            return items.map(renderTab);
        }

        return Children.map(children, (child) => {
            if (isValidElement(child) && child.type === 'button') {
                const id = child.props.id || '';
                const isActive = activeTab === id;

                return cloneElement(child, {
                    ...child.props,
                    key: id,
                    onClick: () => handleTabChange(id),
                    className: clsx(
                        'flex items-center justify-center transition-all duration-200',
                        'font-medium',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        sizeClasses[size],
                        variantClasses[variant].tab,
                        isActive && variantClasses[variant].active,
                        isActive && variantClasses[variant].activeColor,
                        !isActive && 'text-muted-foreground hover:text-foreground',
                        'flex-1',
                        orientation === 'vertical' && 'w-full justify-start',
                        child.props.className
                    ),
                    role: 'tab',
                    'aria-selected': isActive,
                });
            }
            return child;
        });
    };

    return (
        <div className="w-full">
            <div className={classes} style={style}>
                {renderTabs()}
            </div>
            {withContent && renderContent()}
        </div>
    );
}

export default Tabs;