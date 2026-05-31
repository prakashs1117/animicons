import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, withDelay, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { UsersPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Users: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, ...colorProps
}) => {
  const f1Y = useSharedValue(0);
  const f2Y = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, UsersPaths);

  useEffect(() => {
    if (autoPlay) {
      f1Y.value = withRepeat(withSequence(
        withTiming(-5, { duration: d.long * 0.4, easing: Easing.inOut(Easing.ease) }),
        withTiming(0,  { duration: d.long * 0.6, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
      f2Y.value = withDelay(d.stagger, withRepeat(withSequence(
        withTiming(-5, { duration: d.long * 0.4, easing: Easing.inOut(Easing.ease) }),
        withTiming(0,  { duration: d.long * 0.6, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1));
    } else {
      cancelAnimation(f1Y); cancelAnimation(f2Y);
      f1Y.value = withTiming(0, { duration: 150 });
      f2Y.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const fig1Props = useAnimatedProps(() => ({ transform: [{ translateY: f1Y.value }], originX: 18, originY: 26 }));
  const fig2Props = useAnimatedProps(() => ({ transform: [{ translateY: f2Y.value }], originX: 30, originY: 26 }));

  return (
    <Svg width={size} height={size} viewBox={UsersPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={fig1Props} d={UsersPaths.head1} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={fig1Props} d={UsersPaths.body1} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={fig2Props} d={UsersPaths.head2} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={fig2Props} d={UsersPaths.body2} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
    </Svg>
  );
};
