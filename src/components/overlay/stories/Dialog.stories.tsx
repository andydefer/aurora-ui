// src/components/overlay/stories/Dialog.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Dialog, DialogType } from '../Dialog';
import { useState } from 'react';
import { Button } from '../../forms/Button';
import { Text } from '../../typography/Text';

const meta: Meta<typeof Dialog> = {
    title: 'Overlay/Dialog',
    component: Dialog,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un dialogue polyvalent qui peut être utilisé comme modal, alerte, confirmation ou avec timeout.',
            },
        },
    },
    argTypes: {
        type: {
            control: 'select',
            options: ['default', 'info', 'success', 'warning', 'destructive', 'confirm', 'timeout'],
            description: 'Type de dialogue',
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'],
            description: 'Taille du dialogue',
        },
        timeout: {
            control: 'number',
            description: 'Temps en millisecondes avant fermeture automatique (type: timeout)',
        },
        showTimer: {
            control: 'boolean',
            description: 'Afficher le compteur (type: timeout)',
        },
        showCancel: {
            control: 'boolean',
            description: 'Afficher le bouton Annuler',
        },
        showReject: {
            control: 'boolean',
            description: 'Afficher le bouton Rejeter (type: confirm)',
        },
        loading: {
            control: 'boolean',
            description: 'État de chargement',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

// Template avec état
const DialogWithState = ({
    children,
    ...props
}: React.PropsWithChildren<Partial<React.ComponentProps<typeof Dialog>>>) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full min-h-[300px] flex items-center justify-center">
            <Button variant="primary" onClick={() => setOpen(true)}>
                Ouvrir le dialogue
            </Button>
            <Dialog
                {...props}
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={() => {
                    console.log('Confirmé !');
                    setOpen(false);
                }}
                onReject={() => {
                    console.log('Rejeté !');
                    setOpen(false);
                }}
                onTimeout={() => {
                    console.log('Timeout !');
                    setOpen(false);
                }}
            >
                {children}
            </Dialog>
        </div>
    );
};

// ============ DIALOGUES STANDARD ============

export const Default: Story = {
    render: (args) => (
        <DialogWithState {...args}>
            <Text>Ceci est un dialogue standard sans actions spécifiques.</Text>
        </DialogWithState>
    ),
    args: {
        type: 'default',
        title: 'Dialogue standard',
        size: 'md',
        showCloseButton: true,
        closeOnBackdrop: true,
    },
};

// ============ ALERTES ============

export const AlertInfo: Story = {
    render: (args) => (
        <DialogWithState {...args}>
            <Text>Ceci est une information importante pour vous.</Text>
        </DialogWithState>
    ),
    args: {
        type: 'info',
        title: 'Information',
        description: 'Voici une information importante.',
        confirmText: 'Compris',
        cancelText: 'Annuler',
        size: 'sm',
        showCancel: true,
    },
};

export const AlertSuccess: Story = {
    render: (args) => (
        <DialogWithState {...args}>
            <Text>Votre action a été réalisée avec succès.</Text>
        </DialogWithState>
    ),
    args: {
        type: 'success',
        title: 'Succès !',
        description: 'Votre action a été réalisée avec succès.',
        confirmText: 'Continuer',
        cancelText: 'Fermer',
        size: 'sm',
        showCancel: false,
    },
};

export const AlertWarning: Story = {
    render: (args) => (
        <DialogWithState {...args}>
            <Text>Cette action est irréversible.</Text>
        </DialogWithState>
    ),
    args: {
        type: 'warning',
        title: 'Attention',
        description: 'Êtes-vous sûr de vouloir effectuer cette action ? Elle est irréversible.',
        confirmText: 'Confirmer',
        cancelText: 'Annuler',
        size: 'sm',
        showCancel: true,
        confirmButtonColor: 'warning',
    },
};

export const AlertError: Story = {
    render: (args) => (
        <DialogWithState {...args}>
            <Text>Une erreur critique est survenue.</Text>
        </DialogWithState>
    ),
    args: {
        type: 'destructive',
        title: 'Erreur',
        description: 'Une erreur inattendue s\'est produite. Veuillez réessayer.',
        confirmText: 'Réessayer',
        cancelText: 'Annuler',
        size: 'sm',
        showCancel: true,
        confirmButtonColor: 'destructive',
    },
};

// ============ CONFIRMATION ============

export const ConfirmDialog: Story = {
    render: (args) => (
        <DialogWithState {...args}>
            <Text>Veuillez confirmer ou rejeter cette action.</Text>
        </DialogWithState>
    ),
    args: {
        type: 'confirm',
        title: 'Confirmation',
        description: 'Êtes-vous sûr de vouloir effectuer cette action ?',
        confirmText: 'Accepter',
        rejectText: 'Rejeter',
        cancelText: 'Annuler',
        size: 'sm',
        showCancel: false,
        showReject: true,
        confirmButtonColor: 'success',
    },
};

export const ConfirmDanger: Story = {
    render: (args) => (
        <DialogWithState {...args}>
            <Text>Cette action est dangereuse et irréversible.</Text>
        </DialogWithState>
    ),
    args: {
        type: 'confirm',
        title: 'Confirmation dangereuse',
        description: 'Êtes-vous sûr de vouloir supprimer cet élément ?',
        confirmText: 'Supprimer',
        rejectText: 'Annuler',
        cancelText: 'Fermer',
        size: 'sm',
        showCancel: false,
        showReject: true,
        confirmButtonColor: 'destructive',
    },
};

// ============ TIMEOUT ============

export const TimeoutDialog: Story = {
    render: (args) => (
        <DialogWithState {...args}>
            <Text>Ce dialogue se fermera automatiquement si vous ne répondez pas.</Text>
        </DialogWithState>
    ),
    args: {
        type: 'timeout',
        title: 'Session expirée',
        description: 'Votre session va expirer dans quelques secondes. Cliquez sur "Continuer" pour rester connecté.',
        confirmText: 'Continuer',
        cancelText: 'Fermer',
        size: 'sm',
        timeout: 10000,
        showTimer: true,
        showCancel: true,
        confirmButtonColor: 'primary',
    },
};

export const TimeoutShort: Story = {
    render: (args) => (
        <DialogWithState {...args}>
            <Text>Attention, ce dialogue se ferme rapidement !</Text>
        </DialogWithState>
    ),
    args: {
        type: 'timeout',
        title: 'Alerte rapide',
        description: 'Vous avez 3 secondes pour réagir !',
        confirmText: 'Je suis là',
        cancelText: 'Ignorer',
        size: 'sm',
        timeout: 3000,
        showTimer: true,
        showCancel: true,
        confirmButtonColor: 'warning',
    },
};

export const TimeoutWithoutTimer: Story = {
    render: (args) => (
        <DialogWithState {...args}>
            <Text>Le compteur est caché mais le timeout est actif.</Text>
        </DialogWithState>
    ),
    args: {
        type: 'timeout',
        title: 'Timeout sans compteur',
        description: 'Ce dialogue se fermera dans 5 secondes sans afficher de compteur.',
        confirmText: 'Continuer',
        cancelText: 'Fermer',
        size: 'sm',
        timeout: 5000,
        showTimer: false,
        showCancel: true,
        confirmButtonColor: 'primary',
    },
};

// ============ VARIANTS ============

export const Loading: Story = {
    render: (args) => (
        <DialogWithState {...args}>
            <Text>Votre demande est en cours de traitement.</Text>
        </DialogWithState>
    ),
    args: {
        type: 'info',
        title: 'Chargement',
        description: 'Veuillez patienter pendant le traitement.',
        confirmText: 'Confirmer',
        cancelText: 'Annuler',
        size: 'sm',
        showCancel: false,
        loading: true,
    },
};

export const LargeSize: Story = {
    render: (args) => (
        <DialogWithState {...args}>
            <Text>Ce dialogue est en taille large avec plus de contenu.</Text>
            <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-3 bg-primary/10 rounded-md text-center text-foreground text-sm">
                    Card 1
                </div>
                <div className="p-3 bg-primary/10 rounded-md text-center text-foreground text-sm">
                    Card 2
                </div>
                <div className="p-3 bg-primary/10 rounded-md text-center text-foreground text-sm">
                    Card 3
                </div>
                <div className="p-3 bg-primary/10 rounded-md text-center text-foreground text-sm">
                    Card 4
                </div>
            </div>
        </DialogWithState>
    ),
    args: {
        type: 'info',
        title: 'Informations détaillées',
        description: 'Ce dialogue contient des informations supplémentaires.',
        confirmText: 'Compris',
        cancelText: 'Fermer',
        size: 'lg',
        showCancel: true,
    },
};

export const Scrollable: Story = {
    render: (args) => (
        <DialogWithState {...args}>
            <div className="space-y-4">
                <Text>Contenu scrollable avec beaucoup d&apos;éléments.</Text>
                {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="p-3 bg-muted/10 rounded-md">
                        <Text className="text-sm">Élément {i + 1}</Text>
                    </div>
                ))}
            </div>
        </DialogWithState>
    ),
    args: {
        type: 'default',
        title: 'Contenu scrollable',
        size: 'md',
        scrollable: true,
        showCloseButton: true,
        closeOnBackdrop: true,
    },
};

// ============ COMPARAISONS ============

export const AllTypes: Story = {
    render: () => {
        const [openType, setOpenType] = useState<DialogType | null>(null);

        const types: { type: DialogType; title: string; description: string; label: string }[] = [
            { type: 'default', title: 'Standard', description: 'Dialogue standard.', label: 'Default' },
            { type: 'info', title: 'Information', description: 'Ceci est une information.', label: 'Info' },
            { type: 'success', title: 'Succès !', description: 'Action réussie !', label: 'Success' },
            { type: 'warning', title: 'Attention', description: 'Action potentiellement dangereuse.', label: 'Warning' },
            { type: 'destructive', title: 'Erreur', description: 'Une erreur est survenue.', label: 'Error' },
            { type: 'confirm', title: 'Confirmation', description: 'Confirmez ou rejetez.', label: 'Confirm' },
            { type: 'timeout', title: 'Timeout', description: 'Ce dialogue expire dans 5s.', label: 'Timeout' },
        ];

        return (
            <div className="space-y-4 max-w-2xl w-full">
                <div className="flex flex-wrap gap-2 justify-center">
                    {types.map(({ type, label }) => (
                        <Button
                            key={type}
                            variant="primary"
                            size="sm"
                            onClick={() => setOpenType(type)}
                        >
                            {label}
                        </Button>
                    ))}
                </div>

                {types.map(({ type, title, description }) => (
                    <Dialog
                        key={type}
                        type={type}
                        title={title}
                        description={description}
                        open={openType === type}
                        onClose={() => setOpenType(null)}
                        onConfirm={() => {
                            console.log(`Confirmé: ${type}`);
                            setOpenType(null);
                        }}
                        onReject={() => {
                            console.log(`Rejeté: ${type}`);
                            setOpenType(null);
                        }}
                        onTimeout={() => {
                            console.log(`Timeout: ${type}`);
                            setOpenType(null);
                        }}
                        confirmText="Confirmer"
                        cancelText="Annuler"
                        rejectText="Rejeter"
                        size="sm"
                        showCancel
                        showReject={type === 'confirm'}
                        timeout={5000}
                        showTimer={type === 'timeout'}
                    />
                ))}
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Tous les types de dialogues disponibles.',
            },
        },
    },
};

export const InteractivePlayground: Story = {
    render: (args) => (
        <DialogWithState {...args}>
            <Text>Testez différentes options dans le panneau de contrôle.</Text>
            <div className="mt-4 p-4 bg-muted/10 rounded-md">
                <Text className="text-sm text-muted-foreground">
                    Type: {args.type} • Size: {args.size}
                    {args.type === 'timeout' && ` • Timeout: ${args.timeout}ms`}
                </Text>
            </div>
        </DialogWithState>
    ),
    args: {
        type: 'confirm',
        title: 'Playground',
        description: 'Ce dialogue est interactif.',
        confirmText: 'Confirmer',
        cancelText: 'Annuler',
        rejectText: 'Rejeter',
        size: 'md',
        showCancel: true,
        showReject: true,
        loading: false,
        timeout: 5000,
        showTimer: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Playground interactif pour tester toutes les options.',
            },
        },
    },
};