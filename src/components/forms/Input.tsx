import { ReactNode, ChangeEvent, FocusEvent, useState } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Size } from '../../types';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

export interface InputProps extends LayoutBaseProps {
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'color';
    name?: string;
    value?: string | number;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
    onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
    placeholder?: string;
    label?: string;
    error?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    size?: Size;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    autoFocus?: boolean;
    min?: number | string;
    max?: number | string;
    step?: number | string;
    pattern?: string;
    autoComplete?: string;
    id?: string;
}

export function Input({
    type = 'text',
    name,
    value,
    onChange,
    onBlur,
    onFocus,
    placeholder,
    label,
    error,
    leftIcon,
    rightIcon,
    size = 'md',
    disabled = false,
    readonly = false,
    required = false,
    autoFocus = false,
    min,
    max,
    step,
    pattern,
    autoComplete,
    id,
    className = '',
    style = {},
}: InputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

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
        'w-full rounded-lg border transition-all duration-200',
        'bg-background text-foreground placeholder:text-muted-foreground',
        'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'read-only:bg-muted/20',
        error ? 'border-danger focus:ring-danger/20 focus:border-danger' : 'border-border',
        isFocused && !error && 'border-primary',
        leftIcon && 'pl-9',
        rightIcon && 'pr-9',
        isPassword && 'pr-9',
        sizeClasses[size],
        className
    );

    const labelClasses = clsx(
        'block text-sm font-medium mb-1.5',
        error ? 'text-danger' : 'text-foreground',
        required && 'after:content-["*"] after:ml-0.5 after:text-danger'
    );

    const errorClasses = clsx(
        'mt-1.5 text-sm text-danger flex items-center gap-1'
    );

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur?.(e);
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id || name} className={labelClasses}>
                    {label}
                </label>
            )}
            <div className="relative">
                {leftIcon && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {leftIcon}
                    </span>
                )}
                <input
                    id={id || name}
                    type={inputType}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readonly}
                    required={required}
                    autoFocus={autoFocus}
                    min={min}
                    max={max}
                    step={step}
                    pattern={pattern}
                    autoComplete={autoComplete}
                    className={classes}
                    style={style}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={togglePassword}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
                {rightIcon && !isPassword && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {rightIcon}
                    </span>
                )}
                {error && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-danger">
                        <AlertCircle size={18} />
                    </span>
                )}
            </div>
            {error && (
                <p className={errorClasses}>
                    <AlertCircle size={14} />
                    {error}
                </p>
            )}
        </div>
    );
}

export default Input;