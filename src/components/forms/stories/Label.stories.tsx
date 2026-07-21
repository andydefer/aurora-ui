// src/components/forms/stories/Label.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '../Label';
import { Input } from '../Input';
import { Text } from '../../typography/Text';
import { User, Mail, Lock, Star, Heart } from 'lucide-react';

const meta: Meta<typeof Label> = {
    title: 'Forms/Label',
    component: Label,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un label personnalisable pour les champs de formulaire avec support requis, optionnel et tooltip.',
            },
        },
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'],
            description: 'Taille du label',
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'destructive', 'success', 'warning'],
            description: 'Couleur du label',
        },
        required: { control: 'boolean' },
        optional: { control: 'boolean' },
        tooltip: { control: 'text' },
        hidden: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Label>;

// ============ STORIES ============

export const Default: Story = {
    render: () => (
        <div className="w-full max-w-md space-y-4">
            <Label htmlFor="name">Nom complet</Label>
            <Input id="name" placeholder="Jean Dupont" size="lg" />
        </div>
    ),
};

export const Required: Story = {
    render: () => (
        <div className="w-full max-w-md space-y-4">
            <Label htmlFor="email" required>Email</Label>
            <Input id="email" type="email" placeholder="jean@email.com" size="lg" required />
        </div>
    ),
};

export const Optional: Story = {
    render: () => (
        <div className="w-full max-w-md space-y-4">
            <Label htmlFor="phone" optional>Téléphone</Label>
            <Input id="phone" type="tel" placeholder="06 12 34 56 78" size="lg" />
        </div>
    ),
};

export const WithTooltip: Story = {
    render: () => (
        <div className="w-full max-w-md space-y-4">
            <Label htmlFor="password" tooltip="Minimum 8 caractères, 1 majuscule, 1 chiffre">
                Mot de passe
            </Label>
            <Input id="password" type="password" placeholder="Entrez votre mot de passe" size="lg" />
        </div>
    ),
};

export const RequiredWithTooltip: Story = {
    render: () => (
        <div className="w-full max-w-md space-y-4">
            <Label htmlFor="email" required tooltip="Veuillez entrer une adresse email valide">
                Email
            </Label>
            <Input id="email" type="email" placeholder="jean@email.com" size="lg" required />
        </div>
    ),
};

export const WithIcon: Story = {
    render: () => (
        <div className="w-full max-w-md space-y-4">
            <Label htmlFor="username" icon={<User size={16} />}>
                Nom d'utilisateur
            </Label>
            <Input id="username" placeholder="jean.dupont" leftIcon={<User size={18} />} size="lg" />
        </div>
    ),
};


// ============ TAILLES ============

export const AllSizes: Story = {
    render: () => (
        <div className="space-y-6 w-full max-w-md">
            <Text variant="h6" className="font-bold">Toutes les tailles</Text>

            <div className="space-y-2">
                <Label size="xs">Label XS</Label>
                <Input size="xs" placeholder="Input XS" />
            </div>

            <div className="space-y-2">
                <Label size="sm">Label SM</Label>
                <Input size="sm" placeholder="Input SM" />
            </div>

            <div className="space-y-2">
                <Label size="md">Label MD</Label>
                <Input size="md" placeholder="Input MD" />
            </div>

            <div className="space-y-2">
                <Label size="lg">Label LG</Label>
                <Input size="lg" placeholder="Input LG" />
            </div>

            <div className="space-y-2">
                <Label size="xl">Label XL</Label>
                <Input size="xl" placeholder="Input XL" />
            </div>

            <div className="space-y-2">
                <Label size="2xl">Label 2XL</Label>
                <Input size="2xl" placeholder="Input 2XL" />
            </div>
        </div>
    ),
};

// ============ COULEURS ============

export const AllColors: Story = {
    render: () => (
        <div className="space-y-4 w-full max-w-md">
            <Text variant="h6" className="font-bold">Toutes les couleurs</Text>

            <div className="space-y-2">
                <Label color="primary">Label Primary</Label>
                <Input placeholder="Primary" size="lg" />
            </div>

            <div className="space-y-2">
                <Label color="secondary">Label Secondary</Label>
                <Input placeholder="Secondary" size="lg" />
            </div>

            <div className="space-y-2">
                <Label color="success">Label Success</Label>
                <Input placeholder="Success" size="lg" />
            </div>

            <div className="space-y-2">
                <Label color="warning">Label Warning</Label>
                <Input placeholder="Warning" size="lg" />
            </div>

            <div className="space-y-2">
                <Label color="destructive">Label Destructive</Label>
                <Input placeholder="Destructive" size="lg" />
            </div>

            <div className="space-y-2">
                <Label color="muted">Label Muted</Label>
                <Input placeholder="Muted" size="lg" />
            </div>
        </div>
    ),
};

// ============ AVEC ICÔNES ============

export const WithDifferentIcons: Story = {
    render: () => (
        <div className="space-y-4 w-full max-w-md">
            <Text variant="h6" className="font-bold">Avec icônes</Text>

            <div className="space-y-2">
                <Label htmlFor="user" icon={<User size={16} />}>
                    Utilisateur
                </Label>
                <Input id="user" placeholder="Nom d'utilisateur" size="lg" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="mail" icon={<Mail size={16} />}>
                    Email
                </Label>
                <Input id="mail" type="email" placeholder="email@example.com" size="lg" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="lock" icon={<Lock size={16} />} required>
                    Mot de passe
                </Label>
                <Input id="lock" type="password" placeholder="Mot de passe" size="lg" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="star" icon={<Star size={16} />} optional>
                    Évaluation
                </Label>
                <Input id="star" placeholder="Note sur 5" size="lg" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="heart" icon={<Heart size={16} />} iconPosition="right">
                    Favoris
                </Label>
                <Input id="heart" placeholder="Ajouter aux favoris" size="lg" />
            </div>
        </div>
    ),
};

// ============ AVEC TOOLTIP ============

export const WithTooltipExamples: Story = {
    render: () => (
        <div className="space-y-4 w-full max-w-md">
            <Text variant="h6" className="font-bold">Avec tooltip</Text>

            <div className="space-y-2">
                <Label htmlFor="name" tooltip="Veuillez entrer votre nom complet">
                    Nom complet
                </Label>
                <Input id="name" placeholder="Jean Dupont" size="lg" />
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="email"
                    required
                    tooltip="Format attendu: nom@domaine.com"
                >
                    Email
                </Label>
                <Input id="email" type="email" placeholder="jean@email.com" size="lg" required />
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="password"
                    required
                    tooltip="Minimum 8 caractères, 1 majuscule, 1 chiffre et 1 symbole"
                >
                    Mot de passe
                </Label>
                <Input id="password" type="password" placeholder="Entrez votre mot de passe" size="lg" required />
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="phone"
                    optional
                    tooltip="Format: 06 12 34 56 78"
                >
                    Téléphone
                </Label>
                <Input id="phone" type="tel" placeholder="06 12 34 56 78" size="lg" />
            </div>
        </div>
    ),
};

// ============ FORMULAIRE ============

export const FormExample: Story = {
    render: () => (
        <div className="w-full max-w-lg p-6 bg-card rounded-md border border-border space-y-5">
            <Text variant="h5" className="font-bold">Créer un compte</Text>

            <div className="space-y-2">
                <Label htmlFor="fullname" required icon={<User size={16} />}>
                    Nom complet
                </Label>
                <Input id="fullname" placeholder="Jean Dupont" size="lg" required />
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="email"
                    required
                    icon={<Mail size={16} />}
                    tooltip="Veuillez entrer une adresse email valide"
                >
                    Email
                </Label>
                <Input id="email" type="email" placeholder="jean@email.com" size="lg" required />
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="password"
                    required
                    icon={<Lock size={16} />}
                    tooltip="Minimum 8 caractères, 1 majuscule, 1 chiffre"
                >
                    Mot de passe
                </Label>
                <Input id="password" type="password" placeholder="Entrez votre mot de passe" size="lg" required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="phone" optional icon={<Lock size={16} />}>
                    Téléphone
                </Label>
                <Input id="phone" type="tel" placeholder="06 12 34 56 78" size="lg" />
            </div>

            <div className="pt-4 border-t border-border">
                <button className="w-full py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors text-base">
                    S'inscrire
                </button>
            </div>
        </div>
    ),
};

// ============ COMPARAISON ============

export const Comparison: Story = {
    render: () => (
        <div className="space-y-6 w-full max-w-md">
            <Text variant="h6" className="font-bold">Comparaison des styles</Text>

            <div className="space-y-2">
                <Label>Label simple</Label>
                <Input placeholder="Simple" size="lg" />
            </div>

            <div className="space-y-2">
                <Label required>Label requis</Label>
                <Input placeholder="Requis" size="lg" required />
            </div>

            <div className="space-y-2">
                <Label optional>Label optionnel</Label>
                <Input placeholder="Optionnel" size="lg" />
            </div>

            <div className="space-y-2">
                <Label tooltip="Ceci est un tooltip">Label avec tooltip</Label>
                <Input placeholder="Tooltip" size="lg" />
            </div>

            <div className="space-y-2">
                <Label required tooltip="Champ obligatoire avec aide">
                    Label avec tout
                </Label>
                <Input placeholder="Tout" size="lg" required />
            </div>

            <div className="space-y-2">
                <Label icon={<Star size={16} />}>Label avec icône</Label>
                <Input placeholder="Icône" size="lg" />
            </div>
        </div>
    ),
};

export const InteractivePlayground: Story = {
    render: (args) => (
        <div className="w-full max-w-md space-y-4">
            <Label {...args}>
                Label interactif
            </Label>
            <Input placeholder="Testez les options..." size="lg" />
        </div>
    ),
    args: {
        htmlFor: 'input',
        required: false,
        optional: false,
        tooltip: 'Ceci est un tooltip interactif',
        hidden: false,
        size: 'md',
        color: 'primary',
    },
};