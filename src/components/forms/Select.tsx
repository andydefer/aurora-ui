import { useState, useRef, useEffect } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Size } from '../../types';
import { ChevronDown, X, Search } from 'lucide-react';

export interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}

export interface SelectProps extends LayoutBaseProps {
    name?: string;
    value?: string;
    onChange?: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    label?: string;
    destructive?: string;
    size?: Size;
    searchable?: boolean;
    clearable?: boolean;
    disabled?: boolean;
    required?: boolean;
    id?: string;
}

export function Select({
    name,
    value,
    onChange,
    options,
    placeholder = 'Sélectionner...',
    label,
    destructive,
    size = 'md',
    searchable = false,
    clearable = false,
    disabled = false,
    required = false,
    id,
    className = '',
    style = {},
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    const filteredOptions = searchable && searchTerm
        ? options.filter(opt => opt.label.toLowerCase().includes(searchTerm.toLowerCase()))
        : options;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const sizeClasses: Record<Size, string> = {
        xs: 'px-2 py-1 text-xs',
        sm: 'px-2.5 py-1.5 text-sm',
        md: 'px-3.5 py-2 text-sm',
        lg: 'px-4 py-2.5 text-base',
        xl: 'px-4.5 py-3 text-base',
        '2xl': 'px-5 py-3.5 text-lg',
        '3xl': 'px-5.5 py-4 text-lg',
        '4xl': 'px-6 py-4.5 text-xl',
        full: 'px-6.5 py-5 text-xl',
    };

    const classes = clsx(
        'w-full rounded-lg border border-border bg-background text-foreground',
        'transition-all duration-200 cursor-pointer',
        'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        destructive && 'border-destructive focus:ring-destructive/20 focus:border-destructive',
        sizeClasses[size],
        className
    );

    const labelClasses = clsx(
        'block text-sm font-medium mb-1.5',
        destructive ? 'text-destructive' : 'text-foreground',
        required && 'after:content-["*"] after:ml-0.5 after:text-destructive'
    );

    const handleSelect = (option: SelectOption) => {
        if (option.disabled) return;
        onChange?.(option.value);
        setIsOpen(false);
        setSearchTerm('');
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange?.('');
    };

    return (
        <div className="w-full" ref={containerRef}>
            {label && (
                <label htmlFor={id || name} className={labelClasses}>
                    {label}
                </label>
            )}
            <div className="relative">
                <div
                    className={classes}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    style={style}
                >
                    <span className={selectedOption ? 'text-foreground' : 'text-muted-foreground'}>
                        {selectedOption?.label || placeholder}
                    </span>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        {clearable && value && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X size={16} />
                            </button>
                        )}
                        <ChevronDown
                            size={18}
                            className={clsx(
                                'text-muted-foreground transition-transform',
                                isOpen && 'rotate-180'
                            )}
                        />
                    </div>
                </div>

                {isOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
                        {searchable && (
                            <div className="p-2 border-b border-border">
                                <div className="relative">
                                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Rechercher..."
                                        className="w-full pl-8 pr-3 py-1.5 text-sm rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                            </div>
                        )}
                        <div className="max-h-60 overflow-y-auto py-1">
                            {filteredOptions.length === 0 ? (
                                <div className="px-3 py-2 text-sm text-muted-foreground text-center">
                                    Aucun résultat
                                </div>
                            ) : (
                                filteredOptions.map((option) => (
                                    <div
                                        key={option.value}
                                        className={clsx(
                                            'px-3 py-2 text-sm cursor-pointer transition-colors',
                                            option.disabled && 'opacity-50 cursor-not-allowed',
                                            option.value === value
                                                ? 'bg-primary/10 text-primary'
                                                : 'hover:bg-muted/20'
                                        )}
                                        onClick={() => handleSelect(option)}
                                    >
                                        {option.label}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
            {destructive && (
                <p className="mt-1.5 text-sm text-destructive">{destructive}</p>
            )}
        </div>
    );
}

export default Select;