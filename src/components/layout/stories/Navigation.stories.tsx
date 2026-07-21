import type { Meta, StoryObj } from '@storybook/react';
import { Navigation } from '../Navigation';
import { Home, User, Settings, Bell, LogOut, HelpCircle } from 'lucide-react';

const meta: Meta<typeof Navigation> = {
    title: 'Layout/Navigation',
    component: Navigation,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        orientation: {
            control: 'select',
            options: ['horizontal', 'vertical'],
        },
        gap: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'],
        },
        activeColor: {
            control: 'select',
            options: ['primary', 'secondary', 'destructive', 'success', 'warning'],
        },
        collapsible: { control: 'boolean' },
        highlight: { control: 'boolean' },
        ariaLabel: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof Navigation>;

const items = [
    { label: 'Accueil', href: '#', active: true },
    { label: 'Services', href: '#' },
    { label: 'À propos', href: '#' },
    { label: 'Contact', href: '#' },
];

const itemsWithIcons = [
    { label: 'Accueil', href: '#', active: true, icon: <Home size={16} /> },
    { label: 'Profil', href: '#', icon: <User size={16} /> },
    { label: 'Paramètres', href: '#', icon: <Settings size={16} /> },
    { label: 'Notifications', href: '#', icon: <Bell size={16} /> },
];

const itemsWithChildren = [
    {
        label: 'Produits',
        href: '#',
        children: [
            { label: 'Catégorie 1', href: '#' },
            { label: 'Catégorie 2', href: '#' },
            { label: 'Catégorie 3', href: '#' },
        ],
    },
    { label: 'Services', href: '#' },
    { label: 'Contact', href: '#' },
];

export const Default: Story = {
    args: {
        items: items,
    },
};

export const Horizontal: Story = {
    args: {
        items: items,
        orientation: 'horizontal',
        gap: 'lg',
    },
};

export const Vertical: Story = {
    args: {
        items: items,
        orientation: 'vertical',
        gap: 'md',
    },
};

export const WithIcons: Story = {
    args: {
        items: itemsWithIcons,
        orientation: 'horizontal',
        gap: 'lg',
    },
};

export const WithChildren: Story = {
    args: {
        items: itemsWithChildren,
        orientation: 'vertical',
        gap: 'sm',
    },
};

export const WithCustomGap: Story = {
    args: {
        items: items,
        gap: 'xl',
        orientation: 'horizontal',
    },
};

export const ActiveColorDanger: Story = {
    args: {
        items: items,
        activeColor: 'destructive',
        orientation: 'horizontal',
        gap: 'lg',
    },
};

export const ActiveColorSuccess: Story = {
    args: {
        items: items,
        activeColor: 'success',
        orientation: 'horizontal',
        gap: 'lg',
    },
};

export const Collapsible: Story = {
    args: {
        items: items,
        collapsible: true,
        orientation: 'horizontal',
        gap: 'md',
        className: 'max-w-xs',
    },
};

export const WithoutHighlight: Story = {
    args: {
        items: items,
        highlight: false,
        orientation: 'horizontal',
        gap: 'lg',
    },
};

export const WithCustomChildren: Story = {
    args: {
        children: (
            <>
                <a href="#" className="px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-all">
                    Accueil
                </a>
                <a href="#" className="px-4 py-2 text-primary bg-primary/10 rounded-md transition-all">
                    Services
                </a>
                <a href="#" className="px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-all">
                    Contact
                </a>
                <button className="px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-all">
                    <LogOut size={18} />
                </button>
            </>
        ),
        orientation: 'horizontal',
        gap: 'md',
    },
};

export const VerticalWithIcons: Story = {
    args: {
        items: [
            { label: 'Accueil', href: '#', active: true, icon: <Home size={18} /> },
            { label: 'Profil', href: '#', icon: <User size={18} /> },
            { label: 'Paramètres', href: '#', icon: <Settings size={18} /> },
            { label: 'Aide', href: '#', icon: <HelpCircle size={18} /> },
        ],
        orientation: 'vertical',
        gap: 'sm',
    },
};

export const FullNavigation: Story = {
    args: {
        items: [
            { label: 'Accueil', href: '#', active: true, icon: <Home size={16} /> },
            { label: 'Services', href: '#', icon: <Bell size={16} /> },
            {
                label: 'Utilisateur',
                href: '#',
                icon: <User size={16} />,
                children: [
                    { label: 'Profil', href: '#' },
                    { label: 'Paramètres', href: '#' },
                    { label: 'Déconnexion', href: '#' },
                ],
            },
        ],
        orientation: 'vertical',
        gap: 'sm',
        activeColor: 'primary',
        highlight: true,
    },
};