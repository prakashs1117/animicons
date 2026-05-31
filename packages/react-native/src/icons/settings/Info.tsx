import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { InfoPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Info: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const circleScale = useSharedValue(1);
  const stemY = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, InfoPaths);

  useEffect(() => {
    if (autoPlay) {
      circleScale.value = withRepeat(withSequence(
        withTiming(1.04, { duration: d.medium * 0.4, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0,  { duration: d.medium * 0.6, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
      stemY.value = withRepeat(withSequence(
        withTiming(-2, { duration: d.medium * 0.4, easing: Easing.inOut(Easing.ease) }),
        withTiming(0,  { duration: d.medium * 0.6, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
    } else {
      cancelAnimation(circleScale); cancelAnimation(stemY);
      circleScale.value = withTiming(1, { duration: 150 });
      stemY.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const circleProps = useAnimatedProps(() => ({
    transform: [{ scale: circleScale.value }],
    originX: 24,
    originY: 24,
  }));
  const stemProps = useAnimatedProps(() => ({ transform: [{ translateY: stemY.value }] }));

  return (
    <Svg width={size} height={size} viewBox={InfoPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={circleProps} d={InfoPaths.circle} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <Path d={InfoPaths.dot} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.stroke} opacity={s.opacity} />
      <AnimatedPath animatedProps={stemProps} d={InfoPaths.stem} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
    </Svg>
  );
};
