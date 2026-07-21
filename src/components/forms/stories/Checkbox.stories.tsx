// src/components/forms/stories/Checkbox.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../Checkbox';
import { useState } from 'react';
import { Text } from '../../typography/Text';

const meta: Meta<typeof Checkbox> = {
    title: 'Forms/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Une case à cocher personnalisable avec label, description et gestion d\'erreurs.',
            },
        },
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'],
            description: 'Taille de la checkbox',
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'destructive', 'success', 'warning'],
            description: 'Couleur d\'accentuation',
        },
        label: { control: 'text' },
        description: { control: 'text' },
        error: { control: 'text' },
        checked: { control: 'boolean' },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
        indeterminate: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// ============ COMPOSANT AVEC ÉTAT ============

const CheckboxWithState = (args: any) => {
    const [checked, setChecked] = useState(args.checked || false);
    return (
        <Checkbox
            {...args}
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
        />
    );
};

// ============ VARIANTES ============

export const Default: Story = {
    render: (args) => <CheckboxWithState {...args} />,
    args: {
        label: 'Accepter les conditions',
        description: 'Je confirme avoir lu et accepté les conditions d\'utilisation',
        size: 'md',
        color: 'primary',
    },
};

export const Checked: Story = {
    render: (args) => <CheckboxWithState {...args} />,
    args: {
        label: 'Option activée',
        description: 'Cette option est déjà cochée',
        checked: true,
        size: 'md',
        color: 'primary',
    },
};

export const WithError: Story = {
    render: (args) => <CheckboxWithState {...args} />,
    args: {
        label: 'Accepter les conditions',
        description: 'Vous devez accepter les conditions pour continuer',
        error: 'Ce champ est requis',
        size: 'md',
        color: 'primary',
    },
};

export const Disabled: Story = {
    render: (args) => <CheckboxWithState {...args} />,
    args: {
        label: 'Option désactivée',
        description: 'Cette option n\'est pas disponible',
        disabled: true,
        size: 'md',
        color: 'primary',
    },
};

export const DisabledChecked: Story = {
    render: (args) => <CheckboxWithState {...args} />,
    args: {
        label: 'Option désactivée cochée',
        description: 'Cette option est cochée mais désactivée',
        disabled: true,
        checked: true,
        size: 'md',
        color: 'primary',
    },
};

export const Indeterminate: Story = {
    render: (args) => {
        const [checked, setChecked] = useState(false);
        const [indeterminate, setIndeterminate] = useState(true);

        return (
            <div className="space-y-4">
                <Checkbox
                    {...args}
                    checked={checked}
                    indeterminate={indeterminate}
                    onChange={(e) => {
                        setChecked(e.target.checked);
                        setIndeterminate(false);
                    }}
                />
                <div className="flex gap-4">
                    <button
                        className="px-3 py-1 text-sm rounded bg-primary/10 text-primary hover:bg-primary/20"
                        onClick={() => {
                            setIndeterminate(true);
                            setChecked(false);
                        }}
                    >
                        Indéterminé
                    </button>
                    <button
                        className="px-3 py-1 text-sm rounded bg-primary/10 text-primary hover:bg-primary/20"
                        onClick={() => setIndeterminate(false)}
                    >
                        Normal
                    </button>
                </div>
            </div>
        );
    },
    args: {
        label: 'État indéterminé',
        description: 'Cliquez sur les boutons pour changer l\'état',
        size: 'md',
        color: 'primary',
    },
    parameters: {
        docs: {
            description: {
                story: 'Checkbox avec état indéterminé (utile pour les listes avec sélection partielle).',
            },
        },
    },
};

// ============ TAILLES ============

export const AllSizes: Story = {
    render: () => (
        <div className="space-y-4 max-w-md">
            <Text variant="h6" className="font-bold">Toutes les tailles</Text>
            <div className="space-y-3">
                <Checkbox size="xs" label="XS" />
                <Checkbox size="sm" label="SM" />
                <Checkbox size="md" label="MD" />
                <Checkbox size="lg" label="LG" />
                <Checkbox size="xl" label="XL" />
                <Checkbox size="2xl" label="2XL" />
                <Checkbox size="3xl" label="3XL" />
                <Checkbox size="4xl" label="4XL" />
                <Checkbox size="full" label="Full" />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Toutes les tailles de checkbox disponibles.',
            },
        },
    },
};

// ============ COULEURS ============

export const AllColors: Story = {
    render: () => (
        <div className="space-y-4 max-w-md">
            <Text variant="h6" className="font-bold">Toutes les couleurs</Text>
            <div className="space-y-3">
                <Checkbox color="primary" label="Primary" defaultChecked />
                <Checkbox color="secondary" label="Secondary" defaultChecked />
                <Checkbox color="success" label="Success" defaultChecked />
                <Checkbox color="warning" label="Warning" defaultChecked />
                <Checkbox color="destructive" label="Destructive" defaultChecked />
                <Checkbox color="muted" label="Muted" defaultChecked />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Toutes les couleurs disponibles.',
            },
        },
    },
};

// ============ AVEC DESCRIPTION ============

export const WithDescription: Story = {
    render: (args) => <CheckboxWithState {...args} />,
    args: {
        label: 'Recevoir la newsletter',
        description: 'Recevez nos actualités et promotions par email (désinscription à tout moment)',
        size: 'md',
        color: 'primary',
    },
};

// ============ REQUIS ============

export const Required: Story = {
    render: (args) => <CheckboxWithState {...args} />,
    args: {
        label: 'J\'accepte les conditions générales',
        description: 'Veuillez accepter les conditions pour continuer',
        required: true,
        size: 'md',
        color: 'primary',
    },
};

// ============ GROUPÉ ============

export const Grouped: Story = {
    render: () => {
        const [checked, setChecked] = useState({
            option1: true,
            option2: false,
            option3: false,
        });

        const allChecked = checked.option1 && checked.option2 && checked.option3;
        const someChecked = checked.option1 || checked.option2 || checked.option3;

        return (
            <div className="space-y-4 max-w-md">
                <Text variant="h6" className="font-bold">Options</Text>
                <Checkbox
                    label="Tout sélectionner"
                    checked={allChecked}
                    indeterminate={!allChecked && someChecked}
                    onChange={(e) => {
                        const value = e.target.checked;
                        setChecked({
                            option1: value,
                            option2: value,
                            option3: value,
                        });
                    }}
                />
                <div className="ml-6 space-y-2 border-l-2 border-border pl-4">
                    <Checkbox
                        label="Option 1"
                        checked={checked.option1}
                        onChange={(e) => setChecked({ ...checked, option1: e.target.checked })}
                    />
                    <Checkbox
                        label="Option 2"
                        checked={checked.option2}
                        onChange={(e) => setChecked({ ...checked, option2: e.target.checked })}
                    />
                    <Checkbox
                        label="Option 3"
                        checked={checked.option3}
                        onChange={(e) => setChecked({ ...checked, option3: e.target.checked })}
                    />
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Groupe de checkboxes avec sélection tout/none et état indéterminé.',
            },
        },
    },
};

// ============ CAS D'USAGE ============

export const FormExample: Story = {
    render: () => (
        <div className="space-y-4 max-w-md p-6 bg-card rounded-md border border-border">
            <Text variant="h5" className="font-bold">Préférences</Text>
            <div className="space-y-3">
                <Checkbox label="Notifications par email" description="Recevoir des notifications par email" defaultChecked />
                <Checkbox label="Notifications push" description="Recevoir des notifications sur votre appareil" />
                <Checkbox label="Newsletter" description="Recevoir notre newsletter mensuelle" />
                <Checkbox label="Offres promotionnelles" description="Recevoir des offres exclusives" disabled />
                <div className="pt-3 border-t border-border">
                    <Checkbox
                        label="J'accepte les conditions d'utilisation"
                        description="Veuillez lire attentivement les conditions"
                        required
                    />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Exemple de formulaire avec checkboxes.',
            },
        },
    },
};

// ============ COMPARAISON ============

export const AllStates: Story = {
    render: () => (
        <div className="space-y-4 max-w-md">
            <Text variant="h6" className="font-bold">Tous les états</Text>
            <div className="space-y-3">
                <Checkbox label="Non cochée" />
                <Checkbox label="Cochée" defaultChecked />
                <Checkbox label="Indéterminée" indeterminate />
                <Checkbox label="Erreur" error="Ce champ est requis" />
                <Checkbox label="Désactivée non cochée" disabled />
                <Checkbox label="Désactivée cochée" disabled defaultChecked />
                <Checkbox label="Requis" required />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Tous les états d\'une checkbox.',
            },
        },
    },
};

export const InteractivePlayground: Story = {
    render: (args) => <CheckboxWithState {...args} />,
    args: {
        label: 'Checkbox interactive',
        description: 'Testez les options dans le panneau de contrôle',
        size: 'md',
        color: 'primary',
        checked: false,
        disabled: false,
        required: false,
        indeterminate: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'Playground interactif pour tester toutes les options.',
            },
        },
    },
};