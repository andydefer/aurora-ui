// src/components/forms/stories/DateTimePicker.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { DateTimePicker } from '../DateTimePicker';
import { useState } from 'react';
import { Text } from '../../typography/Text';
import { Badge } from '../../feedback/Badge';

const meta: Meta<typeof DateTimePicker> = {
    title: 'Forms/DateTimePicker',
    component: DateTimePicker,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un sélecteur de date et heure avec support ISO et Zulu (UTC).',
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
        mode: {
            control: 'select',
            options: ['iso', 'zulu'],
            description: 'Mode de formatage: ISO (avec timezone) ou Zulu (UTC)',
        },
        showTimezone: { control: 'boolean' },
        label: { control: 'text' },
        placeholder: { control: 'text' },
        error: { control: 'text' },
        min: { control: 'text' },
        max: { control: 'text' },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
        timeFormat: { control: 'select', options: ['12h', '24h'] },
    },
};

export default meta;
type Story = StoryObj<typeof DateTimePicker>;

// ============ COMPOSANT AVEC ÉTAT ============

const DateTimePickerWithState = (args: any) => {
    const [value, setValue] = useState<string>(args.value || '');
    return (
        <div className="space-y-2 w-full max-w-sm">
            <DateTimePicker
                {...args}
                value={value}
                onChange={(val) => {
                    setValue(val);
                    args.onChange?.(val);
                }}
            />
            {value && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="primary" size="sm">Sélectionné</Badge>
                    <span className="font-mono text-xs">{value}</span>
                </div>
            )}
        </div>
    );
};

// ============ STORIES ============

export const Default: Story = {
    render: (args) => <DateTimePickerWithState {...args} />,
    args: {
        label: 'Date et heure',
        placeholder: 'Choisissez une date et heure',
        size: 'lg',
        color: 'primary',
        mode: 'iso',
        timeFormat: '24h',
        showTimezone: true,
    },
};

export const ZuluMode: Story = {
    render: (args) => <DateTimePickerWithState {...args} />,
    args: {
        label: 'Date et heure (UTC)',
        placeholder: 'Choisissez une date et heure',
        size: 'lg',
        color: 'primary',
        mode: 'zulu',
        timeFormat: '24h',
        showTimezone: true,
    },
};

export const WithValue: Story = {
    render: (args) => <DateTimePickerWithState {...args} />,
    args: {
        label: 'Rendez-vous',
        value: '2024-12-25T14:30:00+01:00',
        placeholder: 'Choisissez une date et heure',
        size: 'lg',
        color: 'primary',
        mode: 'iso',
        timeFormat: '24h',
    },
};

export const WithError: Story = {
    render: (args) => <DateTimePickerWithState {...args} />,
    args: {
        label: 'Date de début',
        placeholder: 'Choisissez une date et heure',
        error: 'Veuillez sélectionner une date et heure valide',
        size: 'lg',
        color: 'primary',
        mode: 'iso',
    },
};

export const WithMinMax: Story = {
    render: (args) => <DateTimePickerWithState {...args} />,
    args: {
        label: 'Réservation',
        placeholder: 'Choisissez une date et heure',
        min: '2024-12-01T00:00:00',
        max: '2024-12-31T23:59:59',
        size: 'lg',
        color: 'primary',
        mode: 'iso',
    },
};

export const Disabled: Story = {
    render: (args) => <DateTimePickerWithState {...args} />,
    args: {
        label: 'Date de création',
        value: '2024-12-25T14:30:00+01:00',
        placeholder: 'Choisissez une date et heure',
        disabled: true,
        size: 'lg',
        color: 'primary',
    },
};

export const Required: Story = {
    render: (args) => <DateTimePickerWithState {...args} />,
    args: {
        label: 'Date de rendez-vous',
        placeholder: 'Choisissez une date et heure',
        required: true,
        size: 'lg',
        color: 'primary',
    },
};

export const WithoutTimezone: Story = {
    render: (args) => <DateTimePickerWithState {...args} />,
    args: {
        label: 'Date et heure',
        placeholder: 'Choisissez une date et heure',
        size: 'lg',
        color: 'primary',
        mode: 'iso',
        showTimezone: false,
        timeFormat: '24h',
    },
};

// ============ TAILLES ============

export const AllSizes: Story = {
    render: () => (
        <div className="space-y-4 w-full max-w-sm">
            <Text variant="h6" className="font-bold">Toutes les tailles</Text>
            <DateTimePicker label="XS" size="xs" placeholder="Extra small" />
            <DateTimePicker label="SM" size="sm" placeholder="Small" />
            <DateTimePicker label="MD" size="md" placeholder="Medium" />
            <DateTimePicker label="LG" size="lg" placeholder="Large" />
            <DateTimePicker label="XL" size="xl" placeholder="Extra large" />
        </div>
    ),
};

// ============ COULEURS ============

export const AllColors: Story = {
    render: () => (
        <div className="space-y-4 w-full max-w-sm">
            <Text variant="h6" className="font-bold">Toutes les couleurs</Text>
            <DateTimePicker label="Primary" color="primary" placeholder="Primary" />
            <DateTimePicker label="Secondary" color="secondary" placeholder="Secondary" />
            <DateTimePicker label="Success" color="success" placeholder="Success" />
            <DateTimePicker label="Warning" color="warning" placeholder="Warning" />
            <DateTimePicker label="Destructive" color="destructive" placeholder="Destructive" />
            <DateTimePicker label="Muted" color="muted" placeholder="Muted" />
        </div>
    ),
};

// ============ MODES ============

export const CompareModes: Story = {
    render: () => {
        const [isoValue, setIsoValue] = useState('');
        const [zuluValue, setZuluValue] = useState('');

        return (
            <div className="space-y-4 w-full max-w-sm">
                <Text variant="h6" className="font-bold">Comparaison des modes</Text>
                <DateTimePicker
                    label="Mode ISO"
                    value={isoValue}
                    onChange={setIsoValue}
                    mode="iso"
                    placeholder="ISO + timezone"
                    size="lg"
                />
                <DateTimePicker
                    label="Mode Zulu (UTC)"
                    value={zuluValue}
                    onChange={setZuluValue}
                    mode="zulu"
                    placeholder="Zulu UTC"
                    size="lg"
                />
                <div className="p-3 rounded-md bg-muted/10 border border-border/50">
                    <Text variant="caption" color="muted">
                        ISO: {isoValue || 'Non défini'}
                    </Text>
                    <Text variant="caption" color="muted">
                        Zulu: {zuluValue || 'Non défini'}
                    </Text>
                </div>
            </div>
        );
    },
};

// ============ CAS D'USAGE ============

export const BookingForm: Story = {
    render: () => {
        const [startDate, setStartDate] = useState('');
        const [endDate, setEndDate] = useState('');

        return (
            <div className="space-y-4 w-full max-w-md p-6 bg-card rounded-md border border-border">
                <Text variant="h5" className="font-bold">Réserver une salle</Text>
                <div className="space-y-3">
                    <DateTimePicker
                        label="Début de la réservation"
                        value={startDate}
                        onChange={setStartDate}
                        placeholder="Choisissez la date et heure de début"
                        mode="iso"
                        size="lg"
                        min={new Date().toISOString()}
                    />
                    <DateTimePicker
                        label="Fin de la réservation"
                        value={endDate}
                        onChange={setEndDate}
                        placeholder="Choisissez la date et heure de fin"
                        mode="iso"
                        size="lg"
                        min={startDate || new Date().toISOString()}
                    />
                </div>
                <div className="pt-4 border-t border-border flex gap-3">
                    <button className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
                        Réserver
                    </button>
                    <button className="flex-1 py-2.5 bg-muted text-muted-foreground rounded-md font-medium hover:bg-muted/80 transition-colors">
                        Annuler
                    </button>
                </div>
            </div>
        );
    },
};

export const MeetingScheduler: Story = {
    render: () => {
        const [meetingDate, setMeetingDate] = useState('');
        const [meetingTitle, setMeetingTitle] = useState('');

        return (
            <div className="space-y-4 w-full max-w-md p-6 bg-card rounded-md border border-border">
                <Text variant="h5" className="font-bold">Planifier une réunion</Text>
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                            Titre de la réunion
                        </label>
                        <input
                            type="text"
                            value={meetingTitle}
                            onChange={(e) => setMeetingTitle(e.target.value)}
                            placeholder="Réunion d'équipe"
                            className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                    </div>
                    <DateTimePicker
                        label="Date et heure de la réunion"
                        value={meetingDate}
                        onChange={setMeetingDate}
                        placeholder="Choisissez une date et heure"
                        mode="iso"
                        size="lg"
                        min={new Date().toISOString()}
                    />
                </div>
                <div className="pt-4 border-t border-border flex gap-3">
                    <button className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
                        Planifier
                    </button>
                    <button className="flex-1 py-2.5 bg-muted text-muted-foreground rounded-md font-medium hover:bg-muted/80 transition-colors">
                        Annuler
                    </button>
                </div>
            </div>
        );
    },
};

export const EventCreation: Story = {
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
                            className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                    </div>
                    <DateTimePicker
                        label="Date et heure de l'événement"
                        value={eventDate}
                        onChange={setEventDate}
                        placeholder="Choisissez une date et heure"
                        mode="iso"
                        size="lg"
                        min={new Date().toISOString()}
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
};

// ============ COMPARAISON ============

export const AllStates: Story = {
    render: () => (
        <div className="space-y-4 w-full max-w-sm">
            <Text variant="h6" className="font-bold">Tous les états</Text>
            <DateTimePicker size="lg" label="Normal" placeholder="Sélectionnez une date et heure" />
            <DateTimePicker size="lg" label="Avec valeur" value="2024-12-25T14:30:00+01:00" placeholder="Sélectionnez une date et heure" />
            <DateTimePicker size="lg" label="Avec erreur" error="Date/heure invalide" placeholder="Sélectionnez une date et heure" />
            <DateTimePicker size="lg" label="Désactivé" disabled placeholder="Sélectionnez une date et heure" />
            <DateTimePicker size="lg" label="Requis" required placeholder="Sélectionnez une date et heure" />
            <DateTimePicker size="lg" label="Mode Zulu" mode="zulu" placeholder="Sélectionnez une date et heure" />
        </div>
    ),
};

export const InteractivePlayground: Story = {
    render: (args) => <DateTimePickerWithState {...args} />,
    args: {
        label: 'Date et heure interactive',
        placeholder: 'Choisissez une date et heure',
        size: 'lg',
        color: 'primary',
        mode: 'iso',
        timeFormat: '24h',
        showTimezone: true,
        required: false,
        disabled: false,
    },
};