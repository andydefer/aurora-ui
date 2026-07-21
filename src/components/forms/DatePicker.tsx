import { useState, useRef, useEffect } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Size } from '../../types';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export interface DatePickerProps extends LayoutBaseProps {
    value?: string;
    onChange?: (value: string) => void;
    min?: string;
    max?: string;
    format?: string;
    locale?: string;
    label?: string;
    destructive?: string;
    placeholder?: string;
    size?: Size;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    id?: string;
}

export function DatePicker({
    value,
    onChange,
    min,
    max,
    format = 'YYYY-MM-DD',
    locale = 'fr-FR',
    label,
    destructive,
    placeholder = 'Sélectionner une date',
    size = 'md',
    disabled = false,
    required = false,
    name,
    id,
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

    const months = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];

    const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
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

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay();
    };

    // ✅ FORMATER LA DATE SELON LE FORMAT DEMANDE
    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return format
            .replace('YYYY', String(year))
            .replace('MM', month)
            .replace('DD', day);
    };

    // ✅ PARSER UNE DATE STRING SELON LE FORMAT
    const parseDate = (dateStr: string): Date | null => {
        if (!dateStr) return null;
        let year: number, month: number, day: number;

        if (format === 'YYYY-MM-DD') {
            const parts = dateStr.split('-');
            if (parts.length === 3) {
                year = parseInt(parts[0]);
                month = parseInt(parts[1]) - 1;
                day = parseInt(parts[2]);
                return new Date(year, month, day);
            }
        }

        // Fallback: essayer de parser avec Date
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

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const firstDayIndex = firstDay === 0 ? 6 : firstDay - 1;

    const labelClasses = clsx(
        'block text-sm font-medium mb-1.5',
        destructive ? 'text-destructive' : 'text-foreground',
        required && 'after:content-["*"] after:ml-0.5 after:text-destructive'
    );

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
                    <span className={selectedDate ? 'text-foreground' : 'text-muted-foreground'}>
                        {selectedDate ? formatDisplayDate(selectedDate) : placeholder}
                    </span>
                    <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>

                {isOpen && (
                    <div className="absolute z-50 w-72 mt-1 bg-card border border-border rounded-lg shadow-lg p-4">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <button
                                onClick={handlePrevMonth}
                                className="p-1 rounded hover:bg-muted/20 transition-colors"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <span className="font-medium text-foreground">
                                {months[month]} {year}
                            </span>
                            <button
                                onClick={handleNextMonth}
                                className="p-1 rounded hover:bg-muted/20 transition-colors"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        {/* Days of week */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {days.map((day) => (
                                <div
                                    key={day}
                                    className="text-center text-xs font-medium text-muted-foreground py-1"
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Days */}
                        <div className="grid grid-cols-7 gap-1">
                            {Array.from({ length: firstDayIndex }).map((_, i) => (
                                <div key={`empty-${i}`} className="h-9" />
                            ))}
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                const day = i + 1;
                                const disabled = isDateDisabled(day);
                                const selected = isDateSelected(day);

                                return (
                                    <button
                                        key={day}
                                        onClick={() => !disabled && handleSelectDate(day)}
                                        disabled={disabled}
                                        className={clsx(
                                            'h-9 rounded-md text-sm transition-colors',
                                            selected
                                                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                                : disabled
                                                    ? 'text-muted-foreground/50 cursor-not-allowed'
                                                    : 'hover:bg-muted/20'
                                        )}
                                    >
                                        {day}
                                    </button>
                                );
                            })}
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

export default DatePicker;