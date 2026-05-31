export const DURATION = {
  slow:   { short: 1200, medium: 3000, long: 6000, stagger: 900 },
  normal: { short: 600,  medium: 1500, long: 3000, stagger: 450 },
  fast:   { short: 300,  medium: 750,  long: 1500, stagger: 200 },
} as const;

export type DurationSet = typeof DURATION[keyof typeof DURATION];

export const EASING_CSS = {
  easeInOut: 'ease-in-out',
  easeOut:   'ease-out',
  linear:    'linear',
  spring:    'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;
