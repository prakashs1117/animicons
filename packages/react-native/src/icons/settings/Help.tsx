import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { HelpPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Help: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, ...colorProps
}) => {
  const floatY = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, HelpPaths);

  useEffect(() => {
    if (autoPlay) {
      floatY.value = withRepeat(withSequence(
        withTiming(-4, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
        withTiming(0,  { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
    } else {
      cancelAnimation(floatY);
      floatY.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const floatProps = useAnimatedProps(() => ({ transform: [{ translateY: floatY.value }] }));

  return (
    <Svg width={size} height={size} viewBox={HelpPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={floatProps} d={HelpPaths.circle} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={floatProps} d={HelpPaths.mark}   stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={floatProps} d={HelpPaths.dot}    stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.stroke} opacity={s.opacity} />
    </Svg>
  );
};
