import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from '../Flex';
import Item from '../../../utils/helpers/Item';

const meta: Meta<typeof Flex> = {
    title: 'Layout/Flex',
    component: Flex,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        direction: {
            control: 'select',
            options: ['horizontal', 'vertical'],
        },
        gap: {
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
        inline: { control: 'boolean' },
        reverse: { control: 'boolean' },
        grow: { control: 'boolean' },
        shrink: { control: 'boolean' },
        basis: {
            control: 'select',
            options: ['auto', 'full', 'half', 'third', 'quarter'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Flex>;

export const Default: Story = {
    args: {
        gap: 4,
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
        gap: 6,
        children: (
            <>
                <Item>Item 1</Item>
                <Item>Item 2</Item>
                <Item>Item 3</Item>
                <Item>Item 4</Item>
            </>
        ),
    },
};

export const Vertical: Story = {
    args: {
        direction: 'vertical',
        gap: 4,
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
        gap: 4,
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
        direction: 'horizontal',
        gap: 4,
        align: 'center',
        justify: 'center',
        className: 'min-h-[150px] bg-muted/10 rounded-lg p-4',
        children: (
            <>
                <Item>Centré</Item>
                <Item>Flex</Item>
            </>
        ),
    },
};

export const SpaceBetween: Story = {
    args: {
        direction: 'horizontal',
        gap: 4,
        justify: 'between',
        className: 'w-full max-w-md bg-muted/10 rounded-lg p-4',
        children: (
            <>
                <Item>Gauche</Item>
                <Item>Centre</Item>
                <Item>Droite</Item>
            </>
        ),
    },
};

export const Inline: Story = {
    args: {
        inline: true,
        gap: 4,
        className: 'bg-muted/10 rounded-lg p-4',
        children: (
            <>
                <Item>1</Item>
                <Item>2</Item>
                <Item>3</Item>
            </>
        ),
    },
};

export const Reverse: Story = {
    args: {
        direction: 'horizontal',
        reverse: true,
        gap: 4,
        className: 'bg-muted/10 rounded-lg p-4',
        children: (
            <>
                <Item>1</Item>
                <Item>2</Item>
                <Item>3</Item>
            </>
        ),
    },
};

export const WithGrow: Story = {
    args: {
        direction: 'horizontal',
        gap: 4,
        className: 'w-full max-w-md bg-muted/10 rounded-lg p-4',
        children: (
            <>
                <Item>Fixé</Item>
                <div className="flex-grow bg-primary/10 p-4 rounded-lg text-center text-foreground font-medium">
                    Grow
                </div>
                <Item>Fixé</Item>
            </>
        ),
    },
};

export const WithBasis: Story = {
    args: {
        direction: 'horizontal',
        gap: 4,
        className: 'w-full max-w-md bg-muted/10 rounded-lg p-4',
        children: (
            <>
                <div className="basis-1/2 bg-primary/10 p-4 rounded-lg text-center text-foreground font-medium">
                    1/2
                </div>
                <div className="basis-1/2 bg-primary/10 p-4 rounded-lg text-center text-foreground font-medium">
                    1/2
                </div>
            </>
        ),
    },
};

export const ResponsiveLayout: Story = {
    args: {
        direction: 'horizontal',
        gap: 4,
        wrap: true,
        className: 'w-full max-w-lg bg-muted/10 rounded-lg p-4',
        children: (
            <>
                <div className="flex-1 min-w-[150px] bg-primary/10 p-4 rounded-lg text-center text-foreground font-medium">
                    Flexible
                </div>
                <div className="flex-1 min-w-[150px] bg-primary/10 p-4 rounded-lg text-center text-foreground font-medium">
                    Flexible
                </div>
                <div className="w-full sm:w-auto bg-primary/10 p-4 rounded-lg text-center text-foreground font-medium">
                    Pleine largeur sur mobile
                </div>
            </>
        ),
    },
};

export const CardGrid: Story = {
    args: {
        direction: 'horizontal',
        gap: 4,
        wrap: true,
        className: 'w-full max-w-2xl bg-muted/10 rounded-lg p-4',
        children: (
            <>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                        key={i}
                        className="flex-1 min-w-[120px] bg-card p-4 rounded-lg shadow-sm border border-border text-center"
                    >
                        <p className="text-foreground font-bold text-lg">{i}</p>
                        <p className="text-muted-foreground text-sm">Card {i}</p>
                    </div>
                ))}
            </>
        ),
    },
};

export const FormLayout: Story = {
    args: {
        direction: 'vertical',
        gap: 6,
        className: 'w-full max-w-md bg-card p-6 rounded-lg shadow-md border border-border',
        children: (
            <>
                <Flex direction="vertical" gap={2}>
                    <label className="text-sm font-medium text-foreground">Nom complet</label>
                    <input
                        type="text"
                        placeholder="Jean Dupont"
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                </Flex>
                <Flex direction="vertical" gap={2}>
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <input
                        type="email"
                        placeholder="jean@email.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                </Flex>
                <Flex direction="horizontal" gap={4}>
                    <button className="flex-1 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                        Envoyer
                    </button>
                    <button className="flex-1 px-6 py-2.5 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors">
                        Annuler
                    </button>
                </Flex>
            </>
        ),
    },
};