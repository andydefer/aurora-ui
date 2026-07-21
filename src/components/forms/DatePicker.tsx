// src/components/forms/DatePicker.tsx
import { useState, useRef, useEffect } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Size, TextColor } from '../../types';
import { Calendar, ChevronLeft, ChevronRight, X, ChevronDown } from 'lucide-react';

export interface DatePickerProps extends LayoutBaseProps {
    value?: string;
    onChange?: (value: string) => void;
    min?: string;
    max?: string;
    format?: string;
    locale?: string;
    label?: string;
    error?: string;
    placeholder?: string;
    size?: Size;
    color?: TextColor;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    id?: string;
    clearable?: boolean;
    showToday?: boolean;
}

export function DatePicker({
    value,
    onChange,
    min,
    max,
    format = 'YYYY-MM-DD',
    locale = 'fr-FR',
    label,
    error,
    placeholder = 'Sélectionner une date',
    size = 'md',
    disabled = false,
    required = false,
    name,
    id,
    clearable = false,
    showToday = true,
    className = '',
    style = {},
}: DatePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState(() => {
        if (value) return new Date(value);
        return new Date();
    });
    const [selectedDate, setSelectedDate] = useState<string | null>(value || null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const [showYearPicker, setShowYearPicker] = useState(false);

    const months = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];

    const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setShowMonthPicker(false);
                setShowYearPicker(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (value !== selectedDate) {
            setSelectedDate(value || null);
            if (value) {
                setViewDate(new Date(value));
            }
        }
    }, [value]);

    const sizeClasses: Record<Size, string> = {
        xs: 'px-3 py-1.5 text-sm',
        sm: 'px-4 py-2 text-sm',
        md: 'px-5 py-2.5 text-sm',
        lg: 'px-6 py-3 text-base',
        xl: 'px-7 py-3.5 text-base',
        '2xl': 'px-8 py-4 text-lg',
        '3xl': 'px-9 py-4.5 text-lg',
        '4xl': 'px-10 py-5 text-xl',
        full: 'px-12 py-6 text-xl',
    };

    const classes = clsx(
        'w-full min-w-[340px] rounded-md border bg-background text-foreground',
        'transition-all duration-200 cursor-pointer',
        'focus:outline-none focus:ring-2 focus:ring-offset-0',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        error ? 'border-destructive focus:ring-destructive/20' : 'border-border focus:ring-primary/20',
        sizeClasses[size],
        className
    );

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
        const day = new Date(year, month, 1).getDay();
        return day === 0 ? 6 : day - 1;
    };

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return format.replace('YYYY', String(year)).replace('MM', month).replace('DD', day);
    };

    const parseDate = (dateStr: string): Date | null => {
        if (!dateStr) return null;
        if (format === 'YYYY-MM-DD') {
            const parts = dateStr.split('-');
            if (parts.length === 3) {
                const year = parseInt(parts[0]);
                const month = parseInt(parts[1]) - 1;
                const day = parseInt(parts[2]);
                return new Date(year, month, day);
            }
        }
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) return date;
        return null;
    };

    const handlePrevMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    };

    const handleSelectDate = (day: number) => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const date = new Date(year, month, day);
        const formatted = formatDate(date);
        setSelectedDate(formatted);
        onChange?.(formatted);
        setIsOpen(false);
        setShowMonthPicker(false);
        setShowYearPicker(false);
    };

    const formatDisplayDate = (dateStr: string) => {
        if (!dateStr) return '';
        const date = parseDate(dateStr);
        if (!date) return dateStr;
        return date.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const isDateDisabled = (day: number) => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const date = new Date(year, month, day);
        const dateStr = formatDate(date);
        if (min && dateStr < min) return true;
        if (max && dateStr > max) return true;
        return false;
    };

    const isDateSelected = (day: number) => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const date = new Date(year, month, day);
        const dateStr = formatDate(date);
        return dateStr === selectedDate;
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedDate(null);
        onChange?.('');
    };

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayIndex = getFirstDayOfMonth(year, month);

    const labelClasses = clsx(
        'block text-sm font-medium mb-2',
        error ? 'text-destructive' : 'text-foreground',
        required && 'after:content-["*"] after:ml-0.5 after:text-destructive'
    );

    const today = new Date();
    const isToday = (day: number) => {
        const d = new Date(year, month, day);
        return d.toDateString() === today.toDateString();
    };

    const handleMonthSelect = (monthIndex: number) => {
        setViewDate(new Date(year, monthIndex, 1));
        setShowMonthPicker(false);
    };

    const handleYearSelect = (yearValue: number) => {
        setViewDate(new Date(yearValue, month, 1));
        setShowYearPicker(false);
    };

    const getYears = () => {
        const years = [];
        const currentYear = new Date().getFullYear();
        for (let i = currentYear - 100; i <= currentYear + 100; i++) {
            years.push(i);
        }
        return years;
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
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            if (!disabled) setIsOpen(!isOpen);
                        }
                    }}
                >
                    <span className={selectedDate ? 'text-foreground' : 'text-muted-foreground'}>
                        {selectedDate ? formatDisplayDate(selectedDate) : placeholder}
                    </span>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        {clearable && selectedDate && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted/20"
                            >
                                <X size={16} />
                            </button>
                        )}
                        <Calendar size={18} className="text-muted-foreground" />
                    </div>
                </div>

                {isOpen && (
                    <div className="absolute z-50 w-[340px] mt-1 bg-card border border-border rounded-md shadow-lg p-4 animate-in fade-in zoom-in-95">
                        {/* Header mois/année avec sélecteurs */}
                        <div className="flex items-center justify-between mb-4">
                            <button
                                onClick={handlePrevMonth}
                                className="p-1.5 rounded-md hover:bg-muted/20 transition-colors text-muted-foreground hover:text-foreground"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <div className="flex items-center gap-2">
                                {/* Sélecteur de mois */}
                                <div className="relative">
                                    <button
                                        onClick={() => {
                                            setShowMonthPicker(!showMonthPicker);
                                            setShowYearPicker(false);
                                        }}
                                        className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-muted/20 transition-colors font-medium text-foreground"
                                    >
                                        {months[month]}
                                        <ChevronDown size={14} className={clsx(
                                            'transition-transform duration-200',
                                            showMonthPicker && 'rotate-180'
                                        )} />
                                    </button>
                                    {showMonthPicker && (
                                        <div className="absolute top-full left-0 mt-1 z-10 w-48 max-h-48 overflow-y-auto bg-card border border-border rounded-md shadow-lg p-1 animate-in fade-in zoom-in-95">
                                            {months.map((m, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleMonthSelect(index)}
                                                    className={clsx(
                                                        'w-full px-3 py-1.5 text-sm rounded-md transition-colors text-left',
                                                        index === month
                                                            ? 'bg-primary text-primary-foreground'
                                                            : 'hover:bg-muted/20 text-foreground'
                                                    )}
                                                >
                                                    {m}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Sélecteur d'année */}
                                <div className="relative">
                                    <button
                                        onClick={() => {
                                            setShowYearPicker(!showYearPicker);
                                            setShowMonthPicker(false);
                                        }}
                                        className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-muted/20 transition-colors font-medium text-foreground"
                                    >
                                        {year}
                                        <ChevronDown size={14} className={clsx(
                                            'transition-transform duration-200',
                                            showYearPicker && 'rotate-180'
                                        )} />
                                    </button>
                                    {showYearPicker && (
                                        <div className="absolute top-full left-0 mt-1 z-10 w-32 max-h-48 overflow-y-auto bg-card border border-border rounded-md shadow-lg p-1 animate-in fade-in zoom-in-95">
                                            {getYears().map((y) => (
                                                <button
                                                    key={y}
                                                    onClick={() => handleYearSelect(y)}
                                                    className={clsx(
                                                        'w-full px-3 py-1.5 text-sm rounded-md transition-colors text-center',
                                                        y === year
                                                            ? 'bg-primary text-primary-foreground'
                                                            : 'hover:bg-muted/20 text-foreground'
                                                    )}
                                                >
                                                    {y}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={handleNextMonth}
                                className="p-1.5 rounded-md hover:bg-muted/20 transition-colors text-muted-foreground hover:text-foreground"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        {/* Jours de la semaine */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {days.map((day) => (
                                <div
                                    key={day}
                                    className="text-center text-sm font-medium text-muted-foreground py-1"
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Jours du mois */}
                        <div className="grid grid-cols-7 gap-1">
                            {Array.from({ length: firstDayIndex }).map((_, i) => (
                                <div key={`empty-${i}`} className="h-9" />
                            ))}
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                const day = i + 1;
                                const disabled = isDateDisabled(day);
                                const selected = isDateSelected(day);
                                const todayFlag = isToday(day);

                                return (
                                    <button
                                        key={day}
                                        onClick={() => !disabled && handleSelectDate(day)}
                                        disabled={disabled}
                                        className={clsx(
                                            'h-9 rounded-md text-sm transition-all duration-200',
                                            selected
                                                ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-medium'
                                                : disabled
                                                    ? 'text-muted-foreground/30 cursor-not-allowed line-through'
                                                    : 'hover:bg-muted/20 text-foreground',
                                            todayFlag && !selected && 'ring-1 ring-primary/30 font-medium'
                                        )}
                                    >
                                        {day}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        <div className="mt-3 pt-3 border-t border-border flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                {showToday && (
                                    <button
                                        onClick={() => {
                                            const today = new Date();
                                            const formatted = formatDate(today);
                                            setSelectedDate(formatted);
                                            onChange?.(formatted);
                                            setIsOpen(false);
                                            setShowMonthPicker(false);
                                            setShowYearPicker(false);
                                        }}
                                        className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                                    >
                                        Aujourd'hui
                                    </button>
                                )}
                                {selectedDate && (
                                    <button
                                        onClick={handleClear}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        Effacer
                                    </button>
                                )}
                            </div>
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    setShowMonthPicker(false);
                                    setShowYearPicker(false);
                                }}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-1.5 text-sm text-destructive">{error}</p>
            )}
        </div>
    );
}

export default DatePicker;