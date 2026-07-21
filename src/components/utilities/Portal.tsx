// src/components/utilities/Portal.tsx
import { ReactNode, useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';

export interface PortalProps extends LayoutBaseProps {
    children: ReactNode;
    container?: HTMLElement | string | null;
    disabled?: boolean;
    className?: string;
    zIndex?: number;
    style?: React.CSSProperties;
}

export function Portal({
    children,
    container,
    disabled = false,
    className = '',
    style = {},
    zIndex,
}: PortalProps) {
    const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

    const getContainer = useCallback(() => {
        if (!container) return document.body;
        if (typeof container === 'string') {
            const el = document.querySelector(container) as HTMLElement;
            return el || document.body;
        }
        return container;
    }, [container]);

    useEffect(() => {
        if (!disabled) {
            const target = getContainer();
            setMountNode(target);

            // Ajouter un style pour le conteneur si zIndex est spécifié
            if (zIndex && target) {
                const originalPosition = target.style.position;
                const originalZIndex = target.style.zIndex;
                target.style.position = 'relative';
                target.style.zIndex = String(zIndex);
                return () => {
                    target.style.position = originalPosition;
                    target.style.zIndex = originalZIndex;
                };
            }
        }
    }, [disabled, getContainer, zIndex]);

    if (disabled) {
        return <>{children}</>;
    }

    if (!mountNode) {
        return null;
    }

    return createPortal(
        <div
            className={clsx('portal-container', className)}
            style={{
                position: 'relative',
                ...style
            }}
        >
            {children}
        </div>,
        mountNode
    );
}

export default Portal;