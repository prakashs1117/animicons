import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation,
  runOnJS,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { LogoutPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Logout: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, onAnimationEnd, ...colorProps
}) => {
  const doorRot = useSharedValue(0);
  const arrowTx = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, LogoutPaths);

  useEffect(() => {
    const cb = onAnimationEnd ? () => { 'worklet'; runOnJS(onAnimationEnd)(); } : undefined;
    if (autoPlay) {
      doorRot.value = withRepeat(
        withSequence(
          withTiming(-8, { duration: d.medium * 0.4 }),
          withTiming(-8, { duration: d.medium * 0.2 }),
          withTiming(0, { duration: d.medium * 0.4 }),
        ),
        loop ? -1 : 1, false, cb
      );
      arrowTx.value = withRepeat(
        withSequence(
          withTiming(6, { duration: d.medium * 0.5 }),
          withTiming(0, { duration: d.medium * 0.5 }),
        ),
        loop ? -1 : 1
      );
    } else {
      cancelAnimation(doorRot); cancelAnimation(arrowTx);
      doorRot.value = withTiming(0, { duration: 150 });
      arrowTx.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const doorProps = useAnimatedProps(() => ({
    transform: [{ rotate: `${doorRot.value}deg` }],
    originX: 8,
    originY: 24,
  }));
  const arrowProps = useAnimatedProps(() => ({
    transform: [{ translateX: arrowTx.value }],
  }));

  return (
    <Svg width={size} height={size} viewBox={LogoutPaths.viewBox} style={style as any}>
      <AnimatedPath
        animatedProps={doorProps}
        d={LogoutPaths.door}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={s.opacity}
      />
      <AnimatedPath
        animatedProps={arrowProps}
        d={LogoutPaths.arrow}
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
