// src/components/forms/stories/Switch.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../Switch';
import { useState } from 'react';
import { Text } from '../../typography/Text';
import { Badge } from '../../feedback/Badge';
import { Card } from '../../overlay/Card';
import { Button } from '../Button';
import { Bell, Moon, Wifi, Bluetooth, Zap, Shield, } from 'lucide-react';

const meta: Meta<typeof Switch> = {
    title: 'Forms/Switch',
    component: Switch,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un interrupteur toggle avec label, description et icônes.',
            },
        },
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'],
            description: 'Taille du switch',
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'destructive', 'success', 'warning'],
            description: 'Couleur d\'accentuation',
        },
        label: { control: 'text' },
        description: { control: 'text' },
        labelPosition: {
            control: 'select',
            options: ['left', 'right'],
            description: 'Position du label',
        },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
        checked: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Switch>;

// ============ COMPOSANT AVEC ÉTAT ============

const SwitchWithState = (args: any) => {
    const [checked, setChecked] = useState(args.checked || false);
    return (
        <div className="w-full max-w-md">
            <Card variant="default" radius="lg" shadow="sm" className="p-6">
                <Switch
                    {...args}
                    checked={checked}
                    onChange={(e) => {
                        setChecked(e.target.checked);
                        args.onChange?.(e);
                    }}
                />
                <div className="mt-4 flex items-center gap-3 text-sm p-3 bg-muted/10 rounded-lg border border-border/50">
                    <Badge variant={checked ? 'success' : 'muted'} size="sm">
                        {checked ? 'Activé' : 'Désactivé'}
                    </Badge>
                    <span className="text-muted-foreground">État actuel :</span>
                    <span className="font-semibold text-foreground">{checked ? 'ON' : 'OFF'}</span>
                    <span className="ml-auto text-2xl">{checked ? '🟢' : '🔴'}</span>
                </div>
            </Card>
        </div>
    );
};

// ============ STORIES ============

export const Default: Story = {
    render: (args) => <SwitchWithState {...args} />,
    args: {
        label: 'Activer les notifications',
        description: 'Recevez des notifications pour les mises à jour importantes',
        size: 'lg',
        color: 'primary',
        labelPosition: 'right',
    },
};

export const Checked: Story = {
    render: (args) => <SwitchWithState {...args} />,
    args: {
        label: 'Mode sombre',
        description: 'Activer le thème sombre pour une meilleure visibilité nocturne',
        checked: true,
        size: 'lg',
        color: 'primary',
    },
};

export const WithLeftLabel: Story = {
    render: (args) => <SwitchWithState {...args} />,
    args: {
        label: 'Wi-Fi',
        description: 'Activer la connexion Wi-Fi pour accéder à internet',
        labelPosition: 'left',
        size: 'lg',
        color: 'primary',
    },
};

export const Disabled: Story = {
    render: (args) => <SwitchWithState {...args} />,
    args: {
        label: 'Option désactivée',
        description: 'Cette fonctionnalité n\'est pas disponible dans votre plan',
        disabled: true,
        size: 'lg',
        color: 'primary',
    },
};

export const DisabledChecked: Story = {
    render: (args) => <SwitchWithState {...args} />,
    args: {
        label: 'Option verrouillée',
        description: 'Cette option est activée mais ne peut pas être modifiée',
        disabled: true,
        checked: true,
        size: 'lg',
        color: 'primary',
    },
};

export const Required: Story = {
    render: (args) => <SwitchWithState {...args} />,
    args: {
        label: 'J\'accepte les conditions d\'utilisation',
        description: 'Vous devez accepter pour continuer',
        required: true,
        size: 'lg',
        color: 'primary',
    },
};


// ============ PARAMÈTRES ============

export const SettingsExample: Story = {
    render: () => {
        const [notifications, setNotifications] = useState(true);
        const [sound, setSound] = useState(true);
        const [vibration, setVibration] = useState(false);
        const [email, setEmail] = useState(true);

        return (
            <div className="w-full max-w-md">
                <Card variant="elevated" radius="lg" shadow="md" className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <Bell size={20} />
                        </div>
                        <Text variant="h5" className="font-bold">Notifications</Text>
                    </div>
                    <div className="space-y-4">
                        <Switch
                            label="Notifications push"
                            description="Recevoir les notifications sur votre appareil"
                            checked={notifications}
                            onChange={(e) => setNotifications(e.target.checked)}
                            size="lg"
                        />
                        <Switch
                            label="Son"
                            description="Jouer un son pour les notifications"
                            checked={sound}
                            onChange={(e) => setSound(e.target.checked)}
                            size="lg"
                            color="secondary"
                            disabled={!notifications}
                        />
                        <Switch
                            label="Vibration"
                            description="Vibrer pour les notifications"
                            checked={vibration}
                            onChange={(e) => setVibration(e.target.checked)}
                            size="lg"
                            color="secondary"
                            disabled={!notifications}
                        />
                        <Switch
                            label="Email"
                            description="Recevoir les notifications par email"
                            checked={email}
                            onChange={(e) => setEmail(e.target.checked)}
                            size="lg"
                            color="primary"
                        />
                    </div>
                    <div className="mt-6 pt-4 border-t border-border flex justify-end">
                        <Button variant="primary" size="md">Appliquer</Button>
                    </div>
                </Card>
            </div>
        );
    },
};

// ============ PRÉFÉRENCES ============

export const PreferencesExample: Story = {
    render: () => {
        const [dark, setDark] = useState(false);
        const [autoSave, setAutoSave] = useState(true);
        const [analytics, setAnalytics] = useState(false);

        return (
            <div className="w-full max-w-md">
                <Card variant="elevated" radius="lg" shadow="md" className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-success/10 text-success">
                            <Shield size={20} />
                        </div>
                        <Text variant="h5" className="font-bold">Préférences</Text>
                    </div>
                    <div className="space-y-4">
                        <Switch
                            label="Mode sombre"
                            description="Utiliser le thème sombre pour une meilleure expérience"
                            checked={dark}
                            onChange={(e) => setDark(e.target.checked)}
                            size="lg"
                            color="primary"
                        />
                        <Switch
                            label="Sauvegarde automatique"
                            description="Sauvegarder automatiquement votre travail toutes les 5 minutes"
                            checked={autoSave}
                            onChange={(e) => setAutoSave(e.target.checked)}
                            size="lg"
                            color="success"
                        />
                        <Switch
                            label="Analytics"
                            description="Partager des données anonymes pour améliorer l'application"
                            checked={analytics}
                            onChange={(e) => setAnalytics(e.target.checked)}
                            size="lg"
                            color="warning"
                        />
                    </div>
                </Card>
            </div>
        );
    },
};

// ============ AVEC ICÔNES ============
export const WithIcons: Story = {
    render: () => {
        const [darkMode, setDarkMode] = useState(false);
        const [wifi, setWifi] = useState(true);
        const [bluetooth, setBluetooth] = useState(false);
        const [zap, setZap] = useState(true);

        return (
            <div className="w-full max-w-md">
                <Card variant="default" radius="lg" shadow="md" className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <Zap size={20} />
                        </div>
                        <Text variant="h5" className="font-bold">Paramètres rapides</Text>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/10 border border-border hover:bg-muted/20 transition-colors">
                            <Moon size={18} className="text-muted-foreground" />
                            <Switch
                                label="Mode sombre"
                                checked={darkMode}
                                onChange={(e) => setDarkMode(e.target.checked)}
                                size="lg"
                                color="primary"
                                labelPosition="right"
                            />
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/10 border border-border hover:bg-muted/20 transition-colors">
                            <Wifi size={18} className="text-muted-foreground" />
                            <Switch
                                label="Wi-Fi"
                                checked={wifi}
                                onChange={(e) => setWifi(e.target.checked)}
                                size="lg"
                                color="success"
                                labelPosition="right"
                            />
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/10 border border-border hover:bg-muted/20 transition-colors">
                            <Bluetooth size={18} className="text-muted-foreground" />
                            <Switch
                                label="Bluetooth"
                                checked={bluetooth}
                                onChange={(e) => setBluetooth(e.target.checked)}
                                size="lg"
                                color="primary"
                                labelPosition="right"
                            />
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/10 border border-border hover:bg-muted/20 transition-colors">
                            <Zap size={18} className="text-muted-foreground" />
                            <Switch
                                label="Mode performance"
                                checked={zap}
                                onChange={(e) => setZap(e.target.checked)}
                                size="lg"
                                color="warning"
                                labelPosition="right"
                            />
                        </div>
                    </div>
                </Card>
            </div>
        );
    },
};

export const InteractivePlayground: Story = {
    render: (args) => <SwitchWithState {...args} />,
    args: {
        label: 'Switch interactif',
        description: 'Testez les options dans le panneau de contrôle',
        size: 'lg',
        color: 'primary',
        labelPosition: 'right',
        checked: false,
        disabled: false,
        required: false,
    },
};