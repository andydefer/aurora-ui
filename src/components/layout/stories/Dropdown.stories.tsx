import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown, DropdownItem } from '../Dropdown';
import { Button } from '../../forms/Button';
import { User, Settings, LogOut, HelpCircle, ChevronDown, Mail, Bell } from 'lucide-react';
import { Placement } from '../../../types';

const meta: Meta<typeof Dropdown> = {
    title: 'Layout/Dropdown',
    component: Dropdown,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        placement: {
            control: 'select',
            options: ['bottom-left', 'bottom-right', 'top-left', 'top-right'] as Placement[],
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'],
        },
        width: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full', 'auto'],
        },
        closeOnSelect: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const defaultItems: DropdownItem[] = [
    { label: 'Profil', value: 'profile', icon: <User size={16} /> },
    { label: 'Paramètres', value: 'settings', icon: <Settings size={16} /> },
    { label: 'Aide', value: 'help', icon: <HelpCircle size={16} /> },
    { divider: true },
    { label: 'Déconnexion', value: 'logout', icon: <LogOut size={16} />, destructive: true },
];

export const Default: Story = {
    args: {
        trigger: (
            <Button variant="primary">
                Menu <ChevronDown size={16} />
            </Button>
        ),
        items: defaultItems,
        placement: 'bottom-left',
    },
};

export const WithGhostButton: Story = {
    args: {
        trigger: (
            <Button variant="ghost">
                <User size={18} />
                <span>Compte</span>
                <ChevronDown size={14} />
            </Button>
        ),
        items: defaultItems,
        placement: 'bottom-left',
    },
};

export const WithIconTrigger: Story = {
    args: {
        trigger: (
            <Button variant="ghost" className="p-2 rounded-full">
                <Bell size={20} />
            </Button>
        ),
        items: [
            { label: 'Notification 1', value: 'notif1', icon: <Mail size={14} /> },
            { label: 'Notification 2', value: 'notif2', icon: <Mail size={14} /> },
            { label: 'Notification 3', value: 'notif3', icon: <Mail size={14} /> },
            { divider: true },
            { label: 'Voir tout', value: 'view-all' },
        ] as DropdownItem[],
        placement: 'bottom-right',
    },
};

export const PlacementBottomRight: Story = {
    args: {
        trigger: (
            <Button variant="primary">
                Menu <ChevronDown size={16} />
            </Button>
        ),
        items: defaultItems,
        placement: 'bottom-right',
    },
};

export const PlacementTopLeft: Story = {
    args: {
        trigger: (
            <Button variant="primary">
                Menu <ChevronDown size={16} />
            </Button>
        ),
        items: defaultItems,
        placement: 'top-left',
    },
};

export const LargeSize: Story = {
    args: {
        trigger: (
            <Button variant="primary" size="lg">
                Grand menu <ChevronDown size={20} />
            </Button>
        ),
        items: defaultItems,
        size: 'lg',
        placement: 'bottom-left',
    },
};

export const SmallSize: Story = {
    args: {
        trigger: (
            <Button variant="primary" size="sm">
                Petit <ChevronDown size={14} />
            </Button>
        ),
        items: defaultItems,
        size: 'sm',
        placement: 'bottom-left',
    },
};

export const CustomWidth: Story = {
    args: {
        trigger: (
            <Button variant="primary">
                Large menu <ChevronDown size={16} />
            </Button>
        ),
        items: defaultItems,
        width: 'lg',
        placement: 'bottom-left',
    },
};

export const WithDisabledItems: Story = {
    args: {
        trigger: (
            <Button variant="primary">
                Menu <ChevronDown size={16} />
            </Button>
        ),
        items: [
            { label: 'Profil', value: 'profile', icon: <User size={16} /> },
            { label: 'Paramètres', value: 'settings', icon: <Settings size={16} />, disabled: true },
            { label: 'Aide', value: 'help', icon: <HelpCircle size={16} /> },
            { divider: true },
            { label: 'Déconnexion', value: 'logout', icon: <LogOut size={16} />, destructive: true },
        ] as DropdownItem[],
        placement: 'bottom-left',
    },
};

export const WithoutCloseOnSelect: Story = {
    args: {
        trigger: (
            <Button variant="primary">
                Menu <ChevronDown size={16} />
            </Button>
        ),
        items: defaultItems,
        closeOnSelect: false,
        placement: 'bottom-left',
    },
};