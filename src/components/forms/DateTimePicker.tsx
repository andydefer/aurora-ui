// src/components/forms/DateTimePicker.tsx
import { useState, useRef, useEffect } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Size, TextColor } from '../../types';
import { CalendarClock, Clock, Globe, X } from 'lucide-react';
import { TimePicker } from './TimePicker';
import { DatePicker } from './DatePicker';
import { Badge } from '../feedback/Badge';

export type DateTimeMode = 'iso' | 'zulu';

export interface DateTimePickerProps extends LayoutBaseProps {
    value?: string;
    onChange?: (value: string) => void;
    min?: string;
    max?: string;
    dateFormat?: string;
    timeFormat?: '12h' | '24h';
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
    mode?: DateTimeMode;
    timezone?: string;
    showTimezone?: boolean;
    clearable?: boolean;
}

export function DateTimePicker({
    value,
    onChange,
    min,
    max,
    dateFormat = 'YYYY-MM-DD',
    timeFormat = '24h',
    locale = 'fr-FR',
    label,
    error,
    placeholder = 'Sélectionner une date et heure',
    size = 'md',
    color = 'primary',
    disabled = false,
    required = false,
    name,
    id,
    mode = 'iso',
    timezone = 'UTC',
    showTimezone = true,
    clearable = false,
    className = '',
    style = {},
}: DateTimePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [displayValue, setDisplayValue] = useState('');

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
        if (value) {
            if (mode === 'zulu') {
                const date = new Date(value);
                if (!isNaN(date.getTime())) {
                    const isoDate = date.toISOString().split('T')[0];
                    const isoTime = date.toISOString().split('T')[1].substring(0, 5);
                    setSelectedDate(isoDate);
                    setSelectedTime(isoTime);
                    updateDisplayValue(isoDate, isoTime);
                }
            } else {
                const parts = value.split('T');
                if (parts.length === 2) {
                    const datePart = parts[0];
                    const timePart = parts[1].substring(0, 5);
                    setSelectedDate(datePart);
                    setSelectedTime(timePart);
                    updateDisplayValue(datePart, timePart);
                }
            }
        } else {
            setSelectedDate(null);
            setSelectedTime(null);
            setDisplayValue('');
        }
    }, [value, mode]);

    const sizeClasses: Record<Size, string> = {
        xs: 'px-3 py-1.5 text-xs',
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
        'w-full min-w-[400px] rounded-md border bg-background/50s text-foreground',
        'transition-all duration-200 cursor-pointer',
        'focus:outline-none focus:ring-2 focus:ring-offset-0',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        error ? 'border-destructive focus:ring-destructive/20' : 'border-border focus:ring-primary/20',
        sizeClasses[size],
        className
    );

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return dateFormat.replace('YYYY', String(year)).replace('MM', month).replace('DD', day);
    };

    const formatDisplayDate = (dateStr: string) => {
        if (!dateStr) return '';
        const date = new Date(dateStr + 'T00:00:00');
        if (isNaN(date.getTime())) return dateStr;
        return date.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const updateDisplayValue = (date: string | null, time: string | null) => {
        if (date && time) {
            const formattedDate = formatDisplayDate(date);
            setDisplayValue(`${formattedDate} à ${time}`);
        } else if (date) {
            setDisplayValue(formatDisplayDate(date));
        } else if (time) {
            setDisplayValue(time);
        } else {
            setDisplayValue('');
        }
    };

    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
        updateDisplayValue(date, selectedTime);

        if (selectedTime) {
            const fullDateTime = buildDateTime(date, selectedTime);
            onChange?.(fullDateTime);
            setIsOpen(false);
        }
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        updateDisplayValue(selectedDate, time);

        if (selectedDate) {
            const fullDateTime = buildDateTime(selectedDate, time);
            onChange?.(fullDateTime);
            setIsOpen(false);
        }
    };

    const buildDateTime = (date: string, time: string) => {
        if (mode === 'zulu') {
            return `${date}T${time}:00Z`;
        } else {
            const offset = timezone === 'UTC' ? 'Z' : getTimezoneOffset();
            return `${date}T${time}:00${offset}`;
        }
    };

    const getTimezoneOffset = () => {
        const offset = new Date().getTimezoneOffset();
        const sign = offset > 0 ? '-' : '+';
        const hours = String(Math.abs(Math.floor(offset / 60))).padStart(2, '0');
        const minutes = String(Math.abs(offset % 60)).padStart(2, '0');
        return `${sign}${hours}:${minutes}`;
    };

    const getTimezoneLabel = () => {
        if (mode === 'zulu') return 'UTC (Zulu)';
        if (timezone === 'UTC') return 'UTC';
        const offset = getTimezoneOffset();
        return `UTC${offset}`;
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedDate(null);
        setSelectedTime(null);
        setDisplayValue('');
        onChange?.('');
    };

    const labelClasses = clsx(
        'block text-sm font-medium mb-2',
        error ? 'text-destructive' : 'text-foreground',
        required && 'after:content-["*"] after:ml-0.5 after:text-destructive'
    );

    return (
        <div className="w-full" ref={containerRef}>
            {label && (
                <div className="flex items-center justify-between mb-2">
                    <label htmlFor={id || name} className={labelClasses}>
                        {label}
                    </label>
                    {showTimezone && (
                        <Badge variant="outline" size="sm" className="flex items-center gap-1">
                            <Globe size={12} />
                            {getTimezoneLabel()}
                            {mode === 'zulu' && <span className="uppercase text-[10px] ml-0.5">Z</span>}
                        </Badge>
                    )}
                </div>
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
                    <span className={selectedDate && selectedTime ? 'text-foreground' : 'text-muted-foreground'}>
                        {displayValue || placeholder}
                    </span>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        {clearable && (selectedDate || selectedTime) && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted/20"
                            >
                                <X size={16} />
                            </button>
                        )}
                        {mode === 'zulu' && (
                            <span className="text-[10px] font-mono text-muted-foreground/60 mr-1">Z</span>
                        )}
                        <CalendarClock size={18} className="text-muted-foreground" />
                    </div>
                </div>

                {isOpen && (
                    <div className="absolute z-50 w-[400px] mt-1 bg-card border border-border rounded-md shadow-lg p-5 animate-in fade-in zoom-in-95">
                        <div className="flex items-center justify-between mb-4 p-2.5 rounded-md bg-muted/10 border border-border/50">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <Clock size={14} className="text-primary" />
                                <span>Mode: <span className="font-medium text-foreground uppercase">{mode}</span></span>
                                {mode === 'zulu' ? (
                                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded">Temps universel</span>
                                ) : (
                                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded">{getTimezoneLabel()}</span>
                                )}
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">
                            <DatePicker
                                value={selectedDate || undefined}
                                onChange={handleDateSelect}
                                min={min?.split('T')[0]}
                                max={max?.split('T')[0]}
                                format={dateFormat}
                                locale={locale}
                                size="md"
                                color={color}
                                label="Date"
                            />

                            <TimePicker
                                value={selectedTime || undefined}
                                onChange={handleTimeSelect}
                                format={timeFormat}
                                size="md"
                                color={color}
                                label="Heure"
                            />

                            <div className="flex justify-between items-center pt-3 border-t border-border">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => {
                                            const now = new Date();
                                            const date = formatDate(now);
                                            const time = now.toTimeString().substring(0, 5);
                                            handleDateSelect(date);
                                            handleTimeSelect(time);
                                        }}
                                        className="text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                                    >
                                        Maintenant
                                    </button>
                                    <span className="text-xs text-muted-foreground">•</span>
                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            setSelectedDate(null);
                                            setSelectedTime(null);
                                            setDisplayValue('');
                                            onChange?.('');
                                        }}
                                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        Effacer
                                    </button>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
                                >
                                    Valider
                                </button>
                            </div>
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

export default DateTimePicker;