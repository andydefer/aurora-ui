// src/components/data/stories/Timeline.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Timeline } from '../Timeline';
import { Card } from '../../overlay/Card';
import { Text } from '../../typography/Text';
import { Badge } from '../../feedback/Badge';
import { Clock, MapPin, User, Check, Star, Heart, MessageCircle, Share2 } from 'lucide-react';

const meta: Meta<typeof Timeline> = {
    title: 'Data/Timeline',
    component: Timeline,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Une timeline pour afficher des événements chronologiques.',
            },
        },
    },
    argTypes: {
        orientation: {
            control: 'select',
            options: ['vertical', 'horizontal'],
            description: 'Orientation de la timeline',
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'destructive', 'success', 'warning'],
            description: 'Couleur d\'accentuation',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Taille de la timeline',
        },
        alternate: {
            control: 'boolean',
            description: 'Alterner les éléments',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

const projectTimeline = [
    {
        title: 'Lancement du projet',
        description: 'Définition des objectifs et formation de l\'équipe',
        time: 'Janvier 2024',
        icon: <Check size={14} />,
        color: 'success' as const,
    },
    {
        title: 'Phase de conception',
        description: 'Création des maquettes et validation des designs',
        time: 'Février 2024',
        icon: <Star size={14} />,
        color: 'primary' as const,
        active: true,
    },
    {
        title: 'Développement',
        description: 'Implémentation des fonctionnalités principales',
        time: 'Mars - Avril 2024',
        icon: <Clock size={14} />,
        color: 'warning' as const,
    },
    {
        title: 'Tests et déploiement',
        description: 'Phase de test et mise en production',
        time: 'Mai 2024',
        icon: <Check size={14} />,
        color: 'success' as const,
    },
];

const activityTimeline = [
    {
        title: 'Nouveau commentaire',
        description: 'Jean Dupont a commenté votre article',
        time: 'Il y a 5 minutes',
        icon: <MessageCircle size={14} />,
        color: 'primary' as const,
    },
    {
        title: 'J\'aime reçu',
        description: 'Marie Martin a aimé votre photo',
        time: 'Il y a 2 heures',
        icon: <Heart size={14} />,
        color: 'destructive' as const,
    },
    {
        title: 'Partage',
        description: 'Sophie Lefèvre a partagé votre publication',
        time: 'Il y a 1 jour',
        icon: <Share2 size={14} />,
        color: 'success' as const,
    },
    {
        title: 'Nouveau follower',
        description: 'Pierre Durand vous suit maintenant',
        time: 'Il y a 3 jours',
        icon: <User size={14} />,
        color: 'warning' as const,
    },
];

const orderTimeline = [
    {
        title: 'Commande confirmée',
        description: 'Votre commande a été validée',
        time: '10:30',
        icon: <Check size={14} />,
        color: 'success' as const,
    },
    {
        title: 'En préparation',
        description: 'Votre commande est en cours de préparation',
        time: '11:15',
        icon: <Clock size={14} />,
        color: 'primary' as const,
        active: true,
    },
    {
        title: 'Expédiée',
        description: 'Votre commande a été expédiée',
        time: 'Prévu à 14:00',
        icon: <MapPin size={14} />,
        color: 'warning' as const,
    },
    {
        title: 'Livrée',
        description: 'Votre commande est livrée',
        time: 'Prévu demain',
        icon: <Check size={14} />,
        color: 'muted' as const,
    },
];

export const ProjectTimeline: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <Card variant="default" radius="lg" shadow="sm" className="p-6">
                <Text variant="h5" className="font-bold mb-6">📋 Chronologie du projet</Text>
                <Timeline
                    items={projectTimeline}
                    orientation="vertical"
                    color="primary"
                    size="md"
                />
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Timeline de projet avec étapes.',
            },
        },
    },
};

export const ActivityTimeline: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <Card variant="default" radius="lg" shadow="sm" className="p-6">
                <div className="flex items-center gap-2 mb-6">
                    <Clock size={18} className="text-primary" />
                    <Text variant="h5" className="font-bold">Activité récente</Text>
                    <Badge variant="primary" size="sm">4 nouvelles</Badge>
                </div>
                <Timeline
                    items={activityTimeline}
                    orientation="vertical"
                    color="primary"
                    size="sm"
                />
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Timeline d\'activités sociales.',
            },
        },
    },
};

export const OrderTimeline: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <Card variant="default" radius="lg" shadow="sm" className="p-6">
                <div className="flex items-center gap-2 mb-6">
                    <MapPin size={18} className="text-primary" />
                    <Text variant="h5" className="font-bold">Suivi de livraison</Text>
                    <Badge variant="warning" size="sm">En cours</Badge>
                </div>
                <Timeline
                    items={orderTimeline}
                    orientation="vertical"
                    color="primary"
                    size="md"
                />
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Timeline de suivi de commande.',
            },
        },
    },
};

export const Horizontal: Story = {
    render: () => (
        <div className="w-full max-w-3xl">
            <Card variant="default" radius="lg" shadow="sm" className="p-6">
                <Text variant="h5" className="font-bold mb-6">Timeline horizontale</Text>
                <Timeline
                    items={projectTimeline}
                    orientation="horizontal"
                    color="primary"
                    size="md"
                />
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Timeline en orientation horizontale.',
            },
        },
    },
};

export const Alternate: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <Card variant="default" radius="lg" shadow="sm" className="p-6">
                <Text variant="h5" className="font-bold mb-6">Timeline alternée</Text>
                <Timeline
                    items={projectTimeline}
                    orientation="vertical"
                    color="primary"
                    size="md"
                    alternate
                />
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Timeline avec éléments alternés.',
            },
        },
    },
};

export const SuccessColor: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <Card variant="default" radius="lg" shadow="sm" className="p-6">
                <Timeline
                    items={projectTimeline}
                    orientation="vertical"
                    color="success"
                    size="md"
                />
            </Card>
        </div>
    ),
};

export const DangerColor: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <Card variant="default" radius="lg" shadow="sm" className="p-6">
                <Timeline
                    items={projectTimeline}
                    orientation="vertical"
                    color="destructive"
                    size="md"
                />
            </Card>
        </div>
    ),
};

export const SmallSize: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <Card variant="default" radius="lg" shadow="sm" className="p-6">
                <Timeline
                    items={activityTimeline}
                    orientation="vertical"
                    color="primary"
                    size="sm"
                />
            </Card>
        </div>
    ),
};

export const LargeSize: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <Card variant="default" radius="lg" shadow="sm" className="p-6">
                <Timeline
                    items={projectTimeline}
                    orientation="vertical"
                    color="primary"
                    size="lg"
                />
            </Card>
        </div>
    ),
};

export const InteractivePlayground: Story = {
    args: {
        items: projectTimeline,
        orientation: 'vertical',
        color: 'primary',
        size: 'md',
        alternate: false,
    },
    render: (args) => (
        <div className="w-full max-w-2xl">
            <Card variant="default" radius="lg" shadow="sm" className="p-6">
                <Timeline {...args} />
            </Card>
        </div>
    ),
};