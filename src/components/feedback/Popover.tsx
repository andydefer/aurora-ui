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
}

export function Popover({
    content,
    children,
    position = 'bottom',
    trigger = 'click',
    open: controlledOpen,
    onClose,
    onOpen,
    className = '',
    style = {},
}: PopoverProps) {
    const [internalOpen, setInternalOpen] = useState(false);
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
    const containerRef = useRef<HTMLDivElement>(null);

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

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
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
    };

    const classes = clsx(
        'absolute z-50 p-4 bg-card border border-border rounded-lg shadow-lg min-w-[200px] max-w-sm',
        'transition-all duration-200',
        positionClasses[position],
        isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none',
        className
    );

    return (
        <div
            ref={containerRef}
            className="relative inline-block"
            {...triggerProps}
        >
            {children}
            {content && (
                <div className={classes} style={style} role="dialog">
                    {content}
                </div>
            )}
        </div>
    );
}

export default Popover;