import { BaseProps } from './index';

export type Spacing = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Radius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full';
export type Display = 'flex' | 'grid' | 'block';
export type Direction = 'vertical' | 'horizontal';
export type Align = 'start' | 'center' | 'end' | 'stretch';
export type Justify = 'start' | 'center' | 'end' | 'stretch' | 'between' | 'around' | 'evenly';
export type ContainerMaxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full';
export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Shadow = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type Height = 'auto' | 'full' | 'screen' | 8 | 10 | 12 | 14 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 52 | 56 | 60 | 64 | 72 | 80 | 96;
export type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type TextColor = 'primary' | 'secondary' | 'muted' | 'destructive' | 'success' | 'warning';
export type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small' | 'caption';
export type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full';
export type Background = 'transparent' | 'primary' | 'secondary' | 'muted' | 'card';
export type Placement = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
export type Shape = 'circle' | 'square' | 'rounded';


export interface LayoutBaseProps extends BaseProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}