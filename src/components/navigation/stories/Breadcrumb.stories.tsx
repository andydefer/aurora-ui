// src/components/navigation/stories/Breadcrumb.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from '../Breadcrumb';
import { Text } from '../../typography/Text';
import { Card } from '../../overlay/Card';
import {
    Home, User, Settings, Bell, Mail, Star, Folder, File, Zap,
    Award, Briefcase, BookOpen,
    AlertTriangle
} from 'lucide-react';

const meta: Meta<typeof Breadcrumb> = {
    title: 'Navigation/Breadcrumb',
    component: Breadcrumb,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un fil d\'Ariane moderne et élégant pour naviguer dans la hiérarchie des pages. Scrollable horizontalement par défaut.',
            },
        },
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'],
            description: 'Taille du texte',
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'destructive', 'success', 'warning'],
            description: 'Couleur des liens',
        },
        activeColor: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'destructive', 'success', 'warning'],
            description: 'Couleur de l\'élément actif',
        },
        variant: {
            control: 'select',
            options: ['default', 'outlined', 'minimal', 'pill', 'dark'],
            description: 'Style visuel',
        },
        separatorType: {
            control: 'select',
            options: ['chevron', 'slash', 'arrow', 'dot'],
            description: 'Type de séparateur',
        },
        truncate: { control: 'boolean' },
        showHome: { control: 'boolean' },
        maxItems: { control: 'number' },
        animated: { control: 'boolean' },
        showBadges: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

// ============ DONNÉES ============

const simpleItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Produits', href: '/products' },
    { label: 'Électronique', href: '/products/electronics' },
    { label: 'Smartphones', href: '/products/electronics/smartphones' },
    { label: 'iPhone 15 Pro', active: true },
];

const itemsWithIcons = [
    { label: 'Accueil', href: '/', icon: <Home size={14} /> },
    { label: 'Profil', href: '/profile', icon: <User size={14} /> },
    { label: 'Paramètres', href: '/settings', icon: <Settings size={14} /> },
    { label: 'Notifications', href: '/settings/notifications', icon: <Bell size={14} /> },
    { label: 'Alertes', active: true, icon: <Bell size={14} /> },
];

const itemsWithBadges = [
    { label: 'Accueil', href: '/', icon: <Home size={14} /> },
    { label: 'Messages', href: '/messages', icon: <Mail size={14} />, badge: 12 },
    { label: 'Notifications', href: '/notifications', icon: <Bell size={14} />, badge: 3 },
    { label: 'Alertes', active: true, icon: <AlertTriangle size={14} />, badge: 1 },
];

const longItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Catégorie', href: '/category' },
    { label: 'Sous-catégorie', href: '/category/sub' },
    { label: 'Sous-sous-catégorie', href: '/category/sub/sub' },
    { label: 'Article', href: '/category/sub/sub/article' },
    { label: 'Détails', href: '/category/sub/sub/article/details' },
    { label: 'Version finale', active: true },
];

const creativeItems = [
    { label: 'Dashboard', href: '/', icon: <Zap size={14} /> },
    { label: 'Projets', href: '/projects', icon: <Briefcase size={14} /> },
    { label: 'Design', href: '/projects/design', icon: <Award size={14} /> },
    { label: 'UI/UX', href: '/projects/design/uiux', icon: <Star size={14} /> },
    { label: 'Composants', active: true, icon: <BookOpen size={14} /> },
];

const veryLongItems = [
    { label: 'Accueil', href: '/', icon: <Home size={14} /> },
    { label: 'Catégories', href: '/categories', icon: <Folder size={14} /> },
    { label: 'Électronique', href: '/categories/electronics', icon: <Zap size={14} /> },
    { label: 'Smartphones', href: '/categories/electronics/smartphones' },
    { label: 'iPhone 15 Pro', href: '/categories/electronics/smartphones/iphone-15' },
    { label: 'Accessoires', href: '/categories/electronics/smartphones/iphone-15/accessories' },
    { label: 'Coques', href: '/categories/electronics/smartphones/iphone-15/accessories/cases' },
    { label: 'Transparent', href: '/categories/electronics/smartphones/iphone-15/accessories/cases/transparent' },
    { label: 'Avis', href: '/categories/electronics/smartphones/iphone-15/accessories/cases/transparent/reviews' },
    { label: 'Détails', active: true },
];

// ============ COMPOSANT AVEC CONTENEUR ============

const BreadcrumbDemo = (args: any) => (
    <div className="w-full max-w-3xl">
        <Card variant="default" radius="lg" shadow="sm" className="p-6">
            <div className="mb-4">
                <Text variant="h6" className="font-bold text-foreground">Navigation</Text>
                <Text variant="small" color="muted" className="mt-1">
                    Vous êtes ici :
                </Text>
            </div>
            <Breadcrumb {...args} />
        </Card>
    </div>
);

// ============ STORIES ============

export const Default: Story = {
    render: (args) => <BreadcrumbDemo {...args} />,
    args: {
        items: simpleItems,
        size: 'md',
        color: 'primary',
        activeColor: 'primary',
        variant: 'default',
        separatorType: 'chevron',
        showHome: true,
        truncate: false,
        animated: true,
        showBadges: true,
    },
};

export const WithIcons: Story = {
    render: (args) => <BreadcrumbDemo {...args} />,
    args: {
        items: itemsWithIcons,
        size: 'md',
        color: 'primary',
        activeColor: 'primary',
        variant: 'default',
        separatorType: 'chevron',
        showHome: false,
        truncate: false,
        animated: true,
    },
};

export const WithBadges: Story = {
    render: (args) => <BreadcrumbDemo {...args} />,
    args: {
        items: itemsWithBadges,
        size: 'md',
        color: 'primary',
        activeColor: 'primary',
        variant: 'default',
        separatorType: 'chevron',
        showHome: true,
        truncate: false,
        animated: true,
        showBadges: true,
    },
};

export const Minimal: Story = {
    render: (args) => <BreadcrumbDemo {...args} />,
    args: {
        items: simpleItems,
        size: 'md',
        color: 'primary',
        activeColor: 'primary',
        variant: 'minimal',
        separatorType: 'chevron',
        showHome: true,
        truncate: false,
        animated: false,
    },
};

export const Pill: Story = {
    render: (args) => <BreadcrumbDemo {...args} />,
    args: {
        items: simpleItems,
        size: 'md',
        color: 'primary',
        activeColor: 'primary',
        variant: 'pill',
        separatorType: 'chevron',
        showHome: true,
        truncate: false,
        animated: true,
    },
};

export const Dark: Story = {
    render: (args) => <BreadcrumbDemo {...args} />,
    args: {
        items: simpleItems,
        size: 'md',
        color: 'primary',
        activeColor: 'primary',
        variant: 'dark',
        separatorType: 'chevron',
        showHome: true,
        truncate: false,
        animated: true,
    },
};

export const Outlined: Story = {
    render: (args) => <BreadcrumbDemo {...args} />,
    args: {
        items: simpleItems,
        size: 'md',
        color: 'primary',
        activeColor: 'primary',
        variant: 'outlined',
        separatorType: 'chevron',
        showHome: true,
        truncate: false,
        animated: true,
    },
};

export const WithSlash: Story = {
    render: (args) => <BreadcrumbDemo {...args} />,
    args: {
        items: simpleItems,
        size: 'md',
        color: 'primary',
        activeColor: 'primary',
        variant: 'default',
        separatorType: 'slash',
        showHome: true,
        truncate: false,
        animated: true,
    },
};

export const WithDot: Story = {
    render: (args) => <BreadcrumbDemo {...args} />,
    args: {
        items: simpleItems,
        size: 'md',
        color: 'primary',
        activeColor: 'primary',
        variant: 'default',
        separatorType: 'dot',
        showHome: true,
        truncate: false,
        animated: true,
    },
};

export const Truncated: Story = {
    render: (args) => <BreadcrumbDemo {...args} />,
    args: {
        items: simpleItems,
        size: 'md',
        color: 'primary',
        activeColor: 'primary',
        variant: 'default',
        separatorType: 'chevron',
        showHome: true,
        truncate: true,
        animated: true,
    },
};

export const WithMaxItems: Story = {
    render: (args) => <BreadcrumbDemo {...args} />,
    args: {
        items: longItems,
        maxItems: 4,
        size: 'md',
        color: 'primary',
        activeColor: 'primary',
        variant: 'default',
        separatorType: 'chevron',
        showHome: true,
        truncate: false,
        animated: true,
    },
};

// ============ TAILLES ============

export const AllSizes: Story = {
    render: () => (
        <div className="space-y-4 w-full max-w-3xl">
            <Text variant="h6" className="font-bold">Toutes les tailles</Text>
            <Card variant="default" radius="lg" shadow="sm" className="p-4">
                <Breadcrumb items={simpleItems} size="xs" />
            </Card>
            <Card variant="default" radius="lg" shadow="sm" className="p-4">
                <Breadcrumb items={simpleItems} size="sm" />
            </Card>
            <Card variant="default" radius="lg" shadow="sm" className="p-4">
                <Breadcrumb items={simpleItems} size="md" />
            </Card>
            <Card variant="default" radius="lg" shadow="sm" className="p-4">
                <Breadcrumb items={simpleItems} size="lg" />
            </Card>
            <Card variant="default" radius="lg" shadow="sm" className="p-4">
                <Breadcrumb items={simpleItems} size="xl" />
            </Card>
        </div>
    ),
};

// ============ COULEURS ============

export const AllColors: Story = {
    render: () => (
        <div className="space-y-4 w-full max-w-3xl">
            <Text variant="h6" className="font-bold">Toutes les couleurs</Text>
            <Card variant="default" radius="lg" shadow="sm" className="p-4">
                <Breadcrumb items={simpleItems} color="primary" activeColor="primary" />
            </Card>
            <Card variant="default" radius="lg" shadow="sm" className="p-4">
                <Breadcrumb items={simpleItems} color="secondary" activeColor="secondary" />
            </Card>
            <Card variant="default" radius="lg" shadow="sm" className="p-4">
                <Breadcrumb items={simpleItems} color="success" activeColor="success" />
            </Card>
            <Card variant="default" radius="lg" shadow="sm" className="p-4">
                <Breadcrumb items={simpleItems} color="warning" activeColor="warning" />
            </Card>
            <Card variant="default" radius="lg" shadow="sm" className="p-4">
                <Breadcrumb items={simpleItems} color="destructive" activeColor="destructive" />
            </Card>
            <Card variant="default" radius="lg" shadow="sm" className="p-4">
                <Breadcrumb items={simpleItems} color="muted" activeColor="muted" />
            </Card>
        </div>
    ),
};

// ============ SCROLLABLE (PAR DÉFAUT) ============

export const VeryLongBreadcrumb: Story = {
    render: () => (
        <div className="w-full max-w-md">
            <Card variant="default" radius="lg" shadow="sm" className="p-4">
                <Text variant="small" className="font-medium mb-3">Long fil d'Ariane (scrollable par défaut)</Text>
                <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-card to-transparent pointer-events-none z-10 rounded-l-xl" />
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-card to-transparent pointer-events-none z-10 rounded-r-xl" />
                    <Breadcrumb
                        items={veryLongItems}
                        size="sm"
                        color="primary"
                        activeColor="primary"
                        variant="default"
                        separatorType="chevron"
                        showHome={false}
                        truncate
                        className="max-w-full"
                    />
                </div>
                <Text variant="caption" color="muted" className="mt-3 block text-center">
                    ↕ Faites défiler horizontalement pour voir tous les éléments
                </Text>
            </Card>
        </div>
    ),
};

export const VeryLongPillBreadcrumb: Story = {
    render: () => (
        <div className="w-full max-w-md">
            <Card variant="default" radius="lg" shadow="sm" className="p-4">
                <Text variant="small" className="font-medium mb-3">Long en mode Pill (scrollable)</Text>
                <Breadcrumb
                    items={veryLongItems}
                    size="sm"
                    color="primary"
                    activeColor="primary"
                    variant="pill"
                    separatorType="dot"
                    animated
                    showHome={false}
                    className="max-w-full"
                />
                <Text variant="caption" color="muted" className="mt-3 block text-center">
                    ↕ Faites défiler horizontalement pour voir tous les éléments
                </Text>
            </Card>
        </div>
    ),
};

// ============ CAS D'USAGE ============

export const DashboardBreadcrumb: Story = {
    render: () => (
        <div className="w-full max-w-3xl">
            <Card variant="elevated" radius="lg" shadow="md" className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <Text variant="h5" className="font-bold">Tableau de bord</Text>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Dernière mise à jour :</span>
                        <span className="text-xs font-medium text-foreground">Aujourd'hui 14:30</span>
                    </div>
                </div>
                <Breadcrumb
                    items={[
                        { label: 'Dashboard', href: '/', icon: <Home size={14} /> },
                        { label: 'Analytics', href: '/analytics', icon: <Zap size={14} /> },
                        { label: 'Rapports', href: '/analytics/reports', icon: <File size={14} /> },
                        { label: 'Q4 2024', active: true, icon: <File size={14} /> },
                    ]}
                    size="lg"
                    color="primary"
                    activeColor="primary"
                    variant="pill"
                    separatorType="chevron"
                    animated
                />
                <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/10 text-center">
                        <Text variant="h4" className="font-bold text-primary">€45,231</Text>
                        <Text variant="small" color="muted">Revenus</Text>
                    </div>
                    <div className="p-4 bg-success/5 rounded-lg border border-success/10 text-center">
                        <Text variant="h4" className="font-bold text-success">1,234</Text>
                        <Text variant="small" color="muted">Utilisateurs</Text>
                    </div>
                    <div className="p-4 bg-warning/5 rounded-lg border border-warning/10 text-center">
                        <Text variant="h4" className="font-bold text-warning">89%</Text>
                        <Text variant="small" color="muted">Taux conversion</Text>
                    </div>
                </div>
            </Card>
        </div>
    ),
};

export const CreativeBreadcrumb: Story = {
    render: () => (
        <div className="w-full max-w-3xl">
            <Card variant="gradient" gradientFrom="primary" gradientTo="secondary" radius="lg" shadow="md" className="p-6 text-white">
                <Breadcrumb
                    items={creativeItems}
                    size="lg"
                    color="primary"
                    activeColor="primary"
                    variant="dark"
                    separatorType="dot"
                    animated
                    showBadges
                />
                <div className="mt-6 flex items-center justify-between">
                    <div>
                        <Text variant="h4" className="font-bold text-white">Composants UI/UX</Text>
                        <Text className="text-white/80">Bibliothèque de composants réutilisables</Text>
                    </div>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">12 composants</span>
                        <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">React</span>
                    </div>
                </div>
            </Card>
        </div>
    ),
};

// ============ COMPARAISON ============

export const AllVariants: Story = {
    render: () => (
        <div className="space-y-4 w-full max-w-3xl">
            <Text variant="h6" className="font-bold">Toutes les variantes</Text>
            <Card variant="default" radius="lg" shadow="sm" className="p-4">
                <Text variant="small" className="font-medium mb-2">Default</Text>
                <Breadcrumb items={simpleItems} variant="default" />
            </Card>
            <Card variant="default" radius="lg" shadow="sm" className="p-4">
                <Text variant="small" className="font-medium mb-2">Outlined</Text>
                <Breadcrumb items={simpleItems} variant="outlined" />
            </Card>
            <Card variant="default" radius="lg" shadow="sm" className="p-4">
                <Text variant="small" className="font-medium mb-2">Minimal</Text>
                <Breadcrumb items={simpleItems} variant="minimal" />
            </Card>
            <Card variant="default" radius="lg" shadow="sm" className="p-4">
                <Text variant="small" className="font-medium mb-2">Pill</Text>
                <Breadcrumb items={simpleItems} variant="pill" />
            </Card>
            <Card variant="default" radius="lg" shadow="sm" className="p-4">
                <Text variant="small" className="font-medium mb-2">Dark</Text>
                <Breadcrumb items={simpleItems} variant="dark" />
            </Card>
        </div>
    ),
};

export const AllSeparators: Story = {
    render: () => (
        <div className="space-y-4 w-full max-w-3xl">
            <Text variant="h6" className="font-bold">Tous les séparateurs</Text>
            <Card variant="default" radius="lg" shadow="sm" className="p-4">
                <Text variant="small" className="font-medium mb-2">Chevron</Text>
                <Breadcrumb items={simpleItems} separatorType="chevron" />
            </Card>
            <Card variant="default" radius="lg" shadow="sm" className="p-4">
                <Text variant="small" className="font-medium mb-2">Slash</Text>
                <Breadcrumb items={simpleItems} separatorType="slash" />
            </Card>
            <Card variant="default" radius="lg" shadow="sm" className="p-4">
                <Text variant="small" className="font-medium mb-2">Arrow</Text>
                <Breadcrumb items={simpleItems} separatorType="arrow" />
            </Card>
            <Card variant="default" radius="lg" shadow="sm" className="p-4">
                <Text variant="small" className="font-medium mb-2">Dot</Text>
                <Breadcrumb items={simpleItems} separatorType="dot" />
            </Card>
        </div>
    ),
};

// ============ INTERACTIF ============

export const InteractivePlayground: Story = {
    render: (args) => <BreadcrumbDemo {...args} />,
    args: {
        items: simpleItems,
        size: 'md',
        color: 'primary',
        activeColor: 'primary',
        variant: 'default',
        separatorType: 'chevron',
        showHome: true,
        truncate: false,
        maxItems: undefined,
        animated: true,
        showBadges: true,
    },
};