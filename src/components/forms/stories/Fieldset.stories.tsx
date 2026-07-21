// src/components/forms/stories/Fieldset.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Fieldset } from '../Fieldset';
import { Input } from '../Input';
import { Select } from '../Select';
import { Checkbox } from '../Checkbox';
import { Switch } from '../Switch';
import { Textarea } from '../Textarea';
import { Button } from '../Button';
import { Text } from '../../typography/Text';

const meta: Meta<typeof Fieldset> = {
    title: 'Forms/Fieldset',
    component: Fieldset,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un conteneur pour grouper des champs de formulaire avec légende.',
            },
        },
    },
    argTypes: {
        legend: { control: 'text' },
        description: { control: 'text' },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'],
            description: 'Taille du composant',
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'destructive', 'success', 'warning'],
            description: 'Couleur d\'accentuation',
        },
        variant: {
            control: 'select',
            options: ['default', 'outlined', 'elevated', 'ghost'],
            description: 'Style visuel',
        },
        status: {
            control: 'select',
            options: ['default', 'success', 'error', 'warning'],
            description: 'Statut du fieldset',
        },
        statusMessage: { control: 'text' },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
        border: { control: 'boolean' },
        collapsible: { control: 'boolean' },
        defaultCollapsed: { control: 'boolean' },
        scrollable: { control: 'boolean' },
        maxHeight: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof Fieldset>;

// ============ OPTIONS DE SELECT ============

const countryOptions = [
    { value: 'fr', label: 'France' },
    { value: 'be', label: 'Belgique' },
    { value: 'ch', label: 'Suisse' },
    { value: 'ca', label: 'Canada' },
    { value: 'de', label: 'Allemagne' },
    { value: 'es', label: 'Espagne' },
    { value: 'it', label: 'Italie' },
    { value: 'pt', label: 'Portugal' },
    { value: 'nl', label: 'Pays-Bas' },
    { value: 'uk', label: 'Royaume-Uni' },
];

// ============ STORIES ============

export const Default: Story = {
    render: (args) => (
        <div className="w-full max-w-2xl">
            <Fieldset {...args}>
                <Input label="Nom complet" placeholder="Jean Dupont" size="lg" />
                <Input label="Email" type="email" placeholder="jean@email.com" size="lg" />
                <Select
                    label="Pays"
                    options={countryOptions}
                    placeholder="Sélectionnez un pays"
                    size="lg"
                />
                <Checkbox label="J'accepte les conditions" size="lg" />
            </Fieldset>
        </div>
    ),
    args: {
        legend: 'Informations personnelles',
        description: 'Veuillez remplir tous les champs obligatoires',
        size: 'lg',
        color: 'primary',
        variant: 'default',
        border: true,
    },
};

export const Outlined: Story = {
    render: (args) => (
        <div className="w-full max-w-2xl">
            <Fieldset {...args}>
                <Input label="Nom complet" placeholder="Jean Dupont" size="lg" />
                <Input label="Email" type="email" placeholder="jean@email.com" size="lg" />
                <Select
                    label="Pays"
                    options={countryOptions}
                    placeholder="Sélectionnez un pays"
                    size="lg"
                />
            </Fieldset>
        </div>
    ),
    args: {
        legend: 'Informations personnelles',
        variant: 'outlined',
        size: 'lg',
        color: 'primary',
    },
};

export const Elevated: Story = {
    render: (args) => (
        <div className="w-full max-w-2xl">
            <Fieldset {...args}>
                <Input label="Nom complet" placeholder="Jean Dupont" size="lg" />
                <Input label="Email" type="email" placeholder="jean@email.com" size="lg" />
                <Select
                    label="Pays"
                    options={countryOptions}
                    placeholder="Sélectionnez un pays"
                    size="lg"
                />
            </Fieldset>
        </div>
    ),
    args: {
        legend: 'Informations personnelles',
        variant: 'elevated',
        size: 'lg',
        color: 'primary',
    },
};

export const Ghost: Story = {
    render: (args) => (
        <div className="w-full max-w-2xl">
            <Fieldset {...args}>
                <Input label="Nom complet" placeholder="Jean Dupont" size="lg" />
                <Input label="Email" type="email" placeholder="jean@email.com" size="lg" />
                <Select
                    label="Pays"
                    options={countryOptions}
                    placeholder="Sélectionnez un pays"
                    size="lg"
                />
            </Fieldset>
        </div>
    ),
    args: {
        legend: 'Informations personnelles',
        variant: 'ghost',
        size: 'lg',
        color: 'primary',
        border: false,
    },
};

export const WithSuccess: Story = {
    render: (args) => (
        <div className="w-full max-w-2xl">
            <Fieldset {...args}>
                <Input label="Nom complet" value="Jean Dupont" success size="lg" />
                <Input label="Email" value="jean@email.com" success size="lg" />
                <Select
                    label="Pays"
                    options={countryOptions}
                    value="fr"
                    placeholder="Sélectionnez un pays"
                    size="lg"
                />
            </Fieldset>
        </div>
    ),
    args: {
        legend: 'Informations validées',
        description: 'Tous les champs sont correctement remplis',
        status: 'success',
        statusMessage: 'Formulaire validé avec succès',
        size: 'lg',
        color: 'success',
    },
};

export const WithError: Story = {
    render: (args) => (
        <div className="w-full max-w-2xl">
            <Fieldset {...args}>
                <Input label="Nom complet" placeholder="Jean Dupont" error="Ce champ est requis" size="lg" />
                <Input label="Email" type="email" placeholder="jean@email.com" error="Email invalide" size="lg" />
                <Select
                    label="Pays"
                    options={countryOptions}
                    placeholder="Sélectionnez un pays"
                    error="Veuillez sélectionner un pays"
                    size="lg"
                />
            </Fieldset>
        </div>
    ),
    args: {
        legend: 'Erreurs de validation',
        description: 'Veuillez corriger les erreurs ci-dessous',
        status: 'error',
        statusMessage: '2 erreurs détectées',
        size: 'lg',
        color: 'destructive',
    },
};

export const WithWarning: Story = {
    render: (args) => (
        <div className="w-full max-w-2xl">
            <Fieldset {...args}>
                <Input label="Nom complet" placeholder="Jean Dupont" size="lg" />
                <Input label="Email" type="email" placeholder="jean@email.com" size="lg" />
                <Switch label="Activer les notifications" size="lg" />
            </Fieldset>
        </div>
    ),
    args: {
        legend: 'Paramètres de notification',
        description: 'Certaines fonctionnalités sont optionnelles',
        status: 'warning',
        statusMessage: 'Attention: les notifications ne sont pas activées',
        size: 'lg',
        color: 'warning',
    },
};

export const WithRequired: Story = {
    render: (args) => (
        <div className="w-full max-w-2xl">
            <Fieldset {...args}>
                <Input label="Nom complet" placeholder="Jean Dupont" required size="lg" />
                <Input label="Email" type="email" placeholder="jean@email.com" required size="lg" />
                <Select
                    label="Pays"
                    options={countryOptions}
                    placeholder="Sélectionnez un pays"
                    required
                    size="lg"
                />
                <Checkbox label="J'accepte les conditions" required size="lg" />
            </Fieldset>
        </div>
    ),
    args: {
        legend: 'Informations obligatoires',
        description: 'Les champs avec * sont requis',
        required: true,
        size: 'lg',
        color: 'primary',
    },
};

export const Disabled: Story = {
    render: (args) => (
        <div className="w-full max-w-2xl">
            <Fieldset {...args}>
                <Input label="Nom complet" value="Jean Dupont" disabled size="lg" />
                <Input label="Email" value="jean@email.com" disabled size="lg" />
                <Select
                    label="Pays"
                    options={countryOptions}
                    value="fr"
                    placeholder="Sélectionnez un pays"
                    disabled
                    size="lg"
                />
                <Switch label="Notifications" checked disabled size="lg" />
            </Fieldset>
        </div>
    ),
    args: {
        legend: 'Informations désactivées',
        description: 'Ce formulaire est en lecture seule',
        disabled: true,
        size: 'lg',
        color: 'primary',
    },
};

export const Collapsible: Story = {
    render: (args) => (
        <div className="w-full max-w-2xl">
            <Fieldset {...args}>
                <Input label="Nom complet" placeholder="Jean Dupont" size="lg" />
                <Input label="Email" type="email" placeholder="jean@email.com" size="lg" />
                <Select
                    label="Pays"
                    options={countryOptions}
                    placeholder="Sélectionnez un pays"
                    size="lg"
                />
                <Textarea label="Commentaire" placeholder="Votre commentaire..." size="lg" />
            </Fieldset>
        </div>
    ),
    args: {
        legend: 'Informations détaillées',
        description: 'Cliquez sur la flèche pour réduire/agrandir',
        collapsible: true,
        defaultCollapsed: false,
        size: 'lg',
        color: 'primary',
    },
};

export const Scrollable: Story = {
    render: (args) => (
        <div className="w-full max-w-2xl">
            <Fieldset {...args}>
                {Array.from({ length: 10 }).map((_, i) => (
                    <Input
                        key={i}
                        label={`Champ ${i + 1}`}
                        placeholder={`Valeur ${i + 1}`}
                        size="lg"
                    />
                ))}
            </Fieldset>
        </div>
    ),
    args: {
        legend: 'Liste de champs scrollable',
        description: 'Défilez pour voir tous les champs',
        scrollable: true,
        maxHeight: '300px',
        size: 'lg',
        color: 'primary',
        variant: 'default',
    },
};

// ============ TAILLES ============

export const AllSizes: Story = {
    render: () => (
        <div className="space-y-4 w-full max-w-2xl">
            <Text variant="h6" className="font-bold">Toutes les tailles</Text>
            <Fieldset legend="XS" size="xs">
                <Input size="xs" placeholder="XS input" />
            </Fieldset>
            <Fieldset legend="SM" size="sm">
                <Input size="sm" placeholder="SM input" />
            </Fieldset>
            <Fieldset legend="MD" size="md">
                <Input size="md" placeholder="MD input" />
            </Fieldset>
            <Fieldset legend="LG" size="lg">
                <Input size="lg" placeholder="LG input" />
            </Fieldset>
            <Fieldset legend="XL" size="xl">
                <Input size="xl" placeholder="XL input" />
            </Fieldset>
        </div>
    ),
};

// ============ COULEURS ============

export const AllColors: Story = {
    render: () => (
        <div className="space-y-4 w-full max-w-2xl">
            <Text variant="h6" className="font-bold">Toutes les couleurs</Text>
            <Fieldset legend="Primary" color="primary" size="lg">
                <Input placeholder="Primary" size="lg" />
            </Fieldset>
            <Fieldset legend="Secondary" color="secondary" size="lg">
                <Input placeholder="Secondary" size="lg" />
            </Fieldset>
            <Fieldset legend="Success" color="success" size="lg">
                <Input placeholder="Success" size="lg" />
            </Fieldset>
            <Fieldset legend="Warning" color="warning" size="lg">
                <Input placeholder="Warning" size="lg" />
            </Fieldset>
            <Fieldset legend="Destructive" color="destructive" size="lg">
                <Input placeholder="Destructive" size="lg" />
            </Fieldset>
            <Fieldset legend="Muted" color="muted" size="lg">
                <Input placeholder="Muted" size="lg" />
            </Fieldset>
        </div>
    ),
};

// ============ COMPARAISON ============

export const AllVariants: Story = {
    render: () => (
        <div className="space-y-4 w-full max-w-2xl">
            <Text variant="h6" className="font-bold">Toutes les variantes</Text>
            <Fieldset legend="Default" variant="default" size="lg">
                <Input placeholder="Default" size="lg" />
            </Fieldset>
            <Fieldset legend="Outlined" variant="outlined" size="lg">
                <Input placeholder="Outlined" size="lg" />
            </Fieldset>
            <Fieldset legend="Elevated" variant="elevated" size="lg">
                <Input placeholder="Elevated" size="lg" />
            </Fieldset>
            <Fieldset legend="Ghost" variant="ghost" border={false} size="lg">
                <Input placeholder="Ghost" size="lg" />
            </Fieldset>
        </div>
    ),
};

export const AllStatuses: Story = {
    render: () => (
        <div className="space-y-4 w-full max-w-2xl">
            <Text variant="h6" className="font-bold">Tous les statuts</Text>
            <Fieldset legend="Default" status="default" size="lg">
                <Input placeholder="Default" size="lg" />
            </Fieldset>
            <Fieldset legend="Success" status="success" statusMessage="Tout est bon !" size="lg">
                <Input placeholder="Success" size="lg" />
            </Fieldset>
            <Fieldset legend="Warning" status="warning" statusMessage="Attention !" size="lg">
                <Input placeholder="Warning" size="lg" />
            </Fieldset>
            <Fieldset legend="Error" status="error" statusMessage="Erreur détectée !" size="lg">
                <Input placeholder="Error" size="lg" />
            </Fieldset>
        </div>
    ),
};

// ============ FORMULAIRE COMPLET ============

export const FullForm: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <form className="space-y-6">
                <Fieldset
                    legend="Informations personnelles"
                    description="Veuillez remplir vos informations"
                    size="lg"
                    color="primary"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Prénom" placeholder="Jean" size="lg" />
                        <Input label="Nom" placeholder="Dupont" size="lg" />
                    </div>
                    <Input label="Email" type="email" placeholder="jean@email.com" size="lg" />
                    <Input label="Téléphone" type="tel" placeholder="06 12 34 56 78" size="lg" />
                    <Select
                        label="Pays"
                        options={countryOptions}
                        placeholder="Sélectionnez un pays"
                        size="lg"
                    />
                </Fieldset>

                <Fieldset
                    legend="Préférences"
                    description="Configurez vos préférences"
                    size="lg"
                    color="secondary"
                    variant="outlined"
                >
                    <Switch label="Recevoir les notifications par email" size="lg" />
                    <Switch label="Recevoir les notifications push" size="lg" />
                    <Checkbox label="J'accepte de recevoir la newsletter" size="lg" />
                    <Checkbox label="J'accepte les conditions d'utilisation" required size="lg" />
                </Fieldset>

                <Fieldset
                    legend="Message"
                    size="lg"
                    color="primary"
                    variant="elevated"
                >
                    <Textarea
                        label="Votre message"
                        placeholder="Écrivez votre message ici..."
                        rows={4}
                        size="lg"
                    />
                </Fieldset>

                <div className="flex gap-3 justify-end">
                    <Button variant="outline" size="lg">Annuler</Button>
                    <Button variant="primary" size="lg">Envoyer</Button>
                </div>
            </form>
        </div>
    ),
};

export const InteractivePlayground: Story = {
    render: (args) => (
        <div className="w-full max-w-2xl">
            <Fieldset {...args}>
                <Input label="Nom complet" placeholder="Jean Dupont" size="lg" />
                <Input label="Email" type="email" placeholder="jean@email.com" size="lg" />
                <Select
                    label="Pays"
                    options={countryOptions}
                    placeholder="Sélectionnez un pays"
                    size="lg"
                />
                <Checkbox label="J'accepte les conditions" size="lg" />
            </Fieldset>
        </div>
    ),
    args: {
        legend: 'Fieldset interactif',
        description: 'Testez les options dans le panneau de contrôle',
        size: 'lg',
        color: 'primary',
        variant: 'default',
        border: true,
        disabled: false,
        required: false,
        collapsible: false,
        defaultCollapsed: false,
        scrollable: false,
        maxHeight: '300px',
    },
};