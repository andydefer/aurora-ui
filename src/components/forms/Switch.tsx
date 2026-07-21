import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Size } from '../../types';

export interface SwitchProps extends LayoutBaseProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    label?: string;
    size?: Size;
    disabled?: boolean;
    name?: string;
    id?: string;
}

export function Switch({
    checked = false,
    onChange,
    label,
    size = 'md',
    disabled = false,
    name,
    id,
    className = '',
    style = {},
}: SwitchProps) {
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
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-base',
        '2xl': 'text-lg',
        '3xl': 'text-lg',
        '4xl': 'text-xl',
        full: 'text-xl',
    };

    const trackClasses = clsx(
        'relative rounded-full transition-colors duration-200 cursor-pointer',
        'focus-within:ring-2 focus-within:ring-primary/20',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        checked ? 'bg-primary' : 'bg-muted',
        sizeClasses[size].track,
        className
    );

    const thumbClasses = clsx(
        'absolute top-0.5 rounded-full bg-white shadow-md transition-all duration-200',
        checked ? `translate-x-[calc(100%+2px)]` : 'translate-x-0.5',
        sizeClasses[size].thumb
    );

    const labelClasses = clsx(
        'ml-3 select-none',
        labelSizeClasses[size],
        disabled ? 'text-muted-foreground' : 'text-foreground'
    );

    const handleToggle = () => {
        if (!disabled) {
            onChange?.(!checked);
        }
    };

    return (
        <label className="inline-flex items-center">
            <div className={trackClasses} style={style}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => { }}
                    onClick={handleToggle}
                    disabled={disabled}
                    name={name}
                    id={id}
                    className="sr-only"
                />
                <span className={thumbClasses} />
            </div>
            {label && <span className={labelClasses}>{label}</span>}
        </label>
    );
}

export default Switch;