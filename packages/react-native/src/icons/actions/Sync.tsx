import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { SyncPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Sync: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, ...colorProps
}) => {
  const rot1 = useSharedValue(0);
  const rot2 = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, SyncPaths);

  useEffect(() => {
    if (autoPlay) {
      rot1.value = withRepeat(withTiming(360,  { duration: d.long, easing: Easing.linear }), loop ? -1 : 1, false);
      rot2.value = withRepeat(withTiming(-360, { duration: d.long, easing: Easing.linear }), loop ? -1 : 1, false);
    } else {
      cancelAnimation(rot1); cancelAnimation(rot2);
      rot1.value = withTiming(0, { duration: 150 });
      rot2.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const cw1Props  = useAnimatedProps(() => ({ transform: [{ rotate: `${rot1.value}deg` }], originX: 24, originY: 24 }));
  const cw2Props  = useAnimatedProps(() => ({ transform: [{ rotate: `${rot1.value}deg` }], originX: 24, originY: 24 }));
  const cw3Props  = useAnimatedProps(() => ({ transform: [{ rotate: `${rot1.value}deg` }], originX: 24, originY: 24 }));
  const ccw1Props = useAnimatedProps(() => ({ transform: [{ rotate: `${rot2.value}deg` }], originX: 24, originY: 24 }));
  const ccw2Props = useAnimatedProps(() => ({ transform: [{ rotate: `${rot2.value}deg` }], originX: 24, originY: 24 }));
  const ccw3Props = useAnimatedProps(() => ({ transform: [{ rotate: `${rot2.value}deg` }], originX: 24, originY: 24 }));

  return (
    <Svg width={size} height={size} viewBox={SyncPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={cw1Props}  d={SyncPaths.arc1}   stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={cw2Props}  d={SyncPaths.head1}  stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={cw3Props}  d={SyncPaths.head1b} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={ccw1Props} d={SyncPaths.arc2}   stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={ccw2Props} d={SyncPaths.head2}  stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={ccw3Props} d={SyncPaths.head2b} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
    </Svg>
  );
};
