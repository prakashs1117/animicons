import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation,
  runOnJS,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { CalendarPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Calendar: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, onAnimationEnd, ...colorProps
}) => {
  const sc = useSharedValue(1);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, CalendarPaths);

  useEffect(() => {
    const cb = onAnimationEnd ? () => { 'worklet'; runOnJS(onAnimationEnd)(); } : undefined;
    if (autoPlay) {
      sc.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: d.medium * 0.5 }),
          withTiming(1, { duration: d.medium * 0.5 }),
        ),
        loop ? -1 : 1, false, cb
      );
    } else {
      cancelAnimation(sc);
      sc.value = withTiming(1, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const squareProps = useAnimatedProps(() => ({
    transform: [{ scale: sc.value }],
    originX: 24,
    originY: 30,
  }));

  return (
    <Svg width={size} height={size} viewBox={CalendarPaths.viewBox} style={style as any}>
      <Path
        d={CalendarPaths.body}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        strokeLinejoin="round"
        fill={s.secondaryColor}
        opacity={s.opacity}
      />
      <Path
        d={CalendarPaths.top}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        fill="none"
        opacity={s.opacity}
      />
      <Path
        d={CalendarPaths.pin1}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        strokeLinecap="round"
        fill="none"
        opacity={s.opacity}
      />
      <Path
        d={CalendarPaths.pin2}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        strokeLinecap="round"
        fill="none"
        opacity={s.opacity}
      />
      <AnimatedPath
        animatedProps={squareProps}
        d={CalendarPaths.square}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        strokeLinejoin="round"
        fill={s.stroke}
        opacity={s.opacity}
      />
    </Svg>
  );
};
