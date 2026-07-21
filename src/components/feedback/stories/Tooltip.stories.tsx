// src/components/feedback/stories/Tooltip.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../Tooltip';
import { Button } from '../../forms/Button';
import { Text } from '../../typography/Text';
import { Bell, Mail, Home, Settings, Heart, Star, HelpCircle, Info, AlertCircle, CheckCircle2Icon } from 'lucide-react';

const meta: Meta<typeof Tooltip> = {
    title: 'Feedback/Tooltip',
    component: Tooltip,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un tooltip pour afficher des informations contextuelles.',
            },
        },
    },
    argTypes: {
        position: {
            control: 'select',
            options: ['top', 'bottom', 'left', 'right'],
            description: 'Position du tooltip',
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'destructive', 'success', 'warning'],
            description: 'Couleur du tooltip',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Taille du tooltip',
        },
        delay: {
            control: 'number',
            description: 'Délai d\'apparition en ms',
        },
        arrow: {
            control: 'boolean',
            description: 'Afficher la flèche',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

// Helper pour les icônes manquantes
const Share2Icon = ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
);

export const FeatureTooltips: Story = {
    render: () => (
        <div className="space-y-6 max-w-2xl w-full">
            <Text variant="h5" className="font-bold">✨ Découvrez nos fonctionnalités</Text>
            <div className="flex flex-wrap gap-6">
                <Tooltip content="Accédez à votre tableau de bord personnalisé" position="top" color="primary">
                    <Button variant="outline" icon={<Home size={18} />}>Dashboard</Button>
                </Tooltip>
                <Tooltip content="Gérez vos messages et notifications" position="top" color="success">
                    <Button variant="outline" icon={<Mail size={18} />}>Messages</Button>
                </Tooltip>
                <Tooltip content="Consultez vos alertes importantes" position="top" color="warning">
                    <Button variant="outline" icon={<Bell size={18} />}>Alertes</Button>
                </Tooltip>
                <Tooltip content="Modifiez vos préférences" position="top" color="primary">
                    <Button variant="outline" icon={<Settings size={18} />}>Paramètres</Button>
                </Tooltip>
            </div>
            <Text variant="small" color="muted">Survolez les boutons pour voir les tooltips</Text>
        </div>
    ),
};

export const IconTooltips: Story = {
    render: () => (
        <div className="space-y-6 max-w-2xl w-full">
            <Text variant="h5" className="font-bold">🎯 Actions rapides</Text>
            <div className="flex flex-wrap gap-4">
                <Tooltip content="Ajouter aux favoris" position="top" color="warning">
                    <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0">
                        <Heart size={20} />
                    </Button>
                </Tooltip>
                <Tooltip content="Noter ce contenu" position="top" color="warning">
                    <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0">
                        <Star size={20} />
                    </Button>
                </Tooltip>
                <Tooltip content="Partager" position="top" color="primary">
                    <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0">
                        <Share2Icon size={20} />
                    </Button>
                </Tooltip>
                <Tooltip content="Plus d'informations" position="top" color="primary">
                    <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0">
                        <HelpCircle size={20} />
                    </Button>
                </Tooltip>
            </div>
            <Text variant="small" color="muted">Survolez les icônes pour voir les tooltips</Text>
        </div>
    ),
};

export const StatusTooltips: Story = {
    render: () => (
        <div className="space-y-6 max-w-2xl w-full">
            <Text variant="h5" className="font-bold">📊 Statuts des utilisateurs</Text>
            <div className="flex flex-wrap gap-6">
                <Tooltip content="Utilisateur actif en ligne" position="top" color="success">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                        <Text>En ligne</Text>
                    </div>
                </Tooltip>
                <Tooltip content="Utilisateur absent" position="top" color="warning">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-warning" />
                        <Text>Absent</Text>
                    </div>
                </Tooltip>
                <Tooltip content="Utilisateur hors ligne" position="top" color="muted">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-muted" />
                        <Text>Hors ligne</Text>
                    </div>
                </Tooltip>
                <Tooltip content="Utilisateur occupé" position="top" color="destructive">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-destructive" />
                        <Text>Occupé</Text>
                    </div>
                </Tooltip>
            </div>
        </div>
    ),
};

export const InfoTooltips: Story = {
    render: () => (
        <div className="space-y-6 max-w-2xl w-full">
            <Text variant="h5" className="font-bold">ℹ️ Informations contextuelles</Text>
            <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-muted/5 rounded-md border border-border/50">
                    <Tooltip content="Cette information est importante pour votre compte" position="right" color="primary">
                        <Info size={18} className="text-primary cursor-help" />
                    </Tooltip>
                    <div>
                        <Text className="font-medium">Informations du compte</Text>
                        <Text variant="small" color="muted">Votre compte est protégé par une authentification à deux facteurs</Text>
                    </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted/5 rounded-md border border-border/50">
                    <Tooltip content="Cette action est irréversible" position="right" color="destructive">
                        <AlertCircle size={18} className="text-destructive cursor-help" />
                    </Tooltip>
                    <div>
                        <Text className="font-medium">Action critique</Text>
                        <Text variant="small" color="muted">La suppression de ce contenu est définitive</Text>
                    </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted/5 rounded-md border border-border/50">
                    <Tooltip content="Cette fonctionnalité est disponible pour tous les utilisateurs" position="right" color="success">
                        <CheckCircle2Icon size={18} className="text-success cursor-help" />
                    </Tooltip>
                    <div>
                        <Text className="font-medium">Fonctionnalité disponible</Text>
                        <Text variant="small" color="muted">Cette option est accessible à tous les utilisateurs</Text>
                    </div>
                </div>
            </div>
        </div>
    ),
};

export const AllColors: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 max-w-2xl">
            <Tooltip content="Primary" position="top" color="primary">
                <Button variant="primary">Primary</Button>
            </Tooltip>
            <Tooltip content="Success" position="top" color="success">
                <Button variant="success">Success</Button>
            </Tooltip>
            <Tooltip content="Warning" position="top" color="warning">
                <Button variant="warning">Warning</Button>
            </Tooltip>
            <Tooltip content="Danger" position="top" color="destructive">
                <Button variant="destructive">Danger</Button>
            </Tooltip>
            <Tooltip content="Muted" position="top" color="muted">
                <Button variant="ghost">Muted</Button>
            </Tooltip>
        </div>
    ),
};

export const AllPositions: Story = {
    render: () => (
        <div className="grid grid-cols-3 gap-8 max-w-2xl">
            <Tooltip content="Top" position="top" color="primary">
                <Button variant="outline">Top</Button>
            </Tooltip>
            <Tooltip content="Bottom" position="bottom" color="primary">
                <Button variant="outline">Bottom</Button>
            </Tooltip>
            <Tooltip content="Left" position="left" color="primary">
                <Button variant="outline">Left</Button>
            </Tooltip>
            <Tooltip content="Right" position="right" color="primary">
                <Button variant="outline">Right</Button>
            </Tooltip>
        </div>
    ),
};

export const InteractivePlayground: Story = {
    render: (args) => (
        <Tooltip
            content="Tooltip interactif"
            position={args.position}
            color={args.color}
            size={args.size}
            delay={args.delay}
            arrow={args.arrow}
        >
            <Button variant="primary">Survolez-moi</Button>
        </Tooltip>
    ),
    args: {
        position: 'top',
        color: 'primary',
        size: 'md',
        delay: 200,
        arrow: true,
    },
};