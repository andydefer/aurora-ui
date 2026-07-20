import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from '../Heading';

const meta: Meta<typeof Heading> = {
    title: 'Typography/Heading',
    component: Heading,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        level: {
            control: 'select',
            options: [1, 2, 3, 4, 5, 6],
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
    },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const H1: Story = {
    args: {
        level: 1,
        children: 'Heading 1',
    },
};

export const H2: Story = {
    args: {
        level: 2,
        children: 'Heading 2',
    },
};

export const H3: Story = {
    args: {
        level: 3,
        children: 'Heading 3',
    },
};

export const WithColor: Story = {
    args: {
        level: 2,
        color: 'danger',
        children: 'Danger heading',
    },
};

export const Centered: Story = {
    args: {
        level: 2,
        align: 'center',
        children: 'Centered heading',
    },
};

export const Truncated: Story = {
    args: {
        level: 3,
        truncate: true,
        className: 'max-w-xs',
        children: 'This is a very long heading that should be truncated',
    },
};