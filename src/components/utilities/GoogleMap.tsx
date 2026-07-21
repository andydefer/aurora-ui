// src/components/utilities/GoogleMap.tsx
import { useEffect, useRef, useState } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';
import { Loader2, MapPin, AlertCircle } from 'lucide-react';

export interface GoogleMapProps extends LayoutBaseProps {
    apiKey?: string;
    center?: { lat: number; lng: number };
    zoom?: number;
    markers?: Array<{ lat: number; lng: number; title?: string; info?: string }>;
    height?: number | string;
    width?: number | string;
    loadingMessage?: string;
    errorMessage?: string;
    showMarker?: boolean;
    mapTypeId?: 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
    onMapLoad?: (map: any) => void;
    onMarkerClick?: (marker: any, index: number) => void;
    className?: string;
}

declare global {
    interface Window {
        google: any;
        initGoogleMap?: () => void;
    }
}

export function GoogleMap({
    apiKey,
    center = { lat: 48.8566, lng: 2.3522 },
    zoom = 12,
    markers = [],
    height = 400,
    width = '100%',
    loadingMessage = 'Chargement de la carte...',
    errorMessage = 'Impossible de charger la carte',
    showMarker = true,
    mapTypeId = 'roadmap',
    onMapLoad,
    onMarkerClick,
    className = '',
    style = {},
}: GoogleMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [map, setMap] = useState<any>(null);
    const [markersRef, setMarkersRef] = useState<any[]>([]);

    const heightStyle = typeof height === 'number' ? `${height}px` : height;
    const widthStyle = typeof width === 'number' ? `${width}px` : width;

    const initMap = () => {
        if (!mapRef.current || !window.google?.maps) {
            setError(errorMessage);
            setLoading(false);
            return;
        }

        try {
            const mapInstance = new window.google.maps.Map(mapRef.current, {
                center: center,
                zoom: zoom,
                mapTypeId: mapTypeId,
                streetViewControl: false,
                mapTypeControl: true,
                fullscreenControl: true,
                zoomControl: true,
            });

            setMap(mapInstance);
            onMapLoad?.(mapInstance);
            setLoading(false);

            // Ajouter les marqueurs
            if (showMarker && markers.length > 0) {
                const newMarkers = markers.map((marker, index) => {
                    const markerInstance = new window.google.maps.Marker({
                        position: { lat: marker.lat, lng: marker.lng },
                        map: mapInstance,
                        title: marker.title || `Marker ${index + 1}`,
                    });

                    // Info window
                    if (marker.info) {
                        const infoWindow = new window.google.maps.InfoWindow({
                            content: marker.info,
                        });
                        markerInstance.addListener('click', () => {
                            infoWindow.open(mapInstance, markerInstance);
                            onMarkerClick?.(markerInstance, index);
                        });
                    } else {
                        markerInstance.addListener('click', () => {
                            onMarkerClick?.(markerInstance, index);
                        });
                    }

                    return markerInstance;
                });

                setMarkersRef(newMarkers);
            }
        } catch (err) {
            setError(errorMessage);
            setLoading(false);
        }
    };

    useEffect(() => {
        // Si déjà chargé
        if (window.google?.maps) {
            initMap();
            return;
        }

        // Nettoyer l'ancien callback
        if (window.initGoogleMap) {
            delete window.initGoogleMap;
        }

        window.initGoogleMap = () => {
            if (window.initGoogleMap) {
                delete window.initGoogleMap;
            }
            initMap();
        };

        const script = document.createElement('script');
        const key = apiKey || process.env.GOOGLE_MAPS_API_KEY || '';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initGoogleMap`;
        script.async = true;
        script.defer = true;
        script.onerror = () => {
            setError(errorMessage);
            setLoading(false);
        };
        document.head.appendChild(script);

        return () => {
            if (script.parentNode) script.parentNode.removeChild(script);
            if (window.initGoogleMap) {
                delete window.initGoogleMap;
            }
            // Nettoyer les marqueurs
            markersRef.forEach(marker => {
                if (marker.setMap) {
                    marker.setMap(null);
                }
            });
        };
    }, [apiKey, center, zoom, mapTypeId]);

    // Mettre à jour les marqueurs si les markers changent
    useEffect(() => {
        if (!map || !showMarker) return;

        // Supprimer les anciens marqueurs
        markersRef.forEach(marker => {
            if (marker.setMap) {
                marker.setMap(null);
            }
        });

        const newMarkers = markers.map((marker, index) => {
            const markerInstance = new window.google.maps.Marker({
                position: { lat: marker.lat, lng: marker.lng },
                map: map,
                title: marker.title || `Marker ${index + 1}`,
            });

            if (marker.info) {
                const infoWindow = new window.google.maps.InfoWindow({
                    content: marker.info,
                });
                markerInstance.addListener('click', () => {
                    infoWindow.open(map, markerInstance);
                    onMarkerClick?.(markerInstance, index);
                });
            } else {
                markerInstance.addListener('click', () => {
                    onMarkerClick?.(markerInstance, index);
                });
            }

            return markerInstance;
        });

        setMarkersRef(newMarkers);
    }, [markers, map, showMarker]);

    const classes = clsx(
        'relative overflow-hidden rounded-md',
        className
    );


    if (error) {
        return (
            <div
                className="flex items-center justify-center rounded-md bg-destructive/10 border border-destructive/30"
                style={{ height: heightStyle, width: widthStyle }}
            >
                <div className="flex flex-col items-center gap-2 text-destructive">
                    <AlertCircle size={32} />
                    <span className="text-sm font-medium">{error}</span>
                    <span className="text-xs text-muted-foreground">Veuillez réessayer</span>
                </div>
            </div>
        );
    }

    return (
        <div className={classes} style={{ position: 'relative', width: widthStyle, height: heightStyle, ...style }}>
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted/50 backdrop-blur-sm z-10 rounded-md">
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="animate-spin text-primary" size={32} />
                        <span className="text-sm text-muted-foreground">{loadingMessage}</span>
                    </div>
                </div>
            )}
            <div ref={mapRef} className="w-full h-full rounded-md" />

            {/* Indicateur de marqueurs */}
            {!loading && markers.length > 0 && showMarker && (
                <div className="absolute bottom-3 right-3 z-10 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm border border-border/50 text-xs text-muted-foreground shadow-sm flex items-center gap-1.5">
                    <MapPin size={12} className="text-primary" />
                    {markers.length} marqueur{markers.length > 1 ? 's' : ''}
                </div>
            )}
        </div>
    );
}

export default GoogleMap;