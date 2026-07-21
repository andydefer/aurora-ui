// src/components/feedback/stories/Spinner.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '../Spinner';

const meta: Meta<typeof Spinner> = {
    title: 'Feedback/Spinner',
    component: Spinner,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un spinner de chargement.',
            },
        },
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
            description: 'Taille du spinner',
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'destructive', 'success', 'warning'],
            description: 'Couleur du spinner',
        },
        thickness: {
            control: 'number',
            description: 'Épaisseur du trait',
        },
        label: {
            control: 'text',
            description: 'Texte d\'accompagnement',
        },
        labelPosition: {
            control: 'select',
            options: ['left', 'right', 'bottom', 'top'],
            description: 'Position du label',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
    args: {
        size: 'md',
        color: 'primary',
        thickness: 2,
    },
};

export const Primary: Story = {
    args: {
        size: 'md',
        color: 'primary',
        thickness: 2,
    },
};

export const Secondary: Story = {
    args: {
        size: 'md',
        color: 'secondary',
        thickness: 2,
    },
};

export const Success: Story = {
    args: {
        size: 'md',
        color: 'success',
        thickness: 2,
    },
};

export const Warning: Story = {
    args: {
        size: 'md',
        color: 'warning',
        thickness: 2,
    },
};

export const Danger: Story = {
    args: {
        size: 'md',
        color: 'destructive',
        thickness: 2,
    },
};

export const Muted: Story = {
    args: {
        size: 'md',
        color: 'muted',
        thickness: 2,
    },
};

export const XS: Story = {
    args: {
        size: 'xs',
        color: 'primary',
        thickness: 2,
    },
};

export const SM: Story = {
    args: {
        size: 'sm',
        color: 'primary',
        thickness: 2,
    },
};

export const MD: Story = {
    args: {
        size: 'md',
        color: 'primary',
        thickness: 2,
    },
};

export const LG: Story = {
    args: {
        size: 'lg',
        color: 'primary',
        thickness: 2,
    },
};

export const XL: Story = {
    args: {
        size: 'xl',
        color: 'primary',
        thickness: 2,
    },
};

export const WithLabel: Story = {
    args: {
        size: 'md',
        color: 'primary',
        thickness: 2,
        label: 'Chargement...',
        labelPosition: 'right',
    },
};

export const LabelLeft: Story = {
    args: {
        size: 'md',
        color: 'primary',
        thickness: 2,
        label: 'Chargement...',
        labelPosition: 'left',
    },
};

export const LabelBottom: Story = {
    args: {
        size: 'md',
        color: 'primary',
        thickness: 2,
        label: 'Chargement...',
        labelPosition: 'bottom',
    },
};

export const AllSizes: Story = {
    render: () => (
        <div className="flex items-center gap-6 max-w-2xl">
            <Spinner size="xs" />
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Spinner size="xl" />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Toutes les tailles de spinners disponibles.',
            },
        },
    },
};

export const AllColors: Story = {
    render: () => (
        <div className="flex items-center gap-6 max-w-2xl">
            <Spinner color="primary" />
            <Spinner color="secondary" />
            <Spinner color="success" />
            <Spinner color="warning" />
            <Spinner color="destructive" />
            <Spinner color="muted" />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Toutes les couleurs disponibles.',
            },
        },
    },
};

export const InteractivePlayground: Story = {
    args: {
        size: 'md',
        color: 'primary',
        thickness: 2,
        label: 'Chargement...',
        labelPosition: 'right',
    },
    parameters: {
        docs: {
            description: {
                story: 'Playground interactif pour tester toutes les options.',
            },
        },
    },
};