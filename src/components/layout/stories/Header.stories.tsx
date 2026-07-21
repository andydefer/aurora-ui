import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '../Header';
import { Menu, Search, User, Bell, Sun } from 'lucide-react';

const meta: Meta<typeof Header> = {
    title: 'Layout/Header',
    component: Header,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        sticky: { control: 'boolean' },
        fixed: { control: 'boolean' },
        transparent: { control: 'boolean' },
        borderBottom: { control: 'boolean' },
        rounded: { control: 'boolean' },
        glassmorphism: { control: 'boolean' },
        blur: { control: 'boolean' },
        height: {
            control: 'select',
            options: [8, 10, 12, 14, 16, 20, 24, 28, 32, 'auto', 'full', 'screen'],
        },
        shadow: {
            control: 'select',
            options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
        },
        background: {
            control: 'select',
            options: ['transparent', 'primary', 'secondary', 'muted', 'card'],
        },
        padding: {
            control: 'select',
            options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
    args: {
        children: (
            <div className="flex items-center gap-4 w-full">
                <span className="text-xl font-bold text-foreground">Logo</span>
                <nav className="flex gap-6 ml-8">
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Accueil</a>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Services</a>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
                </nav>
                <div className="ml-auto flex items-center gap-3">
                    <button className="p-2 rounded-full hover:bg-muted/20 transition-colors text-muted-foreground hover:text-foreground">
                        <Search size={20} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-muted/20 transition-colors text-muted-foreground hover:text-foreground">
                        <Bell size={20} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-muted/20 transition-colors text-muted-foreground hover:text-foreground">
                        <User size={20} />
                    </button>
                </div>
            </div>
        ),
        background: 'card',
        shadow: 'sm',
        borderBottom: true,
        padding: 4,
    },
};

export const Sticky: Story = {
    args: {
        sticky: true,
        children: (
            <div className="flex items-center gap-4 w-full">
                <span className="text-xl font-bold text-foreground">Logo</span>
                <nav className="flex gap-6 ml-8">
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Accueil</a>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Services</a>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
                </nav>
                <div className="ml-auto flex items-center gap-3">
                    <span className="text-sm text-muted-foreground bg-primary/10 px-3 py-1 rounded-full">📌 Sticky</span>
                </div>
            </div>
        ),
        background: 'card',
        shadow: 'md',
        borderBottom: true,
        padding: 4,
    },
};

export const Fixed: Story = {
    args: {
        fixed: true,
        children: (
            <div className="flex items-center gap-4 w-full">
                <span className="text-xl font-bold text-primary-foreground">Logo</span>
                <nav className="flex gap-6 ml-8">
                    <a href="#" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Accueil</a>
                    <a href="#" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Services</a>
                    <a href="#" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Contact</a>
                </nav>
                <div className="ml-auto flex items-center gap-3">
                    <span className="text-sm text-primary-foreground/80 bg-primary-foreground/10 px-3 py-1 rounded-full">📍 Fixed</span>
                </div>
            </div>
        ),
        background: 'primary',
        shadow: 'lg',
        borderBottom: false,
        padding: 4,
    },
};

export const PrimaryBackground: Story = {
    args: {
        background: 'primary',
        children: (
            <div className="flex items-center gap-4 w-full">
                <span className="text-xl font-bold text-primary-foreground">Logo</span>
                <nav className="flex gap-6 ml-8">
                    <a href="#" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Accueil</a>
                    <a href="#" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Services</a>
                    <a href="#" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Contact</a>
                </nav>
                <div className="ml-auto flex items-center gap-3">
                    <button className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors text-primary-foreground">
                        <Search size={20} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors text-primary-foreground">
                        <Bell size={20} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors text-primary-foreground">
                        <User size={20} />
                    </button>
                </div>
            </div>
        ),
        shadow: 'md',
        borderBottom: false,
        padding: 4,
    },
};

export const WithMenuIcon: Story = {
    args: {
        children: (
            <div className="flex items-center gap-4 w-full">
                <button className="p-2 rounded-md hover:bg-muted/20 transition-colors text-foreground">
                    <Menu size={24} />
                </button>
                <span className="text-xl font-bold text-foreground">Logo</span>
                <nav className="gap-6 ml-8 hidden md:flex">
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Accueil</a>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Services</a>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
                </nav>
                <div className="ml-auto flex items-center gap-3">
                    <button className="p-2 rounded-full hover:bg-muted/20 transition-colors text-muted-foreground hover:text-foreground">
                        <Sun size={20} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-muted/20 transition-colors text-muted-foreground hover:text-foreground">
                        <User size={20} />
                    </button>
                </div>
            </div>
        ),
        background: 'card',
        shadow: 'sm',
        borderBottom: true,
        padding: 4,
    },
};

export const WithCustomContent: Story = {
    args: {
        children: (
            <div className="flex items-center gap-4 w-full">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                        A
                    </div>
                    <span className="text-lg font-bold text-foreground">Aurora UI</span>
                </div>
                <div className="flex-1 max-w-md mx-4">
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        className="w-full px-4 py-2 text-sm rounded-md border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Bienvenue, Jean</span>
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        JD
                    </div>
                </div>
            </div>
        ),
        background: 'card',
        shadow: 'sm',
        borderBottom: true,
        padding: 4,
    },
};

export const Rounded: Story = {
    args: {
        rounded: true,
        children: (
            <div className="flex items-center gap-4 w-full">
                <span className="text-xl font-bold text-foreground">Logo</span>
                <nav className="flex gap-6 ml-8">
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Accueil</a>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Services</a>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
                </nav>
                <div className="ml-auto flex items-center gap-3">
                    <span className="text-sm text-foreground bg-primary/10 px-3 py-1 rounded-full">🔵 Rounded</span>
                </div>
            </div>
        ),
        background: 'card',
        shadow: 'sm',
        borderBottom: true,
        padding: 4,
        className: 'mx-4 mt-4',
    },
};