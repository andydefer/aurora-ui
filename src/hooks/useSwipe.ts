// src/hooks/useSwipe.ts
import { useState, useCallback } from 'react';

interface SwipeOptions {
    threshold?: number;
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    onSwipeUp?: () => void;
    onSwipeDown?: () => void;
}

export function useSwipe({
    threshold = 50,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown
}: SwipeOptions = {}) {
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchStartY, setTouchStartY] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);
    const [touchEndY, setTouchEndY] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);

    const handleTouchStart = useCallback((e: React.TouchEvent | TouchEvent) => {
        const touch = 'touches' in e ? (e as TouchEvent).touches[0] : (e as TouchEvent).changedTouches[0];
        if (touch) {
            setTouchStartX(touch.clientX);
            setTouchStartY(touch.clientY);
            setTouchEndX(touch.clientX);
            setTouchEndY(touch.clientY);
            setIsSwiping(false);
        }
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent | TouchEvent) => {
        const touch = 'touches' in e ? (e as TouchEvent).touches[0] : (e as TouchEvent).changedTouches[0];
        if (touch) {
            setTouchEndX(touch.clientX);
            setTouchEndY(touch.clientY);
            setIsSwiping(true);
        }
    }, []);

    const handleTouchEnd = useCallback(() => {
        if (!isSwiping) return;

        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Swipe horizontal
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    onSwipeLeft?.();
                } else {
                    onSwipeRight?.();
                }
            }
        } else {
            // Swipe vertical
            if (Math.abs(diffY) > threshold) {
                if (diffY > 0) {
                    onSwipeUp?.();
                } else {
                    onSwipeDown?.();
                }
            }
        }

        setIsSwiping(false);
    }, [touchStartX, touchEndX, touchStartY, touchEndY, isSwiping, threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]);

    return {
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        isSwiping,
        touchStartX,
        touchEndX,
    };
}