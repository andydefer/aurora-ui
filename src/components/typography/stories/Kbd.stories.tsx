import type { Meta, StoryObj } from '@storybook/react';
import { Kbd } from '../Kbd';

const meta: Meta<typeof Kbd> = {
    title: 'Typography/Kbd',
    component: Kbd,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'],
        },
        variant: {
            control: 'select',
            options: ['default', 'outline', 'ghost'],
        },
        command: { control: 'boolean' },
        shortcut: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof Kbd>;

export const Default: Story = {
    args: {
        children: 'Ctrl + C',
    },
};

export const Keys: Story = {
    args: {
        keys: ['Ctrl', 'C'],
    },
};

export const MultipleKeys: Story = {
    args: {
        keys: ['Shift', 'Ctrl', 'S'],
    },
};

export const WithShortcut: Story = {
    args: {
        shortcut: '⌘K',
    },
};

export const WithCommand: Story = {
    args: {
        command: true,
        keys: ['K'],
    },
};

export const WithCommandMultiple: Story = {
    args: {
        command: true,
        keys: ['Shift', 'K'],
    },
};

export const Large: Story = {
    args: {
        keys: ['Ctrl', 'Shift', 'S'],
        size: 'lg',
    },
};

export const Small: Story = {
    args: {
        keys: ['Ctrl', 'C'],
        size: 'sm',
    },
};

export const Outline: Story = {
    args: {
        keys: ['Ctrl', 'C'],
        variant: 'outline',
    },
};

export const Ghost: Story = {
    args: {
        keys: ['Ctrl', 'C'],
        variant: 'ghost',
    },
};

export const InText: Story = {
    render: () => (
        <p className="text-foreground max-w-md">
            Pour sauvegarder votre document, appuyez sur <Kbd keys={['Ctrl', 'S']} />.
            Pour annuler, utilisez <Kbd keys={['Ctrl', 'Z']} />.
            <br />
            <br />
            Raccourci : <Kbd shortcut="⌘K" /> pour ouvrir la recherche.
        </p>
    ),
};

export const CommonShortcuts: Story = {
    render: () => (
        <div className="flex flex-wrap gap-3 max-w-md">
            <Kbd keys={['Ctrl', 'C']} />
            <Kbd keys={['Ctrl', 'V']} />
            <Kbd keys={['Ctrl', 'X']} />
            <Kbd keys={['Ctrl', 'Z']} />
            <Kbd keys={['Ctrl', 'Shift', 'S']} />
            <Kbd keys={['Alt', 'Tab']} />
            <Kbd shortcut="⌘K" />
            <Kbd shortcut="⌘⇧P" />
        </div>
    ),
};

export const MacShortcuts: Story = {
    render: () => (
        <div className="flex flex-wrap gap-3 max-w-md">
            <Kbd command keys={['C']} />
            <Kbd command keys={['V']} />
            <Kbd command keys={['X']} />
            <Kbd command keys={['Z']} />
            <Kbd command keys={['Shift', 'S']} />
            <Kbd command keys={['Option', 'Tab']} />
            <Kbd shortcut="⌘K" />
            <Kbd shortcut="⌘⇧P" />
        </div>
    ),
};

export const AllSizes: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-3">
            <Kbd keys={['Ctrl', 'C']} size="xs" />
            <Kbd keys={['Ctrl', 'C']} size="sm" />
            <Kbd keys={['Ctrl', 'C']} size="md" />
            <Kbd keys={['Ctrl', 'C']} size="lg" />
            <Kbd keys={['Ctrl', 'C']} size="xl" />
        </div>
    ),
};

export const WithIcons: Story = {
    render: () => (
        <div className="flex flex-wrap gap-3 max-w-md">
            <Kbd keys={['⌘', 'K']} />
            <Kbd keys={['⌘', '⇧', 'P']} />
            <Kbd keys={['⌥', '⌘', 'Space']} />
            <Kbd keys={['⌘', '⌥', 'Esc']} />
        </div>
    ),
};