// src/components/overlay/stories/Card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../Card';
import { Button } from '../../forms/Button';
import { Text } from '../../typography/Text';
import { Badge } from '../../feedback/Badge';
import { Avatar } from '../../media/Avatar';
import {
    User,
    Heart,
    Share2,
    Star,
    Calendar,
    Clock,
    Users,
    Stethoscope,
    ArrowRight,
    AlertCircle,
    TrendingUp,
    DollarSign,
    Activity,
    Award,
    MessageCircle,
    MapPin,
    Mail,
    Phone,
    GraduationCap,
    Briefcase,
    CheckCircle,
    Plus,
    Building,
    Globe,
} from 'lucide-react';

const meta: Meta<typeof Card> = {
    title: 'Overlay/Card',
    component: Card,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Une carte polyvalente avec de nombreux styles et variantes.',
            },
        },
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'outlined', 'elevated', 'ghost', 'gradient', 'glass'],
            description: 'Style visuel de la carte',
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'],
            description: 'Taille du texte',
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'destructive', 'success', 'warning'],
            description: 'Couleur d\'accentuation',
        },
        radius: {
            control: 'select',
            options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'],
            description: 'Coins arrondis',
        },
        shadow: {
            control: 'select',
            options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
            description: 'Ombre portée',
        },
        hoverable: { control: 'boolean' },
        interactive: { control: 'boolean' },
        selected: { control: 'boolean' },
        disabled: { control: 'boolean' },
        loading: { control: 'boolean' },
        skeleton: { control: 'boolean' },
        noPadding: { control: 'boolean' },
        divider: { control: 'boolean' },
        fullHeight: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Card>;



const TwitterIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    </svg>
);

const GithubIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
);

const LinkedinIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

// ============ CONTACT ============

export const ContactCard: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <Card
                variant="default"
                radius="lg"
                shadow="md"
                hoverable
                className="overflow-hidden"
            >
                <div className="flex items-start gap-6 p-2">
                    <Avatar
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                        name="Thomas Martin"
                        size="xl"
                        status="online"
                    />
                    <div className="flex-1">
                        <div className="flex items-start justify-between">
                            <div>
                                <Text variant="h4" className="font-bold">Thomas Martin</Text>
                                <Text variant="body" color="muted">Développeur Full Stack</Text>
                            </div>
                            <Badge variant="success" size="sm" icon={<CheckCircle size={12} />}>
                                Disponible
                            </Badge>
                        </div>

                        {/* Contact */}
                        <div className="space-y-2 mt-3">
                            <div className="flex items-center gap-2">
                                <Mail size={16} className="text-muted-foreground" />
                                <Text variant="small">thomas.martin@email.com</Text>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-muted-foreground" />
                                <Text variant="small">+33 6 12 34 56 78</Text>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={16} className="text-muted-foreground" />
                                <Text variant="small">Paris, France</Text>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 mt-4 pt-4 border-t border-border/50">
                            <Button variant="primary" size="md">
                                <MessageCircle size={18} className="mr-2" />
                                Contacter
                            </Button>
                            <Button variant="outline" size="md">
                                <User size={18} className="mr-2" />
                                Profil
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Carte de contact avec email, téléphone et localisation.',
            },
        },
    },
};

// ============ ENTREPRISE ============

export const CompanyCard: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <Card
                image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop"
                imageHeight="160px"
                variant="default"
                radius="lg"
                shadow="md"
                hoverable
                className="overflow-hidden"
            >
                <div className="space-y-4 p-2">
                    <div className="flex items-start justify-between">
                        <div>
                            <Text variant="h4" className="font-bold">TechCorp Solutions</Text>
                            <div className="flex items-center gap-2 mt-1">
                                <Building size={16} className="text-muted-foreground" />
                                <Text variant="body" color="muted">200+ employés</Text>
                            </div>
                        </div>
                        <Badge variant="primary" size="sm" icon={<CheckCircle size={12} />}>
                            Certifié
                        </Badge>
                    </div>

                    {/* Infos entreprise */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <Globe size={16} className="text-muted-foreground" />
                            <Text variant="small">techcorp.com</Text>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-muted-foreground" />
                            <Text variant="small">Paris, Lyon, Bordeaux</Text>
                        </div>
                        <div className="flex items-center gap-2">
                            <Briefcase size={16} className="text-muted-foreground" />
                            <Text variant="small">SaaS • Cloud</Text>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users size={16} className="text-muted-foreground" />
                            <Text variant="small">12 postes ouverts</Text>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="success" size="sm">Tech</Badge>
                        <Badge variant="info" size="sm">Innovation</Badge>
                        <Badge variant="outline" size="sm">Remote Friendly</Badge>
                        <Badge variant="outline" size="sm">Startup</Badge>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-border/50">
                        <Button variant="primary" size="md">
                            <Plus size={18} className="mr-2" />
                            Postuler
                        </Button>
                        <Button variant="outline" size="md">
                            En savoir plus
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Carte d\'entreprise avec informations et postes ouverts.',
            },
        },
    },
};

// ============ ÉDUCATION ============

export const EducationCard: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <Card
                variant="elevated"
                radius="lg"
                shadow="md"
                className="overflow-hidden"
            >
                <div className="space-y-4 p-2">
                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <GraduationCap size={32} className="text-primary" />
                        </div>
                        <div className="flex-1">
                            <Text variant="h4" className="font-bold">Master en Informatique</Text>
                            <Text variant="body" color="muted">Université Paris-Saclay</Text>
                            <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-1">
                                    <Calendar size={14} className="text-muted-foreground" />
                                    <Text variant="small" color="muted">2020 - 2023</Text>
                                </div>
                                <Badge variant="success" size="sm">
                                    Diplômé avec mention
                                </Badge>
                            </div>
                            <div className="mt-3 p-3 bg-muted/10 rounded-lg">
                                <Text variant="small">
                                    Spécialisation en Intelligence Artificielle et Data Science
                                </Text>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Carte de formation avec diplôme et spécialisation.',
            },
        },
    },
};

// ============ EXPÉRIENCE ============

export const ExperienceCard: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <Card
                variant="default"
                radius="lg"
                shadow="sm"
                className="overflow-hidden"
            >
                <div className="space-y-4 p-2">
                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
                            <Briefcase size={32} className="text-success" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-start justify-between">
                                <div>
                                    <Text variant="h4" className="font-bold">Lead Developer</Text>
                                    <Text variant="body" color="muted">TechCorp Solutions</Text>
                                </div>
                                <Badge variant="primary" size="sm">Actuel</Badge>
                            </div>
                            <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-1">
                                    <Calendar size={14} className="text-muted-foreground" />
                                    <Text variant="small" color="muted">2021 - Présent</Text>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin size={14} className="text-muted-foreground" />
                                    <Text variant="small" color="muted">Paris</Text>
                                </div>
                            </div>
                            <div className="mt-3 space-y-1">
                                <div className="flex items-start gap-2">
                                    <CheckCircle size={14} className="text-success mt-0.5 shrink-0" />
                                    <Text variant="small">Management d'une équipe de 12 développeurs</Text>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle size={14} className="text-success mt-0.5 shrink-0" />
                                    <Text variant="small">Architecture de microservices avec Node.js</Text>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle size={14} className="text-success mt-0.5 shrink-0" />
                                    <Text variant="small">Mise en place de CI/CD avec Docker et Kubernetes</Text>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Carte d\'expérience professionnelle avec réalisations.',
            },
        },
    },
};

// ============ CONTACT AVEC RÉSEAUX ============

export const SocialContactCard: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <Card
                variant="glass"
                radius="lg"
                shadow="md"
                className="overflow-hidden"
            >
                <div className="space-y-4 p-2">
                    <div className="flex items-center gap-4">
                        <Avatar
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                            name="Thomas Martin"
                            size="xl"
                        />
                        <div className="flex-1">
                            <Text variant="h4" className="font-bold">Thomas Martin</Text>
                            <Text variant="body" color="muted">Développeur Full Stack</Text>
                            <div className="flex items-center gap-2 mt-1">
                                <MapPin size={14} className="text-muted-foreground" />
                                <Text variant="small" color="muted">Paris, France</Text>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/10">
                            <Mail size={16} className="text-muted-foreground" />
                            <Text variant="small">thomas@email.com</Text>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/10">
                            <Phone size={16} className="text-muted-foreground" />
                            <Text variant="small">+33 6 12 34 56 78</Text>
                        </div>
                    </div>

                    {/* Réseaux sociaux */}
                    <div className="flex gap-3 pt-4 border-t border-border/50">
                        <Button variant="outline" size="sm" className="gap-2">
                            <TwitterIcon />
                            Twitter
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                            <LinkedinIcon />
                            LinkedIn
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                            <GithubIcon />
                            GitHub
                        </Button>
                    </div>

                    <Button variant="primary" size="md" className="w-full">
                        <MessageCircle size={18} className="mr-2" />
                        Contacter
                    </Button>
                </div>
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Carte de contact avec réseaux sociaux.',
            },
        },
    },
};

// ============ AUTRES CARTES EXISTANTES ============

export const DoctorCard: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <Card
                variant="default"
                radius="lg"
                shadow="md"
                hoverable
                className="overflow-hidden"
            >
                <div className="flex gap-6 p-2">
                    <Avatar
                        src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face"
                        name="Dr. Jean Dupont"
                        size="xl"
                        status="online"
                        shape="rounded"
                    />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                            <div>
                                <Text variant="h4" className="font-bold">Dr. Jean Dupont</Text>
                                <Text variant="body" color="muted">Cardiologue</Text>
                            </div>
                            <div className="flex items-center gap-1">
                                <Star size={16} className="fill-warning text-warning" />
                                <span className="text-base font-semibold">4.8</span>
                                <span className="text-sm text-muted-foreground">(124 avis)</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mt-3">
                            <Badge variant="primary" size="sm">Cardiologie</Badge>
                            <Badge variant="secondary" size="sm">Échographie</Badge>
                            <Badge variant="outline" size="sm">+2</Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border/50">
                            <div>
                                <div className="flex items-center gap-2">
                                    <Users size={16} className="text-primary" />
                                    <span className="text-base font-semibold">1 234</span>
                                </div>
                                <Text variant="small" color="muted">Patients</Text>
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-primary" />
                                    <span className="text-base font-semibold">10 ans</span>
                                </div>
                                <Text variant="small" color="muted">Expérience</Text>
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <DollarSign size={16} className="text-success" />
                                    <span className="text-base font-semibold">50€</span>
                                </div>
                                <Text variant="small" color="muted">Consultation</Text>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Calendar size={18} className="text-primary" />
                            <div>
                                <Text variant="body" className="font-medium">Prochain créneau</Text>
                                <Text variant="small" color="muted">Aujourd'hui • 14:30</Text>
                            </div>
                        </div>
                        <Button variant="primary" size="md">
                            Réserver
                            <ArrowRight size={16} className="ml-2" />
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Carte médecin avec avatar, spécialités, métriques et réservation.',
            },
        },
    },
};

export const ProductCard: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <Card
                image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=400&fit=crop"
                imageHeight="240px"
                badge="Promo -20%"
                variant="default"
                radius="lg"
                shadow="md"
                hoverable
                className="overflow-hidden"
            >
                <div className="space-y-4 p-2">
                    <div className="flex items-start justify-between">
                        <div>
                            <Text variant="h4" className="font-bold">Montre Connectée Pro</Text>
                            <Text variant="body" color="muted">Édition limitée</Text>
                        </div>
                        <div className="flex gap-0.5">
                            <Star size={16} className="fill-warning text-warning" />
                            <Star size={16} className="fill-warning text-warning" />
                            <Star size={16} className="fill-warning text-warning" />
                            <Star size={16} className="fill-warning text-warning" />
                            <Star size={16} className="text-muted" />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Badge variant="success" size="sm">En stock</Badge>
                        <Badge variant="warning" size="sm">Livraison 24h</Badge>
                        <Badge variant="outline" size="sm">Garantie 2 ans</Badge>
                    </div>

                    <div className="flex items-end justify-between pt-4 border-t border-border/50">
                        <div>
                            <Text variant="h3" className="font-bold text-primary">199,99€</Text>
                            <Text variant="body" color="muted" className="line-through">249,99€</Text>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" size="md">
                                <Heart size={18} />
                            </Button>
                            <Button variant="primary" size="md">
                                Ajouter au panier
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Carte produit avec image, badge, prix et actions.',
            },
        },
    },
};

export const UserProfileCard: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <Card
                variant="elevated"
                radius="xl"
                shadow="lg"
                className="overflow-hidden text-center"
            >
                <div className="relative">
                    <div className="h-32 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-t-xl" />
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                        <Avatar
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                            name="Thomas Martin"
                            size="xl"
                            bordered
                            borderColor="ring-background"
                        />
                    </div>
                </div>

                <div className="mt-12 pt-4">
                    <Text variant="h4" className="font-bold">Thomas Martin</Text>
                    <Text variant="body" color="muted">Développeur Full Stack</Text>

                    <div className="flex justify-center gap-6 mt-4">
                        <div className="text-center">
                            <Text variant="h5" className="font-bold">1.2k</Text>
                            <Text variant="small" color="muted">Abonnés</Text>
                        </div>
                        <div className="w-px bg-border" />
                        <div className="text-center">
                            <Text variant="h5" className="font-bold">45</Text>
                            <Text variant="small" color="muted">Projets</Text>
                        </div>
                        <div className="w-px bg-border" />
                        <div className="text-center">
                            <Text variant="h5" className="font-bold">8</Text>
                            <Text variant="small" color="muted">Récompenses</Text>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 mt-6 pt-6 border-t border-border/50">
                        <Button variant="primary" size="md">
                            <MessageCircle size={18} className="mr-2" />
                            Contacter
                        </Button>
                        <Button variant="outline" size="md">
                            <User size={18} className="mr-2" />
                            Profil
                        </Button>
                        <Button variant="ghost" size="md">
                            <Share2 size={18} />
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Carte de profil utilisateur avec bannière, avatar et statistiques.',
            },
        },
    },
};

export const StatsCard: Story = {
    render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
            <Card variant="default" radius="lg" shadow="sm" className="text-center p-6">
                <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-full bg-primary/10 text-primary">
                    <Users size={28} />
                </div>
                <Text variant="h3" className="font-bold mt-4">12 847</Text>
                <Text variant="body" color="muted">Utilisateurs actifs</Text>
                <div className="flex items-center justify-center gap-1 mt-3 text-success">
                    <TrendingUp size={16} />
                    <span className="text-base font-medium">+12%</span>
                </div>
            </Card>

            <Card variant="default" radius="lg" shadow="sm" className="text-center p-6">
                <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-full bg-success/10 text-success">
                    <DollarSign size={28} />
                </div>
                <Text variant="h3" className="font-bold mt-4">€89 432</Text>
                <Text variant="body" color="muted">Revenus totaux</Text>
                <div className="flex items-center justify-center gap-1 mt-3 text-success">
                    <TrendingUp size={16} />
                    <span className="text-base font-medium">+8.5%</span>
                </div>
            </Card>

            <Card variant="default" radius="lg" shadow="sm" className="text-center p-6">
                <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-full bg-warning/10 text-warning">
                    <Activity size={28} />
                </div>
                <Text variant="h3" className="font-bold mt-4">1 234</Text>
                <Text variant="body" color="muted">Transactions</Text>
                <div className="flex items-center justify-center gap-1 mt-3 text-warning">
                    <TrendingUp size={16} />
                    <span className="text-base font-medium">+5.2%</span>
                </div>
            </Card>

            <Card variant="default" radius="lg" shadow="sm" className="text-center p-6">
                <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-full bg-destructive/10 text-destructive">
                    <AlertCircle size={28} />
                </div>
                <Text variant="h3" className="font-bold mt-4">3</Text>
                <Text variant="body" color="muted">Alertes critiques</Text>
                <div className="flex items-center justify-center gap-1 mt-3 text-destructive">
                    <span className="text-base font-medium">Urgent</span>
                </div>
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Cartes de statistiques avec métriques et tendances.',
            },
        },
    },
};

export const ServiceCard: Story = {
    render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
            <Card
                variant="gradient"
                gradientFrom="primary"
                gradientTo="secondary"
                radius="lg"
                shadow="md"
                hoverable
                className="text-center p-8"
            >
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <Stethoscope size={36} className="text-foreground" />
                </div>
                <Text variant="h4" className="font-bold text-foreground mt-4">Consultation</Text>
                <Text className="text-foreground/80 text-base">
                    Consultation médicale complète avec spécialiste
                </Text>
                <div className="mt-4 flex items-center justify-center gap-4">
                    <Badge variant="outline" className="text-foreground text-sm px-3 py-1">30 min</Badge>
                    <Badge variant="outline" className="text-foreground text-sm px-3 py-1">50€</Badge>
                </div>
                <Button variant="ghost" className="mt-6 text-foreground hover:bg-foreground/10 text-base px-6 py-2">
                    En savoir plus
                    <ArrowRight size={18} className="ml-2" />
                </Button>
            </Card>

            <Card
                variant="glass"
                radius="lg"
                shadow="md"
                hoverable
                className="text-center p-8"
            >
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <Award size={36} className="text-primary" />
                </div>
                <Text variant="h4" className="font-bold text-foreground mt-4">Expertise</Text>
                <Text color="muted" className="text-base">
                    Service d'expertise avec des professionnels certifiés
                </Text>
                <div className="mt-4 flex items-center justify-center gap-4">
                    <Badge variant="primary" size="md">Certifié</Badge>
                    <Badge variant="success" size="md">Reconnu</Badge>
                </div>
                <Button variant="primary" className="mt-6 text-base px-6 py-2">
                    Découvrir
                    <ArrowRight size={18} className="ml-2" />
                </Button>
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Cartes de services avec différents styles.',
            },
        },
    },
};

export const ReviewCard: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <Card variant="default" radius="lg" shadow="sm" className="overflow-hidden p-6">
                <div className="flex items-start gap-4">
                    <Avatar
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                        name="Marie Dubois"
                        size="lg"
                    />
                    <div className="flex-1">
                        <div className="flex items-start justify-between">
                            <div>
                                <Text variant="h5" className="font-semibold">Marie Dubois</Text>
                                <div className="flex items-center gap-1 mt-1">
                                    <Star size={16} className="fill-warning text-warning" />
                                    <Star size={16} className="fill-warning text-warning" />
                                    <Star size={16} className="fill-warning text-warning" />
                                    <Star size={16} className="fill-warning text-warning" />
                                    <Star size={16} className="fill-warning text-warning" />
                                </div>
                            </div>
                            <Text variant="small" color="muted">2 jours</Text>
                        </div>
                        <Text className="mt-3 text-base">
                            Service exceptionnel ! L'équipe est très professionnelle
                            et à l'écoute. Je recommande vivement.
                        </Text>
                        <div className="flex gap-4 mt-4 pt-4 border-t border-border/50">
                            <Button variant="ghost" size="md">
                                <Heart size={16} className="mr-2" />
                                24
                            </Button>
                            <Button variant="ghost" size="md">
                                <MessageCircle size={16} className="mr-2" />
                                Répondre
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Carte d\'avis utilisateur avec notes et interactions.',
            },
        },
    },
};

export const EventCard: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <Card
                image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop"
                imageHeight="180px"
                variant="default"
                radius="lg"
                shadow="md"
                hoverable
                className="overflow-hidden"
            >
                <div className="flex items-start gap-4 p-2">
                    <div className="flex-shrink-0 text-center">
                        <div className="w-16 h-16 rounded-lg bg-primary/10 flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold text-primary">15</span>
                            <span className="text-xs text-primary font-medium">Juil</span>
                        </div>
                    </div>
                    <div className="flex-1">
                        <Text variant="h4" className="font-bold">Conférence Tech 2026</Text>
                        <Text variant="body" color="muted">Paris, France</Text>
                        <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-2">
                                <Clock size={16} className="text-muted-foreground" />
                                <Text variant="small" color="muted">14:00 - 18:00</Text>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users size={16} className="text-muted-foreground" />
                                <Text variant="small" color="muted">120 participants</Text>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-4">
                            <Button variant="primary" size="md">S'inscrire</Button>
                            <Button variant="outline" size="md">En savoir plus</Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Carte d\'événement avec date, lieu et inscription.',
            },
        },
    },
};

export const InteractivePlayground: Story = {
    args: {
        children: (
            <div className="space-y-4 p-2">
                <Text variant="h4">Playground</Text>
                <Text color="muted" className="text-base">Testez les options dans le panneau de contrôle.</Text>
                <div className="mt-3 p-4 bg-muted/10 rounded-lg">
                    <Text variant="body" className="font-mono">
                        Variant: default • Size: md • Radius: lg
                    </Text>
                </div>
                <div className="flex gap-3">
                    <Badge variant="primary" size="md">Interactif</Badge>
                    <Badge variant="success" size="md">Personnalisable</Badge>
                </div>
            </div>
        ),
        variant: 'default',
        size: 'md',
        padding: 6,
        radius: 'lg',
        shadow: 'md',
        border: true,
        hoverable: true,
        interactive: true,
        className: 'w-full max-w-2xl',
    },
    parameters: {
        docs: {
            description: {
                story: 'Playground interactif pour tester toutes les options.',
            },
        },
    },
};