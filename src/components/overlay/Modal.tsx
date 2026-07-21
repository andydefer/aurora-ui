// src/components/overlay/Modal.tsx
import { ReactNode, useEffect, useRef } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Size } from '../../types';
import { X } from 'lucide-react';
import { Card } from './Card';

export interface ModalProps extends LayoutBaseProps {
    open?: boolean;
    onClose?: () => void;
    title?: ReactNode;
    children: ReactNode;
    size?: Size;
    closeOnBackdrop?: boolean;
    scrollable?: boolean;
    showCloseButton?: boolean;
    footer?: ReactNode;
}

export function Modal({
    open = false,
    onClose,
    title,
    children,
    size = 'md',
    closeOnBackdrop = true,
    scrollable = false,
    showCloseButton = true,
    footer,
    className = '',
    style = {},
}: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && open) {
                onClose?.();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [open, onClose]);

    const sizeClasses: Record<Size, string> = {
        xs: 'max-w-xs',
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        full: 'max-w-full',
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget && closeOnBackdrop) {
            onClose?.();
        }
    };

    if (!open) return null;

    return (
        <div
            className={clsx(
                'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300',
                className
            )}
            style={style}
            onClick={handleBackdropClick}
        >
            <div
                ref={modalRef}
                className={clsx(
                    'w-full max-h-[90vh]',
                    sizeClasses[size],
                    'animate-in fade-in zoom-in duration-200'
                )}
            >
                <Card
                    padding={0}
                    shadow="xl"
                    radius="lg"
                    border={false}
                    className="overflow-hidden"
                >
                    {/* Header */}
                    {(title || showCloseButton) && (
                        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                            {title && (
                                <h2 className="text-xl font-semibold text-foreground">
                                    {title}
                                </h2>
                            )}
                            {showCloseButton && onClose && (
                                <button
                                    onClick={onClose}
                                    className="p-1 rounded-lg hover:bg-muted/20 transition-colors text-muted-foreground hover:text-foreground"
                                    aria-label="Fermer"
                                >
                                    <X size={20} />
                                </button>
                            )}
                        </div>
                    )}

                    {/* Body */}
                    <div className={clsx(
                        'p-6',
                        scrollable && 'max-h-[60vh] overflow-y-auto'
                    )}>
                        {children}
                    </div>

                    {/* Footer */}
                    {footer && (
                        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-muted/5">
                            {footer}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}

export default Modal;