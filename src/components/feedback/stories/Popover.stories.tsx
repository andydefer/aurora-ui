// src/components/feedback/stories/Popover.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from '../Popover';
import { Button } from '../../forms/Button';
import { Text } from '../../typography/Text';
import { Badge } from '../Badge';
import { NotificationBadge } from '../NotificationBadge';
import { Avatar } from '../../media/Avatar';
import { User, Settings, LogOut, Bell, Mail, MapPin, Phone, Mail as MailIcon, HelpCircle, Info, Download, Upload, Share2, Trash2, Edit, Copy } from 'lucide-react';

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

// ============ PROFIL UTILISATEUR (BOTTOM) ============

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
                        <NotificationBadge count={3} variant="primary" size="xs" overlap>
                            <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                                <Mail size={14} />
                                Messages
                            </Button>
                        </NotificationBadge>
                        <NotificationBadge count={5} variant="destructive" size="xs" overlap>
                            <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                                <Bell size={14} />
                                Notifications
                            </Button>
                        </NotificationBadge>
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

// ============ CONTACT (BOTTOM) ============

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

// ============ CENTRE DE NOTIFICATIONS (BOTTOM) ============

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
            <NotificationBadge count={3} variant="destructive">
                <Button variant="outline" icon={<Bell size={16} />}>
                    Notifications
                </Button>
            </NotificationBadge>
        </Popover>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Centre de notifications avec badge de compteur.',
            },
        },
    },
};

// ============ NOTIFICATIONS AVEC DOT (BOTTOM) ============

export const NotificationWithDot: Story = {
    render: () => (
        <Popover
            content={
                <div className="space-y-3 max-w-sm">
                    <Text variant="h6" className="font-bold">🔔 Alertes système</Text>
                    <div className="space-y-2">
                        <div className="flex items-start gap-3 p-3 bg-destructive/5 rounded-md border border-destructive/20">
                            <div className="w-2 h-2 rounded-full bg-destructive mt-1.5 shrink-0" />
                            <div>
                                <Text variant="small" className="font-medium text-destructive">Erreur critique</Text>
                                <Text variant="caption" color="muted">Serveur principal inaccessible</Text>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-warning/5 rounded-md border border-warning/20">
                            <div className="w-2 h-2 rounded-full bg-warning mt-1.5 shrink-0" />
                            <div>
                                <Text variant="small" className="font-medium text-warning">Avertissement</Text>
                                <Text variant="caption" color="muted">Espace disque presque plein</Text>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-success/5 rounded-md border border-success/20">
                            <div className="w-2 h-2 rounded-full bg-success mt-1.5 shrink-0" />
                            <div>
                                <Text variant="small" className="font-medium text-success">Système OK</Text>
                                <Text variant="caption" color="muted">Tous les services sont opérationnels</Text>
                            </div>
                        </div>
                    </div>
                </div>
            }
            position="bottom"
            trigger="click"
            withArrow
        >
            <NotificationBadge dot variant="destructive" animate>
                <Button variant="outline" icon={<Bell size={16} />}>
                    Alertes
                </Button>
            </NotificationBadge>
        </Popover>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Popover avec NotificationBadge en mode point pour les alertes système.',
            },
        },
    },
};

// ============ MULTIPLES NOTIFICATIONS (BOTTOM) ============

export const MultipleNotifications: Story = {
    render: () => (
        <div className="flex gap-8">
            <Popover
                content={
                    <div className="space-y-3 max-w-xs p-2">
                        <Text variant="h6" className="font-bold">📧 Messages</Text>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/5">
                                <Avatar src="https://i.pravatar.cc/150?img=4" name="Jean" size="sm" />
                                <div className="flex-1">
                                    <Text variant="small" className="font-medium">Jean Dupont</Text>
                                    <Text variant="caption" color="muted">Nouveau message reçu</Text>
                                </div>
                                <Badge variant="destructive" size="xs" rounded>2</Badge>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/5">
                                <Avatar src="https://i.pravatar.cc/150?img=5" name="Julie" size="sm" />
                                <div className="flex-1">
                                    <Text variant="small" className="font-medium">Julie Martin</Text>
                                    <Text variant="caption" color="muted">À propos du projet</Text>
                                </div>
                                <Badge variant="primary" size="xs" rounded>1</Badge>
                            </div>
                        </div>
                    </div>
                }
                position="bottom"
                trigger="click"
                withArrow
            >
                <NotificationBadge count={3} variant="destructive" overlap>
                    <Button variant="outline" icon={<Mail size={16} />}>
                        Messages
                    </Button>
                </NotificationBadge>
            </Popover>

            <Popover
                content={
                    <div className="space-y-3 max-w-xs p-2">
                        <Text variant="h6" className="font-bold">👥 Demandes</Text>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/5">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <User size={18} className="text-primary" />
                                </div>
                                <div className="flex-1">
                                    <Text variant="small" className="font-medium">Demande d'accès</Text>
                                    <Text variant="caption" color="muted">En attente de validation</Text>
                                </div>
                                <Badge variant="warning" size="xs" rounded>3</Badge>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/5">
                                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                                    <Settings size={18} className="text-success" />
                                </div>
                                <div className="flex-1">
                                    <Text variant="small" className="font-medium">Mise à jour</Text>
                                    <Text variant="caption" color="muted">Approuvée</Text>
                                </div>
                                <Badge variant="success" size="xs" rounded>1</Badge>
                            </div>
                        </div>
                    </div>
                }
                position="bottom"
                trigger="click"
                withArrow
            >
                <NotificationBadge dot variant="warning" overlap>
                    <Button variant="outline" icon={<User size={16} />}>
                        Demandes
                    </Button>
                </NotificationBadge>
            </Popover>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Plusieurs Popovers avec NotificationBadge pour différents contextes.',
            },
        },
    },
};

// ============ NOUVEAU : POPOVER EN HAUT ============

export const TopPositionMenu: Story = {
    render: () => (
        <div className="flex flex-col items-center gap-8 p-8">
            <Popover
                content={
                    <div className="space-y-1 min-w-[180px]">
                        <Text variant="h6" className="font-bold px-2 pb-2">⚡ Actions rapides</Text>
                        <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                            <Edit size={14} />
                            Modifier
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                            <Copy size={14} />
                            Dupliquer
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                            <Share2 size={14} />
                            Partager
                        </Button>
                        <div className="border-t border-border/50 pt-1">
                            <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-destructive">
                                <Trash2 size={14} />
                                Supprimer
                            </Button>
                        </div>
                    </div>
                }
                position="top"
                trigger="click"
                withArrow
                offset={12}
            >
                <Button variant="primary" icon={<Edit size={16} />}>
                    Actions
                </Button>
            </Popover>

            <p className="text-sm text-muted-foreground">Cliquez sur le bouton pour ouvrir le popover vers le haut</p>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Popover qui s\'ouvre vers le haut avec un menu d\'actions.',
            },
        },
    },
};

// ============ NOUVEAU : POPOVER EN HAUT AVEC NOTIFICATIONS ============

export const TopPositionWithNotifications: Story = {
    render: () => (
        <div className="flex flex-col items-center gap-8 p-8">
            <Popover
                content={
                    <div className="space-y-3 max-w-sm">
                        <div className="flex items-center justify-between">
                            <Text variant="h6" className="font-bold">🔔 Notifications</Text>
                            <Badge variant="primary" size="sm" rounded>3 nouvelles</Badge>
                        </div>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            <div className="flex items-start gap-3 p-2 bg-primary/5 rounded-md border border-primary/20">
                                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                                <div>
                                    <Text variant="small" className="font-medium">Nouveau message</Text>
                                    <Text variant="caption" color="muted">Il y a 2 minutes</Text>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/5">
                                <div className="w-2 h-2 rounded-full bg-warning mt-1.5 shrink-0" />
                                <div>
                                    <Text variant="small" className="font-medium">Mise à jour disponible</Text>
                                    <Text variant="caption" color="muted">Il y a 1 heure</Text>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/5">
                                <div className="w-2 h-2 rounded-full bg-success mt-1.5 shrink-0" />
                                <div>
                                    <Text variant="small" className="font-medium">Tâche terminée</Text>
                                    <Text variant="caption" color="muted">Il y a 3 heures</Text>
                                </div>
                            </div>
                        </div>
                        <div className="pt-2 border-t border-border/50">
                            <Button variant="ghost" size="sm" className="w-full text-primary">
                                Voir toutes
                            </Button>
                        </div>
                    </div>
                }
                position="top"
                trigger="click"
                withArrow
                offset={12}
            >
                <NotificationBadge count={3} variant="destructive">
                    <Button variant="outline" icon={<Bell size={16} />}>
                        Notifications
                    </Button>
                </NotificationBadge>
            </Popover>

            <p className="text-sm text-muted-foreground">Popover avec notifications qui s'ouvre vers le haut</p>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Popover de notifications qui s\'ouvre vers le haut.',
            },
        },
    },
};

// ============ NOUVEAU : POPOVER EN HAUT AVEC AVATAR ============

export const TopPositionWithAvatar: Story = {
    render: () => (
        <div className="flex flex-col items-center gap-8 p-8">
            <Popover
                content={
                    <div className="space-y-3 max-w-xs">
                        <div className="flex items-center gap-3">
                            <Avatar
                                src="https://i.pravatar.cc/100?img=2"
                                name="Thomas Bernard"
                                size="lg"
                                shape="rounded"
                            />
                            <div>
                                <Text variant="h6" className="font-bold">Thomas Bernard</Text>
                                <Text variant="small" color="muted">thomas@email.com</Text>
                                <Badge variant="warning" size="sm" dot>Absent</Badge>
                            </div>
                        </div>
                        <div className="space-y-1 pt-2 border-t border-border/50">
                            <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                                <User size={14} />
                                Profil
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
                position="top"
                trigger="click"
                withArrow
                offset={12}
            >
                <Avatar
                    src="https://i.pravatar.cc/100?img=2"
                    name="Thomas Bernard"
                    size="md"
                    shape="rounded"
                />
            </Popover>

            <p className="text-sm text-muted-foreground">Popover de profil qui s'ouvre vers le haut</p>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Popover de profil utilisateur qui s\'ouvre vers le haut.',
            },
        },
    },
};

// ============ NOUVEAU : COMPARAISON HAUT / BAS ============

export const PositionComparison: Story = {
    render: () => (
        <div className="flex flex-col items-center gap-12 p-8">
            <div className="flex gap-8">
                <div className="flex flex-col items-center gap-4">
                    <Popover
                        content={
                            <div className="space-y-2 p-2 min-w-[150px]">
                                <Text variant="small" className="font-medium">📋 Options</Text>
                                <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                                    <Download size={14} />
                                    Télécharger
                                </Button>
                                <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                                    <Upload size={14} />
                                    Importer
                                </Button>
                                <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                                    <Share2 size={14} />
                                    Partager
                                </Button>
                            </div>
                        }
                        position="bottom"
                        trigger="click"
                        withArrow
                        offset={8}
                    >
                        <Button variant="outline">⬇️ Bottom</Button>
                    </Popover>
                    <span className="text-xs text-muted-foreground">Position basse</span>
                </div>

                <div className="flex flex-col items-center gap-4">
                    <Popover
                        content={
                            <div className="space-y-2 p-2 min-w-[150px]">
                                <Text variant="small" className="font-medium">📋 Options</Text>
                                <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                                    <Download size={14} />
                                    Télécharger
                                </Button>
                                <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                                    <Upload size={14} />
                                    Importer
                                </Button>
                                <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                                    <Share2 size={14} />
                                    Partager
                                </Button>
                            </div>
                        }
                        position="top"
                        trigger="click"
                        withArrow
                        offset={8}
                    >
                        <Button variant="outline">⬆️ Top</Button>
                    </Popover>
                    <span className="text-xs text-muted-foreground">Position haute</span>
                </div>
            </div>

            <div className="flex gap-8">
                <div className="flex flex-col items-center gap-4">
                    <Popover
                        content={
                            <div className="space-y-2 p-2 min-w-[150px]">
                                <Text variant="small" className="font-medium">📋 Options</Text>
                                <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                                    <Edit size={14} />
                                    Modifier
                                </Button>
                                <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                                    <Copy size={14} />
                                    Dupliquer
                                </Button>
                                <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-destructive">
                                    <Trash2 size={14} />
                                    Supprimer
                                </Button>
                            </div>
                        }
                        position="left"
                        trigger="click"
                        withArrow
                        offset={8}
                    >
                        <Button variant="outline">⬅️ Left</Button>
                    </Popover>
                    <span className="text-xs text-muted-foreground">Position gauche</span>
                </div>

                <div className="flex flex-col items-center gap-4">
                    <Popover
                        content={
                            <div className="space-y-2 p-2 min-w-[150px]">
                                <Text variant="small" className="font-medium">📋 Options</Text>
                                <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                                    <Edit size={14} />
                                    Modifier
                                </Button>
                                <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                                    <Copy size={14} />
                                    Dupliquer
                                </Button>
                                <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-destructive">
                                    <Trash2 size={14} />
                                    Supprimer
                                </Button>
                            </div>
                        }
                        position="right"
                        trigger="click"
                        withArrow
                        offset={8}
                    >
                        <Button variant="outline">➡️ Right</Button>
                    </Popover>
                    <span className="text-xs text-muted-foreground">Position droite</span>
                </div>
            </div>

            <p className="text-sm text-muted-foreground">Comparaison des 4 positions du Popover</p>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Comparaison des différentes positions du Popover (haut, bas, gauche, droite).',
            },
        },
    },
};

// ============ NOUVEAU : POPOVER EN HAUT AVEC INFOS ============

export const TopPositionWithInfo: Story = {
    render: () => (
        <div className="flex flex-col items-center gap-8 p-8">
            <Popover
                content={
                    <div className="space-y-3 max-w-xs">
                        <div className="flex items-center gap-2">
                            <Info size={18} className="text-primary" />
                            <Text variant="h6" className="font-bold">Informations</Text>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between p-2 bg-muted/10 rounded-md">
                                <Text variant="small" color="muted">Version</Text>
                                <Text variant="small" className="font-medium">v2.4.1</Text>
                            </div>
                            <div className="flex justify-between p-2 bg-muted/10 rounded-md">
                                <Text variant="small" color="muted">Dernière mise à jour</Text>
                                <Text variant="small" className="font-medium">12/01/2024</Text>
                            </div>
                            <div className="flex justify-between p-2 bg-muted/10 rounded-md">
                                <Text variant="small" color="muted">Statut</Text>
                                <Badge variant="success" size="sm" dot>Opérationnel</Badge>
                            </div>
                        </div>
                        <div className="pt-2 border-t border-border/50">
                            <Button variant="ghost" size="sm" className="w-full gap-2">
                                <HelpCircle size={14} />
                                En savoir plus
                            </Button>
                        </div>
                    </div>
                }
                position="top"
                trigger="click"
                withArrow
                offset={12}
            >
                <Button variant="ghost" icon={<Info size={18} />}>
                    Infos
                </Button>
            </Popover>

            <p className="text-sm text-muted-foreground">Popover d'informations qui s'ouvre vers le haut</p>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Popover d\'informations système qui s\'ouvre vers le haut.',
            },
        },
    },
};

// ============ PLAYGROUND INTERACTIF ============

export const InteractivePlayground: Story = {
    render: (args) => (
        <Popover
            content={
                <div className="p-4 max-w-sm">
                    <Text variant="h6" className="font-bold mb-2">🎮 Playground</Text>
                    <Text variant="small" color="muted">
                        Position: {args.position}<br />
                        Trigger: {args.trigger}<br />
                        Arrow: {args.withArrow ? '✅' : '❌'}<br />
                        Offset: {args.offset}px
                    </Text>
                    <div className="mt-3 pt-3 border-t border-border/50">
                        <Button variant="primary" size="sm" className="w-full">
                            Action
                        </Button>
                    </div>
                </div>
            }
            position={args.position}
            trigger={args.trigger}
            withArrow={args.withArrow}
            offset={args.offset}
        >
            <NotificationBadge count={5} variant="destructive">
                <Button variant="primary">Tester</Button>
            </NotificationBadge>
        </Popover>
    ),
    args: {
        position: 'bottom',
        trigger: 'click',
        withArrow: true,
        offset: 8,
    },
};