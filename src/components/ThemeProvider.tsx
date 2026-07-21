import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, defaultTheme, darkTheme, applyTheme } from '../styles/themes';
import { Moon, Sun } from 'lucide-react';

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
}

export function ThemeProvider({
    children,
    initialTheme = defaultTheme,
    enableDarkMode = true,
    showToggle = false,
    togglePosition = 'top-right',
}: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>(initialTheme);
    const [isDark, setIsDark] = useState(false);
    const [isDocs, setIsDocs] = useState(false);

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
        setIsDark(!isDark);
        setThemeState(isDark ? defaultTheme : darkTheme);
    };

    const positionClasses = {
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4',
    };

    const shouldShowToggle = showToggle && enableDarkMode && !isDocs;

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleDarkMode, isDark }}>
            <div className="relative">
                {shouldShowToggle && (
                    <div
                        className={`fixed ${positionClasses[togglePosition]} z-50 flex items-center gap-3 px-3 py-2 rounded-md shadow-md border border-border bg-card`}
                    >
                        {isDark ? (
                            <Moon size={16} className="text-foreground" />
                        ) : (
                            <Sun size={16} className="text-foreground" />
                        )}

                        <button
                            onClick={toggleDarkMode}
                            className="relative w-10 h-5 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
                            style={{
                                background: isDark ? 'hsl(var(--primary))' : '#9ca3af',
                            }}
                            aria-label="Toggle theme"
                        >
                            <span
                                className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300"
                                style={{
                                    transform: isDark ? 'translateX(20px)' : 'translateX(0)',
                                }}
                            />
                        </button>
                        <span className="text-xs text-muted-foreground">
                            {isDark ? 'Dark' : 'Light'}
                        </span>
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