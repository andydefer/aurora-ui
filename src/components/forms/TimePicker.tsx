// src/components/forms/TimePicker.tsx
import { useState, useRef, useEffect } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Size, TextColor } from '../../types';
import { Clock, X } from 'lucide-react';

export interface TimePickerProps extends LayoutBaseProps {
    value?: string;
    onChange?: (value: string) => void;
    format?: '12h' | '24h';
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
    step?: number;
    min?: string;
    max?: string;
}

export function TimePicker({
    value,
    onChange,
    format = '24h',
    label,
    error,
    placeholder = 'Sélectionner une heure',
    size = 'md',
    disabled = false,
    required = false,
    name,
    id,
    clearable = false,
    step = 1,
    min,
    max,
    className = '',
    style = {},
}: TimePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedHour, setSelectedHour] = useState<string | null>(null);
    const [selectedMinute, setSelectedMinute] = useState<string | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState<'AM' | 'PM' | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredHour, setHoveredHour] = useState<string | null>(null);
    const [hoveredMinute, setHoveredMinute] = useState<string | null>(null);

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
            const parts = value.split(':');
            if (parts.length === 2) {
                let hour = parseInt(parts[0]);
                const minute = parts[1];

                if (format === '12h') {
                    const period = hour >= 12 ? 'PM' : 'AM';
                    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                    setSelectedHour(String(hour12).padStart(2, '0'));
                    setSelectedMinute(minute);
                    setSelectedPeriod(period);
                } else {
                    setSelectedHour(String(hour).padStart(2, '0'));
                    setSelectedMinute(minute);
                    setSelectedPeriod(null);
                }
            }
        } else {
            setSelectedHour(null);
            setSelectedMinute(null);
            setSelectedPeriod(null);
        }
    }, [value, format]);

    const sizeClasses: Record<Size, string> = {
        xs: 'px-1.5 py-0.5 text-xs',
        sm: 'px-2 py-1 text-md',
        md: 'px-2.5 py-1.5 text-md',
        lg: 'px-3 py-2 text-base',
        xl: 'px-3.5 py-2.5 text-base',
        '2xl': 'px-4 py-3 text-lg',
        '3xl': 'px-4.5 py-3.5 text-lg',
        '4xl': 'px-5 py-4 text-xl',
        full: 'px-6 py-4.5 text-xl',
    };

    const classes = clsx(
        'w-full min-w-[300px] rounded-sm border bg-background text-foreground',
        'transition-all duration-200 cursor-pointer',
        'focus:outline-none focus:ring-2 focus:ring-offset-0',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        error ? 'border-destructive focus:ring-destructive/20' : 'border-border focus:ring-primary/20',
        sizeClasses[size],
        className
    );

    const getDisplayValue = () => {
        if (!selectedHour || !selectedMinute) return placeholder;

        if (format === '12h' && selectedPeriod) {
            const hour = parseInt(selectedHour);
            const hour12 = hour === 0 ? 12 : hour;
            return `${hour12}:${selectedMinute} ${selectedPeriod}`;
        }
        return `${selectedHour}:${selectedMinute}`;
    };

    const buildTimeString = (hour: string, minute: string, period?: 'AM' | 'PM' | null) => {
        let hour24 = parseInt(hour);

        if (format === '12h' && period) {
            if (period === 'PM' && hour24 !== 12) hour24 += 12;
            if (period === 'AM' && hour24 === 12) hour24 = 0;
        }

        return `${String(hour24).padStart(2, '0')}:${minute}`;
    };

    const handleTimeSelect = (hour: string, minute: string, period?: 'AM' | 'PM' | null) => {
        const newMinute = minute || selectedMinute || '00';
        const newHour = hour || selectedHour || '00';

        setSelectedHour(newHour);
        setSelectedMinute(newMinute);
        if (period) setSelectedPeriod(period);

        const timeStr = buildTimeString(newHour, newMinute, period || selectedPeriod);
        onChange?.(timeStr);
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedHour(null);
        setSelectedMinute(null);
        setSelectedPeriod(null);
        onChange?.('');
    };

    const isTimeDisabled = (hour: number, minute: number): boolean => {
        if (!min && !max) return false;
        const timeStr = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        if (min && timeStr < min) return true;
        if (max && timeStr > max) return true;
        return false;
    };

    const getHours = () => {
        const hours = [];
        const start = format === '12h' ? 1 : 0;
        const end = format === '12h' ? 12 : 23;
        for (let i = start; i <= end; i++) {
            hours.push(String(i).padStart(2, '0'));
        }
        return hours;
    };

    const getMinutes = () => {
        const minutes = [];
        for (let i = 0; i < 60; i += step) {
            minutes.push(String(i).padStart(2, '0'));
        }
        return minutes;
    };

    const hours = getHours();
    const minutes = getMinutes();
    const periods = ['AM', 'PM'];

    const labelClasses = clsx(
        'block text-md font-medium mb-2',
        error ? 'text-destructive' : 'text-foreground',
        required && 'after:content-["*"] after:ml-0.5 after:text-destructive'
    );

    const handleNow = () => {
        const now = new Date();
        const hour = String(now.getHours()).padStart(2, '0');
        const minute = String(now.getMinutes()).padStart(2, '0');

        if (format === '12h') {
            const h = parseInt(hour);
            const period = h >= 12 ? 'PM' : 'AM';
            const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
            setSelectedHour(String(h12).padStart(2, '0'));
            setSelectedMinute(minute);
            setSelectedPeriod(period);
            const timeStr = buildTimeString(String(h12).padStart(2, '0'), minute, period);
            onChange?.(timeStr);
        } else {
            setSelectedHour(hour);
            setSelectedMinute(minute);
            setSelectedPeriod(null);
            const timeStr = buildTimeString(hour, minute);
            onChange?.(timeStr);
        }
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
                    <span className={selectedHour && selectedMinute ? 'text-foreground' : 'text-muted-foreground'}>
                        {getDisplayValue()}
                    </span>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        {clearable && (selectedHour || selectedMinute) && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted/20"
                            >
                                <X size={16} />
                            </button>
                        )}
                        <Clock size={18} className="text-muted-foreground" />
                    </div>
                </div>

                {isOpen && (
                    <div className="absolute z-50 w-[300px] mt-1 bg-card border border-border rounded-sm shadow-lg p-5 animate-in fade-in zoom-in-95">
                        <div className="flex gap-4">
                            {/* Hours */}
                            <div className="flex-1">
                                <div className="text-center text-xs font-medium text-muted-foreground mb-2">
                                    Heure
                                </div>
                                <div className="relative max-h-56 overflow-y-auto scrollbar-hide space-y-1">
                                    {hours.map((hour) => {
                                        const hourNum = parseInt(hour);
                                        const isDisabled = minutes.every(m => isTimeDisabled(
                                            format === '12h' && selectedPeriod ?
                                                (selectedPeriod === 'PM' && hourNum !== 12 ? hourNum + 12 : hourNum === 12 ? 0 : hourNum) :
                                                hourNum,
                                            parseInt(m)
                                        ));
                                        const isActive = selectedHour === hour;

                                        return (
                                            <button
                                                key={hour}
                                                onClick={() => {
                                                    if (!isDisabled) {
                                                        const currentMinute = selectedMinute || minutes[0] || '00';
                                                        const period = format === '12h' ? (selectedPeriod || 'AM') : undefined;
                                                        handleTimeSelect(hour, currentMinute, period);
                                                    }
                                                }}
                                                onMouseEnter={() => setHoveredHour(hour)}
                                                onMouseLeave={() => setHoveredHour(null)}
                                                disabled={isDisabled}
                                                className={clsx(
                                                    'w-full px-3 py-2 rounded-sm text-md transition-all duration-200',
                                                    isActive
                                                        ? 'text-primary font-semibold transform scale-[1.25]'
                                                        : isDisabled
                                                            ? 'text-muted-foreground/30 cursor-not-allowed'
                                                            : hoveredHour === hour
                                                                ? 'text-primary font-semibold transform scale-[1.25]'
                                                                : 'hover:text-primary hover:font-semibold text-foreground'
                                                )}
                                            >
                                                {hour}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Minutes */}
                            <div className="flex-1">
                                <div className="text-center text-xs font-medium text-muted-foreground mb-2">
                                    Minute
                                </div>
                                <div className="relative max-h-56 overflow-y-auto scrollbar-hide space-y-1">
                                    {minutes.map((minute) => {
                                        const hourNum = selectedHour ? parseInt(selectedHour) : 0;
                                        const isDisabled = isTimeDisabled(
                                            format === '12h' && selectedPeriod ?
                                                (selectedPeriod === 'PM' && hourNum !== 12 ? hourNum + 12 : hourNum === 12 ? 0 : hourNum) :
                                                hourNum,
                                            parseInt(minute)
                                        );
                                        const isActive = selectedMinute === minute;

                                        return (
                                            <button
                                                key={minute}
                                                onClick={() => {
                                                    if (selectedHour && !isDisabled) {
                                                        const period = format === '12h' ? (selectedPeriod || 'AM') : undefined;
                                                        handleTimeSelect(selectedHour, minute, period);
                                                    }
                                                }}
                                                onMouseEnter={() => setHoveredMinute(minute)}
                                                onMouseLeave={() => setHoveredMinute(null)}
                                                disabled={!selectedHour || isDisabled}
                                                className={clsx(
                                                    'w-full px-3 py-2 rounded-sm text-md transition-all duration-200',
                                                    isActive
                                                        ? 'text-primary font-semibold transform scale-[1.25]'
                                                        : !selectedHour || isDisabled
                                                            ? 'text-muted-foreground/30 cursor-not-allowed'
                                                            : hoveredMinute === minute
                                                                ? 'text-primary font-semibold transform scale-[1.25]'
                                                                : 'hover:text-primary hover:font-semibold text-foreground'
                                                )}
                                            >
                                                {minute}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Period (12h format only) */}
                            {format === '12h' && (
                                <div className="flex-1">
                                    <div className="text-center text-xs font-medium text-muted-foreground mb-2">
                                        Période
                                    </div>
                                    <div className="space-y-1">
                                        {periods.map((period) => {
                                            const isActive = selectedPeriod === period;

                                            return (
                                                <button
                                                    key={period}
                                                    onClick={() => {
                                                        if (selectedHour && selectedMinute) {
                                                            handleTimeSelect(selectedHour, selectedMinute, period as 'AM' | 'PM');
                                                        }
                                                    }}
                                                    disabled={!selectedHour || !selectedMinute}
                                                    className={clsx(
                                                        'w-full px-3 py-2 rounded-sm text-md transition-all duration-200',
                                                        isActive
                                                            ? 'text-primary font-semibold transform scale-[1.25]'
                                                            : !selectedHour || !selectedMinute
                                                                ? 'text-muted-foreground/30 cursor-not-allowed'
                                                                : 'hover:text-primary hover:font-semibold text-foreground'
                                                    )}
                                                >
                                                    {period}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="mt-4 pt-3 border-t border-border flex justify-between items-center">
                            <button
                                onClick={handleNow}
                                className="text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                            >
                                Maintenant
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-1.5 text-md text-destructive">{error}</p>
            )}
        </div>
    );
}

export default TimePicker;