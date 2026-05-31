import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { ClosePaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Close: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = false, speed = 'slow', style, ...colorProps
}) => {
  const scale = useSharedValue(0.5);
  const opacity = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, ClosePaths);

  useEffect(() => {
    if (autoPlay) {
      scale.value = withRepeat(withSequence(
        withTiming(1.1, { duration: d.short * 0.6, easing: Easing.out(Easing.back(2)) }),
        withTiming(1.0, { duration: d.short * 0.4 }),
      ), loop ? -1 : 1);
      opacity.value = withTiming(1, { duration: d.short * 0.3 });
    } else {
      cancelAnimation(scale); cancelAnimation(opacity);
      scale.value = withTiming(1, { duration: 150 });
      opacity.value = withTiming(1, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const line1Props = useAnimatedProps(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
    originX: 24,
    originY: 24,
  }));
  const line2Props = useAnimatedProps(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
    originX: 24,
    originY: 24,
  }));

  return (
    <Svg width={size} height={size} viewBox={ClosePaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={line1Props} d={ClosePaths.line1} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" />
      <AnimatedPath animatedProps={line2Props} d={ClosePaths.line2} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" />
    </Svg>
  );
};
