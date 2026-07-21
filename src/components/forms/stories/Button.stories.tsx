// src/components/forms/stories/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Home, User, Bell, Mail, Heart, Search, Plus, Trash2, Edit, Check, X, ArrowRight, } from 'lucide-react';
import { Text } from '../../typography/Text';

const meta: Meta<typeof Button> = {
    title: 'Forms/Button',
    component: Button,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un bouton polyvalent avec de nombreuses variantes, tailles et états.',
            },
        },
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'destructive', 'success', 'warning', 'ghost', 'outline', 'gradient', 'glass'],
            description: 'Style visuel du bouton',
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
            description: 'Taille du bouton',
        },
        fullWidth: {
            control: 'boolean',
            description: 'Bouton en pleine largeur',
        },
        loading: {
            control: 'boolean',
            description: 'État de chargement',
        },
        disabled: {
            control: 'boolean',
            description: 'Bouton désactivé',
        },
        rounded: {
            control: 'boolean',
            description: 'Bouton arrondi (circulaire)',
        },
        shadow: {
            control: 'boolean',
            description: 'Ombre portée',
        },
        animated: {
            control: 'boolean',
            description: 'Animation au survol',
        },
        iconPosition: {
            control: 'select',
            options: ['left', 'right'],
            description: 'Position de l\'icône',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;


// ============ AVEC ICÔNES ============

export const WithIcons: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 max-w-4xl p-4">
            <Button variant="primary" icon={<Home size={16} />}>Accueil</Button>
            <Button variant="secondary" icon={<User size={16} />}>Profil</Button>
            <Button variant="success" icon={<Check size={16} />}>Valider</Button>
            <Button variant="destructive" icon={<Trash2 size={16} />}>Supprimer</Button>
            <Button variant="outline" icon={<Edit size={16} />}>Modifier</Button>
            <Button variant="ghost" icon={<Search size={16} />}>Rechercher</Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Boutons avec icônes à gauche.',
            },
        },
    },
};

export const IconOnly: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 max-w-4xl p-4">
            <Button variant="primary" icon={<Home size={18} />} ariaLabel="Accueil" rounded />
            <Button variant="secondary" icon={<User size={18} />} ariaLabel="Profil" rounded />
            <Button variant="destructive" icon={<Trash2 size={18} />} ariaLabel="Supprimer" rounded />
            <Button variant="success" icon={<Check size={18} />} ariaLabel="Valider" rounded />
            <Button variant="outline" icon={<Edit size={18} />} ariaLabel="Modifier" rounded />
            <Button variant="ghost" icon={<Heart size={18} />} ariaLabel="Aimer" rounded />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Boutons avec icône uniquement (arrondis).',
            },
        },
    },
};

export const IconRight: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 max-w-4xl p-4">
            <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
                Continuer
            </Button>
            <Button variant="success" icon={<Check size={16} />} iconPosition="right">
                Valider
            </Button>
            <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                En savoir plus
            </Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Boutons avec icône à droite.',
            },
        },
    },
};

// ============ ÉTATS ============

export const Loading: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 max-w-4xl p-4">
            <Button variant="primary" loading>Chargement</Button>
            <Button variant="secondary" loading>En cours...</Button>
            <Button variant="success" loading>Validation</Button>
            <Button variant="outline" loading>Recherche</Button>
            <Button variant="ghost" loading>Patientez</Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Boutons en état de chargement.',
            },
        },
    },
};

export const Disabled: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 max-w-4xl p-4">
            <Button variant="primary" disabled>Primary</Button>
            <Button variant="secondary" disabled>Secondary</Button>
            <Button variant="destructive" disabled>Destructive</Button>
            <Button variant="success" disabled>Success</Button>
            <Button variant="outline" disabled>Outline</Button>
            <Button variant="ghost" disabled>Ghost</Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Boutons désactivés.',
            },
        },
    },
};

// ============ STYLES ============

export const Rounded: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 max-w-4xl p-4">
            <Button variant="primary" rounded>Arrondi</Button>
            <Button variant="secondary" rounded icon={<User size={16} />}>Profil</Button>
            <Button variant="outline" rounded icon={<Plus size={16} />}>Ajouter</Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Boutons avec coins arrondis (pilules).',
            },
        },
    },
};

export const WithShadow: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 max-w-4xl p-4">
            <Button variant="primary" shadow>Ombre</Button>
            <Button variant="secondary" shadow>Ombre</Button>
            <Button variant="success" shadow>Ombre</Button>
            <Button variant="destructive" shadow>Ombre</Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Boutons avec ombre portée.',
            },
        },
    },
};

export const Animated: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 max-w-4xl p-4">
            <Button variant="primary" animated>Animé</Button>
            <Button variant="secondary" animated>Animé</Button>
            <Button variant="gradient" animated>Animé</Button>
            <Button variant="outline" animated>Animé</Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Boutons avec animation au survol (scale).',
            },
        },
    },
};

// ============ FULL WIDTH ============

export const FullWidth: Story = {
    render: () => (
        <div className="w-full max-w-md space-y-3 p-4">
            <Button variant="primary" fullWidth>Bouton pleine largeur</Button>
            <Button variant="secondary" fullWidth>Bouton pleine largeur</Button>
            <Button variant="outline" fullWidth>Bouton pleine largeur</Button>
            <Button variant="success" fullWidth icon={<Check size={16} />}>
                Valider
            </Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Boutons en pleine largeur.',
            },
        },
    },
};

// ============ AVEC BADGE ============

export const WithBadge: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 max-w-4xl p-4">
            <Button variant="primary" badge="3" badgeColor="destructive">
                Notifications
            </Button>
            <Button variant="outline" badge="5" badgeColor="primary">
                Messages
            </Button>
            <Button variant="ghost" badge="12" badgeColor="destructive">
                Alertes
            </Button>
            <Button variant="secondary" badge="Nouveau" badgeColor="success">
                Découvrir
            </Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Boutons avec badge de notification.',
            },
        },
    },
};

// ============ AVEC BADGE ET ICÔNE ============

export const WithBadgeAndIcon: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 max-w-4xl p-4">
            <Button variant="primary" icon={<Bell size={16} />} badge="3" badgeColor="destructive">
                Notifications
            </Button>
            <Button variant="outline" icon={<Mail size={16} />} badge="5" badgeColor="primary">
                Messages
            </Button>
            <Button variant="ghost" icon={<Heart size={16} />} badge="12" badgeColor="destructive">
                Favoris
            </Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Boutons avec badge et icône.',
            },
        },
    },
};

// ============ CAS D'USAGE ============

export const ActionButtons: Story = {
    render: () => (
        <div className="space-y-6 max-w-md w-full p-4">
            <div className="flex gap-3">
                <Button variant="primary" icon={<Plus size={16} />}>Ajouter</Button>
                <Button variant="destructive" icon={<Trash2 size={16} />}>Supprimer</Button>
                <Button variant="outline" icon={<Edit size={16} />}>Modifier</Button>
            </div>
            <div className="flex gap-3">
                <Button variant="success" icon={<Check size={16} />}>Publier</Button>
                <Button variant="warning" icon={<X size={16} />}>Annuler</Button>
                <Button variant="ghost" icon={<Search size={16} />}>Rechercher</Button>
            </div>
            <div className="flex gap-3">
                <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
                    Suivant
                </Button>
                <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                    En savoir plus
                </Button>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Boutons pour différentes actions.',
            },
        },
    },
};

export const FormActions: Story = {
    render: () => (
        <div className="space-y-4 max-w-md w-full p-4">
            <div className="flex gap-3">
                <Button variant="primary" fullWidth>Valider le formulaire</Button>
            </div>
            <div className="flex gap-3">
                <Button variant="primary" className="flex-1">Envoyer</Button>
                <Button variant="outline" className="flex-1">Annuler</Button>
            </div>
            <div className="flex gap-3">
                <Button variant="primary" className="flex-2">Enregistrer</Button>
                <Button variant="destructive" className="flex-1">Supprimer</Button>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Boutons dans un contexte de formulaire.',
            },
        },
    },
};

// ============ SOCIAL BUTTONS ============

export const SocialButtons: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 max-w-4xl p-4">
            <Button variant="primary" icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" /></svg>}>
                Google
            </Button>
            <Button variant="secondary" icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" /></svg>}>
                Facebook
            </Button>
            <Button variant="outline" icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" /></svg>}>
                Twitter
            </Button>
            <Button variant="ghost" icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>}>
                LinkedIn
            </Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Boutons de réseaux sociaux.',
            },
        },
    },
};

// ============ COMPARAISON ============

export const AllCombinations: Story = {
    render: () => (
        <div className="space-y-8 max-w-4xl w-full p-4">
            <div>
                <Text variant="h6" className="font-bold mb-3">Variantes avec icône</Text>
                <div className="flex flex-wrap gap-4">
                    <Button variant="primary" icon={<Home size={16} />}>Primary</Button>
                    <Button variant="secondary" icon={<User size={16} />}>Secondary</Button>
                    <Button variant="destructive" icon={<Trash2 size={16} />}>Destructive</Button>
                    <Button variant="success" icon={<Check size={16} />}>Success</Button>
                    <Button variant="warning" icon={<AlertTriangle size={16} />}>Warning</Button>
                </div>
            </div>
            <div>
                <Text variant="h6" className="font-bold mb-3">Avec badge</Text>
                <div className="flex flex-wrap gap-4">
                    <Button variant="primary" badge="3">Notifications</Button>
                    <Button variant="secondary" badge="5" badgeColor="primary">Messages</Button>
                    <Button variant="outline" badge="Nouveau" badgeColor="success">Découvrir</Button>
                </div>
            </div>
            <div>
                <Text variant="h6" className="font-bold mb-3">Tailles</Text>
                <div className="flex flex-wrap items-center gap-4">
                    <Button size="xs">XS</Button>
                    <Button size="sm">SM</Button>
                    <Button size="md">MD</Button>
                    <Button size="lg">LG</Button>
                    <Button size="xl">XL</Button>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Toutes les combinaisons de boutons.',
            },
        },
    },
};

export const InteractivePlayground: Story = {
    args: {
        children: 'Bouton interactif',
        variant: 'primary',
        size: 'md',
        fullWidth: false,
        loading: false,
        disabled: false,
        rounded: false,
        shadow: false,
        animated: false,
        iconPosition: 'left',
    },
    render: (args) => (
        <div className="flex flex-col items-center gap-6 max-w-md w-full p-4">
            <Button {...args} />
            <div className="text-sm text-muted-foreground">
                Variant: {args.variant} • Size: {args.size}
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Playground interactif pour tester toutes les options.',
            },
        },
    },
};

// Helper pour l'icône AlertTriangle
const AlertTriangle = ({ size, className }: { size?: number; className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size || 24}
        height={size || 24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    </svg>
);