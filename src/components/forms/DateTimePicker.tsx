import { useState, useRef, useEffect } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Size } from '../../types';
import { CalendarClock } from 'lucide-react';
import { TimePicker } from './TimePicker';
import { DatePicker } from './DatePicker';

export interface DateTimePickerProps extends LayoutBaseProps {
    value?: string;
    onChange?: (value: string) => void;
    min?: string;
    max?: string;
    dateFormat?: string;
    timeFormat?: '12h' | '24h';
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

export function DateTimePicker({
    value,
    onChange,
    min,
    max,
    dateFormat = 'YYYY-MM-DD',
    timeFormat = '24h',
    locale = 'fr-FR',
    label,
    destructive,
    placeholder = 'Sélectionner une date et heure',
    size = 'md',
    disabled = false,
    required = false,
    name,
    id,
    className = '',
    style = {},
}: DateTimePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

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
            const parts = value.split('T');
            if (parts.length === 2) {
                setSelectedDate(parts[0]);
                setSelectedTime(parts[1].substring(0, 5));
            }
        } else {
            setSelectedDate(null);
            setSelectedTime(null);
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

    // ✅ FORMATER LA DATE SELON LE FORMAT DEMANDE
    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return dateFormat
            .replace('YYYY', String(year))
            .replace('MM', month)
            .replace('DD', day);
    };

    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
        if (selectedTime) {
            onChange?.(`${date}T${selectedTime}:00`);
            setIsOpen(false);
        }
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        if (selectedDate) {
            onChange?.(`${selectedDate}T${time}:00`);
            setIsOpen(false);
        }
    };

    // ✅ FORMATER LA DATE POUR L'AFFICHAGE DANS LE CHAMP
    const getDisplayValue = () => {
        if (selectedDate && selectedTime) {
            const date = new Date(selectedDate + 'T00:00:00');
            if (!isNaN(date.getTime())) {
                const formatted = formatDate(date);
                return `${formatted} ${selectedTime}`;
            }
            return `${selectedDate} ${selectedTime}`;
        }
        return placeholder;
    };

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
                    <span className={selectedDate && selectedTime ? 'text-foreground' : 'text-muted-foreground'}>
                        {selectedDate && selectedTime ? getDisplayValue() : placeholder}
                    </span>
                    <CalendarClock size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>

                {isOpen && (
                    <div className="absolute z-50 w-80 mt-1 bg-card border border-border rounded-lg shadow-lg p-4">
                        <div className="space-y-4">
                            {/* Date Picker */}
                            <DatePicker
                                value={selectedDate || undefined}
                                onChange={handleDateSelect}
                                min={min?.split('T')[0]}
                                max={max?.split('T')[0]}
                                format={dateFormat}
                                locale={locale}
                                size="sm"
                            />

                            {/* Time Picker */}
                            <TimePicker
                                value={selectedTime || undefined}
                                onChange={handleTimeSelect}
                                format={timeFormat}
                                size="sm"
                            />

                            <div className="flex justify-end gap-2 pt-2 border-t border-border">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Annuler
                                </button>
                                {selectedDate && selectedTime && (
                                    <button
                                        onClick={() => {
                                            onChange?.(`${selectedDate}T${selectedTime}:00`);
                                            setIsOpen(false);
                                        }}
                                        className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                                    >
                                        Valider
                                    </button>
                                )}
                            </div>
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

export default DateTimePicker;