import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../Stack';
import { Box } from '../Box';
import { Text } from '../../typography/Text';
import Item from '../../../utils/helpers/Item';

const meta: Meta<typeof Stack> = {
    title: 'Layout/Stack',
    component: Stack,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        direction: {
            control: 'select',
            options: ['vertical', 'horizontal'],
        },
        spacing: {
            control: 'select',
            options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
        },
        wrap: { control: 'boolean' },
        align: {
            control: 'select',
            options: ['start', 'center', 'end', 'stretch'],
        },
        justify: {
            control: 'select',
            options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
        },
        reverse: { control: 'boolean' },
        inline: { control: 'boolean' },
        grow: { control: 'boolean' },
        shrink: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const Default: Story = {
    args: {
        direction: 'vertical',
        spacing: 4,
        children: (
            <>
                <Item>1</Item>
                <Item>2</Item>
                <Item>3</Item>
            </>
        ),
    },
};

export const Horizontal: Story = {
    args: {
        direction: 'horizontal',
        spacing: 4,
        children: (
            <>
                <Item>Item 1</Item>
                <Item>Item 2</Item>
                <Item>Item 3</Item>
            </>
        ),
    },
};

export const WithWrap: Story = {
    args: {
        direction: 'horizontal',
        spacing: 4,
        wrap: true,
        className: 'max-w-[300px]',
        children: (
            <>
                <Item>1</Item>
                <Item>2</Item>
                <Item>3</Item>
                <Item>4</Item>
                <Item>5</Item>
                <Item>6</Item>
                <Item>7</Item>
                <Item>8</Item>
            </>
        ),
    },
};

export const Centered: Story = {
    args: {
        direction: 'vertical',
        spacing: 4,
        align: 'center',
        justify: 'center',
        className: 'min-h-[200px] bg-muted/10 rounded-md p-4',
        children: (
            <>
                <Item>Centré</Item>
                <Item>Stack</Item>
            </>
        ),
    },
};

export const SpaceBetween: Story = {
    args: {
        direction: 'horizontal',
        spacing: 4,
        justify: 'between',
        className: 'w-full max-w-md bg-muted/10 rounded-md p-4',
        children: (
            <>
                <Item>Gauche</Item>
                <Item>Centre</Item>
                <Item>Droite</Item>
            </>
        ),
    },
};

export const Reverse: Story = {
    args: {
        direction: 'horizontal',
        reverse: true,
        spacing: 4,
        className: 'bg-muted/10 rounded-md p-4',
        children: (
            <>
                <Item>1</Item>
                <Item>2</Item>
                <Item>3</Item>
            </>
        ),
    },
};

export const Inline: Story = {
    args: {
        inline: true,
        spacing: 4,
        className: 'bg-muted/10 rounded-md p-4',
        children: (
            <>
                <Item>1</Item>
                <Item>2</Item>
                <Item>3</Item>
            </>
        ),
    },
};

export const WithDivider: Story = {
    args: {
        direction: 'vertical',
        spacing: 4,
        divider: (
            <div className="w-full h-px bg-border" />
        ),
        children: (
            <>
                <Item>Section 1</Item>
                <Item>Section 2</Item>
                <Item>Section 3</Item>
            </>
        ),
    },
};

export const WithDividerHorizontal: Story = {
    args: {
        direction: 'horizontal',
        spacing: 4,
        divider: (
            <div className="w-px h-8 bg-border" />
        ),
        children: (
            <>
                <Item>Item 1</Item>
                <Item>Item 2</Item>
                <Item>Item 3</Item>
            </>
        ),
    },
};

export const NestedStacks: Story = {
    args: {
        direction: 'vertical',
        spacing: 4,
        className: 'bg-muted/10 rounded-md p-4 max-w-md',
        children: (
            <>
                <Text variant="h4" className="text-foreground">En-tête</Text>
                <Stack direction="horizontal" spacing={4} className="w-full">
                    <Item color="bg-primary/20" className="flex-1">Gauche</Item>
                    <Item color="bg-primary/20" className="flex-1">Droite</Item>
                </Stack>
                <Stack direction="vertical" spacing={2}>
                    <Item color="bg-secondary/20">Élément 1</Item>
                    <Item color="bg-secondary/20">Élément 2</Item>
                    <Item color="bg-secondary/20">Élément 3</Item>
                </Stack>
            </>
        ),
    },
};

export const Grow: Story = {
    args: {
        direction: 'horizontal',
        spacing: 4,
        grow: true,
        className: 'w-full max-w-md bg-muted/10 rounded-md p-4',
        children: (
            <>
                <Item>Fixé</Item>
                <Box className="flex-grow bg-primary/10 p-4 rounded-md text-center text-foreground font-medium">
                    Grow
                </Box>
                <Item>Fixé</Item>
            </>
        ),
    },
};

export const FormLayout: Story = {
    args: {
        direction: 'vertical',
        spacing: 6,
        className: 'w-full max-w-md bg-card p-6 rounded-md shadow-md border border-border',
        children: (
            <>
                <Stack direction="vertical" spacing={2}>
                    <Text variant="small" color="muted" className="text-foreground">Nom complet</Text>
                    <input
                        type="text"
                        placeholder="Jean Dupont"
                        className="w-full px-4 py-2.5 rounded-md border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                </Stack>
                <Stack direction="vertical" spacing={2}>
                    <Text variant="small" color="muted" className="text-foreground">Email</Text>
                    <input
                        type="email"
                        placeholder="jean@email.com"
                        className="w-full px-4 py-2.5 rounded-md border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                </Stack>
                <Stack direction="horizontal" spacing={4}>
                    <button className="flex-1 px-6 py-2.5 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
                        Envoyer
                    </button>
                    <button className="flex-1 px-6 py-2.5 bg-muted text-foreground rounded-md font-medium hover:bg-muted/80 transition-colors">
                        Annuler
                    </button>
                </Stack>
            </>
        ),
    },
};

export const ResponsiveStack: Story = {
    args: {
        direction: 'horizontal',
        spacing: 4,
        wrap: true,
        className: 'w-full max-w-lg bg-muted/10 rounded-md p-4',
        children: (
            <>
                <Box className="flex-1 min-w-[150px] bg-primary/10 p-4 rounded-md text-center text-foreground font-medium">
                    Flexible
                </Box>
                <Box className="flex-1 min-w-[150px] bg-primary/10 p-4 rounded-md text-center text-foreground font-medium">
                    Flexible
                </Box>
                <Box className="w-full sm:w-auto bg-primary/10 p-4 rounded-md text-center text-foreground font-medium">
                    Pleine largeur sur mobile
                </Box>
            </>
        ),
    },
};