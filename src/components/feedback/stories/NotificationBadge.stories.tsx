// src/components/feedback/stories/NotificationBadge.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { NotificationBadge } from '../NotificationBadge';
import { Button } from '../../forms/Button';
import { Bell, Mail, User, Home, Heart, ShoppingBag, MessageCircle } from 'lucide-react';
import { Badge } from '../Badge';
import { Avatar } from '../../media';

const meta: Meta<typeof NotificationBadge> = {
    title: 'Feedback/NotificationBadge',
    component: NotificationBadge,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un badge de notification qui se positionne sur un élément enfant pour afficher des compteurs ou des points de statut.',
            },
        },
    },
    argTypes: {
        count: {
            control: 'number',
            description: 'Nombre de notifications à afficher',
        },
        dot: {
            control: 'boolean',
            description: 'Afficher un simple point au lieu d\'un nombre',
        },
        max: {
            control: 'number',
            description: 'Nombre maximum avant affichage de +',
        },
        overlap: {
            control: 'boolean',
            description: 'Superposer le badge sur l\'élément',
        },
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'warning', 'destructive', 'info', 'muted', 'outline', 'ghost'],
            description: 'Style visuel du badge',
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg'],
            description: 'Taille du badge',
        },
        rounded: {
            control: 'boolean',
            description: 'Badge arrondi (pill)',
        },
        animate: {
            control: 'boolean',
            description: 'Animation de pulsation',
        },
        subtle: {
            control: 'boolean',
            description: 'Version subtle avec fond transparent',
        },
    },
};

export default meta;
type Story = StoryObj<typeof NotificationBadge>;

// ============ AVEC COMPTEUR ============

export const WithCount: Story = {
    render: () => (
        <div className="flex flex-wrap gap-8 max-w-2xl p-4">
            <NotificationBadge count={5}>
                <Button variant="outline" size="md">
                    <Bell size={20} />
                </Button>
            </NotificationBadge>
            <NotificationBadge count={12} variant="success">
                <Button variant="outline" size="md">
                    <Mail size={20} />
                </Button>
            </NotificationBadge>
            <NotificationBadge count={3} variant="warning">
                <Button variant="outline" size="md">
                    <MessageCircle size={20} />
                </Button>
            </NotificationBadge>
            <NotificationBadge count={99} max={99} variant="destructive">
                <Button variant="outline" size="md">
                    <ShoppingBag size={20} />
                </Button>
            </NotificationBadge>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Badges de notification avec compteur.',
            },
        },
    },
};

// ============ AVEC POINT ============

export const WithDot: Story = {
    render: () => (
        <div className="flex flex-wrap gap-8 max-w-2xl p-4">
            <NotificationBadge dot variant="primary">
                <Button variant="outline" size="md">
                    <Bell size={20} />
                </Button>
            </NotificationBadge>
            <NotificationBadge dot variant="success">
                <Button variant="outline" size="md">
                    <User size={20} />
                </Button>
            </NotificationBadge>
            <NotificationBadge dot variant="warning">
                <Button variant="outline" size="md">
                    <Heart size={20} />
                </Button>
            </NotificationBadge>
            <NotificationBadge dot variant="destructive">
                <Button variant="outline" size="md">
                    <Home size={20} />
                </Button>
            </NotificationBadge>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Badges de notification sous forme de point.',
            },
        },
    },
};

// ============ AVEC OVERLAP ============

export const WithOverlap: Story = {
    render: () => (
        <div className="flex flex-wrap gap-8 max-w-2xl p-4">
            <NotificationBadge count={5} overlap>
                <Button variant="outline" size="md">
                    <Bell size={20} />
                </Button>
            </NotificationBadge>
            <NotificationBadge count={12} variant="success" overlap>
                <Button variant="outline" size="md">
                    <Mail size={20} />
                </Button>
            </NotificationBadge>
            <NotificationBadge dot variant="destructive" overlap>
                <Button variant="outline" size="md">
                    <Heart size={20} />
                </Button>
            </NotificationBadge>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Badges en superposition sur l\'élément.',
            },
        },
    },
};

// ============ DIFFÉRENTES TAILLES ============

export const DifferentSizes: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-8 max-w-2xl p-4">
            <NotificationBadge count={5} size="xs">
                <Button variant="outline" size="xs">XS</Button>
            </NotificationBadge>
            <NotificationBadge count={5} size="sm">
                <Button variant="outline" size="sm">SM</Button>
            </NotificationBadge>
            <NotificationBadge count={5} size="md">
                <Button variant="outline" size="md">MD</Button>
            </NotificationBadge>
            <NotificationBadge count={5} size="lg">
                <Button variant="outline" size="lg">LG</Button>
            </NotificationBadge>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Différentes tailles de badges de notification.',
            },
        },
    },
};

// ============ DIFFÉRENTES VARIANTES ============

export const DifferentVariants: Story = {
    render: () => (
        <div className="flex flex-wrap gap-8 max-w-2xl p-4">
            <NotificationBadge count={5} variant="primary">
                <Button variant="outline" size="md">Primary</Button>
            </NotificationBadge>
            <NotificationBadge count={5} variant="secondary">
                <Button variant="outline" size="md">Secondary</Button>
            </NotificationBadge>
            <NotificationBadge count={5} variant="success">
                <Button variant="outline" size="md">Success</Button>
            </NotificationBadge>
            <NotificationBadge count={5} variant="warning">
                <Button variant="outline" size="md">Warning</Button>
            </NotificationBadge>
            <NotificationBadge count={5} variant="destructive">
                <Button variant="outline" size="md">Destructive</Button>
            </NotificationBadge>
            <NotificationBadge count={5} variant="info">
                <Button variant="outline" size="md">Info</Button>
            </NotificationBadge>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Différentes variantes de badges de notification.',
            },
        },
    },
};

// ============ AVEC AVATAR ============

export const WithAvatar: Story = {
    render: () => (
        <div className="flex flex-wrap gap-8 max-w-2xl p-4">
            <NotificationBadge dot variant="success" overlap>
                <Avatar
                    src="https://i.pravatar.cc/150?img=1"
                    name="Alice Martin"
                    size="lg"
                />
            </NotificationBadge>
            <NotificationBadge count={3} variant="destructive" overlap>
                <Avatar
                    src="https://i.pravatar.cc/150?img=2"
                    name="Thomas Bernard"
                    size="lg"
                />
            </NotificationBadge>
            <NotificationBadge count={12} variant="primary" overlap>
                <Avatar
                    src="https://i.pravatar.cc/150?img=3"
                    name="Sophie Dubois"
                    size="lg"
                />
            </NotificationBadge>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Badges de notification sur des avatars.',
            },
        },
    },
};

// ============ AVEC ANIMATION ============

export const WithAnimation: Story = {
    render: () => (
        <div className="flex flex-wrap gap-8 max-w-2xl p-4">
            <NotificationBadge count={5} animate>
                <Button variant="outline" size="md">
                    <Bell size={20} />
                </Button>
            </NotificationBadge>
            <NotificationBadge dot variant="success" animate>
                <Button variant="outline" size="md">
                    <User size={20} />
                </Button>
            </NotificationBadge>
            <NotificationBadge count={99} max={99} variant="destructive" animate>
                <Button variant="outline" size="md">
                    <Mail size={20} />
                </Button>
            </NotificationBadge>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Badges de notification avec animation de pulsation.',
            },
        },
    },
};

// ============ CAS D'USAGE RÉELS ============

export const RealWorldExamples: Story = {
    render: () => (
        <div className="space-y-8 max-w-3xl w-full p-4">
            <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground">Barre de navigation</h4>
                <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/10">
                    <NotificationBadge count={5} variant="destructive">
                        <Button variant="ghost" size="md" className="p-2">
                            <Bell size={22} />
                        </Button>
                    </NotificationBadge>
                    <NotificationBadge count={12} variant="primary">
                        <Button variant="ghost" size="md" className="p-2">
                            <Mail size={22} />
                        </Button>
                    </NotificationBadge>
                    <NotificationBadge dot variant="success">
                        <Button variant="ghost" size="md" className="p-2">
                            <User size={22} />
                        </Button>
                    </NotificationBadge>
                </div>
            </div>

            <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground">Liste de messages</h4>
                <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/5">
                        <NotificationBadge dot variant="success">
                            <Avatar
                                src="https://i.pravatar.cc/150?img=1"
                                name="Alice Martin"
                                size="sm"
                            />
                        </NotificationBadge>
                        <div className="flex-1">
                            <p className="text-sm font-medium">Alice Martin</p>
                            <p className="text-xs text-muted-foreground">En ligne</p>
                        </div>
                        <Badge variant="destructive" size="xs" rounded>3</Badge>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/5">
                        <NotificationBadge dot variant="warning">
                            <Avatar
                                src="https://i.pravatar.cc/150?img=2"
                                name="Thomas Bernard"
                                size="sm"
                            />
                        </NotificationBadge>
                        <div className="flex-1">
                            <p className="text-sm font-medium">Thomas Bernard</p>
                            <p className="text-xs text-muted-foreground">Absent</p>
                        </div>
                        <Badge variant="warning" size="xs" rounded>1</Badge>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/5">
                        <NotificationBadge dot variant="destructive">
                            <Avatar
                                src="https://i.pravatar.cc/150?img=3"
                                name="Sophie Dubois"
                                size="sm"
                            />
                        </NotificationBadge>
                        <div className="flex-1">
                            <p className="text-sm font-medium">Sophie Dubois</p>
                            <p className="text-xs text-muted-foreground">Hors ligne</p>
                        </div>
                        <Badge variant="info" size="xs" rounded>0</Badge>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground">Applications</h4>
                <div className="flex flex-wrap gap-4">
                    <NotificationBadge count={8} variant="destructive" overlap>
                        <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center border-2 border-primary/20">
                            <ShoppingBag size={32} className="text-primary" />
                        </div>
                    </NotificationBadge>
                    <NotificationBadge count={3} variant="warning" overlap>
                        <div className="w-20 h-20 bg-success/10 rounded-xl flex items-center justify-center border-2 border-success/20">
                            <MessageCircle size={32} className="text-success" />
                        </div>
                    </NotificationBadge>
                    <NotificationBadge dot variant="success" overlap>
                        <div className="w-20 h-20 bg-info/10 rounded-xl flex items-center justify-center border-2 border-info/20">
                            <Heart size={32} className="text-info" />
                        </div>
                    </NotificationBadge>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Exemples d\'utilisation réels dans des interfaces.',
            },
        },
    },
};

// ============ SANS NOTIFICATION ============

export const WithoutNotification: Story = {
    render: () => (
        <div className="flex flex-wrap gap-8 max-w-2xl p-4">
            <NotificationBadge count={0}>
                <Button variant="outline" size="md">
                    <Bell size={20} />
                </Button>
            </NotificationBadge>
            <NotificationBadge dot={false} count={0}>
                <Button variant="outline" size="md">
                    <Mail size={20} />
                </Button>
            </NotificationBadge>
            <NotificationBadge>
                <Button variant="outline" size="md">
                    <User size={20} />
                </Button>
            </NotificationBadge>
            <p className="text-sm text-muted-foreground self-center">Aucun badge affiché quand count=0 ou dot=false</p>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Le badge ne s\'affiche pas quand le compteur est à 0 ou que dot est false.',
            },
        },
    },
};

// ============ AVEC SUBTLE ============

export const WithSubtle: Story = {
    render: () => (
        <div className="flex flex-wrap gap-8 max-w-2xl p-4">
            <NotificationBadge count={5} variant="primary" subtle>
                <Button variant="outline" size="md">
                    <Bell size={20} />
                </Button>
            </NotificationBadge>
            <NotificationBadge count={12} variant="success" subtle>
                <Button variant="outline" size="md">
                    <Mail size={20} />
                </Button>
            </NotificationBadge>
            <NotificationBadge dot variant="destructive" subtle>
                <Button variant="outline" size="md">
                    <Heart size={20} />
                </Button>
            </NotificationBadge>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Badges de notification en version subtle (fond transparent).',
            },
        },
    },
};

// ============ AVEC ROUNDED ============

export const WithRounded: Story = {
    render: () => (
        <div className="flex flex-wrap gap-8 max-w-2xl p-4">
            <NotificationBadge count={5} variant="primary" rounded>
                <Button variant="outline" size="md">
                    <Bell size={20} />
                </Button>
            </NotificationBadge>
            <NotificationBadge count={12} variant="success" rounded>
                <Button variant="outline" size="md">
                    <Mail size={20} />
                </Button>
            </NotificationBadge>
            <NotificationBadge dot variant="destructive" rounded>
                <Button variant="outline" size="md">
                    <Heart size={20} />
                </Button>
            </NotificationBadge>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Badges de notification avec bordure arrondie (pill).',
            },
        },
    },
};

// ============ INTERACTIF ============

export const Playground: Story = {
    args: {
        children: <Button variant="outline" size="md"><Bell size={20} /></Button>,
        count: 5,
        variant: 'destructive',
        size: 'sm',
        max: 99,
        dot: false,
        overlap: false,
        rounded: false,
        animate: false,
        subtle: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'Playground interactif pour tester toutes les options.',
            },
        },
    },
};