import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { EyeOffPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const EyeOff: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = false, speed = 'normal', style, ...colorProps
}) => {
  const slashDash = useSharedValue(54);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, EyeOffPaths);

  useEffect(() => {
    if (autoPlay) {
      slashDash.value = withSequence(
        withTiming(54, { duration: 0 }),
        withTiming(0,  { duration: d.medium, easing: Easing.inOut(Easing.ease) }),
      );
    } else {
      cancelAnimation(slashDash);
      slashDash.value = withTiming(54, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const slashProps = useAnimatedProps(() => ({ strokeDashoffset: slashDash.value }));

  return (
    <Svg width={size} height={size} viewBox={EyeOffPaths.viewBox} style={style as any}>
      <Path d={EyeOffPaths.lids} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={s.opacity} />
      <Path d={EyeOffPaths.iris} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity * 0.4} />
      <AnimatedPath animatedProps={slashProps} d={EyeOffPaths.slash} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" strokeDasharray={54} opacity={s.opacity} />
    </Svg>
  );
};
