export const DURATION = {
  slow:   { short: 800,  medium: 2000, long: 4000, stagger: 600 },
  normal: { short: 400,  medium: 1000, long: 2000, stagger: 300 },
  fast:   { short: 200,  medium: 500,  long: 1000, stagger: 150 },
} as const;

export type DurationSet = typeof DURATION[keyof typeof DURATION];

export const EASING_CSS = {
  easeInOut: 'ease-in-out',
  easeOut:   'ease-out',
  linear:    'linear',
  spring:    'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;
