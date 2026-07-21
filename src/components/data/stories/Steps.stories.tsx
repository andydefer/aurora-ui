// src/components/data/stories/Steps.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Steps } from '../Steps';
import { useState } from 'react';
import { Card } from '../../overlay/Card';
import { Text } from '../../typography/Text';
import { Badge } from '../../feedback/Badge';
import { Button } from '../../forms/Button';
import { Check, AlertCircle, ShoppingBag, } from 'lucide-react';

const meta: Meta<typeof Steps> = {
    title: 'Data/Steps',
    component: Steps,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un composant pour afficher des étapes avec statuts.',
            },
        },
    },
    argTypes: {
        orientation: {
            control: 'select',
            options: ['vertical', 'horizontal'],
            description: 'Orientation des étapes',
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'destructive', 'success', 'warning'],
            description: 'Couleur d\'accentuation',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Taille des étapes',
        },
        statusIcons: {
            control: 'boolean',
            description: 'Afficher les icônes de statut',
        },
        clickable: {
            control: 'boolean',
            description: 'Rendre les étapes cliquables',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Steps>;

const orderSteps = [
    { label: 'Commande créée', description: 'Votre commande a été validée', status: 'completed' as const },
    { label: 'En préparation', description: 'Votre commande est en cours', status: 'current' as const },
    { label: 'Expédiée', description: 'Votre commande a été expédiée', status: 'pending' as const },
    { label: 'Livrée', description: 'Votre commande est livrée', status: 'pending' as const },
];

const projectSteps = [
    { label: 'Analyse', description: 'Étude des besoins', status: 'completed' as const },
    { label: 'Design', description: 'Maquettes et prototypes', status: 'completed' as const },
    { label: 'Développement', description: 'Code et tests', status: 'current' as const },
    { label: 'Déploiement', description: 'Mise en production', status: 'pending' as const },
    { label: 'Maintenance', description: 'Support et évolutions', status: 'pending' as const },
];

const errorSteps = [
    { label: 'Validation', description: 'Données vérifiées', status: 'completed' as const },
    { label: 'Paiement', description: 'Transaction en cours', status: 'destructive' as const },
    { label: 'Confirmation', description: 'Récapitulatif', status: 'pending' as const },
];

export const OrderStatus: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <Card variant="default" radius="lg" shadow="sm" className="p-6">
                <div className="flex items-center gap-2 mb-6">
                    <ShoppingBag size={20} className="text-primary" />
                    <Text variant="h5" className="font-bold">Suivi de commande #12345</Text>
                </div>
                <Steps
                    items={orderSteps}
                    orientation="vertical"
                    color="primary"
                    size="md"
                    statusIcons
                />
                <div className="mt-6 p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <Text variant="small" className="font-medium text-primary">Statut actuel : En préparation</Text>
                    <Text variant="caption" color="muted">Livraison prévue demain</Text>
                </div>
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Suivi de commande avec statuts.',
            },
        },
    },
};

export const ProjectProgress: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <Card variant="default" radius="lg" shadow="sm" className="p-6">
                <div className="flex items-center gap-2 mb-6">
                    <Check size={20} className="text-success" />
                    <Text variant="h5" className="font-bold">Progression du projet</Text>
                    <Badge variant="success" size="sm">60%</Badge>
                </div>
                <Steps
                    items={projectSteps}
                    orientation="vertical"
                    color="success"
                    size="md"
                    statusIcons
                />
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Progression de projet avec statuts.',
            },
        },
    },
};

export const HorizontalSteps: Story = {
    render: () => (
        <div className="w-full max-w-3xl">
            <Card variant="default" radius="lg" shadow="sm" className="p-6">
                <Text variant="h5" className="font-bold mb-6">Processus d'onboarding</Text>
                <Steps
                    items={projectSteps.slice(0, 4)}
                    orientation="horizontal"
                    color="primary"
                    size="md"
                    statusIcons
                />
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Étapes horizontales.',
            },
        },
    },
};

export const WithError: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <Card variant="default" radius="lg" shadow="sm" className="p-6">
                <div className="flex items-center gap-2 mb-6">
                    <AlertCircle size={20} className="text-destructive" />
                    <Text variant="h5" className="font-bold">Échec du paiement</Text>
                    <Badge variant="destructive" size="sm">Erreur</Badge>
                </div>
                <Steps
                    items={errorSteps}
                    orientation="vertical"
                    color="destructive"
                    size="md"
                    statusIcons
                />
                <div className="mt-6 p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                    <Text variant="small" className="font-medium text-destructive">Erreur lors du paiement</Text>
                    <Text variant="caption" color="muted">Veuillez réessayer avec une autre carte</Text>
                    <Button variant="primary" size="sm" className="mt-2">Réessayer</Button>
                </div>
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Étapes avec erreur.',
            },
        },
    },
};

export const SmallSize: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <Card variant="default" radius="lg" shadow="sm" className="p-6">
                <Steps
                    items={orderSteps}
                    orientation="vertical"
                    color="primary"
                    size="sm"
                    statusIcons
                />
            </Card>
        </div>
    ),
};

export const LargeSize: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <Card variant="default" radius="lg" shadow="sm" className="p-6">
                <Steps
                    items={orderSteps}
                    orientation="vertical"
                    color="primary"
                    size="lg"
                    statusIcons
                />
            </Card>
        </div>
    ),
};

export const InteractivePlayground: Story = {
    args: {
        items: orderSteps,
        orientation: 'vertical',
        color: 'primary',
        size: 'md',
        statusIcons: true,
        clickable: true,
    },
    render: (args) => {
        const [items, setItems] = useState(orderSteps);
        const handleStepClick = (index: number) => {
            const newItems = items.map((item, i) => {
                if (i < index) return { ...item, status: 'completed' as const };
                if (i === index) return { ...item, status: 'current' as const };
                return { ...item, status: 'pending' as const };
            });
            setItems(newItems);
        };
        return (
            <div className="w-full max-w-2xl">
                <Steps
                    {...args}
                    items={items}
                    onStepClick={handleStepClick}
                />
                <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => {
                        setItems(orderSteps.map((item, i) => ({
                            ...item,
                            status: i === 0 ? 'current' as const : 'pending' as const
                        })));
                    }}>Réinitialiser</Button>
                </div>
            </div>
        );
    },
};