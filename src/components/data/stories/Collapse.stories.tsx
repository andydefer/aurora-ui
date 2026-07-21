// src/components/data/stories/Collapse.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Collapse } from '../Collapse';
import { useState } from 'react';
import { Card } from '../../overlay/Card';
import { Text } from '../../typography/Text';
import { Button } from '../../forms/Button';
import { Badge } from '../../feedback/Badge';
import { Avatar } from '../../media/Avatar';
import { Mail, Phone, MapPin, Calendar, ChevronDown, ChevronUp, Star, Heart, Share2, MessageCircle, AlertCircle, Check, } from 'lucide-react';

const meta: Meta<typeof Collapse> = {
    title: 'Data/Collapse',
    component: Collapse,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un composant pour afficher/masquer du contenu avec animation.',
            },
        },
    },
    argTypes: {
        timeout: {
            control: 'number',
            description: 'Durée de l\'animation en ms',
        },
        dimension: {
            control: 'select',
            options: ['height', 'width'],
            description: 'Dimension de l\'animation',
        },
        showToggle: {
            control: 'boolean',
            description: 'Afficher un bouton de toggle',
        },
        toggleText: {
            control: 'text',
            description: 'Texte du bouton de toggle',
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'destructive', 'success', 'warning'],
            description: 'Couleur du toggle',
        },
        iconPosition: {
            control: 'select',
            options: ['left', 'right'],
            description: 'Position de l\'icône',
        },
        toggleVariant: {
            control: 'select',
            options: ['default', 'outline', 'ghost'],
            description: 'Variante du toggle',
        },
        toggleSize: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Taille du toggle',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Collapse>;

export const Default: Story = {
    render: () => {
        const [open, setOpen] = useState(true);

        return (
            <div className="w-full max-w-2xl space-y-4">
                <Button variant="primary" onClick={() => setOpen(!open)}>
                    {open ? 'Masquer' : 'Afficher'} le contenu
                </Button>
                <Collapse in={open} timeout={400}>
                    <Card variant="default" radius="lg" shadow="sm" className="p-6 mt-2">
                        <div className="flex items-start gap-4">
                            <Avatar
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                                name="Thomas Martin"
                                size="lg"
                                shape="rounded"
                            />
                            <div className="flex-1">
                                <Text variant="h5" className="font-bold">Thomas Martin</Text>
                                <Text variant="body" color="muted">Développeur Full Stack</Text>
                                <div className="grid grid-cols-2 gap-2 mt-3">
                                    <div className="flex items-center gap-2">
                                        <Mail size={14} className="text-muted-foreground" />
                                        <Text variant="small">thomas@email.com</Text>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone size={14} className="text-muted-foreground" />
                                        <Text variant="small">+33 6 12 34 56 78</Text>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={14} className="text-muted-foreground" />
                                        <Text variant="small">Paris, France</Text>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-muted-foreground" />
                                        <Text variant="small">Membre depuis 2023</Text>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border/50">
                                    <Badge variant="primary">React</Badge>
                                    <Badge variant="success">TypeScript</Badge>
                                    <Badge variant="warning">Node.js</Badge>
                                    <Badge variant="outline">Tailwind</Badge>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Collapse>
            </div>
        );
    },
};

export const WithToggle: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <Collapse
                in={false}
                showToggle
                toggleText="Afficher les détails du produit"
                color="primary"
                timeout={400}
                iconPosition="right"
                toggleVariant="default"
            >
                <Card variant="default" radius="lg" shadow="sm" className="p-6 mt-3">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <img
                                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop"
                                alt="Produit"
                                className="w-20 h-20 rounded-lg object-cover"
                            />
                            <div>
                                <Text variant="h5" className="font-bold">Montre Connectée Pro</Text>
                                <Text variant="body" color="muted">Édition limitée</Text>
                                <div className="flex items-center gap-2 mt-1">
                                    <Star size={14} className="fill-warning text-warning" />
                                    <span className="text-sm font-semibold">4.8</span>
                                    <span className="text-xs text-muted-foreground">(124 avis)</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 p-3 bg-muted/10 rounded-lg">
                            <div className="text-center">
                                <Text variant="h6" className="font-bold text-primary">199,99€</Text>
                                <Text variant="caption" color="muted">Prix</Text>
                            </div>
                            <div className="text-center">
                                <Text variant="h6" className="font-bold">24 mois</Text>
                                <Text variant="caption" color="muted">Garantie</Text>
                            </div>
                            <div className="text-center">
                                <Badge variant="success" dot>En stock</Badge>
                            </div>
                        </div>
                        <Button variant="primary" className="w-full">
                            Ajouter au panier
                        </Button>
                    </div>
                </Card>
            </Collapse>
        </div>
    ),
};

export const WithOutlineToggle: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <Collapse
                in={false}
                showToggle
                toggleText="Afficher les détails"
                color="primary"
                timeout={400}
                toggleVariant="outline"
            >
                <Card variant="default" radius="lg" shadow="sm" className="p-6 mt-3">
                    <div className="space-y-3">
                        <Text variant="h5" className="font-bold">Détails du produit</Text>
                        <div className="flex justify-between py-2 border-b border-border/50">
                            <Text variant="small" color="muted">Marque</Text>
                            <Text variant="small" className="font-medium">Apple</Text>
                        </div>
                        <div className="flex justify-between py-2 border-b border-border/50">
                            <Text variant="small" color="muted">Modèle</Text>
                            <Text variant="small" className="font-medium">Pro Max</Text>
                        </div>
                        <div className="flex justify-between py-2">
                            <Text variant="small" color="muted">Couleur</Text>
                            <Text variant="small" className="font-medium">Noir</Text>
                        </div>
                    </div>
                </Card>
            </Collapse>
        </div>
    ),
};

export const WithGhostToggle: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <Collapse
                in={false}
                showToggle
                toggleText="Afficher les commentaires"
                color="primary"
                timeout={400}
                toggleVariant="ghost"
                iconPosition="left"
            >
                <div className="mt-3 space-y-3">
                    <Card variant="default" radius="md" shadow="sm" border className="p-4">
                        <div className="flex items-start gap-3">
                            <Avatar
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                                name="Marie Dubois"
                                size="md"
                                shape="rounded"
                            />
                            <div className="flex-1">
                                <Text variant="h6" className="font-semibold">Marie Dubois</Text>
                                <Text className="mt-1 text-sm">Excellent service, je recommande !</Text>
                                <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="primary" size="sm">Utile</Badge>
                                    <Text variant="caption" color="muted">Il y a 2 jours</Text>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card variant="default" radius="md" shadow="sm" border className="p-4">
                        <div className="flex items-start gap-3">
                            <Avatar
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                                name="Jean Dupont"
                                size="md"
                                shape="rounded"
                            />
                            <div className="flex-1">
                                <Text variant="h6" className="font-semibold">Jean Dupont</Text>
                                <Text className="mt-1 text-sm">Très satisfait du produit.</Text>
                                <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="success" size="sm">Achat vérifié</Badge>
                                    <Text variant="caption" color="muted">Il y a 3 jours</Text>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </Collapse>
        </div>
    ),
};

export const CommentCollapse: Story = {
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <div className="w-full max-w-2xl space-y-4">
                <Card variant="default" radius="lg" shadow="sm" className="p-4">
                    <div className="flex items-start gap-3">
                        <Avatar
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                            name="Marie Dubois"
                            size="md"
                            shape="rounded"
                        />
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <Text variant="h6" className="font-semibold">Marie Dubois</Text>
                                <Text variant="caption" color="muted">Il y a 2 jours</Text>
                            </div>
                            <Text className="mt-1 text-sm">
                                Service exceptionnel ! L'équipe est très professionnelle et à l'écoute.
                            </Text>
                            <div className="flex items-center gap-4 mt-2">
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
                                <button
                                    onClick={() => setOpen(!open)}
                                    className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                                >
                                    {open ? 'Masquer la réponse' : 'Voir la réponse'}
                                    {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>
                <Collapse in={open} timeout={300}>
                    <Card variant="default" radius="md" shadow="sm" border className="p-4 ml-12 bg-muted/5">
                        <div className="flex items-start gap-3">
                            <Avatar
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                                name="Jean Dupont"
                                size="sm"
                                shape="rounded"
                            />
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <Text variant="h6" className="font-semibold text-sm">Jean Dupont</Text>
                                    <Text variant="caption" color="muted">Il y a 1 jour</Text>
                                </div>
                                <Text className="mt-1 text-sm">
                                    Merci pour votre retour ! Nous sommes ravis que vous ayez apprécié notre service.
                                </Text>
                            </div>
                        </div>
                    </Card>
                </Collapse>
            </div>
        );
    },
};

export const FAQCollapse: Story = {
    render: () => {
        const [openIndex, setOpenIndex] = useState<number | null>(null);

        const faqs = [
            {
                question: 'Qu\'est-ce qu\'un design system ?',
                answer: 'Un design system est un ensemble de composants réutilisables, de règles de conception et de standards qui permettent de créer des interfaces cohérentes et évolutives.'
            },
            {
                question: 'Comment utiliser les composants ?',
                answer: 'Les composants sont disponibles via des imports depuis le package. Consultez la documentation pour plus de détails sur chaque composant.'
            },
            {
                question: 'Est-ce que le système est accessible ?',
                answer: 'Oui, tous les composants sont conçus avec l\'accessibilité en tête et respectent les standards WCAG 2.1.'
            },
        ];

        return (
            <div className="w-full max-w-2xl space-y-2">
                {faqs.map((faq, index) => (
                    <div key={index}>
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-muted/5 transition-colors"
                        >
                            <Text className="font-medium">{faq.question}</Text>
                            {openIndex === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                        <Collapse in={openIndex === index} timeout={300}>
                            <div className="p-4 bg-muted/5 border border-t-0 border-border rounded-b-lg">
                                <Text color="muted">{faq.answer}</Text>
                            </div>
                        </Collapse>
                    </div>
                ))}
            </div>
        );
    },
};

export const SuccessColor: Story = {
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <div className="w-full max-w-2xl space-y-4">
                <Button variant="success" onClick={() => setOpen(!open)}>
                    {open ? 'Masquer' : 'Afficher'}
                </Button>
                <Collapse in={open} timeout={400} color="success">
                    <Card variant="default" radius="lg" shadow="sm" className="p-6 mt-2 border-success/20">
                        <div className="flex items-center gap-3 text-success">
                            <Check size={24} />
                            <Text variant="h5" className="font-bold">Succès !</Text>
                        </div>
                        <Text color="muted" className="mt-2">
                            Votre action a été réalisée avec succès.
                        </Text>
                    </Card>
                </Collapse>
            </div>
        );
    },
};

export const DangerColor: Story = {
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <div className="w-full max-w-2xl space-y-4">
                <Button variant="destructive" onClick={() => setOpen(!open)}>
                    {open ? 'Masquer' : 'Afficher'}
                </Button>
                <Collapse in={open} timeout={400} color="destructive">
                    <Card variant="default" radius="lg" shadow="sm" className="p-6 mt-2 border-destructive/20">
                        <div className="flex items-center gap-3 text-destructive">
                            <AlertCircle size={24} />
                            <Text variant="h5" className="font-bold">Erreur</Text>
                        </div>
                        <Text color="muted" className="mt-2">
                            Une erreur inattendue s'est produite.
                        </Text>
                    </Card>
                </Collapse>
            </div>
        );
    },
};

export const InteractivePlayground: Story = {
    args: {
        in: true,
        timeout: 400,
        dimension: 'height',
        showToggle: false,
        toggleText: 'Afficher / Masquer',
        color: 'primary',
        iconPosition: 'right',
        toggleVariant: 'default',
        toggleSize: 'md',
    },
    render: (args) => {
        const [open, setOpen] = useState(true);
        return (
            <div className="w-full max-w-2xl space-y-4">
                <Button variant="primary" onClick={() => setOpen(!open)}>
                    {open ? 'Masquer' : 'Afficher'}
                </Button>
                <Collapse {...args} in={open}>
                    <Card variant="default" radius="lg" shadow="sm" className="p-6 mt-2">
                        <Text variant="h5" className="font-bold">Contenu du collapse</Text>
                        <Text color="muted" className="mt-2">
                            Ce contenu peut être affiché ou masqué avec une animation fluide.
                        </Text>
                        <div className="mt-4 flex gap-2">
                            <Badge variant="primary">React</Badge>
                            <Badge variant="success">TypeScript</Badge>
                            <Badge variant="warning">Tailwind</Badge>
                        </div>
                    </Card>
                </Collapse>
            </div>
        );
    },
};