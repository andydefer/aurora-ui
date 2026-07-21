// src/components/forms/Switch.tsx
import React, { forwardRef, InputHTMLAttributes } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Size, TextColor } from '../../types';

export interface SwitchProps extends Omit<LayoutBaseProps, 'role'>, Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'> {
    label?: string;
    description?: string;
    size?: Size;
    color?: TextColor;
    disabled?: boolean;
    required?: boolean;
    labelPosition?: 'left' | 'right';
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(({
    label,
    description,
    size = 'md',
    color = 'primary',
    disabled = false,
    required = false,
    checked,
    defaultChecked,
    onChange,
    labelPosition = 'right',
    className = '',
    style = {},
    id,
    name,
    ...props
}, ref) => {
    const switchId = id || `switch-${Math.random().toString(36).substring(2, 9)}`;

    const sizeClasses: Record<Size, { track: string; thumb: string }> = {
        xs: { track: 'w-8 h-4', thumb: 'w-3 h-3' },
        sm: { track: 'w-10 h-5', thumb: 'w-4 h-4' },
        md: { track: 'w-12 h-6', thumb: 'w-5 h-5' },
        lg: { track: 'w-14 h-7', thumb: 'w-6 h-6' },
        xl: { track: 'w-16 h-8', thumb: 'w-7 h-7' },
        '2xl': { track: 'w-18 h-9', thumb: 'w-8 h-8' },
        '3xl': { track: 'w-20 h-10', thumb: 'w-9 h-9' },
        '4xl': { track: 'w-22 h-11', thumb: 'w-10 h-10' },
        full: { track: 'w-24 h-12', thumb: 'w-11 h-11' },
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

    const descriptionSizeClasses: Record<Size, string> = {
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
        primary: 'bg-primary focus:ring-primary',
        secondary: 'bg-secondary focus:ring-secondary',
        muted: 'bg-muted-foreground focus:ring-muted-foreground',
        destructive: 'bg-destructive focus:ring-destructive',
        success: 'bg-success focus:ring-success',
        warning: 'bg-warning focus:ring-warning',
    };

    const isChecked = checked !== undefined ? checked : defaultChecked || false;

    const trackClasses = clsx(
        'relative inline-flex items-center flex-shrink-0 rounded-full transition-colors duration-300 cursor-pointer',
        'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-background',
        sizeClasses[size].track,
        isChecked ? colorClasses[color] : 'bg-primary/40',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
    );

    const thumbClasses = clsx(
        'absolute top-0.5 left-0.5 bg-card rounded-full shadow-md transition-all duration-300',
        sizeClasses[size].thumb,
        isChecked && `translate-x-[calc(100%+2px)]`
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!disabled && onChange) {
            onChange(e);
        }
    };

    const labelClasses = clsx(
        'font-semibold cursor-pointer transition-colors',
        labelSizeClasses[size],
        disabled ? 'text-muted-foreground' : 'text-foreground',
        labelPosition === 'left' && 'order-first mr-3',
        labelPosition === 'right' && 'ml-3'
    );

    const descriptionClasses = clsx(
        'text-muted-foreground mt-0.5 inline-block px-3',
        descriptionSizeClasses[size],
        disabled && 'opacity-50'
    );

    return (
        <div className={clsx('w-full min-w-[280px]', className)} style={style}>
            <div className="flex items-center">
                {label && labelPosition === 'left' && (
                    <div className="flex flex-col">
                        <label htmlFor={switchId} className={labelClasses}>
                            {label}
                            {required && <span className="ml-0.5 text-destructive">*</span>}
                        </label>
                        {description && (
                            <span className={descriptionClasses}>{description}</span>
                        )}
                    </div>
                )}

                <label
                    htmlFor={switchId}
                    className={trackClasses}
                >
                    <input
                        ref={ref}
                        id={switchId}
                        type="checkbox"
                        name={name}
                        checked={checked}
                        defaultChecked={defaultChecked}
                        onChange={handleChange}
                        disabled={disabled}
                        required={required}
                        className="sr-only"
                        {...props}
                    />
                    <span className={thumbClasses} />
                </label>

                {label && labelPosition === 'right' && (
                    <div className="flex flex-col">
                        <label htmlFor={switchId} className={labelClasses}>
                            {label}
                            {required && <span className="ml-0.5 text-destructive">*</span>}
                        </label>
                        {description && (
                            <span className={descriptionClasses}>{description}</span>
                        )}
                    </div>
                )}
            </div>

            {!description && label && labelPosition === 'left' && (
                <div className="mt-0.5" />
            )}
        </div>
    );
});

Switch.displayName = 'Switch';
export default Switch;