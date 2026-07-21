// src/components/feedback/stories/Alert.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '../Alert';

const meta: Meta<typeof Alert> = {
    title: 'Feedback/Alert',
    component: Alert,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un composant d\'alerte pour afficher des messages importants.',
            },
        },
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['info', 'success', 'warning', 'destructive'],
            description: 'Type d\'alerte',
        },
        closable: {
            control: 'boolean',
            description: 'Afficher le bouton de fermeture',
        },
        compact: {
            control: 'boolean',
            description: 'Version compacte',
        },
        withBorder: {
            control: 'boolean',
            description: 'Afficher la bordure',
        },
        elevated: {
            control: 'boolean',
            description: 'Ajouter une ombre',
        },
        title: {
            control: 'text',
            description: 'Titre de l\'alerte',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
    args: {
        variant: 'info',
        title: 'Information',
        children: 'Ceci est un message d\'information important pour vous.',
        closable: false,
        compact: false,
        withBorder: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Alerte de type information.',
            },
        },
    },
};

export const Success: Story = {
    args: {
        variant: 'success',
        title: 'Succès !',
        children: 'Votre action a été réalisée avec succès.',
        closable: false,
        compact: false,
        withBorder: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Alerte de type succès.',
            },
        },
    },
};

export const Warning: Story = {
    args: {
        variant: 'warning',
        title: 'Attention',
        children: 'Veuillez vérifier vos informations avant de continuer.',
        closable: false,
        compact: false,
        withBorder: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Alerte de type avertissement.',
            },
        },
    },
};

export const Error: Story = {
    args: {
        variant: 'destructive',
        title: 'Erreur',
        children: 'Une erreur inattendue s\'est produite. Veuillez réessayer.',
        closable: false,
        compact: false,
        withBorder: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Alerte de type erreur.',
            },
        },
    },
};

export const Closable: Story = {
    args: {
        variant: 'info',
        title: 'Alerte fermable',
        children: 'Vous pouvez fermer cette alerte en cliquant sur la croix.',
        closable: true,
        compact: false,
        withBorder: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Alerte avec bouton de fermeture.',
            },
        },
    },
};

export const Compact: Story = {
    args: {
        variant: 'info',
        title: 'Alerte compacte',
        children: 'Version compacte de l\'alerte.',
        closable: false,
        compact: true,
        withBorder: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Alerte en version compacte.',
            },
        },
    },
};

export const Elevated: Story = {
    args: {
        variant: 'info',
        title: 'Alerte avec ombre',
        children: 'Cette alerte a une ombre pour plus de visibilité.',
        closable: false,
        compact: false,
        withBorder: true,
        elevated: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Alerte avec ombre portée.',
            },
        },
    },
};

export const WithoutBorder: Story = {
    args: {
        variant: 'info',
        title: 'Sans bordure',
        children: 'Cette alerte n\'a pas de bordure.',
        closable: false,
        compact: false,
        withBorder: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'Alerte sans bordure.',
            },
        },
    },
};

export const AllVariants: Story = {
    render: () => (
        <div className="space-y-4 max-w-2xl w-full">
            <Alert variant="info" title="Information">
                Ceci est une alerte informative.
            </Alert>
            <Alert variant="success" title="Succès !">
                Votre action a été réalisée avec succès.
            </Alert>
            <Alert variant="warning" title="Attention">
                Veuillez vérifier vos informations.
            </Alert>
            <Alert variant="destructive" title="Erreur">
                Une erreur inattendue s'est produite.
            </Alert>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Toutes les variantes d\'alertes disponibles.',
            },
        },
    },
};

export const InteractivePlayground: Story = {
    args: {
        variant: 'info',
        title: 'Playground',
        children: 'Testez les options dans le panneau de contrôle.',
        closable: true,
        compact: false,
        withBorder: true,
        elevated: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'Playground interactif pour tester toutes les options.',
            },
        },
    },
};