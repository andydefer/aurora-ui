import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';
import Legend from './Legend';

export interface FieldsetProps extends LayoutBaseProps {
    legend?: string;
    disabled?: boolean;
    border?: boolean;
}

export function Fieldset({
    children,
    legend,
    disabled = false,
    border = true,
    className = '',
    style = {},
}: FieldsetProps) {
    const classes = clsx(
        'w-full',
        border && 'border border-border rounded-lg p-4',
        disabled && 'opacity-50 cursor-not-allowed',
        !border && 'border-0 p-0',
        className
    );

    return (
        <fieldset className={classes} style={style} disabled={disabled}>
            {legend && <Legend>{legend}</Legend>}
            <div className={border ? 'mt-3 space-y-3' : 'space-y-3'}>
                {children}
            </div>
        </fieldset>
    );
}

export default Fieldset;