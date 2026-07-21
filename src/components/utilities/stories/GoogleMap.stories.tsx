// src/components/utilities/stories/GoogleMap.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { GoogleMap } from '../GoogleMap';
import { useState } from 'react';
import { Card } from '../../overlay/Card';
import { Text } from '../../typography/Text';
import { Badge } from '../../feedback/Badge';
import { Button } from '../../forms/Button';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAWZeL8axuewseBvHtYgNfrkT3ZONqD75w';

const meta: Meta<typeof GoogleMap> = {
    title: 'Utilities/GoogleMap',
    component: GoogleMap,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un composant pour intégrer Google Maps avec marqueurs.',
            },
        },
    },
    argTypes: {
        apiKey: {
            control: 'text',
            description: 'Clé API Google Maps',
        },
        center: {
            control: 'object',
            description: 'Centre de la carte',
        },
        zoom: {
            control: 'number',
            description: 'Niveau de zoom',
        },
        height: {
            control: 'text',
            description: 'Hauteur de la carte',
        },
        width: {
            control: 'text',
            description: 'Largeur de la carte',
        },
        loadingMessage: {
            control: 'text',
            description: 'Message de chargement',
        },
        errorMessage: {
            control: 'text',
            description: 'Message d\'erreur',
        },
        showMarker: {
            control: 'boolean',
            description: 'Afficher les marqueurs',
        },
        mapTypeId: {
            control: 'select',
            options: ['roadmap', 'satellite', 'hybrid', 'terrain'],
            description: 'Type de carte',
        },
    },
};

export default meta;
type Story = StoryObj<typeof GoogleMap>;

// ============ DONNÉES ============

const parisCenter = { lat: 48.8566, lng: 2.3522 };
const londonCenter = { lat: 51.5074, lng: -0.1278 };
const newYorkCenter = { lat: 40.7128, lng: -74.0060 };
const tokyoCenter = { lat: 35.6762, lng: 139.6503 };

const parisMarkers = [
    { lat: 48.8588, lng: 2.2929, title: 'Tour Eiffel', info: '<b>Tour Eiffel</b><br>Monument emblématique de Paris' },
    { lat: 48.8606, lng: 2.3376, title: 'Louvre', info: '<b>Musée du Louvre</b><br>Le plus grand musée du monde' },
    { lat: 48.8738, lng: 2.2950, title: 'Arc de Triomphe', info: '<b>Arc de Triomphe</b><br>Monument historique' },
    { lat: 48.8529, lng: 2.3500, title: 'Notre-Dame', info: '<b>Cathédrale Notre-Dame</b><br>Chef-d\'œuvre gothique' },
    { lat: 48.8566, lng: 2.3522, title: 'Paris Centre', info: '<b>Centre de Paris</b><br>Cœur de la capitale' },
];

const londonMarkers = [
    { lat: 51.5081, lng: -0.0759, title: 'Big Ben', info: '<b>Big Ben</b><br>La tour de l\'horloge emblématique' },
    { lat: 51.5014, lng: -0.1419, title: 'Buckingham Palace', info: '<b>Palais de Buckingham</b><br>Résidence royale' },
    { lat: 51.5074, lng: -0.1278, title: 'Londres Centre', info: '<b>Centre de Londres</b><br>Cœur de la ville' },
];

// ============ STORIES ============

export const Default: Story = {
    render: () => (
        <div className="w-full max-w-7xl">
            <Card variant="default" radius="lg" shadow="sm" className="p-4" >
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <Text variant="h5" className="font-bold">🗺️ Google Maps</Text>
                        <Text color="muted" variant="small">Paris, France</Text>
                    </div>
                    <div className="flex gap-2">
                        <Badge variant="primary">Roadmap</Badge>
                        <Badge variant="outline">12 marqueurs</Badge>
                    </div>
                </div>
                <GoogleMap
                    apiKey={GOOGLE_MAPS_API_KEY}
                    center={parisCenter}
                    zoom={13}
                    markers={parisMarkers}
                    height={800}
                    width={600}
                    showMarker
                    mapTypeId="roadmap"
                />
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Carte Google Maps avec marqueurs à Paris.',
            },
        },
    },
};

export const London: Story = {
    render: () => (
        <div className="w-full max-w-7xl">
            <Card variant="default" radius="lg" shadow="sm" className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <Text variant="h5" className="font-bold">🗺️ Google Maps</Text>
                        <Text color="muted" variant="small">Londres, Royaume-Uni</Text>
                    </div>
                    <div className="flex gap-2">
                        <Badge variant="success">Roadmap</Badge>
                        <Badge variant="outline">3 marqueurs</Badge>
                    </div>
                </div>
                <GoogleMap
                    apiKey={GOOGLE_MAPS_API_KEY}
                    center={londonCenter}
                    zoom={13}
                    markers={londonMarkers}
                    height={500}
                    showMarker
                    mapTypeId="roadmap"
                />
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Carte Google Maps avec marqueurs à Londres.',
            },
        },
    },
};

export const Satellite: Story = {
    render: () => (
        <div className="w-full max-w-7xl">
            <Card variant="default" radius="lg" shadow="sm" className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <Text variant="h5" className="font-bold">🛰️ Vue Satellite</Text>
                        <Text color="muted" variant="small">Paris, France</Text>
                    </div>
                    <div className="flex gap-2">
                        <Badge variant="warning">Satellite</Badge>
                        <Badge variant="outline">5 marqueurs</Badge>
                    </div>
                </div>
                <GoogleMap
                    apiKey={GOOGLE_MAPS_API_KEY}
                    center={parisCenter}
                    zoom={14}
                    markers={parisMarkers}
                    height={500}
                    showMarker
                    mapTypeId="satellite"
                />
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Carte en vue satellite avec marqueurs.',
            },
        },
    },
};

export const Hybrid: Story = {
    render: () => (
        <div className="w-full max-w-7xl">
            <Card variant="default" radius="lg" shadow="sm" className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <Text variant="h5" className="font-bold">🌍 Vue Hybride</Text>
                        <Text color="muted" variant="small">Paris, France</Text>
                    </div>
                    <div className="flex gap-2">
                        <Badge variant="info">Hybrid</Badge>
                        <Badge variant="outline">5 marqueurs</Badge>
                    </div>
                </div>
                <GoogleMap
                    apiKey={GOOGLE_MAPS_API_KEY}
                    center={parisCenter}
                    zoom={14}
                    markers={parisMarkers}
                    height={500}
                    showMarker
                    mapTypeId="hybrid"
                />
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Carte en vue hybride (satellite + route).',
            },
        },
    },
};

export const Terrain: Story = {
    render: () => (
        <div className="w-full max-w-7xl">
            <Card variant="default" radius="lg" shadow="sm" className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <Text variant="h5" className="font-bold">⛰️ Vue Terrain</Text>
                        <Text color="muted" variant="small">Paris, France</Text>
                    </div>
                    <div className="flex gap-2">
                        <Badge variant="success">Terrain</Badge>
                        <Badge variant="outline">5 marqueurs</Badge>
                    </div>
                </div>
                <GoogleMap
                    apiKey={GOOGLE_MAPS_API_KEY}
                    center={parisCenter}
                    zoom={13}
                    markers={parisMarkers}
                    height={500}
                    showMarker
                    mapTypeId="terrain"
                />
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Carte en vue terrain avec relief.',
            },
        },
    },
};

export const WithoutMarkers: Story = {
    render: () => (
        <div className="w-full max-w-7xl">
            <Card variant="default" radius="lg" shadow="sm" className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <Text variant="h5" className="font-bold">🗺️ Sans marqueurs</Text>
                        <Text color="muted" variant="small">Paris, France</Text>
                    </div>
                    <Badge variant="outline">Aucun marqueur</Badge>
                </div>
                <GoogleMap
                    apiKey={GOOGLE_MAPS_API_KEY}
                    center={parisCenter}
                    zoom={12}
                    markers={[]}
                    height={500}
                    showMarker={false}
                    mapTypeId="roadmap"
                />
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Carte sans marqueurs.',
            },
        },
    },
};

export const CustomSize: Story = {
    render: () => (
        <div className="w-full max-w-7xl">
            <Card variant="default" radius="lg" shadow="sm" className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <Text variant="h5" className="font-bold">📐 Taille personnalisée</Text>
                        <Text color="muted" variant="small">600px de hauteur</Text>
                    </div>
                    <Badge variant="primary">Grande</Badge>
                </div>
                <GoogleMap
                    apiKey={GOOGLE_MAPS_API_KEY}
                    center={parisCenter}
                    zoom={13}
                    markers={parisMarkers.slice(0, 3)}
                    height={600}
                    showMarker
                    mapTypeId="roadmap"
                />
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Carte avec hauteur personnalisée (600px).',
            },
        },
    },
};

export const MultipleCities: Story = {
    render: () => {
        const [currentCity, setCurrentCity] = useState<'paris' | 'london' | 'newyork' | 'tokyo'>('paris');

        const cities = {
            paris: { center: parisCenter, markers: parisMarkers, label: 'Paris' },
            london: { center: londonCenter, markers: londonMarkers, label: 'Londres' },
            newyork: { center: newYorkCenter, markers: [], label: 'New York' },
            tokyo: { center: tokyoCenter, markers: [], label: 'Tokyo' },
        };

        const current = cities[currentCity];

        return (
            <div className="w-full max-w-7xl">
                <Card variant="default" radius="lg" shadow="sm" className="p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <Text variant="h5" className="font-bold">🌍 Changer de ville</Text>
                            <Text color="muted" variant="small">{current.label}</Text>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(cities).map(([key, city]) => (
                                <Button
                                    key={key}
                                    variant={currentCity === key ? 'primary' : 'outline'}
                                    size="sm"
                                    onClick={() => setCurrentCity(key as any)}
                                >
                                    {city.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <GoogleMap
                        apiKey={GOOGLE_MAPS_API_KEY}
                        center={current.center}
                        zoom={12}
                        markers={current.markers}
                        height={500}
                        showMarker
                        mapTypeId="roadmap"
                    />
                </Card>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Changement de ville dynamique avec mise à jour de la carte.',
            },
        },
    },
};

export const WithInfoWindows: Story = {
    render: () => {
        const [selectedMarker, setSelectedMarker] = useState<{ lat: number; lng: number; title: string; info: string } | null>(null);

        return (
            <div className="w-full max-w-7xl">
                <Card variant="default" radius="lg" shadow="sm" className="p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <Text variant="h5" className="font-bold">ℹ️ Info Windows</Text>
                            <Text color="muted" variant="small">Cliquez sur un marqueur</Text>
                        </div>
                        {selectedMarker && (
                            <Badge variant="success">
                                {selectedMarker.title} sélectionné
                            </Badge>
                        )}
                    </div>
                    <GoogleMap
                        apiKey={GOOGLE_MAPS_API_KEY}
                        center={parisCenter}
                        zoom={13}
                        markers={parisMarkers}
                        height={500}
                        showMarker
                        mapTypeId="roadmap"
                        onMarkerClick={(_, index) => {
                            setSelectedMarker(parisMarkers[index] || null);
                        }}
                    />
                    {selectedMarker && (
                        <div className="mt-4 p-4 bg-primary/5 rounded-md border border-primary/10">
                            <Text variant="h6" className="font-bold text-primary">{selectedMarker.title}</Text>
                            <Text variant="small" color="muted">{selectedMarker.info}</Text>
                        </div>
                    )}
                </Card>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Carte avec Info Windows et callback sur clic.',
            },
        },
    },
};

export const InteractivePlayground: Story = {
    args: {
        apiKey: GOOGLE_MAPS_API_KEY,
        center: parisCenter,
        zoom: 13,
        markers: parisMarkers,
        height: 500,
        showMarker: true,
        mapTypeId: 'roadmap',
        loadingMessage: 'Chargement de la carte...',
        errorMessage: 'Impossible de charger la carte',
    },
    render: (args) => (
        <div className="w-full max-w-7xl">
            <Card variant="default" radius="lg" shadow="sm" className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <Text variant="h5" className="font-bold">🎮 Playground</Text>
                        <Text color="muted" variant="small">Testez les options</Text>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="primary">{args.mapTypeId}</Badge>
                        <Badge variant="outline">Zoom: {args.zoom}</Badge>
                    </div>
                </div>
                <GoogleMap {...args} />
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Playground interactif pour tester toutes les options.',
            },
        },
    },
};