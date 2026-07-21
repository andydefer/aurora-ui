// src/components/utilities/stories/InfiniteScroll.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { InfiniteScroll } from '../InfiniteScroll';
import { useState, useEffect } from 'react';
import { Text } from '../../typography/Text';
import { Card } from '../../overlay/Card';
import { Badge } from '../../feedback/Badge';
import { Avatar } from '../../media/Avatar';
import { Button } from '../../forms/Button';
import {
    Heart,
    Star,
    Calendar,
    Clock,
    Users,
    ArrowRight,
    DollarSign,
    MessageCircle,
    Share2,
} from 'lucide-react';

const meta: Meta<typeof InfiniteScroll> = {
    title: 'Utilities/InfiniteScroll',
    component: InfiniteScroll,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un composant pour le chargement infini avec support vertical, horizontal, auto et manuel.',
            },
        },
    },
    argTypes: {
        direction: {
            control: 'select',
            options: ['vertical', 'horizontal'],
            description: 'Direction du défilement',
        },
        mode: {
            control: 'select',
            options: ['auto', 'manual'],
            description: 'Mode de chargement (auto ou manuel)',
        },
        threshold: {
            control: 'number',
            description: 'Seuil de déclenchement en pixels',
        },
        showProgress: {
            control: 'boolean',
            description: 'Afficher la barre de progression',
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'destructive', 'success', 'warning'],
            description: 'Couleur d\'accentuation',
        },
        loadMoreText: {
            control: 'text',
            description: 'Texte du bouton "Charger plus"',
        },
        endMessageText: {
            control: 'text',
            description: 'Message de fin',
        },
        hideScrollbar: {
            control: 'boolean',
            description: 'Cacher la barre de défilement',
        },
        showScrollbar: {
            control: 'boolean',
            description: 'Afficher la barre de défilement',
        },
        autoHideScrollbar: {
            control: 'boolean',
            description: 'Masquer automatiquement la barre de défilement',
        },
    },
};

export default meta;
type Story = StoryObj<typeof InfiniteScroll>;

interface DoctorItem {
    id: number;
    name: string;
    speciality: string;
    avatar: string;
    rating: number;
    patients: number;
    experience: string;
    fee: string;
    status: string;
    nextSlot: string;
}

interface SocialItem extends DoctorItem {
    role: string;
    followers: string;
    projects: number;
    awards: number;
}

const generateDoctorItems = (count: number, start: number = 0): DoctorItem[] => {
    const doctors = [
        { name: 'Dr. Jean Dupont', speciality: 'Cardiologue', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face', rating: 4.8, patients: 1234, experience: '10 ans', fee: '50€' },
        { name: 'Dr. Marie Martin', speciality: 'Dermatologue', avatar: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?w=200&h=200&fit=crop&crop=face', rating: 4.9, patients: 856, experience: '8 ans', fee: '65€' },
        { name: 'Dr. Pierre Durand', speciality: 'Pédiatre', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face', rating: 4.7, patients: 2100, experience: '15 ans', fee: '45€' },
        { name: 'Dr. Sophie Lefèvre', speciality: 'Gynécologue', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face', rating: 4.6, patients: 1500, experience: '12 ans', fee: '55€' },
        { name: 'Dr. Luc Martin', speciality: 'Ophtalmologue', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face', rating: 4.8, patients: 980, experience: '9 ans', fee: '60€' },
        { name: 'Dr. Emma Petit', speciality: 'Pneumologue', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face', rating: 4.9, patients: 760, experience: '7 ans', fee: '70€' },
        { name: 'Dr. Thomas Robert', speciality: 'Orthopédiste', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face', rating: 4.5, patients: 3400, experience: '20 ans', fee: '55€' },
        { name: 'Dr. Julie Bernard', speciality: 'Neurologue', avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop&crop=face', rating: 4.7, patients: 620, experience: '6 ans', fee: '80€' },
    ];
    return Array.from({ length: count }, (_, i) => {
        const doctor = doctors[(start + i) % doctors.length];
        return {
            id: start + i,
            ...doctor,
            status: ['Disponible', 'Complet', 'Disponible', 'Complet', 'Disponible'][Math.floor(Math.random() * 5)],
            nextSlot: ['Aujourd\'hui 14:30', 'Demain 09:00', 'Aujourd\'hui 16:00', 'Mercredi 10:30', 'Jeudi 08:30'][Math.floor(Math.random() * 5)],
        };
    });
};

const generateSocialItems = (count: number, start: number = 0): SocialItem[] => {
    const users = [
        { name: 'Thomas Martin', role: 'Développeur Full Stack', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face', followers: '1.2k', projects: 45, awards: 8 },
        { name: 'Marie Dubois', role: 'Designer UI/UX', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face', followers: '2.4k', projects: 67, awards: 12 },
        { name: 'Jean Dupont', role: 'Product Manager', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face', followers: '856', projects: 34, awards: 5 },
        { name: 'Sophie Lefèvre', role: 'Data Scientist', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face', followers: '1.8k', projects: 52, awards: 9 },
        { name: 'Pierre Durand', role: 'DevOps Engineer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face', followers: '624', projects: 28, awards: 4 },
        { name: 'Emma Petit', role: 'Frontend Developer', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face', followers: '3.1k', projects: 89, awards: 15 },
    ];
    return Array.from({ length: count }, (_, i) => {
        const user = users[(start + i) % users.length];
        return {
            id: start + i,
            name: user.name,
            speciality: user.role,
            avatar: user.avatar,
            rating: 4.5 + Math.random() * 0.5,
            patients: Math.floor(Math.random() * 2000) + 500,
            experience: Math.floor(Math.random() * 15) + 5 + ' ans',
            fee: Math.floor(Math.random() * 50) + 30 + '€',
            status: ['En ligne', 'Absent', 'En ligne', 'Occupé', 'En ligne'][Math.floor(Math.random() * 5)],
            nextSlot: ['Aujourd\'hui 14:30', 'Demain 09:00', 'Aujourd\'hui 16:00', 'Mercredi 10:30', 'Jeudi 08:30'][Math.floor(Math.random() * 5)],
            role: user.role,
            followers: user.followers,
            projects: user.projects,
            awards: user.awards,
        };
    });
};

interface InfiniteScrollDemoProps {
    direction?: 'vertical' | 'horizontal';
    mode?: 'auto' | 'manual';
    threshold?: number;
    showProgress?: boolean;
    color?: 'primary' | 'secondary' | 'muted' | 'destructive' | 'success' | 'warning';
    loadMoreText?: string;
    endMessageText?: string;
    initialItems?: number;
    itemsPerLoad?: number;
    totalItems?: number;
    hideScrollbar?: boolean;
    showScrollbar?: boolean;
    autoHideScrollbar?: boolean;
}

const InfiniteScrollDemo = ({
    direction = 'vertical',
    mode = 'auto',
    threshold = 100,
    showProgress = true,
    color = 'primary',
    loadMoreText = 'Charger plus de médecins',
    endMessageText = 'Tous les médecins sont affichés',
    initialItems = 6,
    itemsPerLoad = 4,
    totalItems = 30,
    hideScrollbar = false,
    showScrollbar = true,
    autoHideScrollbar = false,
}: InfiniteScrollDemoProps) => {
    const isVertical = direction === 'vertical';
    const generateItems = isVertical ? generateDoctorItems : generateSocialItems;

    const [items, setItems] = useState(generateItems(initialItems));
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const hasMore = items.length < totalItems;

    const loadMore = () => {
        if (loading || !hasMore) return;
        setLoading(true);

        setTimeout(() => {
            const newItems = generateItems(
                Math.min(itemsPerLoad, totalItems - items.length),
                items.length
            );
            setItems([...items, ...newItems]);
            setPage(page + 1);
            setLoading(false);
        }, 1200);
    };

    useEffect(() => {
        setItems(generateItems(initialItems));
        setPage(1);
    }, [initialItems, direction]);

    return (
        <div className="w-full min-w-[500px] max-w-4xl">
            <div className="flex items-center justify-between mb-4">
                <Text variant="h5" className="font-bold">
                    {items.length} / {totalItems} {isVertical ? 'médecins' : 'profils'}
                </Text>
                <Badge variant="primary">
                    Page {page}
                </Badge>
            </div>

            <InfiniteScroll
                direction={direction}
                mode={mode}
                threshold={threshold}
                showProgress={showProgress}
                color={color}
                loadMoreText={loadMoreText}
                endMessageText={endMessageText}
                hasMore={hasMore}
                loading={loading}
                loadMore={loadMore}
                hideScrollbar={hideScrollbar}
                showScrollbar={showScrollbar}
                autoHideScrollbar={autoHideScrollbar}
                className={`max-h-[500px] min-w-md border border-border rounded-lg bg-muted/5 p-3 ${isVertical ? '' : 'overflow-x-auto'}`}
            >
                {isVertical ? (
                    <div className="space-y-3">
                        {(items as DoctorItem[]).map((item) => (
                            <Card
                                key={item.id}
                                variant="default"
                                radius="md"
                                shadow="sm"
                                border
                                hoverable
                                className="p-4 hover:border-primary/20 transition-all"
                            >
                                <div className="flex gap-4">
                                    <Avatar
                                        src={item.avatar}
                                        name={item.name}
                                        size="lg"
                                        status={item.status === 'Disponible' ? 'online' : 'busy'}
                                        shape="rounded"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <Text variant="h5" className="font-bold">{item.name}</Text>
                                                <Text variant="body" color="muted">{item.speciality}</Text>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Star size={14} className="fill-warning text-warning" />
                                                <span className="text-sm font-semibold">{item.rating}</span>
                                                <span className="text-xs text-muted-foreground">(124 avis)</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-1.5 mt-2">
                                            <Badge variant="primary" size="sm">{item.speciality}</Badge>
                                            <Badge variant="outline" size="sm">+2</Badge>
                                        </div>

                                        <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-border/50">
                                            <div>
                                                <div className="flex items-center gap-1.5">
                                                    <Users size={14} className="text-primary" />
                                                    <span className="text-sm font-semibold">{item.patients}</span>
                                                </div>
                                                <Text variant="caption" color="muted">Patients</Text>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-1.5">
                                                    <Clock size={14} className="text-primary" />
                                                    <span className="text-sm font-semibold">{item.experience}</span>
                                                </div>
                                                <Text variant="caption" color="muted">Expérience</Text>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-1.5">
                                                    <DollarSign size={14} className="text-success" />
                                                    <span className="text-sm font-semibold">{item.fee}</span>
                                                </div>
                                                <Text variant="caption" color="muted">Consultation</Text>
                                            </div>
                                        </div>

                                        <div className="mt-3 p-2 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="text-primary" />
                                                <div>
                                                    <Text variant="small" className="font-medium">Prochain créneau</Text>
                                                    <Text variant="caption" color="muted">{item.nextSlot}</Text>
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
                        ))}
                    </div>
                ) : (
                    <div className="flex gap-4 min-w-max">
                        {(items as SocialItem[]).map((item) => (
                            <Card
                                key={item.id}
                                variant="glass"
                                radius="lg"
                                shadow="md"
                                border
                                hoverable
                                className="w-[280px] min-w-[280px] p-5 text-center hover:border-primary/20 transition-all"
                            >
                                <div className="relative">
                                    <div className="h-16 rounded-t-lg bg-gradient-to-r from-primary/20 to-secondary/20 -mx-5 -mt-5" />
                                    <div className="absolute top-2 right-2">
                                        <Badge
                                            variant={item.status === 'En ligne' ? 'success' : 'muted'}
                                            dot
                                            size="sm"
                                        >
                                            {item.status}
                                        </Badge>
                                    </div>
                                    <div className="relative -mt-2">
                                        <Avatar
                                            src={item.avatar}
                                            name={item.name}
                                            size="xl"
                                            bordered
                                            borderColor="ring-background"
                                            className="mx-auto"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <Text variant="h5" className="font-bold">{item.name}</Text>
                                    <Text variant="body" color="muted">{item.role}</Text>

                                    <div className="flex justify-center gap-4 mt-3 pt-3 border-t border-border/50">
                                        <div className="text-center">
                                            <Text variant="h6" className="font-bold">{item.followers}</Text>
                                            <Text variant="caption" color="muted">Abonnés</Text>
                                        </div>
                                        <div className="w-px bg-border" />
                                        <div className="text-center">
                                            <Text variant="h6" className="font-bold">{item.projects}</Text>
                                            <Text variant="caption" color="muted">Projets</Text>
                                        </div>
                                        <div className="w-px bg-border" />
                                        <div className="text-center">
                                            <Text variant="h6" className="font-bold">{item.awards}</Text>
                                            <Text variant="caption" color="muted">Récompenses</Text>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap justify-center gap-2 mt-4 pt-3 border-t border-border/50">
                                        <Button variant="ghost" size="sm" className="gap-1">
                                            <MessageCircle size={14} />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="gap-1">
                                            <Heart size={14} />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="gap-1">
                                            <Share2 size={14} />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </InfiniteScroll>
        </div>
    );
};

export const VerticalAuto: Story = {
    render: () => <InfiniteScrollDemo direction="vertical" mode="auto" />,
    parameters: {
        docs: {
            description: {
                story: 'Chargement infini vertical en mode automatique avec cartes médecin.',
            },
        },
    },
};

export const VerticalManual: Story = {
    render: () => <InfiniteScrollDemo direction="vertical" mode="manual" loadMoreText="Charger plus de médecins" />,
    parameters: {
        docs: {
            description: {
                story: 'Chargement infini vertical en mode manuel avec cartes médecin.',
            },
        },
    },
};

export const HorizontalAuto: Story = {
    render: () => (
        <InfiniteScrollDemo
            direction="horizontal"
            mode="auto"
            threshold={50}
            initialItems={8}
            itemsPerLoad={4}
            totalItems={30}
            loadMoreText="Charger plus de profils →"
            endMessageText="Tous les profils sont affichés"
        />
    ),
    parameters: {
        docs: {
            description: {
                story: 'Chargement infini horizontal en mode automatique avec cartes social.',
            },
        },
    },
};

export const HorizontalManual: Story = {
    render: () => (
        <InfiniteScrollDemo
            direction="horizontal"
            mode="manual"
            initialItems={8}
            itemsPerLoad={4}
            totalItems={30}
            loadMoreText="Charger plus de profils →"
            endMessageText="Tous les profils sont affichés"
        />
    ),
    parameters: {
        docs: {
            description: {
                story: 'Chargement infini horizontal en mode manuel avec cartes social.',
            },
        },
    },
};

export const WithoutProgress: Story = {
    render: () => <InfiniteScrollDemo direction="vertical" mode="auto" showProgress={false} />,
    parameters: {
        docs: {
            description: {
                story: 'Chargement infini sans barre de progression.',
            },
        },
    },
};

export const WithCustomLoader: Story = {
    render: () => {
        const [items, setItems] = useState(generateDoctorItems(6));
        const [loading, setLoading] = useState(false);
        const totalItems = 30;
        const hasMore = items.length < totalItems;

        const loadMore = () => {
            if (loading || !hasMore) return;
            setLoading(true);

            setTimeout(() => {
                const newItems = generateDoctorItems(
                    Math.min(4, totalItems - items.length),
                    items.length
                );
                setItems([...items, ...newItems]);
                setLoading(false);
            }, 1200);
        };

        return (
            <div className="w-full min-w-[500px] max-w-4xl">
                <InfiniteScroll
                    direction="vertical"
                    mode="auto"
                    showProgress={true}
                    color="primary"
                    endMessageText="🎉 Tous les médecins sont affichés"
                    hasMore={hasMore}
                    loading={loading}
                    loadMore={loadMore}
                    loader={
                        <div className="flex items-center gap-3 py-4">
                            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                            <span className="text-sm text-muted-foreground">Recherche de médecins...</span>
                        </div>
                    }
                    className="max-h-[500px] border border-border rounded-lg bg-muted/5 p-3"
                >
                    <div className="space-y-3">
                        {items.map((item) => (
                            <Card
                                key={item.id}
                                variant="default"
                                radius="md"
                                shadow="sm"
                                border
                                className="p-4"
                            >
                                <div className="flex gap-4">
                                    <Avatar
                                        src={item.avatar}
                                        name={item.name}
                                        size="lg"
                                        shape="rounded"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <Text variant="h5" className="font-bold">{item.name}</Text>
                                                <Text variant="body" color="muted">{item.speciality}</Text>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Star size={14} className="fill-warning text-warning" />
                                                <span className="text-sm font-semibold">{item.rating}</span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-border/50">
                                            <div>
                                                <div className="flex items-center gap-1.5">
                                                    <Users size={14} className="text-primary" />
                                                    <span className="text-sm font-semibold">{item.patients}</span>
                                                </div>
                                                <Text variant="caption" color="muted">Patients</Text>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-1.5">
                                                    <Clock size={14} className="text-primary" />
                                                    <span className="text-sm font-semibold">{item.experience}</span>
                                                </div>
                                                <Text variant="caption" color="muted">Expérience</Text>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-1.5">
                                                    <DollarSign size={14} className="text-success" />
                                                    <span className="text-sm font-semibold">{item.fee}</span>
                                                </div>
                                                <Text variant="caption" color="muted">Consultation</Text>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Chargement infini avec loader personnalisé.',
            },
        },
    },
};

export const DifferentColors: Story = {
    render: () => {
        const colors: Array<'primary' | 'secondary' | 'success' | 'warning' | 'destructive'> = [
            'primary', 'secondary', 'success', 'warning', 'destructive'
        ];

        return (
            <div className="space-y-6 max-w-4xl w-full">
                {colors.map((color) => (
                    <div key={color}>
                        <Text variant="h6" className="font-bold mb-2 capitalize">{color}</Text>
                        <InfiniteScrollDemo
                            direction="vertical"
                            mode="auto"
                            color={color}
                            showProgress={true}
                            initialItems={4}
                            itemsPerLoad={3}
                            totalItems={15}
                        />
                    </div>
                ))}
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Différentes couleurs disponibles pour la barre de progression.',
            },
        },
    },
};

export const InteractivePlayground: Story = {
    render: (args) => (
        <InfiniteScrollDemo
            direction={args.direction}
            mode={args.mode}
            threshold={args.threshold}
            showProgress={args.showProgress}
            color={args.color}
            loadMoreText={args.loadMoreText}
            endMessageText={args.endMessageText}
            initialItems={6}
            itemsPerLoad={4}
            totalItems={30}
            hideScrollbar={args.hideScrollbar}
            showScrollbar={args.showScrollbar}
            autoHideScrollbar={args.autoHideScrollbar}
        />
    ),
    args: {
        direction: 'vertical' as const,
        mode: 'auto' as const,
        threshold: 100,
        showProgress: true,
        color: 'primary' as const,
        loadMoreText: 'Charger plus de médecins',
        endMessageText: 'Tous les médecins sont affichés',
        hideScrollbar: false,
        showScrollbar: true,
        autoHideScrollbar: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'Playground interactif pour tester toutes les options.',
            },
        },
    },
};