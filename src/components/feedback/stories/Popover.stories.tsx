// src/components/feedback/stories/Popover.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from '../Popover';
import { Button } from '../../forms/Button';
import { Text } from '../../typography/Text';
import { Badge } from '../Badge';
import { Avatar } from '../../media/Avatar';
import { User, Settings, LogOut, Bell, Mail, MapPin, Phone, Mail as MailIcon } from 'lucide-react';

const meta: Meta<typeof Popover> = {
    title: 'Feedback/Popover',
    component: Popover,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un popover pour afficher du contenu contextuel.',
            },
        },
    },
    argTypes: {
        position: {
            control: 'select',
            options: ['top', 'bottom', 'left', 'right'],
            description: 'Position du popover',
        },
        trigger: {
            control: 'select',
            options: ['click', 'hover', 'focus'],
            description: 'Action de déclenchement',
        },
        withArrow: {
            control: 'boolean',
            description: 'Afficher la flèche',
        },
        offset: {
            control: 'number',
            description: 'Décalage en pixels',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const UserProfile: Story = {
    render: () => (
        <Popover
            content={
                <div className="space-y-4 max-w-xs">
                    <div className="flex items-center gap-3">
                        <Avatar
                            src="https://i.pravatar.cc/100?img=1"
                            name="Marie Dubois"
                            size="lg"
                            shape="rounded"
                        />
                        <div>
                            <Text variant="h6" className="font-bold">Marie Dubois</Text>
                            <Text variant="small" color="muted">marie.dubois@email.com</Text>
                            <Badge variant="success" size="sm" dot>En ligne</Badge>
                        </div>
                    </div>
                    <div className="space-y-1 pt-2 border-t border-border/50">
                        <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                            <User size={14} />
                            Mon profil
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                            <Mail size={14} />
                            Messages
                            <Badge count={3} variant="primary" size="xs" className="ml-auto" />
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                            <Bell size={14} />
                            Notifications
                            <Badge count={5} variant="destructive" size="xs" className="ml-auto" />
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                            <Settings size={14} />
                            Paramètres
                        </Button>
                        <div className="pt-1 border-t border-border/50">
                            <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-destructive">
                                <LogOut size={14} />
                                Déconnexion
                            </Button>
                        </div>
                    </div>
                </div>
            }
            position="bottom"
            trigger="click"
            withArrow
        >
            <Button variant="primary" icon={<User size={16} />}>
                Mon compte
            </Button>
        </Popover>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Popover de profil utilisateur.',
            },
        },
    },
};

export const ContactInfo: Story = {
    render: () => (
        <Popover
            content={
                <div className="space-y-3 max-w-xs">
                    <Text variant="h6" className="font-bold">📞 Contact</Text>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/10 transition-colors">
                            <Phone size={16} className="text-muted-foreground" />
                            <div>
                                <Text variant="small" className="font-medium">Téléphone</Text>
                                <Text variant="caption" color="muted">+33 6 12 34 56 78</Text>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/10 transition-colors">
                            <MailIcon size={16} className="text-muted-foreground" />
                            <div>
                                <Text variant="small" className="font-medium">Email</Text>
                                <Text variant="caption" color="muted">contact@entreprise.com</Text>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/10 transition-colors">
                            <MapPin size={16} className="text-muted-foreground" />
                            <div>
                                <Text variant="small" className="font-medium">Adresse</Text>
                                <Text variant="caption" color="muted">123 Rue de la Paix, 75000 Paris</Text>
                            </div>
                        </div>
                    </div>
                    <div className="pt-2 border-t border-border/50">
                        <Button variant="primary" size="sm" className="w-full">Contacter</Button>
                    </div>
                </div>
            }
            position="bottom"
            trigger="click"
            withArrow
        >
            <Button variant="outline" icon={<MapPin size={16} />}>
                Contact
            </Button>
        </Popover>
    ),
};

export const NotificationCenter: Story = {
    render: () => (
        <Popover
            content={
                <div className="space-y-3 max-w-sm">
                    <div className="flex items-center justify-between">
                        <Text variant="h6" className="font-bold">🔔 Notifications</Text>
                        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                            Tout marquer comme lu
                        </Button>
                    </div>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                        <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-md border border-primary/20">
                            <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                            <div>
                                <Text variant="small" className="font-medium">Nouveau message</Text>
                                <Text variant="caption" color="muted">Il y a 5 minutes</Text>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-md hover:bg-muted/5 transition-colors">
                            <div className="w-2 h-2 rounded-full bg-muted mt-1.5 shrink-0" />
                            <div>
                                <Text variant="small" className="font-medium">Mise à jour disponible</Text>
                                <Text variant="caption" color="muted">Il y a 2 heures</Text>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-md hover:bg-muted/5 transition-colors">
                            <div className="w-2 h-2 rounded-full bg-muted mt-1.5 shrink-0" />
                            <div>
                                <Text variant="small" className="font-medium">Rapport généré</Text>
                                <Text variant="caption" color="muted">Hier à 14:30</Text>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-md hover:bg-muted/5 transition-colors">
                            <div className="w-2 h-2 rounded-full bg-muted mt-1.5 shrink-0" />
                            <div>
                                <Text variant="small" className="font-medium">Invitation reçue</Text>
                                <Text variant="caption" color="muted">Il y a 3 jours</Text>
                            </div>
                        </div>
                    </div>
                    <div className="pt-2 border-t border-border/50">
                        <Button variant="ghost" size="sm" className="w-full text-muted-foreground">
                            Voir toutes les notifications
                        </Button>
                    </div>
                </div>
            }
            position="bottom"
            trigger="click"
            withArrow
        >
            <Button variant="outline" icon={<Bell size={16} />} className="relative">
                <Badge count={3} variant="destructive" size="sm" className="absolute -top-1 -right-1" />
            </Button>
        </Popover>
    ),
};

export const InteractivePlayground: Story = {
    render: (args) => (
        <Popover
            content={<Text>Contenu du playground</Text>}
            position={args.position}
            trigger={args.trigger}
            withArrow={args.withArrow}
            offset={args.offset}
        >
            <Button variant="primary">Tester</Button>
        </Popover>
    ),
    args: {
        position: 'bottom',
        trigger: 'click',
        withArrow: true,
        offset: 8,
    },
};