// src/components/feedback/stories/Snackbar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Snackbar } from '../Snackbar';
import { useState } from 'react';
import { Button } from '../../forms/Button';

const meta: Meta<typeof Snackbar> = {
    title: 'Feedback/Snackbar',
    component: Snackbar,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Une notification temporaire en bas de l\'écran.',
            },
        },
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['info', 'success', 'warning', 'destructive'],
            description: 'Type de snackbar',
        },
        position: {
            control: 'select',
            options: ['bottom-center', 'bottom-left', 'bottom-right', 'top-center', 'top-left', 'top-right'],
            description: 'Position de la snackbar',
        },
        duration: {
            control: 'number',
            description: 'Durée d\'affichage en ms',
        },
        showIcon: {
            control: 'boolean',
            description: 'Afficher l\'icône',
        },
        message: {
            control: 'text',
            description: 'Message de la snackbar',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

const SnackbarDemo = ({ ...props }: Partial<React.ComponentProps<typeof Snackbar>>) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        setTimeout(() => setOpen(false), props.duration || 4000);
    };

    return (
        <div className="space-y-4 w-full max-w-2xl">
            <Button variant="primary" onClick={handleOpen}>
                Afficher la snackbar
            </Button>
            <Snackbar
                {...props}
                open={open}
                onClose={() => setOpen(false)}
            />
        </div>
    );
};

export const Info: Story = {
    render: () => <SnackbarDemo variant="info" message="💡 Nouvelle mise à jour disponible" />,
    parameters: {
        docs: {
            description: {
                story: 'Snackbar de type information.',
            },
        },
    },
};

export const Success: Story = {
    render: () => <SnackbarDemo variant="success" message="✅ Fichier téléchargé avec succès" />,
    parameters: {
        docs: {
            description: {
                story: 'Snackbar de type succès.',
            },
        },
    },
};

export const Warning: Story = {
    render: () => <SnackbarDemo variant="warning" message="⚠️ Votre session va expirer dans 5 minutes" />,
    parameters: {
        docs: {
            description: {
                story: 'Snackbar de type avertissement.',
            },
        },
    },
};

export const Error: Story = {
    render: () => <SnackbarDemo variant="destructive" message="❌ Erreur de connexion au serveur" />,
    parameters: {
        docs: {
            description: {
                story: 'Snackbar de type erreur.',
            },
        },
    },
};

export const WithAction: Story = {
    render: () => (
        <SnackbarDemo
            variant="info"
            message="📧 Nouveau message reçu"
            action={<Button variant="primary" size="sm">Voir</Button>}
        />
    ),
    parameters: {
        docs: {
            description: {
                story: 'Snackbar avec action.',
            },
        },
    },
};

export const WithoutIcon: Story = {
    render: () => <SnackbarDemo variant="info" message="Sans icône" showIcon={false} />,
    parameters: {
        docs: {
            description: {
                story: 'Snackbar sans icône.',
            },
        },
    },
};

export const TopCenter: Story = {
    render: () => <SnackbarDemo variant="info" message="En haut centre" position="top-center" />,
    parameters: {
        docs: {
            description: {
                story: 'Snackbar positionnée en haut centre.',
            },
        },
    },
};

export const TopRight: Story = {
    render: () => <SnackbarDemo variant="info" message="En haut droite" position="top-right" />,
    parameters: {
        docs: {
            description: {
                story: 'Snackbar positionnée en haut droite.',
            },
        },
    },
};

export const BottomLeft: Story = {
    render: () => <SnackbarDemo variant="info" message="En bas gauche" position="bottom-left" />,
    parameters: {
        docs: {
            description: {
                story: 'Snackbar positionnée en bas gauche.',
            },
        },
    },
};

export const LongDuration: Story = {
    render: () => <SnackbarDemo variant="info" message="Visible 6 secondes" duration={6000} />,
    parameters: {
        docs: {
            description: {
                story: 'Snackbar avec durée longue (6 secondes).',
            },
        },
    },
};

export const ShortDuration: Story = {
    render: () => <SnackbarDemo variant="info" message="Visible 1.5 secondes" duration={1500} />,
    parameters: {
        docs: {
            description: {
                story: 'Snackbar avec durée courte (1.5 secondes).',
            },
        },
    },
};

export const AllVariants: Story = {
    render: () => {
        const [open, setOpen] = useState<{ variant: string; message: string } | null>(null);

        const variants = [
            { variant: 'info', message: '💡 Nouvelle mise à jour disponible' },
            { variant: 'success', message: '✅ Fichier téléchargé avec succès' },
            { variant: 'warning', message: '⚠️ Votre session va expirer dans 5 minutes' },
            { variant: 'destructive', message: '❌ Erreur de connexion au serveur' },
        ];

        return (
            <div className="space-y-4 w-full max-w-2xl">
                <div className="flex flex-wrap gap-3">
                    {variants.map(({ variant, message }) => (
                        <Button
                            key={variant}
                            variant={variant as any}
                            onClick={() => setOpen({ variant, message })}
                        >
                            {variant.charAt(0).toUpperCase() + variant.slice(1)}
                        </Button>
                    ))}
                </div>
                {open && (
                    <Snackbar
                        variant={open.variant as any}
                        message={open.message}
                        open={true}
                        onClose={() => setOpen(null)}
                    />
                )}
            </div>
        );
    },
};

export const InteractivePlayground: Story = {
    render: (args) => <SnackbarDemo {...args} />,
    args: {
        variant: 'info',
        message: 'Message de la snackbar',
        position: 'bottom-center',
        duration: 4000,
        showIcon: true,
    },
};