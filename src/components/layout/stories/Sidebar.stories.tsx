import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from '../Sidebar';
import { useState } from 'react';
import { Home, User, Settings, LogOut, HelpCircle, Bell, Mail } from 'lucide-react';
import { clsx } from '../../../utils/clsx';

const meta: Meta<typeof Sidebar> = {
    title: 'Layout/Sidebar',
    component: Sidebar,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        position: {
            control: 'select',
            options: ['left', 'right'],
        },
        width: {
            control: 'select',
            options: ['xs', 'sm', 'xl', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'],
        },
        background: {
            control: 'select',
            options: ['transparent', 'primary', 'secondary', 'muted', 'card'],
        },
        collapsible: { control: 'boolean' },
        border: { control: 'boolean' },
        overlay: { control: 'boolean' },
        closeOnOverlay: { control: 'boolean' },
        title: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

const SidebarContent = () => (
    <nav className="flex flex-col gap-1">
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium">
            <Home size={18} />
            Accueil
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/20 text-foreground transition-colors">
            <User size={18} />
            Profil
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/20 text-foreground transition-colors">
            <Mail size={18} />
            Messages
            <span className="ml-auto px-2 py-0.5 text-xs bg-danger text-primary-foreground rounded-full">3</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/20 text-foreground transition-colors">
            <Bell size={18} />
            Notifications
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/20 text-foreground transition-colors">
            <Settings size={18} />
            Paramètres
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/20 text-foreground transition-colors">
            <HelpCircle size={18} />
            Aide
        </a>
        <div className="mt-auto pt-4 border-t border-border">
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/20 text-danger transition-colors">
                <LogOut size={18} />
                Déconnexion
            </a>
        </div>
    </nav>
);

const PageWithSidebar = ({ children, ...props }: any) => {
    const [open, setOpen] = useState(true);

    return (
        <div className="min-h-screen bg-background flex">
            <Sidebar
                {...props}
                open={open}
                onToggle={() => setOpen(!open)}
                onClose={() => setOpen(false)}
            >
                {children}
            </Sidebar>
            <div className={clsx(
                'flex-1 transition-all duration-300 p-8',
                open && props.position === 'left' && 'ml-64',
                open && props.position === 'right' && 'mr-64'
            )}>
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-foreground mb-4">Contenu principal</h1>
                    <p className="text-muted-foreground mb-4">
                        Cliquez sur le bouton de toggle pour ouvrir/fermer la sidebar.
                    </p>
                    <button
                        onClick={() => setOpen(!open)}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        {open ? 'Fermer' : 'Ouvrir'} la sidebar
                    </button>
                </div>
            </div>
        </div>
    );
};

export const Default: Story = {
    render: (args) => (
        <PageWithSidebar {...args}>
            <SidebarContent />
        </PageWithSidebar>
    ),
    args: {
        position: 'left',
        width: 'xl',
        background: 'card',
        border: true,
        collapsible: true,
        title: 'Navigation',
    },
};

export const Right: Story = {
    render: (args) => (
        <PageWithSidebar {...args}>
            <SidebarContent />
        </PageWithSidebar>
    ),
    args: {
        position: 'right',
        width: 'xl',
        background: 'card',
        border: true,
        collapsible: true,
        title: 'Navigation',
    },
};

export const WithOverlay: Story = {
    render: (args) => (
        <PageWithSidebar {...args}>
            <SidebarContent />
        </PageWithSidebar>
    ),
    args: {
        position: 'left',
        width: 'xl',
        background: 'card',
        border: true,
        collapsible: true,
        overlay: true,
        title: 'Navigation',
    },
};

export const PrimaryBackground: Story = {
    render: (args) => (
        <PageWithSidebar {...args}>
            <SidebarContent />
        </PageWithSidebar>
    ),
    args: {
        position: 'left',
        width: 'xl',
        background: 'primary',
        border: false,
        collapsible: true,
        title: 'Navigation',
    },
};

export const SmallWidth: Story = {
    render: (args) => (
        <PageWithSidebar {...args}>
            <SidebarContent />
        </PageWithSidebar>
    ),
    args: {
        position: 'left',
        width: 'sm',
        background: 'card',
        border: true,
        collapsible: true,
        title: 'Navigation',
    },
};

export const LargeWidth: Story = {
    render: (args) => (
        <PageWithSidebar {...args}>
            <SidebarContent />
        </PageWithSidebar>
    ),
    args: {
        position: 'left',
        width: 'lg',
        background: 'card',
        border: true,
        collapsible: true,
        title: 'Navigation',
    },
};

export const WithCustomHeader: Story = {
    render: (args) => (
        <PageWithSidebar {...args}>
            <SidebarContent />
        </PageWithSidebar>
    ),
    args: {
        position: 'left',
        width: 'xl',
        background: 'card',
        border: true,
        collapsible: true,
        header: (
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    A
                </div>
                <span className="text-lg font-bold text-foreground">Aurora UI</span>
            </div>
        ),
    },
};

export const WithFooter: Story = {
    render: (args) => (
        <PageWithSidebar {...args}>
            <SidebarContent />
        </PageWithSidebar>
    ),
    args: {
        position: 'left',
        width: 'xl',
        background: 'card',
        border: true,
        collapsible: true,
        title: 'Navigation',
        footer: (
            <div className="text-sm text-muted-foreground">
                Version 1.0.0
            </div>
        ),
    },
};

export const WithoutBorder: Story = {
    render: (args) => (
        <PageWithSidebar {...args}>
            <SidebarContent />
        </PageWithSidebar>
    ),
    args: {
        position: 'left',
        width: 'xl',
        background: 'card',
        border: false,
        collapsible: true,
        title: 'Navigation',
    },
};

export const WithoutCollapsible: Story = {
    render: (args) => (
        <PageWithSidebar {...args}>
            <SidebarContent />
        </PageWithSidebar>
    ),
    args: {
        position: 'left',
        width: 'xl',
        background: 'card',
        border: true,
        collapsible: false,
        title: 'Navigation',
    },
};