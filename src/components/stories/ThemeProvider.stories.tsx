// src/components/stories/ThemeProvider.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemeProvider, useTheme } from '../ThemeProvider';
import { Card } from '../overlay/Card';
import { Text } from '../typography/Text';
import { Button } from '../forms/Button';
import { Switch } from '../forms/Switch';
import { Input } from '../forms/Input';
import { Badge } from '../feedback/Badge';
import { Moon, Sun } from 'lucide-react';

const meta: Meta<typeof ThemeProvider> = {
    title: 'Theme/ThemeProvider',
    component: ThemeProvider,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un fournisseur de thème pour gérer les modes clair/sombre et la personnalisation des couleurs.',
            },
        },
    },
    argTypes: {
        enableDarkMode: {
            control: 'boolean',
            description: 'Activer le mode sombre',
        },
        showToggle: {
            control: 'boolean',
            description: 'Afficher le bouton de bascule',
        },
        togglePosition: {
            control: 'select',
            options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
            description: 'Position du bouton de bascule',
        },
        toggleVariant: {
            control: 'select',
            options: ['default', 'minimal', 'glass', 'compact'],
            description: 'Style du bouton de bascule',
        },
        showLabel: {
            control: 'boolean',
            description: 'Afficher le label',
        },
        autoDetect: {
            control: 'boolean',
            description: 'Détecter automatiquement les préférences système',
        },
        initialTheme: {
            control: 'object',
            description: 'Thème initial',
        },
    },
};

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

// ============ COMPOSANT DE DÉMONSTRATION ============

const ThemeDemoContent = () => {
    const { isDark, toggleDarkMode } = useTheme();
    const [switchValue, setSwitchValue] = useState(false);

    return (
        <Card variant="default" radius="lg" shadow="md" className="p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
                <Text variant="h5" className="font-bold">Démo du thème</Text>
                <Badge variant={isDark ? 'primary' : 'muted'} size="sm">
                    {isDark ? '🌙 Sombre' : '☀️ Clair'}
                </Badge>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/10 border border-border">
                    <div className="flex items-center gap-3">
                        {isDark ? (
                            <Moon size={20} className="text-primary" />
                        ) : (
                            <Sun size={20} className="text-warning" />
                        )}
                        <div>
                            <Text variant="small" className="font-medium">Mode actuel</Text>
                            <Text variant="caption" color="muted">
                                {isDark ? 'Mode sombre activé' : 'Mode clair activé'}
                            </Text>
                        </div>
                    </div>
                    <Button
                        variant={isDark ? 'primary' : 'outline'}
                        size="sm"
                        onClick={toggleDarkMode}
                    >
                        {isDark ? '☀️' : '🌙'}
                    </Button>
                </div>

                <div className="space-y-3">
                    <Input label="Nom complet" placeholder="Jean Dupont" size="lg" />
                    <Input label="Email" type="email" placeholder="jean@email.com" size="lg" />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/10 border border-border">
                    <Switch
                        label="Notifications"
                        checked={switchValue}
                        onChange={(e) => setSwitchValue(e.target.checked)}
                        size="lg"
                    />
                </div>

                <div className="flex gap-2">
                    <Button variant="primary" size="lg" className="flex-1">
                        Enregistrer
                    </Button>
                    <Button variant="outline" size="lg" className="flex-1">
                        Annuler
                    </Button>
                </div>
            </div>
        </Card>
    );
};

const ThemeDemo = (args: any) => (
    <ThemeProvider {...args}>
        <ThemeDemoContent />
    </ThemeProvider>
);

// ============ STORIES ============

export const Default: Story = {
    render: (args) => <ThemeDemo {...args} />,
    args: {
        enableDarkMode: true,
        showToggle: true,
        togglePosition: 'top-right',
        toggleVariant: 'default',
        showLabel: true,
        autoDetect: false,
    },
};

export const WithToggle: Story = {
    render: (args) => <ThemeDemo {...args} />,
    args: {
        enableDarkMode: true,
        showToggle: true,
        togglePosition: 'top-right',
        toggleVariant: 'default',
        showLabel: true,
        autoDetect: false,
    },
};

export const MinimalToggle: Story = {
    render: (args) => <ThemeDemo {...args} />,
    args: {
        enableDarkMode: true,
        showToggle: true,
        togglePosition: 'top-right',
        toggleVariant: 'minimal',
        showLabel: false,
        autoDetect: false,
    },
};

export const GlassToggle: Story = {
    render: (args) => <ThemeDemo {...args} />,
    args: {
        enableDarkMode: true,
        showToggle: true,
        togglePosition: 'top-right',
        toggleVariant: 'glass',
        showLabel: true,
        autoDetect: false,
    },
};

export const CompactToggle: Story = {
    render: (args) => <ThemeDemo {...args} />,
    args: {
        enableDarkMode: true,
        showToggle: true,
        togglePosition: 'top-right',
        toggleVariant: 'compact',
        showLabel: false,
        autoDetect: false,
    },
};

export const WithoutToggle: Story = {
    render: (args) => <ThemeDemo {...args} />,
    args: {
        enableDarkMode: true,
        showToggle: false,
        autoDetect: false,
    },
};

// ============ POSITIONS ============

export const AllPositions: Story = {
    render: () => {
        const positions: Array<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'> = [
            'top-right', 'top-left', 'bottom-right', 'bottom-left'
        ];

        return (
            <div className="grid grid-cols-2 gap-6 max-w-2xl w-full">
                {positions.map((position) => (
                    <div key={position} className="relative min-h-[200px] bg-muted/10 rounded-lg border border-border/50 p-4">
                        <Text variant="small" className="font-medium mb-2 capitalize">{position}</Text>
                        <ThemeProvider
                            enableDarkMode
                            showToggle
                            togglePosition={position}
                            toggleVariant="default"
                            showLabel
                        >
                            <div className="h-full min-h-[100px] flex items-center justify-center">
                                <Text variant="caption" color="muted">Le toggle est en {position}</Text>
                            </div>
                        </ThemeProvider>
                    </div>
                ))}
            </div>
        );
    },
};

// ============ AVEC CONTENU ============

export const WithContent: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <ThemeProvider
                enableDarkMode
                showToggle
                togglePosition="top-right"
                toggleVariant="glass"
                showLabel
            >
                <div className="space-y-6">
                    <Card variant="default" radius="lg" shadow="md" className="p-6">
                        <Text variant="h5" className="font-bold">Page d'exemple</Text>
                        <Text color="muted" className="mt-1">
                            Cette page démontre l'intégration du ThemeProvider avec du contenu réel.
                        </Text>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                                <Text variant="h6" className="font-bold text-primary">12</Text>
                                <Text variant="small" color="muted">Projets</Text>
                            </div>
                            <div className="p-4 bg-success/5 rounded-lg border border-success/10">
                                <Text variant="h6" className="font-bold text-success">48</Text>
                                <Text variant="small" color="muted">Tâches</Text>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                            <Button variant="primary">Action principale</Button>
                            <Button variant="outline">Action secondaire</Button>
                        </div>
                    </Card>
                </div>
            </ThemeProvider>
        </div>
    ),
};

// ============ COMPARAISON ============

export const InteractivePlayground: Story = {
    render: (args) => <ThemeDemo {...args} />,
    args: {
        enableDarkMode: true,
        showToggle: true,
        togglePosition: 'top-right',
        toggleVariant: 'default',
        showLabel: true,
        autoDetect: false,
    },
};