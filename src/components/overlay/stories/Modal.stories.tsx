// src/components/overlay/stories/Modal.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '../Modal';
import { useState } from 'react';
import { Button } from '../../forms/Button';
import { Text } from '../../typography/Text';
import { Input } from '../../forms/Input';
import { Badge } from '../../feedback/Badge';
import { Size } from '../../../types';

const meta: Meta<typeof Modal> = {
    title: 'Overlay/Modal',
    component: Modal,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Une modal pour afficher du contenu en superposition.',
            },
        },
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'],
            description: 'Taille de la modal',
        },
        closeOnBackdrop: {
            control: 'boolean',
            description: 'Fermer en cliquant sur le fond',
        },
        scrollable: {
            control: 'boolean',
            description: 'Contenu scrollable',
        },
        showCloseButton: {
            control: 'boolean',
            description: 'Afficher le bouton de fermeture',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Template avec état
const ModalWithState = ({
    children,
    ...props
}: React.PropsWithChildren<Partial<React.ComponentProps<typeof Modal>>>) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full min-h-[300px] flex items-center justify-center">
            <Button variant="primary" onClick={() => setOpen(true)}>
                Ouvrir la modal
            </Button>
            <Modal {...props} open={open} onClose={() => setOpen(false)}>
                {children}
            </Modal>
        </div>
    );
};

// ============ MODAL STANDARD ============

export const Default: Story = {
    render: (args) => (
        <ModalWithState {...args}>
            <Text>Ceci est une modal standard avec du contenu simple.</Text>
            <div className="mt-4 p-4 bg-muted/10 rounded-lg">
                <Text className="text-sm text-muted-foreground">
                    Vous pouvez y mettre n&apos;importe quel contenu.
                </Text>
            </div>
        </ModalWithState>
    ),
    args: {
        title: 'Modal standard',
        size: 'md',
        showCloseButton: true,
        closeOnBackdrop: true,
    },
};

// ============ AVEC FORMULAIRE ============

export const WithForm: Story = {
    render: (args) => (
        <ModalWithState {...args}>
            <div className="space-y-4">
                <Text>Formulaire de contact</Text>
                <Input label="Nom complet" placeholder="Jean Dupont" />
                <Input label="Email" type="email" placeholder="jean@email.com" />
                <Input label="Message" placeholder="Votre message..." />
                <div className="flex gap-3 pt-2">
                    <Button variant="primary">Envoyer</Button>
                    <Button variant="outline">Annuler</Button>
                </div>
            </div>
        </ModalWithState>
    ),
    args: {
        title: 'Formulaire',
        size: 'md',
        showCloseButton: true,
        closeOnBackdrop: true,
    },
};

// ============ AVEC FOOTER ============

export const WithFooter: Story = {
    render: (args) => (
        <ModalWithState {...args}>
            <Text>Cette modal a un footer avec des actions.</Text>
            <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="primary">Action 1</Badge>
                <Badge variant="success">Action 2</Badge>
                <Badge variant="warning">Action 3</Badge>
            </div>
        </ModalWithState>
    ),
    args: {
        title: 'Modal avec footer',
        size: 'md',
        showCloseButton: true,
        closeOnBackdrop: true,
        footer: (
            <>
                <Button variant="ghost">Annuler</Button>
                <Button variant="primary">Confirmer</Button>
            </>
        ),
    },
};

// ============ SCROLLABLE ============

export const Scrollable: Story = {
    render: (args) => (
        <ModalWithState {...args}>
            <div className="space-y-4">
                <Text>Contenu scrollable avec beaucoup d&apos;éléments.</Text>
                {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="p-3 bg-muted/10 rounded-lg">
                        <Text className="text-sm">Élément {i + 1}</Text>
                    </div>
                ))}
            </div>
        </ModalWithState>
    ),
    args: {
        title: 'Contenu scrollable',
        size: 'md',
        scrollable: true,
        showCloseButton: true,
        closeOnBackdrop: true,
    },
};

// ============ GRANDE TAILLE ============

export const Large: Story = {
    render: (args) => (
        <ModalWithState {...args}>
            <Text>Modal en grande taille avec plus de contenu.</Text>
            <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-4 bg-primary/10 rounded-lg text-center text-foreground">
                    Card 1
                </div>
                <div className="p-4 bg-primary/10 rounded-lg text-center text-foreground">
                    Card 2
                </div>
                <div className="p-4 bg-primary/10 rounded-lg text-center text-foreground">
                    Card 3
                </div>
                <div className="p-4 bg-primary/10 rounded-lg text-center text-foreground">
                    Card 4
                </div>
            </div>
        </ModalWithState>
    ),
    args: {
        title: 'Grande modal',
        size: 'xl',
        showCloseButton: true,
        closeOnBackdrop: true,
    },
};

// ============ PLEINE TAILLE ============

export const Full: Story = {
    render: (args) => (
        <ModalWithState {...args}>
            <Text>Modal en pleine largeur.</Text>
            <div className="mt-4 grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="p-4 bg-primary/10 rounded-lg text-center text-foreground">
                        Card {i}
                    </div>
                ))}
            </div>
        </ModalWithState>
    ),
    args: {
        title: 'Pleine largeur',
        size: 'full',
        showCloseButton: true,
        closeOnBackdrop: true,
    },
};

// ============ SANS BOUTON DE FERMETURE ============

export const WithoutCloseButton: Story = {
    render: (args) => (
        <ModalWithState {...args}>
            <Text>Cette modal n&apos;a pas de bouton de fermeture.</Text>
            <div className="mt-4 p-4 bg-muted/10 rounded-lg">
                <Text className="text-sm text-muted-foreground">
                    Utilisez le footer pour fermer ou le fond.
                </Text>
            </div>
        </ModalWithState>
    ),
    args: {
        title: 'Sans bouton fermeture',
        size: 'md',
        showCloseButton: false,
        closeOnBackdrop: true,
        footer: (
            <Button variant="primary" onClick={() => { }}>Fermer</Button>
        ),
    },
};

// ============ SANS FERMETURE SUR LE FOND ============

export const NoBackdropClose: Story = {
    render: (args) => (
        <ModalWithState {...args}>
            <Text>Cette modal ne se ferme pas en cliquant sur le fond.</Text>
            <div className="mt-4 p-4 bg-muted/10 rounded-lg">
                <Text className="text-sm text-muted-foreground">
                    Utilisez le bouton de fermeture ou le footer.
                </Text>
            </div>
        </ModalWithState>
    ),
    args: {
        title: 'Fermeture sur fond désactivée',
        size: 'md',
        showCloseButton: true,
        closeOnBackdrop: false,
        footer: (
            <Button variant="primary" onClick={() => { }}>Fermer</Button>
        ),
    },
};

// ============ AVEC CONTENU RICHE ============

export const RichContent: Story = {
    render: (args) => (
        <ModalWithState {...args}>
            <div className="space-y-4">
                <Text>Cette modal contient du contenu riche.</Text>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="primary">Design</Badge>
                    <Badge variant="success">UI</Badge>
                    <Badge variant="warning">UX</Badge>
                    <Badge variant="error">Beta</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-primary/5 rounded-lg border border-primary/10 text-center">
                        <Text variant="h4" className="font-bold text-primary">85%</Text>
                        <Text variant="small" color="muted">Satisfaction</Text>
                    </div>
                    <div className="p-3 bg-success/5 rounded-lg border border-success/10 text-center">
                        <Text variant="h4" className="font-bold text-success">1.2k</Text>
                        <Text variant="small" color="muted">Utilisateurs</Text>
                    </div>
                </div>
                <Button variant="primary" className="w-full">Action principale</Button>
            </div>
        </ModalWithState>
    ),
    args: {
        title: 'Contenu riche',
        size: 'lg',
        showCloseButton: true,
        closeOnBackdrop: true,
    },
};

// ============ COMPARAISON DES TAILLES ============

export const AllSizes: Story = {
    render: () => {
        const [openSize, setOpenSize] = useState<Size | null>(null);

        const sizes: Size[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'];

        return (
            <div className="space-y-4 max-w-2xl w-full">
                <div className="flex flex-wrap gap-2 justify-center">
                    {sizes.map((size) => (
                        <Button
                            key={size}
                            variant="primary"
                            size="sm"
                            onClick={() => setOpenSize(size)}
                        >
                            {size}
                        </Button>
                    ))}
                </div>

                {sizes.map((size) => (
                    <Modal
                        key={size}
                        title={`Modal ${size}`}
                        open={openSize === size}
                        onClose={() => setOpenSize(null)}
                        size={size}
                        showCloseButton
                        closeOnBackdrop
                    >
                        <Text>Cette modal est en taille <strong>{size}</strong>.</Text>
                        <div className="mt-4 p-3 bg-muted/10 rounded-lg">
                            <Text variant="small" color="muted">
                                Contenu de la modal en taille {size}.
                            </Text>
                        </div>
                    </Modal>
                ))}
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Toutes les tailles de modal disponibles.',
            },
        },
    },
};

// ============ INTERACTIF ============

export const InteractivePlayground: Story = {
    render: (args) => (
        <ModalWithState {...args}>
            <Text>Testez les options dans le panneau de contrôle.</Text>
            <div className="mt-4 p-3 bg-muted/10 rounded-lg">
                <Text variant="small" className="font-mono">
                    Size: {args.size} • Scrollable: {String(args.scrollable)}
                </Text>
            </div>
            <div className="mt-4 flex gap-2">
                <Badge variant="primary">Interactif</Badge>
                <Badge variant="success">Personnalisable</Badge>
            </div>
        </ModalWithState>
    ),
    args: {
        title: 'Playground',
        size: 'md',
        showCloseButton: true,
        closeOnBackdrop: true,
        scrollable: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'Playground interactif pour tester toutes les options.',
            },
        },
    },
};