import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { HeartPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Heart: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, ...colorProps
}) => {
  const scaleVal = useSharedValue(1);
  const glowOp = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, HeartPaths);

  useEffect(() => {
    if (autoPlay) {
      const beat = withSequence(
        withTiming(1.2,  { duration: d.short * 0.35, easing: Easing.out(Easing.ease) }),
        withTiming(1,    { duration: d.short * 0.35 }),
        withTiming(1.15, { duration: d.short * 0.3 }),
        withTiming(1,    { duration: d.medium - d.short }),
      );
      scaleVal.value = withRepeat(beat, loop ? -1 : 1);
      glowOp.value = withRepeat(
        withSequence(
          withTiming(0.4, { duration: d.short * 0.35 }),
          withTiming(0,   { duration: d.medium - d.short * 0.35 }),
        ), loop ? -1 : 1
      );
    } else {
      cancelAnimation(scaleVal); cancelAnimation(glowOp);
      scaleVal.value = withTiming(1, { duration: 150 });
      glowOp.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  // scale from center of the 48×48 viewBox
  const heartProps = useAnimatedProps(() => ({
    transform: [{ scale: scaleVal.value }],
    originX: 24,
    originY: 24,
  }));
  const glowProps = useAnimatedProps(() => ({
    opacity: glowOp.value,
    transform: [{ scale: scaleVal.value }],
    originX: 24,
    originY: 24,
  }));

  return (
    <Svg width={size} height={size} viewBox={HeartPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={glowProps} d={HeartPaths.glow} fill={s.secondaryColor} stroke="none" />
      <AnimatedPath animatedProps={heartProps} d={HeartPaths.heart} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
    </Svg>
  );
};
