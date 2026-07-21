// src/components/forms/stories/DatePicker.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from '../DatePicker';
import { useState } from 'react';
import { Text } from '../../typography/Text';
import { Badge } from '../../feedback/Badge';

const meta: Meta<typeof DatePicker> = {
    title: 'Forms/DatePicker',
    component: DatePicker,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un sélecteur de date personnalisable avec calendrier intégré.',
            },
        },
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'],
            description: 'Taille du composant',
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'destructive', 'success', 'warning'],
            description: 'Couleur d\'accentuation',
        },
        label: { control: 'text' },
        placeholder: { control: 'text' },
        error: { control: 'text' },
        min: { control: 'text' },
        max: { control: 'text' },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
        clearable: { control: 'boolean' },
        format: { control: 'text' },
        locale: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// ============ COMPOSANT AVEC ÉTAT ============

const DatePickerWithState = (args: any) => {
    const [date, setDate] = useState<string>(args.value || '');
    return (
        <div className="space-y-2 w-full max-w-sm">
            <DatePicker
                {...args}
                value={date}
                onChange={(value) => {
                    setDate(value);
                    args.onChange?.(value);
                }}
            />
            {date && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="primary" size="sm">Sélectionné</Badge>
                    <span>{date}</span>
                </div>
            )}
        </div>
    );
};

// ============ STORIES ============

export const Default: Story = {
    render: (args) => <DatePickerWithState {...args} />,
    args: {
        label: 'Date de naissance',
        placeholder: 'Choisissez une date',
        size: 'md',
        color: 'primary',
    },
    parameters: {
        docs: {
            description: {
                story: 'DatePicker par défaut.',
            },
        },
    },
};

export const WithValue: Story = {
    render: (args) => <DatePickerWithState {...args} />,
    args: {
        label: 'Date de rendez-vous',
        value: '2024-12-25',
        placeholder: 'Choisissez une date',
        size: 'md',
        color: 'primary',
    },
    parameters: {
        docs: {
            description: {
                story: 'DatePicker avec une valeur pré-remplie.',
            },
        },
    },
};

export const WithError: Story = {
    render: (args) => <DatePickerWithState {...args} />,
    args: {
        label: 'Date de début',
        placeholder: 'Choisissez une date',
        error: 'Veuillez sélectionner une date valide',
        size: 'md',
        color: 'primary',
    },
    parameters: {
        docs: {
            description: {
                story: 'DatePicker avec message d\'erreur.',
            },
        },
    },
};

export const WithMinMax: Story = {
    render: (args) => <DatePickerWithState {...args} />,
    args: {
        label: 'Date de réservation',
        placeholder: 'Choisissez une date',
        min: '2024-12-01',
        max: '2024-12-31',
        size: 'md',
        color: 'primary',
    },
    parameters: {
        docs: {
            description: {
                story: 'DatePicker avec plage de dates restreinte (1-31 décembre 2024).',
            },
        },
    },
};

export const Clearable: Story = {
    render: (args) => <DatePickerWithState {...args} />,
    args: {
        label: 'Date de naissance',
        placeholder: 'Choisissez une date',
        clearable: true,
        size: 'md',
        color: 'primary',
    },
    parameters: {
        docs: {
            description: {
                story: 'DatePicker avec bouton de suppression.',
            },
        },
    },
};

export const Disabled: Story = {
    render: (args) => <DatePickerWithState {...args} />,
    args: {
        label: 'Date de création',
        placeholder: 'Choisissez une date',
        value: '2024-12-25',
        disabled: true,
        size: 'md',
        color: 'primary',
    },
    parameters: {
        docs: {
            description: {
                story: 'DatePicker désactivé.',
            },
        },
    },
};

export const Required: Story = {
    render: (args) => <DatePickerWithState {...args} />,
    args: {
        label: 'Date de rendez-vous',
        placeholder: 'Choisissez une date',
        required: true,
        size: 'md',
        color: 'primary',
    },
    parameters: {
        docs: {
            description: {
                story: 'DatePicker avec champ requis.',
            },
        },
    },
};

// ============ FORMATS ============

export const DifferentFormats: Story = {
    render: () => {
        const [date1, setDate1] = useState('');
        const [date2, setDate2] = useState('');
        const [date3, setDate3] = useState('');

        return (
            <div className="space-y-4 w-full max-w-sm">
                <Text variant="h6" className="font-bold">Différents formats</Text>
                <DatePicker
                    label="YYYY-MM-DD (par défaut)"
                    value={date1}
                    onChange={setDate1}
                    placeholder="YYYY-MM-DD"
                />
                <DatePicker
                    label="DD/MM/YYYY"
                    value={date2}
                    onChange={setDate2}
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                />
                <DatePicker
                    label="MM/DD/YYYY"
                    value={date3}
                    onChange={setDate3}
                    format="MM/DD/YYYY"
                    placeholder="MM/DD/YYYY"
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'DatePicker avec différents formats d\'affichage.',
            },
        },
    },
};

// ============ LOCALES ============

export const DifferentLocales: Story = {
    render: () => {
        const [date1, setDate1] = useState('');
        const [date2, setDate2] = useState('');
        const [date3, setDate3] = useState('');

        return (
            <div className="space-y-4 w-full max-w-sm">
                <Text variant="h6" className="font-bold">Différentes locales</Text>
                <DatePicker
                    label="Français (fr-FR)"
                    value={date1}
                    onChange={setDate1}
                    locale="fr-FR"
                    placeholder="Choisissez une date"
                />
                <DatePicker
                    label="Anglais (en-US)"
                    value={date2}
                    onChange={setDate2}
                    locale="en-US"
                    placeholder="Select a date"
                />
                <DatePicker
                    label="Espagnol (es-ES)"
                    value={date3}
                    onChange={setDate3}
                    locale="es-ES"
                    placeholder="Seleccione una fecha"
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'DatePicker avec différentes locales.',
            },
        },
    },
};

// ============ CAS D'USAGE ============

export const BookingForm: Story = {
    render: () => {
        const [checkIn, setCheckIn] = useState('');
        const [checkOut, setCheckOut] = useState('');
        const [guests, setGuests] = useState(2);

        return (
            <div className="space-y-4 w-full max-w-md p-6 bg-card rounded-md border border-border">
                <Text variant="h5" className="font-bold">Réserver un séjour</Text>
                <div className="grid grid-cols-2 gap-4">
                    <DatePicker
                        label="Date d'arrivée"
                        value={checkIn}
                        onChange={setCheckIn}
                        placeholder="Arrivée"
                        size="sm"
                        min={new Date().toISOString().split('T')[0]}
                    />
                    <DatePicker
                        label="Date de départ"
                        value={checkOut}
                        onChange={setCheckOut}
                        placeholder="Départ"
                        size="sm"
                        min={checkIn || new Date().toISOString().split('T')[0]}
                    />
                </div>
                <div className="flex items-center gap-4 pt-2">
                    <label className="text-sm font-medium text-foreground">Voyageurs</label>
                    <div className="flex items-center gap-2">
                        <button
                            className="w-8 h-8 rounded-full border border-border hover:bg-muted/20 transition-colors"
                            onClick={() => setGuests(Math.max(1, guests - 1))}
                        >
                            -
                        </button>
                        <span className="w-8 text-center font-medium">{guests}</span>
                        <button
                            className="w-8 h-8 rounded-full border border-border hover:bg-muted/20 transition-colors"
                            onClick={() => setGuests(Math.min(10, guests + 1))}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className="pt-4 border-t border-border">
                    <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
                        Rechercher
                    </button>
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Exemple de formulaire de réservation avec DatePicker.',
            },
        },
    },
};

export const EventForm: Story = {
    render: () => {
        const [eventDate, setEventDate] = useState('');
        const [eventName, setEventName] = useState('');

        return (
            <div className="space-y-4 w-full max-w-md p-6 bg-card rounded-md border border-border">
                <Text variant="h5" className="font-bold">Créer un événement</Text>
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                            Nom de l'événement
                        </label>
                        <input
                            type="text"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            placeholder="Conférence annuelle"
                            className="w-full rounded-md border border-border bg-background px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                    </div>
                    <DatePicker
                        label="Date de l'événement"
                        value={eventDate}
                        onChange={setEventDate}
                        placeholder="Choisissez une date"
                        clearable
                        min={new Date().toISOString().split('T')[0]}
                    />
                </div>
                <div className="pt-4 border-t border-border flex gap-3">
                    <button className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
                        Créer
                    </button>
                    <button className="flex-1 py-2.5 bg-muted text-muted-foreground rounded-md font-medium hover:bg-muted/80 transition-colors">
                        Annuler
                    </button>
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Exemple de formulaire de création d\'événement.',
            },
        },
    },
};

export const InteractivePlayground: Story = {
    render: (args) => <DatePickerWithState {...args} />,
    args: {
        label: 'Date interactive',
        placeholder: 'Choisissez une date',
        size: 'md',
        color: 'primary',
        clearable: true,
        required: false,
        disabled: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'Playground interactif pour tester toutes les options.',
            },
        },
    },
};