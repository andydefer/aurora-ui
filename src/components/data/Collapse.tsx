// src/components/data/Collapse.tsx
import { ReactNode, useState, useEffect, useRef } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, TextColor } from '../../types';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface CollapseProps extends LayoutBaseProps {
    in?: boolean;
    children: ReactNode;
    timeout?: number;
    dimension?: 'height' | 'width';
    appear?: boolean;
    className?: string;
    showToggle?: boolean;
    toggleText?: string;
    color?: TextColor;
    iconPosition?: 'left' | 'right';
    toggleVariant?: 'default' | 'outline' | 'ghost';
    toggleSize?: 'sm' | 'md' | 'lg';
}

export function Collapse({
    in: isOpen = false,
    children,
    timeout = 300,
    dimension = 'height',
    appear = false,
    showToggle = false,
    toggleText = 'Afficher / Masquer',
    color = 'primary',
    iconPosition = 'right',
    toggleVariant = 'default',
    toggleSize = 'md',
    className = '',
    style = {},
}: CollapseProps) {
    const [isVisible, setIsVisible] = useState(appear ? isOpen : false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [internalOpen, setInternalOpen] = useState(isOpen);
    const contentRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const open = showToggle ? internalOpen : isOpen;

    useEffect(() => {
        if (open) {
            setIsVisible(true);
            setIsAnimating(true);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => setIsAnimating(false), timeout);
        } else {
            setIsAnimating(true);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                setIsVisible(false);
                setIsAnimating(false);
            }, timeout);
        }
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [open, timeout]);

    const colorClasses: Record<TextColor, string> = {
        primary: 'text-primary border-primary hover:bg-primary/5',
        secondary: 'text-secondary border-secondary hover:bg-secondary/5',
        muted: 'text-muted-foreground border-muted hover:bg-muted/5',
        destructive: 'text-destructive border-destructive hover:bg-destructive/5',
        success: 'text-success border-success hover:bg-success/5',
        warning: 'text-warning border-warning hover:bg-warning/5',
    };

    const toggleVariantClasses = {
        default: `bg-${color} text-${color}-foreground hover:bg-${color}/90`,
        outline: `border-2 border-${color} text-${color} hover:bg-${color}/10`,
        ghost: `text-${color} hover:bg-${color}/10`,
    };

    const toggleSizeClasses = {
        sm: 'px-3 py-1.5 text-sm gap-1.5',
        md: 'px-4 py-2 text-sm gap-2',
        lg: 'px-5 py-2.5 text-base gap-2.5',
    };

    const maxSize = dimension === 'height' ? 'max-h-[2000px]' : 'max-w-[2000px]';
    const sizeClass = open ? maxSize : 'max-h-0 max-w-0';

    const classes = clsx(
        'overflow-hidden transition-all duration-300 ease-in-out',
        sizeClass,
        isAnimating && 'transition-all',
        className
    );

    const toggleClasses = clsx(
        'inline-flex items-center justify-center font-medium transition-all duration-200',
        'rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50',
        toggleVariantClasses[toggleVariant],
        toggleSizeClasses[toggleSize],
        iconPosition === 'right' ? 'flex-row' : 'flex-row-reverse',
        colorClasses[color]
    );

    const handleToggle = () => {
        setInternalOpen(!internalOpen);
    };

    if (!isVisible && !isAnimating && !showToggle) return null;

    return (
        <div className="w-full">
            {showToggle && (
                <button
                    onClick={handleToggle}
                    className={toggleClasses}
                    aria-expanded={open}
                    type="button"
                >
                    {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    <span>{toggleText}</span>
                </button>
            )}
            <div
                ref={contentRef}
                className={classes}
                style={{
                    ...style,
                    transitionDuration: `${timeout}ms`,
                }}
            >
                {children}
            </div>
        </div>
    );
}

export default Collapse;