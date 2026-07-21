import type { Meta, StoryObj } from '@storybook/react';
import { Figure } from '../Figure';

const meta: Meta<typeof Figure> = {
    title: 'Media/Figure',
    component: Figure,
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
            options: ['primary', 'secondary', 'muted', 'destructive', 'success', 'warning'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg', 'xl', 'full'],
        },
        radius: {
            control: 'select',
            options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'],
        },
        shadow: {
            control: 'select',
            options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
        },
        zoomable: { control: 'boolean' },
        showCaption: { control: 'boolean' },
        captionPosition: {
            control: 'select',
            options: ['bottom', 'overlay', 'top'],
        },
        caption: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof Figure>;

const sampleImage = {
    src: 'https://picsum.photos/seed/figure1/800/500',
    alt: 'Sample image',
    fit: 'cover' as const,
};

export const Default: Story = {
    args: {
        image: sampleImage,
        caption: 'Une belle image de démonstration',
        size: 'md',
    },
};

export const WithCaptionBottom: Story = {
    args: {
        image: sampleImage,
        caption: 'Légende en bas de l\'image',
        captionPosition: 'bottom',
        size: 'lg',
    },
};

export const WithCaptionOverlay: Story = {
    args: {
        image: sampleImage,
        caption: 'Légende superposée sur l\'image',
        captionPosition: 'overlay',
        size: 'lg',
        zoomable: true,
    },
};

export const WithCaptionTop: Story = {
    args: {
        image: sampleImage,
        caption: 'Légende en haut de l\'image',
        captionPosition: 'top',
        size: 'lg',
    },
};

export const WithZoom: Story = {
    args: {
        image: sampleImage,
        caption: 'Cliquez sur l\'image pour zoomer',
        zoomable: true,
        size: 'lg',
        captionPosition: 'overlay',
    },
};

export const WithoutCaption: Story = {
    args: {
        image: sampleImage,
        showCaption: false,
        size: 'md',
    },
};

export const WithRadius: Story = {
    args: {
        image: sampleImage,
        caption: 'Image avec coins arrondis',
        radius: 'xl',
        size: 'md',
    },
};

export const WithShadow: Story = {
    args: {
        image: sampleImage,
        caption: 'Image avec ombre portée',
        shadow: 'xl',
        size: 'md',
    },
};

export const Large: Story = {
    args: {
        image: {
            ...sampleImage,
            src: 'https://picsum.photos/seed/figure2/1200/800',
        },
        caption: 'Image en grande taille',
        size: 'xl',
        zoomable: true,
    },
};

export const Small: Story = {
    args: {
        image: {
            ...sampleImage,
            src: 'https://picsum.photos/seed/figure3/400/300',
        },
        caption: 'Image en petite taille',
        size: 'sm',
        radius: 'lg',
    },
};

export const FullWidth: Story = {
    args: {
        image: {
            ...sampleImage,
            src: 'https://picsum.photos/seed/figure4/1400/600',
        },
        caption: 'Image en pleine largeur',
        size: 'full',
        captionPosition: 'overlay',
        zoomable: true,
    },
};

export const WithDangerColor: Story = {
    args: {
        image: sampleImage,
        caption: 'Légende en couleur destructive',
        color: 'destructive',
        size: 'md',
    },
};

export const Gallery: Story = {
    render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <Figure
                image={{
                    src: 'https://picsum.photos/seed/gallery1/600/400',
                    alt: 'Gallery 1',
                    fit: 'cover',
                }}
                caption="Photo 1 - Paysage"
                size="full"
                radius="lg"
                shadow="md"
                zoomable
            />
            <Figure
                image={{
                    src: 'https://picsum.photos/seed/gallery2/600/400',
                    alt: 'Gallery 2',
                    fit: 'cover',
                }}
                caption="Photo 2 - Architecture"
                size="full"
                radius="lg"
                shadow="md"
                zoomable
            />
            <Figure
                image={{
                    src: 'https://picsum.photos/seed/gallery3/600/400',
                    alt: 'Gallery 3',
                    fit: 'cover',
                }}
                caption="Photo 3 - Nature"
                size="full"
                radius="lg"
                shadow="md"
                zoomable
            />
            <Figure
                image={{
                    src: 'https://picsum.photos/seed/gallery4/600/400',
                    alt: 'Gallery 4',
                    fit: 'cover',
                }}
                caption="Photo 4 - Urbain"
                size="full"
                radius="lg"
                shadow="md"
                zoomable
            />
        </div>
    ),
};

export const WithCustomWidth: Story = {
    args: {
        image: {
            ...sampleImage,
            src: 'https://picsum.photos/seed/custom/800/400',
        },
        caption: 'Image avec largeur personnalisée',
        size: 'lg',
        className: 'w-full max-w-2xl',
        zoomable: true,
    },
};