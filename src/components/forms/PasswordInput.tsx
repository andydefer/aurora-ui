// src/components/forms/PasswordInput.tsx
import { useState, useEffect, forwardRef } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, Size } from '../../types';
import { Eye, EyeOff, Lock, Shield, CheckCircle, AlertCircle, Info, Key, User, Zap, ChevronDown } from 'lucide-react';
import { Input } from './Input';
import { Badge } from '../feedback/Badge';
import { Dialog } from '../overlay/Dialog';
import { Text } from '../typography/Text';

export type PasswordStrength = 'weak' | 'medium' | 'strong' | 'very_strong';

export interface PasswordRequirement {
    id: string;
    label: string;
    met: boolean;
    required: boolean;
}

export interface PasswordInputProps extends LayoutBaseProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    error?: string;
    success?: boolean;
    disabled?: boolean;
    required?: boolean;
    size?: Size;
    showStrength?: boolean;
    showRequirements?: boolean;
    showRules?: boolean;
    userInfo?: {
        name?: string;
        email?: string;
    };
    onStrengthChange?: (strength: PasswordStrength, score: number) => void;
    autoComplete?: string;
    name?: string;
    id?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({
    value,
    onChange,
    label = 'Mot de passe',
    placeholder = 'Entrez votre mot de passe',
    error,
    success = false,
    disabled = false,
    required = false,
    size = 'md',
    showStrength = true,
    showRequirements = true,
    showRules = true,
    userInfo,
    onStrengthChange,
    autoComplete = 'new-password',
    name,
    id,
    className = '',
    style = {},
}, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [showRulesModal, setShowRulesModal] = useState(false);
    const [showRequirementsAccordion, setShowRequirementsAccordion] = useState(false);
    const [requirements, setRequirements] = useState<PasswordRequirement[]>([
        { id: 'length', label: 'Au moins 8 caractères', met: false, required: true },
        { id: 'uppercase', label: 'Au moins une majuscule (A-Z)', met: false, required: true },
        { id: 'lowercase', label: 'Au moins une minuscule (a-z)', met: false, required: true },
        { id: 'number', label: 'Au moins un chiffre (0-9)', met: false, required: true },
        { id: 'symbol', label: 'Au moins un symbole (!@#$%^&*)', met: false, required: true },
        { id: 'personal', label: 'Aucune information personnelle', met: true, required: true },
        { id: 'length_optimal', label: '8-16 caractères (recommandé)', met: false, required: false },
    ]);

    const [strength, setStrength] = useState<{ level: PasswordStrength; score: number; message: string }>({
        level: 'weak',
        score: 0,
        message: 'Commencez à taper votre mot de passe',
    });

    const checkPersonalInfo = (password: string): boolean => {
        if (!userInfo || !password) return true;
        const lowerPassword = password.toLowerCase();
        const lowerName = userInfo.name?.toLowerCase() || '';
        const emailLocal = userInfo.email?.split('@')[0].toLowerCase() || '';

        if (lowerName && lowerPassword.includes(lowerName)) return false;
        const nameParts = lowerName.split(' ');
        for (const part of nameParts) {
            if (part.length >= 4 && lowerPassword.includes(part)) return false;
        }
        if (emailLocal.length >= 4 && lowerPassword.includes(emailLocal)) return false;
        return true;
    };

    const evaluatePassword = (password: string) => {
        const checks = {
            length: password.length >= 8,
            length_optimal: password.length >= 8 && password.length <= 16,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            symbol: /[\W_]/.test(password),
            personal: checkPersonalInfo(password),
        };

        const updatedRequirements = requirements.map((req) => ({
            ...req,
            met: checks[req.id as keyof typeof checks] || false,
        }));
        setRequirements(updatedRequirements);

        if (showStrength) {
            const requiredReqs = updatedRequirements.filter((r) => r.required);
            const metRequired = requiredReqs.filter((r) => r.met).length;
            const score = requiredReqs.length > 0 ? Math.round((metRequired / requiredReqs.length) * 100) : 0;

            let level: PasswordStrength = 'weak';
            let message = 'Commencez à taper votre mot de passe';

            if (score === 0) { level = 'weak'; message = 'Commencez à taper votre mot de passe'; }
            else if (score < 40) { level = 'weak'; message = 'Mot de passe faible'; }
            else if (score < 60) { level = 'medium'; message = 'Mot de passe moyen'; }
            else if (score < 80) { level = 'strong'; message = 'Mot de passe fort'; }
            else { level = 'very_strong'; message = 'Excellent ! Mot de passe sécurisé'; }

            if (checks.length_optimal && score >= 80) {
                message = 'Parfait ! Mot de passe optimal';
            }

            setStrength({ level, score, message });
            onStrengthChange?.(level, score);
        }
    };

    useEffect(() => {
        evaluatePassword(value);
    }, [value]);

    const getStrengthColor = (): string => {
        switch (strength.level) {
            case 'weak': return 'bg-destructive';
            case 'medium': return 'bg-warning';
            case 'strong': return 'bg-success';
            case 'very_strong': return 'bg-primary';
            default: return 'bg-muted';
        }
    };

    const getStrengthLabel = (): string => {
        switch (strength.level) {
            case 'weak': return 'Faible';
            case 'medium': return 'Moyen';
            case 'strong': return 'Fort';
            case 'very_strong': return 'Excellent';
            default: return '—';
        }
    };

    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleRequirements = () => setShowRequirementsAccordion(!showRequirementsAccordion);

    const mandatoryRules = [
        { icon: <Lock size={18} />, title: 'Longueur minimale', description: 'Au moins 8 caractères', details: 'La longueur est le premier critère de sécurité. Plus votre mot de passe est long, plus il est sécurisé.' },
        { icon: <Key size={18} />, title: 'Complexité obligatoire', description: 'Majuscules, minuscules, chiffres ET symboles', details: 'La combinaison de différents types de caractères augmente exponentiellement la sécurité.' },
        { icon: <User size={18} />, title: 'Confidentialité', description: 'Aucune information personnelle', details: 'Votre nom, prénom, email ou date de naissance ne doivent pas apparaître dans le mot de passe.' },
        { icon: <Shield size={18} />, title: 'Historique sécurisé', description: 'Pas de réutilisation récente', details: 'Les 10 derniers mots de passe que vous avez utilisés ne sont pas autorisés.' },
    ];

    const recommendedRules = [
        { icon: <Zap size={18} />, title: 'Longueur optimale', description: '8-16 caractères recommandés', details: 'Cette longueur offre le meilleur équilibre entre sécurité et facilité de mémorisation.' },
        { icon: <Shield size={18} />, title: 'Originalité', description: 'Mot de passe unique', details: "N'utilisez pas ce mot de passe sur d'autres plateformes pour éviter les risques en cascade." },
    ];

    const tips = [
        { icon: '🔐', text: "Utilisez une phrase de passe : 'MonChatPréféré2024!'" },
        { icon: '🎲', text: 'Remplacez des lettres par des chiffres/symboles : @ pour a, 3 pour E' },
        { icon: '📝', text: "Créez une acronyme : 'J@i1C@tQ%iS@pp3ll3M!st!gR1x'" },
        { icon: '🚫', text: 'Évitez les suites logiques : 123456, azerty, qwerty' },
    ];

    const strengthLevels = [
        { label: 'Faible', color: 'bg-destructive' },
        { label: 'Moyen', color: 'bg-warning' },
        { label: 'Fort', color: 'bg-success' },
        { label: 'Excellent', color: 'bg-primary' },
    ];

    const sizeClasses: Record<Size, string> = {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
        '4xl': 'text-4xl',
        full: 'text-5xl',
    };

    const inputId = id || `password-${Math.random().toString(36).substring(2, 9)}`;

    return (
        <>
            <div className={clsx('w-full space-y-3', className)} style={style}>
                {label && (
                    <div className="flex items-center justify-between">
                        <label htmlFor={inputId} className={clsx('font-semibold text-foreground', sizeClasses[size])}>
                            {label}
                            {required && <span className="ml-1 text-destructive">*</span>}
                        </label>
                        {showRules && (
                            <button
                                type="button"
                                onClick={() => setShowRulesModal(true)}
                                className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                            >
                                <Info size={14} />
                                Règles
                            </button>
                        )}
                    </div>
                )}

                <div className="relative">
                    <Input
                        ref={ref}
                        id={inputId}
                        name={name}
                        type={isVisible ? 'text' : 'password'}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        disabled={disabled}
                        required={required}
                        size={size}
                        error={error}
                        success={success}
                        leftIcon={<Lock size={18} className="text-muted-foreground" />}
                        className="pl-12"
                        autoComplete={autoComplete}
                    />
                    <button
                        type="button"
                        onClick={toggleVisibility}
                        className="absolute right-3 top-1/3 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted/20"
                        tabIndex={-1}
                        aria-label={isVisible ? 'Cacher le mot de passe' : 'Afficher le mot de passe'}
                    >
                        {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                {showStrength && value.length > 0 && (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                                <div
                                    className={clsx(
                                        'h-full rounded-full transition-all duration-500',
                                        getStrengthColor()
                                    )}
                                    style={{ width: `${strength.score}%` }}
                                />
                            </div>
                            <Badge
                                variant={strength.level === 'very_strong' ? 'success' : strength.level === 'strong' ? 'primary' : strength.level === 'medium' ? 'warning' : 'destructive'}
                                size="sm"
                            >
                                {getStrengthLabel()}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{strength.message}</p>
                    </div>
                )}

                {showRequirements && value.length > 0 && (
                    <div className="relative">
                        {/* Bouton pour ouvrir/fermer l'accordéon */}
                        <button
                            type="button"
                            onClick={toggleRequirements}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ChevronDown
                                size={16}
                                className={clsx(
                                    'transition-transform duration-200',
                                    showRequirementsAccordion && 'rotate-180'
                                )}
                            />
                            <span>
                                {showRequirementsAccordion ? 'Masquer' : 'Afficher'} les exigences
                            </span>
                            <Badge variant="outline" size="xs" className="ml-1">
                                {requirements.filter(r => r.met).length}/{requirements.length}
                            </Badge>
                        </button>

                        {/* Accordéon en absolute pour ne pas décaler le contenu */}
                        <div
                            className={clsx(
                                'absolute z-10 left-0 right-0 mt-2 p-4 rounded-md bg-card border border-border shadow-lg',
                                'transition-all duration-300 ease-in-out',
                                showRequirementsAccordion
                                    ? 'max-h-[400px] opacity-100 pointer-events-auto'
                                    : 'max-h-0 opacity-0 pointer-events-none overflow-hidden'
                            )}
                        >
                            <div className="space-y-1.5">
                                {requirements.map((req) => (
                                    <div key={req.id} className="flex items-center gap-2 text-sm">
                                        {req.met ? (
                                            <CheckCircle size={14} className="text-success shrink-0" />
                                        ) : (
                                            <div className="w-3.5 h-3.5 rounded-full border-2 border-muted-foreground/30 shrink-0" />
                                        )}
                                        <span className={clsx(
                                            req.met ? 'text-foreground' : 'text-muted-foreground',
                                            !req.required && 'text-muted-foreground/70'
                                        )}>
                                            {req.label}
                                            {!req.required && ' (recommandé)'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal des règles intégrée */}
            <Dialog
                open={showRulesModal}
                onClose={() => setShowRulesModal(false)}
                title={
                    <div className="flex items-center gap-3">
                        <Shield size={24} className="text-primary" />
                        <span>Règles de sécurité</span>
                    </div>
                }
                size="lg"
                type="info"
                confirmText="Compris"
                showCancel={false}
                scrollable
            >
                <div className="space-y-6 pb-2">
                    {/* Introduction */}
                    <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 to-transparent p-4">
                        <div className="flex items-start gap-3">
                            <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                            <div>
                                <Text variant="h6" className="font-medium">Protection renforcée pour votre compte</Text>
                                <Text variant="small" color="muted" className="mt-1">
                                    Ces règles garantissent une sécurité optimale conformément aux standards du secteur.
                                </Text>
                            </div>
                        </div>
                    </div>

                    {/* Règles obligatoires */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <CheckCircle size={16} className="text-success" />
                            <Text variant="h6" className="font-medium">Règles obligatoires</Text>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {mandatoryRules.map((rule, index) => (
                                <div key={index} className="rounded-xl border border-border p-4 hover:bg-muted/5 transition-colors">
                                    <div className="flex items-start gap-3">
                                        <div className="shrink-0 rounded-md bg-primary/10 p-2 text-primary">
                                            {rule.icon}
                                        </div>
                                        <div>
                                            <Text variant="small" className="font-medium">{rule.title}</Text>
                                            <Text variant="small" className="text-primary font-medium mt-0.5">{rule.description}</Text>
                                            <Text variant="caption" color="muted" className="mt-1">{rule.details}</Text>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recommandations */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Info size={16} className="text-primary" />
                            <Text variant="h6" className="font-medium">Recommandations avancées</Text>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {recommendedRules.map((rule, index) => (
                                <div key={index} className="rounded-xl border border-primary/20 bg-primary/5 p-4 hover:bg-primary/10 transition-colors">
                                    <div className="flex items-start gap-3">
                                        <div className="shrink-0 rounded-md bg-primary/20 p-2 text-primary">
                                            {rule.icon}
                                        </div>
                                        <div>
                                            <Text variant="small" className="font-medium">{rule.title}</Text>
                                            <Text variant="small" className="text-primary font-medium mt-0.5">{rule.description}</Text>
                                            <Text variant="caption" color="muted" className="mt-1">{rule.details}</Text>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Conseils */}
                    <div className="rounded-xl border border-border bg-gradient-to-r from-muted/20 to-transparent p-4">
                        <Text variant="h6" className="font-medium mb-3">💡 Conseils pratiques</Text>
                        <div className="space-y-2">
                            {tips.map((tip, index) => (
                                <div key={index} className="flex items-center gap-3 rounded-md bg-background/50 p-3 hover:bg-background transition-colors">
                                    <span className="shrink-0 text-lg">{tip.icon}</span>
                                    <Text variant="small" className="flex-1">{tip.text}</Text>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Indicateur de force */}
                    <div className="rounded-xl border border-border bg-gradient-to-r from-muted/10 to-transparent p-4">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-2 mb-3">
                            <Text variant="small" className="font-medium">Indicateur de force</Text>
                            <div className="flex items-center gap-1">
                                {strengthLevels.map((level, index) => (
                                    <div key={index} className="flex flex-col items-center">
                                        <div className={`h-2 w-6 rounded-full ${level.color} opacity-70`} />
                                        <span className="mt-1 min-w-[50px] text-center text-[10px] text-muted-foreground">
                                            {level.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Text variant="caption" color="muted" className="text-center md:text-left">
                            Votre mot de passe sera évalué en temps réel selon ces critères.
                        </Text>
                    </div>

                    {/* Avertissement */}
                    <div className="rounded-xl border border-warning/30 bg-warning/10 p-4">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-warning" />
                            <div>
                                <Text variant="small" className="font-medium text-warning">Important</Text>
                                <Text variant="caption" className="text-foreground mt-1">
                                    Ces règles s'appliquent également lors du changement de mot de passe.
                                    Un mot de passe faible pourrait compromettre la sécurité de vos données.
                                </Text>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;