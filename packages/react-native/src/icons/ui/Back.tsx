import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { BackPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Back: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const translateX = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, BackPaths);

  useEffect(() => {
    if (autoPlay) {
      translateX.value = withRepeat(
        withSequence(
          withTiming(-6, { duration: d.medium * 0.4, easing: Easing.inOut(Easing.ease) }),
          withTiming(2,  { duration: d.medium * 0.3, easing: Easing.inOut(Easing.ease) }),
          withTiming(0,  { duration: d.medium * 0.3, easing: Easing.inOut(Easing.ease) }),
        ), loop ? -1 : 1
      );
    } else {
      cancelAnimation(translateX);
      translateX.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const arrowProps = useAnimatedProps(() => ({
    transform: [{ translateX: translateX.value }],
    originX: 24,
    originY: 24,
  }));
  const shaftProps = useAnimatedProps(() => ({
    transform: [{ translateX: translateX.value }],
    originX: 24,
    originY: 24,
  }));

  return (
    <Svg width={size} height={size} viewBox={BackPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={arrowProps} d={BackPaths.arrow} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={shaftProps} d={BackPaths.shaft} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
    </Svg>
  );
};
