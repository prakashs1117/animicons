import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { TrashPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Trash: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, ...colorProps
}) => {
  const rotation = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, TrashPaths);

  useEffect(() => {
    if (autoPlay) {
      rotation.value = withRepeat(withSequence(
        withTiming(-8, { duration: d.long * 0.2, easing: Easing.inOut(Easing.ease) }),
        withTiming(8,  { duration: d.long * 0.2, easing: Easing.inOut(Easing.ease) }),
        withTiming(-5, { duration: d.long * 0.2, easing: Easing.inOut(Easing.ease) }),
        withTiming(5,  { duration: d.long * 0.2, easing: Easing.inOut(Easing.ease) }),
        withTiming(0,  { duration: d.long * 0.2, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
    } else {
      cancelAnimation(rotation);
      rotation.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const trashProps = useAnimatedProps(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
    originX: 24,
    originY: 28,
  }));

  return (
    <Svg width={size} height={size} viewBox={TrashPaths.viewBox} style={style as any}>
      <Path d={TrashPaths.lid}    stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      <Path d={TrashPaths.handle} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={trashProps} d={TrashPaths.body}  stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={trashProps} d={TrashPaths.lines} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
    </Svg>
  );
};
