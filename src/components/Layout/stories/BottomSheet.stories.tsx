import type { Meta, StoryObj } from '@storybook/react';
import { BottomSheet } from '../BottomSheet';
import { useState } from 'react';

const meta: Meta<typeof BottomSheet> = {
    title: 'Layout/BottomSheet',
    component: BottomSheet,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        open: { control: 'boolean' },
        height: {
            control: 'select',
            options: ['auto', 'half', 'full'],
        },
        draggable: { control: 'boolean' },
        showHandle: { control: 'boolean' },
        closeOnBackdrop: { control: 'boolean' },
        title: { control: 'text' },
        maxWidth: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

const BottomSheetWithState = ({
    children,
    ...props
}: React.PropsWithChildren<Partial<React.ComponentProps<typeof BottomSheet>>>) => {
    const [open, setOpen] = useState(true);
    return (
        <div className="w-full min-h-[400px] flex items-center justify-center">
            <button
                onClick={() => setOpen(true)}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
                Ouvrir Bottom Sheet
            </button>
            <BottomSheet
                {...props}
                open={open}
                onClose={() => setOpen(false)}
            >
                {children}
            </BottomSheet>
        </div>
    );
};

export const Default: Story = {
    render: (args) => (
        <BottomSheetWithState {...args}>
            <div className="space-y-4">
                <p className="text-foreground text-base">
                    Ceci est un bottom sheet avec du contenu.
                </p>
                <p className="text-muted-foreground text-sm">
                    Vous pouvez le faire glisser vers le bas pour fermer.
                </p>
                <div className="bg-muted/20 p-4 rounded-lg">
                    <p className="text-sm text-foreground">Contenu supplémentaire</p>
                </div>
            </div>
        </BottomSheetWithState>
    ),
    args: {
        height: 'half',
        title: 'Bottom Sheet',
        draggable: true,
        showHandle: true,
        closeOnBackdrop: true,
        maxWidth: '750px',
    },
};

export const FullHeight: Story = {
    render: (args) => (
        <BottomSheetWithState {...args}>
            <div className="space-y-4">
                <p className="text-foreground text-base">
                    Bottom sheet en hauteur complète.
                </p>
                <p className="text-muted-foreground text-sm">
                    Idéal pour les formulaires ou le contenu dense.
                </p>
            </div>
        </BottomSheetWithState>
    ),
    args: {
        height: 'full',
        title: 'Plein écran',
        draggable: true,
        showHandle: true,
        closeOnBackdrop: true,
        maxWidth: '750px',
    },
};

export const AutoHeight: Story = {
    render: (args) => (
        <BottomSheetWithState {...args}>
            <div className="space-y-4">
                <p className="text-foreground text-base">
                    La hauteur s\'adapte au contenu.
                </p>
                <div className="bg-muted/20 p-4 rounded-lg">
                    <p className="text-sm text-foreground">Contenu supplémentaire</p>
                </div>
                <div className="bg-muted/20 p-4 rounded-lg">
                    <p className="text-sm text-foreground">Encore plus de contenu</p>
                </div>
            </div>
        </BottomSheetWithState>
    ),
    args: {
        height: 'auto',
        title: 'Hauteur automatique',
        draggable: true,
        showHandle: true,
        closeOnBackdrop: true,
        maxWidth: '750px',
    },
};

export const WithoutHandle: Story = {
    render: (args) => (
        <BottomSheetWithState {...args}>
            <div className="space-y-4">
                <p className="text-foreground text-base">
                    Bottom sheet sans poignée de glissement.
                </p>
                <p className="text-muted-foreground text-sm">
                    Utilisez le bouton de fermeture pour refermer.
                </p>
            </div>
        </BottomSheetWithState>
    ),
    args: {
        height: 'half',
        title: 'Sans poignée',
        draggable: false,
        showHandle: false,
        closeOnBackdrop: true,
        maxWidth: '750px',
    },
};

export const WithForm: Story = {
    render: (args) => (
        <BottomSheetWithState {...args}>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                        Nom complet
                    </label>
                    <input
                        type="text"
                        placeholder="Jean Dupont"
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none transition-shadow"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="jean@email.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none transition-shadow"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                        Message
                    </label>
                    <textarea
                        rows={3}
                        placeholder="Votre message..."
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none transition-shadow resize-none"
                    />
                </div>
                <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    Envoyer
                </button>
            </div>
        </BottomSheetWithState>
    ),
    args: {
        height: 'auto',
        title: 'Formulaire',
        draggable: true,
        showHandle: true,
        closeOnBackdrop: true,
        maxWidth: '750px',
    },
};

export const WithLongContent: Story = {
    render: (args) => (
        <BottomSheetWithState {...args}>
            <div className="space-y-3">
                <p className="text-foreground text-base font-medium mb-3">Liste d'éléments :</p>
                {Array.from({ length: 15 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/20 transition-colors"
                    >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                            {i + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-foreground font-medium truncate">
                                Élément {i + 1}
                            </p>
                            <p className="text-muted-foreground text-sm truncate">
                                Description de l'élément {i + 1}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </BottomSheetWithState>
    ),
    args: {
        height: 'full',
        title: 'Liste d\'éléments',
        draggable: true,
        showHandle: true,
        closeOnBackdrop: true,
        maxWidth: '750px',
    },
};

export const WideMaxWidth: Story = {
    render: (args) => (
        <BottomSheetWithState {...args}>
            <div className="space-y-4">
                <p className="text-foreground text-base">
                    Bottom sheet avec une largeur maximale de 900px.
                </p>
                <p className="text-muted-foreground text-sm">
                    Idéal pour les écrans larges.
                </p>
            </div>
        </BottomSheetWithState>
    ),
    args: {
        height: 'half',
        title: 'Large maxWidth',
        draggable: true,
        showHandle: true,
        closeOnBackdrop: true,
        maxWidth: '900px',
    },
};

export const NarrowMaxWidth: Story = {
    render: (args) => (
        <BottomSheetWithState {...args}>
            <div className="space-y-4">
                <p className="text-foreground text-base">
                    Bottom sheet avec une largeur maximale de 400px.
                </p>
                <p className="text-muted-foreground text-sm">
                    Idéal pour les formulaires compacts.
                </p>
            </div>
        </BottomSheetWithState>
    ),
    args: {
        height: 'auto',
        title: 'Narrow maxWidth',
        draggable: true,
        showHandle: true,
        closeOnBackdrop: true,
        maxWidth: '400px',
    },
};