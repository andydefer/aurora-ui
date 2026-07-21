import { ChangeEvent } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Size } from '../../types';
import { Check } from 'lucide-react';

export interface CheckboxProps extends LayoutBaseProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    label?: string;
    indeterminate?: boolean;
    size?: Size;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    id?: string;
}

export function Checkbox({
    checked = false,
    onChange,
    label,
    indeterminate = false,
    size = 'md',
    disabled = false,
    required = false,
    name,
    id,
    className = '',
    style = {},
}: CheckboxProps) {
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

    const classes = clsx(
        'appearance-none rounded border transition-all duration-200',
        'flex items-center justify-center',
        'cursor-pointer',
        'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        checked || indeterminate
            ? 'bg-primary border-primary text-primary-foreground'
            : 'bg-background border-border',
        sizeClasses[size],
        className
    );

    const labelClasses = clsx(
        'ml-2 select-none',
        labelSizeClasses[size],
        disabled ? 'text-muted-foreground' : 'text-foreground',
        className
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!disabled) {
            onChange?.(e.target.checked);
        }
    };

    return (
        <label className="inline-flex items-center">
            <div className="relative">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                    disabled={disabled}
                    required={required}
                    name={name}
                    id={id}
                    className="sr-only"
                />
                <span className={classes} style={style}>
                    {indeterminate ? (
                        <span className="w-1/2 h-0.5 bg-current rounded" />
                    ) : checked ? (
                        <Check
                            size={size === 'xs' || size === 'sm' ? 12 : 16}
                            strokeWidth={3}
                            className="text-current"
                        />
                    ) : null}
                </span>
            </div>
            {label && <span className={labelClasses}>{label}</span>}
        </label>
    );
}

export default Checkbox;