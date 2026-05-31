import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { MutePaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Mute: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = false, speed = 'slow', style, ...colorProps
}) => {
  const slashDash = useSharedValue(24);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, MutePaths);

  useEffect(() => {
    if (autoPlay) {
      slashDash.value = withSequence(
        withTiming(24, { duration: 0 }),
        withTiming(0,  { duration: d.medium, easing: Easing.inOut(Easing.ease) }),
      );
    } else {
      cancelAnimation(slashDash);
      slashDash.value = withTiming(24, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const slashProps = useAnimatedProps(() => ({ strokeDashoffset: slashDash.value }));

  return (
    <Svg width={size} height={size} viewBox={MutePaths.viewBox} style={style as any}>
      <Path d={MutePaths.speaker} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinejoin="round" fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={slashProps} d={MutePaths.slash} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" strokeDasharray={24} opacity={s.opacity} />
    </Svg>
  );
};
