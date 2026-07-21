// src/components/data/stories/Carousel.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from '../Carousel';
import { Card } from '../../overlay/Card';
import { Text } from '../../typography/Text';
import { Badge } from '../../feedback/Badge';
import { Button } from '../../forms/Button';
import { Avatar } from '../../media/Avatar';
import { Star, Users, Clock, ArrowRight, Heart, Calendar, MapPin } from 'lucide-react';

const meta: Meta<typeof Carousel> = {
    title: 'Data/Carousel',
    component: Carousel,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un carousel pour afficher des diapositives avec navigation et autoplay.',
            },
        },
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'bordered', 'elevated', 'ghost'],
            description: 'Style visuel du carousel',
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'destructive', 'success', 'warning'],
            description: 'Couleur d\'accentuation',
        },
        autoplay: {
            control: 'boolean',
            description: 'Lecture automatique',
        },
        interval: {
            control: 'number',
            description: 'Intervalle en ms',
        },
        loop: {
            control: 'boolean',
            description: 'Lecture en boucle',
        },
        navigation: {
            control: 'boolean',
            description: 'Afficher la navigation',
        },
        indicators: {
            control: 'boolean',
            description: 'Afficher les indicateurs',
        },
        pauseOnHover: {
            control: 'boolean',
            description: 'Mettre en pause au survol',
        },
        enableSwipe: {
            control: 'boolean',
            description: 'Activer le swipe',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

// ============ SLIDES ============

const doctorSlides = [
    {
        id: '1',
        content: (
            <Card variant="default" radius="lg" shadow="sm" className="p-6 h-full">
                <div className="flex gap-6 h-full items-center">
                    <Avatar
                        src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face"
                        name="Dr. Jean Dupont"
                        size="xl"
                        status="online"
                        shape="rounded"
                        className="shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between flex-wrap gap-2">
                            <div>
                                <Text variant="h4" className="font-bold">Dr. Jean Dupont</Text>
                                <Text variant="body" color="muted">Cardiologue</Text>
                            </div>
                            <Badge variant="success" dot>Disponible</Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-3">
                            <div className="flex items-center gap-1">
                                <Star size={14} className="fill-warning text-warning" />
                                <span className="text-sm font-semibold">4.8</span>
                                <span className="text-xs text-muted-foreground">(124 avis)</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Users size={14} className="text-primary" />
                                <span className="text-sm">1 234 patients</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock size={14} className="text-primary" />
                                <span className="text-sm">10 ans</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin size={14} className="text-muted-foreground" />
                                <span className="text-sm">Paris</span>
                            </div>
                        </div>
                        <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                                <Calendar size={14} className="text-primary" />
                                <div>
                                    <Text variant="small" className="font-medium">Prochain créneau</Text>
                                    <Text variant="caption" color="muted">Aujourd'hui • 14:30</Text>
                                </div>
                            </div>
                            <Button variant="primary" size="sm">
                                Réserver
                                <ArrowRight size={14} className="ml-1" />
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    },
    {
        id: '2',
        content: (
            <Card variant="default" radius="lg" shadow="sm" className="p-6 h-full">
                <div className="flex gap-6 h-full items-center">
                    <Avatar
                        src="https://images.unsplash.com/photo-1550525811-e5869dd03032?w=200&h=200&fit=crop&crop=face"
                        name="Dr. Marie Martin"
                        size="xl"
                        status="online"
                        shape="rounded"
                        className="shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between flex-wrap gap-2">
                            <div>
                                <Text variant="h4" className="font-bold">Dr. Marie Martin</Text>
                                <Text variant="body" color="muted">Dermatologue</Text>
                            </div>
                            <Badge variant="warning" dot>Complet</Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-3">
                            <div className="flex items-center gap-1">
                                <Star size={14} className="fill-warning text-warning" />
                                <span className="text-sm font-semibold">4.9</span>
                                <span className="text-xs text-muted-foreground">(89 avis)</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Users size={14} className="text-primary" />
                                <span className="text-sm">856 patients</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock size={14} className="text-primary" />
                                <span className="text-sm">8 ans</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin size={14} className="text-muted-foreground" />
                                <span className="text-sm">Lyon</span>
                            </div>
                        </div>
                        <div className="mt-4 p-3 rounded-lg bg-muted/10 border border-border/50 flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                                <Calendar size={14} className="text-muted-foreground" />
                                <div>
                                    <Text variant="small" className="font-medium">Prochain créneau</Text>
                                    <Text variant="caption" color="muted">Demain • 09:00</Text>
                                </div>
                            </div>
                            <Button variant="outline" size="sm" disabled>
                                Complet
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    },
    {
        id: '3',
        content: (
            <Card variant="default" radius="lg" shadow="sm" className="p-6 h-full">
                <div className="flex gap-6 h-full items-center">
                    <Avatar
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"
                        name="Dr. Pierre Durand"
                        size="xl"
                        status="busy"
                        shape="rounded"
                        className="shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between flex-wrap gap-2">
                            <div>
                                <Text variant="h4" className="font-bold">Dr. Pierre Durand</Text>
                                <Text variant="body" color="muted">Pédiatre</Text>
                            </div>
                            <Badge variant="success" dot>Disponible</Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-3">
                            <div className="flex items-center gap-1">
                                <Star size={14} className="fill-warning text-warning" />
                                <span className="text-sm font-semibold">4.7</span>
                                <span className="text-xs text-muted-foreground">(156 avis)</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Users size={14} className="text-primary" />
                                <span className="text-sm">2 100 patients</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock size={14} className="text-primary" />
                                <span className="text-sm">15 ans</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin size={14} className="text-muted-foreground" />
                                <span className="text-sm">Marseille</span>
                            </div>
                        </div>
                        <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                                <Calendar size={14} className="text-primary" />
                                <div>
                                    <Text variant="small" className="font-medium">Prochain créneau</Text>
                                    <Text variant="caption" color="muted">Mercredi • 10:30</Text>
                                </div>
                            </div>
                            <Button variant="primary" size="sm">
                                Réserver
                                <ArrowRight size={14} className="ml-1" />
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
];

const productSlides = [
    {
        id: '1',
        content: (
            <div className="relative h-full min-h-[300px]">
                <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=400&fit=crop"
                    alt="Produit"
                    className="w-full h-[300px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="destructive" size="sm">Promo -20%</Badge>
                        <Badge variant="success" size="sm">En stock</Badge>
                    </div>
                    <Text variant="h4" className="font-bold text-foreground mt-2">Montre Connectée Pro</Text>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <Text variant="h3" className="font-bold text-primary">199,99€</Text>
                        <Text variant="body" className="line-through text-muted-foreground">249,99€</Text>
                        <div className="flex items-center gap-1 ml-auto">
                            <Star size={16} className="fill-warning text-warning" />
                            <span className="text-foreground">4.8 (124 avis)</span>
                        </div>
                    </div>
                    <Button variant="primary" size="sm" className="mt-3">
                        Ajouter au panier
                        <Heart size={14} className="ml-1" />
                    </Button>
                </div>
            </div>
        )
    },
    {
        id: '2',
        content: (
            <div className="relative h-full min-h-[300px]">
                <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=400&fit=crop"
                    alt="Produit"
                    className="w-full h-[300px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="destructive" size="sm">Promo -30%</Badge>
                        <Badge variant="success" size="sm">En stock</Badge>
                    </div>
                    <Text variant="h4" className="font-bold text-foreground mt-2">Casque Audio Premium</Text>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <Text variant="h3" className="font-bold text-primary">89,99€</Text>
                        <Text variant="body" className="line-through text-muted-foreground">129,99€</Text>
                        <div className="flex items-center gap-1 ml-auto">
                            <Star size={16} className="fill-warning text-warning" />
                            <span className="text-foreground">4.7 (89 avis)</span>
                        </div>
                    </div>
                    <Button variant="primary" size="sm" className="mt-3">
                        Ajouter au panier
                        <Heart size={14} className="ml-1" />
                    </Button>
                </div>
            </div>
        )
    },
    {
        id: '3',
        content: (
            <div className="relative h-full min-h-[300px]">
                <img
                    src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=400&fit=crop"
                    alt="Produit"
                    className="w-full h-[300px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="info" size="sm">Nouveau</Badge>
                        <Badge variant="success" size="sm">En stock</Badge>
                    </div>
                    <Text variant="h4" className="font-bold text-foreground mt-2">Smartphone Ultra</Text>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <Text variant="h3" className="font-bold text-primary">699,99€</Text>
                        <Text variant="body" className="line-through text-muted-foreground">899,99€</Text>
                        <div className="flex items-center gap-1 ml-auto">
                            <Star size={16} className="fill-warning text-warning" />
                            <span className="text-foreground">4.9 (256 avis)</span>
                        </div>
                    </div>
                    <Button variant="primary" size="sm" className="mt-3">
                        Ajouter au panier
                        <Heart size={14} className="ml-1" />
                    </Button>
                </div>
            </div>
        )
    }
];

// ============ STORIES ============

export const DoctorCarousel: Story = {
    render: () => (
        <div className="w-full max-w-3xl">
            <Carousel
                items={doctorSlides}
                variant="default"
                color="primary"
                autoplay
                interval={5000}
                loop={false}
                navigation
                indicators
                pauseOnHover
                enableSwipe
                className="h-full"
            />
            <Text variant="caption" color="muted" className="mt-2 text-center">
                👆 Glissez sur l'écran pour naviguer
            </Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Carousel de médecins avec autoplay et swipe (loop désactivé).',
            },
        },
    },
};

export const ProductCarousel: Story = {
    render: () => (
        <div className="w-full max-w-3xl">
            <Carousel
                items={productSlides}
                variant="elevated"
                color="primary"
                autoplay
                interval={4000}
                loop={false}
                navigation
                indicators
                pauseOnHover
                enableSwipe
            />
            <Text variant="caption" color="muted" className="mt-2 text-center">
                👆 Glissez sur l'écran pour naviguer
            </Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Carousel de produits avec autoplay et swipe (loop désactivé).',
            },
        },
    },
};

export const WithoutAutoplay: Story = {
    render: () => (
        <div className="w-full max-w-3xl">
            <Carousel
                items={doctorSlides.slice(0, 2)}
                variant="bordered"
                color="primary"
                autoplay={false}
                loop={false}
                navigation
                indicators
                pauseOnHover
                enableSwipe
            />
            <Text variant="caption" color="muted" className="mt-2 text-center">
                ⏸️ Autoplay désactivé - Navigation manuelle uniquement
            </Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Carousel sans autoplay avec swipe.',
            },
        },
    },
};

export const WithoutSwipe: Story = {
    render: () => (
        <div className="w-full max-w-3xl">
            <Carousel
                items={doctorSlides.slice(0, 2)}
                variant="default"
                color="primary"
                autoplay
                interval={5000}
                loop={false}
                navigation
                indicators
                pauseOnHover
                enableSwipe={false}
            />
            <Text variant="caption" color="muted" className="mt-2 text-center">
                🚫 Swipe désactivé
            </Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Carousel sans swipe.',
            },
        },
    },
};

export const GhostVariant: Story = {
    render: () => (
        <div className="w-full max-w-3xl">
            <Carousel
                items={doctorSlides.slice(0, 2)}
                variant="ghost"
                color="primary"
                autoplay
                interval={5000}
                loop={false}
                navigation
                indicators
                enableSwipe
            />
            <Text variant="caption" color="muted" className="mt-2 text-center">
                👻 Variante ghost sans fond
            </Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Carousel avec variante ghost et swipe.',
            },
        },
    },
};

export const DangerColor: Story = {
    render: () => (
        <div className="w-full max-w-3xl">
            <Carousel
                items={productSlides}
                variant="default"
                color="destructive"
                autoplay
                interval={4000}
                loop={false}
                navigation
                indicators
                enableSwipe
            />
            <Text variant="caption" color="muted" className="mt-2 text-center">
                🔴 Couleur destructive
            </Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Carousel avec couleur destructive pour les indicateurs.',
            },
        },
    },
};

export const SuccessColor: Story = {
    render: () => (
        <div className="w-full max-w-3xl">
            <Carousel
                items={doctorSlides}
                variant="default"
                color="success"
                autoplay
                interval={5000}
                loop={false}
                navigation
                indicators
                pauseOnHover
                enableSwipe
            />
            <Text variant="caption" color="muted" className="mt-2 text-center">
                ✅ Couleur succès
            </Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Carousel avec couleur succès pour les indicateurs.',
            },
        },
    },
};

export const WarningColor: Story = {
    render: () => (
        <div className="w-full max-w-3xl">
            <Carousel
                items={doctorSlides}
                variant="default"
                color="warning"
                autoplay
                interval={5000}
                loop={false}
                navigation
                indicators
                pauseOnHover
                enableSwipe
            />
            <Text variant="caption" color="muted" className="mt-2 text-center">
                ⚠️ Couleur avertissement
            </Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Carousel avec couleur warning pour les indicateurs.',
            },
        },
    },
};

export const NoIndicators: Story = {
    render: () => (
        <div className="w-full max-w-3xl">
            <Carousel
                items={doctorSlides}
                variant="default"
                color="primary"
                autoplay
                interval={5000}
                loop={false}
                navigation
                indicators={false}
                pauseOnHover
                enableSwipe
            />
            <Text variant="caption" color="muted" className="mt-2 text-center">
                📍 Indicateurs désactivés
            </Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Carousel sans indicateurs de progression.',
            },
        },
    },
};

export const InteractivePlayground: Story = {
    args: {
        items: doctorSlides.slice(0, 2),
        variant: 'default',
        color: 'primary',
        autoplay: true,
        interval: 4000,
        loop: false,
        navigation: true,
        indicators: true,
        pauseOnHover: true,
        enableSwipe: true,
    },
    render: (args) => (
        <div className="w-full max-w-3xl">
            <Carousel {...args} />
            <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="outline">
                    Autoplay: {args.autoplay ? '✅' : '⛔'}
                </Badge>
                <Badge variant="outline">
                    Swipe: {args.enableSwipe ? '✅' : '⛔'}
                </Badge>
                <Badge variant="outline">
                    Intervalle: {args.interval}ms
                </Badge>
            </div>
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