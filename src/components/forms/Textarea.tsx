// src/components/forms/Textarea.tsx
import { ChangeEvent, useRef } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Size, TextColor } from '../../types';
import { AlertCircle } from 'lucide-react';

export interface TextareaProps extends LayoutBaseProps {
    name?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    rows?: number;
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
    label?: string;
    description?: string;
    error?: string;
    size?: Size;
    color?: TextColor;
    disabled?: boolean;
    required?: boolean;
    id?: string;
    maxLength?: number;
    showCharCount?: boolean;
    minLength?: number;
    autoFocus?: boolean;
}

export function Textarea({
    name,
    value,
    onChange,
    placeholder,
    rows = 4,
    resize = 'vertical',
    label,
    description,
    error,
    size = 'md',
    color = 'primary',
    disabled = false,
    required = false,
    id,
    maxLength,
    showCharCount = false,
    minLength,
    autoFocus = false,
    className = '',
    style = {},
}: TextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const currentLength = typeof value === 'string' ? value.length : 0;
    const isNearLimit = maxLength && currentLength > maxLength * 0.9;
    const isAtLimit = maxLength && currentLength >= maxLength;

    const sizeClasses: Record<Size, string> = {
        xs: 'text-xs px-2 py-1 h-16 w-48',
        sm: 'text-sm px-2.5 py-1.5 h-20 w-56',
        md: 'text-base px-3 py-2 h-24 w-64',
        lg: 'text-lg px-3.5 py-2.5 h-28 w-72',
        xl: 'text-lg px-4 py-3 h-32 w-80',
        '2xl': 'text-xl px-4.5 py-3.5 h-36 w-88',
        '3xl': 'text-xl px-5 py-4 h-40 w-96',
        '4xl': 'text-2xl px-5.5 py-4.5 h-44 w-[400px]',
        full: 'text-2xl px-6 py-5 h-48 w-[480px]',
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

    const resizeClasses = {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
    };

    const colorClasses: Record<TextColor, string> = {
        primary: 'focus:border-primary focus:ring-primary/20',
        secondary: 'focus:border-secondary focus:ring-secondary/20',
        muted: 'focus:border-muted-foreground focus:ring-muted-foreground/20',
        destructive: 'focus:border-destructive focus:ring-destructive/20',
        success: 'focus:border-success focus:ring-success/20',
        warning: 'focus:border-warning focus:ring-warning/20',
    };

    const classes = clsx(
        'rounded-md border bg-background text-foreground',
        'placeholder:text-muted-foreground',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-0',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'read-only:bg-muted/20',
        sizeClasses[size],
        resizeClasses[resize],
        error ? 'border-destructive focus:ring-destructive/20' : 'border-border',
        !error && colorClasses[color],
        isAtLimit && 'border-warning focus:ring-warning/20',
        className
    );

    const labelClasses = clsx(
        'block font-semibold mb-2 transition-colors',
        labelSizeClasses[size],
        error ? 'text-destructive' : 'text-foreground',
        disabled && 'text-muted-foreground',
        required && 'after:content-["*"] after:ml-0.5 after:text-destructive'
    );

    const descriptionClasses = clsx(
        'mt-1.5',
        descriptionSizeClasses[size],
        error ? 'text-destructive' : 'text-muted-foreground'
    );

    const charCountClasses = clsx(
        'text-xs transition-colors mt-1.5',
        isNearLimit ? (isAtLimit ? 'font-medium text-warning' : 'text-warning/70') : 'text-muted-foreground'
    );

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (onChange) onChange(e);
    };

    return (
        <div className="flex flex-col">
            {label && (
                <label htmlFor={id || name} className={labelClasses}>
                    {label}
                </label>
            )}

            {description && !error && (
                <p className={descriptionClasses}>{description}</p>
            )}

            <textarea
                ref={textareaRef}
                id={id || name}
                name={name}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                rows={rows}
                disabled={disabled}
                required={required}
                maxLength={maxLength}
                minLength={minLength}
                autoFocus={autoFocus}
                className={classes}
                style={style}
                aria-invalid={!!error}
                aria-describedby={
                    error ? `${id || name}-error` :
                        description ? `${id || name}-description` :
                            undefined
                }
            />

            <div className="flex items-center justify-between">
                {error && (
                    <p id={`${id || name}-error`} className="mt-1.5 text-sm text-destructive flex items-center gap-1.5">
                        <AlertCircle size={14} />
                        {error}
                    </p>
                )}

                {showCharCount && maxLength && (
                    <span className={clsx(charCountClasses, !error && 'ml-auto')}>
                        {currentLength} / {maxLength}
                        {isNearLimit && !isAtLimit && ' ⚠️'}
                        {isAtLimit && ' 🚫'}
                    </span>
                )}
            </div>

            {!error && minLength && currentLength > 0 && currentLength < minLength && (
                <p className="mt-1 text-xs text-warning flex items-center gap-1">
                    <AlertCircle size={12} />
                    Minimum {minLength} caractères requis
                </p>
            )}
        </div>
    );
}

export default Textarea;