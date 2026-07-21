// src/components/utilities/stories/ScrollList.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ScrollList } from '../ScrollList';
import { Card } from '../../overlay/Card';
import { Text } from '../../typography/Text';
import { Badge } from '../../feedback/Badge';
import { Avatar } from '../../media/Avatar';
import { Button } from '../../forms/Button';
import {
    Heart,
    Star,
    MessageCircle,
    Share2,
} from 'lucide-react';

const meta: Meta<typeof ScrollList> = {
    title: 'Utilities/ScrollList',
    component: ScrollList,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Une liste scrollable avec support vertical et horizontal.',
            },
        },
    },
    argTypes: {
        direction: {
            control: 'select',
            options: ['vertical', 'horizontal'],
            description: 'Direction du défilement',
        },
        variant: {
            control: 'select',
            options: ['default', 'bordered', 'elevated', 'ghost'],
            description: 'Style visuel',
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'danger', 'success', 'warning'],
            description: 'Couleur d\'accentuation',
        },
        showScrollbar: {
            control: 'boolean',
            description: 'Afficher la barre de défilement',
        },
        autoHideScrollbar: {
            control: 'boolean',
            description: 'Masquer automatiquement la barre de défilement',
        },
        hideScrollbar: {
            control: 'boolean',
            description: 'Cacher complètement la barre de défilement',
        },
        smoothScroll: {
            control: 'boolean',
            description: 'Défilement fluide',
        },
        snapScroll: {
            control: 'boolean',
            description: 'Défilement par snaps',
        },
        snapAlign: {
            control: 'select',
            options: ['start', 'center', 'end', 'none'],
            description: 'Alignement des snaps',
        },
        gap: {
            control: 'number',
            description: 'Espacement entre les éléments',
        },
        padding: {
            control: 'number',
            description: 'Padding intérieur',
        },
        maxHeight: {
            control: 'text',
            description: 'Hauteur maximale',
        },
    },
};

export default meta;
type Story = StoryObj<typeof ScrollList>;

// ============ DONNÉES ============

// Données pour les commentaires (vertical)
const commentItems = [
    {
        id: 1,
        author: 'Marie Dubois',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
        content: 'Service exceptionnel ! L\'équipe est très professionnelle et à l\'écoute. Je recommande vivement.',
        date: 'Il y a 2 jours',
        likes: 24,
        replies: 5,
        rating: 5,
    },
    {
        id: 2,
        author: 'Jean Dupont',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        content: 'Très bonne expérience, le produit correspond parfaitement à mes attentes. Livraison rapide.',
        date: 'Il y a 3 jours',
        likes: 18,
        replies: 3,
        rating: 4,
    },
    {
        id: 3,
        author: 'Sophie Lefèvre',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        content: 'Je suis ravie de mon achat. Le service client est très réactif et à l\'écoute de nos besoins.',
        date: 'Il y a 5 jours',
        likes: 32,
        replies: 8,
        rating: 5,
    },
    {
        id: 4,
        author: 'Thomas Martin',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
        content: 'Qualité au rendez-vous. Je recommande sans hésitation cette entreprise pour ses prestations.',
        date: 'Il y a 1 semaine',
        likes: 15,
        replies: 2,
        rating: 4,
    },
    {
        id: 5,
        author: 'Emma Petit',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        content: 'Superbe expérience, le produit est de très bonne qualité. Je reviendrai sans hésiter.',
        date: 'Il y a 1 semaine',
        likes: 27,
        replies: 6,
        rating: 5,
    },
    {
        id: 6,
        author: 'Pierre Durand',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        content: 'Service professionnel et produit de qualité. Le rapport qualité-prix est excellent.',
        date: 'Il y a 2 semaines',
        likes: 12,
        replies: 1,
        rating: 4,
    },
    {
        id: 7,
        author: 'Julie Bernard',
        avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face',
        content: 'Très satisfaite de mon achat, le produit correspond parfaitement à ce que je cherchais.',
        date: 'Il y a 2 semaines',
        likes: 9,
        replies: 2,
        rating: 5,
    },
    {
        id: 8,
        author: 'Luc Martin',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        content: 'Je recommande vivement cette entreprise pour son sérieux et la qualité de ses produits.',
        date: 'Il y a 3 semaines',
        likes: 21,
        replies: 4,
        rating: 5,
    },
];

// Données pour les produits (horizontal)
const productItems = [
    {
        id: 1,
        name: 'Montre Connectée Pro',
        price: '199,99€',
        oldPrice: '249,99€',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
        rating: 4.8,
        reviews: 124,
        badge: 'Promo -20%',
        inStock: true,
    },
    {
        id: 2,
        name: 'Casque Audio Premium',
        price: '89,99€',
        oldPrice: '129,99€',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
        rating: 4.7,
        reviews: 89,
        badge: 'Promo -30%',
        inStock: true,
    },
    {
        id: 3,
        name: 'Smartphone Ultra',
        price: '699,99€',
        oldPrice: '899,99€',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop',
        rating: 4.9,
        reviews: 256,
        badge: 'Nouveau',
        inStock: true,
    },
    {
        id: 4,
        name: 'Tablette 10" Pro',
        price: '349,99€',
        oldPrice: '449,99€',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop',
        rating: 4.6,
        reviews: 78,
        badge: '-22%',
        inStock: false,
    },
    {
        id: 5,
        name: 'Enceinte Bluetooth',
        price: '59,99€',
        oldPrice: '79,99€',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop',
        rating: 4.5,
        reviews: 45,
        badge: 'Promo',
        inStock: true,
    },
    {
        id: 6,
        name: 'Écouteurs Sans Fil',
        price: '129,99€',
        oldPrice: '169,99€',
        image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200&h=200&fit=crop',
        rating: 4.8,
        reviews: 156,
        badge: '-24%',
        inStock: true,
    },
];

// ============ STORIES ============

export const VerticalComments: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <ScrollList
                direction="vertical"
                maxHeight="500px"
                variant="default"
                showScrollbar={true}
                autoHideScrollbar={false}
                gap={3}
                padding={4}
            >
                {commentItems.map((comment) => (
                    <Card
                        key={comment.id}
                        variant="default"
                        radius="md"
                        shadow="sm"
                        border
                        className="p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start gap-3">
                            <Avatar
                                src={comment.avatar}
                                name={comment.author}
                                size="md"
                                shape="rounded"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Text variant="h6" className="font-semibold">{comment.author}</Text>
                                        <div className="flex items-center gap-1 mt-0.5">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    className={i < comment.rating ? 'fill-warning text-warning' : 'text-muted'}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <Text variant="caption" color="muted">{comment.date}</Text>
                                </div>
                                <Text className="mt-2 text-sm">{comment.content}</Text>
                                <div className="flex items-center gap-4 mt-3 pt-2 border-t border-border/50">
                                    <Button variant="ghost" size="sm" className="gap-1">
                                        <Heart size={14} />
                                        {comment.likes}
                                    </Button>
                                    <Button variant="ghost" size="sm" className="gap-1">
                                        <MessageCircle size={14} />
                                        {comment.replies}
                                    </Button>
                                    <Button variant="ghost" size="sm" className="gap-1">
                                        <Share2 size={14} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </ScrollList>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Liste scrollable verticale avec des commentaires.',
            },
        },
    },
};

export const HorizontalProducts: Story = {
    render: () => (
        <div className="w-full max-w-6xl">
            <ScrollList
                direction="horizontal"
                maxHeight="380px"
                variant="elevated"
                showScrollbar={true}
                autoHideScrollbar={false}
                gap={4}
                padding={4}
            >
                {productItems.map((product) => (
                    <Card
                        key={product.id}
                        variant="default"
                        radius="lg"
                        shadow="md"
                        border
                        className="w-[260px] min-w-[260px] p-4 hover:shadow-xl transition-all hover:-translate-y-1"
                    >
                        <div className="relative">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-[160px] object-cover rounded-lg bg-muted/10"
                            />
                            {product.badge && (
                                <Badge
                                    variant="danger"
                                    size="sm"
                                    className="absolute top-2 right-2"
                                >
                                    {product.badge}
                                </Badge>
                            )}
                            {!product.inStock && (
                                <Badge
                                    variant="muted"
                                    size="sm"
                                    className="absolute top-2 left-2"
                                >
                                    Rupture
                                </Badge>
                            )}
                        </div>
                        <div className="mt-3">
                            <Text variant="h6" className="font-bold line-clamp-1">{product.name}</Text>
                            <div className="flex items-center gap-1 mt-1">
                                <Star size={14} className="fill-warning text-warning" />
                                <span className="text-sm font-semibold">{product.rating}</span>
                                <span className="text-xs text-muted-foreground">({product.reviews})</span>
                            </div>
                            <div className="flex items-end justify-between mt-2 pt-2 border-t border-border/50">
                                <div>
                                    <Text variant="h5" className="font-bold text-primary">{product.price}</Text>
                                    <Text variant="small" color="muted" className="line-through">{product.oldPrice}</Text>
                                </div>
                                <Button variant="primary" size="sm" disabled={!product.inStock}>
                                    Ajouter
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </ScrollList>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Liste scrollable horizontale avec des produits.',
            },
        },
    },
};

export const WithSnap: Story = {
    render: () => (
        <div className="w-full max-w-6xl">
            <ScrollList
                direction="horizontal"
                maxHeight="400px"
                variant="elevated"
                snapScroll
                snapAlign="center"
                showScrollbar={true}
                gap={4}
                padding={4}
            >
                {productItems.map((product) => (
                    <Card
                        key={product.id}
                        variant="default"
                        radius="lg"
                        shadow="md"
                        border
                        className="w-[300px] min-w-[300px] p-5 text-center hover:shadow-xl transition-all"
                    >
                        <div className="relative">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-[180px] object-cover rounded-lg bg-muted/10"
                            />
                            {product.badge && (
                                <Badge
                                    variant="danger"
                                    size="sm"
                                    className="absolute top-2 right-2"
                                >
                                    {product.badge}
                                </Badge>
                            )}
                        </div>
                        <div className="mt-3">
                            <Text variant="h5" className="font-bold">{product.name}</Text>
                            <div className="flex items-center justify-center gap-1 mt-1">
                                <Star size={16} className="fill-warning text-warning" />
                                <span className="text-sm font-semibold">{product.rating}</span>
                                <span className="text-xs text-muted-foreground">({product.reviews})</span>
                            </div>
                            <div className="mt-2">
                                <Text variant="h4" className="font-bold text-primary">{product.price}</Text>
                                <Text variant="small" color="muted" className="line-through">{product.oldPrice}</Text>
                            </div>
                            <Button variant="primary" size="sm" className="mt-3 w-full" disabled={!product.inStock}>
                                Ajouter au panier
                            </Button>
                        </div>
                    </Card>
                ))}
            </ScrollList>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Liste scrollable avec snaps pour centrer les éléments.',
            },
        },
    },
};

export const WithoutScrollbar: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <ScrollList
                direction="vertical"
                maxHeight="400px"
                variant="default"
                hideScrollbar={true}
                gap={3}
                padding={4}
            >
                {commentItems.slice(0, 6).map((comment) => (
                    <Card
                        key={comment.id}
                        variant="default"
                        radius="md"
                        shadow="sm"
                        border
                        className="p-4"
                    >
                        <div className="flex items-start gap-3">
                            <Avatar
                                src={comment.avatar}
                                name={comment.author}
                                size="md"
                                shape="rounded"
                            />
                            <div className="flex-1">
                                <Text variant="h6" className="font-semibold">{comment.author}</Text>
                                <Text className="mt-1 text-sm">{comment.content}</Text>
                            </div>
                        </div>
                    </Card>
                ))}
            </ScrollList>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Liste sans barre de défilement.',
            },
        },
    },
};

export const AutoHideScrollbar: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <ScrollList
                direction="vertical"
                maxHeight="400px"
                variant="default"
                showScrollbar={true}
                autoHideScrollbar={true}
                gap={3}
                padding={4}
            >
                {commentItems.map((comment) => (
                    <Card
                        key={comment.id}
                        variant="default"
                        radius="md"
                        shadow="sm"
                        border
                        className="p-4"
                    >
                        <div className="flex items-start gap-3">
                            <Avatar
                                src={comment.avatar}
                                name={comment.author}
                                size="md"
                                shape="rounded"
                            />
                            <div className="flex-1">
                                <Text variant="h6" className="font-semibold">{comment.author}</Text>
                                <Text className="mt-1 text-sm">{comment.content}</Text>
                            </div>
                        </div>
                    </Card>
                ))}
            </ScrollList>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Liste avec barre de défilement qui se masque automatiquement.',
            },
        },
    },
};


export const InteractivePlayground: Story = {
    args: {
        direction: 'vertical',
        variant: 'default',
        color: 'primary',
        maxHeight: '400px',
        showScrollbar: true,
        autoHideScrollbar: false,
        hideScrollbar: false,
        smoothScroll: true,
        snapScroll: false,
        snapAlign: 'start',
        gap: 4,
        padding: 4,
    },
    render: (args) => (
        <div className="w-full max-w-2xl">
            <ScrollList {...args}>
                {commentItems.map((comment) => (
                    <Card
                        key={comment.id}
                        variant="default"
                        radius="md"
                        shadow="sm"
                        border
                        className="p-4"
                    >
                        <div className="flex items-start gap-3">
                            <Avatar
                                src={comment.avatar}
                                name={comment.author}
                                size="md"
                                shape="rounded"
                            />
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <Text variant="h6" className="font-semibold">{comment.author}</Text>
                                    <Text variant="caption" color="muted">{comment.date}</Text>
                                </div>
                                <div className="flex items-center gap-1 mt-0.5">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            className={i < comment.rating ? 'fill-warning text-warning' : 'text-muted'}
                                        />
                                    ))}
                                </div>
                                <Text className="mt-2 text-sm">{comment.content}</Text>
                            </div>
                        </div>
                    </Card>
                ))}
            </ScrollList>
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