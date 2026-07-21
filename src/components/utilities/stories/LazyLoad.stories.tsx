// src/components/utilities/stories/LazyLoad.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { LazyLoad } from '../LazyLoad';
import { useState, useEffect } from 'react';
import { Card } from '../../overlay/Card';
import { Text } from '../../typography/Text';
import { Badge } from '../../feedback/Badge';
import { Avatar } from '../../media/Avatar';
import { Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';

const meta: Meta<typeof LazyLoad> = {
    title: 'Utilities/LazyLoad',
    component: LazyLoad,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un composant pour charger du contenu de manière paresseuse.',
            },
        },
    },
    argTypes: {
        offset: {
            control: 'number',
            description: 'Marge de déclenchement en pixels',
        },
        once: {
            control: 'boolean',
            description: 'Charger une seule fois',
        },
        variant: {
            control: 'select',
            options: ['default', 'card', 'minimal', 'skeleton', 'blur'],
            description: 'Style du placeholder',
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'destructive', 'success', 'warning'],
            description: 'Couleur d\'accentuation',
        },
        showSpinner: {
            control: 'boolean',
            description: 'Afficher le spinner',
        },
        spinnerSize: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Taille du spinner',
        },
        placeholderText: {
            control: 'text',
            description: 'Texte du placeholder',
        },
        minHeight: {
            control: 'text',
            description: 'Hauteur minimale du conteneur',
        },
    },
};

export default meta;
type Story = StoryObj<typeof LazyLoad>;

// ============ COMPOSANTS SIMPLIFIÉS ============

// Version simplifiée qui fonctionne sans erreur
const SimpleHeavyImage = ({ src, alt }: { src: string; alt: string }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Simuler un chargement
        const timer = setTimeout(() => setLoaded(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    if (!loaded) {
        return (
            <div className="w-full h-[300px] bg-muted/20 rounded-md flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                    <Text variant="small" color="muted">Chargement de l'image...</Text>
                </div>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className="w-full h-auto rounded-md object-cover"
        />
    );
};

// ============ STORIES ============

export const Default: Story = {
    render: () => (
        <div className="space-y-8 w-full max-w-2xl">
            <Text variant="h5" className="font-bold">📸 Images chargées paresseusement</Text>
            <Text color="muted">Les images ne se chargent que lorsqu'elles entrent dans le viewport.</Text>

            {Array.from({ length: 4 }).map((_, i) => (
                <LazyLoad
                    key={i}
                    offset={100}
                    once
                    variant="default"
                    color="primary"
                    placeholderText={`Image ${i + 1} en chargement...`}
                    minHeight="300px"
                >
                    <Card variant="default" radius="lg" shadow="sm" className="overflow-hidden">
                        <SimpleHeavyImage
                            src={`https://picsum.photos/seed/${i + 1}/800/400`}
                            alt={`Image ${i + 1}`}
                        />
                        <div className="p-4">
                            <Text variant="h6" className="font-bold">Image {i + 1}</Text>
                            <Text color="muted">Chargée paresseusement</Text>
                        </div>
                    </Card>
                </LazyLoad>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Images chargées paresseusement avec placeholder.',
            },
        },
    },
};

export const WithSkeleton: Story = {
    render: () => (
        <div className="space-y-8 w-full max-w-2xl">
            <Text variant="h5" className="font-bold">💀 Skeleton loading</Text>
            <Text color="muted">Affichage d'un squelette de chargement avant le contenu.</Text>

            {Array.from({ length: 3 }).map((_, i) => (
                <LazyLoad
                    key={i}
                    offset={100}
                    once
                    variant="skeleton"
                    color="primary"
                    minHeight="200px"
                >
                    <Card variant="default" radius="lg" shadow="sm" className="p-6">
                        <div className="flex items-center gap-4">
                            <Avatar
                                src={`https://i.pravatar.cc/100?img=${i + 1}`}
                                name={`Utilisateur ${i + 1}`}
                                size="lg"
                                shape="rounded"
                            />
                            <div className="flex-1">
                                <Text variant="h6" className="font-bold">Utilisateur {i + 1}</Text>
                                <Text color="muted">Membre depuis 2024</Text>
                                <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="success">Actif</Badge>
                                    <Badge variant="outline">Premium</Badge>
                                </div>
                            </div>
                        </div>
                    </Card>
                </LazyLoad>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Chargement avec squelette pour une meilleure UX.',
            },
        },
    },
};

export const WithBlurEffect: Story = {
    render: () => (
        <div className="space-y-8 w-full max-w-2xl">
            <Text variant="h5" className="font-bold">🌫️ Effet blur</Text>
            <Text color="muted">Placeholder avec effet de flou avant le chargement.</Text>

            {Array.from({ length: 3 }).map((_, i) => (
                <LazyLoad
                    key={i}
                    offset={100}
                    once
                    variant="blur"
                    color="primary"
                    placeholderText={`Contenu ${i + 1} en chargement...`}
                    minHeight="200px"
                >
                    <Card variant="default" radius="lg" shadow="sm" className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                <ImageIcon size={24} className="text-primary" />
                            </div>
                            <div className="flex-1">
                                <Text variant="h6" className="font-bold">Contenu {i + 1}</Text>
                                <Text color="muted">Chargé avec effet de flou</Text>
                            </div>
                            <Badge variant="primary">Blur</Badge>
                        </div>
                    </Card>
                </LazyLoad>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Placeholder avec effet de flou pour un rendu élégant.',
            },
        },
    },
};

export const CardStyle: Story = {
    render: () => (
        <div className="space-y-8 w-full max-w-2xl">
            <Text variant="h5" className="font-bold">🃏 Style carte</Text>
            <Text color="muted">Placeholder avec style carte pour un rendu plus abouti.</Text>

            {Array.from({ length: 3 }).map((_, i) => (
                <LazyLoad
                    key={i}
                    offset={100}
                    once
                    variant="card"
                    color="primary"
                    placeholderText={`Carte ${i + 1} en chargement...`}
                    minHeight="200px"
                >
                    <Card variant="elevated" radius="lg" shadow="md" className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center text-success">
                                <CheckCircle size={32} />
                            </div>
                            <div className="flex-1">
                                <Text variant="h6" className="font-bold">Carte {i + 1}</Text>
                                <Text color="muted">Contenu chargé avec style carte</Text>
                                <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="success">Chargé</Badge>
                                    <Badge variant="outline">Style carte</Badge>
                                </div>
                            </div>
                        </div>
                    </Card>
                </LazyLoad>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Placeholder avec style carte pour un rendu plus abouti.',
            },
        },
    },
};

export const MinimalStyle: Story = {
    render: () => (
        <div className="space-y-8 w-full max-w-2xl">
            <Text variant="h5" className="font-bold">✨ Style minimal</Text>
            <Text color="muted">Placeholder minimaliste sans décorations.</Text>

            {Array.from({ length: 4 }).map((_, i) => (
                <LazyLoad
                    key={i}
                    offset={100}
                    once
                    variant="minimal"
                    color="primary"
                    placeholderText={`Élément ${i + 1}...`}
                    minHeight="100px"
                >
                    <Card variant="ghost" radius="md" border={false} className="p-4 border-l-4 border-l-primary">
                        <Text variant="h6" className="font-bold">Élément {i + 1}</Text>
                        <Text color="muted">Chargé en style minimal</Text>
                    </Card>
                </LazyLoad>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Placeholder minimaliste pour un rendu épuré.',
            },
        },
    },
};

export const CustomPlaceholder: Story = {
    render: () => (
        <div className="space-y-8 w-full max-w-2xl">
            <Text variant="h5" className="font-bold">🎨 Placeholder personnalisé</Text>
            <Text color="muted">Placeholder entièrement personnalisable avec des composants.</Text>

            <LazyLoad
                offset={100}
                once
                variant="default"
                minHeight="200px"
                placeholder={
                    <Card variant="default" radius="lg" shadow="sm" className="p-8 text-center">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                                <ImageIcon size={24} className="text-primary" />
                            </div>
                            <Text variant="h6" className="font-bold text-primary">⏳ En attente...</Text>
                            <Text color="muted" className="text-sm">
                                Le contenu se chargera lorsque vous défilerez jusqu'à cette section.
                            </Text>
                            <div className="flex gap-2 mt-2">
                                <Badge variant="primary">Personnalisé</Badge>
                                <Badge variant="outline">Attente</Badge>
                            </div>
                        </div>
                    </Card>
                }
            >
                <Card variant="elevated" radius="lg" shadow="md" className="p-8 text-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                            <CheckCircle size={24} className="text-success" />
                        </div>
                        <Text variant="h5" className="font-bold text-success">✅ Contenu chargé !</Text>
                        <Text color="muted">Le contenu personnalisé est maintenant visible.</Text>
                        <div className="flex gap-2 mt-2">
                            <Badge variant="success">Chargé</Badge>
                            <Badge variant="primary">Personnalisé</Badge>
                        </div>
                    </div>
                </Card>
            </LazyLoad>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Placeholder entièrement personnalisé.',
            },
        },
    },
};

export const WithoutSpinner: Story = {
    render: () => (
        <div className="space-y-8 w-full max-w-2xl">
            <Text variant="h5" className="font-bold">🚫 Sans spinner</Text>
            <Text color="muted">Chargement sans spinner, uniquement le texte.</Text>

            {Array.from({ length: 3 }).map((_, i) => (
                <LazyLoad
                    key={i}
                    offset={100}
                    once
                    variant="default"
                    showSpinner={false}
                    placeholderText={`Chargement ${i + 1}...`}
                    minHeight="100px"
                >
                    <Card variant="default" radius="lg" shadow="sm" className="p-6">
                        <Text variant="h6" className="font-bold">Contenu {i + 1}</Text>
                        <Text color="muted">Chargé sans spinner</Text>
                    </Card>
                </LazyLoad>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Chargement sans spinner pour un rendu minimal.',
            },
        },
    },
};

export const AllVariants: Story = {
    render: () => {
        const variants: Array<{ variant: 'default' | 'card' | 'minimal' | 'skeleton' | 'blur'; label: string }> = [
            { variant: 'default', label: 'Default' },
            { variant: 'card', label: 'Card' },
            { variant: 'minimal', label: 'Minimal' },
            { variant: 'skeleton', label: 'Skeleton' },
            { variant: 'blur', label: 'Blur' },
        ];

        return (
            <div className="space-y-8 w-full max-w-2xl">
                <Text variant="h5" className="font-bold">🎨 Toutes les variantes</Text>
                <Text color="muted">Comparaison de toutes les variantes de placeholder.</Text>

                {variants.map(({ variant, label }) => (
                    <div key={variant}>
                        <Text variant="h6" className="font-bold mb-2 capitalize">{label}</Text>
                        <LazyLoad
                            offset={100}
                            once
                            variant={variant}
                            color="primary"
                            placeholderText={`Chargement ${label}...`}
                            minHeight="150px"
                        >
                            <Card variant="default" radius="lg" shadow="sm" className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        ✓
                                    </div>
                                    <div className="flex-1">
                                        <Text variant="h6" className="font-bold">Contenu {label}</Text>
                                        <Text color="muted">Chargé avec variante {label}</Text>
                                    </div>
                                    <Badge variant="primary">{label}</Badge>
                                </div>
                            </Card>
                        </LazyLoad>
                    </div>
                ))}
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Toutes les variantes de placeholder disponibles.',
            },
        },
    },
};

export const AllColors: Story = {
    render: () => {
        const colors: Array<'primary' | 'secondary' | 'success' | 'warning' | 'destructive'> = [
            'primary', 'secondary', 'success', 'warning', 'destructive'
        ];

        return (
            <div className="space-y-8 w-full max-w-2xl">
                <Text variant="h5" className="font-bold">🎨 Toutes les couleurs</Text>
                <Text color="muted">Différentes couleurs d'accentuation pour le placeholder.</Text>

                {colors.map((color) => (
                    <div key={color}>
                        <Text variant="h6" className="font-bold mb-2 capitalize">{color}</Text>
                        <LazyLoad
                            offset={100}
                            once
                            variant="default"
                            color={color}
                            placeholderText={`Chargement ${color}...`}
                            minHeight="100px"
                        >
                            <Card variant="default" radius="lg" shadow="sm" className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <Text variant="h6" className="font-bold">Couleur {color}</Text>
                                        <Text color="muted">Contenu avec couleur {color}</Text>
                                    </div>
                                    <Badge variant={color}>{color}</Badge>
                                </div>
                            </Card>
                        </LazyLoad>
                    </div>
                ))}
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Toutes les couleurs d\'accentuation disponibles.',
            },
        },
    },
};

export const WithError: Story = {
    render: () => (
        <div className="space-y-8 w-full max-w-2xl">
            <Text variant="h5" className="font-bold">❌ Gestion d'erreur</Text>
            <Text color="muted">Affichage d'un message d'erreur si le chargement échoue.</Text>

            <LazyLoad
                offset={100}
                once
                variant="default"
                color="destructive"
                placeholderText="Tentative de chargement..."
                minHeight="200px"
            >
                <Card variant="default" radius="lg" shadow="sm" className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
                            <AlertCircle size={24} />
                        </div>
                        <div className="flex-1">
                            <Text variant="h6" className="font-bold text-destructive">Erreur de chargement</Text>
                            <Text color="muted">Une erreur est survenue lors du chargement du contenu.</Text>
                        </div>
                    </div>
                </Card>
            </LazyLoad>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Gestion des erreurs de chargement.',
            },
        },
    },
};

export const InteractivePlayground: Story = {
    args: {
        offset: 100,
        once: true,
        variant: 'default',
        color: 'primary',
        showSpinner: true,
        spinnerSize: 'md',
        placeholderText: 'Chargement...',
        minHeight: '200px',
    },
    render: (args) => (
        <div className="space-y-8 w-full max-w-2xl">
            <div className="flex flex-wrap gap-3">
                <Badge variant="primary">Once: {args.once ? '✅' : '⛔'}</Badge>
                <Badge variant="outline">Offset: {args.offset}px</Badge>
                <Badge variant="outline">Variant: {args.variant}</Badge>
                <Badge variant="outline">Spinner: {args.showSpinner ? '✅' : '⛔'}</Badge>
            </div>

            <LazyLoad {...args}>
                <Card variant="elevated" radius="lg" shadow="md" className="p-8 text-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                            <CheckCircle size={24} className="text-success" />
                        </div>
                        <Text variant="h5" className="font-bold text-success">✅ Contenu chargé !</Text>
                        <Text color="muted">
                            Testez les options dans le panneau de contrôle.
                        </Text>
                        <div className="flex gap-2 mt-2">
                            <Badge variant="success">Chargé</Badge>
                            <Badge variant="outline">Playground</Badge>
                        </div>
                    </div>
                </Card>
            </LazyLoad>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Playground interactif pour tester toutes les options.',
            },
        },
    },
};