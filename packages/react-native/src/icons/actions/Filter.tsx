import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { FilterPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Filter: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, ...colorProps
}) => {
  const funnelScale = useSharedValue(1);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, FilterPaths);

  useEffect(() => {
    if (autoPlay) {
      funnelScale.value = withRepeat(withSequence(
        withTiming(1.05, { duration: d.long * 0.5, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0,  { duration: d.long * 0.5, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
    } else {
      cancelAnimation(funnelScale);
      funnelScale.value = withTiming(1, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const funnelProps = useAnimatedProps(() => ({
    transform: [{ scale: funnelScale.value }],
    originX: 24,
    originY: 25,
  }));

  return (
    <Svg width={size} height={size} viewBox={FilterPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={funnelProps} d={FilterPaths.funnel} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <Path d={FilterPaths.line1} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      <Path d={FilterPaths.line2} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
    </Svg>
  );
};
