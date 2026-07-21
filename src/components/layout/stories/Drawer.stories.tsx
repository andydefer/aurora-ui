import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from '../Drawer';
import { useState } from 'react';

const meta: Meta<typeof Drawer> = {
    title: 'Layout/Drawer',
    component: Drawer,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        open: { control: 'boolean' },
        anchor: {
            control: 'select',
            options: ['left', 'right', 'top', 'bottom'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg', 'xl', 'full'],
        },
        title: { control: 'text' },
        backdrop: { control: 'boolean' },
        showCloseButton: { control: 'boolean' },
        closeOnBackdrop: { control: 'boolean' },
        hideHeader: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

const DrawerWithState = ({
    children,
    ...props
}: React.PropsWithChildren<Partial<React.ComponentProps<typeof Drawer>>>) => {
    const [open, setOpen] = useState(true);
    return (
        <div className="w-full min-h-[500px] flex items-center justify-center">
            <button
                onClick={() => setOpen(true)}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
                Ouvrir Drawer
            </button>
            <Drawer {...props} open={open} onClose={() => setOpen(false)}>
                {children}
            </Drawer>
        </div>
    );
};

export const Default: Story = {
    render: (args) => (
        <DrawerWithState {...args}>
            <div className="space-y-4 p-2">
                <p className="text-foreground text-base">
                    Drawer avec du contenu simple.
                </p>
                <p className="text-muted-foreground text-sm">
                    Cliquez sur le bouton de fermeture ou sur l'overlay pour fermer.
                </p>
            </div>
        </DrawerWithState>
    ),
    args: {
        anchor: 'right',
        size: '2xl',
        title: 'Drawer',
        backdrop: true,
        showCloseButton: true,
        closeOnBackdrop: true,
    },
};

export const LeftDrawer: Story = {
    render: (args) => (
        <DrawerWithState {...args}>
            <div className="space-y-4 p-2">
                <p className="text-foreground text-base">Drawer à gauche</p>
                <p className="text-muted-foreground text-sm">Ancré sur le côté gauche</p>
            </div>
        </DrawerWithState>
    ),
    args: {
        anchor: 'left',
        size: '2xl',
        title: 'Menu latéral',
        backdrop: true,
        showCloseButton: true,
        closeOnBackdrop: true,
    },
};

export const TopDrawer: Story = {
    render: (args) => (
        <DrawerWithState {...args}>
            <div className="space-y-4 p-2">
                <p className="text-foreground text-base">Drawer en haut</p>
                <p className="text-muted-foreground text-sm">Ancré en haut de l'écran</p>
            </div>
        </DrawerWithState>
    ),
    args: {
        anchor: 'top',
        size: '2xl',
        title: 'Bannière',
        backdrop: true,
        showCloseButton: true,
        closeOnBackdrop: true,
    },
};

export const BottomDrawer: Story = {
    render: (args) => (
        <DrawerWithState {...args}>
            <div className="space-y-4 p-2">
                <p className="text-foreground text-base">Drawer en bas</p>
                <p className="text-muted-foreground text-sm">Ancré en bas de l'écran</p>
            </div>
        </DrawerWithState>
    ),
    args: {
        anchor: 'bottom',
        size: '2xl',
        title: 'Bottom Drawer',
        backdrop: true,
        showCloseButton: true,
        closeOnBackdrop: true,
    },
};

export const WithoutBackdrop: Story = {
    render: (args) => (
        <DrawerWithState {...args}>
            <div className="space-y-4 p-2">
                <p className="text-foreground text-base">Drawer sans fond</p>
                <p className="text-muted-foreground text-sm">Pas d'overlay de fond</p>
            </div>
        </DrawerWithState>
    ),
    args: {
        anchor: 'right',
        size: '2xl',
        title: 'Sans fond',
        backdrop: false,
        showCloseButton: true,
        closeOnBackdrop: false,
    },
};

export const WithoutCloseButton: Story = {
    render: (args) => (
        <DrawerWithState {...args}>
            <div className="space-y-4 p-2">
                <p className="text-foreground text-base">Drawer sans bouton de fermeture</p>
                <p className="text-muted-foreground text-sm">
                    Utilisez l'overlay pour fermer ou cliquez en dehors.
                </p>
            </div>
        </DrawerWithState>
    ),
    args: {
        anchor: 'right',
        size: '2xl',
        title: 'Sans bouton',
        backdrop: true,
        showCloseButton: false,
        closeOnBackdrop: true,
    },
};

export const WithLongContent: Story = {
    render: (args) => (
        <DrawerWithState {...args}>
            <div className="space-y-4 p-2">
                <p className="text-foreground text-base font-medium">Liste d'éléments :</p>
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-4 p-3 rounded-md hover:bg-muted/20 transition-colors"
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
        </DrawerWithState>
    ),
    args: {
        anchor: 'right',
        size: '2xl',
        title: 'Liste longue',
        backdrop: true,
        showCloseButton: true,
        closeOnBackdrop: true,
    },
};

export const FullSize: Story = {
    render: (args) => (
        <DrawerWithState {...args}>
            <div className="space-y-4 p-2">
                <p className="text-foreground text-base">Drawer en taille pleine</p>
                <p className="text-muted-foreground text-sm">
                    Prend 90% de la largeur ou hauteur de l'écran.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary/10 p-4 rounded-md text-center text-foreground">
                        Card 1
                    </div>
                    <div className="bg-primary/10 p-4 rounded-md text-center text-foreground">
                        Card 2
                    </div>
                    <div className="bg-primary/10 p-4 rounded-md text-center text-foreground">
                        Card 3
                    </div>
                    <div className="bg-primary/10 p-4 rounded-md text-center text-foreground">
                        Card 4
                    </div>
                </div>
            </div>
        </DrawerWithState>
    ),
    args: {
        anchor: 'right',
        size: 'full',
        title: 'Plein écran',
        backdrop: true,
        showCloseButton: true,
        closeOnBackdrop: true,
    },
};

export const WithForm: Story = {
    render: (args) => (
        <DrawerWithState {...args}>
            <div className="space-y-4 p-2">
                <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                        Nom complet
                    </label>
                    <input
                        type="text"
                        placeholder="Jean Dupont"
                        className="w-full px-4 py-2.5 rounded-md border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none transition-shadow"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="jean@email.com"
                        className="w-full px-4 py-2.5 rounded-md border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none transition-shadow"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                        Message
                    </label>
                    <textarea
                        rows={3}
                        placeholder="Votre message..."
                        className="w-full px-4 py-2.5 rounded-md border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none transition-shadow resize-none"
                    />
                </div>
                <button className="w-full py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
                    Envoyer
                </button>
            </div>
        </DrawerWithState>
    ),
    args: {
        anchor: 'right',
        size: '2xl',
        title: 'Formulaire',
        backdrop: true,
        showCloseButton: true,
        closeOnBackdrop: true,
    },
};

export const HiddenHeader: Story = {
    render: (args) => (
        <DrawerWithState {...args}>
            <div className="space-y-4 p-2">
                <p className="text-foreground text-base">
                    Drawer sans en-tête visible.
                </p>
                <p className="text-muted-foreground text-sm">
                    Le header est caché, le contenu commence directement.
                </p>
            </div>
        </DrawerWithState>
    ),
    args: {
        anchor: 'right',
        size: '2xl',
        title: 'Sans header',
        hideHeader: true,
        backdrop: true,
        showCloseButton: false,
        closeOnBackdrop: true,
    },
};