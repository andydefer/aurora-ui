// src/components/forms/stories/TimePicker.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { TimePicker } from '../TimePicker';
import { useState } from 'react';
import { Text } from '../../typography/Text';
import { Badge } from '../../feedback/Badge';

const meta: Meta<typeof TimePicker> = {
    title: 'Forms/TimePicker',
    component: TimePicker,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un sélecteur d\'heure personnalisable avec support 12h/24h.',
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
        format: {
            control: 'select',
            options: ['12h', '24h'],
            description: 'Format d\'affichage (12h ou 24h)',
        },
        label: { control: 'text' },
        placeholder: { control: 'text' },
        error: { control: 'text' },
        step: { control: 'number', min: 1, max: 30 },
        min: { control: 'text' },
        max: { control: 'text' },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
        clearable: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

// ============ COMPOSANT AVEC ÉTAT ============

const TimePickerWithState = (args: any) => {
    const [time, setTime] = useState<string>(args.value || '');
    return (
        <div className="space-y-2 w-full max-w-sm">
            <TimePicker
                {...args}
                value={time}
                onChange={(val) => {
                    setTime(val);
                    args.onChange?.(val);
                }}
            />
            {time && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="primary" size="sm">Sélectionné</Badge>
                    <span className="font-mono text-xs">{time}</span>
                </div>
            )}
        </div>
    );
};

// ============ STORIES ============

export const Default: Story = {
    render: (args) => <TimePickerWithState {...args} />,
    args: {
        label: 'Heure',
        placeholder: 'Choisissez une heure',
        size: 'lg',
        color: 'primary',
        format: '24h',
        step: 5,
    },
    parameters: {
        docs: {
            description: {
                story: 'TimePicker par défaut en format 24h.',
            },
        },
    },
};

export const TwelveHour: Story = {
    render: (args) => <TimePickerWithState {...args} />,
    args: {
        label: 'Heure (12h)',
        placeholder: 'Choisissez une heure',
        size: 'lg',
        color: 'primary',
        format: '12h',
        step: 5,
    },
    parameters: {
        docs: {
            description: {
                story: 'TimePicker en format 12h avec période AM/PM.',
            },
        },
    },
};

export const WithValue: Story = {
    render: (args) => <TimePickerWithState {...args} />,
    args: {
        label: 'Heure de rendez-vous',
        value: '14:30',
        placeholder: 'Choisissez une heure',
        size: 'lg',
        color: 'primary',
        format: '24h',
    },
    parameters: {
        docs: {
            description: {
                story: 'TimePicker avec une valeur pré-remplie.',
            },
        },
    },
};

export const WithError: Story = {
    render: (args) => <TimePickerWithState {...args} />,
    args: {
        label: 'Heure de début',
        placeholder: 'Choisissez une heure',
        error: 'Veuillez sélectionner une heure valide',
        size: 'lg',
        color: 'primary',
    },
    parameters: {
        docs: {
            description: {
                story: 'TimePicker avec message d\'erreur.',
            },
        },
    },
};

export const WithMinMax: Story = {
    render: (args) => <TimePickerWithState {...args} />,
    args: {
        label: 'Heure de réservation',
        placeholder: 'Choisissez une heure',
        min: '09:00',
        max: '18:00',
        size: 'lg',
        color: 'primary',
        format: '24h',
    },
    parameters: {
        docs: {
            description: {
                story: 'TimePicker avec plage horaire restreinte (9h-18h).',
            },
        },
    },
};

export const Clearable: Story = {
    render: (args) => <TimePickerWithState {...args} />,
    args: {
        label: 'Heure de départ',
        placeholder: 'Choisissez une heure',
        clearable: true,
        size: '2xl',
        color: 'primary',
        format: '24h',
    },
    parameters: {
        docs: {
            description: {
                story: 'TimePicker avec bouton de suppression.',
            },
        },
    },
};

export const Disabled: Story = {
    render: (args) => <TimePickerWithState {...args} />,
    args: {
        label: 'Heure de création',
        value: '14:30',
        placeholder: 'Choisissez une heure',
        disabled: true,
        size: 'lg',
        color: 'primary',
    },
    parameters: {
        docs: {
            description: {
                story: 'TimePicker désactivé.',
            },
        },
    },
};

export const Required: Story = {
    render: (args) => <TimePickerWithState {...args} />,
    args: {
        label: 'Heure de rendez-vous',
        placeholder: 'Choisissez une heure',
        required: true,
        size: 'lg',
        color: 'primary',
    },
    parameters: {
        docs: {
            description: {
                story: 'TimePicker avec champ requis.',
            },
        },
    },
};

export const WithStep: Story = {
    render: (args) => <TimePickerWithState {...args} />,
    args: {
        label: 'Heure (pas de 15 min)',
        placeholder: 'Choisissez une heure',
        step: 15,
        size: 'lg',
        color: 'primary',
        format: '24h',
    },
    parameters: {
        docs: {
            description: {
                story: 'TimePicker avec pas de 15 minutes.',
            },
        },
    },
};

// ============ TAILLES ============

export const AllSizes: Story = {
    render: () => (
        <div className="space-y-4 w-full max-w-sm">
            <Text variant="h6" className="font-bold">Toutes les tailles</Text>
            <TimePicker label="XS" size="xs" placeholder="Extra small" />
            <TimePicker label="SM" size="sm" placeholder="Small" />
            <TimePicker label="MD" size="md" placeholder="Medium" />
            <TimePicker label="LG" size="2xl" placeholder="Large" />
            <TimePicker label="XL" size="xl" placeholder="Extra large" />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Toutes les tailles de TimePicker disponibles.',
            },
        },
    },
};

// ============ COULEURS ============

export const AllColors: Story = {
    render: () => (
        <div className="space-y-4 w-full max-w-sm">
            <Text variant="h6" className="font-bold">Toutes les couleurs</Text>
            <TimePicker label="Primary" color="primary" placeholder="Primary" />
            <TimePicker label="Secondary" color="secondary" placeholder="Secondary" />
            <TimePicker label="Success" color="success" placeholder="Success" />
            <TimePicker label="Warning" color="warning" placeholder="Warning" />
            <TimePicker label="Destructive" color="destructive" placeholder="Destructive" />
            <TimePicker label="Muted" color="muted" placeholder="Muted" />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Toutes les couleurs disponibles.',
            },
        },
    },
};

// ============ FORMATS ============

export const CompareFormats: Story = {
    render: () => {
        const [time24, setTime24] = useState('');
        const [time12, setTime12] = useState('');

        return (
            <div className="space-y-4 w-full max-w-sm">
                <Text variant="h6" className="font-bold">Comparaison des formats</Text>
                <TimePicker
                    label="Format 24h"
                    value={time24}
                    onChange={setTime24}
                    format="24h"
                    placeholder="14:30"
                    size="2xl"
                />
                <TimePicker
                    label="Format 12h"
                    value={time12}
                    onChange={setTime12}
                    format="12h"
                    placeholder="02:30 PM"
                    size="2xl"
                />
                <div className="p-3 rounded-md bg-muted/10 border border-border/50">
                    <Text variant="caption" color="muted">
                        24h: {time24 || 'Non défini'}
                    </Text>
                    <Text variant="caption" color="muted">
                        12h: {time12 || 'Non défini'}
                    </Text>
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Comparaison des formats 12h et 24h.',
            },
        },
    },
};

// ============ CAS D'USAGE ============

export const AppointmentScheduler: Story = {
    render: () => {
        const [time, setTime] = useState('');
        const [date, setDate] = useState('');

        return (
            <div className="space-y-4 w-full max-w-md p-6 bg-card rounded-md border border-border">
                <Text variant="h5" className="font-bold">Prendre rendez-vous</Text>
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                            Date
                        </label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                    </div>
                    <TimePicker
                        label="Heure"
                        value={time}
                        onChange={setTime}
                        placeholder="Choisissez une heure"
                        format="24h"
                        min="08:00"
                        max="20:00"
                        step={15}
                        clearable
                        size="2xl"
                    />
                </div>
                <div className="pt-4 border-t border-border flex gap-3">
                    <button className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
                        Confirmer
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
                story: 'Exemple de prise de rendez-vous avec TimePicker.',
            },
        },
    },
};

export const WorkHours: Story = {
    render: () => {
        const [startTime, setStartTime] = useState('');
        const [endTime, setEndTime] = useState('');

        return (
            <div className="space-y-4 w-full max-w-md p-6 bg-card rounded-md border border-border">
                <Text variant="h5" className="font-bold">Horaires de travail</Text>
                <div className="grid grid-cols-2 gap-4">
                    <TimePicker
                        label="Début"
                        value={startTime}
                        onChange={setStartTime}
                        placeholder="09:00"
                        format="24h"
                        min="06:00"
                        max="22:00"
                        size="2xl"
                    />
                    <TimePicker
                        label="Fin"
                        value={endTime}
                        onChange={setEndTime}
                        placeholder="18:00"
                        format="24h"
                        min="06:00"
                        max="22:00"
                        size="2xl"
                    />
                </div>
                {startTime && endTime && (
                    <div className="p-3 rounded-md bg-primary/5 border border-primary/10">
                        <Text variant="small" className="font-medium text-primary">
                            Plage horaire: {startTime} - {endTime}
                        </Text>
                    </div>
                )}
                <div className="pt-4 border-t border-border">
                    <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
                        Enregistrer
                    </button>
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Exemple de configuration d\'horaires de travail.',
            },
        },
    },
};

// ============ COMPARAISON ============

export const AllStates: Story = {
    render: () => (
        <div className="space-y-4 w-full max-w-sm">
            <Text variant="h6" className="font-bold">Tous les états</Text>
            <TimePicker size="2xl" label="Normal" placeholder="Choisissez une heure" />
            <TimePicker size="2xl" label="Avec valeur" value="14:30" placeholder="Choisissez une heure" />
            <TimePicker size="2xl" label="Avec erreur" error="Heure invalide" placeholder="Choisissez une heure" />
            <TimePicker size="2xl" label="Désactivé" disabled placeholder="Choisissez une heure" />
            <TimePicker size="2xl" label="Requis" required placeholder="Choisissez une heure" />
            <TimePicker size="2xl" label="Clearable" clearable placeholder="Choisissez une heure" />
            <TimePicker size="2xl" label="Format 12h" format="12h" placeholder="Choisissez une heure" />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Tous les états du TimePicker.',
            },
        },
    },
};

export const InteractivePlayground: Story = {
    render: (args) => <TimePickerWithState {...args} />,
    args: {
        label: 'Heure interactive',
        placeholder: 'Choisissez une heure',
        size: 'lg',
        color: 'primary',
        format: '24h',
        step: 5,
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