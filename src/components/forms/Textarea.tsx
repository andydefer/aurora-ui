import { ChangeEvent, useRef, useEffect } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';

export interface TextareaProps extends LayoutBaseProps {
    name?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    rows?: number;
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
    autoResize?: boolean;
    maxRows?: number;
    label?: string;
    destructive?: string;
    disabled?: boolean;
    required?: boolean;
    id?: string;
}

export function Textarea({
    name,
    value,
    onChange,
    placeholder,
    rows = 4,
    resize = 'vertical',
    autoResize = false,
    maxRows,
    label,
    destructive,
    disabled = false,
    required = false,
    id,
    className = '',
    style = {},
}: TextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const resizeClasses = {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
    };

    useEffect(() => {
        if (autoResize && textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            const scrollHeight = textareaRef.current.scrollHeight;
            const maxHeight = maxRows ? maxRows * 24 : Infinity;
            textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
        }
    }, [value, autoResize, maxRows]);

    const classes = clsx(
        'w-full rounded-lg border border-border bg-background text-foreground',
        'placeholder:text-muted-foreground',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'read-only:bg-muted/20',
        destructive && 'border-destructive focus:ring-destructive/20 focus:border-destructive',
        resizeClasses[resize],
        'px-3.5 py-2 text-sm',
        className
    );

    const labelClasses = clsx(
        'block text-sm font-medium mb-1.5',
        destructive ? 'text-destructive' : 'text-foreground',
        required && 'after:content-["*"] after:ml-0.5 after:text-destructive'
    );

    const errorClasses = clsx(
        'mt-1.5 text-sm text-destructive'
    );

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id || name} className={labelClasses}>
                    {label}
                </label>
            )}
            <textarea
                ref={textareaRef}
                id={id || name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                disabled={disabled}
                required={required}
                className={classes}
                style={style}
            />
            {destructive && (
                <p className={errorClasses}>{destructive}</p>
            )}
        </div>
    );
}

export default Textarea;