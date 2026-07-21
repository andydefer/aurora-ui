// src/components/utilities/stories/Table.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '../Table';
import { Card } from '../../overlay/Card';
import { Text } from '../../typography/Text';
import { Badge } from '../../feedback/Badge';
import { Button } from '../../forms/Button';
import { Edit, Trash2, Eye, Star } from 'lucide-react';

const meta: Meta<typeof Table> = {
    title: 'Utilities/Table',
    component: Table,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un tableau sans bordure avec différentes variantes et styles.',
            },
        },
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'striped', 'hover', 'bordered', 'minimal'],
            description: 'Style du tableau',
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
        compact: { control: 'boolean' },
        stickyHeader: { control: 'boolean' },
        showHeader: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Table>;

// ============ DONNÉES ============

const products = [
    { id: 1, name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', price: '$2999', stock: 231, status: 'In Stock' },
    { id: 2, name: 'Microsoft Surface Pro', color: 'White', category: 'Laptop PC', price: '$1999', stock: 423, status: 'In Stock' },
    { id: 3, name: 'Magic Mouse 2', color: 'Black', category: 'Accessories', price: '$99', stock: 121, status: 'Low Stock' },
    { id: 4, name: 'Google Pixel Phone', color: 'Gray', category: 'Phone', price: '$799', stock: 0, status: 'Out of Stock' },
    { id: 5, name: 'Apple Watch 5', color: 'Red', category: 'Wearables', price: '$999', stock: 56, status: 'In Stock' },
];

const columns = [
    { key: 'name', header: 'Product name', accessor: (item: any) => item.name },
    { key: 'color', header: 'Color' },
    { key: 'category', header: 'Category' },
    { key: 'price', header: 'Price' },
    { key: 'stock', header: 'Stock' },
];

const columnsWithStatus = [
    { key: 'name', header: 'Product name' },
    { key: 'color', header: 'Color' },
    { key: 'category', header: 'Category' },
    { key: 'price', header: 'Price' },
    {
        key: 'status',
        header: 'Status',
        cell: (item: any) => (
            <Badge
                variant={
                    item.status === 'In Stock' ? 'success' :
                        item.status === 'Low Stock' ? 'warning' :
                            'destructive'
                }
                size="sm"
            >
                {item.status}
            </Badge>
        )
    },
];

const columnsWithActions = [
    { key: 'name', header: 'Product name' },
    { key: 'color', header: 'Color' },
    { key: 'category', header: 'Category' },
    { key: 'price', header: 'Price' },
    {
        key: 'status',
        header: 'Status',
        cell: (item: any) => (
            <Badge
                variant={
                    item.status === 'In Stock' ? 'success' :
                        item.status === 'Low Stock' ? 'warning' :
                            'destructive'
                }
                size="sm"
            >
                {item.status}
            </Badge>
        )
    },
    {
        key: 'actions',
        header: 'Action',
        align: 'right' as const,
        cell: (_: any) => (
            <div className="flex items-center justify-end gap-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10 transition-all duration-200 hover:scale-110">
                    <Eye size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10 transition-all duration-200 hover:scale-110">
                    <Edit size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-200 hover:scale-110">
                    <Trash2 size={16} />
                </Button>
            </div>
        )
    }
];

// ============ STORIES ============

export const Default: Story = {
    render: () => (
        <div className="w-full max-w-4xl">
            <Table
                columns={columns}
                data={products}
                variant="default"
                size="md"
            />
        </div>
    ),
};

export const Striped: Story = {
    render: () => (
        <div className="w-full max-w-4xl">
            <Table
                columns={columns}
                data={products}
                variant="striped"
                size="md"
            />
        </div>
    ),
};

export const Hover: Story = {
    render: () => (
        <div className="w-full max-w-4xl">
            <Table
                columns={columns}
                data={products}
                variant="hover"
                size="md"
            />
        </div>
    ),
};

export const Bordered: Story = {
    render: () => (
        <div className="w-full max-w-4xl">
            <Table
                columns={columns}
                data={products}
                variant="bordered"
                size="md"
            />
        </div>
    ),
};

export const Minimal: Story = {
    render: () => (
        <div className="w-full max-w-4xl">
            <Table
                columns={columns}
                data={products}
                variant="minimal"
                size="md"
            />
        </div>
    ),
};

export const WithStatus: Story = {
    render: () => (
        <div className="w-full max-w-4xl">
            <Table
                columns={columnsWithStatus}
                data={products}
                variant="default"
                size="md"
            />
        </div>
    ),
};

export const WithActions: Story = {
    render: () => (
        <div className="w-full max-w-4xl">
            <Table
                columns={columnsWithActions}
                data={products}
                variant="hover"
                size="md"
            />
        </div>
    ),
};

export const Compact: Story = {
    render: () => (
        <div className="w-full max-w-4xl">
            <Table
                columns={columns}
                data={products}
                variant="default"
                size="md"
                compact
            />
        </div>
    ),
};

export const StickyHeader: Story = {
    render: () => (
        <div className="w-full max-w-4xl max-h-[300px] overflow-y-auto">
            <Table
                columns={columns}
                data={products}
                variant="default"
                size="md"
                stickyHeader
            />
        </div>
    ),
};

export const Empty: Story = {
    render: () => (
        <div className="w-full max-w-4xl">
            <Table
                columns={columns}
                data={[]}
                variant="default"
                size="md"
                emptyMessage="Aucun produit trouvé"
            />
        </div>
    ),
};

// ============ AVEC CONTENU RICHE ============

export const RichContent: Story = {
    render: () => (
        <div className="w-full max-w-4xl">
            <Table
                columns={[
                    { key: 'name', header: 'Product' },
                    {
                        key: 'rating',
                        header: 'Rating',
                        cell: () => (
                            <div className="flex items-center gap-1">
                                <Star size={14} className="fill-warning text-warning" />
                                <Star size={14} className="fill-warning text-warning" />
                                <Star size={14} className="fill-warning text-warning" />
                                <Star size={14} className="fill-warning text-warning" />
                                <Star size={14} className="text-muted" />
                            </div>
                        )
                    },
                    {
                        key: 'status',
                        header: 'Status',
                        cell: (item: any) => (
                            <Badge
                                variant={
                                    item.status === 'In Stock' ? 'success' :
                                        item.status === 'Low Stock' ? 'warning' :
                                            'destructive'
                                }
                                size="sm"
                            >
                                {item.status}
                            </Badge>
                        )
                    },
                    {
                        key: 'price',
                        header: 'Price',
                        className: 'font-semibold text-primary',
                        cell: (item: any) => item.price
                    },
                    {
                        key: 'actions',
                        header: '',
                        align: 'right' as const,
                        cell: () => (
                            <Button variant="primary" size="sm">
                                View Details
                            </Button>
                        )
                    }
                ]}
                data={products}
                variant="striped"
                size="md"
                onRowClick={(item) => console.log('Row clicked:', item)}
            />
        </div>
    ),
};

// ============ AVEC CARD ============

export const InCard: Story = {
    render: () => (
        <div className="w-full max-w-4xl">
            <Card variant="default" radius="lg" shadow="md" className="overflow-hidden">
                <div className="p-6 border-b border-border">
                    <div className="flex items-center justify-between">
                        <div>
                            <Text variant="h5" className="font-bold">Produits</Text>
                            <Text variant="small" color="muted">Liste des produits disponibles</Text>
                        </div>
                        <Button variant="primary" size="sm">
                            Ajouter
                        </Button>
                    </div>
                </div>
                <Table
                    columns={columnsWithActions}
                    data={products}
                    variant="minimal"
                    size="md"
                />
            </Card>
        </div>
    ),
};