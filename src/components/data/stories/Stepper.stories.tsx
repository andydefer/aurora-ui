// src/components/data/stories/Stepper.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from '../Stepper';
import { useState, useEffect } from 'react';
import { Button } from '../../forms/Button';
import { Text } from '../../typography/Text';
import { Card } from '../../overlay/Card';
import { Badge } from '../../feedback/Badge';
import { User, Settings, Check, ShoppingBag, CreditCard, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';

const meta: Meta<typeof Stepper> = {
    title: 'Data/Stepper',
    component: Stepper,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un stepper pour guider l\'utilisateur à travers des étapes.',
            },
        },
    },
    argTypes: {
        orientation: {
            control: 'select',
            options: ['horizontal', 'vertical'],
            description: 'Orientation du stepper',
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'destructive', 'success', 'warning'],
            description: 'Couleur d\'accentuation',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Taille du stepper',
        },
        alternativeLabel: {
            control: 'boolean',
            description: 'Libellés alternatifs',
        },
        clickable: {
            control: 'boolean',
            description: 'Rendre les étapes cliquables',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

// ============ DONNÉES ============

const checkoutSteps = [
    { label: 'Panier', description: 'Vérifiez vos articles', icon: <ShoppingBag size={16} /> },
    { label: 'Livraison', description: 'Choisissez votre adresse', icon: <MapPin size={16} /> },
    { label: 'Paiement', description: 'Finalisez votre commande', icon: <CreditCard size={16} /> },
    { label: 'Confirmation', description: 'Récapitulatif', icon: <Check size={16} /> },
];

const profileSteps = [
    { label: 'Informations', description: 'Nom, email, téléphone', icon: <User size={16} /> },
    { label: 'Adresse', description: 'Votre adresse de livraison', icon: <MapPin size={16} /> },
    { label: 'Préférences', description: 'Paramètres du compte', icon: <Settings size={16} /> },
    { label: 'Validation', description: 'Confirmez vos données', icon: <Check size={16} /> },
];

const onboardingSteps = [
    { label: 'Bienvenue', description: 'Découvrez l\'application', optional: true },
    { label: 'Profil', description: 'Créez votre profil', optional: false },
    { label: 'Intérêts', description: 'Choisissez vos centres d\'intérêt', optional: true },
    { label: 'Terminé', description: 'Prêt à commencer !', optional: false },
];

// ============ STORIES ============

export const CheckoutStepper: Story = {
    render: () => {
        const [active, setActive] = useState(0);

        return (
            <div className="w-full max-w-3xl space-y-6">
                <Stepper
                    steps={checkoutSteps}
                    active={active}
                    orientation="horizontal"
                    color="primary"
                    size="md"
                    clickable
                    onStepClick={setActive}
                />
                <Card variant="default" radius="lg" shadow="sm" className="p-6 text-center">
                    <Text variant="h5" className="font-bold">
                        Étape {active + 1}: {checkoutSteps[active].label}
                    </Text>
                    <Text color="muted" className="mt-2">
                        {checkoutSteps[active].description}
                    </Text>
                    <div className="flex gap-3 mt-4 justify-center">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setActive(Math.max(0, active - 1))}
                            disabled={active === 0}
                        >
                            Précédent
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setActive(Math.min(checkoutSteps.length - 1, active + 1))}
                            disabled={active === checkoutSteps.length - 1}
                        >
                            Suivant
                        </Button>
                    </div>
                </Card>
            </div>
        );
    },
};

export const CheckoutStepperVertical: Story = {
    render: () => {
        const [active, setActive] = useState(0);

        return (
            <div className="w-full max-w-2xl space-y-6">
                <Stepper
                    steps={checkoutSteps}
                    active={active}
                    orientation="vertical"
                    color="primary"
                    size="md"
                    clickable
                    onStepClick={setActive}
                />
                <Card variant="default" radius="lg" shadow="sm" className="p-6 text-center">
                    <Text variant="h5" className="font-bold">
                        Étape {active + 1}: {checkoutSteps[active].label}
                    </Text>
                    <Text color="muted" className="mt-2">
                        {checkoutSteps[active].description}
                    </Text>
                    <div className="flex gap-3 mt-4 justify-center">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setActive(Math.max(0, active - 1))}
                            disabled={active === 0}
                        >
                            Précédent
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setActive(Math.min(checkoutSteps.length - 1, active + 1))}
                            disabled={active === checkoutSteps.length - 1}
                        >
                            Suivant
                        </Button>
                    </div>
                </Card>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Stepper de paiement en mode vertical.',
            },
        },
    },
};

export const ProfileStepper: Story = {
    render: () => {
        const [active, setActive] = useState(0);

        return (
            <div className="w-full max-w-3xl space-y-6">
                <Stepper
                    steps={profileSteps}
                    active={active}
                    orientation="vertical"
                    color="success"
                    size="lg"
                    clickable
                    onStepClick={setActive}
                />
                <Card variant="default" radius="lg" shadow="sm" className="p-6 text-center">
                    <Text variant="h5" className="font-bold">
                        Étape {active + 1}: {profileSteps[active].label}
                    </Text>
                    <Text color="muted" className="mt-2">
                        {profileSteps[active].description}
                    </Text>
                    <div className="flex gap-3 mt-4 justify-center">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setActive(Math.max(0, active - 1))}
                            disabled={active === 0}
                        >
                            Précédent
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setActive(Math.min(profileSteps.length - 1, active + 1))}
                            disabled={active === profileSteps.length - 1}
                        >
                            Suivant
                        </Button>
                    </div>
                </Card>
            </div>
        );
    },
};

export const OnboardingStepper: Story = {
    render: () => {
        const [active, setActive] = useState(0);

        return (
            <div className="w-full max-w-3xl space-y-6">
                <Stepper
                    steps={onboardingSteps}
                    active={active}
                    orientation="horizontal"
                    color="warning"
                    size="sm"
                    alternativeLabel
                />
                <Card variant="default" radius="lg" shadow="sm" className="p-6 text-center">
                    <Text variant="h5" className="font-bold">
                        Étape {active + 1}: {onboardingSteps[active].label}
                    </Text>
                    <Text color="muted" className="mt-2">
                        {onboardingSteps[active].description}
                    </Text>
                    <div className="flex gap-3 mt-4 justify-center">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setActive(Math.max(0, active - 1))}
                            disabled={active === 0}
                        >
                            Précédent
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setActive(Math.min(onboardingSteps.length - 1, active + 1))}
                            disabled={active === onboardingSteps.length - 1}
                        >
                            Suivant
                        </Button>
                    </div>
                </Card>
            </div>
        );
    },
};

export const DangerColor: Story = {
    render: () => {
        const [active, setActive] = useState(0);

        return (
            <div className="w-full max-w-3xl">
                <Stepper
                    steps={checkoutSteps}
                    active={active}
                    orientation="horizontal"
                    color="destructive"
                    size="md"
                    clickable
                    onStepClick={setActive}
                />
                <Card variant="default" radius="lg" shadow="sm" className="p-6 mt-6 text-center">
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setActive(Math.min(checkoutSteps.length - 1, active + 1))}
                        disabled={active === checkoutSteps.length - 1}
                    >
                        Étape suivante
                    </Button>
                </Card>
            </div>
        );
    },
};

export const SmallSize: Story = {
    render: () => {
        const [active, setActive] = useState(0);

        return (
            <div className="w-full max-w-3xl">
                <Stepper
                    steps={checkoutSteps}
                    active={active}
                    orientation="horizontal"
                    color="primary"
                    size="sm"
                />
                <Card variant="default" radius="lg" shadow="sm" className="p-6 mt-6 text-center">
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setActive(Math.min(checkoutSteps.length - 1, active + 1))}
                        disabled={active === checkoutSteps.length - 1}
                    >
                        Étape suivante
                    </Button>
                </Card>
            </div>
        );
    },
};

export const LargeSize: Story = {
    render: () => {
        const [active, setActive] = useState(0);

        return (
            <div className="w-full max-w-3xl">
                <Stepper
                    steps={checkoutSteps}
                    active={active}
                    orientation="horizontal"
                    color="primary"
                    size="lg"
                />
                <Card variant="default" radius="lg" shadow="sm" className="p-6 mt-6 text-center">
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setActive(Math.min(checkoutSteps.length - 1, active + 1))}
                        disabled={active === checkoutSteps.length - 1}
                    >
                        Étape suivante
                    </Button>
                </Card>
            </div>
        );
    },
};

export const AutoScrollStepper: Story = {
    render: () => {
        const [active, setActive] = useState(0);
        const totalSteps = checkoutSteps.length;

        useEffect(() => {
            const interval = setInterval(() => {
                setActive((prev) => (prev + 1) % totalSteps);
            }, 3000);
            return () => clearInterval(interval);
        }, []);

        return (
            <div className="w-full max-w-3xl space-y-6">
                <div className="flex items-center justify-between">
                    <Text variant="h5" className="font-bold">⏳ Défilement automatique</Text>
                    <Badge variant="primary">Auto-play</Badge>
                </div>
                <Stepper
                    steps={checkoutSteps}
                    active={active}
                    orientation="horizontal"
                    color="primary"
                    size="md"
                />
                <Card variant="default" radius="lg" shadow="sm" className="p-6 text-center">
                    <Text variant="h5" className="font-bold">
                        Étape {active + 1}: {checkoutSteps[active].label}
                    </Text>
                    <Text color="muted" className="mt-2">
                        {checkoutSteps[active].description}
                    </Text>
                    <div className="flex gap-3 mt-4 justify-center">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setActive((prev) => (prev - 1 + totalSteps) % totalSteps)}
                        >
                            Précédent
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setActive((prev) => (prev + 1) % totalSteps)}
                        >
                            Suivant
                        </Button>
                    </div>
                </Card>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Stepper avec défilement automatique toutes les 3 secondes.',
            },
        },
    },
};

export const SuccessColorVertical: Story = {
    render: () => {
        const [active, setActive] = useState(0);

        return (
            <div className="w-full max-w-2xl space-y-6">
                <div className="flex items-center justify-between">
                    <Text variant="h5" className="font-bold">✅ Profil utilisateur</Text>
                    <Badge variant="success">Étape {active + 1}/{profileSteps.length}</Badge>
                </div>
                <Stepper
                    steps={profileSteps}
                    active={active}
                    orientation="vertical"
                    color="success"
                    size="md"
                    clickable
                    onStepClick={setActive}
                />
                <Card variant="default" radius="lg" shadow="sm" className="p-6 text-center">
                    <Text variant="h5" className="font-bold text-success">
                        Étape {active + 1}: {profileSteps[active].label}
                    </Text>
                    <Text color="muted" className="mt-2">
                        {profileSteps[active].description}
                    </Text>
                    <div className="flex gap-3 mt-4 justify-center">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setActive(Math.max(0, active - 1))}
                            disabled={active === 0}
                            icon={<ArrowLeft size={14} />}
                        >
                            Précédent
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setActive(Math.min(profileSteps.length - 1, active + 1))}
                            disabled={active === profileSteps.length - 1}
                            icon={<ArrowRight size={14} />}
                            iconPosition="right"
                        >
                            Suivant
                        </Button>
                    </div>
                </Card>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Stepper vertical avec couleur succès.',
            },
        },
    },
};

export const WarningColorVertical: Story = {
    render: () => {
        const [active, setActive] = useState(0);

        return (
            <div className="w-full max-w-2xl space-y-6">
                <div className="flex items-center justify-between">
                    <Text variant="h5" className="font-bold px-8">⚠️ Processus d'onboarding</Text>
                    <Badge variant="warning">Étape {active + 1}/{onboardingSteps.length}</Badge>
                </div>
                <Stepper
                    steps={onboardingSteps}
                    active={active}
                    orientation="vertical"
                    color="warning"
                    size="lg"
                    clickable
                    onStepClick={setActive}
                    alternativeLabel
                />
                <Card variant="default" radius="lg" shadow="sm" className="p-6 text-center">
                    <Text variant="h5" className="font-bold text-warning">
                        Étape {active + 1}: {onboardingSteps[active].label}
                    </Text>
                    <Text color="muted" className="mt-2">
                        {onboardingSteps[active].description}
                    </Text>
                    <div className="flex gap-3 mt-4 justify-center">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setActive(Math.max(0, active - 1))}
                            disabled={active === 0}
                        >
                            Précédent
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setActive(Math.min(onboardingSteps.length - 1, active + 1))}
                            disabled={active === onboardingSteps.length - 1}
                        >
                            Suivant
                        </Button>
                    </div>
                </Card>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Stepper vertical avec couleur warning.',
            },
        },
    },
};

export const DangerColorVertical: Story = {
    render: () => {
        const [active, setActive] = useState(0);

        return (
            <div className="w-full max-w-2xl space-y-6">
                <div className="flex items-center justify-between">
                    <Text variant="h5" className="font-bold">🔥 Processus critique</Text>
                    <Badge variant="destructive">Étape {active + 1}/{checkoutSteps.length}</Badge>
                </div>
                <Stepper
                    steps={checkoutSteps}
                    active={active}
                    orientation="vertical"
                    color="destructive"
                    size="md"
                    clickable
                    onStepClick={setActive}
                />
                <Card variant="default" radius="lg" shadow="sm" className="p-6 text-center">
                    <Text variant="h5" className="font-bold text-destructive">
                        Étape {active + 1}: {checkoutSteps[active].label}
                    </Text>
                    <Text color="muted" className="mt-2">
                        {checkoutSteps[active].description}
                    </Text>
                    <div className="flex gap-3 mt-4 justify-center">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setActive(Math.max(0, active - 1))}
                            disabled={active === 0}
                        >
                            Précédent
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setActive(Math.min(checkoutSteps.length - 1, active + 1))}
                            disabled={active === checkoutSteps.length - 1}
                        >
                            Suivant
                        </Button>
                    </div>
                </Card>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Stepper vertical avec couleur destructive.',
            },
        },
    },
};


export const InteractivePlayground: Story = {
    args: {
        steps: checkoutSteps,
        active: 0,
        orientation: 'horizontal',
        color: 'primary',
        size: 'md',
        alternativeLabel: false,
        clickable: true,
    },
    render: (args) => {
        const [active, setActive] = useState(0);
        return (
            <div className="w-full max-w-3xl space-y-6">
                <Stepper
                    {...args}
                    active={active}
                    onStepClick={setActive}
                />
                <Card variant="default" radius="lg" shadow="sm" className="p-6 text-center">
                    <Text variant="h5" className="font-bold">Étape {active + 1}</Text>
                    <Text color="muted" className="mt-2">
                        {checkoutSteps[active].description}
                    </Text>
                    <div className="flex gap-3 mt-4 justify-center">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setActive(Math.max(0, active - 1))}
                            disabled={active === 0}
                        >
                            Précédent
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setActive(Math.min(3, active + 1))}
                            disabled={active === 3}
                        >
                            Suivant
                        </Button>
                    </div>
                </Card>
            </div>
        );
    },
};