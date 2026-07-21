import type { Meta, StoryObj } from '@storybook/react';
import { SplitPane } from '../SplitPane';
import { Box } from '../Box';
import { Text } from '../../typography/Text';

const meta: Meta<typeof SplitPane> = {
    title: 'Layout/SplitPane',
    component: SplitPane,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        split: {
            control: 'select',
            options: ['vertical', 'horizontal'],
        },
        minSize: { control: 'number' },
        maxSize: { control: 'number' },
        defaultSize: { control: 'number' },
        showGrip: { control: 'boolean' },
        snap: { control: 'boolean' },
        snapSize: { control: 'number' },
    },
};

export default meta;
type Story = StoryObj<typeof SplitPane>;

const PaneContent = ({ color, label }: { color: string; label: string }) => (
    <Box
        className={`h-full flex items-center justify-center ${color} p-8`}
    >
        <div className="text-center">
            <Text variant="h3" className="text-primary-foreground">{label}</Text>
            <Text className="text-primary-foreground/70">
                Redimensionnez en faisant glisser le séparateur
            </Text>
        </div>
    </Box>
);

export const Default: Story = {
    args: {
        split: 'vertical',
        minSize: 100,
        maxSize: 500,
        defaultSize: 250,
        showGrip: true,
        className: 'h-[400px] w-full max-w-2xl border border-border rounded-md',
        children: [
            <PaneContent key="left" color="bg-primary" label="Panneau gauche" />,
            <PaneContent key="right" color="bg-secondary" label="Panneau droit" />,
        ],
    },
};

export const Horizontal: Story = {
    args: {
        split: 'horizontal',
        minSize: 100,
        maxSize: 400,
        defaultSize: 200,
        showGrip: true,
        className: 'h-[500px] w-full max-w-2xl border border-border rounded-md',
        children: [
            <PaneContent key="top" color="bg-primary" label="Panneau haut" />,
            <PaneContent key="bottom" color="bg-secondary" label="Panneau bas" />,
        ],
    },
};

export const WithCustomSizes: Story = {
    args: {
        split: 'vertical',
        minSize: 150,
        maxSize: 600,
        defaultSize: 300,
        showGrip: true,
        className: 'h-[400px] w-full max-w-2xl border border-border rounded-md',
        children: [
            <PaneContent key="left" color="bg-primary" label="Panneau gauche (min: 150px)" />,
            <PaneContent key="right" color="bg-secondary" label="Panneau droit (max: 600px)" />,
        ],
    },
};

export const WithoutGrip: Story = {
    args: {
        split: 'vertical',
        minSize: 100,
        maxSize: 500,
        defaultSize: 250,
        showGrip: false,
        className: 'h-[400px] w-full max-w-2xl border border-border rounded-md',
        children: [
            <PaneContent key="left" color="bg-primary" label="Sans grip" />,
            <PaneContent key="right" color="bg-secondary" label="Sans grip" />,
        ],
    },
};

export const WithSnap: Story = {
    args: {
        split: 'vertical',
        minSize: 100,
        maxSize: 500,
        defaultSize: 250,
        snap: true,
        snapSize: 50,
        showGrip: true,
        className: 'h-[400px] w-full max-w-2xl border border-border rounded-md',
        children: [
            <PaneContent key="left" color="bg-primary" label="Snap (50px)" />,
            <PaneContent key="right" color="bg-secondary" label="Snap (50px)" />,
        ],
    },
};

export const WithContent: Story = {
    args: {
        split: 'vertical',
        minSize: 150,
        maxSize: 500,
        defaultSize: 250,
        showGrip: true,
        className: 'h-[400px] w-full max-w-2xl border border-border rounded-md',
        children: [
            <Box key="left" className="h-full bg-primary/10 p-6 overflow-auto">
                <Text variant="h4" className="mb-4 text-foreground">Menu</Text>
                <nav className="flex flex-col gap-2">
                    <a href="#" className="px-3 py-2 rounded-md hover:bg-primary/20 text-foreground transition-colors">Accueil</a>
                    <a href="#" className="px-3 py-2 rounded-md hover:bg-primary/20 text-foreground transition-colors">Produits</a>
                    <a href="#" className="px-3 py-2 rounded-md hover:bg-primary/20 text-foreground transition-colors">Services</a>
                    <a href="#" className="px-3 py-2 rounded-md hover:bg-primary/20 text-foreground transition-colors">Contact</a>
                </nav>
            </Box>,
            <Box key="right" className="h-full bg-secondary/10 p-6 overflow-auto">
                <Text variant="h4" className="mb-4 text-foreground">Contenu principal</Text>
                <Text className="text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </Text>
                <Box className="mt-4 p-4 bg-card rounded-md border border-border">
                    <Text className="text-foreground">Informations supplémentaires</Text>
                </Box>
            </Box>,
        ],
    },
};

export const ThreePanes: Story = {
    render: function Render() {
        return (
            <SplitPane
                split="vertical"
                minSize={150}
                maxSize={400}
                defaultSize={200}
                className="h-[400px] w-full max-w-2xl border border-border rounded-md"
                showGrip={true}
            >
                <PaneContent key="left" color="bg-primary" label="Menu" />
                <SplitPane
                    split="horizontal"
                    minSize={100}
                    maxSize={300}
                    defaultSize={200}
                    className="h-full"
                    showGrip={true}
                >
                    <PaneContent key="top" color="bg-secondary" label="Contenu" />
                    <PaneContent key="bottom" color="bg-muted" label="Pied de page" />
                </SplitPane>
            </SplitPane>
        );
    },
};