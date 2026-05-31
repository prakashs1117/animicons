import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { LinkPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Link: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, ...colorProps
}) => {
  const l1X = useSharedValue(0);
  const l2X = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, LinkPaths);

  useEffect(() => {
    if (autoPlay) {
      l1X.value = withRepeat(withSequence(
        withTiming(-4, { duration: d.medium * 0.4, easing: Easing.inOut(Easing.ease) }),
        withTiming(0,  { duration: d.medium * 0.6, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
      l2X.value = withRepeat(withSequence(
        withTiming(4, { duration: d.medium * 0.4, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: d.medium * 0.6, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
    } else {
      cancelAnimation(l1X); cancelAnimation(l2X);
      l1X.value = withTiming(0, { duration: 150 });
      l2X.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const link1Props = useAnimatedProps(() => ({ transform: [{ translateX: l1X.value }] }));
  const link2Props = useAnimatedProps(() => ({ transform: [{ translateX: l2X.value }] }));

  return (
    <Svg width={size} height={size} viewBox={LinkPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={link1Props} d={LinkPaths.link1} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={link2Props} d={LinkPaths.link2} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
    </Svg>
  );
};
