// src/components/forms/stories/Textarea.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '../Textarea';
import { useState } from 'react';
import { Text } from '../../typography/Text';
import { Button } from '../Button';

const meta: Meta<typeof Textarea> = {
    title: 'Forms/Textarea',
    component: Textarea,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un champ de texte multiligne personnalisable avec auto-resize, compteur de caractères et validation.',
            },
        },
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'],
            description: 'Taille du textarea',
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'destructive', 'success', 'warning'],
            description: 'Couleur d\'accentuation',
        },
        resize: {
            control: 'select',
            options: ['none', 'vertical', 'horizontal', 'both'],
            description: 'Direction du redimensionnement',
        },
        rows: { control: 'number', min: 1, max: 20 },
        label: { control: 'text' },
        placeholder: { control: 'text' },
        description: { control: 'text' },
        error: { control: 'text' },
        maxLength: { control: 'number' },
        minLength: { control: 'number' },
        showCharCount: { control: 'boolean' },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
        autoFocus: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

// ============ COMPOSANT AVEC ÉTAT ============

const TextareaWithState = (args: any) => {
    const [value, setValue] = useState(args.value || '');
    return (
        <div className="w-full max-w-2xl">
            <Textarea
                {...args}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    args.onChange?.(e);
                }}
            />
            {value && (
                <div className="mt-3 text-sm text-muted-foreground p-3 bg-muted/10 rounded-md border border-border/50">
                    <span className="font-medium">Aperçu:</span>
                    <p className="mt-1 text-foreground">{value || 'Vide'}</p>
                </div>
            )}
        </div>
    );
};

// ============ STORIES ============

export const Default: Story = {
    render: (args) => <TextareaWithState {...args} />,
    args: {
        label: 'Message',
        placeholder: 'Écrivez votre message ici...',
        rows: 4,
        size: 'lg',
        color: 'primary',
        resize: 'vertical',
    },
};

export const WithValue: Story = {
    render: (args) => <TextareaWithState {...args} />,
    args: {
        label: 'Description',
        placeholder: 'Décrivez votre projet...',
        value: 'Ceci est une description de projet déjà remplie avec du contenu de démonstration.',
        rows: 4,
        size: 'lg',
        color: 'primary',
    },
};

export const WithDescription: Story = {
    render: (args) => <TextareaWithState {...args} />,
    args: {
        label: 'Commentaire',
        description: 'Veuillez fournir des détails sur votre demande.',
        placeholder: 'Écrivez ici...',
        rows: 4,
        size: 'lg',
        color: 'primary',
    },
};

export const WithError: Story = {
    render: (args) => <TextareaWithState {...args} />,
    args: {
        label: 'Message',
        placeholder: 'Écrivez votre message...',
        error: 'Ce champ est requis',
        rows: 4,
        size: 'lg',
        color: 'primary',
    },
};

export const WithCharCount: Story = {
    render: (args) => <TextareaWithState {...args} />,
    args: {
        label: 'Commentaire',
        placeholder: 'Écrivez votre commentaire...',
        maxLength: 200,
        showCharCount: true,
        rows: 4,
        size: 'lg',
        color: 'primary',
    },
};

export const WithMinLength: Story = {
    render: (args) => <TextareaWithState {...args} />,
    args: {
        label: 'Avis',
        placeholder: 'Écrivez votre avis (minimum 20 caractères)...',
        minLength: 20,
        rows: 4,
        size: 'lg',
        color: 'primary',
    },
};

export const Disabled: Story = {
    render: (args) => <TextareaWithState {...args} />,
    args: {
        label: 'Message (désactivé)',
        placeholder: 'Vous ne pouvez pas modifier ce champ...',
        value: 'Ce contenu est en lecture seule.',
        disabled: true,
        rows: 4,
        size: 'lg',
        color: 'primary',
    },
};

export const Required: Story = {
    render: (args) => <TextareaWithState {...args} />,
    args: {
        label: 'Message',
        placeholder: 'Écrivez votre message...',
        required: true,
        rows: 4,
        size: 'lg',
        color: 'primary',
    },
};

export const AutoFocus: Story = {
    render: (args) => <TextareaWithState {...args} />,
    args: {
        label: 'Message (auto-focus)',
        placeholder: 'Le focus est automatique...',
        autoFocus: true,
        rows: 4,
        size: 'lg',
        color: 'primary',
    },
};

// ============ AVEC COMPTEUR ============

export const WithCharCounter: Story = {
    render: () => {
        const [value, setValue] = useState('');

        return (
            <div className="space-y-4 w-full max-w-2xl">
                <Text variant="h6" className="font-bold">Compteur de caractères</Text>
                <Textarea
                    label="Commentaire"
                    placeholder="Écrivez votre commentaire (maximum 500 caractères)..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    maxLength={500}
                    showCharCount
                    rows={6}
                    size="lg"
                />
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setValue('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')}
                    >
                        Remplir
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setValue('')}
                    >
                        Effacer
                    </Button>
                </div>
            </div>
        );
    },
};


// ============ FORMULAIRE ============

export const FormExample: Story = {
    render: () => {
        const [message, setMessage] = useState('');
        const [feedback, setFeedback] = useState('');

        return (
            <div className="space-y-4 w-full max-w-2xl p-6 bg-card rounded-md border border-border">
                <Text variant="h5" className="font-bold">Formulaire de contact</Text>
                <Textarea
                    label="Message"
                    placeholder="Écrivez votre message ici..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    size="lg"
                    required
                    maxLength={500}
                    showCharCount
                />
                <Textarea
                    label="Feedback"
                    description="Partagez votre expérience avec nous"
                    placeholder="Votre feedback..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={3}
                    size="lg"
                    minLength={10}
                />
                <div className="pt-4 border-t border-border flex gap-3 justify-end">
                    <Button variant="outline" size="lg">Annuler</Button>
                    <Button variant="primary" size="lg">Envoyer</Button>
                </div>
            </div>
        );
    },
};

export const InteractivePlayground: Story = {
    render: (args) => <TextareaWithState {...args} />,
    args: {
        label: 'Textarea interactif',
        placeholder: 'Testez les options dans le panneau de contrôle...',
        rows: 4,
        size: 'lg',
        color: 'primary',
        resize: 'vertical',
        showCharCount: false,
        maxLength: 200,
        disabled: false,
        required: false,
        autoFocus: false,
    },
};