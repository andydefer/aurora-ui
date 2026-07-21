// src/components/feedback/stories/Chip.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from '../Chip';
import { Avatar } from '../../media/Avatar';
import { Bell, Tag } from 'lucide-react';
import { useState } from 'react';
import { Text } from '../../typography/Text';

const meta: Meta<typeof Chip> = {
    title: 'Feedback/Chip',
    component: Chip,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un chip pour afficher des étiquettes interactives.',
            },
        },
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'warning', 'destructive', 'info', 'muted'],
            description: 'Style visuel du chip',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Taille du chip',
        },
        clickable: {
            control: 'boolean',
            description: 'Rendre le chip cliquable',
        },
        selected: {
            control: 'boolean',
            description: 'État sélectionné',
        },
        removable: {
            control: 'boolean',
            description: 'Afficher le bouton de suppression',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Primary: Story = {
    args: {
        label: 'Primary',
        variant: 'primary',
        size: 'md',
    },
};

export const Secondary: Story = {
    args: {
        label: 'Secondary',
        variant: 'secondary',
        size: 'md',
    },
};

export const Success: Story = {
    args: {
        label: 'Success',
        variant: 'success',
        size: 'md',
    },
};

export const Warning: Story = {
    args: {
        label: 'Warning',
        variant: 'warning',
        size: 'md',
    },
};

export const Error: Story = {
    args: {
        label: 'Error',
        variant: 'destructive',
        size: 'md',
    },
};

export const Muted: Story = {
    args: {
        label: 'Muted',
        variant: 'muted',
        size: 'md',
    },
};

export const WithIcon: Story = {
    args: {
        label: 'Notifications',
        icon: <Bell size={14} />,
        variant: 'primary',
        size: 'md',
    },
};

export const WithAvatar: Story = {
    args: {
        label: 'Jean Dupont',
        avatar: <Avatar name="Jean Dupont" size="sm" shape="circle" />,
        variant: 'primary',
        size: 'md',
    },
};

export const Removable: Story = {
    args: {
        label: 'Filtre actif',
        variant: 'primary',
        size: 'md',
        removable: true,
        onDelete: () => alert('Supprimé !'),
    },
};

export const Clickable: Story = {
    args: {
        label: 'Cliquez-moi',
        variant: 'primary',
        size: 'md',
        clickable: true,
        onClick: () => alert('Chip cliqué !'),
    },
};

export const Selected: Story = {
    args: {
        label: 'Sélectionné',
        variant: 'primary',
        size: 'md',
        selected: true,
        clickable: true,
    },
};

export const TagsExample: Story = {
    render: () => {
        const [tags, setTags] = useState(['Design', 'UI/UX', 'React', 'TypeScript', 'Tailwind']);

        return (
            <div className="space-y-4 w-full max-w-2xl">
                <Text variant="h5" className="font-bold">Tags du projet</Text>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Chip
                            key={tag}
                            label={tag}
                            variant="primary"
                            size="sm"
                            removable
                            icon={<Tag size={12} />}
                            onDelete={() => setTags(tags.filter(t => t !== tag))}
                        />
                    ))}
                </div>
                <Text variant="small" color="muted">Cliquez sur la croix pour supprimer un tag</Text>
            </div>
        );
    },
};

export const FilterChips: Story = {
    render: () => {
        const [selected, setSelected] = useState('Tous');

        const filters = ['Tous', 'Actifs', 'En attente', 'Terminés', 'Archivés'];

        return (
            <div className="space-y-4 w-full max-w-2xl">
                <Text variant="h5" className="font-bold">Filtres</Text>
                <div className="flex flex-wrap gap-2">
                    {filters.map((filter) => (
                        <Chip
                            key={filter}
                            label={filter}
                            variant={selected === filter ? 'primary' : 'muted'}
                            size="md"
                            clickable
                            selected={selected === filter}
                            onClick={() => setSelected(filter)}
                        />
                    ))}
                </div>
                <Text variant="small" color="muted">Filtre sélectionné : <strong>{selected}</strong></Text>
            </div>
        );
    },
};

export const UserChips: Story = {
    render: () => {
        const users = [
            { name: 'Marie Dubois', avatar: 'https://i.pravatar.cc/50?img=1' },
            { name: 'Jean Dupont', avatar: 'https://i.pravatar.cc/50?img=2' },
            { name: 'Sophie Martin', avatar: 'https://i.pravatar.cc/50?img=3' },
            { name: 'Pierre Durand', avatar: 'https://i.pravatar.cc/50?img=4' },
        ];

        return (
            <div className="space-y-4 w-full max-w-2xl">
                <Text variant="h5" className="font-bold">Équipe projet</Text>
                <div className="flex flex-wrap gap-2">
                    {users.map((user) => (
                        <Chip
                            key={user.name}
                            label={user.name}
                            avatar={<Avatar src={user.avatar} name={user.name} size="sm" shape="circle" />}
                            variant="secondary"
                            size="md"
                        />
                    ))}
                    <Chip
                        label="+3"
                        variant="info"
                        size="md"
                        clickable
                        onClick={() => alert('Voir plus')}
                    />
                </div>
            </div>
        );
    },
};

export const AllVariants: Story = {
    render: () => (
        <div className="flex flex-wrap gap-3 max-w-2xl">
            <Chip label="Primary" variant="primary" />
            <Chip label="Secondary" variant="secondary" />
            <Chip label="Success" variant="success" />
            <Chip label="Warning" variant="warning" />
            <Chip label="Error" variant="destructive" />
            <Chip label="Info" variant="info" />
            <Chip label="Muted" variant="muted" />
        </div>
    ),
};

export const AllSizes: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-3 max-w-2xl">
            <Chip label="Small" variant="primary" size="sm" />
            <Chip label="Medium" variant="primary" size="md" />
            <Chip label="Large" variant="primary" size="lg" />
        </div>
    ),
};

export const InteractivePlayground: Story = {
    args: {
        label: 'Playground',
        variant: 'primary',
        size: 'md',
        clickable: false,
        selected: false,
        removable: false,
    },
};