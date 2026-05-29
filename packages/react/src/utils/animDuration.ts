import { DURATION } from '@animicons/shared';
import type { AnimationSpeed, DurationSet } from '@animicons/shared';

export function getAnimDuration(speed: AnimationSpeed = 'normal'): DurationSet {
  return DURATION[speed];
}
