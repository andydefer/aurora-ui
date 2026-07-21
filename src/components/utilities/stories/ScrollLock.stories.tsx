// src/components/utilities/stories/ScrollLock.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ScrollLock } from '../ScrollLock';
import { useState } from 'react';
import { Button } from '../../forms/Button';
import { Text } from '../../typography/Text';
import { Card } from '../../overlay/Card';
import { Badge } from '../../feedback/Badge';
import { Lock, Unlock } from 'lucide-react';

const meta: Meta<typeof ScrollLock> = {
    title: 'Utilities/ScrollLock',
    component: ScrollLock,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un composant pour verrouiller le défilement de la page.',
            },
        },
    },
    argTypes: {
        enabled: {
            control: 'boolean',
            description: 'Activer le verrouillage du défilement',
        },
        showIndicator: {
            control: 'boolean',
            description: 'Afficher un indicateur de verrouillage',
        },
        indicatorText: {
            control: 'text',
            description: 'Texte de l\'indicateur',
        },
        indicatorColor: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'danger', 'success', 'warning'],
            description: 'Couleur de l\'indicateur',
        },
        preserveScrollPosition: {
            control: 'boolean',
            description: 'Conserver la position de défilement',
        },
    },
};

export default meta;
type Story = StoryObj<typeof ScrollLock>;

// ============ COMPOSANT DE DÉMONSTRATION ============

const ScrollLockDemo = ({
    children,
    ...props
}: React.PropsWithChildren<Partial<React.ComponentProps<typeof ScrollLock>>>) => {
    const [isLocked, setIsLocked] = useState(false);

    return (
        <div className="space-y-6 w-full max-w-2xl">
            {/* Contrôle */}
            <Card variant="elevated" radius="lg" shadow="md" className="p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                        <div className={clsx(
                            'w-3 h-3 rounded-full transition-all duration-300',
                            isLocked ? 'bg-danger animate-pulse' : 'bg-success'
                        )} />
                        <div>
                            <Text variant="h6" className="font-bold">
                                {isLocked ? '🔒 Défilement verrouillé' : '🔓 Défilement déverrouillé'}
                            </Text>
                            <Text variant="small" color="muted">
                                {isLocked
                                    ? 'Le défilement de la page est bloqué'
                                    : 'Le défilement de la page est libre'
                                }
                            </Text>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge variant={isLocked ? 'danger' : 'success'} size="md">
                            {isLocked ? 'Verrouillé' : 'Déverrouillé'}
                        </Badge>
                        <Button
                            variant={isLocked ? 'danger' : 'primary'}
                            size="md"
                            icon={isLocked ? <Unlock size={16} /> : <Lock size={16} />}
                            onClick={() => setIsLocked(!isLocked)}
                            className="min-w-[140px]"
                        >
                            {isLocked ? 'Déverrouiller' : 'Verrouiller'}
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Contenu verrouillé */}
            <ScrollLock {...props} enabled={isLocked}>
                {children || (
                    <Card
                        variant={isLocked ? 'elevated' : 'default'}
                        radius="lg"
                        shadow={isLocked ? 'lg' : 'sm'}
                        className={clsx(
                            'p-6 transition-all duration-300',
                            isLocked && 'ring-2 ring-danger/20 border-danger/20'
                        )}
                    >
                        <div className="flex items-start gap-4">
                            <div className={clsx(
                                'p-3 rounded-full transition-all duration-300',
                                isLocked ? 'bg-danger/10 text-danger' : 'bg-primary/10 text-primary'
                            )}>
                                {isLocked ? <Lock size={24} /> : <Unlock size={24} />}
                            </div>
                            <div className="flex-1">
                                <Text variant="h5" className="font-bold">
                                    {isLocked ? 'Contenu verrouillé' : 'Contenu déverrouillé'}
                                </Text>
                                <Text color="muted" className="mt-1">
                                    {isLocked
                                        ? 'Le défilement est actuellement verrouillé. Vous ne pouvez pas défiler la page.'
                                        : 'Le défilement est actuellement déverrouillé. Vous pouvez défiler librement.'
                                    }
                                </Text>
                                <div className="mt-4 p-3 bg-muted/10 rounded-lg border border-border/50">
                                    <div className="flex items-center gap-2">
                                        <div className={clsx(
                                            'w-2 h-2 rounded-full transition-all duration-300',
                                            isLocked ? 'bg-danger' : 'bg-success'
                                        )} />
                                        <Text variant="small" className="font-mono">
                                            Status: {isLocked ? '🔒 VERROUILLÉ' : '🔓 DÉVERROUILLÉ'}
                                        </Text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                )}
            </ScrollLock>

            {/* Contenu de démonstration pour le défilement */}
            <div className="space-y-4 mt-8">
                <div className="flex items-center justify-between">
                    <Text variant="h6" className="font-bold">Contenu de démonstration</Text>
                    <Badge variant="outline" size="sm">
                        {isLocked ? '⛔ Défilement bloqué' : '✅ Défilement libre'}
                    </Badge>
                </div>
                <Text color="muted" className="text-sm">
                    {isLocked
                        ? '🔒 Le défilement est verrouillé. Essayez de défiler !'
                        : '📜 Faites défiler pour voir tout le contenu.'
                    }
                </Text>
                <div className="space-y-3">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Card
                            key={i}
                            variant="default"
                            radius="md"
                            shadow="sm"
                            border
                            className={clsx(
                                'p-4 transition-all duration-300',
                                isLocked && 'opacity-75 hover:opacity-90'
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <div className={clsx(
                                    'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm',
                                    isLocked ? 'bg-muted/20 text-muted-foreground' : 'bg-primary/10 text-primary'
                                )}>
                                    {i + 1}
                                </div>
                                <div className="flex-1">
                                    <Text className="font-medium">Élément {i + 1}</Text>
                                    <Text variant="small" color="muted">
                                        {isLocked
                                            ? '⛔ Contenu verrouillé'
                                            : '📄 Contenu déverrouillé'
                                        }
                                    </Text>
                                </div>
                                <Badge
                                    variant={isLocked ? 'muted' : 'success'}
                                    size="sm"
                                    dot
                                >
                                    {isLocked ? 'Bloqué' : 'Libre'}
                                </Badge>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ============ STORIES ============

export const Default: Story = {
    render: () => <ScrollLockDemo />,
    parameters: {
        docs: {
            description: {
                story: 'Verrouillage de défilement de base avec indicateur.',
            },
        },
    },
};

export const WithIndicator: Story = {
    render: () => (
        <ScrollLockDemo
            showIndicator={true}
            indicatorText="🔒 Défilement verrouillé"
            indicatorColor="primary"
        />
    ),
    parameters: {
        docs: {
            description: {
                story: 'Verrouillage avec indicateur visuel.',
            },
        },
    },
};

export const WithCustomIndicator: Story = {
    render: () => (
        <ScrollLockDemo
            showIndicator={true}
            indicatorText="⛔ Arrêtez de défiler !"
            indicatorColor="danger"
        />
    ),
    parameters: {
        docs: {
            description: {
                story: 'Verrouillage avec indicateur personnalisé.',
            },
        },
    },
};

export const WithDangerColor: Story = {
    render: () => (
        <ScrollLockDemo
            showIndicator={true}
            indicatorText="🚫 Défilement bloqué"
            indicatorColor="danger"
        />
    ),
    parameters: {
        docs: {
            description: {
                story: 'Verrouillage avec couleur danger.',
            },
        },
    },
};

export const WithSuccessColor: Story = {
    render: () => (
        <ScrollLockDemo
            showIndicator={true}
            indicatorText="✅ Défilement verrouillé"
            indicatorColor="success"
        />
    ),
    parameters: {
        docs: {
            description: {
                story: 'Verrouillage avec couleur succès.',
            },
        },
    },
};

export const WithoutPreserveScroll: Story = {
    render: () => (
        <ScrollLockDemo
            showIndicator={true}
            preserveScrollPosition={false}
        />
    ),
    parameters: {
        docs: {
            description: {
                story: 'Verrouillage sans conservation de la position de défilement.',
            },
        },
    },
};

export const InModal: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div className="space-y-6 w-full max-w-2xl">
                <Card variant="elevated" radius="lg" shadow="md" className="p-6 text-center">
                    <Text variant="h5" className="font-bold">Modal avec verrouillage</Text>
                    <Text color="muted" className="mt-2">
                        Ouvrez la modal pour verrouiller le défilement.
                    </Text>
                    <Button
                        variant="primary"
                        size="lg"
                        icon={<Lock size={18} />}
                        onClick={() => setIsOpen(true)}
                        className="mt-4"
                    >
                        Ouvrir la modal
                    </Button>
                </Card>

                {isOpen && (
                    <ScrollLock
                        enabled={isOpen}
                        showIndicator
                        indicatorText="📱 Modal ouverte"
                        indicatorColor="primary"
                    >
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
                            <Card
                                variant="elevated"
                                radius="xl"
                                shadow="2xl"
                                className="max-w-md w-full p-6 animate-in fade-in zoom-in duration-200"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-full bg-primary/10 text-primary">
                                            <Lock size={20} />
                                        </div>
                                        <Text variant="h5" className="font-bold">Modal verrouillée</Text>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setIsOpen(false)}
                                        className="rounded-full w-8 h-8 p-0"
                                    >
                                        ✕
                                    </Button>
                                </div>
                                <div className="mt-4 p-4 bg-muted/10 rounded-lg border border-border/50">
                                    <Text color="muted" className="text-sm">
                                        Le défilement est verrouillé tant que la modal est ouverte.
                                    </Text>
                                    <div className="mt-2 flex items-center gap-2">
                                        <Badge variant="danger" dot size="sm">
                                            Verrouillé
                                        </Badge>
                                        <Text variant="caption" color="muted">
                                            Essayez de défiler la page
                                        </Text>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end gap-3">
                                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                                        Annuler
                                    </Button>
                                    <Button variant="primary" onClick={() => setIsOpen(false)}>
                                        Fermer
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </ScrollLock>
                )}

                <div className="space-y-3 mt-4">
                    <Text variant="h6" className="font-bold">Contenu de démonstration</Text>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Card key={i} variant="default" radius="sm" shadow="sm" border className="p-4">
                            <Text className="font-medium">Élément {i + 1}</Text>
                            <Text variant="small" color="muted">
                                Ce contenu est en arrière-plan.
                            </Text>
                        </Card>
                    ))}
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Verrouillage de défilement dans une modal.',
            },
        },
    },
};

export const AllColors: Story = {
    render: () => {
        const colors: Array<'primary' | 'secondary' | 'success' | 'warning' | 'danger'> = [
            'primary', 'secondary', 'success', 'warning', 'danger'
        ];

        return (
            <div className="space-y-8 w-full max-w-2xl">
                {colors.map((color) => (
                    <div key={color}>
                        <Text variant="h6" className="font-bold mb-3 capitalize">{color}</Text>
                        <ScrollLockDemo
                            showIndicator={true}
                            indicatorText={`🔒 Défilement verrouillé (${color})`}
                            indicatorColor={color}
                        />
                    </div>
                ))}
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Toutes les couleurs disponibles pour l\'indicateur.',
            },
        },
    },
};

export const InteractivePlayground: Story = {
    render: (args) => <ScrollLockDemo {...args} />,
    args: {
        showIndicator: true,
        indicatorText: '🔒 Défilement verrouillé',
        indicatorColor: 'primary',
        preserveScrollPosition: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Playground interactif pour tester toutes les options.',
            },
        },
    },
};

// Helper pour clsx
function clsx(...args: any[]) {
    return args.filter(Boolean).join(' ');
}