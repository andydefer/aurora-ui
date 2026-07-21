// src/components/feedback/stories/Badge.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../Badge';
import { Button } from '../../forms/Button';
import { Bell, Mail, Check, X, User, Home, Star, Heart } from 'lucide-react';
import { Text } from '../../typography';

const meta: Meta<typeof Badge> = {
    title: 'Feedback/Badge',
    component: Badge,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un badge pour afficher des notifications, des statuts ou des étiquettes.',
            },
        },
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'warning', 'destructive', 'info', 'muted', 'outline', 'ghost'],
            description: 'Style visuel du badge',
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg'],
            description: 'Taille du badge',
        },
        count: {
            control: 'number',
            description: 'Nombre à afficher',
        },
        max: {
            control: 'number',
            description: 'Nombre maximum avant affichage de +',
        },
        dot: {
            control: 'boolean',
            description: 'Afficher un simple point',
        },
        overlap: {
            control: 'boolean',
            description: 'Superposer le badge sur l\'élément',
        },
        rounded: {
            control: 'boolean',
            description: 'Badge arrondi (pill)',
        },
        removable: {
            control: 'boolean',
            description: 'Afficher un bouton de suppression',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// ============ VARIANTES ============

export const AllVariants: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 max-w-2xl">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="destructive">Error</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="muted">Muted</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="ghost">Ghost</Badge>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Toutes les variantes de badges disponibles.',
            },
        },
    },
};

// ============ TAILLES ============

export const AllSizes: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-4 max-w-2xl">
            <Badge size="xs">XS</Badge>
            <Badge size="sm">SM</Badge>
            <Badge size="md">MD</Badge>
            <Badge size="lg">LG</Badge>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Toutes les tailles de badges disponibles.',
            },
        },
    },
};

// ============ AVEC COMPTEUR ============

export const WithCount: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 max-w-2xl">
            <Badge count={5}>Notifications</Badge>
            <Badge count={12} variant="success">Messages</Badge>
            <Badge count={3} variant="warning">Alertes</Badge>
            <Badge count={99} max={99} variant="destructive">99+</Badge>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Badges avec compteur et limite max.',
            },
        },
    },
};

// ============ SUR UN ÉLÉMENT ============

export const OnElement: Story = {
    render: () => (
        <div className="flex flex-wrap gap-8 max-w-2xl">
            <Badge count={5}>
                <Button variant="outline" size="lg">
                    <Bell size={20} />
                </Button>
            </Badge>
            <Badge count={12} variant="success">
                <Button variant="outline" size="lg">
                    <Mail size={20} />
                </Button>
            </Badge>
            <Badge count={3} variant="warning">
                <Button variant="outline" size="lg">
                    <Home size={20} />
                </Button>
            </Badge>
            <Badge dot variant="success">
                <Button variant="outline" size="lg">
                    <User size={20} />
                </Button>
            </Badge>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Badges sur des éléments comme des boutons avec icônes.',
            },
        },
    },
};

// ============ OVERLAP ============

export const WithOverlap: Story = {
    render: () => (
        <div className="flex flex-wrap gap-8 max-w-2xl">
            <Badge count={5} overlap>
                <Button variant="outline" size="lg">
                    <Bell size={20} />
                </Button>
            </Badge>
            <Badge count={12} variant="success" overlap>
                <Button variant="outline" size="lg">
                    <Mail size={20} />
                </Button>
            </Badge>
            <Badge dot variant="outline" overlap>
                <Button variant="outline" size="lg">
                    <Heart size={20} />
                </Button>
            </Badge>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Badges en superposition sur les éléments.',
            },
        },
    },
};

// ============ POINT ============

export const DotOnly: Story = {
    render: () => (
        <div className="flex flex-wrap gap-8 max-w-2xl">
            <Badge dot variant="primary">
                <Button variant="outline" size="lg">
                    <Bell size={20} />
                </Button>
            </Badge>
            <Badge dot variant="success">
                <Button variant="outline" size="lg">
                    <Check size={20} />
                </Button>
            </Badge>
            <Badge dot variant="warning">
                <Button variant="outline" size="lg">
                    <Star size={20} />
                </Button>
            </Badge>
            <Badge dot variant="destructive">
                <Button variant="outline" size="lg">
                    <X size={20} />
                </Button>
            </Badge>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Badges sous forme de point pour indiquer un statut.',
            },
        },
    },
};

// ============ AVEC ICÔNE ============

export const WithIcon: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 max-w-2xl">
            <Badge variant="primary" icon={<Bell size={12} />}>
                Notifications
            </Badge>
            <Badge variant="success" icon={<Check size={12} />} iconPosition="left">
                Validé
            </Badge>
            <Badge variant="destructive" icon={<X size={12} />} iconPosition="right">
                Erreur
            </Badge>
            <Badge variant="warning" icon={<Star size={12} />}>
                Populaire
            </Badge>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Badges avec icône intégrée.',
            },
        },
    },
};

// ============ REMOVABLE ============

export const Removable: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 max-w-2xl">
            <Badge variant="primary" removable onRemove={() => alert('Supprimé !')}>
                Filtre actif
            </Badge>
            <Badge variant="success" removable onRemove={() => alert('Supprimé !')}>
                Terminé
            </Badge>
            <Badge variant="warning" removable onRemove={() => alert('Supprimé !')}>
                En cours
            </Badge>
            <Badge variant="destructive" removable onRemove={() => alert('Supprimé !')}>
                Annulé
            </Badge>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Badges avec bouton de suppression.',
            },
        },
    },
};

// ============ ROUNDED ============

export const Rounded: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 max-w-2xl">
            <Badge rounded variant="primary">Primary</Badge>
            <Badge rounded variant="success">Success</Badge>
            <Badge rounded variant="warning">Warning</Badge>
            <Badge rounded variant="destructive">Error</Badge>
            <Badge rounded variant="info">Info</Badge>
            <Badge rounded variant="outline">Outline</Badge>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Badges arrondis (pilules).',
            },
        },
    },
};

// ============ CAS D'USAGE ============

export const StatusBadges: Story = {
    render: () => (
        <div className="space-y-4 max-w-md w-full">
            <div className="flex items-center gap-4">
                <span className="text-sm font-medium w-20">Status :</span>
                <Badge dot variant="success">En ligne</Badge>
                <Badge dot variant="warning">Absent</Badge>
                <Badge dot variant="destructive">Hors ligne</Badge>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-sm font-medium w-20">Priorité :</span>
                <Badge variant="destructive">Haute</Badge>
                <Badge variant="warning">Moyenne</Badge>
                <Badge variant="info">Basse</Badge>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-sm font-medium w-20">Projet :</span>
                <Badge variant="success" rounded>Terminé</Badge>
                <Badge variant="warning" rounded>En cours</Badge>
                <Badge variant="outline" rounded>Planifié</Badge>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Badges pour différents cas d\'usage (statut, priorité, projet).',
            },
        },
    },
};

// ============ AVEC BOUTONS ============

export const WithButtons: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 max-w-2xl">
            <div className="relative">
                <Button variant="primary">
                    <Bell size={18} className="mr-1" />
                    Notifications
                </Button>
                <Badge count={8} className="absolute -top-2 -right-2" />
            </div>
            <div className="relative">
                <Button variant="outline">
                    <Mail size={18} className="mr-1" />
                    Messages
                </Button>
                <Badge count={12} variant="success" className="absolute -top-2 -right-2" />
            </div>
            <div className="relative">
                <Button variant="ghost">
                    <User size={18} className="mr-1" />
                    Profil
                </Button>
                <Badge dot variant="success" className="absolute -top-1 -right-1" />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Badges combinés avec des boutons.',
            },
        },
    },
};

// ============ COMPARAISON ============

export const AllVariantsComparison: Story = {
    render: () => (
        <div className="space-y-6 max-w-3xl w-full">
            <div className="space-y-2">
                <Text variant="h6" className="font-bold">Variant</Text>
                <div className="flex flex-wrap gap-3">
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="destructive">Error</Badge>
                    <Badge variant="info">Info</Badge>
                    <Badge variant="muted">Muted</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="ghost">Ghost</Badge>
                </div>
            </div>

            <div className="space-y-2">
                <Text variant="h6" className="font-bold">Size</Text>
                <div className="flex flex-wrap items-center gap-3">
                    <Badge size="xs">XS</Badge>
                    <Badge size="sm">SM</Badge>
                    <Badge size="md">MD</Badge>
                    <Badge size="lg">LG</Badge>
                </div>
            </div>

            <div className="space-y-2">
                <Text variant="h6" className="font-bold">Rounded</Text>
                <div className="flex flex-wrap gap-3">
                    <Badge rounded variant="primary">Primary</Badge>
                    <Badge rounded variant="success">Success</Badge>
                    <Badge rounded variant="warning">Warning</Badge>
                    <Badge rounded variant="destructive">Error</Badge>
                </div>
            </div>

            <div className="space-y-2">
                <Text variant="h6" className="font-bold">With Icon</Text>
                <div className="flex flex-wrap gap-3">
                    <Badge variant="primary" icon={<Bell size={12} />}>Notifications</Badge>
                    <Badge variant="success" icon={<Check size={12} />}>Validé</Badge>
                    <Badge variant="destructive" icon={<X size={12} />}>Erreur</Badge>
                </div>
            </div>

            <div className="space-y-2">
                <Text variant="h6" className="font-bold">Removable</Text>
                <div className="flex flex-wrap gap-3">
                    <Badge variant="primary" removable>Filtre</Badge>
                    <Badge variant="success" removable>Terminé</Badge>
                    <Badge variant="warning" removable>En cours</Badge>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Comparaison de toutes les options disponibles.',
            },
        },
    },
};

// ============ INTERACTIF ============

export const InteractivePlayground: Story = {
    args: {
        children: 'Badge',
        count: 42,
        variant: 'primary',
        size: 'md',
        max: 99,
        dot: false,
        overlap: false,
        rounded: false,
        removable: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'Playground interactif pour tester toutes les options.',
            },
        },
    },
};