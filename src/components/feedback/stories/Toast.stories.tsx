// src/components/feedback/stories/Toast.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastPosition } from '../Toast';
import { ToastContainer } from '../ToastContainer';
import { useState } from 'react';
import { Button } from '../../forms/Button';
import { Text } from '../../typography/Text';
import { Bell, Mail, Heart, Star } from 'lucide-react';

const meta: Meta<typeof Toast> = {
    title: 'Feedback/Toast',
    component: Toast,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un toast pour afficher des notifications temporaires.',
            },
        },
    },
    argTypes: {
        type: {
            control: 'select',
            options: ['info', 'success', 'warning', 'destructive'],
            description: 'Type de toast',
        },
        position: {
            control: 'select',
            options: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'],
            description: 'Position du toast',
        },
        duration: {
            control: 'number',
            description: 'Durée d\'affichage en ms',
        },
        dismissible: {
            control: 'boolean',
            description: 'Afficher le bouton de fermeture',
        },
        progress: {
            control: 'boolean',
            description: 'Afficher la barre de progression',
        },
        stacked: {
            control: 'boolean',
            description: 'Permettre l\'empilement des toasts',
        },
        title: {
            control: 'text',
            description: 'Titre du toast',
        },
        message: {
            control: 'text',
            description: 'Message du toast',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Toast>;

// ============ COMPOSANT DE DÉMONSTRATION ============

const ToastDemo = ({ position = 'top-right', stacked = false, ...props }: Partial<React.ComponentProps<typeof Toast>> & { position?: ToastPosition }) => {
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
        { type: 'info', message: 'Information importante', title: 'Info', icon: <Bell size={16} /> },
        { type: 'success', message: 'Action réussie avec succès !', title: 'Succès', icon: <Heart size={16} /> },
        { type: 'warning', message: 'Attention à cette action', title: 'Avertissement', icon: <Star size={16} /> },
        { type: 'destructive', message: 'Une erreur est survenue', title: 'Erreur', icon: <Mail size={16} /> },
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
                    💡 Position: {position} {stacked ? '• Empilé' : '• Un seul toast visible'}
                </Text>
            </div>

            <ToastContainer position={position} newestOnTop={stacked}>
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        type={toast.type as any}
                        title={toast.title}
                        message={toast.message}
                        position={position}
                        duration={props.duration || 3500}
                        dismissible={props.dismissible !== undefined ? props.dismissible : true}
                        progress={props.progress !== undefined ? props.progress : true}
                        stacked={stacked}
                        onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                        {...props}
                    />
                ))}
            </ToastContainer>
        </div>
    );
};

// ============ STORIES ============

export const Info: Story = {
    render: () => <ToastDemo position="top-right" />,
    args: {
        type: 'info',
        duration: 3500,
        dismissible: true,
        progress: true,
        title: 'Information',
        message: 'Ceci est un toast informatif.',
    },
    parameters: {
        docs: {
            description: {
                story: 'Toast de type information.',
            },
        },
    },
};

export const Success: Story = {
    render: () => <ToastDemo position="top-right" />,
    args: {
        type: 'success',
        duration: 3500,
        dismissible: true,
        progress: true,
        title: 'Succès !',
        message: 'Votre action a été réalisée avec succès.',
    },
};

export const Warning: Story = {
    render: () => <ToastDemo position="top-right" />,
    args: {
        type: 'warning',
        duration: 3500,
        dismissible: true,
        progress: true,
        title: 'Attention',
        message: 'Veuillez vérifier vos informations.',
    },
};

export const Error: Story = {
    render: () => <ToastDemo position="top-right" />,
    args: {
        type: 'destructive',
        duration: 3500,
        dismissible: true,
        progress: true,
        title: 'Erreur',
        message: 'Une erreur inattendue s\'est produite.',
    },
};

export const TopLeft: Story = {
    render: () => <ToastDemo position="top-left" />,
    args: {
        type: 'info',
        duration: 3500,
        dismissible: true,
        progress: true,
        title: 'Information',
        message: 'Toast en haut à gauche.',
    },
};

export const BottomRight: Story = {
    render: () => <ToastDemo position="bottom-right" />,
    args: {
        type: 'info',
        duration: 3500,
        dismissible: true,
        progress: true,
        title: 'Information',
        message: 'Toast en bas à droite.',
    },
};

export const BottomLeft: Story = {
    render: () => <ToastDemo position="bottom-left" />,
    args: {
        type: 'info',
        duration: 3500,
        dismissible: true,
        progress: true,
        title: 'Information',
        message: 'Toast en bas à gauche.',
    },
};

export const TopCenter: Story = {
    render: () => <ToastDemo position="top-center" />,
    args: {
        type: 'info',
        duration: 3500,
        dismissible: true,
        progress: true,
        title: 'Information',
        message: 'Toast en haut au centre.',
    },
};

export const BottomCenter: Story = {
    render: () => <ToastDemo position="bottom-center" />,
    args: {
        type: 'info',
        duration: 3500,
        dismissible: true,
        progress: true,
        title: 'Information',
        message: 'Toast en bas au centre.',
    },
};

export const Stacked: Story = {
    render: () => <ToastDemo position="top-right" stacked={true} />,
    args: {
        type: 'info',
        duration: 3500,
        dismissible: true,
        progress: true,
        stacked: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Toasts empilés (plusieurs visibles simultanément).',
            },
        },
    },
};

export const WithoutDismiss: Story = {
    render: () => <ToastDemo position="top-right" />,
    args: {
        type: 'success',
        duration: 3500,
        dismissible: false,
        progress: true,
        title: 'Succès !',
        message: 'Ce toast n\'a pas de bouton de fermeture.',
    },
};

export const WithoutProgress: Story = {
    render: () => <ToastDemo position="top-right" />,
    args: {
        type: 'info',
        duration: 3500,
        dismissible: true,
        progress: false,
        title: 'Information',
        message: 'Ce toast n\'a pas de barre de progression.',
    },
};

export const LongDuration: Story = {
    render: () => <ToastDemo position="top-right" />,
    args: {
        type: 'info',
        duration: 6000,
        dismissible: true,
        progress: true,
        title: 'Information',
        message: 'Ce toast reste visible 6 secondes.',
    },
};

export const ShortDuration: Story = {
    render: () => <ToastDemo position="top-right" />,
    args: {
        type: 'info',
        duration: 1500,
        dismissible: true,
        progress: true,
        title: 'Information',
        message: 'Ce toast reste visible 1.5 secondes.',
    },
};

export const AllTypes: Story = {
    render: () => {
        const [toasts, setToasts] = useState<Array<{ id: number; type: string; message: string; title: string }>>([]);
        const [counter, setCounter] = useState(0);

        const addToast = (type: string, message: string, title: string) => {
            const id = counter;
            setCounter(counter + 1);
            setToasts([...toasts, { id, type, message, title }]);
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, 4000);
        };

        const types = [
            { type: 'info', message: 'Information importante', title: 'Info' },
            { type: 'success', message: 'Action réussie !', title: 'Succès' },
            { type: 'warning', message: 'Attention nécessaire', title: 'Avertissement' },
            { type: 'destructive', message: 'Erreur critique', title: 'Erreur' },
        ];

        return (
            <div className="space-y-4 w-full max-w-2xl">
                <div className="flex flex-wrap gap-3">
                    {types.map(({ type, message, title }) => (
                        <Button
                            key={type}
                            variant={type as any}
                            size="md"
                            onClick={() => addToast(type, message, title)}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Button>
                    ))}
                </div>

                <ToastContainer position="top-right">
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
};

export const InteractivePlayground: Story = {
    render: (args) => {
        const position = args.position || 'top-right';
        const stacked = args.stacked || false;

        return <ToastDemo position={position} stacked={stacked} {...args} />;
    },
    args: {
        type: 'info',
        position: 'top-right',
        duration: 3500,
        dismissible: true,
        progress: true,
        stacked: false,
        title: 'Playground',
        message: 'Testez les options dans le panneau de contrôle.',
    },
    parameters: {
        docs: {
            description: {
                story: 'Playground interactif pour tester toutes les options.',
            },
        },
    },
};