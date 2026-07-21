// src/components/feedback/stories/ProgressBar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from '../ProgressBar';
import { useState, useEffect } from 'react';
import { Button } from '../../forms/Button';
import { Text } from '../../typography/Text';

const meta: Meta<typeof ProgressBar> = {
    title: 'Feedback/ProgressBar',
    component: ProgressBar,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Une barre de progression linéaire.',
            },
        },
    },
    argTypes: {
        value: {
            control: 'number',
            description: 'Valeur de progression (0-100)',
        },
        max: {
            control: 'number',
            description: 'Valeur maximale',
        },
        variant: {
            control: 'select',
            options: ['primary', 'success', 'warning', 'destructive'],
            description: 'Couleur de progression',
        },
        animated: {
            control: 'boolean',
            description: 'Animation pulsante',
        },
        striped: {
            control: 'boolean',
            description: 'Effet rayé',
        },
        showValue: {
            control: 'boolean',
            description: 'Afficher la valeur en pourcentage',
        },
        height: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Hauteur de la barre',
        },
        rounded: {
            control: 'boolean',
            description: 'Coins arrondis',
        },
    },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
    args: {
        value: 75,
        max: 100,
        variant: 'primary',
        animated: false,
        striped: false,
        showValue: true,
        height: 'md',
        rounded: true,
        label: 'Progression',
    },
};

export const UploadProgress: Story = {
    render: () => {
        const [progress, setProgress] = useState(0);

        useEffect(() => {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 2;
                });
            }, 100);
            return () => clearInterval(interval);
        }, []);

        return (
            <div className="space-y-4 w-full max-w-2xl">
                <div className="flex items-center justify-between">
                    <Text variant="h5" className="font-bold">📤 Upload en cours</Text>
                    <Text variant="body" className="font-mono">{progress}%</Text>
                </div>
                <ProgressBar value={progress} variant="primary" animated striped showValue={false} height="lg" />
                <Text variant="small" color="muted">Fichier: document-final.pdf (24.5 MB)</Text>
            </div>
        );
    },
};

export const DownloadProgress: Story = {
    render: () => {
        const [progress, setProgress] = useState(0);

        useEffect(() => {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 3;
                });
            }, 150);
            return () => clearInterval(interval);
        }, []);

        return (
            <div className="space-y-4 w-full max-w-2xl">
                <div className="flex items-center justify-between">
                    <Text variant="h5" className="font-bold">⬇️ Téléchargement</Text>
                    <Text variant="body" className="font-mono text-success">{progress}%</Text>
                </div>
                <ProgressBar value={progress} variant="success" animated showValue={false} height="lg" />
                <Text variant="small" color="muted">Film: interstellar-4k.mkv (8.2 GB)</Text>
            </div>
        );
    },
};

export const LoadingProgress: Story = {
    render: () => {
        const [progress, setProgress] = useState(0);

        useEffect(() => {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 80);
            return () => clearInterval(interval);
        }, []);

        return (
            <div className="space-y-4 w-full max-w-2xl">
                <div className="flex items-center justify-between">
                    <Text variant="h5" className="font-bold">🔄 Chargement de l'application</Text>
                    <Text variant="body" className="font-mono text-warning">{progress}%</Text>
                </div>
                <ProgressBar value={progress} variant="warning" animated striped showValue={false} height="lg" />
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                    <Text variant="small" color="muted">Initialisation des modules...</Text>
                </div>
            </div>
        );
    },
};

export const ErrorProgress: Story = {
    render: () => {
        const [progress, setProgress] = useState(0);

        useEffect(() => {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 67) {
                        clearInterval(interval);
                        return 67;
                    }
                    return prev + 5;
                });
            }, 100);
            return () => clearInterval(interval);
        }, []);

        return (
            <div className="space-y-4 w-full max-w-2xl">
                <div className="flex items-center justify-between">
                    <Text variant="h5" className="font-bold">❌ Échec du téléchargement</Text>
                    <Text variant="body" className="font-mono text-destructive">67%</Text>
                </div>
                <ProgressBar value={progress} variant="destructive" showValue={false} height="lg" />
                <div className="flex items-center gap-2 text-destructive">
                    <span>⚠️</span>
                    <Text variant="small">Erreur de connexion. Veuillez réessayer.</Text>
                </div>
                <Button variant="primary" size="sm">Réessayer</Button>
            </div>
        );
    },
};

export const MultiStepProgress: Story = {
    render: () => {
        const [step, setStep] = useState(0);
        const steps = ['Validation', 'Traitement', 'Téléchargement', 'Terminé'];
        const progress = ((step) / (steps.length - 1)) * 100;

        return (
            <div className="space-y-4 w-full max-w-2xl">
                <div className="flex items-center justify-between">
                    <Text variant="h5" className="font-bold">📋 Étapes</Text>
                    <Text variant="body" className="font-mono">{steps[step]}</Text>
                </div>
                <ProgressBar value={progress} variant="primary" animated showValue={false} height="md" />
                <div className="flex justify-between">
                    {steps.map((s, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                            <div className={clsx(
                                'w-3 h-3 rounded-full',
                                i <= step ? 'bg-primary' : 'bg-muted'
                            )} />
                            <Text variant="caption" className={i <= step ? 'text-primary' : 'text-muted-foreground'}>
                                {s}
                            </Text>
                        </div>
                    ))}
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setStep(Math.min(step + 1, steps.length - 1))}
                        disabled={step === steps.length - 1}
                    >
                        Suivant
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setStep(Math.max(step - 1, 0))}
                        disabled={step === 0}
                    >
                        Précédent
                    </Button>
                </div>
            </div>
        );
    },
};

function clsx(...args: any[]) {
    return args.filter(Boolean).join(' ');
}

export const AllVariants: Story = {
    render: () => (
        <div className="space-y-4 max-w-2xl w-full">
            <ProgressBar value={60} variant="primary" label="Primary" />
            <ProgressBar value={80} variant="success" label="Success" />
            <ProgressBar value={45} variant="warning" label="Warning" />
            <ProgressBar value={30} variant="destructive" label="Error" />
        </div>
    ),
};

export const AllHeights: Story = {
    render: () => (
        <div className="space-y-4 max-w-2xl w-full">
            <ProgressBar value={60} height="sm" label="Small" />
            <ProgressBar value={60} height="md" label="Medium" />
            <ProgressBar value={60} height="lg" label="Large" />
        </div>
    ),
};

export const InteractivePlayground: Story = {
    args: {
        value: 75,
        max: 100,
        variant: 'primary',
        animated: false,
        striped: false,
        showValue: true,
        height: 'md',
        rounded: true,
        label: 'Progression',
    },
};