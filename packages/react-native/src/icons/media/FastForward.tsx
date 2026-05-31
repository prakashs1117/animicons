import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, withDelay, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { FastForwardPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const FastForward: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, ...colorProps
}) => {
  const c1X = useSharedValue(0);
  const c2X = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, FastForwardPaths);

  useEffect(() => {
    if (autoPlay) {
      c1X.value = withRepeat(withSequence(
        withTiming(8, { duration: d.medium * 0.4, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: d.medium * 0.6, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
      c2X.value = withDelay(d.stagger, withRepeat(withSequence(
        withTiming(8, { duration: d.medium * 0.4, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: d.medium * 0.6, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1));
    } else {
      cancelAnimation(c1X); cancelAnimation(c2X);
      c1X.value = withTiming(0, { duration: 150 });
      c2X.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const chev1Props = useAnimatedProps(() => ({ transform: [{ translateX: c1X.value }] }));
  const chev2Props = useAnimatedProps(() => ({ transform: [{ translateX: c2X.value }] }));

  return (
    <Svg width={size} height={size} viewBox={FastForwardPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={chev1Props} d={FastForwardPaths.chev1} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={chev2Props} d={FastForwardPaths.chev2} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={s.opacity} />
      <Path d={FastForwardPaths.end} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
    </Svg>
  );
};
