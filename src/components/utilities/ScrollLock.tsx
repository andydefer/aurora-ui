// src/components/utilities/ScrollLock.tsx
import { ReactNode, useEffect, useRef, useState } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, TextColor } from '../../types';
import { Lock, Unlock } from 'lucide-react';

export interface ScrollLockProps extends LayoutBaseProps {
    children: ReactNode;
    enabled?: boolean;
    target?: HTMLElement | string;
    showIndicator?: boolean;
    indicatorText?: string;
    indicatorColor?: TextColor;
    preserveScrollPosition?: boolean;
    onLock?: () => void;
    onUnlock?: () => void;
    className?: string;
}

export function ScrollLock({
    children,
    enabled = true,
    target,
    showIndicator = false,
    indicatorText = 'Défilement verrouillé',
    indicatorColor = 'primary',
    preserveScrollPosition = true,
    onLock,
    onUnlock,
    className = '',
    style = {},
}: ScrollLockProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLocked, setIsLocked] = useState(false);
    const scrollPositionRef = useRef<number>(0);

    useEffect(() => {
        if (!enabled) {
            if (isLocked) {
                setIsLocked(false);
                onUnlock?.();
            }
            return;
        }

        let targetElement: HTMLElement | null = null;

        if (typeof target === 'string') {
            targetElement = document.querySelector(target) as HTMLElement;
        } else if (target instanceof HTMLElement) {
            targetElement = target;
        }

        const element = targetElement || document.body;

        // Sauvegarder la position de défilement
        if (preserveScrollPosition) {
            scrollPositionRef.current = window.scrollY || document.documentElement.scrollTop;
        }

        // Appliquer le verrouillage
        const originalOverflow = element.style.overflow;
        const originalPosition = element.style.position;
        const originalWidth = element.style.width;

        // Pour le body, on ajoute aussi un padding pour éviter le saut
        if (element === document.body) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            if (scrollbarWidth > 0) {
                element.style.paddingRight = `${scrollbarWidth}px`;
            }
        }

        element.style.overflow = 'hidden';
        element.style.position = 'fixed';
        element.style.width = '100%';
        element.style.top = `-${scrollPositionRef.current}px`;

        setIsLocked(true);
        onLock?.();

        return () => {
            // Restaurer les styles
            element.style.overflow = originalOverflow;
            element.style.position = originalPosition;
            element.style.width = originalWidth;
            element.style.paddingRight = '';
            element.style.top = '';

            // Restaurer la position de défilement
            if (preserveScrollPosition) {
                window.scrollTo(0, scrollPositionRef.current);
            }

            setIsLocked(false);
            onUnlock?.();
        };
    }, [enabled, target, preserveScrollPosition, onLock, onUnlock]);

    const indicatorClasses: Record<TextColor, string> = {
        primary: 'bg-primary text-primary-foreground border-primary/20',
        secondary: 'bg-secondary text-secondary-foreground border-secondary/20',
        muted: 'bg-muted text-muted-foreground border-muted/20',
        danger: 'bg-danger text-white border-danger/20',
        success: 'bg-success text-white border-success/20',
        warning: 'bg-warning text-white border-warning/20',
    };

    const classes = clsx(
        'scroll-lock relative',
        isLocked && 'ring-2 ring-primary/20 rounded-lg',
        className
    );

    return (
        <div ref={containerRef} className={classes} style={style}>
            {children}

            {showIndicator && isLocked && (
                <div className={clsx(
                    'absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-xs font-medium',
                    'shadow-lg border animate-in fade-in zoom-in duration-200',
                    'flex items-center gap-1.5 whitespace-nowrap',
                    indicatorClasses[indicatorColor]
                )}>
                    <Lock size={12} className="shrink-0" />
                    {indicatorText}
                </div>
            )}

            {showIndicator && !isLocked && enabled && (
                <div className={clsx(
                    'absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-xs font-medium',
                    'shadow-lg border animate-in fade-in zoom-in duration-200',
                    'bg-muted text-muted-foreground border-muted/20',
                    'flex items-center gap-1.5 whitespace-nowrap'
                )}>
                    <Unlock size={12} className="shrink-0" />
                    Défilement déverrouillé
                </div>
            )}
        </div>
    );
}

export default ScrollLock;