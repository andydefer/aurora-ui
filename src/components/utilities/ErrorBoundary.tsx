// src/components/utilities/ErrorBoundary.tsx
import { ReactNode, Component, ErrorInfo } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, TextColor } from '../../types';
import { AlertCircle, RefreshCw, Home, ChevronLeft, Bug, Server, WifiOff, Shield } from 'lucide-react';
import { Button } from '../forms/Button';
import { Text } from '../typography/Text';
import { Card } from '../overlay/Card';

export type ErrorVariant = 'default' | 'minimal' | 'card' | 'fullscreen' | 'inline';
export type ErrorType = 'generic' | 'network' | 'server' | 'notfound' | 'forbidden';

export interface ErrorBoundaryProps extends LayoutBaseProps {
    children: ReactNode;
    fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
    variant?: ErrorVariant;
    errorType?: ErrorType;
    showDetails?: boolean;
    showReset?: boolean;
    resetText?: string;
    title?: string;
    description?: string;
    color?: TextColor;
    icon?: ReactNode;
    actions?: ReactNode[];
    onRetry?: () => void;
    onHome?: () => void;
    onBack?: () => void;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
    retryCount: number;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
            retryCount: 0
        };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error, errorInfo: null, retryCount: 0 };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ errorInfo });
        this.props.onError?.(error, errorInfo);
    }

    reset = () => {
        this.setState((prev) => ({
            hasError: false,
            error: null,
            errorInfo: null,
            retryCount: prev.retryCount + 1
        }));
    };

    getErrorIcon = () => {
        const { errorType, icon } = this.props;

        if (icon) return icon;

        const icons = {
            generic: <AlertCircle size={48} />,
            network: <WifiOff size={48} />,
            server: <Server size={48} />,
            notfound: <Bug size={48} />,
            forbidden: <Shield size={48} />,
        };

        return icons[errorType || 'generic'];
    };

    getErrorTitle = () => {
        const { errorType, title } = this.props;

        if (title) return title;

        const titles = {
            generic: 'Une erreur est survenue',
            network: 'Problème de connexion',
            server: 'Erreur serveur',
            notfound: 'Page non trouvée',
            forbidden: 'Accès refusé',
        };

        return titles[errorType || 'generic'];
    };

    getErrorDescription = () => {
        const { errorType, description } = this.props;

        if (description) return description;

        const descriptions = {
            generic: 'Nous nous excusons pour la gêne occasionnée. Veuillez réessayer.',
            network: 'Vérifiez votre connexion internet et réessayez.',
            server: 'Le serveur rencontre des difficultés. Veuillez réessayer plus tard.',
            notfound: 'La page que vous recherchez n\'existe pas ou a été déplacée.',
            forbidden: 'Vous n\'avez pas les droits nécessaires pour accéder à cette page.',
        };

        return descriptions[errorType || 'generic'];
    };

    render() {
        const {
            children,
            fallback,
            className = '',
            style = {},
            variant = 'default',
            showDetails = false,
            showReset = true,
            resetText = 'Réessayer',
            color = 'danger',
            actions = [],
            onRetry,
            onHome,
            onBack,
        } = this.props;
        const { hasError, error, errorInfo, retryCount } = this.state;

        if (hasError) {
            if (typeof fallback === 'function') {
                return fallback(error as Error, this.reset);
            }

            if (fallback) {
                return fallback;
            }

            const variantClasses = {
                default: 'p-6 rounded-lg border bg-card',
                minimal: 'p-4 rounded-lg border-0 bg-transparent',
                card: 'p-0 bg-transparent shadow-none max-w-lg mx-auto',
                fullscreen: 'fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/95 backdrop-blur-sm',
                inline: 'p-4 rounded-lg border bg-card/50',
            };

            const colorClasses: Record<TextColor, string> = {
                primary: 'border-primary/30 text-primary bg-primary/5',
                secondary: 'border-secondary/30 text-secondary bg-secondary/5',
                muted: 'border-muted/30 text-muted-foreground bg-muted/5',
                danger: 'border-danger/30 text-danger bg-danger/5',
                success: 'border-success/30 text-success bg-success/5',
                warning: 'border-warning/30 text-warning bg-warning/5',
            };

            const isFullscreen = variant === 'fullscreen';
            const isCard = variant === 'card';
            const isInline = variant === 'inline';
            const errorIcon = this.getErrorIcon();
            const errorTitle = this.getErrorTitle();
            const errorDescription = this.getErrorDescription();

            const content = (
                <div className="flex flex-col items-center text-center">
                    {/* Icône avec animation */}
                    <div className={clsx(
                        'flex items-center justify-center w-20 h-20 rounded-full mb-5 transition-all duration-300',
                        colorClasses[color],
                        'border-2',
                        'animate-in fade-in zoom-in duration-500'
                    )}>
                        <span className="text-3xl">{errorIcon}</span>
                    </div>

                    {/* Titre */}
                    <Text
                        variant="h4"
                        className={clsx(
                            'font-bold text-xl sm:text-2xl',
                            colorClasses[color]
                        )}
                    >
                        {errorTitle}
                    </Text>

                    {/* Description */}
                    <Text
                        color="muted"
                        className="mt-2 max-w-md text-sm sm:text-base"
                    >
                        {errorDescription}
                    </Text>

                    {/* Code d'erreur */}
                    {error && (
                        <div className="mt-2">
                            <span className="text-xs font-mono text-muted-foreground/60">
                                Erreur: {error.name || 'Error'}
                                {retryCount > 0 && ` • Tentative ${retryCount}`}
                            </span>
                        </div>
                    )}

                    {/* Message d'erreur */}
                    {error && (
                        <div className={clsx(
                            'mt-4 p-4 rounded-lg w-full max-w-md text-left',
                            'bg-muted/20 border border-border/50',
                            'font-mono text-sm overflow-auto max-h-32',
                            'transition-all duration-300'
                        )}>
                            <code className="text-foreground/80 break-all">
                                {error.message}
                            </code>
                        </div>
                    )}

                    {/* Détails techniques */}
                    {showDetails && errorInfo && (
                        <div className="mt-4 w-full max-w-md">
                            <details className="text-left group">
                                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                                    <span className="group-open:rotate-180 transition-transform">▼</span>
                                    Voir les détails techniques
                                </summary>
                                <div className="mt-2 p-4 rounded-lg bg-muted/10 border border-border/50 overflow-auto max-h-48">
                                    <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
                                        {errorInfo.componentStack}
                                    </pre>
                                </div>
                            </details>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                        {showReset && (
                            <Button
                                variant="primary"
                                size="md"
                                icon={<RefreshCw size={16} className={clsx(
                                    retryCount > 0 && 'animate-spin'
                                )} />}
                                onClick={() => {
                                    onRetry?.();
                                    this.reset();
                                }}
                                className="min-w-[120px]"
                            >
                                {retryCount > 0 ? `Réessayer (${retryCount})` : resetText}
                            </Button>
                        )}

                        <Button
                            variant="outline"
                            size="md"
                            icon={<Home size={16} />}
                            onClick={() => {
                                onHome?.();
                                window.location.href = '/';
                            }}
                        >
                            Accueil
                        </Button>

                        <Button
                            variant="ghost"
                            size="md"
                            icon={<ChevronLeft size={16} />}
                            onClick={() => {
                                onBack?.();
                                window.history.back();
                            }}
                        >
                            Retour
                        </Button>

                        {actions.map((action, index) => (
                            <span key={index}>{action}</span>
                        ))}
                    </div>

                    {/* Message de retry */}
                    {retryCount > 0 && (
                        <Text variant="caption" color="muted" className="mt-4">
                            Tentative de réessai #{retryCount}
                        </Text>
                    )}
                </div>
            );

            if (isCard) {
                return (
                    <Card
                        variant="default"
                        radius="lg"
                        shadow="md"
                        className={clsx(
                            'overflow-hidden',
                            colorClasses[color],
                            className
                        )}
                        style={style}
                    >
                        <div className="p-8">
                            {content}
                        </div>
                    </Card>
                );
            }

            if (isInline) {
                return (
                    <div
                        className={clsx(
                            'flex flex-col transition-all duration-300',
                            variantClasses[variant],
                            colorClasses[color],
                            className
                        )}
                        style={style}
                        role="alert"
                    >
                        <div className="flex items-start gap-4">
                            <span className="text-2xl">{errorIcon}</span>
                            <div className="flex-1 text-left">
                                <Text variant="h6" className="font-bold">
                                    {errorTitle}
                                </Text>
                                <Text variant="small" color="muted">
                                    {errorDescription}
                                </Text>
                                {showReset && (
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        icon={<RefreshCw size={14} />}
                                        onClick={() => {
                                            onRetry?.();
                                            this.reset();
                                        }}
                                        className="mt-2"
                                    >
                                        {resetText}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                );
            }

            return (
                <div
                    className={clsx(
                        'flex flex-col transition-all duration-300',
                        variantClasses[variant],
                        colorClasses[color],
                        isFullscreen && 'min-h-screen',
                        className
                    )}
                    style={style}
                    role="alert"
                >
                    {content}
                </div>
            );
        }

        return children;
    }
}

export default ErrorBoundary;