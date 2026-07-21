import type { Meta, StoryObj } from '@storybook/react';
import { Paragraph } from '../Paragraph';

const meta: Meta<typeof Paragraph> = {
    title: 'Typography/Paragraph',
    component: Paragraph,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        align: {
            control: 'select',
            options: ['left', 'center', 'right', 'justify'],
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'destructive', 'success', 'warning'],
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl'],
        },
        leading: {
            control: 'select',
            options: ['none', 'tight', 'normal', 'relaxed', 'loose'],
        },
        weight: {
            control: 'select',
            options: ['normal', 'medium', 'semibold', 'bold'],
        },
        maxLines: {
            control: 'select',
            options: [1, 2, 3, 4, 5, 6],
        },
        indent: { control: 'boolean' },
        firstLetter: { control: 'boolean' },
        dropCap: { control: 'boolean' },
        spaced: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Paragraph>;

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

export const Default: Story = {
    args: {
        children: lorem,
    },
};

export const Large: Story = {
    args: {
        children: lorem,
        size: 'lg',
    },
};

export const Small: Story = {
    args: {
        children: lorem,
        size: 'sm',
    },
};

export const Centered: Story = {
    args: {
        children: lorem,
        align: 'center',
    },
};

export const Justified: Story = {
    args: {
        children: lorem,
        align: 'justify',
    },
};

export const Muted: Story = {
    args: {
        children: lorem,
        color: 'muted',
    },
};

export const Danger: Story = {
    args: {
        children: lorem,
        color: 'destructive',
    },
};

export const Success: Story = {
    args: {
        children: lorem,
        color: 'success',
    },
};

export const WithIndent: Story = {
    args: {
        children: lorem,
        indent: true,
    },
};

export const WithDropCap: Story = {
    args: {
        children: lorem,
        dropCap: true,
    },
};

export const WithFirstLetter: Story = {
    args: {
        children: lorem,
        firstLetter: true,
    },
};

export const Bold: Story = {
    args: {
        children: lorem,
        weight: 'bold',
    },
};

export const WithSpacing: Story = {
    args: {
        children: lorem,
        spaced: true,
    },
};

export const Truncated: Story = {
    args: {
        children: lorem,
        maxLines: 2,
        className: 'max-w-md',
    },
};

export const Relaxed: Story = {
    args: {
        children: lorem,
        leading: 'relaxed',
    },
};

export const Loose: Story = {
    args: {
        children: lorem,
        leading: 'loose',
    },
};

export const MultipleStyles: Story = {
    render: () => (
        <div className="max-w-2xl space-y-4">
            <Paragraph size="lg" weight="bold" color="primary">
                Titre du paragraphe
            </Paragraph>
            <Paragraph dropCap indent>
                {lorem}
            </Paragraph>
            <Paragraph>
                {lorem}
            </Paragraph>
            <Paragraph color="muted" size="sm">
                Note de bas de page : Ceci est un texte plus petit et moins visible.
            </Paragraph>
        </div>
    ),
};

export const Comparison: Story = {
    render: () => (
        <div className="max-w-2xl space-y-6">
            <div>
                <Paragraph weight="semibold" className="mb-1">Normal (sans drop cap)</Paragraph>
                <Paragraph>{lorem}</Paragraph>
            </div>
            <div>
                <Paragraph weight="semibold" className="mb-1">Avec drop cap</Paragraph>
                <Paragraph dropCap>{lorem}</Paragraph>
            </div>
            <div>
                <Paragraph weight="semibold" className="mb-1">Avec first letter</Paragraph>
                <Paragraph firstLetter>{lorem}</Paragraph>
            </div>
            <div>
                <Paragraph weight="semibold" className="mb-1">Avec indentation</Paragraph>
                <Paragraph indent>{lorem}</Paragraph>
            </div>
        </div>
    ),
};

export const AllSizes: Story = {
    render: () => (
        <div className="max-w-2xl space-y-2">
            <Paragraph size="xs">Texte extra small (xs)</Paragraph>
            <Paragraph size="sm">Texte small (sm)</Paragraph>
            <Paragraph size="base">Texte base</Paragraph>
            <Paragraph size="lg">Texte large (lg)</Paragraph>
            <Paragraph size="xl">Texte extra large (xl)</Paragraph>
            <Paragraph size="2xl">Texte 2xl</Paragraph>
        </div>
    ),
};