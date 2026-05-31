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
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
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

  const arc1Props  = useAnimatedProps(() => ({ transform: [{ rotate: `${rot1.value}deg` }], originX: 24, originY: 24 }));
  const head1Props = useAnimatedProps(() => ({ transform: [{ rotate: `${rot1.value}deg` }], originX: 24, originY: 24 }));
  const arc2Props  = useAnimatedProps(() => ({ transform: [{ rotate: `${rot2.value}deg` }], originX: 24, originY: 24 }));
  const head2Props = useAnimatedProps(() => ({ transform: [{ rotate: `${rot2.value}deg` }], originX: 24, originY: 24 }));

  return (
    <Svg width={size} height={size} viewBox={SyncPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={arc1Props}  d={SyncPaths.arc1}  stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={head1Props} d={SyncPaths.head1} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={arc2Props}  d={SyncPaths.arc2}  stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={head2Props} d={SyncPaths.head2} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={s.opacity} />
    </Svg>
  );
};
