// src/components/feedback/Popover.tsx
import { ReactNode, useState, useRef, useEffect } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';

export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right';
export type PopoverTrigger = 'click' | 'hover' | 'focus';

export interface PopoverProps extends LayoutBaseProps {
    content: ReactNode;
    children: ReactNode;
    position?: PopoverPosition;
    trigger?: PopoverTrigger;
    open?: boolean;
    onClose?: () => void;
    onOpen?: () => void;
    className?: string;
    offset?: number;
    withArrow?: boolean;
    /** Largeur maximale du popover */
    maxWidth?: string | number;
    /** Largeur minimale du popover */
    minWidth?: string | number;
    /** Padding du contenu */
    contentPadding?: string;
    /** Alignement du popover */
    align?: 'start' | 'center' | 'end';
}

export function Popover({
    content,
    children,
    position = 'bottom',
    trigger = 'click',
    open: controlledOpen,
    onClose,
    onOpen,
    offset = 8,
    withArrow = true,
    maxWidth = 'sm',
    minWidth = '200px',
    contentPadding = 'p-4',
    align = 'center',
    className = '',
    style = {},
}: PopoverProps) {
    const [internalOpen, setInternalOpen] = useState(false);
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
    const containerRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    // Gérer le clic en dehors
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                if (controlledOpen !== undefined) {
                    onClose?.();
                } else {
                    setInternalOpen(false);
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [controlledOpen, onClose]);

    // Gérer la touche Echap
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                if (controlledOpen !== undefined) {
                    onClose?.();
                } else {
                    setInternalOpen(false);
                }
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [controlledOpen, onClose, isOpen]);

    // ✅ CORRECTION : Utiliser translate pour l'offset au lieu de mb-/mt-
    const getPositionClasses = () => {
        switch (position) {
            case 'top':
                return 'bottom-full left-1/2 -translate-x-1/2 -translate-y-2';
            case 'bottom':
                return 'top-full left-1/2 -translate-x-1/2 translate-y-2';
            case 'left':
                return 'right-full top-1/2 -translate-x-3 -translate-y-1/2';
            case 'right':
                return 'left-full top-1/2 translate-x-3 -translate-y-1/2';
            default:
                return 'top-full left-1/2 -translate-x-1/2';
        }
    };

    // ✅ AJOUT : Classes pour l'offset avec translate
    const getOffsetClasses = () => {
        // Limiter l'offset à des valeurs raisonnables
        const safeOffset = Math.min(Math.max(offset, 0), 32);

        switch (position) {
            case 'top':
                return `-translate-y-[${safeOffset + 8}px]`;
            case 'bottom':
                return `translate-y-[${safeOffset + 8}px]`;
            case 'left':
                return `-translate-x-[${safeOffset + 8}px]`;
            case 'right':
                return `translate-x-[${safeOffset + 8}px]`;
            default:
                return `translate-y-[${safeOffset + 8}px]`;
        }
    };

    // Classes d'alignement
    const getAlignClasses = () => {
        switch (position) {
            case 'top':
            case 'bottom':
                switch (align) {
                    case 'start': return 'left-0 -translate-x-0';
                    case 'end': return 'right-0 -translate-x-0';
                    default: return 'left-1/2 -translate-x-1/2';
                }
            case 'left':
            case 'right':
                switch (align) {
                    case 'start': return 'top-0 -translate-y-0';
                    case 'end': return 'bottom-0 -translate-y-0';
                    default: return 'top-1/2 -translate-y-1/2';
                }
            default: return 'left-1/2 -translate-x-1/2';
        }
    };

    // Classes de la flèche avec alignement
    const getArrowClasses = () => {
        const baseArrow = 'absolute w-0 h-0 border-[6px] border-transparent';

        switch (position) {
            case 'top':
                return clsx(
                    baseArrow,
                    'bottom-[-6px] border-t-card',
                    align === 'start' ? 'left-4' : align === 'end' ? 'right-4' : 'left-1/2 -translate-x-1/2'
                );
            case 'bottom':
                return clsx(
                    baseArrow,
                    'top-[-6px] border-b-card',
                    align === 'start' ? 'left-4' : align === 'end' ? 'right-4' : 'left-1/2 -translate-x-1/2'
                );
            case 'left':
                return clsx(
                    baseArrow,
                    'right-[-6px] border-l-card',
                    align === 'start' ? 'top-4' : align === 'end' ? 'bottom-4' : 'top-1/2 -translate-y-1/2'
                );
            case 'right':
                return clsx(
                    baseArrow,
                    'left-[-6px] border-r-card',
                    align === 'start' ? 'top-4' : align === 'end' ? 'bottom-4' : 'top-1/2 -translate-y-1/2'
                );
            default:
                return clsx(
                    baseArrow,
                    'top-[-6px] border-b-card',
                    'left-1/2 -translate-x-1/2'
                );
        }
    };

    // Classes de taille
    const getMaxWidthClasses = () => {
        if (typeof maxWidth === 'number') {
            return `max-w-[${maxWidth}px]`;
        }
        switch (maxWidth) {
            case 'xs': return 'max-w-xs';
            case 'sm': return 'max-w-sm';
            case 'md': return 'max-w-md';
            case 'lg': return 'max-w-lg';
            case 'xl': return 'max-w-xl';
            case '2xl': return 'max-w-2xl';
            default: return 'max-w-sm';
        }
    };

    const handleToggle = () => {
        if (controlledOpen !== undefined) {
            if (isOpen) {
                onClose?.();
            } else {
                onOpen?.();
            }
        } else {
            setInternalOpen(!isOpen);
        }
    };

    const handleMouseEnter = () => {
        if (trigger === 'hover') {
            if (controlledOpen !== undefined) {
                onOpen?.();
            } else {
                setInternalOpen(true);
            }
        }
    };

    const handleMouseLeave = () => {
        if (trigger === 'hover') {
            if (controlledOpen !== undefined) {
                onClose?.();
            } else {
                setInternalOpen(false);
            }
        }
    };

    const triggerProps = {
        onClick: trigger === 'click' ? handleToggle : undefined,
        onMouseEnter: trigger === 'hover' || trigger === 'focus' ? handleMouseEnter : undefined,
        onMouseLeave: trigger === 'hover' ? handleMouseLeave : undefined,
        onFocus: trigger === 'focus' ? handleMouseEnter : undefined,
        onBlur: trigger === 'focus' ? handleMouseLeave : undefined,
        'aria-expanded': isOpen,
        'aria-haspopup': true,
    };

    const classes = clsx(
        'absolute z-50 bg-card border border-border rounded-md shadow-lg',
        'transition-all duration-200 ease-out',
        getPositionClasses(),
        getAlignClasses(),
        getMaxWidthClasses(),
        `min-w-[${minWidth}]`,
        contentPadding,
        isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none',
        className
    );

    // ✅ AJOUT : Style pour l'offset
    const offsetStyle = {
        ...style,
        ...(typeof maxWidth === 'number' && { maxWidth: `${maxWidth}px` }),
        ...(typeof minWidth === 'number' && { minWidth: `${minWidth}px` }),
        transform: isOpen ? getOffsetClasses().replace('translate', '') : undefined,
    };

    // ✅ CORRECTION : Utiliser un conteneur avec gap pour l'espacement
    const containerClasses = clsx(
        'relative inline-flex flex-col items-center',
        trigger === 'hover' && 'cursor-pointer',
        // Ajouter un espacement entre le bouton et le popover
        position === 'top' && 'flex-col-reverse',
        position === 'bottom' && 'flex-col',
        position === 'left' && 'flex-row-reverse',
        position === 'right' && 'flex-row',
        // Gap pour l'espacement
        `gap-${Math.min(Math.round(offset / 4), 8)}`
    );

    return (
        <div
            ref={containerRef}
            className={containerClasses}
            {...triggerProps}
        >
            {children}
            {content && (
                <div
                    ref={popoverRef}
                    className={classes}
                    style={offsetStyle}
                    role="dialog"
                    aria-modal="true"
                >
                    {withArrow && (
                        <span className={getArrowClasses()} />
                    )}
                    <div className="relative z-10">
                        {content}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Popover;