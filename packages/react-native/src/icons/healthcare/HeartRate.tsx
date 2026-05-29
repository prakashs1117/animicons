import React, { useEffect } from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { HeartRatePaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const HeartRate: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const scaleVal = useSharedValue(1);
  const glowR = useSharedValue(16);
  const glowOp = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, HeartRatePaths);

  useEffect(() => {
    if (autoPlay) {
      scaleVal.value = withRepeat(
        withSequence(withTiming(1.2, { duration: d.medium * 0.2 }), withTiming(1, { duration: d.medium * 0.8 })),
        loop ? -1 : 1
      );
      glowR.value = withRepeat(
        withSequence(withTiming(20, { duration: d.medium * 0.2 }), withTiming(16, { duration: d.medium * 0.8 })),
        loop ? -1 : 1
      );
      glowOp.value = withRepeat(
        withSequence(withTiming(0.5, { duration: d.medium * 0.2 }), withTiming(0, { duration: d.medium * 0.8 })),
        loop ? -1 : 1
      );
    } else {
      cancelAnimation(scaleVal); cancelAnimation(glowR); cancelAnimation(glowOp);
    }
  }, [autoPlay, loop, speed]);

  const heartProps = useAnimatedProps(() => ({ transform: [{ scale: scaleVal.value }], originX: 24, originY: 24 }));
  const glowProps = useAnimatedProps(() => ({ r: glowR.value, opacity: glowOp.value }));

  return (
    <Svg width={size} height={size} viewBox={HeartRatePaths.viewBox} style={style as any}>
      <AnimatedCircle animatedProps={glowProps} cx="24" cy="24" fill={s.secondaryColor} />
      <AnimatedPath animatedProps={heartProps} d={HeartRatePaths.heart} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
    </Svg>
  );
};
