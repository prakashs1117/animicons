import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation,
  runOnJS,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { FlagPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Flag: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, onAnimationEnd, ...colorProps
}) => {
  const rot = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, FlagPaths);

  useEffect(() => {
    const cb = onAnimationEnd ? () => { 'worklet'; runOnJS(onAnimationEnd)(); } : undefined;
    if (autoPlay) {
      rot.value = withRepeat(
        withSequence(
          withTiming(-4, { duration: d.medium * 0.25 }),
          withTiming(4, { duration: d.medium * 0.5 }),
          withTiming(0, { duration: d.medium * 0.25 }),
        ),
        loop ? -1 : 1, false, cb
      );
    } else {
      cancelAnimation(rot);
      rot.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const flagProps = useAnimatedProps(() => ({
    transform: [{ rotate: `${rot.value}deg` }],
    originX: 12,
    originY: 8,
  }));

  return (
    <Svg width={size} height={size} viewBox={FlagPaths.viewBox} style={style as any}>
      <Path
        d={FlagPaths.pole}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        strokeLinecap="round"
        fill="none"
        opacity={s.opacity}
      />
      <AnimatedPath
        animatedProps={flagProps}
        d={FlagPaths.flag}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        strokeLinejoin="round"
        fill={s.secondaryColor}
        opacity={s.opacity}
      />
    </Svg>
  );
};
