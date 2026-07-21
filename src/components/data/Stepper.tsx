// src/components/data/Stepper.tsx
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

export type StepperOrientation = 'horizontal' | 'vertical';

export interface StepperProps extends LayoutBaseProps {
    steps: StepItem[];
    active?: number;
    orientation?: StepperOrientation;
    alternativeLabel?: boolean;
    color?: TextColor;
    size?: 'sm' | 'md' | 'lg';
    clickable?: boolean;
    onStepClick?: (index: number) => void;
    className?: string;
}

export function Stepper({
    steps,
    active = 0,
    orientation = 'horizontal',
    alternativeLabel = false,
    color = 'primary',
    size = 'md',
    clickable = false,
    onStepClick,
    className = '',
    style = {},
}: StepperProps) {
    const colorClasses: Record<TextColor, string> = {
        primary: 'border-primary bg-primary text-primary-foreground',
        secondary: 'border-secondary bg-secondary text-secondary-foreground',
        muted: 'border-muted bg-muted text-muted-foreground',
        destructive: 'border-destructive bg-destructive text-destructive-foreground',
        success: 'border-success bg-success text-success-foreground',
        warning: 'border-warning bg-warning text-warning-foreground',
    };

    // Classes par défaut pour les boules inactives
    const defaultCircleClasses = 'border-2 border-muted bg-primary/10 text-muted-foreground';

    const sizeClasses = {
        sm: { circle: 'w-6 h-6 text-xs', icon: 14, label: 'text-xs', gap: 'gap-2', circlePos: 3 },
        md: { circle: 'w-8 h-8 text-sm', icon: 16, label: 'text-sm', gap: 'gap-3', circlePos: 4 },
        lg: { circle: 'w-10 h-10 text-base', icon: 18, label: 'text-base', gap: 'gap-4', circlePos: 5 },
    };

    const currentSize = sizeClasses[size];

    const classes = clsx(
        'flex',
        orientation === 'horizontal' ? 'flex-row' : 'flex-col',
        className
    );

    const translation = clsx(
        'transform',
        orientation === 'vertical' ? '-translate-x-[40%]' : '-translate-y-[40%]'
    );

    const stepClasses = clsx(
        'flex-1 relative',
        orientation === 'horizontal' ? 'flex flex-col items-center' : 'flex flex-row items-start'
    );

    const handleStepClick = (index: number) => {
        if (clickable && onStepClick) {
            onStepClick(index);
        }
    };

    return (
        <div className={classes} style={style}>
            {steps.map((step, index) => {
                const isActive = index === active;
                const isCompleted = index < active;
                const isLast = index === steps.length - 1;

                let circleClasses;
                if (isCompleted || isActive) {
                    circleClasses = colorClasses[color];
                } else {
                    circleClasses = defaultCircleClasses;
                }

                // Position de la ligne pour le mode vertical
                const linePosition = orientation === 'vertical'
                    ? `left-[${currentSize.circlePos}px] top-[${currentSize.circlePos * 2}px] bottom-0 w-0.5`
                    : `top-[${currentSize.circlePos}px] left-[calc(50%+20px)] right-[calc(-50%+20px)] h-0.5`;

                return (
                    <div
                        key={index}
                        className={stepClasses}
                        onClick={() => handleStepClick(index)}
                        role={clickable ? 'button' : undefined}
                        tabIndex={clickable ? 0 : undefined}
                        onKeyDown={(e) => {
                            if (clickable && (e.key === 'Enter' || e.key === ' ')) {
                                e.preventDefault();
                                handleStepClick(index);
                            }
                        }}
                    >
                        {!isLast && (
                            <div
                                className={clsx(
                                    'absolute',
                                    linePosition,
                                    isCompleted ? colorClasses[color] : 'bg-muted'
                                )}
                            />
                        )}

                        <div
                            className={clsx(
                                'relative z-10 flex items-center justify-center rounded-full border-2 shrink-0 transition-all duration-300',
                                currentSize.circle,
                                translation,
                                circleClasses
                            )}
                        >
                            {isCompleted ? (
                                <Check size={currentSize.icon} />
                            ) : (
                                <span className={clsx(
                                    'text-sm font-medium',
                                    isActive ? 'text-primary-foreground' : 'text-muted-foreground'
                                )}>
                                    {step.icon || index + 1}
                                </span>
                            )}
                        </div>

                        <div className={clsx(
                            'mt-2',
                            orientation === 'horizontal' && alternativeLabel && 'text-center',
                            orientation === 'vertical' && 'ml-3'
                        )}>
                            <div className={clsx(
                                'font-medium',
                                currentSize.label,
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