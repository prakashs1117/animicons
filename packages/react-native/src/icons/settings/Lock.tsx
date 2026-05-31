import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, withDelay, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { LockPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Lock: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, ...colorProps
}) => {
  const bodyY = useSharedValue(0);
  const shackleY = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, LockPaths);

  useEffect(() => {
    if (autoPlay) {
      bodyY.value = withRepeat(withSequence(
        withTiming(-3, { duration: d.medium * 0.4, easing: Easing.inOut(Easing.ease) }),
        withTiming(0,  { duration: d.medium * 0.6, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
      shackleY.value = withDelay(d.stagger, withRepeat(withSequence(
        withTiming(-3, { duration: d.medium * 0.4, easing: Easing.inOut(Easing.ease) }),
        withTiming(0,  { duration: d.medium * 0.6, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1));
    } else {
      cancelAnimation(bodyY); cancelAnimation(shackleY);
      bodyY.value = withTiming(0, { duration: 150 });
      shackleY.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const bodyProps    = useAnimatedProps(() => ({ transform: [{ translateY: bodyY.value }] }));
  const shackleProps = useAnimatedProps(() => ({ transform: [{ translateY: shackleY.value }] }));

  return (
    <Svg width={size} height={size} viewBox={LockPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={shackleProps} d={LockPaths.shackle} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={bodyProps} d={LockPaths.body} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinejoin="round" fill={s.secondaryColor} opacity={s.opacity} />
      <Path d={LockPaths.knob} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.stroke} opacity={s.opacity} />
      <Path d={LockPaths.stem} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
    </Svg>
  );
};
