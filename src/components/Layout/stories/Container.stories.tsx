import type { Meta, StoryObj } from '@storybook/react';
import { Container } from '../Container';

const meta: Meta<typeof Container> = {
    title: 'Layout/Container',
    component: Container,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        maxWidth: {
            control: 'select',
            options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
        },
        fluid: { control: 'boolean' },
        centered: { control: 'boolean' },
        padding: {
            control: 'select',
            options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
        },
        paddingX: {
            control: 'select',
            options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
        },
        paddingY: {
            control: 'select',
            options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
        },
        background: {
            control: 'select',
            options: ['transparent', 'primary', 'secondary', 'muted', 'card'],
        },
        border: { control: 'boolean' },
        borderRadius: {
            control: 'select',
            options: ['none', 'sm', 'md', 'lg', 'xl'],
        },
        shadow: {
            control: 'select',
            options: ['none', 'sm', 'md', 'lg', 'xl'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
    args: {
        padding: 4,
        children: (
            <div className="bg-primary/10 p-8 rounded-lg text-center">
                <p className="text-foreground font-medium">Conteneur par défaut</p>
                <p className="text-muted-foreground text-sm">max-w-lg avec padding horizontal</p>
            </div>
        ),
    },
};

export const Fluid: Story = {
    args: {
        fluid: true,
        padding: 4,
        children: (
            <div className="bg-primary/10 p-8 rounded-lg text-center">
                <p className="text-foreground font-medium">Conteneur fluide</p>
                <p className="text-muted-foreground text-sm">100% de la largeur disponible</p>
            </div>
        ),
    },
};

export const WithBackground: Story = {
    args: {
        maxWidth: 'xl',
        padding: 6,
        background: 'card',
        border: true,
        borderRadius: 'lg',
        shadow: 'md',
        children: (
            <div className="text-center py-8">
                <p className="text-foreground font-medium">Conteneur avec fond</p>
                <p className="text-muted-foreground text-sm">
                    Background card, bordure, coins arrondis et ombre
                </p>
            </div>
        ),
    },
};

export const WithCustomPadding: Story = {
    args: {
        maxWidth: 'lg',
        paddingX: 8,
        paddingY: 6,
        background: 'muted',
        borderRadius: 'lg',
        children: (
            <div className="text-center py-8">
                <p className="text-foreground font-medium">Padding personnalisé</p>
                <p className="text-muted-foreground text-sm">
                    paddingX: 8 (32px), paddingY: 6 (24px)
                </p>
            </div>
        ),
    },
};

export const FullWidthWithContent: Story = {
    args: {
        maxWidth: 'full',
        padding: 4,
        background: 'primary',
        children: (
            <div className="text-center py-8 text-primary-foreground">
                <p className="font-medium">Bannière plein écran</p>
                <p className="text-sm opacity-90">Le contenu s'étend sur toute la largeur</p>
            </div>
        ),
    },
};

export const CenteredContent: Story = {
    args: {
        maxWidth: 'sm',
        padding: 4,
        centered: true,
        border: true,
        borderRadius: 'lg',
        children: (
            <div className="text-center py-8 px-4">
                <p className="text-foreground font-medium">Contenu centré</p>
                <p className="text-muted-foreground text-sm">
                    Le conteneur est centré horizontalement avec max-w-sm
                </p>
            </div>
        ),
    },
};

export const AsSection: Story = {
    args: {
        as: 'section',
        maxWidth: 'xl',
        padding: 6,
        background: 'card',
        border: true,
        borderRadius: 'lg',
        shadow: 'md',
        children: (
            <div className="space-y-4 py-4">
                <h3 className="text-foreground font-bold text-lg">Section personnalisée</h3>
                <p className="text-muted-foreground">
                    Ce conteneur est rendu comme une balise HTML &lt;section&gt;
                </p>
                <div className="flex gap-4">
                    <div className="flex-1 bg-primary/10 p-4 rounded-md text-center text-foreground">
                        Élément 1
                    </div>
                    <div className="flex-1 bg-primary/10 p-4 rounded-md text-center text-foreground">
                        Élément 2
                    </div>
                </div>
            </div>
        ),
    },
};

export const WithGridLayout: Story = {
    args: {
        maxWidth: '2xl',
        padding: 6,
        background: 'card',
        borderRadius: 'lg',
        shadow: 'md',
        children: (
            <div className="space-y-4">
                <h3 className="text-foreground font-bold text-lg">Grille dans un container</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                            key={i}
                            className="bg-primary/10 p-4 rounded-md text-center text-foreground"
                        >
                            Card {i}
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
};

export const HeroContainer: Story = {
    args: {
        maxWidth: 'full',
        padding: 8,
        background: 'primary',
        centered: true,
        children: (
            <div className="text-center text-primary-foreground max-w-2xl mx-auto py-12">
                <h1 className="text-3xl font-bold mb-4">Hero Section</h1>
                <p className="text-lg opacity-90 mb-6">
                    Un conteneur plein écran avec du contenu centré
                </p>
                <button className="bg-white text-primary px-6 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors">
                    Commencer
                </button>
            </div>
        ),
    },
};