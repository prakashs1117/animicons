import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { PhonePaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Phone: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const rotation = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, PhonePaths);

  useEffect(() => {
    if (autoPlay) {
      rotation.value = withRepeat(withSequence(
        withTiming(0,   { duration: 0 }),
        withTiming(-15, { duration: d.medium * 0.15, easing: Easing.inOut(Easing.ease) }),
        withTiming(15,  { duration: d.medium * 0.15, easing: Easing.inOut(Easing.ease) }),
        withTiming(-10, { duration: d.medium * 0.15, easing: Easing.inOut(Easing.ease) }),
        withTiming(10,  { duration: d.medium * 0.15, easing: Easing.inOut(Easing.ease) }),
        withTiming(0,   { duration: d.medium * 0.4,  easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
    } else {
      cancelAnimation(rotation);
      rotation.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const phoneProps = useAnimatedProps(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
    originX: 24,
    originY: 24,
  }));

  return (
    <Svg width={size} height={size} viewBox={PhonePaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={phoneProps} d={PhonePaths.body}   stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={phoneProps} d={PhonePaths.screen} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={phoneProps} d={PhonePaths.home}   stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
    </Svg>
  );
};
