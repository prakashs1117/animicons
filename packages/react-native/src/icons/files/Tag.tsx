import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { TagPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Tag: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const swing = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, TagPaths);

  useEffect(() => {
    if (autoPlay) {
      swing.value = withRepeat(withSequence(
        withTiming(0,   { duration: d.medium * 0.1 }),
        withTiming(12,  { duration: d.medium * 0.3, easing: Easing.inOut(Easing.ease) }),
        withTiming(-12, { duration: d.medium * 0.4, easing: Easing.inOut(Easing.ease) }),
        withTiming(0,   { duration: d.medium * 0.2, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
    } else {
      cancelAnimation(swing);
      swing.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const swingProps = useAnimatedProps(() => ({
    transform: [{ rotate: `${swing.value}deg` }],
    originX: 24,
    originY: 4,
  }));

  return (
    <Svg width={size} height={size} viewBox={TagPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={swingProps} d={TagPaths.tag}    stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinejoin="round" fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={swingProps} d={TagPaths.hole}   stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.stroke} opacity={s.opacity} />
      <AnimatedPath animatedProps={swingProps} d={TagPaths.string} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
    </Svg>
  );
};
