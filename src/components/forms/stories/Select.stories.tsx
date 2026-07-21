// src/components/forms/stories/Select.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select } from '../Select';
import { Text } from '../../typography/Text';
import { Badge } from '../../feedback/Badge';
import { Button } from '../Button';
import {
    User,
    Settings,
    Edit,
    Eye,
    CheckCircle,
    XCircle,
    Clock,
    AlertCircle
} from 'lucide-react';

const meta: Meta<typeof Select> = {
    title: 'Forms/Select',
    component: Select,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un sélecteur dropdown personnalisable avec support single/multiple, recherche, et icônes.',
            },
        },
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'],
            description: 'Taille du select',
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'destructive', 'success', 'warning'],
            description: 'Couleur d\'accentuation',
        },
        multiple: { control: 'boolean' },
        searchable: { control: 'boolean' },
        clearable: { control: 'boolean' },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
        label: { control: 'text' },
        placeholder: { control: 'text' },
        error: { control: 'text' },
        helperText: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof Select>;

// ============ COMPOSANTS ICÔNES POUR DRAPEAUX ============

const FlagFR = () => <span className="text-base leading-none">🇫🇷</span>;
const FlagBE = () => <span className="text-base leading-none">🇧🇪</span>;
const FlagCH = () => <span className="text-base leading-none">🇨🇭</span>;
const FlagCA = () => <span className="text-base leading-none">🇨🇦</span>;
const FlagDE = () => <span className="text-base leading-none">🇩🇪</span>;
const FlagES = () => <span className="text-base leading-none">🇪🇸</span>;
const FlagIT = () => <span className="text-base leading-none">🇮🇹</span>;
const FlagPT = () => <span className="text-base leading-none">🇵🇹</span>;
const FlagNL = () => <span className="text-base leading-none">🇳🇱</span>;
const FlagUK = () => <span className="text-base leading-none">🇬🇧</span>;
const FlagUS = () => <span className="text-base leading-none">🇺🇸</span>;
const FlagJP = () => <span className="text-base leading-none">🇯🇵</span>;
const FlagCN = () => <span className="text-base leading-none">🇨🇳</span>;
const FlagBR = () => <span className="text-base leading-none">🇧🇷</span>;
const FlagAU = () => <span className="text-base leading-none">🇦🇺</span>;
const FlagSA = () => <span className="text-base leading-none">🇸🇦</span>;


// ============ OPTIONS ============

const countryOptions = [
    { value: 'fr', label: 'France', icon: <FlagFR /> },
    { value: 'be', label: 'Belgique', icon: <FlagBE /> },
    { value: 'ch', label: 'Suisse', icon: <FlagCH /> },
    { value: 'ca', label: 'Canada', icon: <FlagCA /> },
    { value: 'de', label: 'Allemagne', icon: <FlagDE /> },
    { value: 'es', label: 'Espagne', icon: <FlagES /> },
    { value: 'it', label: 'Italie', icon: <FlagIT /> },
    { value: 'pt', label: 'Portugal', icon: <FlagPT /> },
    { value: 'nl', label: 'Pays-Bas', icon: <FlagNL /> },
    { value: 'uk', label: 'Royaume-Uni', icon: <FlagUK /> },
    { value: 'us', label: 'États-Unis', icon: <FlagUS /> },
    { value: 'jp', label: 'Japon', icon: <FlagJP /> },
    { value: 'cn', label: 'Chine', icon: <FlagCN /> },
    { value: 'br', label: 'Brésil', icon: <FlagBR /> },
    { value: 'au', label: 'Australie', icon: <FlagAU /> },
];

const languageOptions = [
    { value: 'fr', label: 'Français', icon: <FlagFR /> },
    { value: 'en', label: 'Anglais', icon: <FlagUK /> },
    { value: 'es', label: 'Espagnol', icon: <FlagES /> },
    { value: 'de', label: 'Allemand', icon: <FlagDE /> },
    { value: 'it', label: 'Italien', icon: <FlagIT /> },
    { value: 'pt', label: 'Portugais', icon: <FlagPT /> },
    { value: 'nl', label: 'Néerlandais', icon: <FlagNL /> },
    { value: 'ja', label: 'Japonais', icon: <FlagJP /> },
    { value: 'zh', label: 'Chinois', icon: <FlagCN /> },
    { value: 'ar', label: 'Arabe', icon: <FlagSA /> },
];

const roleOptions = [
    { value: 'admin', label: 'Administrateur', icon: <User size={16} />, description: 'Accès complet' },
    { value: 'moderator', label: 'Modérateur', icon: <Settings size={16} />, description: 'Gestion du contenu' },
    { value: 'editor', label: 'Éditeur', icon: <Edit size={16} />, description: 'Publication d\'articles' },
    { value: 'viewer', label: 'Visiteur', icon: <Eye size={16} />, description: 'Lecture seule' },
];

const statusOptions = [
    { value: 'active', label: 'Actif', icon: <CheckCircle size={16} className="text-success" /> },
    { value: 'inactive', label: 'Inactif', icon: <XCircle size={16} className="text-muted-foreground" /> },
    { value: 'pending', label: 'En attente', icon: <Clock size={16} className="text-warning" /> },
    { value: 'blocked', label: 'Bloqué', icon: <AlertCircle size={16} className="text-destructive" /> },
];

// ============ COMPOSANT AVEC ÉTAT ============

const SelectWithState = (args: any) => {
    const [value, setValue] = useState<any>(args.value || '');
    return (
        <div className="w-full max-w-2xl space-y-4">
            <Select
                {...args}
                value={value}
                onChange={(val) => {
                    setValue(val);
                    args.onChange?.(val);
                }}
            />
            {value && (
                <div className="flex items-center gap-3 text-sm text-muted-foreground p-3 bg-muted/10 rounded-lg border border-border/50">
                    <Badge variant="primary" size="sm">Sélectionné</Badge>
                    <span className="font-mono">
                        {Array.isArray(value) ? value.join(', ') : value}
                    </span>
                </div>
            )}
        </div>
    );
};

// ============ STORIES ============

export const Default: Story = {
    render: (args) => <SelectWithState {...args} />,
    args: {
        label: 'Pays',
        options: countryOptions,
        placeholder: 'Sélectionnez un pays',
        size: 'lg',
        color: 'primary',
    },
};

export const WithValue: Story = {
    render: (args) => <SelectWithState {...args} />,
    args: {
        label: 'Pays',
        options: countryOptions,
        value: 'fr',
        placeholder: 'Sélectionnez un pays',
        size: 'lg',
        color: 'primary',
    },
};

export const WithError: Story = {
    render: (args) => <SelectWithState {...args} />,
    args: {
        label: 'Pays',
        options: countryOptions,
        placeholder: 'Sélectionnez un pays',
        error: 'Veuillez sélectionner un pays',
        size: 'lg',
        color: 'primary',
    },
};

export const WithHelperText: Story = {
    render: (args) => <SelectWithState {...args} />,
    args: {
        label: 'Pays',
        options: countryOptions,
        placeholder: 'Sélectionnez un pays',
        helperText: 'Choisissez votre pays de résidence',
        size: 'lg',
        color: 'primary',
    },
};

export const Required: Story = {
    render: (args) => <SelectWithState {...args} />,
    args: {
        label: 'Pays',
        options: countryOptions,
        placeholder: 'Sélectionnez un pays',
        required: true,
        size: 'lg',
        color: 'primary',
    },
};

export const Disabled: Story = {
    render: (args) => <SelectWithState {...args} />,
    args: {
        label: 'Pays',
        options: countryOptions,
        value: 'fr',
        placeholder: 'Sélectionnez un pays',
        disabled: true,
        size: 'lg',
        color: 'primary',
    },
};

// ============ MULTIPLE ============

export const Multiple: Story = {
    render: (args) => <SelectWithState {...args} />,
    args: {
        label: 'Langues',
        options: languageOptions,
        placeholder: 'Sélectionnez des langues',
        multiple: true,
        size: 'lg',
        color: 'primary',
    },
};

export const MultipleWithValue: Story = {
    render: (args) => <SelectWithState {...args} />,
    args: {
        label: 'Langues',
        options: languageOptions,
        value: ['fr', 'en'],
        placeholder: 'Sélectionnez des langues',
        multiple: true,
        size: 'lg',
        color: 'primary',
    },
};

// ============ SEARCHABLE ============

export const Searchable: Story = {
    render: (args) => <SelectWithState {...args} />,
    args: {
        label: 'Pays',
        options: countryOptions,
        placeholder: 'Recherchez un pays...',
        searchable: true,
        size: 'lg',
        color: 'primary',
    },
};

export const SearchableMultiple: Story = {
    render: (args) => <SelectWithState {...args} />,
    args: {
        label: 'Langues',
        options: languageOptions,
        placeholder: 'Recherchez des langues...',
        searchable: true,
        multiple: true,
        size: 'lg',
        color: 'primary',
    },
};

// ============ CLEARABLE ============

export const Clearable: Story = {
    render: (args) => <SelectWithState {...args} />,
    args: {
        label: 'Pays',
        options: countryOptions,
        placeholder: 'Sélectionnez un pays',
        clearable: true,
        size: 'lg',
        color: 'primary',
    },
};

export const ClearableMultiple: Story = {
    render: (args) => <SelectWithState {...args} />,
    args: {
        label: 'Langues',
        options: languageOptions,
        placeholder: 'Sélectionnez des langues',
        clearable: true,
        multiple: true,
        size: 'lg',
        color: 'primary',
    },
};

// ============ AVEC ICÔNES ============

export const WithIcons: Story = {
    render: (args) => <SelectWithState {...args} />,
    args: {
        label: 'Rôle',
        options: roleOptions,
        placeholder: 'Sélectionnez un rôle',
        size: 'lg',
        color: 'primary',
    },
};

export const WithStatusIcons: Story = {
    render: (args) => <SelectWithState {...args} />,
    args: {
        label: 'Statut',
        options: statusOptions,
        placeholder: 'Sélectionnez un statut',
        size: 'lg',
        color: 'primary',
    },
};


// ============ FORMULAIRE ============

export const FormExample: Story = {
    render: () => {
        const [country, setCountry] = useState<string>('');
        const [languages, setLanguages] = useState<string[]>([]);
        const [role, setRole] = useState<string>('');
        const [status, setStatus] = useState<string>('');

        return (
            <div className="space-y-6 w-full max-w-2xl p-6 bg-card rounded-lg border border-border">
                <Text variant="h5" className="font-bold">Préférences utilisateur</Text>

                <Select
                    label="Pays"
                    options={countryOptions}
                    placeholder="Sélectionnez votre pays"
                    value={country}
                    onChange={(val) => setCountry(val as string)}
                    size="md"
                    required
                    clearable
                />

                <Select
                    label="Langues parlées"
                    options={languageOptions}
                    placeholder="Sélectionnez les langues"
                    value={languages}
                    onChange={(val) => setLanguages(val as string[])}
                    multiple
                    searchable
                    clearable
                    size="md"
                />

                <Select
                    label="Rôle"
                    options={roleOptions}
                    placeholder="Sélectionnez un rôle"
                    value={role}
                    onChange={(val) => setRole(val as string)}
                    size="md"
                    helperText="Détermine les permissions de l'utilisateur"
                />

                <Select
                    label="Statut"
                    options={statusOptions}
                    placeholder="Sélectionnez un statut"
                    value={status}
                    onChange={(val) => setStatus(val as string)}
                    size="md"
                />

                <div className="pt-4 border-t border-border flex gap-3 justify-end">
                    <Button variant="outline" size="md">Annuler</Button>
                    <Button variant="primary" size="md">Enregistrer</Button>
                </div>
            </div>
        );
    },
};

export const InteractivePlayground: Story = {
    render: (args) => <SelectWithState {...args} />,
    args: {
        label: 'Select interactif',
        options: countryOptions,
        placeholder: 'Testez les options...',
        size: 'lg',
        color: 'primary',
        multiple: false,
        searchable: false,
        clearable: false,
        disabled: false,
        required: false,
    },
};