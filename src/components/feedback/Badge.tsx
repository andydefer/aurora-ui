// src/components/feedback/Badge.tsx
import { ReactNode } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';

export type BadgeVariant =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'destructive'
    | 'info'
    | 'outline'
    | 'ghost';

export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

export interface BadgeProps extends LayoutBaseProps {
    children: ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
    rounded?: boolean;
    pill?: boolean;
    subtle?: boolean;
    removable?: boolean;
    onRemove?: () => void;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
    animate?: boolean;
    dot?: boolean; // ✅ AJOUT DE LA PROP dot
    dotColor?: string; // ✅ Couleur du point (optionnel)
}

export function Badge({
    children,
    variant = 'primary',
    size = 'md',
    rounded = false,
    pill = false,
    subtle = false,
    removable = false,
    onRemove,
    icon,
    iconPosition = 'left',
    animate = false,
    dot = false, // ✅ AJOUT
    dotColor, // ✅ AJOUT
    className = '',
    style = {},
}: BadgeProps) {
    // Classes de couleurs
    const variantClasses: Record<BadgeVariant, string> = {
        primary: subtle
            ? 'bg-primary/10 text-primary border border-primary/20'
            : 'bg-primary text-white shadow-sm shadow-primary/20',
        secondary: subtle
            ? 'bg-secondary/10 text-secondary border border-secondary/20'
            : 'bg-secondary text-white shadow-sm shadow-secondary/20',
        success: subtle
            ? 'bg-success/10 text-success border border-success/20'
            : 'bg-success text-white shadow-sm shadow-success/20',
        warning: subtle
            ? 'bg-warning/10 text-warning border border-warning/20'
            : 'bg-warning text-white shadow-sm shadow-warning/20',
        destructive: subtle
            ? 'bg-destructive/10 text-destructive border border-destructive/20'
            : 'bg-destructive text-white shadow-sm shadow-destructive/20',
        info: subtle
            ? 'bg-muted/10 text-muted-foreground border border-border'
            : 'bg-muted text-muted-foreground',
        outline: 'bg-transparent text-foreground border-2 border-border hover:bg-muted/5 transition-colors',
        ghost: 'bg-transparent text-foreground hover:bg-muted/10 transition-colors',
    };

    // Tailles
    const sizeClasses: Record<BadgeSize, string> = {
        xs: 'text-[10px] px-2 py-0.5 h-5',
        sm: 'text-xs px-2.5 py-0.5 h-6',
        md: 'text-sm px-3 py-1 h-7',
        lg: 'text-base px-4 py-1.5 h-9',
    };

    // Couleur du point (par défaut : couleur du badge)
    const dotColorClass = dotColor || 'bg-current';

    // Classe UNIQUE qui contient TOUS les styles
    const badgeClasses = clsx(
        // Layout de base
        'inline-flex items-center justify-center gap-1.5',
        'font-medium whitespace-nowrap select-none',
        'transition-all duration-200',

        // Border radius
        rounded || pill ? 'rounded-full' : 'rounded-lg',

        // Taille
        sizeClasses[size],

        // Variante
        variantClasses[variant],

        // Animations
        animate && 'hover:scale-105 hover:shadow-lg',
        animate && 'animate-in fade-in slide-in-from-top-1 duration-200',

        // Classes personnalisées
        className
    );

    const renderRemoveButton = () => (
        <button
            onClick={(e) => {
                e.stopPropagation();
                onRemove?.();
            }}
            className={clsx(
                'h-8 w-8 inline-block ml-0.5 rounded-full transition-all duration-200',
                'hover:scale-110 hover:bg-black/10 active:scale-90',
                'flex items-center justify-center',
                size === 'xs' && 'w-3.5 h-3.5 text-[8px]',
                size === 'sm' && 'w-4 h-4 text-[10px]',
                size === 'md' && 'w-4.5 h-4.5 text-xs',
                size === 'lg' && 'w-5.5 h-5.5 text-sm'
            )}
            aria-label="Supprimer"
        >
            <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    );

    const renderIcon = () => {
        if (!icon) return null;
        const iconSize = size === 'xs' ? 'w-2.5 h-2.5'
            : size === 'sm' ? 'w-3 h-3'
                : size === 'md' ? 'w-3.5 h-3.5'
                    : 'w-4 h-4';

        return <span className={clsx('shrink-0', iconSize)}>{icon}</span>;
    };

    // ✅ Rendu du point si dot est true
    const renderDot = () => {
        if (!dot) return null;
        const dotSize = size === 'xs' ? 'w-1.5 h-1.5'
            : size === 'sm' ? 'w-2 h-2'
                : size === 'md' ? 'w-2.5 h-2.5'
                    : 'w-3 h-3';

        return (
            <span className={clsx(
                'shrink-0 rounded-full',
                dotSize,
                dotColorClass
            )} />
        );
    };

    return (
        <span className={badgeClasses} style={style}>
            {icon && iconPosition === 'left' && renderIcon()}
            {dot && renderDot()} {/* ✅ Afficher le point avant le texte */}
            {children}
            {icon && iconPosition === 'right' && renderIcon()}
            {removable && onRemove && renderRemoveButton()}
        </span>
    );
}

export default Badge;