import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../Avatar';
import { Flex } from '../../layout/Flex';
import { Stack } from '../../layout/Stack';

const meta: Meta<typeof Avatar> = {
    title: 'Media/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'],
        },
        shape: {
            control: 'select',
            options: ['circle', 'square', 'rounded'],
        },
        status: {
            control: 'select',
            options: ['online', 'offline', 'away', 'busy', 'none'],
        },
        statusPosition: {
            control: 'select',
            options: ['top-right', 'bottom-right', 'top-left', 'bottom-left'],
        },
        statusSize: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'],
        },
        bordered: { control: 'boolean' },
        name: { control: 'text' },
        src: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
    args: {
        src: 'https://picsum.photos/seed/avatar1/200/200',
        name: 'Jean Dupont',
    },
};

export const WithName: Story = {
    args: {
        src: 'https://picsum.photos/seed/avatar2/200/200',
        name: 'Marie Martin',
        size: 'lg',
    },
};

export const WithoutImage: Story = {
    args: {
        name: 'Jean Dupont',
        size: 'lg',
    },
};

export const Online: Story = {
    args: {
        src: 'https://picsum.photos/seed/avatar3/200/200',
        name: 'Pierre Durand',
        status: 'online',
        size: 'lg',
    },
};

export const Busy: Story = {
    args: {
        src: 'https://picsum.photos/seed/avatar4/200/200',
        name: 'Sophie Lefèvre',
        status: 'busy',
        size: 'lg',
    },
};

export const Away: Story = {
    args: {
        src: 'https://picsum.photos/seed/avatar5/200/200',
        name: 'Luc Martin',
        status: 'away',
        size: 'lg',
    },
};

export const Offline: Story = {
    args: {
        src: 'https://picsum.photos/seed/avatar6/200/200',
        name: 'Emma Petit',
        status: 'offline',
        size: 'lg',
    },
};

export const Square: Story = {
    args: {
        src: 'https://picsum.photos/seed/avatar7/200/200',
        name: 'Thomas Robert',
        shape: 'square',
        size: 'lg',
    },
};

export const Rounded: Story = {
    args: {
        src: 'https://picsum.photos/seed/avatar8/200/200',
        name: 'Julie Bernard',
        shape: 'rounded',
        size: 'lg',
    },
};

export const Bordered: Story = {
    args: {
        src: 'https://picsum.photos/seed/avatar9/200/200',
        name: 'Nicolas Petit',
        bordered: true,
        borderColor: 'ring-primary',
        size: 'lg',
        status: 'online',
    },
};

export const StatusPositionTopLeft: Story = {
    args: {
        src: 'https://picsum.photos/seed/avatar10/200/200',
        name: 'Camille Dubois',
        status: 'online',
        statusPosition: 'top-left',
        size: 'lg',
    },
};

export const StatusPositionTopRight: Story = {
    args: {
        src: 'https://picsum.photos/seed/avatar11/200/200',
        name: 'Antoine Leroy',
        status: 'busy',
        statusPosition: 'top-right',
        size: 'lg',
    },
};

export const StatusPositionBottomLeft: Story = {
    args: {
        src: 'https://picsum.photos/seed/avatar12/200/200',
        name: 'Isabelle Moreau',
        status: 'away',
        statusPosition: 'bottom-left',
        size: 'lg',
    },
};

export const LargeStatus: Story = {
    args: {
        src: 'https://picsum.photos/seed/avatar13/200/200',
        name: 'Pierre Martin',
        status: 'online',
        statusSize: 'lg',
        size: 'xl',
    },
};

export const Group: Story = {
    render: () => (
        <Flex gap={4}>
            <Avatar src="https://picsum.photos/seed/group1/200/200" name="Jean" status="online" />
            <Avatar src="https://picsum.photos/seed/group2/200/200" name="Marie" status="away" />
            <Avatar src="https://picsum.photos/seed/group3/200/200" name="Pierre" status="busy" />
            <Avatar src="https://picsum.photos/seed/group4/200/200" name="Sophie" status="offline" />
            <Avatar name="Luc" status="online" />
        </Flex>
    ),
};

export const Sizes: Story = {
    render: () => (
        <Stack direction="horizontal" spacing={4} align="center">
            <Avatar src="https://picsum.photos/seed/size1/200/200" name="XS" size="xs" status="online" />
            <Avatar src="https://picsum.photos/seed/size2/200/200" name="SM" size="sm" status="online" />
            <Avatar src="https://picsum.photos/seed/size3/200/200" name="MD" size="md" status="online" />
            <Avatar src="https://picsum.photos/seed/size4/200/200" name="LG" size="lg" status="online" />
            <Avatar src="https://picsum.photos/seed/size5/200/200" name="XL" size="xl" status="online" />
        </Stack>
    ),
};

export const Shapes: Story = {
    render: () => (
        <Stack direction="horizontal" spacing={4} align="center">
            <Avatar src="https://picsum.photos/seed/shape1/200/200" name="Circle" shape="circle" status="online" />
            <Avatar src="https://picsum.photos/seed/shape2/200/200" name="Rounded" shape="rounded" status="online" />
            <Avatar src="https://picsum.photos/seed/shape3/200/200" name="Square" shape="square" status="online" />
        </Stack>
    ),
};