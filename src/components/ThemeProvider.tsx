// src/components/ThemeProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, defaultTheme, darkTheme, applyTheme } from '../styles/themes';
import { Moon, Sun, } from 'lucide-react';
import { clsx } from '../utils/clsx';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleDarkMode: () => void;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface ThemeProviderProps {
    children: React.ReactNode;
    initialTheme?: Theme;
    enableDarkMode?: boolean;
    showToggle?: boolean;
    togglePosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    toggleVariant?: 'default' | 'minimal' | 'glass' | 'compact';
    showLabel?: boolean;
    autoDetect?: boolean;
    onThemeChange?: (isDark: boolean) => void;
}

export function ThemeProvider({
    children,
    initialTheme = defaultTheme,
    enableDarkMode = true,
    showToggle = false,
    togglePosition = 'top-right',
    toggleVariant = 'default',
    autoDetect = false,
    onThemeChange,
}: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>(initialTheme);
    const [isDark, setIsDark] = useState(false);
    const [isDocs, setIsDocs] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-detect system preference
    useEffect(() => {
        if (autoDetect && enableDarkMode) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDark(prefersDark);
            setThemeState(prefersDark ? darkTheme : defaultTheme);
            onThemeChange?.(prefersDark);
        }
    }, [autoDetect, enableDarkMode]);

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    useEffect(() => {
        const checkDocs = () => {
            const isDocsStory = document.querySelector('.docs-story');
            setIsDocs(!!isDocsStory);
        };

        checkDocs();

        const observer = new MutationObserver(() => {
            checkDocs();
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => observer.disconnect();
    }, []);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        if (enableDarkMode) {
            setIsDark(false);
        }
    };

    const toggleDarkMode = () => {
        if (!enableDarkMode) return;
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        setThemeState(newIsDark ? darkTheme : defaultTheme);
        onThemeChange?.(newIsDark);
    };

    const positionClasses = {
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4',
    };

    const variantClasses = {
        default: 'bg-card border border-border shadow-lg px-4 py-3 gap-3',
        minimal: 'bg-transparent border-0 shadow-none px-2 py-2 gap-2',
        glass: 'bg-card/80 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-xl px-5 py-3.5 gap-3',
        compact: 'bg-card border border-border shadow-md px-3 py-2 gap-2',
    };

    const shouldShowToggle = showToggle && enableDarkMode && !isDocs;

    const getButtonStyles = () => {
        if (isDark) {
            return {
                background: 'hsl(var(--primary))',
                boxShadow: '0 0 20px hsl(var(--primary)/0.3)',
            };
        }
        return {
            background: '#9ca3af',
        };
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleDarkMode();
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleDarkMode, isDark }}>
            <div className="relative">
                {shouldShowToggle && (
                    <div
                        className={clsx(
                            'fixed z-50 flex items-center transition-all duration-300 rounded-xl',
                            positionClasses[togglePosition],
                            variantClasses[toggleVariant],
                            isHovered && 'scale-105 shadow-xl',
                            toggleVariant === 'glass' && 'backdrop-blur-md'
                        )}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* Icône */}
                        <div className={clsx(
                            'flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300',
                            isDark ? 'bg-primary/10 text-primary' : 'bg-muted/20 text-muted-foreground'
                        )}>
                            {isDark ? (
                                <Moon size={24} className="text-primary" />
                            ) : (
                                <Sun size={24} className="text-warning bg-primary/5 p-1" />
                            )}
                        </div>

                        {/* Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            onKeyDown={handleKeyDown}
                            className={clsx(
                                'relative w-10 h-5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50',
                                'hover:scale-105 active:scale-95'
                            )}
                            style={getButtonStyles()}
                            aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
                            role="switch"
                            aria-checked={isDark}
                        >
                            <span
                                className={clsx(
                                    'absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300',
                                    isDark && 'translate-x-[20px]',
                                    isDark ? 'bg-white' : 'bg-white'
                                )}
                            />
                        </button>

                        {/* Badge auto-detect */}
                        {autoDetect && (
                            <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-primary/10 text-primary/70">
                                Auto
                            </span>
                        )}
                    </div>
                )}
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}