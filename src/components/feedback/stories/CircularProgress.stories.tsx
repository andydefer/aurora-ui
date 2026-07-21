// src/components/feedback/stories/CircularProgress.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { CircularProgress } from '../CircularProgress';

const meta: Meta<typeof CircularProgress> = {
    title: 'Feedback/CircularProgress',
    component: CircularProgress,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Une barre de progression circulaire.',
            },
        },
    },
    argTypes: {
        value: {
            control: 'number',
            description: 'Valeur de progression (0-100)',
        },
        size: {
            control: 'number',
            description: 'Taille en pixels',
        },
        thickness: {
            control: 'number',
            description: 'Épaisseur du trait',
        },
        variant: {
            control: 'select',
            options: ['primary', 'success', 'warning', 'destructive'],
            description: 'Couleur de progression',
        },
        showValue: {
            control: 'boolean',
            description: 'Afficher la valeur en pourcentage',
        },
        animate: {
            control: 'boolean',
            description: 'Animation de transition',
        },
    },
};

export default meta;
type Story = StoryObj<typeof CircularProgress>;

export const Default: Story = {
    args: {
        value: 75,
        size: 48,
        thickness: 4,
        variant: 'primary',
        showValue: true,
        animate: true,
    },
};

export const Primary: Story = {
    args: {
        value: 60,
        size: 48,
        thickness: 4,
        variant: 'primary',
        showValue: true,
    },
};

export const Success: Story = {
    args: {
        value: 80,
        size: 48,
        thickness: 4,
        variant: 'success',
        showValue: true,
    },
};

export const Warning: Story = {
    args: {
        value: 45,
        size: 48,
        thickness: 4,
        variant: 'warning',
        showValue: true,
    },
};

export const Error: Story = {
    args: {
        value: 30,
        size: 48,
        thickness: 4,
        variant: 'destructive',
        showValue: true,
    },
};

export const Small: Story = {
    args: {
        value: 65,
        size: 32,
        thickness: 3,
        variant: 'primary',
        showValue: true,
    },
};

export const Large: Story = {
    args: {
        value: 85,
        size: 80,
        thickness: 6,
        variant: 'primary',
        showValue: true,
    },
};

export const WithoutValue: Story = {
    args: {
        value: 70,
        size: 48,
        thickness: 4,
        variant: 'primary',
        showValue: false,
    },
};

export const WithLabel: Story = {
    args: {
        value: 90,
        size: 48,
        thickness: 4,
        variant: 'primary',
        showValue: true,
        label: 'Progression',
    },
};

export const AllVariants: Story = {
    render: () => (
        <div className="flex gap-8 max-w-2xl">
            <CircularProgress value={60} variant="primary" />
            <CircularProgress value={80} variant="success" />
            <CircularProgress value={45} variant="warning" />
            <CircularProgress value={30} variant="destructive" />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Toutes les variantes de progression circulaire.',
            },
        },
    },
};

export const AllSizes: Story = {
    render: () => (
        <div className="flex items-center gap-8 max-w-2xl">
            <CircularProgress value={60} size={32} />
            <CircularProgress value={60} size={48} />
            <CircularProgress value={60} size={64} />
            <CircularProgress value={60} size={80} />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Toutes les tailles disponibles.',
            },
        },
    },
};

export const InteractivePlayground: Story = {
    args: {
        value: 75,
        size: 48,
        thickness: 4,
        variant: 'primary',
        showValue: true,
        animate: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Playground interactif pour tester toutes les options.',
            },
        },
    },
};