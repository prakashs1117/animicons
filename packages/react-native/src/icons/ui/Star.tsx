import React, { useEffect, useCallback } from 'react';
import { Pressable } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withTiming, cancelAnimation, runOnJS,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { StarPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Star: React.FC<IconProps> = ({
  size = 48, autoPlay = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const scaleVal = useSharedValue(1);
  const sparkleOp = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, StarPaths);

  const trigger = useCallback(() => {
    scaleVal.value = withTiming(1.3, { duration: d.short * 0.5 }, () => {
      scaleVal.value = withTiming(1, { duration: d.short * 0.5 }, () => {
        if (onAnimationEnd) runOnJS(onAnimationEnd)();
      });
    });
    sparkleOp.value = withTiming(1, { duration: d.short * 0.5 }, () => {
      sparkleOp.value = withTiming(0, { duration: d.short * 0.5 });
    });
  }, [onAnimationEnd, d.short, scaleVal, sparkleOp]);

  useEffect(() => {
    if (autoPlay) trigger();
    return () => { cancelAnimation(scaleVal); cancelAnimation(sparkleOp); };
  }, [autoPlay, trigger]);

  const starProps = useAnimatedProps(() => ({ transform: [{ scale: scaleVal.value }], originX: 24, originY: 24 }));
  const sparkleProps = useAnimatedProps(() => ({ opacity: sparkleOp.value }));

  return (
    <Pressable onPress={trigger} style={style as any}>
      <Svg width={size} height={size} viewBox={StarPaths.viewBox}>
        <AnimatedPath animatedProps={starProps} d={StarPaths.star} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
        <AnimatedPath animatedProps={sparkleProps} d={StarPaths.sparkle1} fill={s.stroke} opacity={s.opacity} />
        <AnimatedPath animatedProps={sparkleProps} d={StarPaths.sparkle2} fill={s.stroke} opacity={s.opacity} />
        <AnimatedPath animatedProps={sparkleProps} d={StarPaths.sparkle3} fill={s.stroke} opacity={s.opacity} />
      </Svg>
    </Pressable>
  );
};
