import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation,
  runOnJS,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { AlertTrianglePaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const AlertTriangle: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, onAnimationEnd, ...colorProps
}) => {
  const rot = useSharedValue(0);
  const pulse = useSharedValue(1);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, AlertTrianglePaths);

  useEffect(() => {
    const cb = onAnimationEnd ? () => { 'worklet'; runOnJS(onAnimationEnd)(); } : undefined;
    if (autoPlay) {
      rot.value = withRepeat(
        withSequence(
          withTiming(-6, { duration: d.long * 0.2 }),
          withTiming(6, { duration: d.long * 0.2 }),
          withTiming(-4, { duration: d.long * 0.2 }),
          withTiming(4, { duration: d.long * 0.2 }),
          withTiming(0, { duration: d.long * 0.2 }),
        ),
        loop ? -1 : 1, false, cb
      );
      pulse.value = withRepeat(
        withSequence(
          withTiming(1.3, { duration: d.medium * 0.5 }),
          withTiming(1, { duration: d.medium * 0.5 }),
        ),
        loop ? -1 : 1
      );
    } else {
      cancelAnimation(rot); cancelAnimation(pulse);
      rot.value = withTiming(0, { duration: 150 });
      pulse.value = withTiming(1, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const triangleProps = useAnimatedProps(() => ({
    transform: [{ rotate: `${rot.value}deg` }],
    originX: 24,
    originY: 24,
  }));
  const stemProps = useAnimatedProps(() => ({
    transform: [{ scale: pulse.value }],
    originX: 24,
    originY: 24,
  }));
  const dotProps = useAnimatedProps(() => ({
    transform: [{ scale: pulse.value }],
    originX: 24,
    originY: 24,
  }));

  return (
    <Svg width={size} height={size} viewBox={AlertTrianglePaths.viewBox} style={style as any}>
      <AnimatedPath
        animatedProps={triangleProps}
        d={AlertTrianglePaths.triangle}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        strokeLinejoin="round"
        fill={s.secondaryColor}
        opacity={s.opacity}
      />
      <AnimatedPath
        animatedProps={stemProps}
        d={AlertTrianglePaths.stem}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        strokeLinecap="round"
        fill="none"
        opacity={s.opacity}
      />
      <AnimatedPath
        animatedProps={dotProps}
        d={AlertTrianglePaths.dot}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        fill={s.stroke}
        opacity={s.opacity}
      />
    </Svg>
  );
};
