// src/components/utilities/stories/Portal.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Portal } from '../Portal';
import { useState, useEffect } from 'react';
import { Card } from '../../overlay/Card';
import { Text } from '../../typography/Text';
import { Button } from '../../forms/Button';
import { Badge } from '../../feedback/Badge';
import { X, AlertCircle, Bell, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { Toast, ToastType } from '../../feedback';

const meta: Meta<typeof Portal> = {
    title: 'Utilities/Portal',
    component: Portal,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un composant pour rendre du contenu dans un conteneur DOM différent.',
            },
        },
    },
    argTypes: {
        disabled: {
            control: 'boolean',
            description: 'Désactiver le portail',
        },
        zIndex: {
            control: 'number',
            description: 'Index z du conteneur',
        },
        container: {
            control: 'text',
            description: 'Sélecteur CSS ou élément DOM',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Portal>;

// ============ COMPOSANTS DE DÉMONSTRATION ============

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    variant = 'default'
}: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    variant?: 'default' | 'destructive' | 'success' | 'warning';
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const variantStyles = {
        default: 'border-primary/20',
        destructive: 'border-destructive/20',
        success: 'border-success/20',
        warning: 'border-warning/20',
    };

    const variantIcons = {
        default: <Info size={24} className="text-primary" />,
        destructive: <AlertCircle size={24} className="text-destructive" />,
        success: <CheckCircle size={24} className="text-success" />,
        warning: <AlertTriangle size={24} className="text-warning" />,
    };

    const variantTitleColors = {
        default: 'text-primary',
        destructive: 'text-destructive',
        success: 'text-success',
        warning: 'text-warning',
    };

    return (
        <Portal zIndex={1000}>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                <Card
                    variant="elevated"
                    radius="lg"
                    shadow="2xl"
                    className={clsx(
                        'max-w-md w-full p-0 overflow-hidden animate-in zoom-in duration-200',
                        'border-2',
                        variantStyles[variant]
                    )}
                >
                    <div className={clsx(
                        'flex items-center justify-between px-6 py-4 border-b',
                        variantStyles[variant]
                    )}>
                        <div className="flex items-center gap-3">
                            <span className={variantTitleColors[variant]}>
                                {variantIcons[variant]}
                            </span>
                            <Text variant="h5" className={clsx('font-bold', variantTitleColors[variant])}>
                                {title}
                            </Text>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-full hover:bg-muted/10 transition-colors text-muted-foreground hover:text-foreground"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <div className="p-6">
                        {children}
                    </div>
                </Card>
            </div>
        </Portal>
    );
};

function clsx(...args: any[]) {
    return args.filter(Boolean).join(' ');
}

// ============ STORIES ============

export const Default: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div className="space-y-6 w-full max-w-2xl text-center p-8">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Bell size={32} />
                    </div>
                    <Text variant="h4" className="font-bold">🚪 Portail de base</Text>
                    <Text color="muted" className="max-w-md">
                        Le contenu est rendu dans le body (hors du flux DOM normal).
                        Utilisez le bouton ci-dessous pour ouvrir une modal via portail.
                    </Text>
                </div>

                <Button variant="primary" size="lg" onClick={() => setIsOpen(true)}>
                    Ouvrir le portail
                </Button>

                <div className="mt-4 p-4 bg-muted/10 rounded-md border border-border/50">
                    <Text variant="small" color="muted">
                        💡 Le contenu de la modal est rendu dans le body, pas dans ce conteneur.
                    </Text>
                </div>

                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Portail">
                    <div className="space-y-4">
                        <Text>Ce contenu est rendu via un portail directement dans le body.</Text>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="primary">Portail</Badge>
                            <Badge variant="success">React</Badge>
                            <Badge variant="warning">createPortal</Badge>
                        </div>
                        <div className="p-3 bg-primary/5 rounded-md border border-primary/10">
                            <Text variant="small" className="font-mono text-primary">
                                📍 Rendu dans: document.body
                            </Text>
                        </div>
                        <Button
                            variant="primary"
                            className="w-full"
                            onClick={() => setIsOpen(false)}
                        >
                            Fermer
                        </Button>
                    </div>
                </Modal>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Portail de base avec modal.',
            },
        },
    },
};

export const MultiplePortals: Story = {
    render: () => {
        const [modals, setModals] = useState<number[]>([]);

        const addModal = () => {
            setModals([...modals, Date.now()]);
        };

        const removeModal = (id: number) => {
            setModals(modals.filter(m => m !== id));
        };

        const variants = ['default', 'success', 'warning', 'destructive'] as const;

        return (
            <div className="space-y-6 w-full max-w-2xl text-center p-8">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <AlertCircle size={32} />
                    </div>
                    <Text variant="h4" className="font-bold">📚 Portails multiples</Text>
                    <Text color="muted" className="max-w-md">
                        Plusieurs portails peuvent être ouverts simultanément.
                        Chaque modal est indépendante.
                    </Text>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Button variant="primary" onClick={addModal}>
                        Ouvrir un portail
                    </Button>
                    <Badge variant="outline" className="text-sm px-4 py-1.5">
                        {modals.length} portails ouverts
                    </Badge>
                </div>

                {modals.map((id, index) => (
                    <Modal
                        key={id}
                        isOpen={true}
                        onClose={() => removeModal(id)}
                        title={`Portail ${index + 1}`}
                        variant={variants[index % variants.length]}
                    >
                        <div className="space-y-3">
                            <Text>Portail numéro {index + 1}</Text>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="primary">ID: {id.toString().slice(-4)}</Badge>
                                <Badge variant="outline">Empilé</Badge>
                                <Badge variant="outline">
                                    {variants[index % variants.length]}
                                </Badge>
                            </div>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => removeModal(id)}
                            >
                                Fermer ce portail
                            </Button>
                        </div>
                    </Modal>
                ))}
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Multiple portails empilés.',
            },
        },
    },
};

export const ToastNotification: Story = {
    render: () => {
        const [toasts, setToasts] = useState<{ id: number; message: string; type: ToastType }[]>([]);

        const addToast = (message: string, type: ToastType = 'info') => {
            const id = Date.now();
            setToasts([...toasts, { id, message, type }]);
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, 3500);
        };

        return (
            <div className="space-y-6 w-full max-w-2xl p-8">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Bell size={32} />
                    </div>
                    <Text variant="h4" className="font-bold">🔔 Toast notifications</Text>
                    <Text color="muted" className="max-w-md">
                        Les toasts sont rendus via un portail pour être au-dessus de tout.
                    </Text>
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                    <Button variant="success" onClick={() => addToast('✅ Action réussie !', 'success')}>
                        Succès
                    </Button>
                    <Button variant="destructive" onClick={() => addToast('❌ Une erreur est survenue', 'destructive')}>
                        Erreur
                    </Button>
                    <Button variant="primary" onClick={() => addToast('ℹ️ Information importante', 'info')}>
                        Info
                    </Button>
                    <Button variant="warning" onClick={() => addToast('⚠️ Attention nécessaire', 'warning')}>
                        Avertissement
                    </Button>
                </div>

                <Portal zIndex={2000}>
                    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
                        {toasts.map((toast) => (
                            <Toast
                                key={toast.id}
                                message={toast.message}
                                type={toast.type}
                                duration={3500}
                                position="top-right"
                                dismissible
                            />
                        ))}
                    </div>
                </Portal>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Notifications toast via portail.',
            },
        },
    },
};

export const InteractivePlayground: Story = {
    args: {
        disabled: false,
        zIndex: 1000,
    },
    render: (args) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div className="space-y-6 w-full max-w-2xl text-center p-8">
                <div className="flex flex-wrap gap-3 justify-center">
                    <Badge variant="primary">Disabled: {args.disabled ? '✅' : '⛔'}</Badge>
                    <Badge variant="outline">Z-index: {args.zIndex}</Badge>
                </div>

                <Button variant="primary" size="lg" onClick={() => setIsOpen(true)}>
                    Ouvrir le portail
                </Button>

                <Portal {...args} disabled={!isOpen}>
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                        <Card variant="elevated" radius="lg" shadow="2xl" className="max-w-md w-full p-0 overflow-hidden animate-in zoom-in duration-200">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                                <Text variant="h5" className="font-bold">Playground</Text>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 rounded-full hover:bg-muted/10 transition-colors text-muted-foreground hover:text-foreground"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="p-6 space-y-4">
                                <Text color="muted">
                                    Testez les options dans le panneau de contrôle.
                                </Text>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="primary">Portail</Badge>
                                    <Badge variant="success">Interactif</Badge>
                                    <Badge variant="outline">Playground</Badge>
                                </div>
                                <div className="p-3 bg-muted/10 rounded-md border border-border/50">
                                    <Text variant="small" className="font-mono">
                                        disabled: {String(args.disabled)} • zIndex: {args.zIndex}
                                    </Text>
                                </div>
                                <Button
                                    variant="primary"
                                    className="w-full"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Fermer
                                </Button>
                            </div>
                        </Card>
                    </div>
                </Portal>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Playground interactif pour tester toutes les options.',
            },
        },
    },
};