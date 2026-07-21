import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from '../Grid';
import { Box } from '..';
import Item from '../../../utils/helpers/Item';

const meta: Meta<typeof Grid> = {
    title: 'Layout/Grid',
    component: Grid,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        columns: {
            control: 'select',
            options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        },
        gap: {
            control: 'select',
            options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
        },
        gapX: {
            control: 'select',
            options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
        },
        gapY: {
            control: 'select',
            options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
        },
        align: {
            control: 'select',
            options: ['start', 'center', 'end', 'stretch'],
        },
        justify: {
            control: 'select',
            options: ['start', 'center', 'end', 'stretch'],
        },
        autoRows: { control: 'boolean' },
        autoCols: { control: 'boolean' },
        flow: {
            control: 'select',
            options: ['row', 'col', 'dense', 'row-dense', 'col-dense'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Grid>;


export const Default: Story = {
    args: {
        columns: 3,
        gap: 4,
        children: (
            <>
                <Item>1</Item>
                <Item>2</Item>
                <Item>3</Item>
                <Item>4</Item>
                <Item>5</Item>
                <Item>6</Item>
            </>
        ),
    },
};

export const TwoColumns: Story = {
    args: {
        columns: 2,
        gap: 6,
        children: (
            <>
                <Item>Colonne 1</Item>
                <Item>Colonne 2</Item>
                <Item>Colonne 3</Item>
                <Item>Colonne 4</Item>
            </>
        ),
    },
};

export const FourColumns: Story = {
    args: {
        columns: 4,
        gap: 4,
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

export const WithGapXAndY: Story = {
    args: {
        columns: 3,
        gapX: 6,
        gapY: 8,
        children: (
            <>
                <Item>1</Item>
                <Item>2</Item>
                <Item>3</Item>
                <Item>4</Item>
                <Item>5</Item>
                <Item>6</Item>
            </>
        ),
    },
};

export const CenteredItems: Story = {
    args: {
        columns: 3,
        gap: 4,
        align: 'center',
        justify: 'center',
        className: 'min-h-[200px] bg-muted/10 rounded-md p-4',
        children: (
            <>
                <Item>Centré</Item>
                <Item>Centré</Item>
                <Item>Centré</Item>
            </>
        ),
    },
};

export const Cards: Story = {
    args: {
        columns: 3,
        gap: 4,
        className: 'max-w-4xl',
        children: (
            <>
                <Box className="bg-card p-4 rounded-md shadow-sm border border-border hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                        <span className="text-2xl">📊</span>
                    </div>
                    <h4 className="font-bold text-foreground">Card 1</h4>
                    <p className="text-sm text-muted-foreground">Description de la carte 1</p>
                </Box>
                <Box className="bg-card p-4 rounded-md shadow-sm border border-border hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                        <span className="text-2xl">📈</span>
                    </div>
                    <h4 className="font-bold text-foreground">Card 2</h4>
                    <p className="text-sm text-muted-foreground">Description de la carte 2</p>
                </Box>
                <Box className="bg-card p-4 rounded-md shadow-sm border border-border hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                        <span className="text-2xl">📋</span>
                    </div>
                    <h4 className="font-bold text-foreground">Card 3</h4>
                    <p className="text-sm text-muted-foreground">Description de la carte 3</p>
                </Box>
                <Box className="bg-card p-4 rounded-md shadow-sm border border-border hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                        <span className="text-2xl">📦</span>
                    </div>
                    <h4 className="font-bold text-foreground">Card 4</h4>
                    <p className="text-sm text-muted-foreground">Description de la carte 4</p>
                </Box>
                <Box className="bg-card p-4 rounded-md shadow-sm border border-border hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                        <span className="text-2xl">🎯</span>
                    </div>
                    <h4 className="font-bold text-foreground">Card 5</h4>
                    <p className="text-sm text-muted-foreground">Description de la carte 5</p>
                </Box>
                <Box className="bg-card p-4 rounded-md shadow-sm border border-border hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                        <span className="text-2xl">⭐</span>
                    </div>
                    <h4 className="font-bold text-foreground">Card 6</h4>
                    <p className="text-sm text-muted-foreground">Description de la carte 6</p>
                </Box>
            </>
        ),
    },
};

export const WithAutoRows: Story = {
    args: {
        columns: 3,
        gap: 4,
        autoRows: true,
        children: (
            <>
                <Item>1</Item>
                <Item>2<br />Ligne 2</Item>
                <Item>3</Item>
                <Item>4</Item>
                <Item>5<br />Ligne 2<br />Ligne 3</Item>
                <Item>6</Item>
            </>
        ),
    },
};

export const WithFlowCol: Story = {
    args: {
        columns: 3,
        gap: 4,
        flow: 'col',
        className: 'max-w-md',
        children: (
            <>
                <Item>1</Item>
                <Item>2</Item>
                <Item>3</Item>
                <Item>4</Item>
                <Item>5</Item>
                <Item>6</Item>
            </>
        ),
    },
};

export const ResponsiveGrid: Story = {
    render: () => (
        <div className="w-full max-w-4xl">
            <Grid columns={1} gap={4} className="sm:grid-cols-2 lg:grid-cols-4">
                <Item>1</Item>
                <Item>2</Item>
                <Item>3</Item>
                <Item>4</Item>
                <Item>5</Item>
                <Item>6</Item>
                <Item>7</Item>
                <Item>8</Item>
            </Grid>
            <p className="text-sm text-muted-foreground mt-4 text-center">
                Responsive: 1 colonne sur mobile, 2 sur tablette, 4 sur desktop
            </p>
        </div>
    ),
};

export const AsSection: Story = {
    args: {
        as: 'section',
        columns: 2,
        gap: 4,
        className: 'bg-muted/10 rounded-md p-4',
        children: (
            <>
                <Item>Section 1</Item>
                <Item>Section 2</Item>
            </>
        ),
    },
};