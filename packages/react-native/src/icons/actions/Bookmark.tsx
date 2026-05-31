import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { BookmarkPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Bookmark: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = false, speed = 'slow', style, ...colorProps
}) => {
  const translateY = useSharedValue(-12);
  const opacity = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, BookmarkPaths);

  useEffect(() => {
    if (autoPlay) {
      translateY.value = withRepeat(withSequence(
        withTiming(2,  { duration: d.short * 0.6, easing: Easing.out(Easing.ease) }),
        withTiming(-1, { duration: d.short * 0.2, easing: Easing.inOut(Easing.ease) }),
        withTiming(0,  { duration: d.short * 0.2, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
      opacity.value = withTiming(1, { duration: d.short * 0.3 });
    } else {
      cancelAnimation(translateY); cancelAnimation(opacity);
      translateY.value = withTiming(0, { duration: 150 });
      opacity.value = withTiming(1, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const bookmarkProps = useAnimatedProps(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
    originX: 24,
    originY: 24,
  }));

  return (
    <Svg width={size} height={size} viewBox={BookmarkPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={bookmarkProps} d={BookmarkPaths.body} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
    </Svg>
  );
};
