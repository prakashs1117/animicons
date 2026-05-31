import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { ChevronDownPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const ChevronDown: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const translateY = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, ChevronDownPaths);

  useEffect(() => {
    if (autoPlay) {
      translateY.value = withRepeat(
        withSequence(
          withTiming(6, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
        ), loop ? -1 : 1
      );
    } else {
      cancelAnimation(translateY);
      translateY.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const chevronProps = useAnimatedProps(() => ({
    transform: [{ translateY: translateY.value }],
    originX: 24,
    originY: 24,
  }));

  return (
    <Svg width={size} height={size} viewBox={ChevronDownPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={chevronProps} d={ChevronDownPaths.chevron} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={s.opacity} />
    </Svg>
  );
};
