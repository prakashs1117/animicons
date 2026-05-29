import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { DNAPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const DNA: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const translateY = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, DNAPaths);

  useEffect(() => {
    if (autoPlay) {
      translateY.value = withRepeat(withTiming(-16, { duration: d.medium, easing: Easing.linear }), loop ? -1 : 1, true);
    } else {
      cancelAnimation(translateY);
    }
  }, [autoPlay, loop, speed]);

  const animProps = useAnimatedProps(() => ({ transform: [{ translateY: translateY.value }] }));

  return (
    <Svg width={size} height={size} viewBox={DNAPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={animProps} d={DNAPaths.strand1} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" opacity={s.opacity} />
      <AnimatedPath animatedProps={animProps} d={DNAPaths.strand2} stroke={s.secondaryColor} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" opacity={s.opacity} />
      <AnimatedPath animatedProps={animProps} d={`${DNAPaths.rung1} ${DNAPaths.rung2} ${DNAPaths.rung3}`} stroke={s.stroke} strokeWidth={1.5} fill="none" strokeLinecap="round" opacity={s.opacity * 0.6} />
    </Svg>
  );
};
