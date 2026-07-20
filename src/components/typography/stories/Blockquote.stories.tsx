import type { Meta, StoryObj } from '@storybook/react';
import { Blockquote } from '../Blockquote';

const meta: Meta<typeof Blockquote> = {
    title: 'Typography/Blockquote',
    component: Blockquote,
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
            options: ['primary', 'secondary', 'muted', 'danger', 'success', 'warning'],
        },
        showIcon: { control: 'boolean' },
        compact: { control: 'boolean' },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        author: { control: 'text' },
        authorAvatar: { control: 'text' },
        cite: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof Blockquote>;

const quote = "Le design n'est pas seulement ce à quoi il ressemble et ce qu'il ressent. Le design est comment ça fonctionne.";

export const Default: Story = {
    args: {
        children: quote,
        author: 'Steve Jobs',
        showIcon: true,
    },
};

export const WithAvatar: Story = {
    args: {
        children: quote,
        author: 'Steve Jobs',
        authorAvatar: 'https://picsum.photos/seed/steve/100/100',
        showIcon: true,
    },
};

export const WithoutIcon: Story = {
    args: {
        children: quote,
        author: 'Steve Jobs',
        authorAvatar: 'https://picsum.photos/seed/steve/100/100',
        showIcon: false,
    },
};

export const Compact: Story = {
    args: {
        children: quote,
        author: 'Steve Jobs',
        authorAvatar: 'https://picsum.photos/seed/steve/100/100',
        compact: true,
    },
};

export const Large: Story = {
    args: {
        children: "Le seul moyen de faire du bon travail est d'aimer ce que vous faites.",
        author: 'Steve Jobs',
        authorAvatar: 'https://picsum.photos/seed/steve2/100/100',
        size: 'lg',
        showIcon: true,
    },
};

export const Center: Story = {
    args: {
        children: "Le design est la pensée rendue visible.",
        author: 'Saul Bass',
        authorAvatar: 'https://picsum.photos/seed/saul/100/100',
        align: 'center',
        showIcon: true,
    },
};

export const Right: Story = {
    args: {
        children: "L'innovation distingue les leaders des suiveurs.",
        author: 'Steve Jobs',
        authorAvatar: 'https://picsum.photos/seed/steve3/100/100',
        align: 'right',
        showIcon: true,
    },
};

export const WithCite: Story = {
    args: {
        children: "Le bon design est aussi minimal que possible.",
        author: 'Dieter Rams',
        authorAvatar: 'https://picsum.photos/seed/dieter/100/100',
        cite: 'https://www.vitsoe.com/fr/about/good-design',
        showIcon: true,
    },
};

export const DangerColor: Story = {
    args: {
        children: "Le design c'est la fonction première.",
        author: 'Philippe Starck',
        authorAvatar: 'https://picsum.photos/seed/philippe/100/100',
        color: 'danger',
        showIcon: true,
    },
};

export const SuccessColor: Story = {
    args: {
        children: "Le design doit raconter une histoire.",
        author: 'Milton Glaser',
        authorAvatar: 'https://picsum.photos/seed/milton/100/100',
        color: 'success',
        showIcon: true,
    },
};

export const MutedColor: Story = {
    args: {
        children: "La simplicité est la sophistication ultime.",
        author: 'Leonardo da Vinci',
        authorAvatar: 'https://picsum.photos/seed/leonardo/100/100',
        color: 'muted',
        showIcon: true,
    },
};

export const LongQuote: Story = {
    args: {
        children: "Le design est la création d'un plan pour la construction d'un objet, d'un système ou d'une interaction humaine mesurable. Le design est la discipline qui explore la relation entre la forme, la fonction et la signification.",
        author: 'Richard Buchanan',
        authorAvatar: 'https://picsum.photos/seed/richard/100/100',
        showIcon: true,
        size: 'md',
    },
};

export const WithoutAuthor: Story = {
    args: {
        children: "Le design est la philosophie de la beauté appliquée à la vie quotidienne.",
        showIcon: true,
    },
};

export const Minimal: Story = {
    args: {
        children: "Le design est la pensée visible.",
        showIcon: false,
        compact: true,
    },
};

export const QuotesList: Story = {
    render: () => (
        <div className="flex flex-col gap-4 max-w-2xl w-full">
            <Blockquote
                children="Le design est la recherche de l'équilibre entre l'esthétique et la fonction."
                author="Dieter Rams"
                authorAvatar="https://picsum.photos/seed/dieter2/100/100"
                color="primary"
                showIcon
            />
            <Blockquote
                children="Le bon design est discret, il ne crie pas, il parle."
                author="Jony Ive"
                authorAvatar="https://picsum.photos/seed/jony/100/100"
                color="secondary"
                compact
                showIcon
            />
            <Blockquote
                children="Le design est la solution, pas la décoration."
                author="Paula Scher"
                authorAvatar="https://picsum.photos/seed/paula/100/100"
                color="muted"
                compact
                showIcon={false}
            />
        </div>
    ),
};