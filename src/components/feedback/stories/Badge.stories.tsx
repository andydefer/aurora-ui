// src/components/feedback/stories/Badge.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../Badge';
import { Button } from '../../forms/Button';
import { Bell, Mail, Check, X, User, Star, Tag, AlertCircle } from 'lucide-react';

const meta: Meta<typeof Badge> = {
    title: 'Feedback/Badge',
    component: Badge,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un badge pour afficher des étiquettes, des statuts ou des informations contextuelles.',
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
        rounded: {
            control: 'boolean',
            description: 'Badge complètement arrondi (pilule)',
        },
        pill: {
            control: 'boolean',
            description: 'Alias pour rounded',
        },
        subtle: {
            control: 'boolean',
            description: 'Version plus discrète avec fond transparent',
        },
        removable: {
            control: 'boolean',
            description: 'Afficher un bouton de suppression',
        },
        animate: {
            control: 'boolean',
            description: 'Animation au survol',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// ============ VARIANTES ============

export const AllVariants: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 max-w-2xl p-4">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="destructive">Error</Badge>
            <Badge variant="info">Info</Badge>
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

// ============ SUBTLE VARIANTES ============

export const SubtleVariants: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 max-w-2xl p-4">
            <Badge variant="primary" subtle>Primary</Badge>
            <Badge variant="secondary" subtle>Secondary</Badge>
            <Badge variant="success" subtle>Success</Badge>
            <Badge variant="warning" subtle>Warning</Badge>
            <Badge variant="destructive" subtle>Error</Badge>
            <Badge variant="info" subtle>Info</Badge>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Versions subtiles avec fond transparent et bordure fine.',
            },
        },
    },
};

// ============ TAILLES ============

export const AllSizes: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-4 max-w-2xl p-4">
            <Badge size="xs">Extra Small</Badge>
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
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

// ============ ROUNDED (PILL) ============

export const RoundedPills: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 max-w-2xl p-4">
            <Badge rounded variant="primary">Primary</Badge>
            <Badge rounded variant="success">Success</Badge>
            <Badge rounded variant="warning">Warning</Badge>
            <Badge rounded variant="destructive">Error</Badge>
            <Badge rounded variant="info">Info</Badge>
            <Badge rounded variant="outline">Outline</Badge>
            <Badge rounded variant="ghost">Ghost</Badge>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Badges arrondis en forme de pilule.',
            },
        },
    },
};

// ============ AVEC ICÔNE ============

export const WithIcon: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 max-w-2xl p-4">
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
            <Badge variant="info" icon={<Tag size={12} />}>
                Nouveau
            </Badge>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Badges avec icône intégrée à gauche ou à droite.',
            },
        },
    },
};

// ============ REMOVABLE ============

export const Removable: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 max-w-2xl p-4">
            <Badge variant="primary" removable onRemove={() => alert('Filtre supprimé !')}>
                Filtre actif
            </Badge>
            <Badge variant="success" removable onRemove={() => alert('Tâche terminée !')}>
                Terminé
            </Badge>
            <Badge variant="warning" removable onRemove={() => alert('Tâche annulée !')}>
                En cours
            </Badge>
            <Badge variant="destructive" removable onRemove={() => alert('Élément supprimé !')}>
                Annulé
            </Badge>
            <Badge variant="info" removable onRemove={() => alert('Tag supprimé !')}>
                Tag #123
            </Badge>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Badges avec bouton de suppression pour les filtres ou tags.',
            },
        },
    },
};

// ============ ANIMATED ============

export const Animated: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 max-w-2xl p-4">
            <Badge variant="primary" animate>Hover me</Badge>
            <Badge variant="success" animate>Scale me</Badge>
            <Badge variant="warning" animate>Interactive</Badge>
            <Badge variant="destructive" animate>Animated</Badge>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Badges avec animation au survol (scale et shadow).',
            },
        },
    },
};

// ============ CAS D'USAGE - STATUTS ============

export const StatusBadges: Story = {
    render: () => (
        <div className="space-y-6 max-w-md w-full p-4">
            <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground">Statut utilisateur</h4>
                <div className="flex flex-wrap gap-3">
                    <Badge variant="success" rounded>En ligne</Badge>
                    <Badge variant="warning" rounded>Absent</Badge>
                    <Badge variant="destructive" rounded>Hors ligne</Badge>
                </div>
            </div>
            <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground">Priorité</h4>
                <div className="flex flex-wrap gap-3">
                    <Badge variant="destructive" icon={<AlertCircle size={12} />}>Haute</Badge>
                    <Badge variant="warning" icon={<AlertCircle size={12} />}>Moyenne</Badge>
                    <Badge variant="info" icon={<AlertCircle size={12} />}>Basse</Badge>
                </div>
            </div>
            <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground">Statut projet</h4>
                <div className="flex flex-wrap gap-3">
                    <Badge variant="success" rounded>Terminé</Badge>
                    <Badge variant="warning" rounded>En cours</Badge>
                    <Badge variant="info" rounded>Planifié</Badge>
                    <Badge variant="destructive" rounded>Bloqué</Badge>
                </div>
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

// ============ CAS D'USAGE - TAGS ============

export const Tags: Story = {
    render: () => (
        <div className="space-y-4 max-w-lg w-full p-4">
            <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="primary" icon={<Tag size={10} />} size="sm">React</Badge>
                    <Badge variant="info" icon={<Tag size={10} />} size="sm">TypeScript</Badge>
                    <Badge variant="success" icon={<Tag size={10} />} size="sm">Node.js</Badge>
                    <Badge variant="warning" icon={<Tag size={10} />} size="sm">Python</Badge>
                    <Badge variant="destructive" icon={<Tag size={10} />} size="sm">Docker</Badge>
                </div>
            </div>
            <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground">Catégories</h4>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" size="sm" rounded>Design</Badge>
                    <Badge variant="outline" size="sm" rounded>Développement</Badge>
                    <Badge variant="outline" size="sm" rounded>Marketing</Badge>
                    <Badge variant="outline" size="sm" rounded>Support</Badge>
                </div>
            </div>
            <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground">Avec suppression</h4>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="primary" size="sm" removable>React</Badge>
                    <Badge variant="info" size="sm" removable>TypeScript</Badge>
                    <Badge variant="success" size="sm" removable>Node.js</Badge>
                    <Badge variant="outline" size="sm" removable>Docker</Badge>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Badges utilisés comme tags avec possibilité de suppression.',
            },
        },
    },
};

// ============ AVEC BOUTONS ============

export const WithButtons: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 max-w-2xl p-4">
            <Button variant="primary" size="lg">
                <Bell size={18} className="mr-2" />
                Notifications
                <Badge variant="destructive" size="xs" className="ml-2">12</Badge>
            </Button>
            <Button variant="outline" size="lg">
                <Mail size={18} className="mr-2" />
                Messages
                <Badge variant="success" size="xs" className="ml-2">5</Badge>
            </Button>
            <Button variant="ghost" size="lg">
                <User size={18} className="mr-2" />
                Profil
                <Badge variant="warning" size="xs" className="ml-2">Nouveau</Badge>
            </Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Badges combinés avec des boutons pour afficher des compteurs.',
            },
        },
    },
};

// ============ COMPARAISON COMPLÈTE ============

export const CompleteComparison: Story = {
    render: () => (
        <div className="space-y-6 max-w-3xl w-full p-4">
            <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground">Variants</h4>
                <div className="flex flex-wrap gap-3">
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="destructive">Error</Badge>
                    <Badge variant="info">Info</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="ghost">Ghost</Badge>
                </div>
            </div>

            <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground">Sizes</h4>
                <div className="flex flex-wrap items-center gap-3">
                    <Badge size="xs">XS</Badge>
                    <Badge size="sm">SM</Badge>
                    <Badge size="md">MD</Badge>
                    <Badge size="lg">LG</Badge>
                </div>
            </div>

            <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground">Rounded</h4>
                <div className="flex flex-wrap gap-3">
                    <Badge rounded variant="primary">Primary</Badge>
                    <Badge rounded variant="success">Success</Badge>
                    <Badge rounded variant="warning">Warning</Badge>
                    <Badge rounded variant="destructive">Error</Badge>
                </div>
            </div>

            <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground">Subtle</h4>
                <div className="flex flex-wrap gap-3">
                    <Badge subtle variant="primary">Primary</Badge>
                    <Badge subtle variant="success">Success</Badge>
                    <Badge subtle variant="warning">Warning</Badge>
                    <Badge subtle variant="destructive">Error</Badge>
                </div>
            </div>

            <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground">With Icon</h4>
                <div className="flex flex-wrap gap-3">
                    <Badge variant="primary" icon={<Bell size={12} />}>Notifications</Badge>
                    <Badge variant="success" icon={<Check size={12} />}>Validé</Badge>
                    <Badge variant="destructive" icon={<X size={12} />}>Erreur</Badge>
                </div>
            </div>

            <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground">Removable</h4>
                <div className="flex flex-wrap gap-3">
                    <Badge variant="primary" removable>Filtre</Badge>
                    <Badge variant="success" removable>Terminé</Badge>
                    <Badge variant="warning" removable>En cours</Badge>
                </div>
            </div>

            <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground">Animated</h4>
                <div className="flex flex-wrap gap-3">
                    <Badge variant="primary" animate>Hover me</Badge>
                    <Badge variant="success" animate>Scale me</Badge>
                    <Badge variant="warning" animate>Interactive</Badge>
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

export const Playground: Story = {
    args: {
        children: 'Badge',
        variant: 'primary',
        size: 'md',
        rounded: false,
        subtle: false,
        removable: false,
        animate: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'Playground interactif pour tester toutes les options.',
            },
        },
    },
};