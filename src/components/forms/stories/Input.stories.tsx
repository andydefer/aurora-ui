// src/components/forms/stories/Input.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../Input';
import { useState } from 'react';
import { Text } from '../../typography/Text';
import { Search, User, Mail, Lock, Phone, MapPin, Calendar, DollarSign, Star, } from 'lucide-react';

const meta: Meta<typeof Input> = {
    title: 'Forms/Input',
    component: Input,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un champ de saisie personnalisable avec label, erreur, icônes et nettoyage.',
            },
        },
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'],
            description: 'Taille du champ',
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'destructive', 'success', 'warning'],
            description: 'Couleur d\'accentuation',
        },
        variant: {
            control: 'select',
            options: ['default', 'outlined', 'filled', 'ghost'],
            description: 'Style visuel',
        },
        type: {
            control: 'select',
            options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
            description: 'Type d\'input',
        },
        label: { control: 'text' },
        placeholder: { control: 'text' },
        description: { control: 'text' },
        error: { control: 'text' },
        success: { control: 'boolean' },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
        fullWidth: { control: 'boolean' },
        rounded: { control: 'boolean' },
        clearable: { control: 'boolean' },
        passwordToggle: { control: 'boolean' },
        leftIcon: { control: 'text' },
        rightIcon: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof Input>;

// ============ COMPOSANT AVEC ÉTAT ============

const InputWithState = (args: any) => {
    const [value, setValue] = useState(args.value || '');
    return (
        <div className="w-full max-w-md">
            <Input
                {...args}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    args.onChange?.(e);
                }}
            />
            {value && (
                <div className="mt-2 text-sm text-muted-foreground">
                    Valeur: <span className="font-mono">{value}</span>
                </div>
            )}
        </div>
    );
};

// ============ STORIES ============

export const Default: Story = {
    render: (args) => <InputWithState {...args} />,
    args: {
        label: 'Nom complet',
        placeholder: 'Jean Dupont',
        size: 'lg',
        color: 'primary',
        variant: 'default',
        fullWidth: true,
    },
};

export const WithLeftIcon: Story = {
    render: (args) => <InputWithState {...args} />,
    args: {
        label: 'Nom d\'utilisateur',
        placeholder: 'jean.dupont',
        leftIcon: <User size={20} />,
        size: 'lg',
        color: 'primary',
    },
};

export const WithRightIcon: Story = {
    render: (args) => <InputWithState {...args} />,
    args: {
        label: 'Email',
        placeholder: 'jean@email.com',
        type: 'email',
        rightIcon: <Mail size={20} />,
        size: 'lg',
        color: 'primary',
    },
};

export const WithBothIcons: Story = {
    render: (args) => <InputWithState {...args} />,
    args: {
        label: 'Rechercher',
        placeholder: 'Rechercher...',
        leftIcon: <Search size={20} />,
        rightIcon: <Star size={20} />,
        size: 'lg',
        color: 'primary',
    },
};

export const Password: Story = {
    render: (args) => <InputWithState {...args} />,
    args: {
        label: 'Mot de passe',
        placeholder: 'Entrez votre mot de passe',
        type: 'password',
        passwordToggle: true,
        size: 'lg',
        color: 'primary',
    },
};

export const Clearable: Story = {
    render: (args) => <InputWithState {...args} />,
    args: {
        label: 'Recherche',
        placeholder: 'Rechercher...',
        clearable: true,
        leftIcon: <Search size={20} />,
        size: 'lg',
        color: 'primary',
    },
};

export const WithError: Story = {
    render: (args) => <InputWithState {...args} />,
    args: {
        label: 'Email',
        placeholder: 'jean@email.com',
        type: 'email',
        error: 'Email invalide',
        size: 'lg',
        color: 'primary',
    },
};

export const WithSuccess: Story = {
    render: (args) => <InputWithState {...args} />,
    args: {
        label: 'Email',
        placeholder: 'jean@email.com',
        type: 'email',
        value: 'jean@email.com',
        success: true,
        size: 'lg',
        color: 'success',
    },
};

export const WithDescription: Story = {
    render: (args) => <InputWithState {...args} />,
    args: {
        label: 'Mot de passe',
        placeholder: 'Entrez votre mot de passe',
        type: 'password',
        description: 'Doit contenir au moins 8 caractères',
        size: 'lg',
        color: 'primary',
    },
};

export const Disabled: Story = {
    render: (args) => <InputWithState {...args} />,
    args: {
        label: 'Email',
        placeholder: 'jean@email.com',
        type: 'email',
        value: 'jean@email.com',
        disabled: true,
        size: 'lg',
        color: 'primary',
    },
};

export const Required: Story = {
    render: (args) => <InputWithState {...args} />,
    args: {
        label: 'Nom complet',
        placeholder: 'Jean Dupont',
        required: true,
        size: 'lg',
        color: 'primary',
    },
};

export const Rounded: Story = {
    render: (args) => <InputWithState {...args} />,
    args: {
        label: 'Recherche',
        placeholder: 'Rechercher...',
        rounded: true,
        leftIcon: <Search size={20} />,
        size: 'lg',
        color: 'primary',
    },
};

// ============ VARIANTES ============

export const AllVariants: Story = {
    render: () => (
        <div className="space-y-4 w-full max-w-md">
            <Text variant="h6" className="font-bold">Variantes</Text>
            <Input label="Default" placeholder="Default" variant="default" size="lg" />
            <Input label="Outlined" placeholder="Outlined" variant="outlined" size="lg" />
            <Input label="Filled" placeholder="Filled" variant="filled" size="lg" />
            <Input label="Ghost" placeholder="Ghost" variant="ghost" size="lg" />
        </div>
    ),
};

// ============ TAILLES ============

export const AllSizes: Story = {
    render: () => (
        <div className="space-y-4 w-full max-w-md">
            <Text variant="h6" className="font-bold">Tailles</Text>
            <Input label="XS" placeholder="Extra small" size="xs" />
            <Input label="SM" placeholder="Small" size="sm" />
            <Input label="MD" placeholder="Medium" size="md" />
            <Input label="LG" placeholder="Large" size="lg" />
            <Input label="XL" placeholder="Extra large" size="xl" />
            <Input label="2XL" placeholder="2XL" size="2xl" />
        </div>
    ),
};

// ============ COULEURS ============

export const AllColors: Story = {
    render: () => (
        <div className="space-y-4 w-full max-w-md">
            <Text variant="h6" className="font-bold">Couleurs</Text>
            <Input label="Primary" placeholder="Primary" color="primary" size="lg" />
            <Input label="Secondary" placeholder="Secondary" color="secondary" size="lg" />
            <Input label="Success" placeholder="Success" color="success" size="lg" />
            <Input label="Warning" placeholder="Warning" color="warning" size="lg" />
            <Input label="Destructive" placeholder="Destructive" color="destructive" size="lg" />
            <Input label="Muted" placeholder="Muted" color="muted" size="lg" />
        </div>
    ),
};

// ============ TYPES ============

export const AllTypes: Story = {
    render: () => (
        <div className="space-y-4 w-full max-w-md">
            <Text variant="h6" className="font-bold">Types</Text>
            <Input label="Text" placeholder="Text" type="text" size="lg" />
            <Input label="Email" placeholder="email@example.com" type="email" size="lg" />
            <Input label="Password" placeholder="Password" type="password" passwordToggle size="lg" />
            <Input label="Number" placeholder="123" type="number" size="lg" />
            <Input label="Tel" placeholder="06 12 34 56 78" type="tel" size="lg" />
            <Input label="Search" placeholder="Rechercher..." type="search" leftIcon={<Search size={20} />} size="lg" />
            <Input label="URL" placeholder="https://example.com" type="url" size="lg" />
        </div>
    ),
};

// ============ AVEC ICÔNES ============

export const WithIcons: Story = {
    render: () => (
        <div className="space-y-4 w-full max-w-md">
            <Text variant="h6" className="font-bold">Icônes</Text>
            <Input label="Utilisateur" placeholder="Nom" leftIcon={<User size={20} />} size="lg" />
            <Input label="Email" placeholder="Email" leftIcon={<Mail size={20} />} size="lg" />
            <Input label="Téléphone" placeholder="Téléphone" leftIcon={<Phone size={20} />} size="lg" />
            <Input label="Localisation" placeholder="Adresse" leftIcon={<MapPin size={20} />} size="lg" />
            <Input label="Calendrier" placeholder="Date" leftIcon={<Calendar size={20} />} size="lg" />
            <Input label="Prix" placeholder="Montant" leftIcon={<DollarSign size={20} />} size="lg" />
        </div>
    ),
};

// ============ ÉTATS ============

export const AllStates: Story = {
    render: () => (
        <div className="space-y-4 w-full max-w-md">
            <Text variant="h6" className="font-bold">États</Text>
            <Input label="Normal" placeholder="Normal" size="lg" />
            <Input label="Avec valeur" value="Jean Dupont" size="lg" />
            <Input label="Focus" placeholder="Focus" autoFocus size="lg" />
            <Input label="Success" value="Valide" success size="lg" />
            <Input label="Error" placeholder="Erreur" error="Ce champ est requis" size="lg" />
            <Input label="Disabled" placeholder="Désactivé" disabled size="lg" />
            <Input label="Required" placeholder="Requis" required size="lg" />
            <Input label="Clearable" placeholder="Effaçable" clearable leftIcon={<Search size={20} />} size="lg" />
            <Input label="Password" placeholder="Mot de passe" type="password" passwordToggle size="lg" />
        </div>
    ),
};

// ============ FORMULAIRE ============

export const FormExample: Story = {
    render: () => (
        <div className="space-y-4 w-full max-w-lg p-6 bg-card rounded-md border border-border">
            <Text variant="h5" className="font-bold">Inscription</Text>
            <Input
                label="Nom complet"
                placeholder="Jean Dupont"
                leftIcon={<User size={20} />}
                required
                size="lg"
            />
            <Input
                label="Email"
                placeholder="jean@email.com"
                type="email"
                leftIcon={<Mail size={20} />}
                required
                size="lg"
            />
            <Input
                label="Mot de passe"
                placeholder="Entrez votre mot de passe"
                type="password"
                passwordToggle
                leftIcon={<Lock size={20} />}
                description="Minimum 8 caractères"
                required
                size="lg"
            />
            <Input
                label="Téléphone"
                placeholder="06 12 34 56 78"
                type="tel"
                leftIcon={<Phone size={20} />}
                size="lg"
            />
            <div className="pt-4 border-t border-border">
                <button className="w-full py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors text-base">
                    S'inscrire
                </button>
            </div>
        </div>
    ),
};

// ============ COMPARAISON ============

export const InteractivePlayground: Story = {
    render: (args) => <InputWithState {...args} />,
    args: {
        label: 'Input interactif',
        placeholder: 'Testez les options...',
        size: 'lg',
        color: 'primary',
        variant: 'default',
        fullWidth: true,
        rounded: false,
        clearable: false,
        passwordToggle: false,
        disabled: false,
        required: false,
        success: false,
        error: '',
    },
};