import React, { useEffect } from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation,
  runOnJS,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { NotificationPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const Notification: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, onAnimationEnd, ...colorProps
}) => {
  const sc = useSharedValue(1);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, NotificationPaths);

  useEffect(() => {
    const cb = onAnimationEnd ? () => { 'worklet'; runOnJS(onAnimationEnd)(); } : undefined;
    if (autoPlay) {
      sc.value = withRepeat(
        withSequence(
          withTiming(1.4, { duration: d.medium * 0.4 }),
          withTiming(1.1, { duration: d.medium * 0.2 }),
          withTiming(1, { duration: d.medium * 0.4 }),
        ),
        loop ? -1 : 1, false, cb
      );
    } else {
      cancelAnimation(sc);
      sc.value = withTiming(1, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const badgeProps = useAnimatedProps(() => ({
    transform: [{ scale: sc.value }],
    originX: 36,
    originY: 10,
  }));

  return (
    <Svg width={size} height={size} viewBox={NotificationPaths.viewBox} style={style as any}>
      <Path
        d={NotificationPaths.bell}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        strokeLinejoin="round"
        fill={s.secondaryColor}
        opacity={s.opacity}
      />
      <Path
        d={NotificationPaths.clapper}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        strokeLinecap="round"
        fill="none"
        opacity={s.opacity}
      />
      <Path
        d={NotificationPaths.handle}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        strokeLinecap="round"
        fill="none"
        opacity={s.opacity}
      />
      <AnimatedCircle
        animatedProps={badgeProps}
        cx={36}
        cy={10}
        r={5}
        fill={s.stroke}
        opacity={s.opacity}
      />
    </Svg>
  );
};
