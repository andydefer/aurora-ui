// src/components/forms/Input.tsx
import React, { forwardRef, InputHTMLAttributes, useState } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Size, TextColor } from '../../types';
import { Eye, EyeOff, AlertCircle, CheckCircle, X } from 'lucide-react';

export interface InputProps extends Omit<LayoutBaseProps, 'role'>, Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'> {
    label?: string;
    description?: string;
    error?: string;
    success?: boolean;
    size?: Size;
    color?: TextColor;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    clearable?: boolean;
    passwordToggle?: boolean;
    required?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    rounded?: boolean;
    variant?: 'default' | 'outlined' | 'filled' | 'ghost';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    label,
    description,
    error,
    success = false,
    size = 'md',
    color = 'primary',
    leftIcon,
    rightIcon,
    clearable = false,
    passwordToggle = false,
    required = false,
    disabled = false,
    fullWidth = true,
    rounded = false,
    variant = 'default',
    type = 'text',
    value,
    defaultValue,
    placeholder,
    onChange,
    onFocus,
    onBlur,
    className = '',
    style = {},
    id,
    name,
    ...props
}, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [inputValue, setInputValue] = useState<string>(value as string || defaultValue as string || '');

    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    const sizeClasses: Record<Size, string> = {
        xs: 'text-xs px-3 py-1.5 h-8 min-w-[220px]',
        sm: 'text-sm px-3.5 py-2 h-10 min-w-[260px]',
        md: 'text-base px-4 py-2.5 h-12 min-w-[300px]',
        lg: 'text-lg px-4.5 py-3 h-14 min-w-[340px]',
        xl: 'text-lg px-5 py-3.5 h-16 min-w-[380px]',
        '2xl': 'text-xl px-5.5 py-4 h-20 min-w-[420px]',
        '3xl': 'text-xl px-6 py-4.5 h-24 min-w-[460px]',
        '4xl': 'text-2xl px-6.5 py-5 h-28 min-w-[500px]',
        full: 'text-2xl px-7 py-5.5 h-32 min-w-[540px]',
    };
    const variantClasses = {
        default: 'bg-background border border-border',
        outlined: 'bg-transparent border-2 border-border',
        filled: 'bg-muted/30 border border-transparent hover:bg-muted/50 focus:bg-background',
        ghost: 'bg-transparent border-0 border-b-2 rounded-none',
    };

    const colorClasses: Record<TextColor, string> = {
        primary: 'focus:border-primary focus:ring-primary/20',
        secondary: 'focus:border-secondary focus:ring-secondary/20',
        muted: 'focus:border-muted-foreground focus:ring-muted-foreground/20',
        destructive: 'focus:border-destructive focus:ring-destructive/20',
        success: 'focus:border-success focus:ring-success/20',
        warning: 'focus:border-warning focus:ring-warning/20',
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

    const iconSizeMap: Record<Size, number> = {
        xs: 18,
        sm: 20,
        md: 22,
        lg: 24,
        xl: 26,
        '2xl': 28,
        '3xl': 30,
        '4xl': 32,
        full: 34,
    };

    const iconSize = iconSizeMap[size];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (onChange) onChange(e);
    };

    const handleClear = () => {
        setInputValue('');
        const syntheticEvent = {
            target: { value: '' },
            currentTarget: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>;
        if (onChange) onChange(syntheticEvent);
    };

    const hasError = !!error;
    const isSuccess = success && !hasError;
    const showClear = clearable && inputValue.length > 0 && !disabled;
    const showPasswordToggleBtn = passwordToggle && isPassword;

    const inputClasses = clsx(
        'w-full rounded-md transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-0',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'placeholder:text-muted-foreground/60 ps-3',
        sizeClasses[size],
        variantClasses[variant],
        rounded && 'rounded-full',
        hasError && 'border-destructive focus:ring-destructive/20 focus:border-destructive',
        isSuccess && 'border-success focus:ring-success/20 focus:border-success',
        !hasError && !isSuccess && colorClasses[color],
        (leftIcon || isPassword) && 'pl-[44px]',
        (rightIcon || showClear || showPasswordToggleBtn) && 'pr-12',
        className
    );

    const labelClasses = clsx(
        'block font-semibold mb-2.5 transition-colors',
        labelSizeClasses[size],
        hasError ? 'text-destructive' : 'text-foreground',
        disabled && 'text-muted-foreground'
    );

    const descriptionClasses = clsx(
        'mt-2',
        descriptionSizeClasses[size],
        hasError ? 'text-destructive' : 'text-muted-foreground'
    );

    const iconClasses = clsx(
        'absolute top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none',
        'transition-colors duration-200',
        hasError && 'text-destructive',
        isSuccess && 'text-success',
        isFocused && !hasError && !isSuccess && 'text-primary'
    );

    return (
        <div className={clsx('w-full', fullWidth && 'w-full', !fullWidth && 'inline-block')} style={style}>
            {label && (
                <label htmlFor={inputId} className={labelClasses}>
                    {label}
                    {required && <span className="ml-0.5 text-destructive">*</span>}
                </label>
            )}

            <div className="relative">
                {leftIcon && (
                    <span className={clsx('absolute left-4 top-1/2 -translate-y-1/2', iconClasses)}>
                        {leftIcon}
                    </span>
                )}

                <input
                    ref={ref}
                    id={inputId}
                    type={inputType}
                    name={name}
                    value={value !== undefined ? value : inputValue}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    onChange={handleChange}
                    onFocus={(e) => { setIsFocused(true); if (onFocus) onFocus(e); }}
                    onBlur={(e) => { setIsFocused(false); if (onBlur) onBlur(e); }}
                    disabled={disabled}
                    required={required}
                    className={inputClasses}
                    aria-invalid={hasError}
                    aria-describedby={
                        error ? `${inputId}-error` :
                            description ? `${inputId}-description` :
                                undefined
                    }
                    {...props}
                />

                {isSuccess && !hasError && !rightIcon && !showClear && !showPasswordToggleBtn && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-success pointer-events-none">
                        <CheckCircle size={iconSize * 0.7} />
                    </span>
                )}

                {rightIcon && !hasError && !isSuccess && !showClear && !showPasswordToggleBtn && (
                    <span className={clsx('absolute right-4 top-1/2 -translate-y-1/2', iconClasses)}>
                        {rightIcon}
                    </span>
                )}

                {showClear && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted/20"
                        aria-label="Effacer"
                    >
                        <X size={iconSize * 0.65} />
                    </button>
                )}

                {showPasswordToggleBtn && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted/20"
                        aria-label={showPassword ? 'Cacher le mot de passe' : 'Afficher le mot de passe'}
                    >
                        {showPassword ? <EyeOff size={iconSize * 0.7} /> : <Eye size={iconSize * 0.7} />}
                    </button>
                )}
            </div>

            {description && !error && (
                <p id={`${inputId}-description`} className={descriptionClasses}>
                    {description}
                </p>
            )}

            {error && (
                <p id={`${inputId}-error`} className={clsx('mt-2 text-sm text-destructive flex items-center gap-1.5')}>
                    <AlertCircle size={14} />
                    {error}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';
export default Input;