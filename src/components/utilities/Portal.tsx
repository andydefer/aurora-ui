import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';

export interface PortalProps extends LayoutBaseProps {
    children: ReactNode;
    container?: HTMLElement | null;
    disabled?: boolean;
}

export function Portal({
    children,
    container,
    disabled = false,
    className = '',
    style = {},
}: PortalProps) {
    const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (!disabled) {
            const target = container || document.body;
            setMountNode(target);
        }
    }, [container, disabled]);

    if (disabled) {
        return <>{children}</>;
    }

    if (!mountNode) {
        return null;
    }

    return createPortal(
        <div className={clsx(className)} style={style}>
            {children}
        </div>,
        mountNode
    );
}

export default Portal;