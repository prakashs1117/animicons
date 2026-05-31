import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { StopPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Stop: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = false, speed = 'normal', style, ...colorProps
}) => {
  const scale = useSharedValue(1);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, StopPaths);

  useEffect(() => {
    if (autoPlay) {
      scale.value = withSequence(
        withTiming(1.15, { duration: d.short * 0.4, easing: Easing.bezier(0.34, 1.56, 0.64, 1) }),
        withTiming(1.0,  { duration: d.short * 0.6, easing: Easing.inOut(Easing.ease) }),
      );
    } else {
      cancelAnimation(scale);
      scale.value = withTiming(1, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const squareProps = useAnimatedProps(() => ({
    transform: [{ scale: scale.value }],
    originX: 24,
    originY: 24,
  }));

  return (
    <Svg width={size} height={size} viewBox={StopPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={squareProps} d={StopPaths.square} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinejoin="round" fill={s.secondaryColor} opacity={s.opacity} />
    </Svg>
  );
};
