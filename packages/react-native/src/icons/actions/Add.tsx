import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { AddPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Add: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = false, speed = 'normal', style, ...colorProps
}) => {
  const scale = useSharedValue(1);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, AddPaths);

  useEffect(() => {
    if (autoPlay) {
      scale.value = withRepeat(withSequence(
        withTiming(1.3, { duration: d.short * 0.5, easing: Easing.out(Easing.back(2)) }),
        withTiming(1.0, { duration: d.short * 0.5 }),
      ), loop ? -1 : 1);
    } else {
      cancelAnimation(scale);
      scale.value = withTiming(1, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const addProps = useAnimatedProps(() => ({
    transform: [{ scale: scale.value }],
    originX: 24,
    originY: 24,
  }));

  return (
    <Svg width={size} height={size} viewBox={AddPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={addProps} d={AddPaths.horiz} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={addProps} d={AddPaths.vert} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
    </Svg>
  );
};
