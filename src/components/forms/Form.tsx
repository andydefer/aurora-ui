import { FormEvent } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';

export interface FormProps extends LayoutBaseProps {
    onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    noValidate?: boolean;
    validationMode?: 'onSubmit' | 'onChange' | 'onBlur' | 'onTouched';
    as?: React.ElementType;
}

export function Form({
    children,
    onSubmit,
    method = 'POST',
    noValidate = false,
    validationMode = 'onSubmit',
    as: Component = 'form',
    className = '',
    style = {},
}: FormProps) {
    const classes = clsx(
        'w-full space-y-4',
        className
    );

    return (
        <Component
            className={classes}
            style={style}
            onSubmit={onSubmit}
            method={method}
            noValidate={noValidate}
            data-validation-mode={validationMode}
        >
            {children}
        </Component>
    );
}

export default Form;