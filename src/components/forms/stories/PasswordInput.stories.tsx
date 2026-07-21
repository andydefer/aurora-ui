// src/components/forms/stories/PasswordInput.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { PasswordInput } from '../PasswordInput';
import { useState } from 'react';
import { Text } from '../../typography/Text';
import { Badge } from '../../feedback/Badge';
import { Button } from '../Button';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { clsx } from '../../../utils/clsx';
import { fn } from 'storybook/test';

const meta: Meta<typeof PasswordInput> = {
    title: 'Forms/PasswordInput',
    component: PasswordInput,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un champ de mot de passe avec indicateur de force, vérification des règles et modal d\'aide.',
            },
        },
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'],
            description: 'Taille du champ',
        },
        label: { control: 'text' },
        placeholder: { control: 'text' },
        error: { control: 'text' },
        success: { control: 'boolean' },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
        showStrength: { control: 'boolean' },
        showRequirements: { control: 'boolean' },
        showRules: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

// ============ COMPOSANT AVEC ÉTAT ============

const PasswordInputWithState = (args: any) => {
    const [value, setValue] = useState(args.value || '');

    return (
        <div className="w-full max-w-2xl space-y-4">
            <PasswordInput
                {...args}
                value={value}
                onChange={(val) => {
                    setValue(val);
                    args.onChange?.(val);
                }}
            />
            {value && (
                <div className="flex items-center gap-3 text-sm text-muted-foreground p-3 bg-muted/10 rounded-md border border-border/50">
                    <Badge variant="primary" size="sm">Force</Badge>
                    <span className="font-mono">{value.length} caractères</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                        {value}
                    </span>
                </div>
            )}
        </div>
    );
};

// ============ STORIES ============

export const Default: Story = {
    render: (args) => <PasswordInputWithState {...args} />,
    args: {
        label: 'Mot de passe',
        placeholder: 'Entrez votre mot de passe',
        size: 'lg',
        showStrength: true,
        showRequirements: true,
        showRules: true,
        onStrengthChange: fn(),
    },
    parameters: {
        docs: {
            description: {
                story: 'PasswordInput par défaut avec toutes les fonctionnalités.',
            },
        },
    },
};

export const WithValue: Story = {
    render: (args) => <PasswordInputWithState {...args} />,
    args: {
        label: 'Mot de passe',
        placeholder: 'Entrez votre mot de passe',
        value: 'SecurePass123!',
        size: 'lg',
        showStrength: true,
        showRequirements: true,
        showRules: true,
        onStrengthChange: fn(),
    },
    parameters: {
        docs: {
            description: {
                story: 'PasswordInput avec une valeur pré-remplie.',
            },
        },
    },
};

export const WithError: Story = {
    render: (args) => <PasswordInputWithState {...args} />,
    args: {
        label: 'Mot de passe',
        placeholder: 'Entrez votre mot de passe',
        error: 'Le mot de passe doit contenir au moins 8 caractères',
        size: 'lg',
        showStrength: true,
        showRequirements: true,
        onStrengthChange: fn(),
    },
    parameters: {
        docs: {
            description: {
                story: 'PasswordInput avec message d\'erreur.',
            },
        },
    },
};

export const WithSuccess: Story = {
    render: (args) => <PasswordInputWithState {...args} />,
    args: {
        label: 'Mot de passe',
        placeholder: 'Entrez votre mot de passe',
        value: 'SecurePass123!',
        success: true,
        size: 'lg',
        showStrength: true,
        showRequirements: true,
        onStrengthChange: fn(),
    },
    parameters: {
        docs: {
            description: {
                story: 'PasswordInput en état de succès.',
            },
        },
    },
};

export const WithoutStrength: Story = {
    render: (args) => <PasswordInputWithState {...args} />,
    args: {
        label: 'Mot de passe',
        placeholder: 'Entrez votre mot de passe',
        showStrength: false,
        showRequirements: true,
        size: 'lg',
        onStrengthChange: fn(),
    },
    parameters: {
        docs: {
            description: {
                story: 'PasswordInput sans indicateur de force.',
            },
        },
    },
};

export const WithoutRequirements: Story = {
    render: (args) => <PasswordInputWithState {...args} />,
    args: {
        label: 'Mot de passe',
        placeholder: 'Entrez votre mot de passe',
        showStrength: true,
        showRequirements: false,
        size: 'lg',
        onStrengthChange: fn(),
    },
    parameters: {
        docs: {
            description: {
                story: 'PasswordInput sans liste des exigences.',
            },
        },
    },
};

export const WithoutRules: Story = {
    render: (args) => <PasswordInputWithState {...args} />,
    args: {
        label: 'Mot de passe',
        placeholder: 'Entrez votre mot de passe',
        showRules: false,
        showStrength: true,
        showRequirements: true,
        size: 'lg',
        onStrengthChange: fn(),
    },
    parameters: {
        docs: {
            description: {
                story: 'PasswordInput sans bouton "Règles".',
            },
        },
    },
};

export const Disabled: Story = {
    render: (args) => <PasswordInputWithState {...args} />,
    args: {
        label: 'Mot de passe (désactivé)',
        placeholder: 'Entrez votre mot de passe',
        value: 'SecurePass123!',
        disabled: true,
        size: 'lg',
        onStrengthChange: fn(),
    },
    parameters: {
        docs: {
            description: {
                story: 'PasswordInput désactivé.',
            },
        },
    },
};

export const Required: Story = {
    render: (args) => <PasswordInputWithState {...args} />,
    args: {
        label: 'Mot de passe',
        placeholder: 'Entrez votre mot de passe',
        required: true,
        size: 'lg',
        showStrength: true,
        showRequirements: true,
        onStrengthChange: fn(),
    },
    parameters: {
        docs: {
            description: {
                story: 'PasswordInput avec champ requis.',
            },
        },
    },
};


// ============ AVEC USER INFO ============

export const WithUserInfo: Story = {
    render: (args) => <PasswordInputWithState {...args} />,
    args: {
        label: 'Nouveau mot de passe',
        placeholder: 'Entrez votre mot de passe',
        userInfo: {
            name: 'Jean Dupont',
            email: 'jean.dupont@email.com',
        },
        size: 'lg',
        showStrength: true,
        showRequirements: true,
        showRules: true,
        onStrengthChange: fn(),
    },
    parameters: {
        docs: {
            description: {
                story: 'PasswordInput avec vérification des informations personnelles (nom, email).',
            },
        },
    },
};

// ============ FORMULAIRE ============

export const FormExample: Story = {
    render: () => {
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [isValid, setIsValid] = useState(false);

        return (
            <div className="space-y-4 w-full max-w-2xl p-6 bg-card rounded-md border border-border">
                <Text variant="h5" className="font-bold">Créer un compte</Text>

                <div className="space-y-2">
                    <Text variant="small" className="font-medium">Email</Text>
                    <input
                        type="email"
                        placeholder="jean@email.com"
                        className="w-full rounded-md border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                </div>

                <PasswordInput
                    label="Mot de passe"
                    value={password}
                    onChange={setPassword}
                    size="lg"
                    required
                    showStrength
                    showRequirements
                    showRules
                    onStrengthChange={(_, score) => {
                        setIsValid(score >= 80);
                    }}
                />

                <div className="space-y-2">
                    <label className="block font-semibold text-foreground text-base">
                        Confirmer le mot de passe
                        <span className="ml-0.5 text-destructive">*</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Confirmez votre mot de passe"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={clsx(
                            'w-full rounded-md border bg-background text-foreground px-4 py-3 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200',
                            confirmPassword && password !== confirmPassword
                                ? 'border-destructive focus:ring-destructive/20'
                                : confirmPassword && password === confirmPassword
                                    ? 'border-success focus:ring-success/20'
                                    : 'border-border focus:ring-primary/20'
                        )}
                    />
                    {confirmPassword && password !== confirmPassword && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle size={14} />
                            Les mots de passe ne correspondent pas
                        </p>
                    )}
                    {confirmPassword && password === confirmPassword && password.length > 0 && (
                        <p className="text-sm text-success flex items-center gap-1">
                            <CheckCircle size={14} />
                            Les mots de passe correspondent
                        </p>
                    )}
                </div>

                <div className="pt-4 border-t border-border flex gap-3 justify-end">
                    <Button variant="outline" size="lg">Annuler</Button>
                    <Button
                        variant="primary"
                        size="lg"
                        disabled={!isValid || password !== confirmPassword || password.length === 0}
                    >
                        S'inscrire
                    </Button>
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Formulaire d\'inscription complet avec validation du mot de passe.',
            },
        },
    },
};

// ============ COMPARAISON ============

export const Comparison: Story = {
    render: () => {
        const [normal, setNormal] = useState('');
        const [withValue, setWithValue] = useState('SecurePass123!');
        const [withError, setWithError] = useState('pass');
        const [withSuccess, setWithSuccess] = useState('SecurePass123!');
        const [disabled, setDisabled] = useState('SecurePass123!');
        const [required, setRequired] = useState('');
        const [withoutStrength, setWithoutStrength] = useState('');

        return (
            <div className="space-y-6 w-full max-w-2xl">
                <Text variant="h6" className="font-bold">Comparaison des états</Text>

                <div className="space-y-2">
                    <Text variant="small" className="font-medium">Normal</Text>
                    <PasswordInput
                        label="Mot de passe"
                        placeholder="Normal"
                        size="lg"
                        value={normal}
                        onChange={setNormal}
                        onStrengthChange={fn()}
                    />
                </div>

                <div className="space-y-2">
                    <Text variant="small" className="font-medium">Avec valeur</Text>
                    <PasswordInput
                        label="Mot de passe"
                        placeholder="Avec valeur"
                        value={withValue}
                        onChange={setWithValue}
                        size="lg"
                        onStrengthChange={fn()}
                    />
                </div>

                <div className="space-y-2">
                    <Text variant="small" className="font-medium">Avec erreur</Text>
                    <PasswordInput
                        label="Mot de passe"
                        placeholder="Avec erreur"
                        value={withError}
                        onChange={setWithError}
                        error="Mot de passe invalide"
                        size="lg"
                        onStrengthChange={fn()}
                    />
                </div>

                <div className="space-y-2">
                    <Text variant="small" className="font-medium">Avec succès</Text>
                    <PasswordInput
                        label="Mot de passe"
                        placeholder="Avec succès"
                        value={withSuccess}
                        onChange={setWithSuccess}
                        success
                        size="lg"
                        onStrengthChange={fn()}
                    />
                </div>

                <div className="space-y-2">
                    <Text variant="small" className="font-medium">Désactivé</Text>
                    <PasswordInput
                        label="Mot de passe"
                        placeholder="Désactivé"
                        value={disabled}
                        onChange={setDisabled}
                        disabled
                        size="lg"
                        onStrengthChange={fn()}
                    />
                </div>

                <div className="space-y-2">
                    <Text variant="small" className="font-medium">Requis</Text>
                    <PasswordInput
                        label="Mot de passe"
                        placeholder="Requis"
                        value={required}
                        onChange={setRequired}
                        required
                        size="lg"
                        onStrengthChange={fn()}
                    />
                </div>

                <div className="space-y-2">
                    <Text variant="small" className="font-medium">Sans force</Text>
                    <PasswordInput
                        label="Mot de passe"
                        placeholder="Sans force"
                        value={withoutStrength}
                        onChange={setWithoutStrength}
                        showStrength={false}
                        size="lg"
                        onStrengthChange={fn()}
                    />
                </div>
            </div>
        );
    },
};

export const InteractivePlayground: Story = {
    render: (args) => <PasswordInputWithState {...args} />,
    args: {
        label: 'Mot de passe interactif',
        placeholder: 'Testez les options...',
        size: 'lg',
        showStrength: true,
        showRequirements: true,
        showRules: true,
        required: false,
        disabled: false,
        success: false,
        error: '',
        onStrengthChange: fn(),
    },
};