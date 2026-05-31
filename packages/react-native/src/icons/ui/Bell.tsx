import React, { useEffect } from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { BellPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const Bell: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, ...colorProps
}) => {
  const rotation = useSharedValue(0);
  const badgeScale = useSharedValue(1);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, BellPaths);

  useEffect(() => {
    if (autoPlay) {
      rotation.value = withRepeat(
        withSequence(
          withTiming(0, { duration: 0 }),
          withTiming(15, { duration: d.long * 0.2, easing: Easing.inOut(Easing.ease) }),
          withTiming(-15, { duration: d.long * 0.2, easing: Easing.inOut(Easing.ease) }),
          withTiming(8, { duration: d.long * 0.2, easing: Easing.inOut(Easing.ease) }),
          withTiming(-8, { duration: d.long * 0.2, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: d.long * 0.2, easing: Easing.inOut(Easing.ease) }),
        ), loop ? -1 : 1
      );
      badgeScale.value = withRepeat(
        withSequence(withTiming(1.3, { duration: d.long * 0.3 }), withTiming(1, { duration: d.long * 0.7 })),
        loop ? -1 : 1
      );
    } else {
      cancelAnimation(rotation); cancelAnimation(badgeScale);
      rotation.value = withTiming(0, { duration: 150 });
      badgeScale.value = withTiming(1, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  // originX/Y sets the pivot to the handle attachment point (top-center of bell)
  const bellProps = useAnimatedProps(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
    originX: 24,
    originY: 12,
  }));
  const clapperProps = useAnimatedProps(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
    originX: 24,
    originY: 12,
  }));
  const handleProps = useAnimatedProps(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
    originX: 24,
    originY: 12,
  }));
  const badgeProps = useAnimatedProps(() => ({
    transform: [{ scale: badgeScale.value }],
    originX: 34,
    originY: 12,
  }));

  return (
    <Svg width={size} height={size} viewBox={BellPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={bellProps} d={BellPaths.bell} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={clapperProps} d={BellPaths.clapper} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" opacity={s.opacity} />
      <AnimatedPath animatedProps={handleProps} d={BellPaths.handle} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      <AnimatedCircle animatedProps={badgeProps} cx={34} cy={12} r={5} fill={s.stroke} opacity={s.opacity} />
    </Svg>
  );
};
