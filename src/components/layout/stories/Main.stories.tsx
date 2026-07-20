import type { Meta, StoryObj } from '@storybook/react';
import { Main } from '../Main';
import { Box } from '../Box';
import { Heading } from '../../typography/Heading';
import Text from '../../typography/Text';

const meta: Meta<typeof Main> = {
    title: 'Layout/Main',
    component: Main,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        fullHeight: { control: 'boolean' },
        centered: { control: 'boolean' },
        padding: {
            control: 'select',
            options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
        },
        paddingX: {
            control: 'select',
            options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
        },
        paddingY: {
            control: 'select',
            options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
        },
        background: {
            control: 'select',
            options: ['transparent', 'primary', 'secondary', 'muted', 'card'],
        },
        maxWidth: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'],
        },
        ariaLabel: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof Main>;

export const Default: Story = {
    args: {
        padding: 6,
        children: (
            <Box className="text-center">
                <Heading level={1} className="mb-4">Contenu principal</Heading>
                <Text className="text-muted-foreground">
                    Le composant Main représente le contenu principal de la page.
                </Text>
            </Box>
        ),
    },
};

export const FullHeight: Story = {
    args: {
        fullHeight: true,
        centered: true,
        padding: 6,
        children: (
            <Box className="text-center">
                <Heading level={1} className="mb-4">Pleine hauteur</Heading>
                <Text className="text-muted-foreground">
                    Ce contenu occupe toute la hauteur de l'écran.
                </Text>
            </Box>
        ),
    },
};

export const WithBackground: Story = {
    args: {
        background: 'muted',
        padding: 8,
        children: (
            <Box className="text-center">
                <Heading level={1} className="mb-4">Fond avec couleur</Heading>
                <Text className="text-muted-foreground">
                    Le Main a un fond coloré pour se distinguer du reste.
                </Text>
            </Box>
        ),
    },
};

export const Centered: Story = {
    args: {
        centered: true,
        fullHeight: true,
        padding: 6,
        children: (
            <Box className="text-center max-w-md mx-auto">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center text-3xl mb-4">
                    🎯
                </div>
                <Heading level={2} className="mb-2">Contenu centré</Heading>
                <Text className="text-muted-foreground">
                    Le contenu est centré verticalement et horizontalement.
                </Text>
            </Box>
        ),
    },
};

export const WithMaxWidth: Story = {
    args: {
        maxWidth: 'md',
        padding: 6,
        children: (
            <Box>
                <Heading level={1} className="mb-4">Largeur limitée</Heading>
                <Text className="text-muted-foreground">
                    Le contenu est limité à une largeur maximale de md.
                </Text>
                <Box className="mt-4 grid grid-cols-2 gap-4">
                    <Box className="bg-primary/10 p-4 rounded-lg text-center">1</Box>
                    <Box className="bg-primary/10 p-4 rounded-lg text-center">2</Box>
                    <Box className="bg-primary/10 p-4 rounded-lg text-center">3</Box>
                    <Box className="bg-primary/10 p-4 rounded-lg text-center">4</Box>
                </Box>
            </Box>
        ),
    },
};

export const WithCustomPadding: Story = {
    args: {
        paddingX: 8,
        paddingY: 4,
        children: (
            <Box className="text-center">
                <Heading level={1} className="mb-4">Padding personnalisé</Heading>
                <Text className="text-muted-foreground">
                    Padding horizontal: 8, vertical: 4
                </Text>
            </Box>
        ),
    },
};

export const ArticleLayout: Story = {
    args: {
        maxWidth: 'lg',
        padding: 6,
        children: (
            <Box>
                <Heading level={1} className="mb-2">Article de blog</Heading>
                <Text className="text-muted-foreground mb-6">
                    Publié le 20 Juillet 2026 • 5 min de lecture
                </Text>
                <Box className="prose max-w-none">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <p>
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo consequat.
                    </p>
                </Box>
            </Box>
        ),
    },
};

export const DashboardLayout: Story = {
    args: {
        background: 'muted',
        padding: 6,
        children: (
            <Box>
                <Heading level={1} className="mb-6">Dashboard</Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Box className="bg-card p-4 rounded-lg shadow-sm border border-border text-center">
                        <Text className="text-sm text-muted-foreground">Revenus</Text>
                        <Text className="text-2xl font-bold text-foreground">€12,345</Text>
                    </Box>
                    <Box className="bg-card p-4 rounded-lg shadow-sm border border-border text-center">
                        <Text className="text-sm text-muted-foreground">Utilisateurs</Text>
                        <Text className="text-2xl font-bold text-foreground">1,234</Text>
                    </Box>
                    <Box className="bg-card p-4 rounded-lg shadow-sm border border-border text-center">
                        <Text className="text-sm text-muted-foreground">Commandes</Text>
                        <Text className="text-2xl font-bold text-foreground">567</Text>
                    </Box>
                    <Box className="bg-card p-4 rounded-lg shadow-sm border border-border text-center">
                        <Text className="text-sm text-muted-foreground">Taux conversion</Text>
                        <Text className="text-2xl font-bold text-foreground">12.5%</Text>
                    </Box>
                </div>
            </Box>
        ),
    },
};