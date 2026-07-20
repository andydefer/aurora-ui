import type { Meta, StoryObj } from '@storybook/react';
import { Image } from '../Image';

const meta: Meta<typeof Image> = {
    title: 'Media/Image',
    component: Image,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        src: { control: 'text' },
        alt: { control: 'text' },
        width: {
            control: 'select',
            options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
        },
        height: {
            control: 'select',
            options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
        },
        fit: {
            control: 'select',
            options: ['contain', 'cover', 'fill', 'none'],
        },
        radius: {
            control: 'select',
            options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
        },
        lazy: { control: 'boolean' },
        fallback: { control: 'text' },
        placeholder: { control: 'boolean' },
        showSkeleton: { control: 'boolean' },
        skeletonAspectRatio: {
            control: 'select',
            options: ['square', 'video', 'portrait', 'auto'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Basic: Story = {
    args: {
        src: 'https://picsum.photos/seed/default/800/600',
        alt: 'Default image',
        width: 8,
        height: 6,
    },
};

export const WithSize: Story = {
    args: {
        src: 'https://picsum.photos/seed/size/800/600',
        alt: 'Image with size',
        width: 6,
        height: 4,
    },
};

export const WithRadius: Story = {
    args: {
        src: 'https://picsum.photos/seed/radius/800/600',
        alt: 'Image with radius',
        radius: 'lg',
        width: 8,
        height: 6,
    },
};

export const WithSkeleton: Story = {
    args: {
        src: 'https://picsum.photos/seed/skeleton/800/600',
        alt: 'Image with skeleton',
        showSkeleton: true,
        skeletonAspectRatio: 'square',
        width: 6,
        height: 6,
    },
};

export const WithFallback: Story = {
    args: {
        src: 'https://invalid-url/image.jpg',
        alt: 'Image with fallback',
        fallback: 'https://picsum.photos/seed/fallback/800/600',
        width: 8,
        height: 6,
    },
};

export const Cover: Story = {
    args: {
        src: 'https://picsum.photos/seed/cover/1200/800',
        alt: 'Cover image',
        fit: 'cover',
        width: 8,
        height: 6,
    },
};

export const Contain: Story = {
    args: {
        src: 'https://picsum.photos/seed/contain/1200/800',
        alt: 'Contain image',
        fit: 'contain',
        width: 8,
        height: 6,
        className: 'bg-gray-100',
    },
};

export const FullRounded: Story = {
    args: {
        src: 'https://picsum.photos/seed/circle/400/400',
        alt: 'Circle image',
        radius: 'full',
        width: 6,
        height: 6,
    },
};

export const Small: Story = {
    args: {
        src: 'https://picsum.photos/seed/small/400/400',
        alt: 'Small image',
        width: 2,
        height: 2,
        radius: 'full',
    },
};

export const Large: Story = {
    args: {
        src: 'https://picsum.photos/seed/large/1600/1200',
        alt: 'Large image',
        width: 10,
        height: 8,
    },
};

export const WithPlaceholder: Story = {
    args: {
        src: 'https://picsum.photos/seed/placeholder/800/600',
        alt: 'Image with placeholder',
        placeholder: true,
        width: 8,
        height: 6,
    },
};