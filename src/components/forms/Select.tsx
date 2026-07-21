// src/components/forms/Select.tsx
import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Size, TextColor } from '../../types';
import { Check, ChevronDown, X, Search } from 'lucide-react';

export interface SelectOption<T = string | number> {
    value: T;
    label: string;
    icon?: React.JSX.Element;
    description?: string;
    disabled?: boolean;
}

export interface SelectProps<T extends string | number = string> extends LayoutBaseProps {
    options: SelectOption<T>[];
    value?: T | T[];
    onChange?: (value: T | T[]) => void;
    label?: string;
    error?: string;
    helperText?: string;
    placeholder?: string;
    size?: Size;
    color?: TextColor;
    disabled?: boolean;
    required?: boolean;
    multiple?: boolean;
    searchable?: boolean;
    clearable?: boolean;
    maxItems?: number;
}

export function Select<T extends string | number = string>({
    options,
    value,
    onChange,
    label,
    error,
    helperText,
    placeholder = 'Sélectionnez une option',
    size = 'md',
    color = 'primary',
    disabled = false,
    required = false,
    multiple = false,
    searchable = false,
    clearable = false,
    maxItems = 50,
    className = '',
    style = {},
    id,
}: SelectProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const selectedValues = Array.isArray(value) ? value : (value !== undefined ? [value] : []);
    const selectedOptions = options.filter(opt => selectedValues.includes(opt.value));

    const filteredOptions = searchable && searchTerm
        ? options.filter(opt =>
            opt.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : options;

    const displayedOptions = filteredOptions.slice(0, maxItems);

    const sizeClasses: Record<Size, string> = {
        xs: 'text-xs px-3 py-1.5 min-h-[32px]',
        sm: 'text-sm px-3.5 py-2 min-h-[38px]',
        md: 'text-base px-4 py-2.5 min-h-[44px]',
        lg: 'text-lg px-4.5 py-3 min-h-[50px]',
        xl: 'text-lg px-5 py-3.5 min-h-[56px]',
        '2xl': 'text-xl px-5.5 py-4 min-h-[62px]',
        '3xl': 'text-xl px-6 py-4.5 min-h-[68px]',
        '4xl': 'text-2xl px-6.5 py-5 min-h-[74px]',
        full: 'text-2xl px-7 py-5.5 min-h-[80px]',
    };

    const labelSizeClasses: Record<Size, string> = {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-lg',
        '2xl': 'text-xl',
        '3xl': 'text-xl',
        '4xl': 'text-2xl',
        full: 'text-2xl',
    };

    const helperTextSizeClasses: Record<Size, string> = {
        xs: 'text-[10px]',
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-sm',
        xl: 'text-sm',
        '2xl': 'text-base',
        '3xl': 'text-base',
        '4xl': 'text-base',
        full: 'text-base',
    };

    const colorClasses: Record<TextColor, string> = {
        primary: 'focus:border-primary focus:ring-primary/20',
        secondary: 'focus:border-secondary focus:ring-secondary/20',
        muted: 'focus:border-muted-foreground focus:ring-muted-foreground/20',
        destructive: 'focus:border-destructive focus:ring-destructive/20',
        success: 'focus:border-success focus:ring-success/20',
        warning: 'focus:border-warning focus:ring-warning/20',
    };

    const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm('');
                setFocusedIndex(-1);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen && searchable && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen, searchable]);

    const toggleOption = (optionValue: T) => {
        if (disabled) return;

        if (multiple) {
            const exists = selectedValues.includes(optionValue);
            const newValues = exists
                ? selectedValues.filter(v => v !== optionValue)
                : [...selectedValues, optionValue];
            onChange?.(newValues);
        } else {
            onChange?.(optionValue);
            setIsOpen(false);
            setSearchTerm('');
            setFocusedIndex(-1);
        }
    };

    const removeChip = (optionValue: T, event: React.MouseEvent) => {
        event.stopPropagation();
        if (multiple) {
            const newValues = selectedValues.filter(v => v !== optionValue);
            onChange?.(newValues);
        }
    };

    const clearAll = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (multiple) {
            onChange?.([]);
        } else {
            onChange?.(undefined as any);
        }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (disabled) return;

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            if (!isOpen) {
                setIsOpen(true);
            } else if (focusedIndex >= 0 && displayedOptions[focusedIndex]) {
                toggleOption(displayedOptions[focusedIndex].value);
            }
        } else if (event.key === 'Escape') {
            setIsOpen(false);
            setSearchTerm('');
            setFocusedIndex(-1);
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            setFocusedIndex(prev => Math.min(prev + 1, displayedOptions.length - 1));
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setFocusedIndex(prev => Math.max(prev - 1, -1));
        }
    };

    const selectClasses = clsx(
        'w-[320px] rounded-md border bg-background text-foreground',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-0',
        'disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
        sizeClasses[size],
        error ? 'border-destructive focus:ring-destructive/20' : 'border-border',
        !error && colorClasses[color],
        className
    );

    const chipClasses = clsx(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-medium',
        'bg-primary/10 text-primary transition-all duration-200',
        'hover:bg-destructive/10 hover:text-destructive cursor-pointer'
    );

    const labelClasses = clsx(
        'block font-semibold mb-2 transition-colors',
        labelSizeClasses[size],
        error ? 'text-destructive' : 'text-foreground',
        disabled && 'text-muted-foreground'
    );

    const helperTextClasses = clsx(
        'mt-1.5',
        helperTextSizeClasses[size],
        error ? 'text-destructive' : 'text-muted-foreground'
    );

    // Rendu des options du dropdown
    const renderOptions = () => {
        if (displayedOptions.length === 0) {
            return (
                <div className="px-3 py-2 text-sm text-muted-foreground text-center">
                    Aucun résultat
                </div>
            );
        }

        return displayedOptions.map((option, index) => {
            const isSelected = selectedValues.includes(option.value);
            const isFocused = index === focusedIndex;

            return (
                <div
                    key={String(option.value)}
                    className={clsx(
                        'group relative cursor-pointer select-none py-2 pl-10 pr-4 transition-colors',
                        isFocused ? 'bg-primary/5' : 'hover:bg-primary/5',
                        option.disabled && 'opacity-50 cursor-not-allowed',
                        isSelected && 'bg-primary/10'
                    )}
                    onClick={() => !option.disabled && toggleOption(option.value)}
                    onMouseEnter={() => setFocusedIndex(index)}
                    role="option"
                    aria-selected={isSelected}
                >
                    <div className="flex items-center gap-3">
                        {option.icon}

                        <div className="flex min-w-0 flex-col">
                            <span
                                className={`block truncate ${isSelected ? 'font-semibold text-primary' : 'font-normal'}`}
                            >
                                {option.label}
                            </span>
                            {option.description && (
                                <span className="truncate text-xs text-muted-foreground">
                                    {option.description}
                                </span>
                            )}
                        </div>
                    </div>
                    {isSelected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                            <Check className="h-4 w-4" />
                        </span>
                    )}
                </div>
            );
        });
    };

    return (
        <div className="w-[320px] space-y-2" ref={containerRef} style={style}>
            {label && (
                <label htmlFor={selectId} className={labelClasses}>
                    {label}
                    {required && <span className="ml-0.5 text-destructive">*</span>}
                </label>
            )}

            <div className="relative">
                <button
                    type="button"
                    className={selectClasses}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                >
                    <div className="flex items-center justify-between w-full px-4 gap-2 min-h-[44px]">
                        <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
                            {multiple && selectedOptions.length > 0 && (
                                <div className="flex items-center gap-1 flex-nowrap overflow-x-auto py-1 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                    {selectedOptions.map((opt) => (
                                        <span
                                            key={String(opt.value)}
                                            className={clsx(chipClasses, 'shrink-0')}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeChip(opt.value, e);
                                            }}
                                        >
                                            {opt.icon}
                                            <span className="whitespace-nowrap">{opt.label}</span>
                                            <X size={14} className="shrink-0" />
                                        </span>
                                    ))}
                                </div>
                            )}
                            {!multiple && selectedOptions.length > 0 && (
                                <span className="flex items-center gap-2 truncate">
                                    {selectedOptions[0].icon}
                                    <span className="truncate">{selectedOptions[0].label}</span>
                                </span>
                            )}
                            {selectedOptions.length === 0 && (
                                <span className="text-muted-foreground">{placeholder}</span>
                            )}
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                            {clearable && selectedOptions.length > 0 && (
                                <button
                                    type="button"
                                    onClick={clearAll}
                                    className="p-0.5 rounded-full hover:bg-muted/20 transition-colors"
                                >
                                    <X size={14} className="text-muted-foreground" />
                                </button>
                            )}
                            <ChevronDown
                                size={20}
                                className={clsx(
                                    'transition-transform duration-200',
                                    isOpen ? 'rotate-180 text-primary' : 'text-muted-foreground'
                                )}
                            />
                        </div>
                    </div>
                </button>

                {isOpen && (
                    <div className="absolute z-50 w-[320px] mt-1 rounded-md bg-card border border-border shadow-lg overflow-hidden animate-in fade-in zoom-in-95">
                        {searchable && (
                            <div className="p-2 border-b border-border">
                                <div className="relative">
                                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Rechercher..."
                                        className="w-full pl-9 pr-3 py-1.5 text-sm rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                            </div>
                        )}
                        <div
                            ref={listRef}
                            className="max-h-60 overflow-y-auto py-1"
                            role="listbox"
                            aria-multiselectable={multiple}
                        >
                            {renderOptions()}
                        </div>
                        <div className="border-t border-border p-1.5">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsOpen(false);
                                    setSearchTerm('');
                                    setFocusedIndex(-1);
                                }}
                                className="w-full py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/10 rounded-md transition-colors"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {error && <p className={clsx('text-sm font-medium text-destructive', helperTextSizeClasses[size])}>{error}</p>}
            {helperText && !error && <p className={helperTextClasses}>{helperText}</p>}
        </div>
    );
}

export default Select;