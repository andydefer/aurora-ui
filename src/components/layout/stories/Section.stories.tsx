import type { Meta, StoryObj } from '@storybook/react';
import { Section } from '../Section';
import { Box } from '../Box';
import { Text } from '../../typography/Text';

const meta: Meta<typeof Section> = {
    title: 'Layout/Section',
    component: Section,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        title: { control: 'text' },
        subtitle: { control: 'text' },
        spacing: {
            control: 'select',
            options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
        },
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
        fullWidth: { control: 'boolean' },
        titleAlign: {
            control: 'select',
            options: ['left', 'center', 'right', 'justify'],
        },
        titleColor: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'danger', 'success', 'warning'],
        },
        divider: { control: 'boolean' },
        separator: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
    args: {
        title: 'Section par défaut',
        children: (
            <Box className="text-center py-8">
                <Text>Contenu de la section avec un fond transparent.</Text>
            </Box>
        ),
    },
};

export const WithSubtitle: Story = {
    args: {
        title: 'Section avec sous-titre',
        subtitle: 'Ceci est un sous-titre qui apporte plus de contexte à la section.',
        children: (
            <Box className="text-center py-8">
                <Text>Contenu de la section.</Text>
            </Box>
        ),
    },
};

export const WithBackground: Story = {
    args: {
        title: 'Section avec fond',
        subtitle: 'Une section avec un fond coloré.',
        background: 'muted',
        padding: 8,
        children: (
            <Box className="text-center py-8">
                <Text className="text-foreground">Ce contenu se distingue grâce au fond coloré.</Text>
            </Box>
        ),
    },
};

export const Centered: Story = {
    args: {
        title: 'Section centrée',
        subtitle: 'Tout le contenu est centré horizontalement.',
        titleAlign: 'center',
        children: (
            <Box className="text-center py-8">
                <Text className="text-foreground">Contenu centré dans la section.</Text>
            </Box>
        ),
    },
};

export const WithDivider: Story = {
    args: {
        title: 'Section avec séparateur',
        subtitle: 'Une ligne de séparation en bas de la section.',
        divider: true,
        padding: 8,
        children: (
            <Box className="text-center py-8">
                <Text className="text-foreground">Une ligne de séparation est visible en bas.</Text>
            </Box>
        ),
    },
};

export const WithSeparator: Story = {
    args: {
        title: 'Section avec séparateur supérieur',
        subtitle: 'Un séparateur décoratif en haut de la section.',
        separator: true,
        padding: 8,
        children: (
            <Box className="text-center py-8">
                <Text className="text-foreground">Un trait décoratif est visible en haut.</Text>
            </Box>
        ),
    },
};

export const WithPrimaryBackground: Story = {
    args: {
        title: 'Section primaire',
        subtitle: 'Fond avec couleur primaire.',
        background: 'primary',
        padding: 8,
        titleColor: 'primary',
        children: (
            <Box className="text-center py-8">
                <Text className="text-primary-foreground">Contenu sur fond primaire.</Text>
            </Box>
        ),
    },
};

export const CardGrid: Story = {
    args: {
        title: 'Section avec grille de cartes',
        subtitle: 'Une section qui contient une grille de cartes.',
        background: 'muted',
        padding: 8,
        spacing: 6,
        children: (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Box className="bg-card p-6 rounded-lg shadow-sm border border-border text-center">
                    <div className="text-3xl mb-2">📦</div>
                    <Text weight="bold" className="text-foreground">Carte 1</Text>
                    <Text variant="small" color="muted" className="text-muted-foreground">Description de la carte 1</Text>
                </Box>
                <Box className="bg-card p-6 rounded-lg shadow-sm border border-border text-center">
                    <div className="text-3xl mb-2">📊</div>
                    <Text weight="bold" className="text-foreground">Carte 2</Text>
                    <Text variant="small" color="muted" className="text-muted-foreground">Description de la carte 2</Text>
                </Box>
                <Box className="bg-card p-6 rounded-lg shadow-sm border border-border text-center">
                    <div className="text-3xl mb-2">📈</div>
                    <Text weight="bold" className="text-foreground">Carte 3</Text>
                    <Text variant="small" color="muted" className="text-muted-foreground">Description de la carte 3</Text>
                </Box>
            </div>
        ),
    },
};

export const FullWidth: Story = {
    args: {
        title: 'Section pleine largeur',
        subtitle: 'Cette section occupe toute la largeur disponible.',
        fullWidth: true,
        background: 'card',
        padding: 8,
        children: (
            <Box className="text-center py-8">
                <Text className="text-foreground">Le contenu s'étend sur toute la largeur.</Text>
            </Box>
        ),
    },
};

export const WithMaxWidth: Story = {
    args: {
        title: 'Section avec largeur limitée',
        subtitle: 'Cette section est limitée à une largeur maximale.',
        maxWidth: 'md',
        padding: 8,
        children: (
            <Box className="text-center py-8">
                <Text className="text-foreground">Le contenu est limité à max-w-md.</Text>
            </Box>
        ),
    },
};

export const WithCustomPadding: Story = {
    args: {
        title: 'Section avec padding personnalisé',
        subtitle: 'Padding horizontal et vertical différents.',
        paddingX: 8,
        paddingY: 4,
        children: (
            <Box className="text-center py-8">
                <Text className="text-foreground">Padding horizontal: 8, vertical: 4</Text>
            </Box>
        ),
    },
};

export const WithSpacing: Story = {
    args: {
        title: 'Section avec espacement',
        subtitle: 'Un espacement entre les éléments enfants.',
        spacing: 6,
        background: 'muted',
        padding: 8,
        children: (
            <>
                <Box className="bg-card p-4 rounded-lg text-center">
                    <Text weight="bold" className="text-foreground">Élément 1</Text>
                </Box>
                <Box className="bg-card p-4 rounded-lg text-center">
                    <Text weight="bold" className="text-foreground">Élément 2</Text>
                </Box>
                <Box className="bg-card p-4 rounded-lg text-center">
                    <Text weight="bold" className="text-foreground">Élément 3</Text>
                </Box>
            </>
        ),
    },
};

export const WithDangerTitle: Story = {
    args: {
        title: 'Section avec titre danger',
        subtitle: 'Le titre est en couleur danger.',
        titleColor: 'danger',
        background: 'card',
        padding: 8,
        children: (
            <Box className="text-center py-8">
                <Text className="text-foreground">Contenu de la section.</Text>
            </Box>
        ),
    },
};

export const WithRightAlign: Story = {
    args: {
        title: 'Section alignée à droite',
        subtitle: 'Le titre et le sous-titre sont alignés à droite.',
        titleAlign: 'right',
        padding: 8,
        children: (
            <Box className="text-right py-8">
                <Text className="text-foreground">Contenu aligné à droite.</Text>
            </Box>
        ),
    },
};

export const HeroSection: Story = {
    args: {
        title: 'Hero Section',
        subtitle: 'Une section d\'en-tête pour mettre en avant un contenu important.',
        background: 'primary',
        padding: 12,
        titleColor: 'primary',
        titleAlign: 'center',
        separator: true,
        children: (
            <Box className="text-center py-12">
                <div className="text-6xl mb-4">🚀</div>
                <Text variant="h3" className="text-primary-foreground mb-4">
                    Bienvenue sur Aurora UI
                </Text>
                <Text className="text-primary-foreground/80 max-w-2xl mx-auto">
                    Une bibliothèque de composants React moderne, accessible et personnalisable.
                </Text>
                <Box className="mt-6 flex gap-4 justify-center">
                    <button className="px-6 py-2 bg-primary/10 text-primary rounded-lg font-medium hover:bg-primary-foreground/90 transition-colors">
                        Commencer
                    </button>
                    <button className="px-6 py-2 bg-primary/90 text-primary-foreground rounded-lg font-medium hover:bg-primary-foreground/30 transition-colors">
                        En savoir plus
                    </button>
                </Box>
            </Box>
        ),
    },
};