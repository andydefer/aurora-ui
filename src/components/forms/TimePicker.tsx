import { useState, useRef, useEffect } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Size } from '../../types';
import { Clock } from 'lucide-react';

export interface TimePickerProps extends LayoutBaseProps {
    value?: string;
    onChange?: (value: string) => void;
    min?: string;
    max?: string;
    step?: number;
    format?: '12h' | '24h';
    label?: string;
    destructive?: string;
    placeholder?: string;
    size?: Size;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    id?: string;
}

export function TimePicker({
    value,
    onChange,
    min,
    max,
    step = 30,
    format = '24h',
    label,
    destructive,
    placeholder = 'Sélectionner une heure',
    size = 'md',
    disabled = false,
    required = false,
    name,
    id,
    className = '',
    style = {},
}: TimePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedHour, setSelectedHour] = useState<string | null>(null);
    const [selectedMinute, setSelectedMinute] = useState<string | null>(null);
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
            const parts = value.split(':');
            if (parts.length === 2) {
                setSelectedHour(parts[0]);
                setSelectedMinute(parts[1]);
            }
        } else {
            setSelectedHour(null);
            setSelectedMinute(null);
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

    const formatDisplayTime = (hour: string, minute: string) => {
        if (!hour || !minute) return '';
        const h = parseInt(hour);
        if (format === '12h') {
            const period = h >= 12 ? 'PM' : 'AM';
            const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
            return `${h12}:${minute.padStart(2, '0')} ${period}`;
        }
        return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
    };

    const getHours = () => {
        const hours = [];
        const maxHour = format === '12h' ? 12 : 23;
        const start = format === '12h' ? 1 : 0;
        for (let i = start; i <= maxHour; i++) {
            hours.push(i.toString());
        }
        return hours;
    };

    const getMinutes = () => {
        const minutes = [];
        for (let i = 0; i < 60; i += step) {
            minutes.push(i.toString().padStart(2, '0'));
        }
        return minutes;
    };

    const handleSelectTime = (hour: string, minute: string) => {
        const h = parseInt(hour);
        let finalHour = h;
        if (format === '12h') {
            // En 12h, on garde l'heure telle quelle pour l'affichage
            // mais on stocke en 24h
            finalHour = h === 12 ? 0 : h;
        }
        const timeStr = `${finalHour.toString().padStart(2, '0')}:${minute}`;
        setSelectedHour(hour);
        setSelectedMinute(minute);
        onChange?.(timeStr);
        setIsOpen(false);
    };

    const isTimeDisabled = (hour: string, minute: string) => {
        const h = parseInt(hour);
        const m = parseInt(minute);
        const timeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        if (min && timeStr < min) return true;
        if (max && timeStr > max) return true;
        return false;
    };

    const isTimeSelected = (hour: string, minute: string) => {
        return hour === selectedHour && minute === selectedMinute;
    };

    const hours = getHours();
    const minutes = getMinutes();

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
                    <span className={selectedHour && selectedMinute ? 'text-foreground' : 'text-muted-foreground'}>
                        {selectedHour && selectedMinute
                            ? formatDisplayTime(selectedHour, selectedMinute)
                            : placeholder}
                    </span>
                    <Clock size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>

                {isOpen && (
                    <div className="absolute z-50 w-64 mt-1 bg-card border border-border rounded-lg shadow-lg p-4">
                        <div className="flex gap-2">
                            {/* Hours */}
                            <div className="flex-1">
                                <div className="text-xs font-medium text-muted-foreground mb-2 text-center">Heure</div>
                                <div className="max-h-48 overflow-y-auto space-y-1">
                                    {hours.map((hour) => (
                                        <button
                                            key={hour}
                                            onClick={() => {
                                                const firstMinute = minutes[0];
                                                if (!isTimeDisabled(hour, firstMinute)) {
                                                    handleSelectTime(hour, firstMinute);
                                                }
                                            }}
                                            className={clsx(
                                                'w-full px-2 py-1.5 rounded text-sm transition-colors',
                                                isTimeSelected(hour, minutes[0])
                                                    ? 'bg-primary text-primary-foreground'
                                                    : isTimeDisabled(hour, minutes[0])
                                                        ? 'text-muted-foreground/50 cursor-not-allowed'
                                                        : 'hover:bg-muted/20'
                                            )}
                                            disabled={isTimeDisabled(hour, minutes[0])}
                                        >
                                            {format === '12h' && parseInt(hour) === 0 ? '12' : hour}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Minutes */}
                            <div className="flex-1">
                                <div className="text-xs font-medium text-muted-foreground mb-2 text-center">Minute</div>
                                <div className="max-h-48 overflow-y-auto space-y-1">
                                    {minutes.map((minute) => (
                                        <button
                                            key={minute}
                                            onClick={() => {
                                                if (selectedHour && !isTimeDisabled(selectedHour, minute)) {
                                                    handleSelectTime(selectedHour, minute);
                                                }
                                            }}
                                            className={clsx(
                                                'w-full px-2 py-1.5 rounded text-sm transition-colors',
                                                isTimeSelected(selectedHour || '', minute)
                                                    ? 'bg-primary text-primary-foreground'
                                                    : (selectedHour && isTimeDisabled(selectedHour, minute))
                                                        ? 'text-muted-foreground/50 cursor-not-allowed'
                                                        : 'hover:bg-muted/20'
                                            )}
                                            disabled={!selectedHour || isTimeDisabled(selectedHour, minute)}
                                        >
                                            {minute}
                                        </button>
                                    ))}
                                </div>
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

export default TimePicker;