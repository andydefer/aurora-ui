// src/components/overlay/stories/Tabs.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '../Tabs';
import { Text } from '../../typography/Text';
import { Home, User, Settings, Bell } from 'lucide-react';
import { Badge } from '../../feedback/Badge';

const meta: Meta<typeof Tabs> = {
    title: 'Overlay/Tabs',
    component: Tabs,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un système d\'onglets pour organiser le contenu.',
            },
        },
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'pills', 'underline', 'contained', 'minimal'],
            description: 'Style visuel des onglets',
        },
        orientation: {
            control: 'select',
            options: ['horizontal', 'vertical'],
            description: 'Orientation des onglets',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Taille des onglets',
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'danger', 'success', 'warning'],
            description: 'Couleur d\'accentuation',
        },
        fullWidth: {
            control: 'boolean',
            description: 'Onglets en pleine largeur',
        },
        withContent: {
            control: 'boolean',
            description: 'Afficher le contenu lié aux onglets',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// ============ DONNÉES AVEC CONTENU ============

const itemsWithContent = [
    {
        id: 'home',
        label: 'Accueil',
        icon: <Home size={16} />,
        content: (
            <div className="space-y-3">
                <Text variant="h5" className="font-bold">Page d'accueil</Text>
                <Text>Bienvenue sur votre tableau de bord. Voici un résumé de vos activités récentes.</Text>
                <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-primary/5 rounded-lg border border-primary/10 text-center">
                        <Text variant="h4" className="font-bold text-primary">12</Text>
                        <Text variant="small" color="muted">Projets</Text>
                    </div>
                    <div className="p-3 bg-success/5 rounded-lg border border-success/10 text-center">
                        <Text variant="h4" className="font-bold text-success">48</Text>
                        <Text variant="small" color="muted">Tâches</Text>
                    </div>
                    <div className="p-3 bg-warning/5 rounded-lg border border-warning/10 text-center">
                        <Text variant="h4" className="font-bold text-warning">6</Text>
                        <Text variant="small" color="muted">En attente</Text>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'profile',
        label: 'Profil',
        icon: <User size={16} />,
        content: (
            <div className="space-y-3">
                <Text variant="h5" className="font-bold">Mon profil</Text>
                <div className="p-4 bg-muted/10 rounded-lg border border-border">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                            JD
                        </div>
                        <div>
                            <Text className="font-semibold">Jean Dupont</Text>
                            <Text variant="small" color="muted">jean.dupont@email.com</Text>
                            <Text variant="small" color="muted">Membre depuis 2023</Text>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Badge variant="primary">Premium</Badge>
                    <Badge variant="success">Vérifié</Badge>
                </div>
            </div>
        )
    },
    {
        id: 'settings',
        label: 'Paramètres',
        icon: <Settings size={16} />,
        content: (
            <div className="space-y-3">
                <Text variant="h5" className="font-bold">Paramètres</Text>
                <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-muted/10 rounded-lg border border-border">
                        <div>
                            <Text className="font-medium">Notifications</Text>
                            <Text variant="small" color="muted">Recevoir des notifications par email</Text>
                        </div>
                        <div className="w-10 h-6 rounded-full bg-primary cursor-pointer">
                            <div className="w-5 h-5 rounded-full bg-white shadow-sm translate-x-4 transition-transform" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/10 rounded-lg border border-border">
                        <div>
                            <Text className="font-medium">Mode sombre</Text>
                            <Text variant="small" color="muted">Activer le thème sombre</Text>
                        </div>
                        <div className="w-10 h-6 rounded-full bg-muted cursor-pointer">
                            <div className="w-5 h-5 rounded-full bg-white shadow-sm transition-transform" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/10 rounded-lg border border-border">
                        <div>
                            <Text className="font-medium">Langue</Text>
                            <Text variant="small" color="muted">Français</Text>
                        </div>
                        <Text color="muted">FR ▼</Text>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'notifications',
        label: 'Notifications',
        icon: <Bell size={16} />,
        badge: 3,
        content: (
            <div className="space-y-3">
                <Text variant="h5" className="font-bold">Notifications</Text>
                <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-muted/10 rounded-lg border border-border">
                        <Badge dot variant="success" />
                        <div className="flex-1">
                            <Text className="font-medium">Nouveau message</Text>
                            <Text variant="small" color="muted">Il y a 5 minutes</Text>
                        </div>
                        <Text variant="small" color="muted">Non lu</Text>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/10 rounded-lg border border-border">
                        <Badge dot variant="warning" />
                        <div className="flex-1">
                            <Text className="font-medium">Mise à jour disponible</Text>
                            <Text variant="small" color="muted">Il y a 2 heures</Text>
                        </div>
                        <Text variant="small" color="muted">Non lu</Text>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/5 rounded-lg border border-border/50">
                        <Badge dot variant="muted" />
                        <div className="flex-1">
                            <Text className="font-medium">Rapport généré</Text>
                            <Text variant="small" color="muted">Hier à 14:30</Text>
                        </div>
                        <Text variant="small" color="muted">Lu</Text>
                    </div>
                </div>
            </div>
        )
    },
];

// ============ VARIANTES AVEC CONTENU ============

export const Default: Story = {
    args: {
        items: itemsWithContent,
        variant: 'default',
        size: 'md',
        color: 'primary',
        orientation: 'horizontal',
        defaultActive: 'home',
        withContent: true,
        fullWidth: true,
    },
};

export const Pills: Story = {
    args: {
        items: itemsWithContent,
        variant: 'pills',
        size: 'md',
        color: 'primary',
        orientation: 'horizontal',
        defaultActive: 'home',
        withContent: true,
        fullWidth: true,
    },
};

export const Underline: Story = {
    args: {
        items: itemsWithContent,
        variant: 'underline',
        size: 'md',
        color: 'primary',
        orientation: 'horizontal',
        defaultActive: 'home',
        withContent: true,
        fullWidth: true,
    },
};

export const Contained: Story = {
    args: {
        items: itemsWithContent,
        variant: 'contained',
        size: 'md',
        color: 'primary',
        orientation: 'horizontal',
        defaultActive: 'home',
        withContent: true,
        fullWidth: true,
    },
};

export const Minimal: Story = {
    args: {
        items: itemsWithContent,
        variant: 'minimal',
        size: 'md',
        color: 'primary',
        orientation: 'horizontal',
        defaultActive: 'home',
        withContent: true,
        fullWidth: true,
    },
};

// ============ TAILLES ============

export const Small: Story = {
    args: {
        items: itemsWithContent,
        variant: 'default',
        size: 'sm',
        color: 'primary',
        orientation: 'horizontal',
        defaultActive: 'home',
        withContent: true,
        fullWidth: true,
    },
};

export const Large: Story = {
    args: {
        items: itemsWithContent,
        variant: 'default',
        size: 'lg',
        color: 'primary',
        orientation: 'horizontal',
        defaultActive: 'home',
        withContent: true,
        fullWidth: true,
    },
};

// ============ ORIENTATION VERTICALE ============

export const Vertical: Story = {
    args: {
        items: itemsWithContent,
        variant: 'default',
        size: 'md',
        color: 'primary',
        orientation: 'vertical',
        defaultActive: 'home',
        withContent: true,
        fullWidth: false,
    },
};

export const VerticalPills: Story = {
    args: {
        items: itemsWithContent,
        variant: 'pills',
        size: 'md',
        color: 'primary',
        orientation: 'vertical',
        defaultActive: 'home',
        withContent: true,
        fullWidth: false,
    },
};

// ============ COULEURS ============

export const DangerColor: Story = {
    args: {
        items: itemsWithContent,
        variant: 'default',
        size: 'md',
        color: 'danger',
        orientation: 'horizontal',
        defaultActive: 'home',
        withContent: true,
        fullWidth: true,
    },
};

export const SuccessColor: Story = {
    args: {
        items: itemsWithContent,
        variant: 'default',
        size: 'md',
        color: 'success',
        orientation: 'horizontal',
        defaultActive: 'home',
        withContent: true,
        fullWidth: true,
    },
};

export const WarningColor: Story = {
    args: {
        items: itemsWithContent,
        variant: 'default',
        size: 'md',
        color: 'warning',
        orientation: 'horizontal',
        defaultActive: 'home',
        withContent: true,
        fullWidth: true,
    },
};

export const InteractivePlayground: Story = {
    args: {
        items: itemsWithContent,
        variant: 'default',
        size: 'md',
        color: 'primary',
        orientation: 'horizontal',
        defaultActive: 'home',
        fullWidth: true,
        withContent: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Playground interactif pour tester toutes les options.',
            },
        },
    },
};