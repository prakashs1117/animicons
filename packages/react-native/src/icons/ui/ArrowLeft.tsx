import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation,
  runOnJS,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { ArrowLeftPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const ArrowLeft: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, onAnimationEnd, ...colorProps
}) => {
  const tx = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, ArrowLeftPaths);

  useEffect(() => {
    const cb = onAnimationEnd ? () => { 'worklet'; runOnJS(onAnimationEnd)(); } : undefined;
    if (autoPlay) {
      tx.value = withRepeat(
        withSequence(
          withTiming(-8, { duration: d.medium * 0.4 }),
          withTiming(-2, { duration: d.medium * 0.3 }),
          withTiming(0, { duration: d.medium * 0.3 }),
        ),
        loop ? -1 : 1, false, cb
      );
    } else {
      cancelAnimation(tx);
      tx.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const shaftProps = useAnimatedProps(() => ({
    transform: [{ translateX: tx.value }],
  }));
  const headProps = useAnimatedProps(() => ({
    transform: [{ translateX: tx.value }],
  }));

  return (
    <Svg width={size} height={size} viewBox={ArrowLeftPaths.viewBox} style={style as any}>
      <AnimatedPath
        animatedProps={shaftProps}
        d={ArrowLeftPaths.shaft}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        strokeLinecap="round"
        fill="none"
        opacity={s.opacity}
      />
      <AnimatedPath
        animatedProps={headProps}
        d={ArrowLeftPaths.head}
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
