// src/components/utilities/stories/ErrorBoundary.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ErrorBoundary } from '../ErrorBoundary';
import { Button } from '../../forms/Button';
import { Text } from '../../typography/Text';
import { useState } from 'react';

const meta: Meta<typeof ErrorBoundary> = {
    title: 'Utilities/ErrorBoundary',
    component: ErrorBoundary,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un composant pour capturer et gérer les erreurs dans l\'application.',
            },
        },
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'minimal', 'card', 'fullscreen'],
            description: 'Style visuel de l\'erreur',
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'danger', 'success', 'warning'],
            description: 'Couleur d\'accentuation',
        },
        showDetails: {
            control: 'boolean',
            description: 'Afficher les détails techniques',
        },
        showReset: {
            control: 'boolean',
            description: 'Afficher le bouton de réinitialisation',
        },
        resetText: {
            control: 'text',
            description: 'Texte du bouton de réinitialisation',
        },
        title: {
            control: 'text',
            description: 'Titre de l\'erreur',
        },
        description: {
            control: 'text',
            description: 'Description de l\'erreur',
        },
    },
};

export default meta;
type Story = StoryObj<typeof ErrorBoundary>;

// ============ COMPOSANT QUI LANCE UNE ERREUR ============

const BuggyComponent = () => {
    const [shouldThrow, setShouldThrow] = useState(true);

    if (shouldThrow) {
        throw new Error('Erreur simulée !');
    }

    return (
        <div className="space-y-4 p-6 bg-card rounded-lg border border-border text-center">
            <Text variant="h5" className="font-bold">Composant fonctionnel</Text>
            <Text color="muted">Cliquez sur le bouton pour déclencher une erreur.</Text>
            <Button
                variant="danger"
                onClick={() => setShouldThrow(true)}
            >
                Déclencher une erreur
            </Button>
        </div>
    );
};

// ============ STORIES ============

export const Default: Story = {
    render: () => (
        <div className="max-w-2xl w-full">
            <ErrorBoundary variant="default" color="danger">
                <BuggyComponent />
            </ErrorBoundary>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Erreur avec le style par défaut.',
            },
        },
    },
};

export const Minimal: Story = {
    render: () => (
        <div className="max-w-2xl w-full">
            <ErrorBoundary variant="minimal" color="warning">
                <BuggyComponent />
            </ErrorBoundary>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Erreur avec un style minimal.',
            },
        },
    },
};

export const Card: Story = {
    render: () => (
        <div className="max-w-2xl w-full">
            <ErrorBoundary variant="card" color="danger">
                <BuggyComponent />
            </ErrorBoundary>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Erreur avec un style carte centré.',
            },
        },
    },
};

export const Fullscreen: Story = {
    render: () => (
        <div className="w-full">
            <ErrorBoundary variant="fullscreen" color="danger">
                <BuggyComponent />
            </ErrorBoundary>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Erreur en plein écran avec overlay.',
            },
        },
    },
};

export const WithDetails: Story = {
    render: () => (
        <div className="max-w-2xl w-full">
            <ErrorBoundary
                variant="card"
                color="danger"
                showDetails
                title="Erreur critique"
                description="Une erreur inattendue s'est produite."
            >
                <BuggyComponent />
            </ErrorBoundary>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Erreur avec affichage des détails techniques.',
            },
        },
    },
};

export const WithoutReset: Story = {
    render: () => (
        <div className="max-w-2xl w-full">
            <ErrorBoundary
                variant="card"
                color="warning"
                showReset={false}
                title="Action bloquée"
                description="Cette action a été bloquée."
            >
                <BuggyComponent />
            </ErrorBoundary>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Erreur sans bouton de réinitialisation.',
            },
        },
    },
};

export const SuccessColor: Story = {
    render: () => (
        <div className="max-w-2xl w-full">
            <ErrorBoundary variant="card" color="success">
                <BuggyComponent />
            </ErrorBoundary>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Erreur avec une couleur de succès (pour les erreurs récupérables).',
            },
        },
    },
};

export const WarningColor: Story = {
    render: () => (
        <div className="max-w-2xl w-full">
            <ErrorBoundary variant="card" color="warning">
                <BuggyComponent />
            </ErrorBoundary>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Erreur avec une couleur d\'avertissement.',
            },
        },
    },
};

// ============ AVEC FALLBACK PERSONNALISÉ ============

export const CustomFallback: Story = {
    render: () => (
        <div className="max-w-2xl w-full">
            <ErrorBoundary
                variant="card"
                color="danger"
                fallback={(error, reset) => (
                    <div className="p-8 text-center">
                        <div className="text-6xl mb-4">😅</div>
                        <Text variant="h4" className="font-bold text-danger">
                            Oups ! Une erreur s'est produite
                        </Text>
                        <Text color="muted" className="mt-2">
                            {error.message}
                        </Text>
                        <div className="mt-6 flex gap-3 justify-center">
                            <Button variant="primary" onClick={reset}>
                                Réessayer
                            </Button>
                            <Button variant="outline" onClick={() => window.location.href = '/'}>
                                Accueil
                            </Button>
                        </div>
                    </div>
                )}
            >
                <BuggyComponent />
            </ErrorBoundary>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Erreur avec un fallback personnalisé.',
            },
        },
    },
};

// ============ AVEC ONERROR ============

export const WithOnError: Story = {
    render: () => (
        <div className="max-w-2xl w-full">
            <ErrorBoundary
                variant="card"
                color="danger"
                onError={(error, errorInfo) => {
                    console.error('Erreur capturée:', error);
                    console.error('Info:', errorInfo);
                }}
            >
                <BuggyComponent />
            </ErrorBoundary>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Erreur avec un callback onError pour logger l\'erreur.',
            },
        },
    },
};
