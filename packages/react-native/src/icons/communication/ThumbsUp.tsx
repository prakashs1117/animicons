import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { ThumbsUpPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const ThumbsUp: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = false, speed = 'slow', style, ...colorProps
}) => {
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, ThumbsUpPaths);

  useEffect(() => {
    if (autoPlay) {
      translateY.value = withRepeat(withSequence(
        withTiming(-10, { duration: d.short * 0.5, easing: Easing.out(Easing.back(2)) }),
        withTiming(0,   { duration: d.short * 0.5, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
      scale.value = withRepeat(withSequence(
        withTiming(1.1, { duration: d.short * 0.5, easing: Easing.out(Easing.back(2)) }),
        withTiming(1.0, { duration: d.short * 0.5 }),
      ), loop ? -1 : 1);
    } else {
      cancelAnimation(translateY); cancelAnimation(scale);
      translateY.value = withTiming(0, { duration: 150 });
      scale.value = withTiming(1, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const thumbProps = useAnimatedProps(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
    originX: 24,
    originY: 24,
  }));

  return (
    <Svg width={size} height={size} viewBox={ThumbsUpPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={thumbProps} d={ThumbsUpPaths.thumb} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={thumbProps} d={ThumbsUpPaths.palm}  stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={thumbProps} d={ThumbsUpPaths.grip}  stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
    </Svg>
  );
};
