import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, withDelay, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { PausePaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Pause: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, ...colorProps
}) => {
  const scale1 = useSharedValue(1);
  const scale2 = useSharedValue(1);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, PausePaths);

  useEffect(() => {
    if (autoPlay) {
      scale1.value = withRepeat(withSequence(
        withTiming(0.8, { duration: d.medium * 0.4, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration: d.medium * 0.6, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
      scale2.value = withDelay(d.stagger, withRepeat(withSequence(
        withTiming(0.8, { duration: d.medium * 0.4, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration: d.medium * 0.6, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1));
    } else {
      cancelAnimation(scale1); cancelAnimation(scale2);
      scale1.value = withTiming(1, { duration: 150 });
      scale2.value = withTiming(1, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const bar1Props = useAnimatedProps(() => ({
    transform: [{ scaleY: scale1.value }],
    originX: 16,
    originY: 24,
  }));
  const bar2Props = useAnimatedProps(() => ({
    transform: [{ scaleY: scale2.value }],
    originX: 32,
    originY: 24,
  }));

  return (
    <Svg width={size} height={size} viewBox={PausePaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={bar1Props} d={PausePaths.rect1} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinejoin="round" fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={bar2Props} d={PausePaths.rect2} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinejoin="round" fill={s.secondaryColor} opacity={s.opacity} />
    </Svg>
  );
};
