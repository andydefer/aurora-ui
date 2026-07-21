import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';

export interface LegendProps extends LayoutBaseProps { }

export function Legend({
    children,
    className = '',
    style = {},
}: LegendProps) {
    const classes = clsx(
        'text-sm font-semibold text-foreground px-1',
        className
    );

    return (
        <legend className={classes} style={style}>
            {children}
        </legend>
    );
}

export default Legend;