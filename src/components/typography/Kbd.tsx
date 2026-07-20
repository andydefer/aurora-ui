import React from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Size } from '../../types';

export interface KbdProps extends LayoutBaseProps {
    command?: boolean;
    keys?: string[];
    size?: Size;
    variant?: 'default' | 'outline' | 'ghost';
    shortcut?: string;
}

export function Kbd({
    children,
    command = false,
    keys,
    size = 'md',
    variant = 'default',
    shortcut,
    className = '',
    style = {},
}: React.PropsWithChildren<KbdProps>) {
    const sizeClasses: Record<Size, string> = {
        xs: 'px-1.5 py-0.5 text-[10px] gap-0.5',
        sm: 'px-2 py-0.5 text-xs gap-0.5',
        md: 'px-2.5 py-1 text-xs gap-1',
        lg: 'px-3 py-1.5 text-sm gap-1',
        xl: 'px-3.5 py-1.5 text-sm gap-1.5',
        '2xl': 'px-4 py-2 text-base gap-1.5',
        '3xl': 'px-4.5 py-2.5 text-base gap-2',
        '4xl': 'px-5 py-3 text-lg gap-2',
        full: 'px-6 py-3.5 text-lg gap-2',
    };

    const variantClasses = {
        default: 'bg-muted text-foreground border border-border',
        outline: 'bg-transparent text-foreground border border-border',
        ghost: 'bg-transparent text-muted-foreground border-0',
    };

    const keySizeClasses: Record<Size, string> = {
        xs: 'px-1 py-0.5 text-[10px]',
        sm: 'px-1.5 py-0.5 text-[11px]',
        md: 'px-1.5 py-0.5 text-xs',
        lg: 'px-2 py-1 text-xs',
        xl: 'px-2 py-1 text-sm',
        '2xl': 'px-2.5 py-1.5 text-sm',
        '3xl': 'px-3 py-1.5 text-base',
        '4xl': 'px-3.5 py-2 text-base',
        full: 'px-4 py-2.5 text-lg',
    };

    const commandIcons: Record<string, string> = {
        cmd: '⌘',
        option: '⌥',
        shift: '⇧',
        control: '⌃',
        enter: '↵',
        escape: '⎋',
        delete: '⌫',
        tab: '⇥',
        up: '↑',
        down: '↓',
        left: '←',
        right: '→',
    };

    const renderKey = (key: string) => {
        const icon = commandIcons[key.toLowerCase()];
        return icon || key;
    };

    const renderKeys = () => {
        if (keys) {
            return keys.map((key, index) => (
                <React.Fragment key={index}>
                    <kbd
                        className={clsx(
                            'rounded border border-border bg-background/80 font-mono font-medium',
                            'shadow-sm transition-colors',
                            keySizeClasses[size],
                            variant === 'default' && 'bg-background'
                        )}
                    >
                        {renderKey(key)}
                    </kbd>
                    {index < keys.length - 1 && (
                        <span className="text-muted-foreground font-medium">+</span>
                    )}
                </React.Fragment>
            ));
        }
        return children;
    };

    const classes = clsx(
        'inline-flex items-center font-mono font-medium rounded-md transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary/20',
        sizeClasses[size],
        variantClasses[variant],
        className
    );

    const content = command ? (
        <>
            <span className="text-muted-foreground">{commandIcons.cmd}</span>
            {renderKeys()}
        </>
    ) : shortcut ? (
        <span className="tracking-wide">{shortcut}</span>
    ) : (
        renderKeys()
    );

    return (
        <kbd className={classes} style={style}>
            {content}
        </kbd>
    );
}

export default Kbd;