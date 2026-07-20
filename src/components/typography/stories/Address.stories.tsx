import type { Meta, StoryObj } from '@storybook/react';
import { Address } from '../Address';

const meta: Meta<typeof Address> = {
    title: 'Typography/Address',
    component: Address,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'danger', 'success', 'warning'],
        },
        showCoordinates: { control: 'boolean' },
        showIcon: { control: 'boolean' },
        showType: { control: 'boolean' },
        compact: { control: 'boolean' },
        withMap: { control: 'boolean' },
        interactive: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Address>;

const sampleAddress = {
    street: '123 Avenue des Champs-Élysées',
    city: 'Paris',
    country: 'France',
    postalCode: '75008',
    building: 'WebStudio Pro',
    floor: '5',
    apartment: 'A',
    phone: '+33 1 23 45 67 89',
    email: 'contact@webstudio.fr',
    geoCoordinates: { latitude: 48.8707, longitude: 2.3035 },
    name: 'WebStudio Pro',
};

export const Default: Story = {
    args: {
        address: sampleAddress,
        showIcon: true,
    },
};

export const WithType: Story = {
    args: {
        address: { ...sampleAddress, addressType: 'work' },
        showType: true,
        showIcon: true,
    },
};

export const Complete: Story = {
    args: {
        address: {
            ...sampleAddress,
            addressType: 'work',
            metadata: {
                'Bâtiment': 'A',
                'Code accès': '1234',
                'Livraison': '8h-18h',
            },
        },
        showType: true,
        showCoordinates: true,
        withMap: true,
        interactive: true,
    },
};

export const Home: Story = {
    args: {
        address: {
            street: '45 Rue du Faubourg Saint-Honoré',
            city: 'Paris',
            country: 'France',
            postalCode: '75008',
            addressType: 'home',
            phone: '+33 6 12 34 56 78',
            email: 'jean.dupont@email.com',
            name: 'Jean Dupont',
        },
        showType: true,
        interactive: true,
    },
};

export const Billing: Story = {
    args: {
        address: {
            street: '12 Rue de la Paix',
            city: 'Lyon',
            country: 'France',
            postalCode: '69002',
            addressType: 'billing',
            building: 'Société SAS',
            phone: '+33 4 78 90 12 34',
            name: 'Société SAS',
        },
        showType: true,
    },
};

export const Shipping: Story = {
    args: {
        address: {
            street: '8 Rue du Commerce',
            city: 'Marseille',
            country: 'France',
            postalCode: '13001',
            addressType: 'shipping',
            building: 'Dépôt Central',
            floor: '2',
            metadata: {
                'Instructions': 'Livrer au gardien',
                'Code porte': 'A12',
            },
            name: 'Dépôt Central',
        },
        showType: true,
    },
};

export const Compact: Story = {
    args: {
        address: {
            street: '123 Avenue des Champs-Élysées',
            city: 'Paris',
            country: 'France',
            postalCode: '75008',
        },
        compact: true,
    },
};

export const WithoutIcons: Story = {
    args: {
        address: {
            street: '123 Avenue des Champs-Élysées',
            city: 'Paris',
            country: 'France',
            postalCode: '75008',
            building: 'WebStudio Pro',
            phone: '+33 1 23 45 67 89',
            email: 'contact@webstudio.fr',
        },
        showIcon: false,
    },
};

export const WithMap: Story = {
    args: {
        address: {
            street: 'Notre-Dame de Paris',
            city: 'Paris',
            country: 'France',
            postalCode: '75004',
            geoCoordinates: { latitude: 48.8529, longitude: 2.3500 },
            name: 'Notre-Dame',
        },
        showCoordinates: true,
        withMap: true,
    },
};

export const International: Story = {
    args: {
        address: {
            street: '1600 Pennsylvania Ave NW',
            city: 'Washington',
            country: 'États-Unis',
            postalCode: '20500',
            building: 'Maison Blanche',
            phone: '+1 202-456-1111',
            geoCoordinates: { latitude: 38.8977, longitude: -77.0365 },
            name: 'Maison Blanche',
        },
        showCoordinates: true,
        withMap: true,
    },
};

export const AddressList: Story = {
    render: () => (
        <div className="flex flex-col gap-3 max-w-lg w-full">
            <Address
                address={{
                    street: '123 Avenue des Champs-Élysées',
                    city: 'Paris',
                    country: 'France',
                    postalCode: '75008',
                    addressType: 'work',
                    phone: '+33 1 23 45 67 89',
                    name: 'WebStudio Pro',
                }}
                showType
                interactive
            />
            <Address
                address={{
                    street: '45 Rue du Faubourg Saint-Honoré',
                    city: 'Paris',
                    country: 'France',
                    postalCode: '75008',
                    addressType: 'home',
                    phone: '+33 6 12 34 56 78',
                    name: 'Jean Dupont',
                }}
                showType
                compact
            />
            <Address
                address={{
                    street: '12 Rue de la Paix',
                    city: 'Lyon',
                    country: 'France',
                    postalCode: '69002',
                    addressType: 'billing',
                    name: 'Société SAS',
                }}
                showType
                color="muted"
            />
        </div>
    ),
};

export const Interactive: Story = {
    args: {
        address: {
            ...sampleAddress,
            addressType: 'work',
            name: 'WebStudio Pro',
        },
        interactive: true,
        showType: true,
        showIcon: true,
    },
};