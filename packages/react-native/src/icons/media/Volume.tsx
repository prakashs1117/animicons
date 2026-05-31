import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, withDelay, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { VolumePaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Volume: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, ...colorProps
}) => {
  const w1Op = useSharedValue(0.4);
  const w2Op = useSharedValue(0.4);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, VolumePaths);

  useEffect(() => {
    if (autoPlay) {
      w1Op.value = withRepeat(withSequence(
        withTiming(1.0, { duration: d.medium * 0.4, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.4, { duration: d.medium * 0.6, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
      w2Op.value = withDelay(d.stagger, withRepeat(withSequence(
        withTiming(1.0, { duration: d.medium * 0.4, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.4, { duration: d.medium * 0.6, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1));
    } else {
      cancelAnimation(w1Op); cancelAnimation(w2Op);
      w1Op.value = withTiming(1, { duration: 150 });
      w2Op.value = withTiming(1, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const wave1Props = useAnimatedProps(() => ({ opacity: w1Op.value * s.opacity }));
  const wave2Props = useAnimatedProps(() => ({ opacity: w2Op.value * s.opacity }));

  return (
    <Svg width={size} height={size} viewBox={VolumePaths.viewBox} style={style as any}>
      <Path d={VolumePaths.speaker} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinejoin="round" fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={wave1Props} d={VolumePaths.wave1} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" />
      <AnimatedPath animatedProps={wave2Props} d={VolumePaths.wave2} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" />
    </Svg>
  );
};
