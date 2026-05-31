import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { PinPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Pin: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = false, speed = 'normal', style, ...colorProps
}) => {
  const translateY = useSharedValue(-20);
  const opacity = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, PinPaths);

  useEffect(() => {
    if (autoPlay) {
      translateY.value = withRepeat(withSequence(
        withTiming(4,  { duration: d.short * 0.6, easing: Easing.out(Easing.ease) }),
        withTiming(-2, { duration: d.short * 0.2, easing: Easing.inOut(Easing.ease) }),
        withTiming(0,  { duration: d.short * 0.2, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
      opacity.value = withTiming(1, { duration: d.short * 0.3 });
    } else {
      cancelAnimation(translateY); cancelAnimation(opacity);
      translateY.value = withTiming(0, { duration: 150 });
      opacity.value = withTiming(1, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const pinProps = useAnimatedProps(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
    originX: 24,
    originY: 24,
  }));

  return (
    <Svg width={size} height={size} viewBox={PinPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={pinProps} d={PinPaths.body}  stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={pinProps} d={PinPaths.inner} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={pinProps} d={PinPaths.stem}  stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
    </Svg>
  );
};
