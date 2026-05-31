import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { UserPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const User: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const scale = useSharedValue(1);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, UserPaths);

  useEffect(() => {
    if (autoPlay) {
      scale.value = withRepeat(withSequence(
        withTiming(1.05, { duration: d.long * 0.5, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0,  { duration: d.long * 0.5, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
    } else {
      cancelAnimation(scale);
      scale.value = withTiming(1, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const userProps = useAnimatedProps(() => ({
    transform: [{ scale: scale.value }],
    originX: 24,
    originY: 24,
  }));

  return (
    <Svg width={size} height={size} viewBox={UserPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={userProps} d={UserPaths.head} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={userProps} d={UserPaths.body} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
    </Svg>
  );
};
