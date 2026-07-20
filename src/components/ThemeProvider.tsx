import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, defaultTheme, darkTheme, applyTheme } from '../styles/themes';

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
}

export function ThemeProvider({
    children,
    initialTheme = defaultTheme,
    enableDarkMode = true,
}: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>(initialTheme);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

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

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleDarkMode, isDark }}>
            {children}
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