// src/components/overlay/stories/Accordion.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem } from '../Accordion';
import { Home, User, Settings, Bell, Mail, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '../../feedback/Badge';
import { Button } from '../../forms/Button';
import { Text } from '../../typography/Text';

const meta: Meta<typeof Accordion> = {
    title: 'Overlay/Accordion',
    component: Accordion,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un accordéon flexible et accessible pour afficher du contenu de manière organisée.',
            },
        },
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'bordered', 'ghost', 'minimal'],
            description: 'Style visuel de l\'accordéon',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Taille du texte',
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'destructive', 'success', 'warning'],
            description: 'Couleur d\'accentuation',
        },
        multiple: {
            control: 'boolean',
            description: 'Permettre l\'ouverture multiple',
        },
        animate: {
            control: 'boolean',
            description: 'Animation au survol',
        },
        showIcon: {
            control: 'boolean',
            description: 'Afficher l\'icône d\'expansion',
        },
        iconType: {
            control: 'select',
            options: ['chevron', 'plus', 'eye'],
            description: 'Type d\'icône d\'expansion',
        },
        defaultOpen: {
            control: 'object',
            description: 'Éléments ouverts par défaut',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

// Données d'exemple
const defaultItems = [
    {
        id: '1',
        title: "Qu'est-ce qu'un design system ?",
        description: 'Comprendre les bases',
        badge: 'Populaire',
        children: (
            <div className="space-y-2">
                <Text className='text-foreground/70'>
                    Un design system est un ensemble de composants réutilisables,
                    de règles de conception et de standards qui permettent de créer
                    des interfaces cohérentes et évolutives.
                </Text>
                <div className="flex gap-2 mt-2">
                    <Badge variant="primary">UI</Badge>
                    <Badge variant="success">UX</Badge>
                    <Badge variant="info">Design</Badge>
                </div>
            </div>
        ),
    },
    {
        id: '2',
        title: "Pourquoi utiliser un design system ?",
        description: "Les avantages pour l'équipe",
        children: (
            <div className="space-y-2">
                <Text>
                    Un design system permet de :
                </Text>
                <ul className="list-disc list-inside space-y-1 text-foreground/70">
                    <li>Maintenir une cohérence visuelle</li>
                    <li>Accélérer le développement</li>
                    <li>Faciliter la collaboration</li>
                    <li>Réduire les coûts de maintenance</li>
                </ul>
            </div>
        ),
    },
    {
        id: '3',
        title: 'Comment démarrer ?',
        description: 'Guide pas à pas',
        badge: 'Nouveau',
        children: (
            <div className="space-y-3">
                <Text>
                    Voici les étapes pour créer votre design system :
                </Text>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-muted/10 rounded-md">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold">1</span>
                        <span className="text-foreground">Audit de l'existant</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-muted/10 rounded-md">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold">2</span>
                        <span className="text-foreground">Définir les principes</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-muted/10 rounded-md">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold">3</span>
                        <span className="text-foreground">Créer les composants</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-muted/10 rounded-md">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold">4</span>
                        <span className="text-foreground">Documenter et itérer</span>
                    </div>
                </div>
            </div>
        ),
    },
];

const itemsWithIcons = [
    {
        id: '1',
        title: 'Tableau de bord',
        icon: <Home size={20} />,
        description: "Vue d'ensemble",
        children: <Text>Contenu du tableau de bord avec statistiques et graphiques.</Text>,
    },
    {
        id: '2',
        title: 'Profil utilisateur',
        icon: <User size={20} />,
        description: 'Informations personnelles',
        children: <Text>Gestion du profil, des préférences et des paramètres.</Text>,
    },
    {
        id: '3',
        title: 'Paramètres',
        icon: <Settings size={20} />,
        description: 'Configuration',
        badge: 'Beta',
        children: <Text>Configuration avancée et préférences système.</Text>,
    },
];

// Stories
export const Default: Story = {
    args: {
        items: defaultItems,
        variant: 'default',
        size: 'md',
        color: 'primary',
        multiple: false,
        animate: true,
        showIcon: true,
        iconType: 'chevron',
        defaultOpen: ['1'],
    },
};

export const WithIcons: Story = {
    args: {
        items: itemsWithIcons,
        variant: 'default',
        size: 'md',
        color: 'primary',
        multiple: true,
        animate: true,
        showIcon: true,
        iconType: 'chevron',
        defaultOpen: ['1'],
    },
    parameters: {
        docs: {
            description: {
                story: 'Accordéon avec icônes pour une meilleure hiérarchie visuelle.',
            },
        },
    },
};

export const WithoutIcon: Story = {
    args: {
        items: defaultItems,
        variant: 'default',
        size: 'md',
        color: 'primary',
        multiple: false,
        animate: true,
        showIcon: false,
        defaultOpen: ['1'],
    },
    parameters: {
        docs: {
            description: {
                story: "Accordéon sans icône d'expansion.",
            },
        },
    },
};

export const WithPlusIcon: Story = {
    args: {
        items: defaultItems,
        variant: 'default',
        size: 'md',
        color: 'primary',
        multiple: true,
        animate: true,
        showIcon: true,
        iconType: 'plus',
        defaultOpen: ['1'],
    },
    parameters: {
        docs: {
            description: {
                story: 'Accordéon avec des icônes + et -.',
            },
        },
    },
};

export const WithEyeIcon: Story = {
    args: {
        items: defaultItems,
        variant: 'default',
        size: 'md',
        color: 'primary',
        multiple: true,
        animate: true,
        showIcon: true,
        iconType: 'eye',
        defaultOpen: ['1'],
    },
    parameters: {
        docs: {
            description: {
                story: 'Accordéon avec des icônes Eye et EyeOff.',
            },
        },
    },
};

export const WithCustomExpandIcon: Story = {
    args: {
        items: defaultItems,
        variant: 'default',
        size: 'md',
        color: 'primary',
        multiple: true,
        animate: true,
        showIcon: true,
        iconType: 'chevron',
        expandIcon: <ChevronDown size={24} className="text-success" />,
        collapseIcon: <ChevronUp size={24} className="text-destructive" />,
        defaultOpen: ['1'],
    },
    parameters: {
        docs: {
            description: {
                story: 'Accordéon avec des icônes personnalisées (vert pour ouvrir, rouge pour fermer).',
            },
        },
    },
};

export const BorderedVariant: Story = {
    args: {
        items: defaultItems,
        variant: 'bordered',
        size: 'md',
        color: 'primary',
        multiple: true,
        animate: true,
        showIcon: true,
        iconType: 'chevron',
        defaultOpen: ['1', '2'],
    },
    parameters: {
        docs: {
            description: {
                story: 'Variante avec bordure renforcée et ombre.',
            },
        },
    },
};

export const GhostVariant: Story = {
    args: {
        items: defaultItems,
        variant: 'ghost',
        size: 'md',
        color: 'primary',
        multiple: true,
        animate: true,
        showIcon: true,
        iconType: 'chevron',
        defaultOpen: ['1'],
    },
    parameters: {
        docs: {
            description: {
                story: 'Variante épurée sans bordure visible.',
            },
        },
    },
};

export const MinimalVariant: Story = {
    args: {
        items: defaultItems,
        variant: 'minimal',
        size: 'md',
        color: 'primary',
        multiple: true,
        animate: false,
        showIcon: true,
        iconType: 'chevron',
        defaultOpen: ['1'],
    },
    parameters: {
        docs: {
            description: {
                story: 'Variante très minimaliste sans décoration.',
            },
        },
    },
};

export const SmallSize: Story = {
    args: {
        items: defaultItems,
        variant: 'default',
        size: 'sm',
        color: 'primary',
        multiple: true,
        animate: true,
        showIcon: true,
        iconType: 'chevron',
        defaultOpen: ['1'],
    },
};

export const LargeSize: Story = {
    args: {
        items: defaultItems,
        variant: 'default',
        size: 'lg',
        color: 'primary',
        multiple: true,
        animate: true,
        showIcon: true,
        iconType: 'chevron',
        defaultOpen: ['1'],
    },
};

export const DangerColor: Story = {
    args: {
        items: defaultItems,
        variant: 'default',
        size: 'md',
        color: 'destructive',
        multiple: true,
        animate: true,
        showIcon: true,
        iconType: 'chevron',
        defaultOpen: ['1'],
    },
};

export const SuccessColor: Story = {
    args: {
        items: defaultItems,
        variant: 'default',
        size: 'md',
        color: 'success',
        multiple: true,
        animate: true,
        showIcon: true,
        iconType: 'chevron',
        defaultOpen: ['1'],
    },
};

export const MultipleOpen: Story = {
    args: {
        items: defaultItems,
        variant: 'default',
        size: 'md',
        color: 'primary',
        multiple: true,
        animate: true,
        showIcon: true,
        iconType: 'chevron',
        defaultOpen: ['1', '2'],
    },
    parameters: {
        docs: {
            description: {
                story: "Permet d'ouvrir plusieurs sections simultanément.",
            },
        },
    },
};

export const WithCustomChildren: Story = {
    render: () => (
        <Accordion
            variant="default"
            size="md"
            color="primary"
            multiple
            defaultOpen={['1']}
            showIcon={true}
            iconType="chevron"
        >
            <AccordionItem
                id="1"
                title="Section personnalisée"
                icon={<Home size={20} />}
                description="Contenu entièrement personnalisé"
            >
                <div className="space-y-3">
                    <Text>Ce contenu est passé via les children.</Text>
                    <div className="flex gap-2">
                        <Button variant="primary" size="sm">Action 1</Button>
                        <Button variant="outline" size="sm">Action 2</Button>
                    </div>
                </div>
            </AccordionItem>
            <AccordionItem
                id="2"
                title="Autre section"
                icon={<Bell size={20} />}
                badge="Important"
            >
                <Text>Contenu de la deuxième section.</Text>
            </AccordionItem>
        </Accordion>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Utilisation avec des children personnalisés plutôt que des items.',
            },
        },
    },
};

export const WithBadges: Story = {
    render: () => (
        <Accordion
            variant="default"
            size="md"
            color="primary"
            multiple
            defaultOpen={['1']}
            showIcon={true}
            iconType="chevron"
        >
            <AccordionItem
                id="1"
                title="Notifications"
                icon={<Bell size={20} />}
                badge="3"
                description="Messages non lus"
            >
                <Text>Contenu des notifications.</Text>
            </AccordionItem>
            <AccordionItem
                id="2"
                title="Messages"
                icon={<Mail size={20} />}
                badge="12"
            >
                <Text>Contenu des messages.</Text>
            </AccordionItem>
            <AccordionItem
                id="3"
                title="Favoris"
                icon={<Heart size={20} />}
                badge="5"
            >
                <Text>Contenu des favoris.</Text>
            </AccordionItem>
        </Accordion>
    ),
};

export const AllIconTypes: Story = {
    render: () => (
        <div className="space-y-6 max-w-2xl w-full">
            <div>
                <Text variant="h5" className="mb-2">Chevron (par défaut)</Text>
                <Accordion
                    items={defaultItems.slice(0, 2)}
                    variant="default"
                    size="md"
                    defaultOpen={['1']}
                    showIcon={true}
                    iconType="chevron"
                />
            </div>
            <div>
                <Text variant="h5" className="mb-2">Plus / Minus</Text>
                <Accordion
                    items={defaultItems.slice(0, 2)}
                    variant="default"
                    size="md"
                    defaultOpen={['1']}
                    showIcon={true}
                    iconType="plus"
                />
            </div>
            <div>
                <Text variant="h5" className="mb-2">Eye / EyeOff</Text>
                <Accordion
                    items={defaultItems.slice(0, 2)}
                    variant="default"
                    size="md"
                    defaultOpen={['1']}
                    showIcon={true}
                    iconType="eye"
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comparaison de tous les types d'icônes disponibles.",
            },
        },
    },
};

export const AllVariants: Story = {
    render: () => (
        <div className="space-y-6 max-w-2xl w-full">
            <div>
                <Text variant="h5" className="mb-2">Default</Text>
                <Accordion
                    items={defaultItems.slice(0, 2)}
                    variant="default"
                    size="md"
                    defaultOpen={['1']}
                    showIcon={true}
                    iconType="chevron"
                />
            </div>
            <div>
                <Text variant="h5" className="mb-2">Bordered</Text>
                <Accordion
                    items={defaultItems.slice(0, 2)}
                    variant="bordered"
                    size="md"
                    defaultOpen={['1']}
                    showIcon={true}
                    iconType="chevron"
                />
            </div>
            <div>
                <Text variant="h5" className="mb-2">Ghost</Text>
                <Accordion
                    items={defaultItems.slice(0, 2)}
                    variant="ghost"
                    size="md"
                    defaultOpen={['1']}
                    showIcon={true}
                    iconType="chevron"
                />
            </div>
            <div>
                <Text variant="h5" className="mb-2">Minimal</Text>
                <Accordion
                    items={defaultItems.slice(0, 2)}
                    variant="minimal"
                    size="md"
                    defaultOpen={['1']}
                    showIcon={true}
                    iconType="chevron"
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Comparaison de toutes les variantes disponibles.',
            },
        },
    },
};

export const InteractivePlayground: Story = {
    args: {
        items: defaultItems,
        variant: 'default',
        size: 'md',
        color: 'primary',
        multiple: true,
        animate: true,
        showIcon: true,
        iconType: 'chevron',
        defaultOpen: ['1'],
    },
    parameters: {
        docs: {
            description: {
                story: 'Playground interactif pour tester toutes les options.',
            },
        },
    },
};