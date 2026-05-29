export type AnimationSpeed = 'slow' | 'normal' | 'fast';

export interface IconProps {
  size?: number;
  color?: string;
  strokeColor?: string;
  fillColor?: string;
  secondaryColor?: string;
  opacity?: number;
  strokeWidth?: number;
  autoPlay?: boolean;
  loop?: boolean;
  speed?: AnimationSpeed;
  onAnimationEnd?: () => void;
  style?: Record<string, unknown>;
}
