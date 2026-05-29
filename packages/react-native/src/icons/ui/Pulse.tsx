import React, { useEffect } from 'react';
import { Svg, Circle } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withTiming, withDelay, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { PulsePaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function usePulseRing(stagger: number, duration: number, autoPlay: boolean, loop: boolean) {
  const r = useSharedValue(4);
  const opacity = useSharedValue(0.8);
  useEffect(() => {
    if (autoPlay) {
      r.value = withDelay(stagger, withRepeat(withTiming(20, { duration, easing: Easing.out(Easing.ease) }), loop ? -1 : 1));
      opacity.value = withDelay(stagger, withRepeat(withTiming(0, { duration, easing: Easing.out(Easing.ease) }), loop ? -1 : 1));
    } else {
      cancelAnimation(r); cancelAnimation(opacity);
    }
    return () => { cancelAnimation(r); cancelAnimation(opacity); };
  }, [autoPlay, loop, duration, stagger]);
  return { r, opacity };
}

export const Pulse: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, PulsePaths);
  const ring1 = usePulseRing(0, d.medium, autoPlay, loop);
  const ring2 = usePulseRing(d.stagger, d.medium, autoPlay, loop);
  const ring3 = usePulseRing(d.stagger * 2, d.medium, autoPlay, loop);

  const ap1 = useAnimatedProps(() => ({ r: ring1.r.value, opacity: ring1.opacity.value }));
  const ap2 = useAnimatedProps(() => ({ r: ring2.r.value, opacity: ring2.opacity.value }));
  const ap3 = useAnimatedProps(() => ({ r: ring3.r.value, opacity: ring3.opacity.value }));

  return (
    <Svg width={size} height={size} viewBox={PulsePaths.viewBox} style={style as any}>
      <AnimatedCircle animatedProps={ap1} cx="24" cy="24" stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" />
      <AnimatedCircle animatedProps={ap2} cx="24" cy="24" stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" />
      <AnimatedCircle animatedProps={ap3} cx="24" cy="24" stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" />
      <Circle cx="24" cy="24" r={3} fill={s.stroke} opacity={s.opacity} />
    </Svg>
  );
};
