import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { UnlockPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Unlock: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = false, speed = 'normal', style, ...colorProps
}) => {
  const openRot = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, UnlockPaths);

  useEffect(() => {
    if (autoPlay) {
      openRot.value = withSequence(
        withTiming(25, { duration: d.medium * 0.5, easing: Easing.bezier(0.34, 1.56, 0.64, 1) }),
        withTiming(20, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
      );
    } else {
      cancelAnimation(openRot);
      openRot.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const openProps = useAnimatedProps(() => ({
    transform: [{ rotate: `${openRot.value}deg` }],
    originX: 16,
    originY: 22,
  }));

  return (
    <Svg width={size} height={size} viewBox={UnlockPaths.viewBox} style={style as any}>
      <Path d={UnlockPaths.body} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinejoin="round" fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={openProps} d={UnlockPaths.shackle} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={openProps} d={UnlockPaths.open} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      <Path d={UnlockPaths.knob} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.stroke} opacity={s.opacity} />
    </Svg>
  );
};
