import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, withDelay, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { SlidersPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Sliders: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const k1X = useSharedValue(0);
  const k2X = useSharedValue(0);
  const k3X = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, SlidersPaths);

  useEffect(() => {
    if (autoPlay) {
      k1X.value = withDelay(0, withRepeat(withSequence(
        withTiming(8, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1));
      k2X.value = withDelay(d.stagger, withRepeat(withSequence(
        withTiming(-8, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
        withTiming(0,  { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1));
      k3X.value = withDelay(d.stagger * 2, withRepeat(withSequence(
        withTiming(6, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1));
    } else {
      cancelAnimation(k1X); cancelAnimation(k2X); cancelAnimation(k3X);
      k1X.value = withTiming(0, { duration: 150 });
      k2X.value = withTiming(0, { duration: 150 });
      k3X.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const k1Props = useAnimatedProps(() => ({ transform: [{ translateX: k1X.value }], originX: 18, originY: 14 }));
  const k2Props = useAnimatedProps(() => ({ transform: [{ translateX: k2X.value }], originX: 28, originY: 24 }));
  const k3Props = useAnimatedProps(() => ({ transform: [{ translateX: k3X.value }], originX: 16, originY: 34 }));

  return (
    <Svg width={size} height={size} viewBox={SlidersPaths.viewBox} style={style as any}>
      <Path d={SlidersPaths.track1} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={k1Props} d={SlidersPaths.knob1} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <Path d={SlidersPaths.track2} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={k2Props} d={SlidersPaths.knob2} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <Path d={SlidersPaths.track3} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={k3Props} d={SlidersPaths.knob3} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
    </Svg>
  );
};
