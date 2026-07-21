import { ReactNode } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps, TextColor } from '../../types';
import { Check } from 'lucide-react';

export interface StepItem {
    label: ReactNode;
    description?: ReactNode;
    icon?: ReactNode;
    optional?: boolean;
}

export interface StepperProps extends LayoutBaseProps {
    steps: StepItem[];
    active?: number;
    orientation?: 'horizontal' | 'vertical';
    alternativeLabel?: boolean;
    color?: TextColor;
    className?: string;
}

export function Stepper({
    steps,
    active = 0,
    orientation = 'horizontal',
    alternativeLabel = false,
    color = 'primary',
    className = '',
    style = {},
}: StepperProps) {
    const colorClasses: Record<TextColor, string> = {
        primary: 'border-primary bg-primary text-primary-foreground',
        secondary: 'border-secondary bg-secondary text-secondary-foreground',
        muted: 'border-muted bg-muted text-muted-foreground',
        danger: 'border-danger bg-danger text-white',
        success: 'border-success bg-success text-white',
        warning: 'border-warning bg-warning text-white',
    };

    const classes = clsx(
        'flex',
        orientation === 'horizontal' ? 'flex-row' : 'flex-col',
        className
    );

    const stepClasses = clsx(
        'flex-1 relative',
        orientation === 'horizontal' ? 'flex flex-col items-center' : 'flex flex-row items-start'
    );

    return (
        <div className={classes} style={style}>
            {steps.map((step, index) => {
                const isActive = index === active;
                const isCompleted = index < active;
                const isLast = index === steps.length - 1;

                return (
                    <div key={index} className={stepClasses}>
                        {/* Ligne de connexion */}
                        {!isLast && (
                            <div
                                className={clsx(
                                    'absolute',
                                    orientation === 'horizontal'
                                        ? 'top-4 left-[calc(50%+20px)] right-[calc(-50%+20px)] h-0.5'
                                        : 'top-10 left-4 bottom-0 w-0.5',
                                    isCompleted ? colorClasses[color] : 'bg-muted'
                                )}
                            />
                        )}

                        {/* Cercle */}
                        <div
                            className={clsx(
                                'relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 shrink-0',
                                isCompleted || isActive
                                    ? colorClasses[color]
                                    : 'border-muted bg-background'
                            )}
                        >
                            {isCompleted ? (
                                <Check size={16} />
                            ) : (
                                <span className="text-sm font-medium">
                                    {step.icon || index + 1}
                                </span>
                            )}
                        </div>

                        {/* Contenu */}
                        <div className={clsx(
                            'mt-2',
                            orientation === 'horizontal' && alternativeLabel && 'text-center',
                            orientation === 'vertical' && 'ml-4'
                        )}>
                            <div className={clsx(
                                'text-sm font-medium',
                                isActive ? 'text-foreground' : 'text-muted-foreground'
                            )}>
                                {step.label}
                                {step.optional && (
                                    <span className="ml-1 text-xs text-muted-foreground">
                                        (optionnel)
                                    </span>
                                )}
                            </div>
                            {step.description && (
                                <div className="text-xs text-muted-foreground mt-0.5">
                                    {step.description}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Stepper;