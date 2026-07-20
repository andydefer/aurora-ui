import type { Meta, StoryObj } from '@storybook/react';
import { AvatarStack } from '../AvatarStack';

const meta: Meta<typeof AvatarStack> = {
    title: 'Media/AvatarStack',
    component: AvatarStack,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['8', '10', '12', '14', '16', '20', '24'],
        },
        overlap: {
            control: 'number',
            min: 15,
            max: 50,
            step: 5,
        },
        max: { control: 'number' },
    },
};

export default meta;
type Story = StoryObj<typeof AvatarStack>;

const sampleUsers = [
    { id: '1', name: 'Jean Dupont', src: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?w=400&h=400&fit=crop&crop=face' },
    { id: '2', name: 'Marie Martin', src: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?w=400&h=400&fit=crop&crop=face' },
    { id: '3', name: 'Pierre Durand', src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face' },
    { id: '4', name: 'Sophie Lefèvre', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face' },
    { id: '5', name: 'Luc Martin', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face' },
    { id: '6', name: 'Emma Petit', src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face' },
];

export const Default: Story = {
    args: {
        items: sampleUsers.slice(0, 3),
        max: 3,
        size: '14',
        overlap: 25,
    },
};

export const WithManyUsers: Story = {
    args: {
        items: sampleUsers,
        max: 3,
        size: '14',
        overlap: 25,
        moreLabel: '+{count}',
    },
};

export const Overlap15: Story = {
    args: {
        items: sampleUsers.slice(0, 4),
        max: 4,
        size: '14',
        overlap: 15,
    },
};

export const Overlap35: Story = {
    args: {
        items: sampleUsers.slice(0, 4),
        max: 4,
        size: '14',
        overlap: 35,
    },
};

export const Overlap50: Story = {
    args: {
        items: sampleUsers.slice(0, 4),
        max: 4,
        size: '14',
        overlap: 50,
    },
};

export const Size8: Story = {
    args: {
        items: sampleUsers.slice(0, 3),
        max: 3,
        size: '8',
        overlap: 20,
    },
};

export const Size10: Story = {
    args: {
        items: sampleUsers.slice(0, 3),
        max: 3,
        size: '10',
        overlap: 25,
    },
};

export const Size12: Story = {
    args: {
        items: sampleUsers.slice(0, 3),
        max: 3,
        size: '12',
        overlap: 25,
    },
};

export const Size14: Story = {
    args: {
        items: sampleUsers.slice(0, 3),
        max: 3,
        size: '14',
        overlap: 25,
    },
};

export const Size16: Story = {
    args: {
        items: sampleUsers.slice(0, 3),
        max: 3,
        size: '16',
        overlap: 30,
    },
};

export const Size20: Story = {
    args: {
        items: sampleUsers.slice(0, 3),
        max: 3,
        size: '20',
        overlap: 30,
    },
};

export const Size24: Story = {
    args: {
        items: sampleUsers.slice(0, 3),
        max: 3,
        size: '24',
        overlap: 35,
    },
};

export const Interactive: Story = {
    render: () => (
        <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Cliquez sur "+3" pour voir plus</p>
            <AvatarStack
                items={sampleUsers}
                max={3}
                size="16"
                overlap={25}
                moreLabel="+{count}"
                onMoreClick={() => alert('Voir tous les utilisateurs')}
            />
        </div>
    ),
};

export const CustomMoreLabel: Story = {
    args: {
        items: sampleUsers,
        max: 3,
        size: '16',
        overlap: 25,
        moreLabel: '👥 +{count}',
    },
};

export const AllSizes: Story = {
    render: () => (
        <div className="flex flex-wrap gap-8 items-center">
            <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">w-8</span>
                <AvatarStack items={sampleUsers.slice(0, 3)} max={3} size="8" overlap={20} />
            </div>
            <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">w-10</span>
                <AvatarStack items={sampleUsers.slice(0, 3)} max={3} size="10" overlap={25} />
            </div>
            <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">w-12</span>
                <AvatarStack items={sampleUsers.slice(0, 3)} max={3} size="12" overlap={25} />
            </div>
            <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">w-14</span>
                <AvatarStack items={sampleUsers.slice(0, 3)} max={3} size="14" overlap={25} />
            </div>
            <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">w-16</span>
                <AvatarStack items={sampleUsers.slice(0, 3)} max={3} size="16" overlap={30} />
            </div>
            <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">w-20</span>
                <AvatarStack items={sampleUsers.slice(0, 3)} max={3} size="20" overlap={30} />
            </div>
            <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">w-24</span>
                <AvatarStack items={sampleUsers.slice(0, 3)} max={3} size="24" overlap={35} />
            </div>
        </div>
    ),
};

export const AllOverlaps: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground w-16">15%</span>
                <AvatarStack items={sampleUsers.slice(0, 4)} max={4} size="16" overlap={15} />
            </div>
            <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground w-16">25%</span>
                <AvatarStack items={sampleUsers.slice(0, 4)} max={4} size="16" overlap={25} />
            </div>
            <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground w-16">35%</span>
                <AvatarStack items={sampleUsers.slice(0, 4)} max={4} size="16" overlap={35} />
            </div>
            <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground w-16">50%</span>
                <AvatarStack items={sampleUsers.slice(0, 4)} max={4} size="16" overlap={50} />
            </div>
        </div>
    ),
};

export const TeamPreview: Story = {
    render: () => (
        <div className="flex flex-col gap-6 max-w-md">
            <div>
                <p className="text-sm font-medium text-foreground mb-2">Design Team</p>
                <AvatarStack
                    items={sampleUsers.slice(0, 4)}
                    max={4}
                    size="16"
                    overlap={25}
                />
            </div>
            <div>
                <p className="text-sm font-medium text-foreground mb-2">Dev Team</p>
                <AvatarStack
                    items={sampleUsers.slice(2, 6)}
                    max={4}
                    size="16"
                    overlap={25}
                />
            </div>
            <div>
                <p className="text-sm font-medium text-foreground mb-2">Full Team</p>
                <AvatarStack
                    items={sampleUsers}
                    max={4}
                    size="16"
                    overlap={25}
                    moreLabel="+{count}"
                />
            </div>
        </div>
    ),
};