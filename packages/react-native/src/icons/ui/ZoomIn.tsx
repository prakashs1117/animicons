import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation,
  runOnJS,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { ZoomInPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const ZoomIn: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, onAnimationEnd, ...colorProps
}) => {
  const sc = useSharedValue(1);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, ZoomInPaths);

  useEffect(() => {
    const cb = onAnimationEnd ? () => { 'worklet'; runOnJS(onAnimationEnd)(); } : undefined;
    if (autoPlay) {
      sc.value = withRepeat(
        withSequence(
          withTiming(1.15, { duration: d.medium * 0.5 }),
          withTiming(1, { duration: d.medium * 0.5 }),
        ),
        loop ? -1 : 1, false, cb
      );
    } else {
      cancelAnimation(sc);
      sc.value = withTiming(1, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const lensProps = useAnimatedProps(() => ({
    transform: [{ scale: sc.value }],
    originX: 20,
    originY: 20,
  }));
  const hlineProps = useAnimatedProps(() => ({
    transform: [{ scale: sc.value }],
    originX: 20,
    originY: 20,
  }));
  const vlineProps = useAnimatedProps(() => ({
    transform: [{ scale: sc.value }],
    originX: 20,
    originY: 20,
  }));

  return (
    <Svg width={size} height={size} viewBox={ZoomInPaths.viewBox} style={style as any}>
      <AnimatedPath
        animatedProps={lensProps}
        d={ZoomInPaths.lens}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        strokeLinecap="round"
        fill="none"
        opacity={s.opacity}
      />
      <Path
        d={ZoomInPaths.handle}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        strokeLinecap="round"
        fill="none"
        opacity={s.opacity}
      />
      <AnimatedPath
        animatedProps={hlineProps}
        d={ZoomInPaths.hline}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        strokeLinecap="round"
        fill="none"
        opacity={s.opacity}
      />
      <AnimatedPath
        animatedProps={vlineProps}
        d={ZoomInPaths.vline}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        strokeLinecap="round"
        fill="none"
        opacity={s.opacity}
      />
    </Svg>
  );
};
