export interface Theme {
    colors: {
        background: string;
        foreground: string;
        primary: string;
        primaryForeground: string;
        secondary: string;
        secondaryForeground: string;
        muted: string;
        mutedForeground: string;
        accent: string;
        accentForeground: string;
        destructive: string;
        destructiveForeground: string;
        success: string;
        successForeground: string;
        warning: string;
        warningForeground: string;
        border: string;
        input: string;
        ring: string;
        card: string;
        cardForeground: string;
        popover: string;
        popoverForeground: string;
    };
    radius: {
        sm: string;
        DEFAULT: string;
        lg: string;
        xl: string;
    };
    fonts: {
        sans: string;
        serif: string;
        mono: string;
    };
}

export const defaultTheme: Theme = {
    colors: {
        background: '0 0% 100%',
        foreground: '220 30% 12%',
        primary: '210 95% 45%',
        primaryForeground: '0 0% 100%',
        secondary: '215 90% 50%',
        secondaryForeground: '0 0% 100%',
        muted: '210 25% 96%',
        mutedForeground: '220 20% 40%',
        accent: '205 85% 50%',
        accentForeground: '0 0% 100%',
        destructive: '5 85% 52%',
        destructiveForeground: '0 0% 100%',
        success: '160 65% 45%',
        successForeground: '0 0% 100%',
        warning: '40 95% 55%',
        warningForeground: '0 0% 100%',
        border: '210 25% 80%',
        input: '210 25% 96%',
        ring: '210 95% 45%',
        card: '0 0% 100%',
        cardForeground: '220 30% 12%',
        popover: '0 0% 100%',
        popoverForeground: '220 30% 12%',
    },
    radius: {
        sm: '0.375rem',
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
    },
    fonts: {
        sans: 'Inter, system-ui, -apple-system, sans-serif',
        serif: 'Georgia, serif',
        mono: 'Courier New, monospace',
    },
};

export const darkTheme: Theme = {
    colors: {
        background: '258 20% 10%',
        foreground: '270 100% 98%',
        primary: '270 95% 70%',
        primaryForeground: '270 30% 15%',
        secondary: '270 30% 25%',
        secondaryForeground: '270 100% 98%',
        muted: '270 20% 20%',
        mutedForeground: '270 10% 70%',
        accent: '275 70% 70%',
        accentForeground: '270 100% 10%',
        destructive: '0 60% 45%',
        destructiveForeground: '0 0% 98%',
        success: '160 65% 45%',
        successForeground: '0 0% 100%',
        warning: '40 95% 55%',
        warningForeground: '0 0% 100%',
        border: '270 20% 30%',
        input: '270 20% 30%',
        ring: '270 95% 60%',
        card: '258 20% 12%',
        cardForeground: '270 100% 98%',
        popover: '258 20% 12%',
        popoverForeground: '270 100% 98%',
    },
    radius: {
        sm: '0.375rem',
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
    },
    fonts: {
        sans: 'Inter, system-ui, -apple-system, sans-serif',
        serif: 'Georgia, serif',
        mono: 'Courier New, monospace',
    },
};

export function applyTheme(theme: Theme): void {
    const root = document.documentElement;
    const { colors, radius, fonts } = theme;

    Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
    });

    Object.entries(radius).forEach(([key, value]) => {
        if (key === 'DEFAULT') {
            root.style.setProperty('--radius', value);
        } else {
            root.style.setProperty(`--radius-${key}`, value);
        }
    });

    Object.entries(fonts).forEach(([key, value]) => {
        root.style.setProperty(`--font-${key}`, value);
    });
}