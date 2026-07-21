export * from './layout';

export interface BaseProps {
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    ariaLabel?: string;
    ariaDescribedBy?: string;
    ariaHidden?: boolean;
    role?: string;
    testId?: string;
    hidden?: boolean;
    tabIndex?: number;
}

export interface StylableProps extends BaseProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'primary' | 'secondary' | 'success' | 'destructive' | 'warning' | 'info';
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    as?: React.ElementType;
}

export type ColorVariant = 'primary' | 'secondary' | 'success' | 'destructive' | 'warning' | 'info';
export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

