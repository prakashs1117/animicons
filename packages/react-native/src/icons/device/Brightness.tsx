import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { BrightnessPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Brightness: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, ...colorProps
}) => {
  const raysScale = useSharedValue(1);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, BrightnessPaths);

  useEffect(() => {
    if (autoPlay) {
      raysScale.value = withRepeat(withSequence(
        withTiming(1.2, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
    } else {
      cancelAnimation(raysScale);
      raysScale.value = withTiming(1, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const raysProps = useAnimatedProps(() => ({
    transform: [{ scale: raysScale.value }],
    originX: 24,
    originY: 24,
  }));

  return (
    <Svg width={size} height={size} viewBox={BrightnessPaths.viewBox} style={style as any}>
      <Path d={BrightnessPaths.sun} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={raysProps} d={BrightnessPaths.rays} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
    </Svg>
  );
};
