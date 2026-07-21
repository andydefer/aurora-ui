// src/components/utilities/stories/FocusTrap.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { FocusTrap } from '../FocusTrap';
import { useState } from 'react';
import { Button } from '../../forms/Button';
import { Text } from '../../typography/Text';
import { Input } from '../../forms/Input';

const meta: Meta<typeof FocusTrap> = {
    title: 'Utilities/FocusTrap',
    component: FocusTrap,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un composant qui piège le focus à l\'intérieur d\'un conteneur pour améliorer l\'accessibilité.',
            },
        },
    },
    argTypes: {
        active: {
            control: 'boolean',
            description: 'Activer le piège à focus',
        },
        returnFocus: {
            control: 'boolean',
            description: 'Retourner le focus à l\'élément précédent',
        },
        autoFocus: {
            control: 'boolean',
            description: 'Focus automatique sur le premier élément',
        },
        showIndicator: {
            control: 'boolean',
            description: 'Afficher un indicateur de focus verrouillé',
        },
        indicatorText: {
            control: 'text',
            description: 'Texte de l\'indicateur',
        },
        indicatorColor: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'danger', 'success', 'warning'],
            description: 'Couleur de l\'indicateur',
        },
        paused: {
            control: 'boolean',
            description: 'Mettre en pause le piège à focus',
        },
    },
};

export default meta;
type Story = StoryObj<typeof FocusTrap>;

// ============ COMPOSANT DE TEST ============

const FocusTrapDemo = ({ ...props }: Partial<React.ComponentProps<typeof FocusTrap>>) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="space-y-4 max-w-md w-full">
            <Button variant="primary" onClick={() => setIsOpen(true)}>
                Ouvrir le focus trap
            </Button>

            {isOpen && (
                <FocusTrap
                    {...props}
                    active={isOpen}
                    className="p-6 rounded border border-border bg-card"
                >
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Text variant="h5" className="font-bold">Focus Trap</Text>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsOpen(false)}
                            >
                                ✕
                            </Button>
                        </div>
                        <Text color="muted">
                            Utilisez la touche Tab pour naviguer. Le focus reste à l'intérieur.
                        </Text>
                        <Input placeholder="Champ 1" />
                        <Input placeholder="Champ 2" />
                        <div className="flex gap-2">
                            <Button variant="primary" onClick={() => setIsOpen(false)}>
                                Valider
                            </Button>
                            <Button variant="outline" onClick={() => setIsOpen(false)}>
                                Annuler
                            </Button>
                        </div>
                        <Text variant="caption" color="muted">
                            Appuyez sur Tab pour naviguer • Échappe pour fermer
                        </Text>
                    </div>
                </FocusTrap>
            )}
        </div>
    );
};

// ============ STORIES ============

export const Default: Story = {
    render: () => (
        <FocusTrapDemo
            returnFocus={true}
            autoFocus={true}
            showIndicator={true}
            indicatorText="Focus verrouillé"
            indicatorColor="primary"
        />
    ),
    parameters: {
        docs: {
            description: {
                story: 'Focus trap de base avec indicateur.',
            },
        },
    },
};

export const WithCustomInitialFocus: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div className="space-y-4 max-w-md w-full">
                <Button variant="primary" onClick={() => setIsOpen(true)}>
                    Ouvrir le focus trap
                </Button>

                {isOpen && (
                    <FocusTrap
                        active={isOpen}
                        returnFocus={true}
                        autoFocus={true}
                        initialFocus="#last-input"
                        showIndicator={true}
                        indicatorText="Focus sur le dernier champ"
                        className="p-6 rounded border border-border bg-card"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Text variant="h5" className="font-bold">Focus personnalisé</Text>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsOpen(false)}
                                >
                                    ✕
                                </Button>
                            </div>
                            <Text color="muted">
                                Le focus commence sur le dernier champ.
                            </Text>
                            <Input id="first-input" placeholder="Premier champ" />
                            <Input id="last-input" placeholder="Dernier champ (focus initial)" />
                            <div className="flex gap-2">
                                <Button variant="primary" onClick={() => setIsOpen(false)}>
                                    Valider
                                </Button>
                                <Button variant="outline" onClick={() => setIsOpen(false)}>
                                    Annuler
                                </Button>
                            </div>
                        </div>
                    </FocusTrap>
                )}
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Focus trap avec focus initial personnalisé.',
            },
        },
    },
};

export const WithoutAutoFocus: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div className="space-y-4 max-w-md w-full">
                <Button variant="primary" onClick={() => setIsOpen(true)}>
                    Ouvrir le focus trap
                </Button>

                {isOpen && (
                    <FocusTrap
                        active={isOpen}
                        returnFocus={true}
                        autoFocus={false}
                        showIndicator={true}
                        indicatorText="Focus manuel"
                        className="p-6 rounded border border-border bg-card"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Text variant="h5" className="font-bold">Focus manuel</Text>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsOpen(false)}
                                >
                                    ✕
                                </Button>
                            </div>
                            <Text color="muted">
                                Le focus n'est pas automatique. Cliquez sur un champ pour commencer.
                            </Text>
                            <Input placeholder="Cliquez ici" />
                            <Input placeholder="Ou ici" />
                            <div className="flex gap-2">
                                <Button variant="primary" onClick={() => setIsOpen(false)}>
                                    Valider
                                </Button>
                                <Button variant="outline" onClick={() => setIsOpen(false)}>
                                    Annuler
                                </Button>
                            </div>
                        </div>
                    </FocusTrap>
                )}
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Focus trap sans focus automatique.',
            },
        },
    },
};

export const WithPause: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        const [isPaused, setIsPaused] = useState(false);

        return (
            <div className="space-y-4 max-w-md w-full">
                <Button variant="primary" onClick={() => setIsOpen(true)}>
                    Ouvrir le focus trap
                </Button>

                {isOpen && (
                    <FocusTrap
                        active={isOpen}
                        returnFocus={true}
                        autoFocus={true}
                        paused={isPaused}
                        showIndicator={true}
                        indicatorText={isPaused ? 'Focus relâché' : 'Focus verrouillé'}
                        className="p-6 rounded border border-border bg-card"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Text variant="h5" className="font-bold">Focus avec pause</Text>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsOpen(false)}
                                >
                                    ✕
                                </Button>
                            </div>
                            <Text color="muted">
                                Le focus est {isPaused ? 'relâché' : 'verrouillé'}.
                            </Text>
                            <div className="flex gap-2">
                                <Button
                                    variant={isPaused ? 'primary' : 'outline'}
                                    onClick={() => setIsPaused(!isPaused)}
                                >
                                    {isPaused ? 'Reprendre' : 'Pause'}
                                </Button>
                                <Button variant="primary" onClick={() => setIsOpen(false)}>
                                    Valider
                                </Button>
                            </div>
                            <Input placeholder="Champ 1" />
                            <Input placeholder="Champ 2" />
                        </div>
                    </FocusTrap>
                )}
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Focus trap avec fonction de pause.',
            },
        },
    },
};

export const WithoutIndicator: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div className="space-y-4 max-w-md w-full">
                <Button variant="primary" onClick={() => setIsOpen(true)}>
                    Ouvrir le focus trap
                </Button>

                {isOpen && (
                    <FocusTrap
                        active={isOpen}
                        returnFocus={true}
                        autoFocus={true}
                        showIndicator={false}
                        className="p-6 rounded border border-border bg-card"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Text variant="h5" className="font-bold">Sans indicateur</Text>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsOpen(false)}
                                >
                                    ✕
                                </Button>
                            </div>
                            <Text color="muted">
                                Le focus trap est actif mais sans indicateur visible.
                            </Text>
                            <Input placeholder="Champ 1" />
                            <Input placeholder="Champ 2" />
                            <div className="flex gap-2">
                                <Button variant="primary" onClick={() => setIsOpen(false)}>
                                    Valider
                                </Button>
                                <Button variant="outline" onClick={() => setIsOpen(false)}>
                                    Annuler
                                </Button>
                            </div>
                        </div>
                    </FocusTrap>
                )}
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Focus trap sans indicateur visible.',
            },
        },
    },
};

export const InteractivePlayground: Story = {
    render: (args) => {
        const [isOpen, setIsOpen] = useState(true);

        return (
            <div className="space-y-4 max-w-md w-full">
                <Button variant="primary" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? 'Fermer' : 'Ouvrir'}
                </Button>

                {isOpen && (
                    <FocusTrap
                        active={isOpen}
                        returnFocus={args.returnFocus}
                        autoFocus={args.autoFocus}
                        showIndicator={args.showIndicator}
                        indicatorText={args.indicatorText}
                        indicatorColor={args.indicatorColor}
                        paused={args.paused}
                        className="p-6 rounded border border-border bg-card"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Text variant="h5" className="font-bold">Playground</Text>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsOpen(false)}
                                >
                                    ✕
                                </Button>
                            </div>
                            <Text color="muted">
                                Testez les options dans le panneau de contrôle.
                            </Text>
                            <Input placeholder="Champ 1" />
                            <Input placeholder="Champ 2" />
                            <div className="flex gap-2">
                                <Button variant="primary" onClick={() => setIsOpen(false)}>
                                    Valider
                                </Button>
                                <Button variant="outline" onClick={() => setIsOpen(false)}>
                                    Annuler
                                </Button>
                            </div>
                            <Text variant="caption" color="muted">
                                Active: ✓ • AutoFocus: {String(args.autoFocus)}
                            </Text>
                        </div>
                    </FocusTrap>
                )}
            </div>
        );
    },
    args: {
        returnFocus: true,
        autoFocus: true,
        showIndicator: true,
        indicatorText: 'Focus verrouillé',
        indicatorColor: 'primary' as const,
        paused: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'Playground interactif pour tester toutes les options.',
            },
        },
    },
};