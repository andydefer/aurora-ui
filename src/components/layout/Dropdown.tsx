import React, { useState, useRef, useEffect } from 'react';
import { LayoutBaseProps, Placement, Size } from '../../types';
import { clsx } from '../../utils';

export interface DropdownItem {
    label?: string;
    value?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    destructive?: boolean;
    divider?: boolean;
}

export interface DropdownProps extends LayoutBaseProps {
    trigger: React.ReactNode;
    items: DropdownItem[];
    onSelect?: (value: string) => void;
    placement?: Placement;
    size?: Size;
    closeOnSelect?: boolean;
    width?: Size | 'auto';
}

export function Dropdown({
    trigger,
    items,
    onSelect,
    placement = 'bottom-left',
    size = 'md',
    closeOnSelect = true,
    width = 'auto',
    className = '',
    style = {},
}: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const placementClasses: Record<Placement, string> = {
        'bottom-left': 'top-full left-0 mt-1',
        'bottom-right': 'top-full right-0 mt-1',
        'top-left': 'bottom-full left-0 mb-1',
        'top-right': 'bottom-full right-0 mb-1',
    };

    const sizeClasses: Record<Size, string> = {
        xs: 'py-0.5 text-xs',
        sm: 'py-1 text-sm',
        md: 'py-1.5 text-sm',
        lg: 'py-2 text-base',
        xl: 'py-2.5 text-base',
        '2xl': 'py-3 text-lg',
        '3xl': 'py-3.5 text-lg',
        '4xl': 'py-4 text-xl',
        full: 'py-4 text-xl',
    };

    const widthClasses: Record<string, string> = {
        xs: 'w-32',
        sm: 'w-40',
        md: 'w-48',
        lg: 'w-56',
        xl: 'w-64',
        '2xl': 'w-72',
        '3xl': 'w-80',
        '4xl': 'w-96',
        full: 'w-full',
        auto: 'w-auto min-w-[160px]',
    };

    const handleSelect = (value: string) => {
        onSelect?.(value);
        if (closeOnSelect) {
            setIsOpen(false);
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div ref={dropdownRef} className="relative inline-block" style={style}>
            <div onClick={toggleDropdown} className="cursor-pointer">
                {trigger}
            </div>

            {isOpen && (
                <div
                    className={clsx(
                        'absolute z-50 bg-card rounded-lg shadow-lg border border-border overflow-hidden',
                        placementClasses[placement],
                        widthClasses[width],
                        className
                    )}
                >
                    <ul className="py-1 list-none">
                        {items.map((item, index) => {
                            if (item.divider) {
                                return (
                                    <li key={index} className="my-1 border-t border-border" />
                                );
                            }

                            return (
                                <li key={index}>
                                    <button
                                        onClick={() => handleSelect(item.value || '')}
                                        disabled={item.disabled}
                                        className={clsx(
                                            'flex items-center gap-2 w-full px-4 text-left transition-colors duration-150',
                                            sizeClasses[size],
                                            item.destructive
                                                ? 'text-destructive hover:bg-destructive/10'
                                                : 'text-foreground hover:bg-muted/20',
                                            item.disabled && 'opacity-50 cursor-not-allowed'
                                        )}
                                    >
                                        {item.icon && (
                                            <span className="shrink-0">{item.icon}</span>
                                        )}
                                        {item.label}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Dropdown;