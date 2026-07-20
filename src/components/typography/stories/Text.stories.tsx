import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../Text';

const meta: Meta<typeof Text> = {
    title: 'Layout/Text',
    component: Text,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'small', 'caption'],
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'danger', 'success', 'warning'],
        },
        align: {
            control: 'select',
            options: ['left', 'center', 'right', 'justify'],
        },
        weight: {
            control: 'select',
            options: ['normal', 'medium', 'semibold', 'bold'],
        },
        truncate: { control: 'boolean' },
        italic: { control: 'boolean' },
        underline: { control: 'boolean' },
        lineThrough: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const H1: Story = {
    args: {
        variant: 'h1',
        children: 'Heading 1',
    },
};

export const H2: Story = {
    args: {
        variant: 'h2',
        children: 'Heading 2',
    },
};

export const H3: Story = {
    args: {
        variant: 'h3',
        children: 'Heading 3',
    },
};

export const H4: Story = {
    args: {
        variant: 'h4',
        children: 'Heading 4',
    },
};

export const H5: Story = {
    args: {
        variant: 'h5',
        children: 'Heading 5',
    },
};

export const H6: Story = {
    args: {
        variant: 'h6',
        children: 'Heading 6',
    },
};

export const Body: Story = {
    args: {
        variant: 'body',
        children: 'Texte de corps standard.',
    },
};

export const Small: Story = {
    args: {
        variant: 'small',
        children: 'Texte en petit format.',
    },
};

export const Caption: Story = {
    args: {
        variant: 'caption',
        children: 'Texte en légende.',
    },
};

export const WithColor: Story = {
    args: {
        variant: 'body',
        color: 'danger',
        children: 'Texte en couleur danger',
    },
};

export const Centered: Story = {
    args: {
        variant: 'h3',
        align: 'center',
        children: 'Texte centré',
    },
};

export const Bold: Story = {
    args: {
        variant: 'body',
        weight: 'bold',
        children: 'Texte en gras',
    },
};

export const Italic: Story = {
    args: {
        variant: 'body',
        italic: true,
        children: 'Texte en italique',
    },
};

export const Underline: Story = {
    args: {
        variant: 'body',
        underline: true,
        children: 'Texte souligné',
    },
};

export const LineThrough: Story = {
    args: {
        variant: 'body',
        lineThrough: true,
        children: 'Texte barré',
    },
};

export const Truncated: Story = {
    args: {
        variant: 'body',
        truncate: true,
        className: 'max-w-xs',
        children: 'Ceci est un texte très long qui devrait être tronqué avec des points de suspension',
    },
};

export const Combined: Story = {
    args: {
        variant: 'h3',
        color: 'primary',
        align: 'center',
        weight: 'bold',
        italic: true,
        children: 'Texte combiné',
    },
};

export const AsSpan: Story = {
    args: {
        as: 'span',
        variant: 'body',
        children: 'Ce texte est rendu en tant que span',
    },
};

export const AsDiv: Story = {
    args: {
        as: 'div',
        variant: 'body',
        children: 'Ce texte est rendu en tant que div',
    },
};