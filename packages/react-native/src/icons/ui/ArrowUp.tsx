import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation,
  runOnJS,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { ArrowUpPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const ArrowUp: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, onAnimationEnd, ...colorProps
}) => {
  const ty = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, ArrowUpPaths);

  useEffect(() => {
    const cb = onAnimationEnd ? () => { 'worklet'; runOnJS(onAnimationEnd)(); } : undefined;
    if (autoPlay) {
      ty.value = withRepeat(
        withSequence(
          withTiming(-8, { duration: d.medium * 0.4 }),
          withTiming(-2, { duration: d.medium * 0.3 }),
          withTiming(0, { duration: d.medium * 0.3 }),
        ),
        loop ? -1 : 1, false, cb
      );
    } else {
      cancelAnimation(ty);
      ty.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const shaftProps = useAnimatedProps(() => ({
    transform: [{ translateY: ty.value }],
  }));
  const headProps = useAnimatedProps(() => ({
    transform: [{ translateY: ty.value }],
  }));

  return (
    <Svg width={size} height={size} viewBox={ArrowUpPaths.viewBox} style={style as any}>
      <AnimatedPath
        animatedProps={shaftProps}
        d={ArrowUpPaths.shaft}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        strokeLinecap="round"
        fill="none"
        opacity={s.opacity}
      />
      <AnimatedPath
        animatedProps={headProps}
        d={ArrowUpPaths.head}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={s.opacity}
      />
    </Svg>
  );
};
