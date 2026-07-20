import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, TextColor } from '../../types';
import { MapPin, Globe, Mail, Phone, Building, Navigation, Home, Briefcase, CreditCard, Package, ChevronRight } from 'lucide-react';

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface AddressData {
    street?: string;
    city?: string;
    country?: string;
    postalCode?: string;
    geoCoordinates?: Coordinates;
    addressType?: 'home' | 'work' | 'billing' | 'shipping' | 'other';
    metadata?: Record<string, unknown>;
    phone?: string;
    email?: string;
    building?: string;
    floor?: string;
    apartment?: string;
    name?: string;
}

export interface AddressProps extends LayoutBaseProps {
    address: AddressData;
    color?: TextColor;
    showCoordinates?: boolean;
    showIcon?: boolean;
    showType?: boolean;
    compact?: boolean;
    withMap?: boolean;
    interactive?: boolean;
}

export function Address({
    address,
    showCoordinates = false,
    showIcon = true,
    showType = false,
    compact = false,
    withMap = false,
    interactive = false,
    className = '',
    style = {},
}: AddressProps) {
    const typeConfig = {
        home: { label: 'Domicile', icon: Home, color: 'bg-emerald-500/10 text-emerald-500' },
        work: { label: 'Professionnel', icon: Briefcase, color: 'bg-blue-500/10 text-blue-500' },
        billing: { label: 'Facturation', icon: CreditCard, color: 'bg-purple-500/10 text-purple-500' },
        shipping: { label: 'Livraison', icon: Package, color: 'bg-amber-500/10 text-amber-500' },
        other: { label: 'Autre', icon: MapPin, color: 'bg-gray-500/10 text-gray-500' },
    };

    const TypeIcon = address.addressType ? typeConfig[address.addressType].icon : MapPin;
    const typeInfo = address.addressType ? typeConfig[address.addressType] : null;

    const formatCoordinates = (coords?: Coordinates) => {
        if (!coords) return null;
        return `${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)}`;
    };

    const openMap = () => {
        if (!address.geoCoordinates) return;
        const { latitude, longitude } = address.geoCoordinates;
        window.open(`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}&zoom=15`, '_blank');
    };

    const classes = clsx(
        'group relative flex flex-col gap-2 rounded-2xl border bg-white/50 backdrop-blur-sm transition-all duration-300',
        'hover:shadow-xl hover:scale-[1.01] hover:border-primary/20',
        compact ? 'p-3 gap-1' : 'p-5 gap-2.5',
        interactive && 'cursor-pointer',
        className
    );

    const textClasses = clsx(
        'text-foreground',
        compact ? 'text-sm' : 'text-base'
    );

    const labelClasses = clsx(
        'text-muted-foreground',
        compact ? 'text-xs' : 'text-sm'
    );

    return (
        <address className={classes} style={style}>
            {/* Header avec type et actions */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                    {showType && typeInfo && (
                        <span className={clsx(
                            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
                            typeInfo.color
                        )}>
                            <TypeIcon size={12} />
                            {typeInfo.label}
                        </span>
                    )}
                    {address.name && (
                        <span className="text-sm font-semibold text-foreground">
                            {address.name}
                        </span>
                    )}
                </div>
                {interactive && (
                    <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                )}
            </div>

            {/* Contenu principal */}
            <div className="space-y-1.5">
                {/* Building / Company */}
                {address.building && (
                    <div className="flex items-start gap-2.5">
                        {showIcon && <Building size={16} className="text-muted-foreground mt-0.5 shrink-0" />}
                        <span className={textClasses}>{address.building}</span>
                    </div>
                )}

                {/* Street */}
                {address.street && (
                    <div className="flex items-start gap-2.5">
                        {showIcon && <MapPin size={16} className="text-muted-foreground mt-0.5 shrink-0" />}
                        <span className={textClasses}>
                            {address.street}
                            {address.apartment && `, Apt ${address.apartment}`}
                            {address.floor && `, Étage ${address.floor}`}
                        </span>
                    </div>
                )}

                {/* City, Postal Code */}
                {(address.city || address.postalCode) && (
                    <div className="flex items-start gap-2.5">
                        {showIcon && <Navigation size={16} className="text-muted-foreground mt-0.5 shrink-0" />}
                        <span className={textClasses}>
                            {address.postalCode && `${address.postalCode} `}
                            {address.city}
                            {address.country && `, ${address.country}`}
                        </span>
                    </div>
                )}

                {/* Contact - Phone & Email inline */}
                {(address.phone || address.email) && (
                    <div className="flex flex-wrap items-center gap-3 mt-1 pt-2 border-t border-border/50">
                        {address.phone && (
                            <a
                                href={`tel:${address.phone}`}
                                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Phone size={14} />
                                {address.phone}
                            </a>
                        )}
                        {address.email && (
                            <a
                                href={`mailto:${address.email}`}
                                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Mail size={14} />
                                {address.email}
                            </a>
                        )}
                    </div>
                )}
            </div>

            {/* Footer - Coordinates & Map */}
            {(showCoordinates && address.geoCoordinates) && (
                <div className="flex items-center justify-between mt-1 pt-2 border-t border-border/50">
                    <div className="flex items-center gap-2">
                        <Globe size={14} className="text-muted-foreground" />
                        <span className={clsx(labelClasses, 'font-mono')}>
                            {formatCoordinates(address.geoCoordinates)}
                        </span>
                    </div>
                    {withMap && (
                        <button
                            onClick={openMap}
                            className="flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                        >
                            Voir sur la carte
                        </button>
                    )}
                </div>
            )}

            {/* Metadata - Tags */}
            {address.metadata && Object.keys(address.metadata).length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1 pt-2 border-t border-border/50">
                    {Object.entries(address.metadata).map(([key, value]) => (
                        <span
                            key={key}
                            className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-muted/30 text-muted-foreground"
                        >
                            {key}: {String(value)}
                        </span>
                    ))}
                </div>
            )}
        </address>
    );
}

export default Address;