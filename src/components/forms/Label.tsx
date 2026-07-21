import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';
import { Info } from 'lucide-react';

export interface LabelProps extends LayoutBaseProps {
    htmlFor?: string;
    required?: boolean;
    optional?: boolean;
    tooltip?: string;
    hidden?: boolean;
}

export function Label({
    children,
    htmlFor,
    required = false,
    optional = false,
    tooltip,
    hidden = false,
    className = '',
    style = {},
}: LabelProps) {
    const classes = clsx(
        'block text-sm font-medium text-foreground',
        hidden && 'sr-only',
        className
    );

    return (
        <label htmlFor={htmlFor} className={classes} style={style}>
            {children}
            {required && (
                <span className="ml-0.5 text-destructive">*</span>
            )}
            {optional && (
                <span className="ml-1 text-sm font-normal text-muted-foreground">
                    (optionnel)
                </span>
            )}
            {tooltip && (
                <span className="ml-1.5 inline-flex cursor-help" title={tooltip}>
                    <Info size={14} className="text-muted-foreground" />
                </span>
            )}
        </label>
    );
}

export default Label;