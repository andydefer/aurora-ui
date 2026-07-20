import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '../Box';

const meta: Meta<typeof Box> = {
    title: 'Layout/Box',
    component: Box,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        padding: {
            control: 'select',
            options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
        },
        margin: {
            control: 'select',
            options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
        },
        display: {
            control: 'select',
            options: ['block', 'flex', 'grid'],
        },
        radius: {
            control: 'select',
            options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
        },
        shadow: {
            control: 'select',
            options: ['none', 'sm', 'md', 'lg', 'xl'],
        },
        border: {
            control: 'select',
            options: [false, true, 'primary', 'muted'],
        },
        hoverable: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
    args: {
        padding: 6,
        radius: 'lg',
        shadow: 'md',
        className: 'bg-card w-80',
        children: (
            <div className="text-center">
                <p className="text-foreground font-medium">Contenu de la box</p>
                <p className="text-muted-foreground text-sm">Avec ombre et coins arrondis</p>
            </div>
        ),
    },
};

export const WithPadding: Story = {
    args: {
        padding: 8,
        radius: 'lg',
        border: true,
        className: 'bg-card w-80',
        children: (
            <div>
                <p className="text-foreground font-medium">Padding large</p>
                <p className="text-muted-foreground text-sm">p-8 (32px de padding)</p>
            </div>
        ),
    },
};

export const WithFlex: Story = {
    args: {
        display: 'flex',
        gap: 4,
        padding: 4,
        radius: 'lg',
        className: 'bg-muted/20 w-96',
        children: (
            <>
                <div className="flex-1 bg-primary/10 p-4 rounded-md text-center text-foreground font-medium">
                    Item 1
                </div>
                <div className="flex-1 bg-primary/10 p-4 rounded-md text-center text-foreground font-medium">
                    Item 2
                </div>
                <div className="flex-1 bg-primary/10 p-4 rounded-md text-center text-foreground font-medium">
                    Item 3
                </div>
            </>
        ),
    },
};

export const WithGrid: Story = {
    args: {
        display: 'grid',
        gap: 4,
        padding: 4,
        radius: 'lg',
        className: 'grid-cols-3 bg-muted/20 w-96',
        children: (
            <>
                <div className="bg-primary/10 p-4 rounded-md text-center text-foreground font-medium">
                    Card 1
                </div>
                <div className="bg-primary/10 p-4 rounded-md text-center text-foreground font-medium">
                    Card 2
                </div>
                <div className="bg-primary/10 p-4 rounded-md text-center text-foreground font-medium">
                    Card 3
                </div>
                <div className="bg-primary/10 p-4 rounded-md text-center text-foreground font-medium">
                    Card 4
                </div>
                <div className="bg-primary/10 p-4 rounded-md text-center text-foreground font-medium">
                    Card 5
                </div>
                <div className="bg-primary/10 p-4 rounded-md text-center text-foreground font-medium">
                    Card 6
                </div>
            </>
        ),
    },
};

export const WithBorder: Story = {
    args: {
        padding: 6,
        radius: 'lg',
        border: 'primary',
        className: 'bg-card w-80',
        children: (
            <div className="text-center">
                <p className="text-foreground font-medium">Box avec bordure</p>
                <p className="text-muted-foreground text-sm">Bordure colorée primary</p>
            </div>
        ),
    },
};

export const WithShadow: Story = {
    args: {
        padding: 6,
        radius: 'lg',
        shadow: 'xl',
        className: 'bg-card w-80',
        children: (
            <div className="text-center">
                <p className="text-foreground font-medium">Box avec ombre</p>
                <p className="text-muted-foreground text-sm">shadow-xl pour plus de profondeur</p>
            </div>
        ),
    },
};

export const Hoverable: Story = {
    args: {
        padding: 6,
        radius: 'lg',
        shadow: 'md',
        hoverable: true,
        className: 'bg-card w-80 cursor-pointer',
        children: (
            <div className="text-center">
                <p className="text-foreground font-medium">Box interactive</p>
                <p className="text-muted-foreground text-sm">Survolez-moi !</p>
            </div>
        ),
    },
};

export const FullRounded: Story = {
    args: {
        padding: 0,
        radius: 'full',
        shadow: 'md',
        className: 'bg-primary/10 w-32 h-32 flex items-center justify-center',
        children: (
            <span className="text-foreground font-medium text-center">Cercle</span>
        ),
    },
};

export const AsSection: Story = {
    args: {
        as: 'section',
        padding: 6,
        radius: 'lg',
        shadow: 'md',
        border: true,
        className: 'bg-card w-80',
        children: (
            <div>
                <h3 className="text-foreground font-bold text-lg mb-2">Section personnalisée</h3>
                <p className="text-muted-foreground text-sm">
                    Cette box est rendue comme une balise HTML &lt;section&gt;
                </p>
            </div>
        ),
    },
};

export const NoPadding: Story = {
    args: {
        padding: 0,
        radius: 'lg',
        border: true,
        className: 'bg-card w-80',
        children: (
            <div className="p-6">
                <p className="text-foreground font-medium">Sans padding</p>
                <p className="text-muted-foreground text-sm">Le padding est géré par l'enfant</p>
            </div>
        ),
    },
};

export const WithBackground: Story = {
    args: {
        padding: 6,
        radius: 'lg',
        shadow: 'md',
        className: 'bg-gradient-to-br from-primary/20 to-primary/5 w-80',
        children: (
            <div className="text-center">
                <p className="text-foreground font-medium">Dégradé</p>
                <p className="text-muted-foreground text-sm">Fond avec dégradé de couleur</p>
            </div>
        ),
    },
};