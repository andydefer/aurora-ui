import type { Meta, StoryObj } from '@storybook/react';
import { Article } from '../Article';

const meta: Meta<typeof Article> = {
    title: 'Layout/Article',
    component: Article,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        padding: {
            control: 'select',
            options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
        },
        author: { control: 'text' },
        date: { control: 'text' },
        readingTime: { control: 'text' },
        views: { control: 'number' },
        title: { control: 'text' },
        excerpt: { control: 'text' },
        tags: { control: 'object' },
        showShare: { control: 'boolean' },
        showBookmark: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Article>;

export const Basic: Story = {
    args: {
        title: 'Comprendre l\'intelligence artificielle',
        excerpt: 'Découvrez comment l\'IA transforme notre quotidien et les enjeux éthiques qui l\'accompagnent.',
        author: 'Marie Martin',
        date: '20 Juillet 2026',
        readingTime: '5 min',
        views: 1234,
        tags: ['IA', 'Technologie', 'Futur'],
        image: {
            src: 'https://picsum.photos/seed/article1/800/400',
            alt: 'Article image',
            fit: 'cover',
        },
        showShare: true,
        showBookmark: true,
        children: (
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
        ),
    },
};

export const WithoutImage: Story = {
    args: {
        title: 'Les bases du design system',
        excerpt: 'Un design system est un ensemble de composants réutilisables et de règles de conception.',
        author: 'Jean Dupont',
        date: '18 Juillet 2026',
        readingTime: '3 min',
        tags: ['Design', 'UI', 'UX'],
        children: (
            <p>
                Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
        ),
    },
};

export const Minimal: Story = {
    args: {
        title: 'Article minimaliste',
        author: 'Pierre Durand',
        date: '15 Juillet 2026',
        children: (
            <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
            </p>
        ),
    },
};

export const WithAuthorAvatar: Story = {
    args: {
        title: 'Article avec avatar auteur',
        excerpt: 'Un article présenté avec l\'avatar de l\'auteur pour plus de personnalisation.',
        author: 'Sophie Lefèvre',
        authorAvatar: 'https://picsum.photos/seed/avatar1/100/100',
        date: '22 Juillet 2026',
        readingTime: '4 min',
        tags: ['Personnalisation', 'UI'],
        image: {
            src: 'https://picsum.photos/seed/article2/800/400',
            alt: 'Article avec avatar',
            fit: 'cover',
        },
        children: (
            <p>
                Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
        ),
    },
};

export const WithLongContent: Story = {
    args: {
        title: 'Analyse approfondie des tendances 2026',
        excerpt: 'Une analyse complète des tendances technologiques qui marqueront l\'année 2026.',
        author: 'Luc Martin',
        date: '25 Juillet 2026',
        readingTime: '12 min',
        views: 5678,
        tags: ['Tendances', 'Analyse', 'Prédictions'],
        image: {
            src: 'https://picsum.photos/seed/article3/800/400',
            alt: 'Tendances 2026',
            fit: 'cover',
        },
        children: (
            <div>
                <p className="mb-2">
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                </p>
                <p>
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
                </p>
            </div>
        ),
    },
};