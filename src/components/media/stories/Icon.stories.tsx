import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../Icon';
import {
    Home,
    User,
    Settings,
    Bell,
    Mail,
    Heart,
    Star,
    Search,
    Camera,
    Music,
    Video,
    Phone,
    MapPin,
    Calendar,
    Clock,
    Sun,
    Download,
    Upload,
    Share2,
    Trash2,
    Pencil,
    Plus,
    Minus,
    Check,
    X,
    AlertCircle,
    Info,
    HelpCircle,
    Loader2,
    Sparkles,
    Zap,
    Flame,
    Crown,
    Rocket,
    RefreshCw,
    ChevronRight,
} from 'lucide-react';
import { Flex } from '../../layout/Flex';

const meta: Meta<typeof Icon> = {
    title: 'Media/Icon',
    component: Icon,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'],
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'destructive', 'success', 'warning'],
        },
        stroke: {
            control: 'number',
            min: 1,
            max: 4,
            step: 0.5,
        },
        spin: { control: 'boolean' },
        pulse: { control: 'boolean' },
        bounce: { control: 'boolean' },
        rotate: { control: 'number' },
        flip: {
            control: 'select',
            options: ['horizontal', 'vertical', 'both'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
    args: {
        icon: Home,
        size: 'md',
        color: 'primary',
    },
};

export const Sizes: Story = {
    render: () => (
        <Flex gap={4} align="center">
            <Icon icon={Home} size="xs" />
            <Icon icon={Home} size="sm" />
            <Icon icon={Home} size="md" />
            <Icon icon={Home} size="lg" />
            <Icon icon={Home} size="xl" />
            <Icon icon={Home} size="2xl" />
            <Icon icon={Home} size="3xl" />
            <Icon icon={Home} size="4xl" />
        </Flex>
    ),
};

export const Colors: Story = {
    render: () => (
        <Flex gap={4} align="center">
            <Icon icon={Heart} color="primary" />
            <Icon icon={Heart} color="secondary" />
            <Icon icon={Heart} color="muted" />
            <Icon icon={Heart} color="destructive" />
            <Icon icon={Heart} color="success" />
            <Icon icon={Heart} color="warning" />
        </Flex>
    ),
};

export const WithCustomColor: Story = {
    args: {
        icon: Star,
        color: '#f59e0b',
        size: 'lg',
        fill: '#f59e0b',
    },
};

export const WithStroke: Story = {
    render: () => (
        <Flex gap={4} align="center">
            <Icon icon={Heart} stroke={1} />
            <Icon icon={Heart} stroke={1.5} />
            <Icon icon={Heart} stroke={2} />
            <Icon icon={Heart} stroke={2.5} />
            <Icon icon={Heart} stroke={3} />
            <Icon icon={Heart} stroke={4} />
        </Flex>
    ),
};

export const WithFill: Story = {
    render: () => (
        <Flex gap={4} align="center">
            <Icon icon={Heart} fill="none" />
            <Icon icon={Heart} fill="#ef4444" color="destructive" />
            <Icon icon={Star} fill="#f59e0b" color="warning" />
            <Icon icon={Check} fill="#22c55e" color="success" />
        </Flex>
    ),
};

export const Spin: Story = {
    args: {
        icon: Loader2,
        size: 'lg',
        spin: true,
        color: 'primary',
    },
};

export const Pulse: Story = {
    args: {
        icon: Bell,
        size: 'lg',
        pulse: true,
        color: 'destructive',
    },
};

export const Bounce: Story = {
    args: {
        icon: Rocket,
        size: 'lg',
        bounce: true,
        color: 'primary',
    },
};

export const Rotate: Story = {
    render: () => (
        <Flex gap={4} align="center">
            <Icon icon={RefreshCw} rotate={0} />
            <Icon icon={RefreshCw} rotate={45} />
            <Icon icon={RefreshCw} rotate={90} />
            <Icon icon={RefreshCw} rotate={180} />
            <Icon icon={RefreshCw} rotate={270} />
        </Flex>
    ),
};

export const Flip: Story = {
    render: () => (
        <Flex gap={4} align="center">
            <Icon icon={Home} />
            <Icon icon={Home} flip="horizontal" />
            <Icon icon={Home} flip="vertical" />
            <Icon icon={Home} flip="both" />
        </Flex>
    ),
};

export const CommonIcons: Story = {
    render: () => (
        <div className="grid grid-cols-4 gap-4 max-w-md">
            <Icon icon={Home} size="lg" />
            <Icon icon={User} size="lg" />
            <Icon icon={Settings} size="lg" />
            <Icon icon={Bell} size="lg" />
            <Icon icon={Mail} size="lg" />
            <Icon icon={Heart} size="lg" color="destructive" />
            <Icon icon={Star} size="lg" color="warning" />
            <Icon icon={Search} size="lg" />
            <Icon icon={Camera} size="lg" />
            <Icon icon={Music} size="lg" />
            <Icon icon={Video} size="lg" />
            <Icon icon={Phone} size="lg" />
            <Icon icon={MapPin} size="lg" />
            <Icon icon={Calendar} size="lg" />
            <Icon icon={Clock} size="lg" />
            <Icon icon={Sun} size="lg" color="warning" />
        </div>
    ),
};

// ❌ SUPPRIMÉ - Ces icônes n'existent pas dans Lucide React
// export const SocialIcons: Story = { ... }

export const Actions: Story = {
    render: () => (
        <Flex gap={4} align="center">
            <Icon icon={Download} size="lg" />
            <Icon icon={Upload} size="lg" />
            <Icon icon={Share2} size="lg" />
            <Icon icon={Trash2} size="lg" color="destructive" />
            <Icon icon={Pencil} size="lg" />
            <Icon icon={Plus} size="lg" color="success" />
            <Icon icon={Minus} size="lg" color="destructive" />
            <Icon icon={Check} size="lg" color="success" />
            <Icon icon={X} size="lg" color="destructive" />
        </Flex>
    ),
};

export const StatusIcons: Story = {
    render: () => (
        <Flex gap={4} align="center">
            <Icon icon={AlertCircle} size="lg" color="destructive" />
            <Icon icon={Info} size="lg" color="primary" />
            <Icon icon={HelpCircle} size="lg" color="muted" />
            <Icon icon={Check} size="lg" color="success" />
            <Icon icon={X} size="lg" color="destructive" />
        </Flex>
    ),
};

export const WithLabel: Story = {
    args: {
        icon: Home,
        size: 'lg',
        label: 'Home',
        color: 'primary',
    },
};

export const CombinedAnimations: Story = {
    render: () => (
        <Flex gap={6} align="center" className="p-8 bg-muted/10 rounded-xl">
            <Icon icon={Sparkles} size="xl" color="warning" spin pulse />
            <Icon icon={Zap} size="xl" color="warning" bounce />
            <Icon icon={Flame} size="xl" color="destructive" pulse />
            <Icon icon={Crown} size="xl" color="primary" bounce />
        </Flex>
    ),
};

export const IconWithText: Story = {
    render: () => (
        <Flex gap={2} align="center" className="p-4 bg-card rounded-md border border-border">
            <Icon icon={Home} size="md" color="primary" />
            <span className="text-foreground font-medium">Accueil</span>
            <Icon icon={ChevronRight} size="sm" color="muted" />
            <span className="text-muted-foreground">Services</span>
            <Icon icon={ChevronRight} size="sm" color="muted" />
            <span className="text-muted-foreground">Contact</span>
        </Flex>
    ),
};