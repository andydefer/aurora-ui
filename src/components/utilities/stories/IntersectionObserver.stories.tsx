// src/components/utilities/stories/IntersectionObserver.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { IntersectionObserver } from '../IntersectionObserver';
import { Card } from '../../overlay/Card';
import { Text } from '../../typography/Text';
import { Badge } from '../../feedback/Badge';
import { Button } from '../../forms/Button';
import { Avatar } from '../../media/Avatar';
import { Star, Users, Clock, MapPin, Heart, MessageCircle, Share2, Image as ImageIcon } from 'lucide-react';

const meta: Meta<typeof IntersectionObserver> = {
    title: 'Utilities/IntersectionObserver',
    component: IntersectionObserver,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un composant pour détecter l\'apparition d\'éléments dans le viewport.',
            },
        },
    },
    argTypes: {
        threshold: {
            control: 'number',
            description: 'Seuil de déclenchement (0-1)',
        },
        once: {
            control: 'boolean',
            description: 'Déclencher une seule fois',
        },
        delay: {
            control: 'number',
            description: 'Délai d\'apparition en ms',
        },
        showIndicator: {
            control: 'boolean',
            description: 'Afficher un indicateur de statut',
        },
        indicatorColor: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'destructive', 'success', 'warning'],
            description: 'Couleur de l\'indicateur',
        },
        rootMargin: {
            control: 'text',
            description: 'Marge de déclenchement',
        },
    },
};

export default meta;
type Story = StoryObj<typeof IntersectionObserver>;

// ============ COMPOSANTS DE DÉMONSTRATION ============


// ============ DONNÉES ============

const users = [
    { name: 'Dr. Jean Dupont', speciality: 'Cardiologue', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face', rating: 4.8, patients: 1234, experience: '10 ans' },
    { name: 'Dr. Marie Martin', speciality: 'Dermatologue', avatar: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?w=200&h=200&fit=crop&crop=face', rating: 4.9, patients: 856, experience: '8 ans' },
    { name: 'Dr. Pierre Durand', speciality: 'Pédiatre', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face', rating: 4.7, patients: 2100, experience: '15 ans' },
    { name: 'Dr. Sophie Lefèvre', speciality: 'Gynécologue', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face', rating: 4.6, patients: 1500, experience: '12 ans' },
    { name: 'Dr. Luc Martin', speciality: 'Ophtalmologue', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face', rating: 4.8, patients: 980, experience: '9 ans' },
    { name: 'Dr. Emma Petit', speciality: 'Pneumologue', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face', rating: 4.9, patients: 760, experience: '7 ans' },
];

const products = [
    { name: 'Montre Connectée Pro', price: '199,99€', oldPrice: '249,99€', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', rating: 4.8 },
    { name: 'Casque Audio Premium', price: '89,99€', oldPrice: '129,99€', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', rating: 4.7 },
    { name: 'Smartphone Ultra', price: '699,99€', oldPrice: '899,99€', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop', rating: 4.9 },
    { name: 'Tablette 10" Pro', price: '349,99€', oldPrice: '449,99€', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop', rating: 4.6 },
];

const comments = [
    { author: 'Marie Dubois', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', content: 'Service exceptionnel ! L\'équipe est très professionnelle et à l\'écoute.', date: 'Il y a 2 jours', rating: 5 },
    { author: 'Jean Dupont', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', content: 'Très bonne expérience, le produit correspond parfaitement à mes attentes.', date: 'Il y a 3 jours', rating: 4 },
    { author: 'Sophie Lefèvre', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', content: 'Je suis ravie de mon achat. Le service client est très réactif.', date: 'Il y a 5 jours', rating: 5 },
    { author: 'Thomas Martin', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face', content: 'Qualité au rendez-vous. Je recommande sans hésitation.', date: 'Il y a 1 semaine', rating: 4 },
];

// ============ STORIES ============

export const Default: Story = {
    render: () => (
        <div className="space-y-8 w-full max-w-2xl">
            <Text variant="h5" className="font-bold">📜 Défilez pour voir les éléments apparaître</Text>
            <Text color="muted">Les éléments apparaissent avec une animation lorsqu'ils entrent dans le viewport.</Text>

            {Array.from({ length: 6 }).map((_, i) => (
                <IntersectionObserver
                    key={i}
                    once
                    threshold={0.2}
                    delay={i * 100}
                    showIndicator
                    indicatorColor="primary"
                >
                    <Card variant="default" radius="lg" shadow="sm" className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                                {i + 1}
                            </div>
                            <div className="flex-1">
                                <Text variant="h6" className="font-bold">Élément {i + 1}</Text>
                                <Text color="muted">Apparu avec un délai de {i * 100}ms</Text>
                            </div>
                            <Badge variant="primary">Animé</Badge>
                        </div>
                    </Card>
                </IntersectionObserver>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Éléments qui apparaissent avec animation au défilement.',
            },
        },
    },
};

export const WithDelay: Story = {
    render: () => (
        <div className="space-y-8 w-full max-w-2xl">
            <Text variant="h5" className="font-bold">⏱️ Délai progressif</Text>
            <Text color="muted">Chaque élément apparaît avec un délai progressif.</Text>

            {Array.from({ length: 6 }).map((_, i) => (
                <IntersectionObserver
                    key={i}
                    once
                    threshold={0.3}
                    delay={i * 150}
                    showIndicator
                    indicatorColor="success"
                >
                    <Card variant="default" radius="lg" shadow="sm" className="p-6 border-l-4 border-l-success">
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <Text variant="h6" className="font-bold">Élément {i + 1}</Text>
                                <Text color="muted">Délai: {i * 150}ms</Text>
                            </div>
                            <Badge variant="success">Délai</Badge>
                        </div>
                    </Card>
                </IntersectionObserver>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Éléments avec délai progressif entre chaque apparition.',
            },
        },
    },
};

export const DoctorList: Story = {
    render: () => (
        <div className="space-y-6 w-full max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
                <Users size={24} className="text-primary" />
                <Text variant="h5" className="font-bold">👨‍⚕️ Médecins disponibles</Text>
                <Badge variant="primary">{users.length} médecins</Badge>
            </div>
            <Text color="muted" className="mb-4">
                Les cartes des médecins apparaissent au fur et à mesure du défilement.
            </Text>

            {users.map((user, index) => (
                <IntersectionObserver
                    key={index}
                    once
                    threshold={0.2}
                    delay={index * 100}
                    showIndicator
                    indicatorColor="primary"
                >
                    <Card variant="default" radius="lg" shadow="sm" className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex gap-4">
                            <Avatar src={user.avatar} name={user.name} size="lg" shape="rounded" />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <Text variant="h6" className="font-bold">{user.name}</Text>
                                        <Text variant="body" color="muted">{user.speciality}</Text>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star size={14} className="fill-warning text-warning" />
                                        <span className="text-sm font-semibold">{user.rating}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 mt-2">
                                    <div className="flex items-center gap-1">
                                        <Users size={14} className="text-primary" />
                                        <Text variant="small">{user.patients} patients</Text>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock size={14} className="text-primary" />
                                        <Text variant="small">{user.experience}</Text>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin size={14} className="text-muted-foreground" />
                                        <Text variant="small">Paris</Text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </IntersectionObserver>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Liste de médecins apparaissant progressivement.',
            },
        },
    },
};

export const ProductGrid: Story = {
    render: () => (
        <div className="w-full max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
                <ImageIcon size={24} className="text-primary" />
                <Text variant="h5" className="font-bold">🛍️ Produits populaires</Text>
                <Badge variant="primary">{products.length} produits</Badge>
            </div>
            <Text color="muted" className="mb-4">
                Les produits apparaissent avec un effet de grille.
            </Text>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map((product, index) => (
                    <IntersectionObserver
                        key={index}
                        once
                        threshold={0.2}
                        delay={index * 150}
                        showIndicator
                        indicatorColor="warning"
                    >
                        <Card variant="default" radius="lg" shadow="sm" className="overflow-hidden hover:shadow-lg transition-shadow">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <Text variant="h6" className="font-bold">{product.name}</Text>
                                <div className="flex items-center gap-2 mt-1">
                                    <Star size={14} className="fill-warning text-warning" />
                                    <span className="text-sm font-semibold">{product.rating}</span>
                                </div>
                                <div className="flex items-end justify-between mt-2">
                                    <div>
                                        <Text variant="h5" className="font-bold text-primary">{product.price}</Text>
                                        <Text variant="small" color="muted" className="line-through">{product.oldPrice}</Text>
                                    </div>
                                    <Button variant="primary" size="sm">Ajouter</Button>
                                </div>
                            </div>
                        </Card>
                    </IntersectionObserver>
                ))}
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Grille de produits apparaissant avec animation.',
            },
        },
    },
};

export const CommentsFeed: Story = {
    render: () => (
        <div className="space-y-4 w-full max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
                <MessageCircle size={24} className="text-primary" />
                <Text variant="h5" className="font-bold">💬 Avis récents</Text>
                <Badge variant="primary">{comments.length} avis</Badge>
            </div>

            {comments.map((comment, index) => (
                <IntersectionObserver
                    key={index}
                    once
                    threshold={0.3}
                    delay={index * 200}
                    showIndicator
                    indicatorColor="success"
                >
                    <Card variant="default" radius="lg" shadow="sm" className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                            <Avatar src={comment.avatar} name={comment.author} size="md" shape="rounded" />
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Text variant="h6" className="font-semibold">{comment.author}</Text>
                                        <div className="flex items-center gap-1 mt-0.5">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star key={i} size={14} className={i < comment.rating ? 'fill-warning text-warning' : 'text-muted'} />
                                            ))}
                                        </div>
                                    </div>
                                    <Text variant="caption" color="muted">{comment.date}</Text>
                                </div>
                                <Text className="mt-2">{comment.content}</Text>
                                <div className="flex gap-4 mt-3 pt-2 border-t border-border/50">
                                    <Button variant="ghost" size="sm" className="gap-1">
                                        <Heart size={14} />
                                        24
                                    </Button>
                                    <Button variant="ghost" size="sm" className="gap-1">
                                        <MessageCircle size={14} />
                                        5
                                    </Button>
                                    <Button variant="ghost" size="sm" className="gap-1">
                                        <Share2 size={14} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </IntersectionObserver>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Flux de commentaires apparaissant progressivement.',
            },
        },
    },
};

export const WithoutIndicator: Story = {
    render: () => (
        <div className="space-y-8 w-full max-w-2xl">
            <Text variant="h5" className="font-bold">🔇 Sans indicateur</Text>
            <Text color="muted">Les éléments apparaissent sans indicateur de statut.</Text>

            {Array.from({ length: 5 }).map((_, i) => (
                <IntersectionObserver
                    key={i}
                    once
                    threshold={0.2}
                    delay={i * 100}
                    showIndicator={false}
                >
                    <Card variant="default" radius="lg" shadow="sm" className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                {i + 1}
                            </div>
                            <div className="flex-1">
                                <Text variant="h6" className="font-bold">Élément {i + 1}</Text>
                                <Text color="muted">Sans indicateur visible</Text>
                            </div>
                        </div>
                    </Card>
                </IntersectionObserver>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Éléments sans indicateur de statut visible.',
            },
        },
    },
};

export const WithDifferentThresholds: Story = {
    render: () => (
        <div className="space-y-8 w-full max-w-2xl">
            <Text variant="h5" className="font-bold">📊 Seuils différents</Text>
            <Text color="muted">
                Seuil 0.5 (50% visible) pour les éléments bleus, seuil 0.8 (80% visible) pour les éléments verts.
            </Text>

            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <IntersectionObserver
                        key={i}
                        once
                        threshold={0.5}
                        delay={i * 150}
                        showIndicator
                        indicatorColor="primary"
                    >
                        <Card variant="default" radius="lg" shadow="sm" className="p-6 border-l-4 border-l-primary">
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <Text variant="h6" className="font-bold">Seuil 50% - {i + 1}</Text>
                                    <Text color="muted">Apparaît quand 50% de l'élément est visible</Text>
                                </div>
                                <Badge variant="primary">50%</Badge>
                            </div>
                        </Card>
                    </IntersectionObserver>
                ))}

                {Array.from({ length: 3 }).map((_, i) => (
                    <IntersectionObserver
                        key={i + 3}
                        once
                        threshold={0.8}
                        delay={i * 150}
                        showIndicator
                        indicatorColor="success"
                    >
                        <Card variant="default" radius="lg" shadow="sm" className="p-6 border-l-4 border-l-success">
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <Text variant="h6" className="font-bold">Seuil 80% - {i + 4}</Text>
                                    <Text color="muted">Apparaît quand 80% de l'élément est visible</Text>
                                </div>
                                <Badge variant="success">80%</Badge>
                            </div>
                        </Card>
                    </IntersectionObserver>
                ))}
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Éléments avec différents seuils de déclenchement.',
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
                <Text color="muted">Différentes couleurs d'indicateur disponibles.</Text>

                {colors.map((color, index) => (
                    <IntersectionObserver
                        key={color}
                        once
                        threshold={0.2}
                        delay={index * 100}
                        showIndicator
                        indicatorColor={color}
                    >
                        <Card variant="default" radius="lg" shadow="sm" className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                    {index + 1}
                                </div>
                                <div className="flex-1">
                                    <Text variant="h6" className="font-bold capitalize">{color}</Text>
                                    <Text color="muted">Indicateur de couleur {color}</Text>
                                </div>
                                <Badge variant={color}>{color}</Badge>
                            </div>
                        </Card>
                    </IntersectionObserver>
                ))}
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Toutes les couleurs d\'indicateur disponibles.',
            },
        },
    },
};

export const InteractivePlayground: Story = {
    args: {
        once: true,
        threshold: 0.2,
        delay: 0,
        showIndicator: true,
        indicatorColor: 'primary',
        rootMargin: '0px',
    },
    render: (args) => (
        <div className="space-y-8 w-full max-w-2xl">
            <div className="flex flex-wrap gap-3">
                <Badge variant="primary">Once: {args.once ? '✅' : '⛔'}</Badge>
                <Badge variant="outline">Threshold: {args.threshold}</Badge>
                <Badge variant="outline">Delay: {args.delay}ms</Badge>
                <Badge variant="outline">Indicator: {args.showIndicator ? '✅' : '⛔'}</Badge>
            </div>

            {Array.from({ length: 4 }).map((_, i) => (
                <IntersectionObserver
                    key={i}
                    once={args.once}
                    threshold={args.threshold}
                    delay={args.delay ? i * args.delay : 0}
                    showIndicator={args.showIndicator}
                    indicatorColor={args.indicatorColor}
                    rootMargin={args.rootMargin}
                >
                    <Card variant="default" radius="lg" shadow="sm" className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                {i + 1}
                            </div>
                            <div className="flex-1">
                                <Text variant="h6" className="font-bold">Élément {i + 1}</Text>
                                <Text color="muted">
                                    {args.once ? 'Apparaît une seule fois' : 'Apparaît à chaque fois'}
                                </Text>
                            </div>
                        </div>
                    </Card>
                </IntersectionObserver>
            ))}
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