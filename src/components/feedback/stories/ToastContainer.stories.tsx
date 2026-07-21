// src/components/feedback/stories/ToastContainer.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ToastContainer } from '../ToastContainer';
import { Toast, ToastPosition } from '../Toast';
import { useState } from 'react';
import { Button } from '../../forms/Button';
import { Text } from '../../typography/Text';
import { Badge } from '../Badge';
import { CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const meta: Meta<typeof ToastContainer> = {
    title: 'Feedback/ToastContainer',
    component: ToastContainer,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un conteneur pour positionner et gérer les toasts.',
            },
        },
    },
    argTypes: {
        position: {
            control: 'select',
            options: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'],
            description: 'Position du conteneur',
        },
        newestOnTop: {
            control: 'boolean',
            description: 'Les nouveaux toasts apparaissent en haut',
        },
    },
};

export default meta;
type Story = StoryObj<typeof ToastContainer>;

// ============ COMPOSANT DE DÉMONSTRATION ============

const ToastContainerDemo = ({ position = 'top-right', newestOnTop = true }: { position?: any; newestOnTop?: boolean }) => {
    const [toasts, setToasts] = useState<Array<{ id: number; type: string; message: string; title?: string }>>([]);
    const [counter, setCounter] = useState(0);

    const addToast = (type: string, message: string, title?: string) => {
        const id = counter;
        setCounter(counter + 1);
        setToasts([...toasts, { id, type, message, title }]);

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 4000);
    };

    const toastTypes = [
        { type: 'info', message: 'Information importante', title: 'Info', icon: <Info size={16} /> },
        { type: 'success', message: 'Action réussie avec succès !', title: 'Succès', icon: <CheckCircle size={16} /> },
        { type: 'warning', message: 'Attention à cette action', title: 'Avertissement', icon: <AlertTriangle size={16} /> },
        { type: 'destructive', message: 'Une erreur est survenue', title: 'Erreur', icon: <AlertCircle size={16} /> },
    ];

    return (
        <div className="space-y-4 w-full max-w-2xl">
            <div className="flex flex-wrap gap-3">
                {toastTypes.map(({ type, message, title, icon }) => (
                    <Button
                        key={type}
                        variant={type as any}
                        size="md"
                        icon={icon}
                        onClick={() => addToast(type, message, title)}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Button>
                ))}
            </div>

            <div className="mt-4 p-4 bg-muted/10 rounded-md border border-border/50">
                <Text variant="small" color="muted">
                    💡 Position: {position} • {newestOnTop ? 'Nouveaux en haut' : 'Nouveaux en bas'}
                </Text>
            </div>

            <ToastContainer position={position} newestOnTop={newestOnTop}>
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        type={toast.type as any}
                        title={toast.title}
                        message={toast.message}
                        position={position}
                        duration={3500}
                        dismissible
                        progress
                        onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                    />
                ))}
            </ToastContainer>
        </div>
    );
};

// ============ STORIES ============

export const Default: Story = {
    render: () => <ToastContainerDemo position="top-right" />,
    parameters: {
        docs: {
            description: {
                story: 'Conteneur de toasts par défaut en haut à droite.',
            },
        },
    },
};

export const TopRight: Story = {
    render: () => <ToastContainerDemo position="top-right" />,
    parameters: {
        docs: {
            description: {
                story: 'Toasts positionnés en haut à droite.',
            },
        },
    },
};

export const TopLeft: Story = {
    render: () => <ToastContainerDemo position="top-left" />,
    parameters: {
        docs: {
            description: {
                story: 'Toasts positionnés en haut à gauche.',
            },
        },
    },
};

export const BottomRight: Story = {
    render: () => <ToastContainerDemo position="bottom-right" />,
    parameters: {
        docs: {
            description: {
                story: 'Toasts positionnés en bas à droite.',
            },
        },
    },
};

export const BottomLeft: Story = {
    render: () => <ToastContainerDemo position="bottom-left" />,
    parameters: {
        docs: {
            description: {
                story: 'Toasts positionnés en bas à gauche.',
            },
        },
    },
};

export const TopCenter: Story = {
    render: () => <ToastContainerDemo position="top-center" />,
    parameters: {
        docs: {
            description: {
                story: 'Toasts positionnés en haut au centre.',
            },
        },
    },
};

export const BottomCenter: Story = {
    render: () => <ToastContainerDemo position="bottom-center" />,
    parameters: {
        docs: {
            description: {
                story: 'Toasts positionnés en bas au centre.',
            },
        },
    },
};

export const NewestOnTop: Story = {
    render: () => <ToastContainerDemo position="top-right" newestOnTop={true} />,
    parameters: {
        docs: {
            description: {
                story: 'Les nouveaux toasts apparaissent en haut de la pile.',
            },
        },
    },
};

export const NewestOnBottom: Story = {
    render: () => <ToastContainerDemo position="top-right" newestOnTop={false} />,
    parameters: {
        docs: {
            description: {
                story: 'Les nouveaux toasts apparaissent en bas de la pile.',
            },
        },
    },
};

export const MultipleToasts: Story = {
    render: () => {
        const [toasts, setToasts] = useState<Array<{ id: number; type: string; message: string; title?: string }>>([]);
        const [counter, setCounter] = useState(0);

        const addMultiple = () => {
            const types = ['info', 'success', 'warning', 'destructive'] as const;
            const messages = [
                'Information importante',
                'Action réussie !',
                'Attention nécessaire',
                'Erreur critique'
            ];
            const titles = ['Info', 'Succès', 'Avertissement', 'Erreur'];

            for (let i = 0; i < 4; i++) {
                setTimeout(() => {
                    const id = counter + i;
                    setCounter(counter + i + 1);
                    setToasts(prev => [...prev, {
                        id,
                        type: types[i % types.length],
                        message: messages[i % messages.length],
                        title: titles[i % titles.length]
                    }]);
                    setTimeout(() => {
                        setToasts(prev => prev.filter(t => t.id !== id));
                    }, 4000);
                }, i * 500);
            }
        };

        const clearAll = () => {
            setToasts([]);
        };

        return (
            <div className="space-y-4 w-full max-w-2xl">
                <div className="flex flex-wrap gap-3">
                    <Button variant="primary" onClick={addMultiple}>
                        Afficher 4 toasts
                    </Button>
                    <Button variant="outline" onClick={clearAll}>
                        Tout effacer
                    </Button>
                    <Badge variant="outline" className="text-sm px-4 py-1.5">
                        {toasts.length} toast{toasts.length > 1 ? 's' : ''}
                    </Badge>
                </div>

                <div className="p-4 bg-muted/10 rounded-md border border-border/50">
                    <Text variant="small" color="muted">
                        💡 Les toasts s\'affichent en séquence avec un délai de 500ms entre chaque.
                    </Text>
                </div>

                <ToastContainer position="top-right" newestOnTop={true}>
                    {toasts.map((toast) => (
                        <Toast
                            key={toast.id}
                            type={toast.type as any}
                            title={toast.title}
                            message={toast.message}
                            position="top-right"
                            duration={3500}
                            dismissible
                            progress
                            onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                        />
                    ))}
                </ToastContainer>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Affichage de plusieurs toasts en séquence.',
            },
        },
    },
};

export const AllPositions: Story = {
    render: () => {
        const [activePosition, setActivePosition] = useState<ToastPosition | null>(null);
        const [toasts, setToasts] = useState<Array<{ id: number; type: string; message: string; title?: string }>>([]);
        const [counter, setCounter] = useState(0);

        const positions: ToastPosition[] = [
            'top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'
        ];

        const showToast = (position: ToastPosition) => {
            const id = counter;
            setCounter(counter + 1);
            setActivePosition(position);
            setToasts([...toasts, {
                id,
                type: 'info',
                message: `Toast en ${position.replace('-', ' ')}`,
                title: `Position: ${position}`
            }]);

            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
                setActivePosition(null);
            }, 3000);
        };

        return (
            <div className="space-y-4 w-full max-w-2xl">
                <Text variant="h5" className="font-bold">📍 Toutes les positions</Text>
                <Text color="muted" className="mb-4">
                    Cliquez sur un bouton pour afficher un toast à la position correspondante.
                </Text>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {positions.map((position) => (
                        <Button
                            key={position}
                            variant="outline"
                            size="sm"
                            onClick={() => showToast(position)}
                            disabled={activePosition !== null}
                            className="capitalize"
                        >
                            {position.replace('-', ' ')}
                        </Button>
                    ))}
                </div>

                {activePosition && (
                    <div className="p-4 bg-primary/5 rounded-md border border-primary/10">
                        <Text variant="small" className="font-medium text-primary">
                            🔔 Toast affiché en {activePosition.replace('-', ' ')}
                        </Text>
                    </div>
                )}

                {toasts.map((toast) => (
                    <ToastContainer
                        key={toast.id}
                        position={activePosition || 'top-right'}
                    >
                        <Toast
                            type={toast.type as any}
                            title={toast.title}
                            message={toast.message}
                            position={activePosition || 'top-right'}
                            duration={3000}
                            dismissible
                            progress
                            onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                        />
                    </ToastContainer>
                ))}
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Démonstration de toutes les positions disponibles.',
            },
        },
    },
};

export const InteractivePlayground: Story = {
    args: {
        position: 'top-right',
        newestOnTop: true,
    },
    render: (args) => (
        <div className="w-full max-w-2xl">
            <ToastContainerDemo position={args.position} newestOnTop={args.newestOnTop} />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Playground interactif pour tester toutes les options.',
            },
        },
    },
};