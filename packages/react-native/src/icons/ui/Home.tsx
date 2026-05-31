import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { HomePaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Home: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, ...colorProps
}) => {
  const translateY = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, HomePaths);

  useEffect(() => {
    if (autoPlay) {
      translateY.value = withRepeat(
        withSequence(
          withTiming(-6, { duration: d.medium * 0.4, easing: Easing.inOut(Easing.ease) }),
          withTiming(-3, { duration: d.medium * 0.2, easing: Easing.inOut(Easing.ease) }),
          withTiming(0,  { duration: d.medium * 0.4, easing: Easing.inOut(Easing.ease) }),
        ), loop ? -1 : 1
      );
    } else {
      cancelAnimation(translateY);
      translateY.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const houseProps = useAnimatedProps(() => ({
    transform: [{ translateY: translateY.value }],
    originX: 24,
    originY: 24,
  }));
  const doorProps = useAnimatedProps(() => ({
    transform: [{ translateY: translateY.value }],
    originX: 24,
    originY: 24,
  }));

  return (
    <Svg width={size} height={size} viewBox={HomePaths.viewBox} style={style as any}>
      <Path d={HomePaths.roof} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={houseProps} d={HomePaths.house} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={doorProps} d={HomePaths.door} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" opacity={s.opacity} />
    </Svg>
  );
};
