// src/components/forms/Checkbox.tsx
import React, { forwardRef, InputHTMLAttributes } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Size, TextColor } from '../../types';
import { Check, Minus } from 'lucide-react';

export interface CheckboxProps extends Omit<LayoutBaseProps, 'role'>, Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'> {
    label?: string;
    description?: string;
    error?: string;
    size?: Size;
    color?: TextColor;
    indeterminate?: boolean;
    disabled?: boolean;
    required?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
    label,
    description,
    error,
    size = 'md',
    color = 'primary',
    indeterminate = false,
    disabled = false,
    required = false,
    checked,
    onChange,
    className = '',
    style = {},
    id,
    ...props
}, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;

    const sizeClasses: Record<Size, string> = {
        xs: 'w-3.5 h-3.5',
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
        xl: 'w-7 h-7',
        '2xl': 'w-8 h-8',
        '3xl': 'w-9 h-9',
        '4xl': 'w-10 h-10',
        full: 'w-12 h-12',
    };

    const iconSizeMap: Record<Size, number> = {
        xs: 8,
        sm: 10,
        md: 12,
        lg: 14,
        xl: 16,
        '2xl': 18,
        '3xl': 20,
        '4xl': 22,
        full: 24,
    };

    const labelSizeClasses: Record<Size, string> = {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-base',
        '2xl': 'text-lg',
        '3xl': 'text-lg',
        '4xl': 'text-xl',
        full: 'text-xl',
    };

    const descriptionSizeClasses: Record<Size, string> = {
        xs: 'text-[10px]',
        sm: 'text-xs',
        md: 'text-xs',
        lg: 'text-sm',
        xl: 'text-sm',
        '2xl': 'text-sm',
        '3xl': 'text-base',
        '4xl': 'text-base',
        full: 'text-base',
    };

    const checkboxClasses = clsx(
        'appearance-none rounded border-2 bg-background transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'cursor-pointer',
        sizeClasses[size],
        error ? 'border-destructive focus:ring-destructive' : 'border-border hover:border-primary',
        checked && !error && 'border-primary bg-primary',
        checked && error && 'border-destructive bg-destructive',
        className
    );

    const iconSize = iconSizeMap[size];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!disabled && onChange) {
            onChange(e);
        }
    };

    return (
        <div className="flex items-start gap-3" style={style}>
            <div className="relative flex items-center justify-center mt-0.5">
                <input
                    ref={ref}
                    id={checkboxId}
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                    disabled={disabled}
                    required={required}
                    className={checkboxClasses}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${checkboxId}-error` : undefined}
                    {...props}
                />
                {checked && !indeterminate && (
                    <Check
                        size={iconSize}
                        className="absolute inset-0 m-auto text-primary-foreground pointer-events-none"
                        strokeWidth={3}
                    />
                )}
                {indeterminate && (
                    <Minus
                        size={iconSize}
                        className="absolute inset-0 m-auto text-primary-foreground pointer-events-none"
                        strokeWidth={3}
                    />
                )}
            </div>

            <div className="flex-1">
                {label && (
                    <label
                        htmlFor={checkboxId}
                        className={clsx(
                            'font-medium cursor-pointer transition-colors',
                            labelSizeClasses[size],
                            disabled ? 'text-muted-foreground' : 'text-foreground',
                            error && 'text-destructive'
                        )}
                    >
                        {label}
                        {required && <span className="ml-1 text-destructive">*</span>}
                    </label>
                )}
                {description && (
                    <p className={clsx(
                        'text-muted-foreground',
                        descriptionSizeClasses[size],
                        disabled && 'opacity-50'
                    )}>
                        {description}
                    </p>
                )}
                {error && (
                    <p id={`${checkboxId}-error`} className="text-xs text-destructive mt-1">
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
});

Checkbox.displayName = 'Checkbox';
export default Checkbox;