import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { SearchPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Search: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const lensScale = useSharedValue(1);
  const handleX = useSharedValue(-4);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, SearchPaths);

  useEffect(() => {
    if (autoPlay) {
      lensScale.value = withRepeat(withSequence(
        withTiming(1.1, { duration: d.long * 0.5, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration: d.long * 0.5, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
      handleX.value = withRepeat(withSequence(
        withTiming(4,  { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
        withTiming(-4, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
    } else {
      cancelAnimation(lensScale); cancelAnimation(handleX);
      lensScale.value = withTiming(1, { duration: 150 });
      handleX.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const lensProps = useAnimatedProps(() => ({
    transform: [{ scale: lensScale.value }],
    originX: 20,
    originY: 20,
  }));
  const handleProps = useAnimatedProps(() => ({
    transform: [{ translateX: handleX.value }],
    originX: 34,
    originY: 34,
  }));

  return (
    <Svg width={size} height={size} viewBox={SearchPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={lensProps} d={SearchPaths.lens} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={handleProps} d={SearchPaths.handle} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
    </Svg>
  );
};
