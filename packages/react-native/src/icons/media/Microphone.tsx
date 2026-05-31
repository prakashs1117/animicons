import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, withDelay, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { MicrophonePaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Microphone: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const r1Scale = useSharedValue(1);
  const r1Op   = useSharedValue(0.6);
  const r2Scale = useSharedValue(1);
  const r2Op   = useSharedValue(0.6);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, MicrophonePaths);

  useEffect(() => {
    if (autoPlay) {
      r1Scale.value = withRepeat(withSequence(
        withTiming(1.1, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
      r1Op.value = withRepeat(withSequence(
        withTiming(1.0, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.6, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
      r2Scale.value = withDelay(d.stagger, withRepeat(withSequence(
        withTiming(1.1, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1));
      r2Op.value = withDelay(d.stagger, withRepeat(withSequence(
        withTiming(1.0, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.6, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1));
    } else {
      cancelAnimation(r1Scale); cancelAnimation(r1Op);
      cancelAnimation(r2Scale); cancelAnimation(r2Op);
      r1Scale.value = withTiming(1, { duration: 150 });
      r1Op.value   = withTiming(1, { duration: 150 });
      r2Scale.value = withTiming(1, { duration: 150 });
      r2Op.value   = withTiming(1, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const ring1Props = useAnimatedProps(() => ({
    transform: [{ scale: r1Scale.value }],
    originX: 24,
    originY: 20,
    opacity: r1Op.value,
  }));
  const ring2Props = useAnimatedProps(() => ({
    transform: [{ scale: r2Scale.value }],
    originX: 24,
    originY: 20,
    opacity: r2Op.value,
  }));

  return (
    <Svg width={size} height={size} viewBox={MicrophonePaths.viewBox} style={style as any}>
      <Path d={MicrophonePaths.capsule} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinejoin="round" fill={s.secondaryColor} opacity={s.opacity} />
      <Path d={MicrophonePaths.stand}   stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      <Path d={MicrophonePaths.stem}    stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      <Path d={MicrophonePaths.base}    stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={ring1Props} d={MicrophonePaths.ring1} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" />
      <AnimatedPath animatedProps={ring2Props} d={MicrophonePaths.ring2} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" />
    </Svg>
  );
};
