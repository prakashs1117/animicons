import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { ArchivePaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Archive: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const lidY = useSharedValue(0);
  const lidRot = useSharedValue(0);
  const itemY = useSharedValue(-10);
  const itemOp = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, ArchivePaths);

  useEffect(() => {
    if (autoPlay) {
      lidY.value = withRepeat(withSequence(
        withTiming(-6, { duration: d.medium * 0.4, easing: Easing.inOut(Easing.ease) }),
        withTiming(0,  { duration: d.medium * 0.6, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
      lidRot.value = withRepeat(withSequence(
        withTiming(-8, { duration: d.medium * 0.4, easing: Easing.inOut(Easing.ease) }),
        withTiming(0,  { duration: d.medium * 0.6, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
      itemY.value = withRepeat(withSequence(
        withTiming(-10, { duration: 0 }),
        withTiming(0,   { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
        withTiming(0,   { duration: d.medium * 0.5 }),
      ), loop ? -1 : 1);
      itemOp.value = withRepeat(withSequence(
        withTiming(0, { duration: 0 }),
        withTiming(1, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
    } else {
      cancelAnimation(lidY); cancelAnimation(lidRot);
      cancelAnimation(itemY); cancelAnimation(itemOp);
      lidY.value = withTiming(0, { duration: 150 });
      lidRot.value = withTiming(0, { duration: 150 });
      itemY.value = withTiming(0, { duration: 150 });
      itemOp.value = withTiming(1, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const lidProps  = useAnimatedProps(() => ({
    transform: [{ translateY: lidY.value }, { rotate: `${lidRot.value}deg` }],
    originX: 24,
    originY: 18,
  }));
  const itemProps = useAnimatedProps(() => ({ transform: [{ translateY: itemY.value }], opacity: itemOp.value * s.opacity }));

  return (
    <Svg width={size} height={size} viewBox={ArchivePaths.viewBox} style={style as any}>
      <Path d={ArchivePaths.box} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinejoin="round" fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={lidProps}  d={ArchivePaths.lid}  stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinejoin="round" fill={s.stroke} opacity={s.opacity} />
      <AnimatedPath animatedProps={itemProps} d={ArchivePaths.item} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
};
