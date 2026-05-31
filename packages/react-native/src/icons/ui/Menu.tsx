import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { MenuPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Menu: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, ...colorProps
}) => {
  const topRot = useSharedValue(0);
  const midOpacity = useSharedValue(1);
  const botRot = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, MenuPaths);

  useEffect(() => {
    if (autoPlay) {
      topRot.value = withRepeat(withSequence(
        withTiming(0,  { duration: d.long * 0.4 }),
        withTiming(45, { duration: d.long * 0.2, easing: Easing.inOut(Easing.ease) }),
        withTiming(45, { duration: d.long * 0.4 }),
      ), loop ? -1 : 1);
      midOpacity.value = withRepeat(withSequence(
        withTiming(1, { duration: d.long * 0.4 }),
        withTiming(0, { duration: d.long * 0.2 }),
        withTiming(0, { duration: d.long * 0.4 }),
      ), loop ? -1 : 1);
      botRot.value = withRepeat(withSequence(
        withTiming(0,   { duration: d.long * 0.4 }),
        withTiming(-45, { duration: d.long * 0.2, easing: Easing.inOut(Easing.ease) }),
        withTiming(-45, { duration: d.long * 0.4 }),
      ), loop ? -1 : 1);
    } else {
      cancelAnimation(topRot); cancelAnimation(midOpacity); cancelAnimation(botRot);
      topRot.value = withTiming(0, { duration: 150 });
      midOpacity.value = withTiming(1, { duration: 150 });
      botRot.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const topProps = useAnimatedProps(() => ({
    transform: [{ rotate: `${topRot.value}deg` }],
    originX: 24,
    originY: 18,
  }));
  const midProps = useAnimatedProps(() => ({ opacity: midOpacity.value }));
  const botProps = useAnimatedProps(() => ({
    transform: [{ rotate: `${botRot.value}deg` }],
    originX: 24,
    originY: 30,
  }));

  return (
    <Svg width={size} height={size} viewBox={MenuPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={topProps} d={MenuPaths.top} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={midProps} d={MenuPaths.middle} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={botProps} d={MenuPaths.bottom} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
    </Svg>
  );
};
