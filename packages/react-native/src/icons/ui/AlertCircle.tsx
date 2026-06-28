import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation,
  runOnJS,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { AlertCirclePaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const AlertCircle: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, onAnimationEnd, ...colorProps
}) => {
  const sc = useSharedValue(1);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, AlertCirclePaths);

  useEffect(() => {
    const cb = onAnimationEnd ? () => { 'worklet'; runOnJS(onAnimationEnd)(); } : undefined;
    if (autoPlay) {
      sc.value = withRepeat(
        withSequence(
          withTiming(1.12, { duration: d.medium * 0.5 }),
          withTiming(1, { duration: d.medium * 0.5 }),
        ),
        loop ? -1 : 1, false, cb
      );
    } else {
      cancelAnimation(sc);
      sc.value = withTiming(1, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const circleProps = useAnimatedProps(() => ({
    transform: [{ scale: sc.value }],
    originX: 24,
    originY: 24,
  }));

  return (
    <Svg width={size} height={size} viewBox={AlertCirclePaths.viewBox} style={style as any}>
      <AnimatedPath
        animatedProps={circleProps}
        d={AlertCirclePaths.circle}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        fill={s.secondaryColor}
        opacity={s.opacity}
      />
      <Path
        d={AlertCirclePaths.stem}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        strokeLinecap="round"
        fill="none"
        opacity={s.opacity}
      />
      <Path
        d={AlertCirclePaths.dot}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        fill={s.stroke}
        opacity={s.opacity}
      />
    </Svg>
  );
};
