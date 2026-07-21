// src/components/utilities/FocusTrap.tsx
import { ReactNode, useEffect, useRef, useState } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, TextColor } from '../../types';
import { Lock, Unlock } from 'lucide-react';

export interface FocusTrapProps extends LayoutBaseProps {
    children: ReactNode;
    active?: boolean;
    initialFocus?: string | HTMLElement;
    returnFocus?: boolean;
    autoFocus?: boolean;
    onTrapEnter?: () => void;
    onTrapExit?: () => void;
    showIndicator?: boolean;
    indicatorText?: string;
    indicatorColor?: TextColor;
    paused?: boolean;
}

export function FocusTrap({
    children,
    active = true,
    initialFocus,
    returnFocus = true,
    autoFocus = true,
    onTrapEnter,
    onTrapExit,
    showIndicator = false,
    indicatorText = 'Focus verrouillé',
    indicatorColor = 'primary',
    paused = false,
    className = '',
    style = {},
}: FocusTrapProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);
    const [isTrapped, setIsTrapped] = useState(false);

    useEffect(() => {
        if (!active || paused) return;

        previousFocusRef.current = document.activeElement as HTMLElement;

        if (containerRef.current && autoFocus) {
            let focusElement: HTMLElement | null = null;

            if (typeof initialFocus === 'string') {
                focusElement = containerRef.current.querySelector(initialFocus) as HTMLElement;
            } else if (initialFocus instanceof HTMLElement) {
                focusElement = initialFocus;
            }

            if (focusElement) {
                setTimeout(() => focusElement?.focus(), 50);
            } else {
                const focusable = containerRef.current.querySelector(
                    'button:not([disabled]), [href]:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
                ) as HTMLElement;
                if (focusable) {
                    setTimeout(() => focusable?.focus(), 50);
                }
            }
            setIsTrapped(true);
            onTrapEnter?.();
        }

        return () => {
            if (returnFocus && previousFocusRef.current && isTrapped) {
                setTimeout(() => {
                    previousFocusRef.current?.focus();
                }, 50);
            }
            setIsTrapped(false);
            onTrapExit?.();
        };
    }, [active, initialFocus, returnFocus, autoFocus, onTrapEnter, onTrapExit, paused]);

    useEffect(() => {
        if (!active || paused) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            const container = containerRef.current;
            if (!container) return;

            const focusable = Array.from(
                container.querySelectorAll(
                    'button:not([disabled]), [href]:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
                )
            ) as HTMLElement[];

            if (focusable.length === 0) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [active, paused]);

    const indicatorClasses: Record<TextColor, string> = {
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        muted: 'bg-muted text-muted-foreground',
        destructive: 'bg-destructive text-white',
        success: 'bg-success text-white',
        warning: 'bg-warning text-white',
    };

    const classes = clsx(
        'focus-trap relative',
        active && isTrapped && 'ring-2 ring-primary/20 rounded',
        className
    );

    return (
        <div ref={containerRef} className={classes} style={style}>
            {children}

            {showIndicator && active && isTrapped && !paused && (
                <div className={clsx(
                    'absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded text-xs font-medium',
                    'shadow-sm animate-in fade-in zoom-in duration-200',
                    indicatorClasses[indicatorColor]
                )}>
                    <Lock size={12} className="inline mr-1" />
                    {indicatorText}
                </div>
            )}

            {paused && active && (
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-xs bg-muted/80 text-muted-foreground flex items-center gap-1">
                    <Unlock size={12} />
                    Pause
                </div>
            )}
        </div>
    );
}

export default FocusTrap;